import { NextRequest, NextResponse } from "next/server";
import { getCollectionDef, type CollectionId } from "@/lib/cms/schema";
import { deleteItem, updateItem } from "@/lib/cms/store";

type Params = { params: Promise<{ collection: string; id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const { collection, id } = await params;
  const def = getCollectionDef(collection);
  if (!def) return NextResponse.json({ error: "unknown collection" }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const data: Record<string, string> = {};
  for (const field of def.fields) {
    const v = body[field.key];
    if (field.required && (!v || String(v).trim() === "")) {
      return NextResponse.json({ error: `Thiếu trường bắt buộc: ${field.label}` }, { status: 400 });
    }
    data[field.key] = typeof v === "string" ? v : "";
  }

  const item = updateItem(collection as CollectionId, id, data);
  if (!item) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { collection, id } = await params;
  const def = getCollectionDef(collection);
  if (!def) return NextResponse.json({ error: "unknown collection" }, { status: 404 });

  const ok = deleteItem(collection as CollectionId, id);
  if (!ok) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
