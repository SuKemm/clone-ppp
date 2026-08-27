import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { VideoGalleryGrid } from "@/components/VideoGalleryGrid";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

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

export default function GalleryPage() {
  const photoAlbums = getCollection("photo-albums").map((a) => {
    const cover = a.image || FALLBACK_IMAGE;
    const extra = parseGalleryImages(a.images);
    // Ảnh đại diện luôn hiện CHUNG với các ảnh thêm sau ở mục "Các ảnh
    // trong album" (không còn bị thay thế/mất khi admin thêm ảnh khác) —
    // ảnh đại diện đứng đầu, bỏ trùng nếu admin lỡ thêm lại chính ảnh đó.
    const images = [cover, ...extra].filter((url, idx, arr) => arr.indexOf(url) === idx);
    return {
      id: a.id,
      title: a.title,
      date: a.date,
      image: cover,
      images,
    };
  });
  const videoAlbums = getCollection("video-albums").map((v) => ({
    id: v.id,
    title: v.title,
    date: v.date,
    image: v.image || FALLBACK_IMAGE,
    video: v.video,
  }));

  return (
    <PtscShell
      title="Thư viện"
      description="Hình ảnh và video hoạt động, công trình và sự kiện tiêu biểu của công ty qua các năm."
    >
      {/* ===== Thư viện ảnh ===== */}
      <section id="thu-vien-anh" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Link href="/" className="transition hover:text-cyan-700">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-slate-600">Thư viện ảnh</span>
        </nav>

        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
            Thư viện ảnh
          </h2>
          <div className="hidden h-[3px] flex-1 max-w-xs bg-gradient-to-r from-cyan-500/70 to-transparent sm:block" />
        </div>

        <PhotoGalleryGrid albums={photoAlbums} />
      </section>

      {/* ===== Thư viện video ===== */}
      <section id="thu-vien-video" className="border-t border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            <Link href="/" className="transition hover:text-cyan-700">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-slate-600">Thư viện video</span>
          </nav>

          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
              Thư viện video
            </h2>
            <div className="hidden h-[3px] flex-1 max-w-xs bg-gradient-to-r from-cyan-500/70 to-transparent sm:block" />
          </div>

          <VideoGalleryGrid videos={videoAlbums} />
        </div>
      </section>
    </PtscShell>
  );
}
