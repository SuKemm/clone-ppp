"use client";

import { useEffect, useState } from "react";

export type PhotoAlbum = {
  id: string;
  title: string;
  date: string;
  image: string;
  images: string[];
};

// Cùng nhịp 10 giây/ảnh như banner chính (xem AUTO_PLAY_MS trong
// src/components/HeroSlider.tsx), để trải nghiệm đồng nhất trên toàn site.
const AUTO_PLAY_MS = 10_000;

/**
 * Thẻ đại diện 1 album — nếu album có từ 2 ảnh trở lên (field "images" nhập
 * ở /admin), tự động chạy lần lượt qua các ảnh đó ngay trên thẻ (giống cách
 * banner trang chủ tự chuyển slide), không cần bấm vào mới thấy ảnh khác.
 */
function AlbumCard({
  album,
  onOpen,
}: {
  album: PhotoAlbum;
  onOpen: () => void;
}) {
  const photos = album.images.length > 0 ? album.images : [album.image];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length]);

  return (
    <button type="button" onClick={onOpen} className="group block text-left">
      <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {photos.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={album.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 group-hover:scale-110 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {photos.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {photos.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-slate-800 transition group-hover:text-cyan-700">
        {album.title}
      </h3>
      <p className="mt-1 text-xs text-slate-400">{album.date}</p>
    </button>
  );
}

/**
 * Lưới ảnh đại diện cho từng album — bấm vào 1 album sẽ mở lightbox phóng to,
 * cho phép chuyển qua lại giữa TẤT CẢ ảnh đã nhập cho album đó trong /admin
 * (field "images"). Nếu album chưa nhập ảnh nào ở đó thì lightbox chỉ hiện
 * ảnh đại diện.
 */
export function PhotoGalleryGrid({ albums, isEnglish = false }: { albums: PhotoAlbum[]; isEnglish?: boolean }) {
  const [openAlbum, setOpenAlbum] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const current = openAlbum !== null ? albums[openAlbum] : null;
  const photos = current && current.images.length > 0 ? current.images : current ? [current.image] : [];

  function openAt(albumIdx: number) {
    setOpenAlbum(albumIdx);
    setPhotoIndex(0);
  }
  function close() {
    setOpenAlbum(null);
  }
  function next() {
    setPhotoIndex((i) => (i + 1) % photos.length);
  }
  function prev() {
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  }

  useEffect(() => {
    if (current === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, photos.length]);

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
        {albums.map((album, idx) => (
          <AlbumCard key={album.id} album={album} onOpen={() => openAt(idx)} />
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
            aria-label={isEnglish ? "Close" : "Đóng"}
          >
            ✕
          </button>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:left-4"
              aria-label={isEnglish ? "Previous photo" : "Ảnh trước"}
            >
              ‹
            </button>
          )}

          <div className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[photoIndex]}
              alt={current.title}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <div className="mt-3 flex items-center justify-between text-sm text-white/80">
              <p className="font-medium">{current.title}</p>
              {photos.length > 1 && (
                <p>
                  {photoIndex + 1} / {photos.length}
                </p>
              )}
            </div>
          </div>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:right-4"
              aria-label={isEnglish ? "Next photo" : "Ảnh sau"}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
