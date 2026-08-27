import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/cms/auth";

// Chạy trên MỌI route (trừ file tĩnh/_next) — không chỉ /admin như trước —
// vì giờ middleware còn phải gắn header "x-pathname" cho layout gốc đọc
// (xem src/app/layout.tsx) để set đúng <html lang="vi"|"en">. Logic kiểm
// tra đăng nhập admin bên dưới vẫn CHỈ áp dụng cho /admin, /api/admin như
// cũ — các route khác chỉ đi qua để được gắn thêm header pathname.
//
// LOẠI RIÊNG /api/admin/upload ra khỏi middleware: Next.js (cả bản 15 và
// 16) có một race condition đã biết — middleware chạy runtime "nodejs"
// đứng trước một route có body có thể khiến request.body.finalize() phía
// dưới không được "await" đúng lúc, làm route handler phía sau đọc phải
// body chưa hoàn tất/rỗng. Với route upload (multipart/form-data), hậu
// quả là req.formData() báo lỗi "Failed to parse body as FormData." dù
// file gửi lên hoàn toàn hợp lệ. Cách an toàn nhất là để middleware
// KHÔNG chạm vào request này — route /api/admin/upload/route.ts tự kiểm
// tra đăng nhập admin ngay trong handler thay cho middleware.
//
// Loại trừ thêm các thư mục ảnh/video/upload tĩnh trong /public và các
// đuôi file tĩnh thông dụng, để không chạy middleware một cách thừa thãi
// trên hàng trăm request ảnh/video mỗi khi tải trang.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/|uploads/|seo/|api/admin/upload|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|mp4|pdf)$).*)",
  ],
};

export const runtime = "nodejs";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // API (trừ /api/admin/upload đã bị loại ở matcher phía trên): KHÔNG
  // dựng lại request/headers ở đây. API cũng không cần header x-pathname
  // (header đó chỉ để layout gốc chọn lang="vi"|"en" cho các TRANG HTML).
  if (pathname.startsWith("/api")) {
    if (pathname === "/api/admin/login") {
      return NextResponse.next();
    }

    if (pathname.startsWith("/api/admin")) {
      const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
      const valid = verifySessionToken(token);

      if (!valid) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.next();
  }

  // Các trang HTML: giữ nguyên logic gắn x-pathname như cũ để layout gốc
  // đọc lại bằng headers() và tự chọn "vi" hay "en".
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);
  const next = () => NextResponse.next({ request: { headers: requestHeaders } });

  // Trang login luôn cho qua, không thì không ai đăng nhập được.
  if (pathname === "/admin/login") {
    return next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const valid = verifySessionToken(token);

    if (!valid) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return next();
}
