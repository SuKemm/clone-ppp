import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";
import { MostViewedSidebar } from "@/components/MostViewedSidebar";
import { getAllViews } from "@/lib/news-views-store";
import { formatNewsDateTime } from "@/lib/format-date";

// Trang CHI TIẾT 1 bài tin tức, bản tiếng Anh — đồng bộ với bản tiếng Việt
// (src/app/tin-tuc/[id]/page.tsx), cùng đọc từ collection "news" nhưng ưu
// tiên các field "_en" (title_en, excerpt_en, category_en, content_en).
// File này trước đây bị lỗi: nội dung trùng với trang danh sách
// (src/app/en-US/news/page.tsx) và không hề đọc `params.id`, khiến mọi link
// bài viết tiếng Anh (/en-US/news/{id}) chỉ hiện lại danh sách thay vì bài
// chi tiết.
export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Chuyển ngày admin nhập ("dd/mm/yyyy" hoặc "dd.mm.yyyy") thành mốc thời
// gian để sắp xếp mới → cũ — dùng cho khối "Featured videos" ở sidebar,
// giống logic ở bản tiếng Việt.
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

  return {
    title: item.title_en || item.title,
    description: item.excerpt_en || item.excerpt || undefined,
  };
}

export default async function NewsDetailPageEn({ params }: Params) {
  const { id } = await params;
  const item = getCollection("news").find((n) => n.id === id);

  if (!item) notFound();

  const title = item.title_en || item.title;
  const category = item.category_en || item.category;
  const excerpt = item.excerpt_en || item.excerpt || "";
  // Nội dung đầy đủ nhập ở /admin qua TinyMCE — ưu tiên bản tiếng Anh, nếu
  // admin chưa dịch thì tạm hiện bản tiếng Việt để trang không bị trống.
  const contentHtml = item.content_en || item.content || "";

  // Khối "Most read" — sắp xếp toàn bộ tin tức (trừ bài đang xem) theo lượt
  // xem giảm dần, lấy 5 bài đầu, dùng chung kho lượt xem với bản tiếng Việt
  // (mỗi bài chỉ có 1 lượt xem duy nhất dù đọc ở bản EN hay VN).
  const allViews = getAllViews();
  const news = getCollection("news");
  const sidebarItems = [...news]
    .filter((n) => n.id !== item.id)
    .sort((a, b) => (allViews[b.id] ?? 0) - (allViews[a.id] ?? 0))
    .slice(0, 5)
    .map((n) => ({
      id: n.id,
      image: n.image,
      title: n.title_en || n.title,
      date: n.date,
      gio: n.gio,
    }));

  // Khối "Featured videos" — 2 video mới nhất từ Admin > Thư viện video.
  const videoItems = [...getCollection("video-albums")]
    .sort((a, b) => parseAlbumDate(b.date) - parseAlbumDate(a.date))
    .slice(0, 2)
    .map((v) => ({ title: v.title, image: v.image || undefined }));

  return (
    <PtscShell title={title} description={excerpt}>
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <Link href="/en-US/news" className="text-sm font-semibold text-cyan-700 hover:underline">
                ← Back to news
              </Link>
              <ArticleViewCount
                id={item.id}
                mode="increment"
                className="shrink-0 text-sm text-slate-500"
                isEnglish
              />
            </div>

            <p className="mt-6 break-words text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
              {category}
            </p>
            <h1 className="mt-3 break-words text-xl font-bold leading-tight text-slate-900 sm:text-2xl lg:text-3xl">
              {title}
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
              {formatNewsDateTime(item.date, item.gio, "en")}
            </p>

            {/* Đã bỏ khối tự chèn cover image (item.image) ngay dưới tiêu đề —
                đồng bộ với bản VN, ảnh đại diện giờ chỉ dùng cho thumbnail. */}

            {/* prose = @tailwindcss/typography, style cho nội dung HTML nhập
                từ TinyMCE ở admin (đoạn văn, heading, danh sách, bảng...). */}
            <div
              className="prose prose-slate mt-8 max-w-none break-words
                [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto
                [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:aspect-video"
            >
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : excerpt ? (
                <p className="text-lg leading-8 text-slate-700">{excerpt}</p>
              ) : (
                <p className="text-slate-500">This article has no full content yet.</p>
              )}
            </div>
          </div>

          <MostViewedSidebar
            items={sidebarItems}
            detailBasePath="/en-US/news"
            videoItems={videoItems}
            sidebarTitle="Most read"
            videoSectionTitle="Featured videos"
            videoLinkHref="/en-US/services#videos"
            emptyLabel="No articles yet."
          />
        </div>
      </section>
    </PtscShell>
  );
}
