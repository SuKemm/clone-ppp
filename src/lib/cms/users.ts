import fs from "node:fs";
import path from "node:path";
import { randomUUID, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getContentDataDir } from "@/lib/storage-paths";
import { COLLECTIONS, type CollectionId } from "@/lib/cms/schema";

// Kho tài khoản quản trị — mỗi user có username riêng + mật khẩu riêng (được
// băm bằng scrypt, không bao giờ lưu/hiển thị dạng chữ thường). Lưu dạng JSON
// giống content/data/*.json của các collection khác — xem store.ts.
//
// Phân quyền: mỗi user có 1 "role":
// - "admin": toàn quyền — quản lý nội dung mọi collection + quản lý người
//   dùng khác (thêm/xoá/đổi quyền). Không bị giới hạn bởi `permissions`.
// - "editor": "user con" do admin tạo ra, chỉ thấy/sửa được những collection
//   nằm trong `permissions` (do admin tick chọn khi tạo hoặc sửa tài khoản).
//   Không được vào mục "Người dùng".

export type AdminRole = "admin" | "editor";

export type AdminUser = {
  id: string;
  username: string;
  passwordHash: string; // dạng "<salt-hex>:<hash-hex>"
  role: AdminRole;
  // Chỉ có ý nghĩa khi role = "editor". Danh sách id collection được phép
  // truy cập (xem CollectionId trong schema.ts).
  permissions: CollectionId[];
  createdAt: string;
};

export type AdminUserSummary = Omit<AdminUser, "passwordHash">;

const VALID_COLLECTION_IDS = new Set<CollectionId>(COLLECTIONS.map((c) => c.id));

function sanitizePermissions(input: unknown): CollectionId[] {
  if (!Array.isArray(input)) return [];
  const unique = new Set<CollectionId>();
  for (const v of input) {
    if (typeof v === "string" && VALID_COLLECTION_IDS.has(v as CollectionId)) {
      unique.add(v as CollectionId);
    }
  }
  return Array.from(unique);
}

function sanitizeRole(input: unknown): AdminRole {
  return input === "editor" ? "editor" : "admin";
}

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

// Chuẩn hoá dữ liệu đọc từ file cũ (trước khi có role/permissions) — mọi
// user tạo ra trước bản nâng cấp này mặc định là "admin" để không ai bị mất
// quyền truy cập đột ngột sau khi deploy code mới.
function normalizeUser(
  raw: Partial<AdminUser> & { id: string; username: string; passwordHash: string; createdAt: string }
): AdminUser {
  return {
    id: raw.id,
    username: raw.username,
    passwordHash: raw.passwordHash,
    createdAt: raw.createdAt,
    role: raw.role === "editor" ? "editor" : "admin",
    permissions: sanitizePermissions(raw.permissions),
  };
}

function ensureFile(): AdminUser[] {
  fs.mkdirSync(getContentDataDir(), { recursive: true });
  const fp = filePath();
  if (!fs.existsSync(fp)) {
    // Bootstrap: nếu chưa có file users.json (lần chạy đầu sau khi nâng cấp),
    // tạo sẵn 1 tài khoản admin từ ADMIN_USERNAME/ADMIN_PASSWORD trong .env —
    // để site đã deploy trước đó (chỉ có 1 mật khẩu chung) vẫn đăng nhập
    // được ngay, rồi tự vào "Người dùng" trong /admin để thêm người mới.
    const bootstrapUsername = process.env.ADMIN_USERNAME?.trim() || "admin";
    const bootstrapPassword = process.env.ADMIN_PASSWORD;
    const seeded: AdminUser[] = bootstrapPassword
      ? [
          {
            id: randomUUID(),
            username: bootstrapUsername,
            passwordHash: hashPassword(bootstrapPassword),
            role: "admin",
            permissions: [],
            createdAt: new Date().toISOString(),
          },
        ]
      : [];
    fs.writeFileSync(fp, JSON.stringify(seeded, null, 2), "utf-8");
    return seeded;
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(fp, "utf-8")) as Partial<AdminUser>[];
    return parsed.map((u) => normalizeUser(u as AdminUser));
  } catch {
    return [];
  }
}

function writeAll(users: AdminUser[]) {
  fs.mkdirSync(getContentDataDir(), { recursive: true });
  fs.writeFileSync(filePath(), JSON.stringify(users, null, 2), "utf-8");
}

function countAdmins(users: AdminUser[]): number {
  return users.filter((u) => u.role === "admin").length;
}

export function listUsers(): AdminUserSummary[] {
  return ensureFile().map(({ passwordHash: _passwordHash, ...rest }) => rest);
}

export function getUserByUsername(username: string): AdminUser | null {
  return ensureFile().find((u) => u.username === username) ?? null;
}

export function verifyCredentials(username: string, password: string): boolean {
  const user = ensureFile().find((u) => u.username === username);
  if (!user) return false;
  return verifyPassword(password, user.passwordHash);
}

export function createUser(
  username: string,
  password: string,
  role: AdminRole = "admin",
  permissions: CollectionId[] = []
): AdminUserSummary {
  const users = ensureFile();
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error("Tên đăng nhập đã tồn tại");
  }
  const safeRole = sanitizeRole(role);
  const user: AdminUser = {
    id: randomUUID(),
    username,
    passwordHash: hashPassword(password),
    role: safeRole,
    permissions: safeRole === "editor" ? sanitizePermissions(permissions) : [],
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeAll(users);
  const { passwordHash: _passwordHash, ...summary } = user;
  return summary;
}

export type UpdateUserInput = {
  role?: AdminRole;
  permissions?: CollectionId[];
  password?: string; // nếu có (>=6 ký tự), đặt lại mật khẩu
};

// Đổi quyền (role/permissions) và/hoặc đặt lại mật khẩu của 1 user con.
// Không cho phép hạ quyền admin cuối cùng của hệ thống xuống "editor" — nếu
// không sẽ không còn ai quản lý được phân quyền nữa.
export function updateUser(id: string, input: UpdateUserInput): AdminUserSummary {
  const users = ensureFile();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("Không tìm thấy người dùng");
  const current = users[idx];

  const nextRole = input.role !== undefined ? sanitizeRole(input.role) : current.role;
  if (current.role === "admin" && nextRole === "editor" && countAdmins(users) <= 1) {
    throw new Error("Không thể hạ quyền — hệ thống cần ít nhất 1 tài khoản Admin");
  }

  const next: AdminUser = {
    ...current,
    role: nextRole,
    permissions:
      nextRole === "admin"
        ? []
        : input.permissions !== undefined
          ? sanitizePermissions(input.permissions)
          : current.permissions,
    passwordHash:
      input.password && input.password.length >= 6
        ? hashPassword(input.password)
        : current.passwordHash,
  };

  users[idx] = next;
  writeAll(users);
  const { passwordHash: _passwordHash, ...summary } = next;
  return summary;
}

export function deleteUser(id: string): boolean {
  const users = ensureFile();
  const target = users.find((u) => u.id === id);
  if (!target) return false;
  if (users.length <= 1) {
    throw new Error("Không thể xoá — hệ thống cần ít nhất 1 tài khoản quản trị");
  }
  if (target.role === "admin" && countAdmins(users) <= 1) {
    throw new Error("Không thể xoá — hệ thống cần ít nhất 1 tài khoản Admin");
  }
  const next = users.filter((u) => u.id !== id);
  writeAll(next);
  return true;
}
