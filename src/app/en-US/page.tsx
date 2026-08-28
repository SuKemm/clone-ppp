import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Newspaper } from "lucide-react";
import { PtscShell } from "@/components/ptsc-shell";
import { HeroSlider } from "@/components/HeroSlider";
import { MarqueeBar } from "@/components/MarqueeBar";
import { getCollection } from "@/lib/cms/store";
import { formatNewsDateTime } from "@/lib/format-date";
import {
  computeProductionTotals,
  getProductionPeriodLabels,
  formatVnNumber,
} from "@/lib/production";

// English counterpart of src/app/page.tsx — before this fix, this file was
// mistakenly a duplicate of the "About Us" page (src/app/en-US/about-us),
// so visiting /en-US just showed the corporate overview instead of a real
// homepage. Rebuilt using the same components/collections as the Vietnamese
// homepage (hero slider, marquee, news, notices, production info), reading
// the "_en" fields where available.
export const dynamic = "force-dynamic"; // always read the latest admin data, no static caching

export const metadata: Metadata = {
  title: "Home",
  description:
    "Dakdrinh Hydropower Joint Stock Company (PV Power DHC) — investor and operator of the 125 MW Dakdrinh Hydropower Plant in Son Tay District (Quang Ngai) and Kon Plong District (Kon Tum).",
};

function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-cyan-600 via-sky-700 to-slate-900 ${className}`}
    >
      <Newspaper className="h-8 w-8 text-white/70" strokeWidth={1.25} />
    </div>
  );
}

const NOTICE_TONE: Record<string, string> = {
  "Khẩn cấp": "border-red-200 bg-red-50 text-red-700",
  "Quan trọng": "border-amber-200 bg-amber-50 text-amber-700",
  "Sự kiện": "border-sky-200 bg-sky-50 text-sky-700",
};

const NOTICE_TYPE_EN: Record<string, string> = {
  "Khẩn cấp": "Urgent",
  "Quan trọng": "Important",
  "Sự kiện": "Event",
};

export default function HomePageEn() {
  const heroSlides = getCollection("hero-slides");
  const news = getCollection("news");
  const notices = getCollection("site-notices").slice(0, 4);
  const productionDaily = getCollection("production-daily");
  const productionInfo = getCollection("production-info")[0];

  const totals = computeProductionTotals(productionDaily);
  const labels = getProductionPeriodLabels(new Date(), "en");

  const featuredNews = news.slice(0, 2);

  const productionStats = [
    { label: labels.ngay, value: formatVnNumber(totals.day), unit: "MWh" },
    { label: labels.tuan, value: formatVnNumber(totals.week), unit: "MWh" },
    { label: labels.thang, value: formatVnNumber(totals.month), unit: "MWh" },
    { label: labels.quy, value: formatVnNumber(totals.quarter), unit: "MWh" },
    { label: labels.nam, value: formatVnNumber(totals.year), unit: "MWh" },
  ];

  return (
    <PtscShell title="Home" description={metadata.description as string}>
      {/* Hero slider */}
      <HeroSlider slides={heroSlides.map((s) => ({ title: s.title, image: s.image }))} />

      {/* Running marquee */}
      <MarqueeBar isEnglish />

      {/* News & Events + Featured Notices */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-[#075B9F] sm:text-3xl">
            News &amp; Events
          </h2>
          <Link
            href="/en-US/news"
            className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:underline"
          >
            View more
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredNews.map((item) => (
            <article key={item.id} className="group lg:col-span-1">
              <Link href={`/en-US/news/${item.id}`}>
                <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ImagePlaceholder className="h-full w-full" />
                  )}
                </div>
                <h3 className="mt-4 break-words text-base font-bold leading-snug text-slate-900 transition group-hover:text-cyan-700">
                  {item.title_en || item.title}
                </h3>
              </Link>
              <p className="mt-2 text-xs italic text-slate-500">
                {formatNewsDateTime(item.date, item.gio, "en")}
              </p>
              <Link
                href={`/en-US/news/${item.id}`}
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-cyan-700 hover:underline"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}

          {featuredNews.length === 0 && (
            <p className="text-sm text-slate-500 lg:col-span-2">No news yet.</p>
          )}

          {/* Featured Notices */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Notices
              </h3>
              <Link
                href="/en-US/notice"
                className="text-xs font-semibold text-cyan-700 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="mt-3 space-y-3">
              {notices.length === 0 && (
                <p className="text-sm text-slate-500">No notices yet.</p>
              )}
              {notices.map((notice) => {
                const tone = NOTICE_TONE[notice.loai ?? ""] ?? "border-slate-200 bg-slate-50 text-slate-700";
                const noticeTypeEn = notice.loai ? NOTICE_TYPE_EN[notice.loai] || "Notice" : "";
                const content = (
                  <div className={`rounded-xl border px-3.5 py-3 transition hover:-translate-y-0.5 hover:shadow-sm ${tone}`}>
                    {noticeTypeEn && (
                      <span className="text-[10px] font-bold uppercase tracking-wide">
                        {noticeTypeEn}
                      </span>
                    )}
                    <p className="mt-1 break-words text-sm font-semibold leading-5 text-slate-900">
                      {notice.tieu_de_en || notice.tieu_de}
                    </p>
                  </div>
                );
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
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Production info */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-[#075B9F] sm:text-3xl">
            Production Information
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {productionStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
              >
                <div className="text-2xl font-extrabold text-[#075B9F] sm:text-3xl">
                  {stat.value}
                  <span className="ml-1 text-sm font-semibold text-slate-400">{stat.unit}</span>
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {productionInfo && (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <div className="text-2xl font-extrabold text-[#075B9F]">
                  {productionInfo.muc_nuoc_ho || "—"}
                  <span className="ml-1 text-sm font-semibold text-slate-400">m</span>
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Current Water Level
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <div className="text-2xl font-extrabold text-[#075B9F]">
                  {productionInfo.luu_luong_ve_ho || "—"}
                  <span className="ml-1 text-sm font-semibold text-slate-400">m³/s</span>
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reservoir Inflow
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <div className="text-2xl font-extrabold text-[#075B9F]">
                  {productionInfo.luu_luong_phat_dien || "—"}
                  <span className="ml-1 text-sm font-semibold text-slate-400">m³/s</span>
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Avg. Daily Generation Flow
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Explore PV Power DHC</h2>
            <p className="mt-2 text-slate-300">
              Learn more about our projects, operations, and corporate information.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/en-US/about-us"
              className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold transition hover:bg-cyan-500"
            >
              About Us
            </Link>
            <Link
              href="/en-US/services"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Services
            </Link>
            <Link
              href="/en-US/contact"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
