import { NextRequest, NextResponse } from "next/server";
import { createUser, listUsers, type AdminRole } from "@/lib/cms/users";
import { getSessionUser, isAdmin } from "@/lib/cms/permissions";
import type { CollectionId } from "@/lib/cms/schema";

// Chỉ Admin mới được xem/tạo tài khoản — user con ("editor") không được vào
// mục Người dùng dù có gõ thẳng URL API.
export async function GET(req: NextRequest) {
  const me = getSessionUser(req);
  if (!isAdmin(me)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  return NextResponse.json({ users: listUsers() });
}

export async function POST(req: NextRequest) {
  const me = getSessionUser(req);
  if (!isAdmin(me)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const role: AdminRole = body?.role === "editor" ? "editor" : "admin";
  const permissions: CollectionId[] = Array.isArray(body?.permissions) ? body.permissions : [];

  if (!/^[a-zA-Z0-9_-]{3,32}$/.test(username)) {
    return NextResponse.json(
      { error: "Tên đăng nhập chỉ gồm chữ/số/gạch dưới/gạch ngang, 3-32 ký tự" },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Mật khẩu cần tối thiểu 6 ký tự" }, { status: 400 });
  }
  if (role === "editor" && permissions.length === 0) {
    return NextResponse.json(
      { error: "Chọn ít nhất 1 mục nội dung mà user con này được phép quản lý" },
      { status: 400 }
    );
  }

  try {
    const user = createUser(username, password, role, permissions);
    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
