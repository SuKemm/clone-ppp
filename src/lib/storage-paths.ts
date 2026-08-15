import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ---------------------------------------------------------------------------
// Vì sao file này tồn tại
// ---------------------------------------------------------------------------
// Toàn bộ CMS (content/data/*.json) và ảnh upload (public/uploads/) được
// thiết kế để chạy trên VPS — nơi filesystem của project là ổ đĩa thật, ghi
// được và tồn tại lâu dài (xem README-admin.md, huong-dan-deploy.md).
//
// Trên Vercel (và mọi nền tảng serverless tương tự), thư mục code
// (`process.cwd()`, tức `/var/task` trên Vercel) là READ-ONLY. Gọi
// `fs.mkdirSync`/`fs.writeFileSync` vào đó sẽ ném lỗi ENOENT/EROFS — đây
// chính là lỗi "mkdir '/var/task/content/data'" đang gặp.
//
// Hàm dưới đây thử ghi vào đường dẫn "chuẩn" (dùng cho VPS) trước; nếu thất
// bại (read-only), tự động chuyển sang một thư mục trong `os.tmpdir()`
// (luôn ghi được trên Vercel) để trang không bị crash khi test/demo.
//
// ⚠️ Lưu ý quan trọng khi test trên Vercel:
// `os.tmpdir()` (`/tmp`) trên Vercel KHÔNG bền vững — dữ liệu có thể mất khi
// function "nguội" (cold start) và KHÔNG dùng chung giữa nhiều instance chạy
// song song. Vì vậy trên Vercel, việc thêm/sửa bài qua `/admin` chỉ đáng tin
// trong phạm vi 1 phiên test ngắn — không dùng để lưu nội dung thật. Khi
// deploy bản chính lên VPS (Phần A/C trong huong-dan-deploy.md), thư mục
// `content/data/` và `public/uploads/` là ổ đĩa thật nên hoạt động bình
// thường, không bị giới hạn này.

function tryMkdir(dir: string): boolean {
  try {
    fs.mkdirSync(dir, { recursive: true });
    // Xác nhận thực sự ghi được (mkdirSync có thể "thành công" trên vài
    // filesystem read-only đặc biệt nhưng writeFileSync mới thực sự lộ lỗi).
    const probe = path.join(dir, ".write-test");
    fs.writeFileSync(probe, "");
    fs.unlinkSync(probe);
    return true;
  } catch {
    return false;
  }
}

function resolveWritableDir(preferred: string, tmpSubdir: string): string {
  if (tryMkdir(preferred)) return preferred;
  const fallback = path.join(os.tmpdir(), tmpSubdir);
  fs.mkdirSync(fallback, { recursive: true });
  return fallback;
}

let cachedDataDir: string | null = null;
let cachedUploadsDir: string | null = null;

/** Thư mục lưu file JSON của CMS (content/data trên VPS, /tmp trên Vercel). */
export function getContentDataDir(): string {
  if (cachedDataDir) return cachedDataDir;
  cachedDataDir = resolveWritableDir(
    path.join(process.cwd(), "content", "data"),
    "ptsc-content-data"
  );
  return cachedDataDir;
}

/** Thư mục lưu ảnh upload (public/uploads trên VPS, /tmp trên Vercel). */
export function getUploadsDir(): string {
  if (cachedUploadsDir) return cachedUploadsDir;
  cachedUploadsDir = resolveWritableDir(
    path.join(process.cwd(), "public", "uploads"),
    "ptsc-uploads"
  );
  return cachedUploadsDir;
}

/** true nếu ảnh đang được lưu ở thư mục thật public/uploads (không phải /tmp fallback). */
export function isUploadsDirPublic(): boolean {
  return getUploadsDir() === path.join(process.cwd(), "public", "uploads");
}
