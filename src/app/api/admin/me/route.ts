import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/cms/auth";

// Cho phép giao diện /admin biết đang đăng nhập với username nào (hiện ở
// sidebar), không trả bất kỳ thông tin mật khẩu nào.
export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const username = verifySessionToken(token);
  if (!username) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ username });
}
