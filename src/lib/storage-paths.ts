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

function tryMkdir(dir: string, label: string): { ok: boolean; reason?: string } {
  try {
    fs.mkdirSync(dir, { recursive: true });
    // Xác nhận thực sự ghi được (mkdirSync có thể "thành công" trên vài
    // filesystem read-only đặc biệt nhưng writeFileSync mới thực sự lộ lỗi).
    const probe = path.join(dir, ".write-test");
    fs.writeFileSync(probe, "");
    fs.unlinkSync(probe);
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

function resolveWritableDir(preferred: string, tmpSubdir: string, label: string): string {
  const attempt = tryMkdir(preferred, label);
  if (attempt.ok) return preferred;

  // QUAN TRỌNG: in cảnh báo thật to ra log server (xem bằng `pm2 logs`) mỗi
  // khi phải fallback sang /tmp — nếu không in gì, admin lưu bài/upload ảnh
  // vẫn "thành công" bình thường trên giao diện (vì ghi vào /tmp cũng ghi
  // được), nhưng dữ liệu không hề nằm trong content/data hay public/uploads
  // của project, và MẤT SẠCH mỗi khi server restart — y hệt lỗi "lưu bài
  // không thấy vô file nào, ảnh mới upload tự nhiên biến mất" đã gặp.
  // Nguyên nhân phổ biến nhất trên VPS: thư mục preferred chưa tồn tại hoặc
  // sai quyền ghi (owner/permission) cho user đang chạy tiến trình Node.
  const fallback = path.join(os.tmpdir(), tmpSubdir);
  console.error(
    `[storage-paths] KHÔNG GHI ĐƯỢC vào "${preferred}" (${label}) — lý do: ${attempt.reason}. ` +
      `Đang dùng tạm "${fallback}" (KHÔNG bền vững, mất dữ liệu khi restart server). ` +
      `Trên VPS: kiểm tra thư mục đã tồn tại và đúng quyền ghi cho user chạy PM2 chưa — ` +
      `chạy "mkdir -p ${preferred} && chown -R \\$(whoami) ${path.dirname(preferred)}" rồi restart lại.`
  );
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
    "ptsc-content-data",
    "content/data"
  );
  return cachedDataDir;
}

/** Thư mục lưu ảnh upload (public/uploads trên VPS, /tmp trên Vercel). */
export function getUploadsDir(): string {
  if (cachedUploadsDir) return cachedUploadsDir;
  cachedUploadsDir = resolveWritableDir(
    path.join(process.cwd(), "public", "uploads"),
    "ptsc-uploads",
    "public/uploads"
  );
  return cachedUploadsDir;
}

/** true nếu ảnh đang được lưu ở thư mục thật public/uploads (không phải /tmp fallback). */
export function isUploadsDirPublic(): boolean {
  return getUploadsDir() === path.join(process.cwd(), "public", "uploads");
}
