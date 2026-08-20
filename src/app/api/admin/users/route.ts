import { NextRequest, NextResponse } from "next/server";
import { createUser, listUsers } from "@/lib/cms/users";

export async function GET() {
  return NextResponse.json({ users: listUsers() });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!/^[a-zA-Z0-9_-]{3,32}$/.test(username)) {
    return NextResponse.json(
      { error: "Tên đăng nhập chỉ gồm chữ/số/gạch dưới/gạch ngang, 3-32 ký tự" },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Mật khẩu cần tối thiểu 6 ký tự" }, { status: 400 });
  }

  try {
    const user = createUser(username, password);
    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
