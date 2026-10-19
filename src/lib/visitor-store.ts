// Đếm số liệu truy cập TRONG BỘ NHỚ của tiến trình Node.js.
//
// Việc này chỉ đúng vì web chạy bằng `server.js` tự viết (http.createServer)
// — nghĩa là 1 tiến trình Node sống liên tục, không phải các function
// "serverless" độc lập như Vercel. Nếu sau này bạn chạy nhiều instance
// cùng lúc (ví dụ PM2 cluster mode nhiều worker, hoặc nhiều server đứng
// sau load balancer), số liệu sẽ bị tách rời giữa các tiến trình và không
// còn chính xác — lúc đó cần chuyển sang một nơi lưu dùng chung như Redis.
//
// Dùng `globalThis` để giữ lại state qua các lần Next.js hot-reload code
// lúc `next dev`, tránh bị tạo lại Map rỗng liên tục.

import fs from "node:fs";
import path from "node:path";
import { getContentDataDir } from "@/lib/storage-paths";

// ---------------------------------------------------------------------------
// LƯU "TỔNG TRUY CẬP" XUỐNG Ổ ĐĨA
// ---------------------------------------------------------------------------
// Chỉ `allTime` (Tổng truy cập) được ghi ra file content/data/visitor-total.json
// để KHÔNG mất khi server/Node.js khởi động lại (deploy, Plesk restart, hết
// thời gian chờ, crash...). Các bộ đếm Đang online / Hôm nay / Tuần này vẫn
// giữ nguyên cách cũ (trong RAM).
//
// File có dạng: { "offset": 0, "ids": ["<visitorId>", ...] }
//  - ids   : danh sách visitorId đã từng ghé (để không đếm trùng 1 người).
//  - offset: số cộng thêm vào tổng. Muốn "khởi động" tổng ở một con số nào đó
//            (ví dụ đã đếm được 31 trước khi bật tính năng này) thì sửa offset.
// Thư mục content/data/ đã nằm trong .gitignore nên `git pull` không ghi đè.

const TOTAL_FILE = "visitor-total.json";
const SAVE_DEBOUNCE_MS = 1000;

function totalFilePath() {
  return path.join(getContentDataDir(), TOTAL_FILE);
}

function loadTotalFromDisk(): { offset: number; ids: Set<string> } {
  try {
    const data = JSON.parse(fs.readFileSync(totalFilePath(), "utf-8"));
    const ids = Array.isArray(data?.ids)
      ? data.ids.filter((x: unknown): x is string => typeof x === "string")
      : [];
    const offset = Number.isFinite(data?.offset) ? Math.max(0, Math.floor(data.offset)) : 0;
    return { offset, ids: new Set(ids) };
  } catch {
    return { offset: 0, ids: new Set() }; // chưa có file / file hỏng → bắt đầu mới
  }
}

type VisitorStore = {
  // visitorId -> lastSeen (ms). Người được coi là "đang online" nếu
  // lastSeen trong ONLINE_WINDOW_MS gần nhất.
  online: Map<string, number>;
  // "YYYY-MM-DD" -> Set các visitorId duy nhất đã ghé trong ngày đó
  byDay: Map<string, Set<string>>;
  // "YYYY-Www" (ISO week) -> Set các visitorId duy nhất trong tuần đó
  byWeek: Map<string, Set<string>>;
  // Toàn bộ visitorId từng ghé từ trước tới nay (để tính "Tổng truy cập")
  allTime: Set<string>;
  // Số cộng thêm vào Tổng truy cập (đọc từ file), và cờ đã nạp file chưa.
  totalOffset: number;
  totalLoaded: boolean;
  saveTimer: ReturnType<typeof setTimeout> | null;
};

const g = globalThis as unknown as { __visitorStore?: VisitorStore };

export const ONLINE_WINDOW_MS = 60_000; // khớp với chu kỳ heartbeat 25s ở client

function createStore(): VisitorStore {
  return {
    online: new Map(),
    byDay: new Map(),
    byWeek: new Map(),
    allTime: new Set(),
    totalOffset: 0,
    totalLoaded: false,
    saveTimer: null,
  };
}

/** Nạp "Tổng truy cập" từ file đúng 1 lần (lười: chỉ khi có request đầu tiên). */
function ensureTotalLoaded() {
  if (visitorStore.totalLoaded) return;
  visitorStore.totalLoaded = true;
  const saved = loadTotalFromDisk();
  visitorStore.totalOffset = saved.offset;
  // Gộp với những ID đã có trong RAM (nếu có) để không mất người nào.
  for (const id of visitorStore.allTime) saved.ids.add(id);
  visitorStore.allTime = saved.ids;
}

/** Ghi "Tổng truy cập" xuống file (gộp nhiều lần ghi trong 1 giây thành 1). */
function scheduleSaveTotal() {
  if (visitorStore.saveTimer) return;
  visitorStore.saveTimer = setTimeout(() => {
    visitorStore.saveTimer = null;
    try {
      fs.mkdirSync(getContentDataDir(), { recursive: true });
      const file = totalFilePath();
      const tmp = `${file}.tmp`;
      fs.writeFileSync(
        tmp,
        JSON.stringify({ offset: visitorStore.totalOffset, ids: [...visitorStore.allTime] }),
        "utf-8"
      );
      fs.renameSync(tmp, file); // ghi file tạm rồi đổi tên: không bị hỏng file nếu mất điện giữa chừng
    } catch (err) {
      console.error("[visitor-store] Không ghi được visitor-total.json:", err);
    }
  }, SAVE_DEBOUNCE_MS);
}

export const visitorStore: VisitorStore = g.__visitorStore ?? (g.__visitorStore = createStore());

export function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD (giờ UTC)
}

export function weekKey(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

/** Ghi nhận 1 heartbeat từ visitorId, cập nhật mọi bộ đếm liên quan. */
export function recordHeartbeat(visitorId: string) {
  ensureTotalLoaded();
  const now = Date.now();
  visitorStore.online.set(visitorId, now);

  const day = todayKey();
  const week = weekKey();
  if (!visitorStore.byDay.has(day)) visitorStore.byDay.set(day, new Set());
  if (!visitorStore.byWeek.has(week)) visitorStore.byWeek.set(week, new Set());
  visitorStore.byDay.get(day)!.add(visitorId);
  visitorStore.byWeek.get(week)!.add(visitorId);
  if (!visitorStore.allTime.has(visitorId)) {
    visitorStore.allTime.add(visitorId);
    scheduleSaveTotal(); // chỉ ghi file khi có người MỚI, không ghi mỗi heartbeat
  }

  // Dọn rác gọn nhẹ: xoá các ngày/tuần đã cũ (>14 ngày) để Map không phình
  // to vô hạn theo thời gian chạy của server.
  if (visitorStore.byDay.size > 30) {
    const cutoff = new Date(Date.now() - 14 * 86400_000).toISOString().slice(0, 10);
    for (const key of visitorStore.byDay.keys()) {
      if (key < cutoff) visitorStore.byDay.delete(key);
    }
  }
  if (visitorStore.byWeek.size > 12) {
    const oldestAllowed = weekKey(new Date(Date.now() - 60 * 86400_000));
    for (const key of visitorStore.byWeek.keys()) {
      if (key < oldestAllowed) visitorStore.byWeek.delete(key);
    }
  }
}

/** Trả về số liệu hiện tại, sau khi dọn các online-entry đã hết hạn. */
export function getStats() {
  ensureTotalLoaded();
  const now = Date.now();
  for (const [id, lastSeen] of visitorStore.online) {
    if (now - lastSeen > ONLINE_WINDOW_MS) visitorStore.online.delete(id);
  }

  return {
    online: visitorStore.online.size,
    today: visitorStore.byDay.get(todayKey())?.size ?? 0,
    thisWeek: visitorStore.byWeek.get(weekKey())?.size ?? 0,
    total: visitorStore.totalOffset + visitorStore.allTime.size,
  };
}
