import Link from "next/link";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection, type CmsItem } from "@/lib/cms/store";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";

// Đọc cùng dữ liệu với trang tiếng Việt (/dich-vu) để hai ngôn ngữ luôn đồng
// bộ — không còn mảng viết cứng riêng cho tiếng Anh. Field "<key>_en" (nhập
// ở /admin) được ưu tiên hiển thị; nếu album chưa có bản dịch, tạm hiển thị
// bản tiếng Việt để trang không bị trống.
export const dynamic = "force-dynamic";

// Ghi đè metadata tiếng Việt mặc định ở layout gốc.
export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos of the company's activities, projects and key events over the years.",
};

// Ảnh mặc định nếu album chưa được gán ảnh đại diện trong /admin.
const FALLBACK_IMAGE = "/images/ptsc/project-gallaf.jpg";

// Field "images" trong /admin lưu dạng chuỗi JSON (mảng URL ảnh) — parse ra
// mảng string, bỏ qua nếu chưa nhập hoặc dữ liệu không hợp lệ.
function parseGalleryImages(raw: string | undefined): string[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export default function GalleryPageEn() {
  const photoAlbums = getCollection("photo-albums").map((a) => {
    const cover = a.image || FALLBACK_IMAGE;
    const extra = parseGalleryImages(a.images);
    // Đồng bộ với bản VN (src/app/dich-vu/page.tsx): ảnh đại diện luôn hiện
    // chung với các ảnh thêm sau, đứng đầu, bỏ trùng nếu lỡ thêm lại.
    const images = [cover, ...extra].filter((url, idx, arr) => arr.indexOf(url) === idx);
    return {
      id: a.id,
      title: a.title_en || a.title,
      date: a.date,
      image: cover,
      images,
    };
  });
  const videoAlbums = getCollection("video-albums").map(
    (v): CmsItem => ({
      ...v,
      title: v.title_en || v.title,
      image: v.image || FALLBACK_IMAGE,
    })
  );

  return (
    <PtscShell
      title="Gallery"
      description="Photos and videos of the company's activities, projects and key events over the years."
    >
      {/* ===== Photo gallery ===== */}
      <section id="photos" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Link href="/en-US" className="transition hover:text-cyan-700">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-600">Photo Gallery</span>
        </nav>

        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
            Photo Gallery
          </h2>
          <div className="hidden h-[3px] flex-1 max-w-xs bg-gradient-to-r from-cyan-500/70 to-transparent sm:block" />
        </div>

        <PhotoGalleryGrid albums={photoAlbums} isEnglish />
      </section>

      {/* ===== Video gallery ===== */}
      <section id="videos" className="border-t border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            <Link href="/en-US" className="transition hover:text-cyan-700">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-600">Video Gallery</span>
          </nav>

          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
              Video Gallery
            </h2>
            <div className="hidden h-[3px] flex-1 max-w-xs bg-gradient-to-r from-cyan-500/70 to-transparent sm:block" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
            {videoAlbums.map((video) => (
              <div key={video.id} className="group block cursor-pointer">
                <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
                  <div className="aspect-[4/3] w-full overflow-hidden">
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
