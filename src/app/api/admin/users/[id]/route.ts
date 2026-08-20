import { NextRequest, NextResponse } from "next/server";
import { deleteUser, updateUser, type AdminRole } from "@/lib/cms/users";
import { getSessionUser, isAdmin } from "@/lib/cms/permissions";
import type { CollectionId } from "@/lib/cms/schema";

type Params = { params: Promise<{ id: string }> };

// Đổi role/permissions và/hoặc đặt lại mật khẩu cho 1 user con — chỉ Admin.
export async function PUT(req: NextRequest, { params }: Params) {
  const me = getSessionUser(req);
  if (!isAdmin(me)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json().catch(() => null);

  const role: AdminRole | undefined =
    body?.role === "admin" || body?.role === "editor" ? body.role : undefined;
  const permissions: CollectionId[] | undefined = Array.isArray(body?.permissions)
    ? body.permissions
    : undefined;
  const password = typeof body?.password === "string" && body.password ? body.password : undefined;

  if (role === "editor" && (permissions ?? []).length === 0) {
    return NextResponse.json(
      { error: "Chọn ít nhất 1 mục nội dung mà user con này được phép quản lý" },
      { status: 400 }
    );
  }
  if (password !== undefined && password.length < 6) {
    return NextResponse.json({ error: "Mật khẩu cần tối thiểu 6 ký tự" }, { status: 400 });
  }
  // Admin không tự hạ quyền chính mình xuống editor — tránh tự khoá mình
  // khỏi mục Người dùng ngay trong lúc đang thao tác.
  if (me!.id === id && role === "editor") {
    return NextResponse.json({ error: "Không thể tự hạ quyền của chính mình" }, { status: 400 });
  }

  try {
    const user = updateUser(id, { role, permissions, password });
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const me = getSessionUser(req);
  if (!isAdmin(me)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  if (me!.id === id) {
    return NextResponse.json({ error: "Không thể tự xoá chính mình" }, { status: 400 });
  }
  try {
    const ok = deleteUser(id);
    if (!ok) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
