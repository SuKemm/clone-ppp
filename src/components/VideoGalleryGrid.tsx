"use client";

import { useEffect, useState } from "react";

export type VideoAlbum = {
  id: string;
  title: string;
  date: string;
  image: string;
  video?: string;
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

// Nhận diện link YouTube (nhiều dạng: youtube.com/watch?v=, youtu.be/, shorts/)
// và trả về URL nhúng iframe. Trả về null nếu không phải YouTube (khi đó coi
// như link video mp4/webm trực tiếp hoặc file đã tải lên server).
function toYoutubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname.includes("youtu.be")) {
      id = u.pathname.slice(1);
    } else if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2] ?? "";
      else id = u.searchParams.get("v") ?? "";
    }
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  } catch {
    return null;
  }
}

/**
 * Lưới video — bấm vào 1 video sẽ mở lightbox và phát thật (video tải lên
 * server qua thẻ <video>, hoặc nhúng iframe nếu admin dán link YouTube).
 * Nếu video chưa được gán (field "video" trống trong /admin) thì bấm vào chỉ
 * phóng to ảnh đại diện, không phát được gì.
 */
export function VideoGalleryGrid({ videos, isEnglish = false }: { videos: VideoAlbum[]; isEnglish?: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const current = openIdx !== null ? videos[openIdx] : null;
  const embed = current?.video ? toYoutubeEmbed(current.video) : null;

  function close() {
    setOpenIdx(null);
  }

  useEffect(() => {
    if (current === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {videos.map((video, idx) => (
          <button key={video.id} type="button" onClick={() => setOpenIdx(idx)} className="group block w-full text-left">
            <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
              <div className="aspect-[4/3] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.image}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/25 transition group-hover:bg-slate-900/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-cyan-700 shadow-md transition group-hover:scale-110">
                  <PlayIcon />
                </span>
              </div>
            </div>
            <h3 className="mt-3 break-words text-[15px] font-semibold leading-snug text-slate-800 transition group-hover:text-cyan-700">
              {video.title}
            </h3>
            <p className="mt-1 text-xs text-slate-400">{video.date}</p>
          </button>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={close}>
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
            aria-label={isEnglish ? "Close" : "Đóng"}
          >
            ✕
          </button>

          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              {embed ? (
                <iframe
                  src={embed}
                  title={current.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : current.video ? (
                <video src={current.video} controls autoPlay className="h-full w-full" />
              ) : (
                // Chưa có video thật (field "video" trống trong /admin) —
                // hiện tạm ảnh đại diện để không vỡ giao diện.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.image} alt={current.title} className="h-full w-full object-contain" />
              )}
            </div>
            <p className="mt-3 font-medium text-white/90">{current.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
