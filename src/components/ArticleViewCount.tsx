"use client";

import { useEffect, useState } from "react";

/**
 * Hiển thị lượt xem của 1 bài viết (theo `id` của item trong collection "news").
 * - mode="increment": dùng ở trang CHI TIẾT bài viết — mỗi lần trang này
 *   được mở sẽ tính thêm 1 lượt xem (gọi POST).
 * - mode="display": dùng ở trang DANH SÁCH bài viết — chỉ hiển thị số lượt
 *   xem hiện có, KHÔNG tính thêm lượt (gọi GET), tránh việc chỉ lướt qua
 *   danh sách cũng bị tính là đã xem bài.
 */
export function ArticleViewCount({
  id,
  mode,
  className,
  isEnglish = false,
  // Cho phép trang khác (vd. /dau-thau) dùng chung component này nhưng ghi
  // lượt xem vào 1 API/kho dữ liệu riêng — mặc định vẫn là "/api/news/view"
  // để không ảnh hưởng các chỗ đang gọi component này cho tin tức.
  endpoint = "/api/news/view",
}: {
  id: string;
  mode: "increment" | "display";
  className?: string;
  isEnglish?: boolean;
  endpoint?: string;
}) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        if (mode === "increment") {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });
          const data = await res.json();
          if (!cancelled && typeof data?.views === "number") setViews(data.views);
        } else {
          const res = await fetch(`${endpoint}?id=${encodeURIComponent(id)}`);
          const data = await res.json();
          if (!cancelled && typeof data?.views === "number") setViews(data.views);
        }
      } catch {
        // im lặng bỏ qua nếu lỗi mạng — không hiển thị số thì thôi, không chặn UI
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [id, mode, endpoint]);

  return (
    <span className={className}>
      {views === null ? "—" : views.toLocaleString(isEnglish ? "en-US" : "vi-VN")}{" "}
      {isEnglish ? "views" : "lượt xem"}
    </span>
  );
}
