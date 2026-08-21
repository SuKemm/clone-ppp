"use client";

// Dòng chữ chạy ngang, đặt ở vị trí trước đây là khối logo "Cổ đông & Nhà
// đầu tư" ngay dưới banner trang chủ. Nội dung lấy từ /admin -> mục "Dòng
// chữ chạy (trang chủ)" (xem src/lib/cms/schema.ts, id "site-marquee"),
// quản lý y hệt cách thêm/sửa/xoá Tin tức — không cần sửa code.
//
// Nếu admin nhập nhiều dòng: mỗi dòng chạy hết (từ phải qua trái, khuất
// hẳn khỏi màn hình) rồi mới đến lượt dòng tiếp theo xuất hiện, lặp vô hạn.
// Chữ có hiệu ứng viền phát sáng (glow) nhấp nhô nhẹ, không chớp tắt, kèm
// 2 ngôi sao lấp lánh (twinkle) ở đầu và cuối mỗi dòng.

import { useEffect, useState } from "react";

type MarqueeItem = { id: string; text?: string; text_en?: string };

export function MarqueeBar({ isEnglish = false }: { isEnglish?: boolean }) {
  const [items, setItems] = useState<MarqueeItem[] | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/marquee")
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((body) => {
        if (!cancelled) setItems(body.items ?? []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const texts =
    items
      ?.map((item) => (isEnglish ? item.text_en || item.text : item.text) || "")
      .filter((t) => t.trim() !== "") ?? [];

  if (items === null || texts.length === 0) return null;

  const current = texts[index % texts.length];
  // Tốc độ chạy tỉ lệ theo độ dài chữ để dòng nào cũng đọc kịp.
  const duration = Math.max(6, current.length * 0.09);

  return (
    <section className="border-b border-slate-200 bg-slate-50/80">
      <div className="relative overflow-hidden py-4">
        <span
          key={index}
          onAnimationEnd={() => setIndex((i) => (i + 1) % texts.length)}
          style={{ animationDuration: `${duration}s, 1.8s` }}
          className="marquee-once glow-text inline-block whitespace-nowrap px-6 text-[18px] font-semibold uppercase tracking-[0.15em] text-red-600"
        >
          <span className="sparkle" aria-hidden="true">
            ✦
          </span>{" "}
          {current}{" "}
          <span className="sparkle sparkle-delay" aria-hidden="true">
            ✦
          </span>
        </span>
      </div>
    </section>
  );
}
