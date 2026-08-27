import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";
import { MostViewedSidebar } from "@/components/MostViewedSidebar";
import { getAllViews } from "@/lib/news-views-store";
import { formatNewsDateTime } from "@/lib/format-date";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Chuyển ngày admin nhập ("dd/mm/yyyy" hoặc "dd.mm.yyyy") thành mốc thời
// gian để sắp xếp mới → cũ — dùng cho khối "Video nổi bật" ở sidebar, giống
// logic ở trang chủ (src/app/page.tsx) và trang Quan hệ cổ đông
// (src/app/co-dong/page.tsx).
function parseAlbumDate(value: string | undefined): number {
  if (!value) return -Infinity;
  const m = value.trim().match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (!m) return -Infinity;
  const [, d, mo, y] = m;
  const t = new Date(Number(y), Number(mo) - 1, Number(d)).getTime();
  return Number.isNaN(t) ? -Infinity : t;
}

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = getCollection("news").find((n) => n.id === id);
  if (!item) return {};

  return { title: item.title, description: item.excerpt || undefined };
}

export default async function NewsDetailPage({ params }: Params) {
  const { id } = await params;
  const item = getCollection("news").find((n) => n.id === id);

  if (!item) notFound();

  // Nội dung đầy đủ nhập ở /admin qua trình soạn thảo TinyMCE, lưu sẵn dạng
  // HTML (in đậm, danh sách, link...) — hiển thị thẳng ra trang, không tách
  // đoạn thủ công như trước nữa.
  const contentHtml = item.content || "";

  // Khối "Xem nhiều nhất" — sắp xếp toàn bộ tin tức (trừ bài đang xem) theo
  // lượt xem giảm dần, lấy 5 bài đầu. Bài chưa từng có ai xem sẽ nằm ở cuối,
  // vẫn hiển thị đủ (không lọc số 0) để sidebar không bị trống khi site mới.
  const allViews = getAllViews();
  const news = getCollection("news");
  const sidebarItems = [...news]
    .filter((n) => n.id !== item.id)
    .sort((a, b) => (allViews[b.id] ?? 0) - (allViews[a.id] ?? 0))
    .slice(0, 5)
    .map((n) => ({ id: n.id, image: n.image, title: n.title, date: n.date, gio: n.gio }));

  // Khối "Video nổi bật" — 2 video mới nhất từ Admin > Thư viện video.
  const videoItems = [...getCollection("video-albums")]
    .sort((a, b) => parseAlbumDate(b.date) - parseAlbumDate(a.date))
    .slice(0, 2)
    .map((v) => ({ title: v.title, image: v.image || undefined }));

  return (
    <PtscShell title={item.title} description={item.excerpt || ""}>
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <Link href="/tin-tuc" className="text-sm font-semibold text-cyan-700 hover:underline">
                ← Quay lại danh sách tin tức
              </Link>
              <ArticleViewCount id={item.id} mode="increment" className="shrink-0 text-sm text-slate-500" />
            </div>

            <p className="mt-6 break-words text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
              {item.category}
            </p>
            <h1 className="mt-3 break-words text-xl font-bold leading-tight text-slate-900 sm:text-2xl lg:text-3xl">
              {item.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-4 w-4 shrink-0"
              >
                <circle cx="10" cy="10" r="7.25" />
                <path d="M10 6v4l2.6 1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {formatNewsDateTime(item.date, item.gio)}
            </p>

            {/* Đã bỏ khối tự chèn "Ảnh đại diện" ngay dưới tiêu đề — ảnh này
                giờ CHỈ dùng làm ảnh thu nhỏ ở trang danh sách tin tức và các
                khối "Tin mới nhất"/"Xem nhiều nhất", không tự động lặp lại
                trong bài viết nữa. Nếu muốn có ảnh minh hoạ trong bài, admin
                tự chèn qua nút ảnh trong trình soạn thảo TinyMCE. */}

            {/* prose = @tailwindcss/typography, style cho nội dung HTML nhập
                từ TinyMCE ở admin (đoạn văn, heading, danh sách, bảng...).
                Thêm mấy class [&_table]/[&_iframe] để chặn tràn ngang trên
                mobile nếu admin dán bảng/nhúng video có width cố định. */}
            <div
              className="prose prose-slate mt-8 max-w-none break-words
                [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto
                [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:aspect-video"
            >
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : item.excerpt ? (
                <p className="text-lg leading-8 text-slate-700">{item.excerpt}</p>
              ) : (
                <p className="text-slate-500">Bài viết chưa có nội dung chi tiết.</p>
              )}
            </div>
          </div>

          <MostViewedSidebar
            items={sidebarItems}
            detailBasePath="/tin-tuc"
            videoItems={videoItems}
          />
        </div>
      </section>
    </PtscShell>
  );
}
