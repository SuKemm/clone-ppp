import Link from "next/link";
import type { Metadata } from "next";
import { FileText, Users2, BarChart3, Play } from "lucide-react";
import { PtscShell } from "@/components/ptsc-shell";
import { MarqueeBar } from "@/components/MarqueeBar";
import { AutoRefresh } from "@/components/AutoRefresh";
import { getCollection } from "@/lib/cms/store";
import { computeProductionTotals, formatVnNumber, getProductionPeriodLabels } from "@/lib/production";

// Đồng bộ nội dung và cấu trúc với trang tiếng Việt (src/app/page.tsx).

// Ghi đè metadata tiếng Việt mặc định ở layout gốc (src/app/layout.tsx) —
// nếu không, tab trình duyệt / kết quả tìm kiếm cho trang chủ tiếng Anh vẫn
// hiện tiêu đề/mô tả tiếng Việt.
export const metadata: Metadata = {
  title: "Dakdrinh Hydropower Joint Stock Company",
  description: "Official information page of Dakdrinh Hydropower Joint Stock Company.",
};

const heroSlides = [
  {
    title: "General Contractor for Offshore Oil & Gas and Renewable Energy Projects",
    // Same panorama file as the Vietnamese homepage.
    image: "/images/ptsc/banner-panorama.jpg",
  },
  {
    title: "General Contractor for Offshore Oil & Gas and Renewable Energy Projects",
    image: "/images/ptsc/service-co-khi.jpg",
  },
  {
    title: "General Contractor for Offshore Oil & Gas and Renewable Energy Projects",
    image: "/images/ptsc/service-bien.jpg",
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
    tone: "bg-sky-500",
  },
  {
    label: "General Meeting of Shareholders",
    icon: Users2,
    href: "/en-US/shareholders",
    tone: "bg-blue-700",
  },
  {
    label: "Financial Statements / Annual Report",
    icon: BarChart3,
    href: "/en-US/shareholders",
    tone: "bg-slate-900",
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

  // 3 most recent articles for the "News & Events" block — ranked by the
  // "Ngày đăng" field (not creation/edit order), same rule as the VN page.
  const latestNews = [...getCollection("news")]
    .sort((a, b) => parseVnDate(b.date) - parseVnDate(a.date))
    .slice(0, 3);

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
    .slice(0, 4)
    .map((v) => ({ title: v.title_en || v.title }));

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
    [formatVnNumber(productionTotals.week), "Output", productionPeriods.tuan],
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
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src={heroSlides[0].image}
          alt={heroSlides[0].title}
          className="h-[260px] w-full object-cover sm:h-[380px] md:h-[480px] lg:h-[620px]"
        />
      </section>

      {/* ===== Running text (replaces the old investor logo block) ===== */}
      <MarqueeBar isEnglish={true} />

      <section id="news" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900 md:text-3xl">
            News and Events
          </h2>

          <Link
            href="/en-US/news"
            className="mt-3 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800"
          >
            View more →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {latestNews.map((item) => (
            <a
              key={item.id}
              href={`/en-US/news/${item.id}`}
              className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" className="h-44 w-full object-cover" />
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                  {item.category_en || item.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-900">
                  {item.title_en || item.title}
                </h3>
                <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                  <span>{item.date}</span>
                  <span className="text-cyan-700 transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="production" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <AutoRefresh intervalMs={60_000} />
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900 md:text-3xl">
            Production Status
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Left: 5 output cards (Day/Week/Month/Quarter/Year) */}
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
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
              <h3 className="text-center text-3xl font-bold uppercase text-cyan-700">
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
          <div className="flex items-center justify-center gap-3 bg-slate-400/80 py-5">
            <BarChart3 className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold uppercase tracking-[0.15em] text-white">
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
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-center text-2xl font-semibold text-slate-900">Photo Gallery</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {latestPhotoAlbums.map((tab) => (
                  <div key={tab.label} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <img src={tab.image} alt={tab.label} className="h-36 w-full object-cover" />
                    <p className="p-3 text-center text-xs font-semibold uppercase leading-5 text-slate-700">
                      {tab.label}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="/en-US/services#photos"
                className="mt-6 inline-block rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                View all
              </a>
            </div>

            <div>
              <h2 className="text-center text-2xl font-semibold text-slate-900">Video Library</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {latestVideos.map((video) => (
                  <div
                    key={video.title}
                    className="group relative flex h-32 items-end overflow-hidden rounded-xl border border-slate-200 bg-slate-800"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-900/10" />
                    <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 transition group-hover:bg-white">
                      <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                    </span>
                    <p className="relative z-10 p-3 text-xs font-semibold leading-5 text-white">
                      {video.title}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="/en-US/services#videos"
                className="mt-6 inline-block rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
