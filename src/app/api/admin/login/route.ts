import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, checkPassword, createSessionToken } from "@/lib/cms/auth";

export async function POST(req: NextRequest) {
  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  let ok = false;
  try {
    ok = checkPassword(password);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }

  if (!ok) {
    return NextResponse.json({ error: "Sai mật khẩu" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 60 * 60,
  });
  return res;
}
