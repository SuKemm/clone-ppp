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
};

const g = globalThis as unknown as { __visitorStore?: VisitorStore };

export const ONLINE_WINDOW_MS = 60_000; // khớp với chu kỳ heartbeat 25s ở client

function createStore(): VisitorStore {
  return {
    online: new Map(),
    byDay: new Map(),
    byWeek: new Map(),
    allTime: new Set(),
  };
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
  const now = Date.now();
  visitorStore.online.set(visitorId, now);

  const day = todayKey();
  const week = weekKey();
  if (!visitorStore.byDay.has(day)) visitorStore.byDay.set(day, new Set());
  if (!visitorStore.byWeek.has(week)) visitorStore.byWeek.set(week, new Set());
  visitorStore.byDay.get(day)!.add(visitorId);
  visitorStore.byWeek.get(week)!.add(visitorId);
  visitorStore.allTime.add(visitorId);

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
  const now = Date.now();
  for (const [id, lastSeen] of visitorStore.online) {
    if (now - lastSeen > ONLINE_WINDOW_MS) visitorStore.online.delete(id);
  }

  return {
    online: visitorStore.online.size,
    today: visitorStore.byDay.get(todayKey())?.size ?? 0,
    thisWeek: visitorStore.byWeek.get(weekKey())?.size ?? 0,
    total: visitorStore.allTime.size,
  };
}
