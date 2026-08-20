import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "ptsc_admin_session";
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000; // 12 giờ

function secret() {
  // Bắt buộc set ở .env / .env.local trên server, xem README-admin.md.
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) {
    throw new Error(
      "Thiếu biến môi trường ADMIN_SESSION_SECRET — xem hướng dẫn trong README-admin.md"
    );
  }
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Tạo token phiên đăng nhập: "<expiresAt>|<username>.<chữ ký HMAC>" */
export function createSessionToken(username: string): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `${expiresAt}|${username}`;
  return `${payload}.${sign(payload)}`;
}

/**
 * Kiểm tra token phiên đăng nhập. Trả về username nếu hợp lệ + còn hạn,
 * ngược lại trả về null. Lưu ý: middleware.ts chỉ cần `if (!valid)` nên vẫn
 * hoạt động đúng với kiểu trả về mới này (chuỗi rỗng/null đều là falsy).
 */
export function verifySessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const dotIdx = token.lastIndexOf(".");
  if (dotIdx === -1) return null;
  const payload = token.slice(0, dotIdx);
  const sig = token.slice(dotIdx + 1);
  if (!payload || !sig) return null;

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const sepIdx = payload.indexOf("|");
  if (sepIdx === -1) return null;
  const expiresAt = Number(payload.slice(0, sepIdx));
  const username = payload.slice(sepIdx + 1);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt || !username) return null;

  return username;
}
