import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { PageHeader } from "@/components/PageHeader";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";
import { MostViewedSidebar } from "@/components/MostViewedSidebar";
import { getAllViews } from "@/lib/tender-views-store";
import { formatNewsDateTime } from "@/lib/format-date";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Khi thông báo mời thầu chưa có ảnh riêng, dùng logo công ty làm ảnh banner
// mặc định — đồng bộ với trang tin tức (banner full-width) và trang cổ đông
// (logo công ty khi không có ảnh).
const LOGO = "/images/ptsc/logo-ptsc.png";

// Chuyển ngày admin nhập ("dd/mm/yyyy" hoặc "dd.mm.yyyy") thành mốc thời
// gian để sắp xếp mới → cũ — dùng cho khối "Video nổi bật" ở sidebar.
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
  const item = getCollection("tenders").find((n) => n.id === id);
  if (!item) return {};

  return { title: item.title, description: item.excerpt || undefined };
}

export default async function TenderDetailPage({ params }: Params) {
  const { id } = await params;
  const item = getCollection("tenders").find((n) => n.id === id);

  if (!item) notFound();

  const contentHtml = item.content || "";

  // Các trường nghiệp vụ đấu thầu — chỉ hiện dòng nào admin có điền, giữ
  // đúng thứ tự thường thấy trên thông báo mời thầu thật (bên mời thầu,
  // nguồn vốn, hình thức lựa chọn, thời gian đóng thầu).
  const infoRows: { label: string; value: string }[] = [
    { label: "Bên mời thầu", value: item.ben_moi_thau },
    { label: "Nguồn vốn", value: item.nguon_von },
    { label: "Hình thức lựa chọn nhà thầu", value: item.hinh_thuc },
    { label: "Thời gian đóng thầu", value: item.thoi_gian_dong_thau },
  ].filter((row) => row.value);

  const allViews = getAllViews();
  const tenders = getCollection("tenders");
  const sidebarItems = [...tenders]
    .filter((n) => n.id !== item.id)
    .sort((a, b) => (allViews[b.id] ?? 0) - (allViews[a.id] ?? 0))
    .slice(0, 5)
    .map((n) => ({ id: n.id, image: n.image, title: n.title, date: n.date }));

  const videoItems = [...getCollection("video-albums")]
    .sort((a, b) => parseAlbumDate(b.date) - parseAlbumDate(a.date))
    .slice(0, 2)
    .map((v) => ({ title: v.title, image: v.image || undefined }));

  return (
    <PtscShell title={item.title} description={item.excerpt || ""}>
      {/* Breadcrumb: Trang chủ / Đấu thầu / <chuyên mục> */}
      <PageHeader
        title={item.category || "Đấu thầu"}
        crumbs={[
          { label: "Đấu thầu", href: "/dau-thau" },
          ...(item.category ? [{ label: item.category }] : []),
        ]}
        homeHref="/"
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <Link href="/dau-thau" className="text-sm font-semibold text-cyan-700 hover:underline">
                ← Quay lại danh sách đấu thầu
              </Link>
              <ArticleViewCount
                id={item.id}
                mode="increment"
                className="text-sm text-slate-500"
                endpoint="/api/tenders/view"
              />
            </div>

            <p className="mt-6 break-words text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
              {item.category}
            </p>
            <h1 className="mt-3 break-words text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">{item.title}</h1>
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
              {formatNewsDateTime(item.date)}
            </p>

            <div className="mt-8 flex h-72 w-full items-center justify-center rounded-2xl bg-white sm:h-96">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt={item.title} className="h-full w-full object-contain p-6" />
            </div>

            {infoRows.length > 0 && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                <dl className="space-y-3">
                  {infoRows.map((row) => (
                    <div key={row.label} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                      <dt className="shrink-0 text-sm font-semibold text-slate-900 sm:w-56">{row.label}:</dt>
                      <dd className="text-sm text-slate-700">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {item.attachment && (
              <a
                href={item.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
              >
                📄 Tải hồ sơ mời thầu (PDF)
              </a>
            )}

            <div className="prose prose-slate mt-8 max-w-none">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : item.excerpt ? (
                <p className="text-lg leading-8 text-slate-700">{item.excerpt}</p>
              ) : (
                <p className="text-slate-500">Thông báo chưa có nội dung chi tiết.</p>
              )}
            </div>
          </div>

          <MostViewedSidebar
            items={sidebarItems}
            detailBasePath="/dau-thau"
            videoItems={videoItems}
          />
        </div>
      </section>
    </PtscShell>
  );
}
