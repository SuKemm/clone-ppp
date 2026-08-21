import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getUploadsDir, isUploadsDirPublic } from "@/lib/storage-paths";

const ALLOWED_IMAGES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_DOCS = new Set(["application/pdf"]);
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB
const MAX_DOC_BYTES = 20 * 1024 * 1024; // 20MB — file cổ đông/báo cáo thường dày hơn ảnh

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Thiếu file" }, { status: 400 });
  }

  const isImage = ALLOWED_IMAGES.has(file.type);
  const isDoc = ALLOWED_DOCS.has(file.type);
  if (!isImage && !isDoc) {
    return NextResponse.json({ error: "Chỉ nhận ảnh jpg/png/webp/gif hoặc file PDF" }, { status: 400 });
  }
  const maxBytes = isDoc ? MAX_DOC_BYTES : MAX_IMAGE_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: isDoc ? "File PDF vượt quá 20MB" : "Ảnh vượt quá 8MB" },
      { status: 400 }
    );
  }

  const uploadDir = getUploadsDir();
  fs.mkdirSync(uploadDir, { recursive: true });
  const ext = isDoc ? "pdf" : file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
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
