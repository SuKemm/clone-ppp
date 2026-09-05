import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getCollectionDef, type CollectionId } from "./schema";
import { getContentDataDir } from "@/lib/storage-paths";

// Toàn bộ nội dung do admin nhập được lưu thành file JSON tại thư mục này
// (nằm ngoài `src/`, không build vào code, và được .gitignore — xem ghi chú
// trong README-admin.md để hiểu vì sao không đưa file này vào Git).
//
// Trên nền tảng serverless (Vercel), `process.cwd()` là read-only nên
// `getContentDataDir()` tự chuyển sang thư mục tạm — xem giải thích chi tiết
// trong `src/lib/storage-paths.ts`.

export type CmsItem = Record<string, string> & { id: string };

function filePath(collection: CollectionId) {
  return path.join(getContentDataDir(), `${collection}.json`);
}

function ensureFile(collection: CollectionId): CmsItem[] {
  fs.mkdirSync(getContentDataDir(), { recursive: true });
  const fp = filePath(collection);
  if (!fs.existsSync(fp)) {
    const def = getCollectionDef(collection);
    const seeded: CmsItem[] = (def?.seed ?? []).map((item) => ({
      id: randomUUID(),
      ...item,
    }));
    fs.writeFileSync(fp, JSON.stringify(seeded, null, 2), "utf-8");
    return seeded;
  }
  try {
    const raw = fs.readFileSync(fp, "utf-8");
    return JSON.parse(raw) as CmsItem[];
  } catch {
    return [];
  }
}

function writeAll(collection: CollectionId, items: CmsItem[]) {
  fs.mkdirSync(getContentDataDir(), { recursive: true });
  fs.writeFileSync(filePath(collection), JSON.stringify(items, null, 2), "utf-8");
}

/** Đọc toàn bộ item của 1 collection — dùng ở các trang public (Server Component). */
export function getCollection(collection: CollectionId): CmsItem[] {
  return ensureFile(collection);
}

export function createItem(collection: CollectionId, data: Record<string, string>): CmsItem {
  const items = ensureFile(collection);
  const item: CmsItem = { id: randomUUID(), ...data };
  items.unshift(item);
  writeAll(collection, items);
  return item;
}

export function updateItem(
  collection: CollectionId,
  id: string,
  data: Record<string, string>
): CmsItem | null {
  const items = ensureFile(collection);
  const idx = items.findIndex((it) => it.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data, id };
  writeAll(collection, items);
  return items[idx];
}

export function deleteItem(collection: CollectionId, id: string): boolean {
  const items = ensureFile(collection);
  const next = items.filter((it) => it.id !== id);
  const changed = next.length !== items.length;
  if (changed) writeAll(collection, next);
  return changed;
}

/**
 * Đổi chỗ 1 item với item liền trước ("up") hoặc liền sau ("down") trong
 * mảng — thứ tự trong file JSON chính là thứ tự hiển thị ngoài trang public
 * (vd: banner trang chủ chạy đúng theo thứ tự admin đã xếp trong /admin).
 * Không làm gì nếu item đã ở đầu/cuối danh sách.
 */
export function reorderItem(
  collection: CollectionId,
  id: string,
  direction: "up" | "down"
): CmsItem[] | null {
  const items = ensureFile(collection);
  const idx = items.findIndex((it) => it.id === id);
  if (idx === -1) return null;

  const targetIdx = direction === "up" ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= items.length) return items; // đã ở đầu/cuối, không đổi

  [items[idx], items[targetIdx]] = [items[targetIdx], items[idx]];
  writeAll(collection, items);
  return items;
}
