import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionToken } from "@/lib/cms/auth";
import { verifyCredentials } from "@/lib/cms/users";

export async function POST(req: NextRequest) {
  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = typeof body?.username === "string" ? body.username.trim() : "";
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  if (!username || !password) {
    return NextResponse.json(
      { error: "Vui lòng nhập tên đăng nhập và mật khẩu" },
      { status: 400 }
    );
  }

  let ok = false;
  try {
    ok = verifyCredentials(username, password);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }

  if (!ok) {
    return NextResponse.json({ error: "Sai tên đăng nhập hoặc mật khẩu" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 60 * 60,
  });
  return res;
}
