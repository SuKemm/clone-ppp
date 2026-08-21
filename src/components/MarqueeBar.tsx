"use client";

// Dòng chữ chạy ngang, đặt ở vị trí trước đây là khối logo "Cổ đông & Nhà
// đầu tư" ngay dưới banner trang chủ. Nội dung lấy từ /admin -> mục "Dòng
// chữ chạy (trang chủ)" (xem src/lib/cms/schema.ts, id "site-marquee"),
// quản lý y hệt cách thêm/sửa/xoá Tin tức — không cần sửa code.
//
// Nếu admin nhập nhiều dòng, tất cả sẽ được nối lại và chạy nối tiếp nhau,
// lặp vô hạn.

import { useEffect, useState } from "react";

type MarqueeItem = { id: string; text?: string; text_en?: string };

export function MarqueeBar({ isEnglish = false }: { isEnglish?: boolean }) {
  const [items, setItems] = useState<MarqueeItem[] | null>(null);

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

  const joined = texts.join("     •     ");

  return (
    <section className="border-b border-slate-200 bg-slate-50/80">
      <div className="overflow-hidden py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          <span className="animate-blink px-6 text-[18px] font-semibold uppercase tracking-[0.15em] text-red-600">
            {joined}
          </span>
          <span className="animate-blink px-6 text-[18px] font-semibold uppercase tracking-[0.15em] text-red-600">
            {joined}
          </span>
        </div>
      </div>
    </section>
  );
}
