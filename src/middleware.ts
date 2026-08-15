import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/cms/auth";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export const runtime = "nodejs";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Trang/API login luôn cho qua, không thì không ai đăng nhập được.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

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

  return NextResponse.next();
}
