import { NextRequest, NextResponse } from "next/server";
import { getCollectionDef, type CollectionId } from "@/lib/cms/schema";
import { reorderItem } from "@/lib/cms/store";
import { canAccessCollection, getSessionUser } from "@/lib/cms/permissions";

type Params = { params: Promise<{ collection: string }> };

// Đổi vị trí 1 item lên/xuống trong danh sách — dùng cho các collection khai
// báo `reorderable: true` trong schema (vd: "hero-slides"). Body:
// { id: string, direction: "up" | "down" }
export async function POST(req: NextRequest, { params }: Params) {
  const { collection } = await params;
  const def = getCollectionDef(collection);
  if (!def) return NextResponse.json({ error: "unknown collection" }, { status: 404 });
  if (!def.reorderable) {
    return NextResponse.json({ error: "collection không hỗ trợ sắp xếp" }, { status: 400 });
  }
  if (!canAccessCollection(getSessionUser(req), def.id)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const id = body?.id;
  const direction = body?.direction;
  if (typeof id !== "string" || (direction !== "up" && direction !== "down")) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const items = reorderItem(collection as CollectionId, id, direction);
  if (!items) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ items });
}
