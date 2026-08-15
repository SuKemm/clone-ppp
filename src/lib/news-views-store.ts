import fs from "node:fs";
import path from "node:path";

// Lưu số lượt xem từng bài viết (theo `id` của item trong collection "news")
// thành 1 file JSON, cùng thư mục với dữ liệu CMS — xem ghi chú trong
// `src/lib/cms/store.ts` để hiểu vì sao dùng file thay vì DB, và vì sao
// thư mục này không đưa vào Git.
const DATA_DIR = path.join(process.cwd(), "content", "data");
const FILE_PATH = path.join(DATA_DIR, "news-views.json");

type ViewsMap = Record<string, number>;

function readAll(): ViewsMap {
  try {
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(raw) as ViewsMap;
  } catch {
    return {};
  }
}

function writeAll(data: ViewsMap) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/** Đọc số lượt xem hiện có của 1 bài viết (0 nếu chưa từng được xem). */
export function getViews(id: string): number {
  const all = readAll();
  return all[id] ?? 0;
}

/** Tăng lượt xem của 1 bài viết lên 1 và trả về số mới. */
export function incrementViews(id: string): number {
  const all = readAll();
  all[id] = (all[id] ?? 0) + 1;
  writeAll(all);
  return all[id];
}
