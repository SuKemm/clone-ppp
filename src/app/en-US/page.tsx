import Link from "next/link";
import type { Metadata } from "next";
import { FileText, Users2, BarChart3, Play } from "lucide-react";
import { PtscShell } from "@/components/ptsc-shell";
import { HeroSlider } from "@/components/HeroSlider";
import { MarqueeBar } from "@/components/MarqueeBar";
import { AutoRefresh } from "@/components/AutoRefresh";
import { getCollection } from "@/lib/cms/store";
import { computeProductionTotals, formatVnNumber, getProductionPeriodLabels } from "@/lib/production";
import { formatNewsDateTime } from "@/lib/format-date";

// Đồng bộ nội dung và cấu trúc với trang tiếng Việt (src/app/page.tsx).

// Ghi đè metadata tiếng Việt mặc định ở layout gốc (src/app/layout.tsx) —
// nếu không, tab trình duyệt / kết quả tìm kiếm cho trang chủ tiếng Anh vẫn
// hiện tiêu đề/mô tả tiếng Việt.
export const metadata: Metadata = {
  title: "Dakdrinh Hydropower Joint Stock Company",
  description: "Official information page of Dakdrinh Hydropower Joint Stock Company.",
};

// Ảnh dự phòng — chỉ dùng khi admin lỡ xoá hết ảnh trong "Banner trang chủ"
// (Admin -> Trang chủ), để trang không bao giờ hiện banner trống trơn.
const FALLBACK_HERO_SLIDES = [
  {
    title: "General Contractor for Offshore Oil & Gas and Renewable Energy Projects",
    image: "/images/ptsc/banner-panorama.jpg",
  },
];

// Shareholder / investor logo strip has moved to the footer — see
// src/components/ptsc-shell.tsx. The old spot below the banner is now
// <MarqueeBar /> (running text, editable at /admin -> "Dòng chữ chạy").

// "News & Events" block pulls straight from the "news" collection (Admin ->
// Nội dung -> Tin tức), same data as the Vietnamese homepage — no more
// hardcoded 3 articles. Falls back to the Vietnamese fields when a bài
// hasn't been translated yet (same pattern as src/app/en-US/news/[id]).
function parseVnDate(value: string | undefined): number {
  if (!value) return -Infinity;
  const m = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return -Infinity;
  const [, d, mo, y] = m;
  const t = new Date(Number(y), Number(mo) - 1, Number(d)).getTime();
  return Number.isNaN(t) ? -Infinity : t;
}

// Output for Day/Week/Month/Quarter/Year is auto-accumulated from the
// "production-daily" collection (one record per day, entered in /admin) —
// see computeProductionTotals() / getProductionPeriodLabels() in
// src/lib/production.ts. Same logic as the Vietnamese page.

const shareholderRelations = [
  {
    label: "Shareholder Information / Documents",
    icon: FileText,
    href: "/en-US/shareholders",
    tone: "bg-[#069DD8]",
  },
  {
    label: "General Meeting of Shareholders",
    icon: Users2,
    href: "/en-US/shareholders",
    tone: "bg-[#0063AF]",
  },
  {
    label: "Financial Statements / Annual Report",
    icon: BarChart3,
    href: "/en-US/shareholders",
    tone: "bg-[#151F41]",
  },
];

// Ảnh mặc định + hàm parse ngày album — dùng chung logic với trang tiếng
// Việt (src/app/page.tsx) để khối "Photo Gallery" / "Video Library" luôn
// lấy đúng dữ liệu mới nhất từ /admin thay vì hardcode.
const GALLERY_FALLBACK_IMAGE = "/images/ptsc/project-gallaf.jpg";

function parseAlbumDate(value: string | undefined): number {
  if (!value) return -Infinity;
  const m = value.trim().match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (!m) return -Infinity;
  const [, d, mo, y] = m;
  const t = new Date(Number(y), Number(mo) - 1, Number(d)).getTime();
  return Number.isNaN(t) ? -Infinity : t;
}

// Same data source as the Vietnamese homepage (src/app/page.tsx) — always
// reads the latest values entered in /admin instead of hardcoded numbers.
export const dynamic = "force-dynamic";

export default function EnglishHomePage() {
  const productionInfo = getCollection("production-info")[0];

  // Homepage hero slider — same collection as the Vietnamese page
  // (src/app/page.tsx), just with an English fallback caption.
  const heroSlidesFromCms = getCollection("hero-slides").map((s) => ({
    title: s.title || "Dakdrinh Hydropower Joint Stock Company",
    image: s.image,
  }));
  const heroSlides = heroSlidesFromCms.length > 0 ? heroSlidesFromCms : FALLBACK_HERO_SLIDES;

  // 3 most recent articles for the "News & Events" block — ranked by the
  // "Ngày đăng" field (not creation/edit order), same rule as the VN page.
  const latestNews = [...getCollection("news")]
    .sort((a, b) => parseVnDate(b.date) - parseVnDate(a.date))
    .slice(0, 2);

  // "Featured Notices" column — mirrors the VN homepage (Admin -> Khác ->
  // "Thông báo nổi bật (trang chủ)"), same collection "site-notices", just
  // prefers the "_en" fields when the admin has filled them in.
  const siteNotices = getCollection("site-notices").slice(0, 4);

  // Khối "Photo Gallery" / "Video Library" lấy trực tiếp từ 2 collection
  // "photo-albums" / "video-albums" (Admin -> Thư viện), ưu tiên tiêu đề
  // tiếng Anh (title_en) nếu admin đã nhập — cùng nguồn dữ liệu với trang
  // tiếng Việt, không còn hardcode.
  const latestPhotoAlbums = [...getCollection("photo-albums")]
    .sort((a, b) => parseAlbumDate(b.date) - parseAlbumDate(a.date))
    .slice(0, 3)
    .map((a) => ({ label: a.title_en || a.title, image: a.image || GALLERY_FALLBACK_IMAGE }));

  const latestVideos = [...getCollection("video-albums")]
    .sort((a, b) => parseAlbumDate(b.date) - parseAlbumDate(a.date))
    .slice(0, 3)
    .map((v) => ({ title: v.title_en || v.title, image: v.image || undefined }));

  // Update date always shows today's date (Vietnam time zone) — same
  // approach as the Vietnamese page, so it never needs manual editing.
  const ngayCapNhat = new Date().toLocaleDateString("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const now = new Date();
  const dailyEntries = getCollection("production-daily");
  const productionTotals = computeProductionTotals(dailyEntries, now);
  const productionPeriods = getProductionPeriodLabels(now, "en");

  const productionStatus: [string, string, string][] = [
    [formatVnNumber(productionTotals.day), "Output", productionPeriods.ngay],
    [formatVnNumber(productionTotals.month), "Output", productionPeriods.thang],
    [formatVnNumber(productionTotals.quarter), "Output", productionPeriods.quy],
    [formatVnNumber(productionTotals.year), "Output", productionPeriods.nam],
  ];

  const waterLevels = [
    { label: "Current reservoir water level", value: productionInfo?.muc_nuoc_ho ?? "", unit: "m" },
    { label: "Inflow to reservoir", value: productionInfo?.luu_luong_ve_ho ?? "", unit: "m³/s" },
    {
      label: "Average daily generation flow",
      value: productionInfo?.luu_luong_phat_dien ?? "",
      unit: "m³/s",
    },
  ];

  return (
    <PtscShell>
      <HeroSlider slides={heroSlides} />

      {/* ===== Running text (replaces the old investor logo block) ===== */}
      <MarqueeBar isEnglish={true} />

      {/* Weather widget has moved to the top nav bar (HeaderWeather, inside
          PtscShell) — it now lives there permanently instead of here. */}
        <section id="news" className="mx-auto max-w-7xl px-6 pt-16 pb-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-tight text-[#075B9F] md:text-3xl">
            News and Events
          </h2>

          <Link
            href="/en-US/news"
            className="mt-3 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800"
          >
            View more →
          </Link>
        </div>
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
          {latestNews.map((item) => (
            <a
              key={item.id}
              href={`/en-US/news/${item.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" className="h-44 w-full object-cover" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="break-words text-base font-semibold leading-6 text-slate-900">
                  {item.title_en || item.title}
                </h3>

                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>{formatNewsDateTime(item.date, item.gio, "en")}</span>
                  <span className="text-cyan-700 transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          ))}

          {/* Featured Notices — third column, always rendered (even when
              empty) so the 3-column layout doesn't shift. Content is
              managed from /admin -> Other -> "Thông báo nổi bật (trang
              chủ)", same source as the VN homepage. Homepage only shows the
              4 most recent notices — "View all" links to /en-US/notice
              for the full list. */}
          <div className="flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-wide text-cyan-700">
                NOTICES
              </h3>
              <Link
                href="/en-US/notice"
                className="group flex items-center gap-1 text-xs font-semibold text-cyan-700 transition hover:text-cyan-800"
              >
                View all
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="mt-3 flex flex-1 flex-col gap-3">
              {siteNotices.length === 0 ? (
                <p className="mt-2 text-center text-sm text-slate-400">No notices yet.</p>
              ) : (
                siteNotices.map((notice) => {
                  const content = (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:-translate-y-0.5 hover:shadow-sm">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-cyan-700">
                        NOTICES
                      </span>
                      <p className="mt-1 break-words text-sm font-semibold leading-5 text-slate-900">
                        {notice.tieu_de_en || notice.tieu_de}
                      </p>
                    </div>
                  );
                  // Prefer "Đường dẫn khi bấm vào" if the admin filled it in;
                  // otherwise fall back to the uploaded attachment (PDF...).
                  const href = notice.lien_ket || notice.file || "";
                  return href ? (
                    <a
                      key={notice.id}
                      href={href}
                      target={notice.lien_ket ? undefined : "_blank"}
                      rel={notice.lien_ket ? undefined : "noopener noreferrer"}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={notice.id}>{content}</div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="production" className="mx-auto max-w-7xl px-6 pt-6 pb-16 lg:px-8">
        <AutoRefresh intervalMs={60_000} />
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-tight text-[#075B9F] md:text-3xl">
            Production Status
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Left: 4 output cards (Day/Month/Quarter/Year) */}
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
              {productionStatus.map(([value, label, period], index) => (
                <div
                  key={`${period}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="text-3xl font-bold text-cyan-700">{value}</div>
                  <div className="mx-auto mt-4 h-px w-8 bg-slate-300" />
                  <div className="mt-4 text-sm leading-6 text-slate-600">
                    {label}
                    <br />
                    {period}
                  </div>
                  <div className="mt-1 text-sm font-bold text-cyan-700">(MWh)</div>
                </div>
              ))}
            </div>

            {/* Right: Current Water Level */}
            <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-center text-3xl font-bold text-cyan-700">
                Current Water Level
              </h3>
              <div className="mt-6 space-y-5">
                {waterLevels.map((row) => (
                  <div key={row.label} className="flex items-end gap-2 text-sm text-slate-600">
                    <span className="shrink-0">{row.label}</span>
                    <span className="mb-1 flex-1 border-b border-dotted border-slate-300" />
                    <span className="shrink-0 font-bold text-cyan-700">
                      {row.value} {row.unit}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-auto pt-8 text-center text-sm font-semibold text-slate-600">
                Updated on: {ngayCapNhat}
              </p>
            </div>
          </div>
        </div>
        </section>

      <section id="quan-he-co-dong" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-center gap-3 bg-[#898FA3] py-5">
            <BarChart3 className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold uppercase tracking-[0.15em] text-[#075B9F]">
              Investor Relations
            </h2>
          </div>
          <div className="grid sm:grid-cols-3">
            {shareholderRelations.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex flex-col items-center justify-center gap-5 px-6 py-14 text-center transition hover:brightness-110 ${item.tone}`}
              >
                <img
                  src="/images/ptsc/shareholder-pvpower-dhc.png"
                  alt="PTSC"
                  className="h-[3.75rem] w-auto object-contain"
                />
                <item.icon className="h-14 w-14 text-white/90" strokeWidth={1.25} />
                <span className="text-base font-semibold uppercase tracking-wide text-white">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="thu-vien" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-center text-2xl font-semibold uppercase text-[#075B9F]">Photo Gallery</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {latestPhotoAlbums.map((tab) => (
                  <Link
                    key={tab.label}
                    href="/en-US/services#photos"
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-300 hover:shadow-md"
                  >
                    <img
                      src={tab.image}
                      alt={tab.label}
                      className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <p className="flex h-11 items-center justify-center p-3 text-center text-xs font-semibold uppercase leading-5 text-slate-700 break-words line-clamp-2 group-hover:text-cyan-700">
                      {tab.label}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/en-US/services#photos"
                  className="inline-block rounded-full bg-amber-500 px-10 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
                >
                  View all
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-center text-2xl font-semibold uppercase text-[#075B9F]">Video Library</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {latestVideos.map((video) => (
                  <Link
                    key={video.title}
                    href="/en-US/services#videos"
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-300 hover:shadow-md"
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-slate-800">
                      {video.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={video.image}
                          alt={video.title}
                          className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
                      )}
                      <div className="absolute inset-0 bg-slate-950/20" />
                      <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 transition group-hover:bg-white">
                        <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                      </span>
                    </div>
                    <p className="flex h-11 items-center justify-center p-3 text-center text-xs font-semibold uppercase leading-5 text-slate-700 break-words line-clamp-2 group-hover:text-cyan-700">
                      {video.title}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/en-US/services#videos"
                  className="inline-block rounded-full bg-amber-500 px-10 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
