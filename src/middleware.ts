import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/cms/auth";

// Chạy trên MỌI route (trừ file tĩnh/_next) — không chỉ /admin như trước —
// vì giờ middleware còn phải gắn header "x-pathname" cho layout gốc đọc
// (xem src/app/layout.tsx) để set đúng <html lang="vi"|"en">. Logic kiểm
// tra đăng nhập admin bên dưới vẫn CHỈ áp dụng cho /admin, /api/admin như
// cũ — các route khác chỉ đi qua để được gắn thêm header pathname.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export const runtime = "nodejs";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Next.js chỉ cho phép DUY NHẤT 1 thẻ <html> trong toàn app (render ở
  // layout gốc) — nên /en-US/layout.tsx (chỉ pass-through) không thể tự đặt
  // lang="en" cho riêng nhánh /en-US được. Gắn pathname vào REQUEST header
  // ở đây để layout gốc đọc lại bằng headers() và tự chọn "vi" hay "en".
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);
  const next = () => NextResponse.next({ request: { headers: requestHeaders } });

  // Trang/API login luôn cho qua, không thì không ai đăng nhập được.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const valid = verifySessionToken(token);

    if (!valid) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return next();
}
