import Link from "next/link";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { VideoGalleryGrid } from "@/components/VideoGalleryGrid";

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

// Chuyển ngày admin nhập ("dd/mm/yyyy" hoặc "dd.mm.yyyy") thành mốc thời
// gian để sắp xếp album mới → cũ theo năm — đồng bộ với bản VN
// (src/app/dich-vu/page.tsx) và trang chủ.
function parseAlbumDate(value: string | undefined): number {
  if (!value) return -Infinity;
  const m = value.trim().match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (!m) return -Infinity;
  const [, d, mo, y] = m;
  const t = new Date(Number(y), Number(mo) - 1, Number(d)).getTime();
  return Number.isNaN(t) ? -Infinity : t;
}

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

export default function GalleryPageEn() {
  const photoAlbums = [...getCollection("photo-albums")]
    .sort((a, b) => parseAlbumDate(b.date) - parseAlbumDate(a.date))
    .map((a) => {
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
  const videoAlbums = getCollection("video-albums").map((v) => ({
    id: v.id,
    title: v.title_en || v.title,
    date: v.date,
    image: v.image || FALLBACK_IMAGE,
    video: v.video,
  }));

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

          <VideoGalleryGrid videos={videoAlbums} isEnglish />
        </div>
      </section>
    </PtscShell>
  );
}
