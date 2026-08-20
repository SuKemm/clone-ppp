import { NextRequest, NextResponse } from "next/server";
import { deleteUser } from "@/lib/cms/users";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const ok = deleteUser(id);
    if (!ok) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
