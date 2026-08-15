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

/** Tạo token phiên đăng nhập: "<expiresAt>.<chữ ký HMAC>" */
export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_MS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  return true;
}

export function checkPassword(input: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) {
    throw new Error("Thiếu biến môi trường ADMIN_PASSWORD — xem hướng dẫn trong README-admin.md");
  }
  const a = Buffer.from(input);
  const b = Buffer.from(real);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
