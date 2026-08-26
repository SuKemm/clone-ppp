"use client";

// Banner đầu trang chủ, kéo qua lại được — có nút mũi tên trái/phải, chấm
// tròn chỉ vị trí bên dưới, và tự động chuyển ảnh sau vài giây. Danh sách
// ảnh lấy từ collection "hero-slides" (Admin -> Trang chủ -> Banner trang
// chủ), không còn hardcode trong page.tsx — admin tự thêm/xoá/đổi ảnh.

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { title: string; image: string };

const AUTO_PLAY_MS = 6000;

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Tự động chuyển ảnh — dừng lại nếu chỉ có 1 ảnh, không cần slider.
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  // Nếu admin lỡ xoá hết ảnh trong /admin, không để trang chủ vỡ layout —
  // vẫn giữ chỗ cho dải gradient/khẩu hiệu bên dưới banner hoạt động bình
  // thường (section rỗng, cao 0).
  if (slides.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {slides.map((slide, i) => (
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          fetchPriority={i === 0 ? "high" : undefined}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`h-[260px] w-full object-cover transition-opacity duration-700 ease-in-out sm:h-[380px] md:h-[480px] lg:h-[620px] ${
            i === index ? "opacity-100" : "absolute inset-0 opacity-0"
          }`}
        />
      ))}

      {/* Lớp phủ gradient + khẩu hiệu — hiện chữ ngay cả khi ảnh còn đang tải
          (nhất là trên mạng di động chậm), tránh trang trông như "trống/đen"
          trước khi ảnh nền load xong. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/10" />

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Ảnh trước"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Ảnh kế tiếp"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Chấm tròn chỉ vị trí, bấm vào để nhảy thẳng tới ảnh đó */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Đi tới ảnh ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
