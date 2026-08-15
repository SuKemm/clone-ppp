import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getUploadsDir, isUploadsDirPublic } from "@/lib/storage-paths";

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

  const uploadDir = getUploadsDir();
  fs.mkdirSync(uploadDir, { recursive: true });
  const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadDir, filename), bytes);

  // Trên VPS, public/uploads được Next serve tĩnh nên dùng /uploads/... như cũ.
  // Trên Vercel (fallback ghi vào /tmp), /uploads/... không truy cập được vì
  // /tmp nằm ngoài thư mục public — phải đi qua route /api/uploads/... để đọc
  // và trả về đúng file (xem src/app/api/uploads/[filename]/route.ts).
  const url = isUploadsDirPublic() ? `/uploads/${filename}` : `/api/uploads/${filename}`;
  return NextResponse.json({ url });
}
