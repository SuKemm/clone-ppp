import fs from "node:fs";
import path from "node:path";
import { getContentDataDir } from "@/lib/storage-paths";

// Lưu số lượt xem từng gói thầu (theo `id` của item trong collection
// "tenders") thành 1 file JSON riêng — cùng cơ chế với
// `src/lib/news-views-store.ts`, tách file riêng để lượt xem tin tức và
// lượt xem đấu thầu không lẫn vào nhau.

type ViewsMap = Record<string, number>;

function filePath() {
  return path.join(getContentDataDir(), "tender-views.json");
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

/** Đọc số lượt xem hiện có của 1 gói thầu (0 nếu chưa từng được xem). */
export function getViews(id: string): number {
  const all = readAll();
  return all[id] ?? 0;
}

/**
 * Đọc toàn bộ lượt xem của mọi gói thầu — dùng để dựng khối "Xem nhiều
 * nhất" (sắp xếp theo lượt xem giảm dần).
 */
export function getAllViews(): ViewsMap {
  return readAll();
}

/** Tăng lượt xem của 1 gói thầu lên 1 và trả về số mới. */
export function incrementViews(id: string): number {
  const all = readAll();
  all[id] = (all[id] ?? 0) + 1;
  writeAll(all);
  return all[id];
}
