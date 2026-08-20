import { NextRequest, NextResponse } from "next/server";
import { getCollectionDef, type CollectionId } from "@/lib/cms/schema";
import { createItem, getCollection } from "@/lib/cms/store";
import { canAccessCollection, canReadCollection, getSessionUser } from "@/lib/cms/permissions";

type Params = { params: Promise<{ collection: string }> };

function resolveCollection(collection: string) {
  const def = getCollectionDef(collection);
  if (!def) return null;
  return def;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { collection } = await params;
  const def = resolveCollection(collection);
  if (!def) return NextResponse.json({ error: "unknown collection" }, { status: 404 });
  if (!canReadCollection(getSessionUser(req), def.id)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    def,
    items: getCollection(collection as CollectionId),
  });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { collection } = await params;
  const def = resolveCollection(collection);
  if (!def) return NextResponse.json({ error: "unknown collection" }, { status: 404 });
  if (!canAccessCollection(getSessionUser(req), def.id)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

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

  const item = createItem(collection as CollectionId, data);
  return NextResponse.json({ item }, { status: 201 });
}
