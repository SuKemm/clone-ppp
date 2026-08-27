import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getUploadsDir } from "@/lib/storage-paths";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/cms/auth";

const ALLOWED_IMAGES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_DOCS = new Set(["application/pdf"]);
// mp4/webm/quicktime(.mov) — 3 định dạng phổ biến nhất, trình duyệt phát
// được trực tiếp bằng thẻ <video> không cần chuyển mã.
const ALLOWED_VIDEOS = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const MAX_IMAGE_BYTES = 60 * 1024 * 1024; // 60MB
const MAX_DOC_BYTES = 60 * 1024 * 1024; // 60MB
const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100MB — theo yêu cầu

// App Router route handler: không có giới hạn bodyParser kiểu Pages API,
// nhưng vẫn cần khai báo rõ runtime Node (không phải Edge) vì ta dùng
// node:fs để ghi file lớn thẳng ra ổ đĩa.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Route này bị loại khỏi middleware (xem src/middleware.ts) để tránh
  // race condition đã biết của Next.js (15 & 16): middleware Node.js chạy
  // trước route có body có thể khiến req.formData() phía sau đọc phải
  // body chưa hoàn tất/rỗng, gây lỗi "Failed to parse body as FormData."
  // Vì vậy phải tự kiểm tra đăng nhập admin ngay tại đây.
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Thiếu file" },
        { status: 400 }
      );
    }

    const isImage = ALLOWED_IMAGES.has(file.type);
    const isDoc = ALLOWED_DOCS.has(file.type);
    const isVideo = ALLOWED_VIDEOS.has(file.type);

    if (!isImage && !isDoc && !isVideo) {
      return NextResponse.json(
        {
          error:
            "Chỉ nhận ảnh jpg/png/webp/gif, file PDF, hoặc video mp4/webm/mov",
        },
        { status: 400 }
      );
    }

    const maxBytes = isVideo
      ? MAX_VIDEO_BYTES
      : isDoc
      ? MAX_DOC_BYTES
      : MAX_IMAGE_BYTES;

    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          error: isVideo
            ? "Video vượt quá 100MB"
            : isDoc
            ? "File PDF vượt quá 60MB"
            : "Ảnh vượt quá 60MB",
        },
        { status: 400 }
      );
    }

    const uploadDir = getUploadsDir();

    console.log("Upload directory:", uploadDir);
    console.log("File:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    fs.mkdirSync(uploadDir, { recursive: true });

    const ext = isVideo
      ? file.type.split("/")[1] === "quicktime"
        ? "mov"
        : file.type.split("/")[1]
      : isDoc
      ? "pdf"
      : file.type.split("/")[1] === "jpeg"
      ? "jpg"
      : file.type.split("/")[1];

    const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
    const destPath = path.join(uploadDir, filename);

    if (isVideo) {
      const nodeStream = fs.createWriteStream(destPath);
      const webStream = file.stream();

      await new Promise<void>((resolve, reject) => {
        const reader = webStream.getReader();

        nodeStream.on("error", reject);
        nodeStream.on("finish", resolve);

        (async function pump() {
          try {
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                nodeStream.end();
                return;
              }

              if (!nodeStream.write(value)) {
                await new Promise<void>((resolveDrain) => {
                  nodeStream.once("drain", resolveDrain);
                });
              }
            }
          } catch (err) {
            nodeStream.destroy();
            reject(err);
          }
        })();
      });
    } else {
      const bytes = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(destPath, bytes);
    }

    const url = `/api/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Lỗi không xác định khi upload file",
      },
      { status: 500 }
    );
  }
}