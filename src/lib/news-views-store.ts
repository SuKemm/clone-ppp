import fs from "node:fs";
import path from "node:path";
import { getContentDataDir } from "@/lib/storage-paths";

// Lưu số lượt xem từng bài viết (theo `id` của item trong collection "news")
// thành 1 file JSON, cùng thư mục với dữ liệu CMS — xem ghi chú trong
// `src/lib/cms/store.ts` và `src/lib/storage-paths.ts` để hiểu vì sao dùng
// file thay vì DB, vì sao thư mục này không đưa vào Git, và vì sao trên
// Vercel thư mục thật sự dùng có thể là thư mục tạm.

type ViewsMap = Record<string, number>;

function filePath() {
  return path.join(getContentDataDir(), "news-views.json");
}

function readAll(): ViewsMap {
  try {
    const raw = fs.readFileSync(filePath(), "utf-8");
    return JSON.parse(raw) as ViewsMap;
  } catch {
    return {};
  }
}

function writeAll(data: ViewsMap) {
  fs.mkdirSync(getContentDataDir(), { recursive: true });
  fs.writeFileSync(filePath(), JSON.stringify(data, null, 2), "utf-8");
}

/** Đọc số lượt xem hiện có của 1 bài viết (0 nếu chưa từng được xem). */
export function getViews(id: string): number {
  const all = readAll();
  return all[id] ?? 0;
}

/**
 * Đọc toàn bộ lượt xem của mọi bài viết — dùng để dựng khối "Xem nhiều
 * nhất" (sắp xếp theo lượt xem giảm dần) ở trang danh sách/chi tiết, thay vì
 * chỉ hiện các bài mới nhất.
 */
export function getAllViews(): ViewsMap {
  return readAll();
}

/** Tăng lượt xem của 1 bài viết lên 1 và trả về số mới. */
export function incrementViews(id: string): number {
  const all = readAll();
  all[id] = (all[id] ?? 0) + 1;
  writeAll(all);
  return all[id];
}
