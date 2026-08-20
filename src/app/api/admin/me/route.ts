import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/cms/permissions";

// Cho phép giao diện /admin biết đang đăng nhập với username/role/quyền
// nào (dùng để hiện đúng menu sidebar), không trả bất kỳ thông tin mật
// khẩu nào.
export async function GET(req: NextRequest) {
  const user = getSessionUser(req);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({
    id: user.id,
    username: user.username,
    role: user.role,
    permissions: user.permissions,
  });
}
