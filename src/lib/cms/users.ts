import fs from "node:fs";
import path from "node:path";
import { randomUUID, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getContentDataDir } from "@/lib/storage-paths";

// Kho tài khoản quản trị — mỗi user có username riêng + mật khẩu riêng (được
// băm bằng scrypt, không bao giờ lưu/hiển thị dạng chữ thường). Lưu dạng JSON
// giống content/data/*.json của các collection khác — xem store.ts.

export type AdminUser = {
  id: string;
  username: string;
  passwordHash: string; // dạng "<salt-hex>:<hash-hex>"
  createdAt: string;
};

export type AdminUserSummary = Omit<AdminUser, "passwordHash">;

function filePath() {
  return path.join(getContentDataDir(), "users.json");
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

function ensureFile(): AdminUser[] {
  fs.mkdirSync(getContentDataDir(), { recursive: true });
  const fp = filePath();
  if (!fs.existsSync(fp)) {
    // Bootstrap: nếu chưa có file users.json (lần chạy đầu sau khi nâng cấp),
    // tạo sẵn 1 tài khoản từ ADMIN_USERNAME/ADMIN_PASSWORD trong .env — để
    // site đã deploy trước đó (chỉ có 1 mật khẩu chung) vẫn đăng nhập được
    // ngay, rồi tự vào "Người dùng" trong /admin để thêm người mới.
    const bootstrapUsername = process.env.ADMIN_USERNAME?.trim() || "admin";
    const bootstrapPassword = process.env.ADMIN_PASSWORD;
    const seeded: AdminUser[] = bootstrapPassword
      ? [
          {
            id: randomUUID(),
            username: bootstrapUsername,
            passwordHash: hashPassword(bootstrapPassword),
            createdAt: new Date().toISOString(),
          },
        ]
      : [];
    fs.writeFileSync(fp, JSON.stringify(seeded, null, 2), "utf-8");
    return seeded;
  }
  try {
    return JSON.parse(fs.readFileSync(fp, "utf-8")) as AdminUser[];
  } catch {
    return [];
  }
}

function writeAll(users: AdminUser[]) {
  fs.mkdirSync(getContentDataDir(), { recursive: true });
  fs.writeFileSync(filePath(), JSON.stringify(users, null, 2), "utf-8");
}

export function listUsers(): AdminUserSummary[] {
  return ensureFile().map(({ passwordHash: _passwordHash, ...rest }) => rest);
}

export function verifyCredentials(username: string, password: string): boolean {
  const user = ensureFile().find((u) => u.username === username);
  if (!user) return false;
  return verifyPassword(password, user.passwordHash);
}

export function createUser(username: string, password: string): AdminUserSummary {
  const users = ensureFile();
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error("Tên đăng nhập đã tồn tại");
  }
  const user: AdminUser = {
    id: randomUUID(),
    username,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeAll(users);
  const { passwordHash: _passwordHash, ...summary } = user;
  return summary;
}

export function deleteUser(id: string): boolean {
  const users = ensureFile();
  if (users.length <= 1) {
    throw new Error("Không thể xoá — hệ thống cần ít nhất 1 tài khoản quản trị");
  }
  const next = users.filter((u) => u.id !== id);
  const changed = next.length !== users.length;
  if (changed) writeAll(next);
  return changed;
}
