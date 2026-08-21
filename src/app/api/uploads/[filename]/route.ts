import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getUploadsDir } from "@/lib/storage-paths";

// Chỉ dùng khi ảnh được ghi vào thư mục fallback (/tmp trên Vercel) — xem
// giải thích trong src/lib/storage-paths.ts và src/app/api/admin/upload/route.ts.
// Trên VPS, ảnh nằm sẵn trong public/uploads nên được Next serve tĩnh, không
// đi qua route này.

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Chặn path traversal — chỉ cho phép tên file dạng đã tạo ở route upload.
  if (!/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(filename)) {
    return NextResponse.json({ error: "Tên file không hợp lệ" }, { status: 400 });
  }

  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const contentType = MIME[ext];
  if (!contentType) {
    return NextResponse.json({ error: "Định dạng không được hỗ trợ" }, { status: 400 });
  }

  const fp = path.join(getUploadsDir(), filename);
  try {
    const bytes = fs.readFileSync(fp);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Không tìm thấy ảnh" }, { status: 404 });
  }
}
