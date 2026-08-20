import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/cms/auth";
import { getUserByUsername, type AdminUser } from "@/lib/cms/users";
import { COLLECTIONS, type CollectionId } from "@/lib/cms/schema";

// Collection nào đó được collection khác dùng làm nguồn cho field "select"
// (vd: "news" lấy category từ "news-categories") thì coi là dữ liệu tra cứu
// dùng chung — bất kỳ user đã đăng nhập nào cũng đọc (GET) được, để form
// nhập liệu của họ còn hiển thị được dropdown, dù họ không có quyền quản lý
// riêng collection nguồn đó. Quyền GHI (POST/PUT/DELETE) vẫn khoá chặt theo
// permissions như bình thường.
const OPTIONS_SOURCE_IDS = new Set<CollectionId>(
  COLLECTIONS.flatMap((c) => c.fields.filter((f) => f.optionsFrom).map((f) => f.optionsFrom!))
);

// Đọc user đang đăng nhập từ cookie phiên của request hiện tại. Dùng ở mọi
// API route /api/admin/* cần kiểm tra role/permissions (middleware.ts chỉ
// xác nhận "có đăng nhập hay không", chưa biết đăng nhập với quyền gì).
export function getSessionUser(req: NextRequest): AdminUser | null {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const username = verifySessionToken(token);
  if (!username) return null;
  return getUserByUsername(username);
}

export function isAdmin(user: AdminUser | null): boolean {
  return user?.role === "admin";
}

// Admin luôn được phép; "editor" chỉ được phép nếu collection nằm trong
// danh sách permissions do admin cấp cho họ.
export function canAccessCollection(user: AdminUser | null, collectionId: CollectionId): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  return user.permissions.includes(collectionId);
}

// Dùng riêng cho GET danh sách item: nới thêm cho các collection "tra cứu"
// (options source) mà user không có quyền quản lý trực tiếp — xem giải
// thích ở OPTIONS_SOURCE_IDS phía trên.
export function canReadCollection(user: AdminUser | null, collectionId: CollectionId): boolean {
  if (!user) return false;
  if (canAccessCollection(user, collectionId)) return true;
  return OPTIONS_SOURCE_IDS.has(collectionId);
}
