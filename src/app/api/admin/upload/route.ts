import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Thiếu file" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Chỉ nhận ảnh jpg/png/webp/gif" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Ảnh vượt quá 8MB" }, { status: 400 });
  }

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), bytes);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
