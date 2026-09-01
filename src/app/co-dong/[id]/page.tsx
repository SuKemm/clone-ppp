import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { PageHeader } from "@/components/PageHeader";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";
import { MostViewedSidebar } from "@/components/MostViewedSidebar";
import { getAllViews } from "@/lib/news-views-store";
import { formatNewsDateTime } from "@/lib/format-date";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Chuyển ngày admin nhập ("dd/mm/yyyy" hoặc "dd.mm.yyyy") thành mốc thời
// gian để sắp xếp mới → cũ — dùng cho khối "Video nổi bật" ở sidebar, giống
// logic ở trang danh sách Quan hệ cổ đông (src/app/co-dong/page.tsx).
function parseAlbumDate(value: string | undefined): number {
  if (!value) return -Infinity;
  const m = value.trim().match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (!m) return -Infinity;
  const [, d, mo, y] = m;
  const t = new Date(Number(y), Number(mo) - 1, Number(d)).getTime();
  return Number.isNaN(t) ? -Infinity : t;
}

// Đồng bộ với bản tiếng Anh (src/app/en-US/shareholders/[id]/page.tsx) — cùng
// đọc từ "shareholder-relations", chỉ khác không lấy các field "_en".
// File này trước đây bị thiếu, khiến mọi link bài viết trong khối "Quan hệ
// cổ đông" ở bản tiếng Việt (trỏ tới /co-dong/{id}) bị lỗi 404.
const LOGO = "/images/ptsc/logo-ptsc.png";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = getCollection("shareholder-relations").find((n) => n.id === id);
  if (!item) return {};

  return { title: item.title, description: item.excerpt || undefined };
}

export default async function ShareholderRelationDetailPage({ params }: Params) {
  const { id } = await params;
  const item = getCollection("shareholder-relations").find((n) => n.id === id);

  if (!item) notFound();

  const contentHtml = item.content || "";

  // Khối "Xem nhiều nhất" — sắp xếp toàn bộ mục Quan hệ cổ đông (trừ mục
  // đang xem) theo lượt xem giảm dần, lấy 5 mục đầu.
  const allViews = getAllViews();
  const relations = getCollection("shareholder-relations");
  const sidebarItems = [...relations]
    .filter((n) => n.id !== item.id)
    .sort((a, b) => (allViews[b.id] ?? 0) - (allViews[a.id] ?? 0))
    .slice(0, 5)
    .map((n) => ({ id: n.id, image: n.image, title: n.title, date: n.date }));

  // Khối "Video nổi bật" — 2 video mới nhất từ Admin > Thư viện video.
  const videoItems = [...getCollection("video-albums")]
    .sort((a, b) => parseAlbumDate(b.date) - parseAlbumDate(a.date))
    .slice(0, 2)
    .map((v) => ({ title: v.title, image: v.image || undefined }));

  return (
    <PtscShell title={item.title} description={item.excerpt || ""}>
      <PageHeader
        title={item.category}
        crumbs={[
          { label: "Quan hệ cổ đông", href: "/co-dong" },
          { label: item.category },
        ]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <Link href="/co-dong" className="text-sm font-semibold text-cyan-700 hover:underline">
                ← Quay lại Quan hệ cổ đông
              </Link>
              <ArticleViewCount id={item.id} mode="increment" className="text-sm text-slate-500" />
            </div>

            <h2 className="mt-6 break-words text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
              {item.title}
            </h2>

            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-cyan-700">
              {item.category}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
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
              {formatNewsDateTime(item.date) || "cập nhật mới nhất"}
            </p>

            <div className="mt-8 flex h-72 w-full items-center justify-center rounded-2xl bg-white sm:h-96">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt={item.title} className="h-full w-full object-contain p-6" />
            </div>

            {item.attachment && (
              <a
                href={item.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
              >
                📄 Tải file PDF
              </a>
            )}

            <div className="prose prose-slate mt-8 max-w-none">
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
            detailBasePath="/co-dong"
            videoItems={videoItems}
          />
        </div>
      </section>
    </PtscShell>
  );
}
