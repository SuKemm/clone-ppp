// Đếm lượt xem từng bài viết, lưu TRONG BỘ NHỚ của tiến trình Node.js —
// giống hệt cách src/lib/visitor-store.ts đang đếm số liệu truy cập.
// Đúng vì web chạy bằng server.js (1 tiến trình Node sống liên tục), không
// phải serverless. Lưu ý: mỗi lần restart/deploy lại server, số liệu sẽ về 0.
// Nếu sau này cần số liệu bền vững qua các lần deploy, hãy thay Map này
// bằng một nơi lưu dùng chung (ví dụ database hoặc Redis).

const g = globalThis as unknown as { __newsViewStore?: Map<string, number> };

export const newsViewStore: Map<string, number> =
  g.__newsViewStore ?? (g.__newsViewStore = new Map());

/** Tăng lượt xem của 1 bài viết lên 1, trả về số lượt xem mới. */
export function incrementView(slug: string): number {
  const next = (newsViewStore.get(slug) ?? 0) + 1;
  newsViewStore.set(slug, next);
  return next;
}

/** Lấy lượt xem hiện tại của 1 bài viết (không tăng). */
export function getView(slug: string): number {
  return newsViewStore.get(slug) ?? 0;
}

/** Lấy lượt xem của nhiều bài viết cùng lúc (dùng cho trang danh sách). */
export function getViews(slugs: string[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const slug of slugs) result[slug] = newsViewStore.get(slug) ?? 0;
  return result;
}
