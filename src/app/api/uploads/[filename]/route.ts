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
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
};

const VIDEO_EXTS = new Set(["mp4", "webm", "mov"]);

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
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
  let stat: fs.Stats;
  try {
    stat = fs.statSync(fp);
  } catch {
    return NextResponse.json({ error: "Không tìm thấy file" }, { status: 404 });
  }

  // Video có thể tới ~100MB — không đọc hết vào RAM (fs.readFileSync) như
  // ảnh/PDF nhỏ nữa. Thay vào đó stream trực tiếp từ đĩa, và hỗ trợ HTTP
  // Range request (206 Partial Content) để trình duyệt tua video được và
  // không phải tải hết 100MB mới bắt đầu phát.
  if (VIDEO_EXTS.has(ext)) {
    const range = req.headers.get("range");
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      const start = match && match[1] ? parseInt(match[1], 10) : 0;
      const end = match && match[2] ? parseInt(match[2], 10) : stat.size - 1;
      const chunkSize = end - start + 1;
      const nodeStream = fs.createReadStream(fp, { start, end });
      const webStream = nodeStreamToWeb(nodeStream);
      return new NextResponse(webStream, {
        status: 206,
        headers: {
          "Content-Type": contentType,
          "Content-Range": `bytes ${start}-${end}/${stat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": String(chunkSize),
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
    const nodeStream = fs.createReadStream(fp);
    const webStream = nodeStreamToWeb(nodeStream);
    return new NextResponse(webStream, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(stat.size),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

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

function nodeStreamToWeb(nodeStream: fs.ReadStream): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => controller.enqueue(new Uint8Array(chunk as Buffer)));
      nodeStream.on("end", () => controller.close());
      nodeStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      nodeStream.destroy();
    },
  });
}
