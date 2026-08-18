import Link from "next/link";
import { FileText, Users2, BarChart3, Play } from "lucide-react";
import { PtscShell } from "@/components/ptsc-shell";
import { MarqueeBar } from "@/components/MarqueeBar";

// Đồng bộ nội dung và cấu trúc với trang tiếng Việt (src/app/page.tsx).

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

const news = [
  {
    date: "24/06/2026",
    title:
      "PTSC Successfully Holds Naming and Handover Ceremony for FSO PTSC Lac Da Vang, Ready for the Lac Da Vang Field's First Oil Target",
    category: "Production & Business",
    link: "/en-US/news",
  },
  {
    date: "20/06/2026",
    title: "Proactive Risk Management Keeps the Block B Gas Project – EPCI#1 Package on Schedule",
    category: "Production & Business",
    link: "/en-US/news",
  },
  {
    date: "18/06/2026",
    title:
      "PTSC's 2026 Annual General Meeting: PTSC Affirms Its Position After a Record Business Year, Aiming to Strengthen Regional Competitiveness",
    category: "Production & Business",
    link: "/en-US/news",
  },
];

const productionStatus = [
  ["1,384.48", "Output", "12 Aug"],
  ["12,296.65", "Output", "August"],
  ["45,647.83", "Output", "Q3"],
  ["220,125.45", "Output", "Year 2026"],
];

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

const photoGalleryTabs = [
  {
    label: "Production & Business Activities",
    image: "/images/ptsc/service-fso.jpg",
  },
  {
    label: "Power Plant Services",
    image: "/images/ptsc/service-co-khi.jpg",
  },
  {
    label: "Party & Union Activities",
    image: "/images/ptsc/service-bien.jpg",
  },
];

const videoLibrary = [
  { title: "Se San 3A - Connecting Trust" },
  { title: "Se San 3A 2023 Year-End Review" },
  { title: "Se San 3A - 20 Years of \"Building and Developing\"" },
  { title: "SESAN 3A - Connect" },
];

export default function EnglishHomePage() {
  return (
    <PtscShell>
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src={heroSlides[0].image}
          alt={heroSlides[0].title}
          className="h-[620px] w-full object-cover"
        />
      </section>

      {/* ===== Running text (replaces the old investor logo block) ===== */}
      <MarqueeBar isEnglish={true} />

      <section id="news" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
              NEWS AND EVENTS
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              News and Events
            </h2>
          </div>
          <a href="/en-US/news" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
            View more →
          </a>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {news.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                {item.category}
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-900">{item.title}</h3>
              <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span>{item.date}</span>
                <span className="text-cyan-700 transition group-hover:translate-x-1">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
            UPDATE
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            2026 Production Status
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productionStatus.map(([value, label, period]) => (
              <div
                key={period}
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
        </div>
      </section>

      <section id="quan-he-co-dong" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-center gap-3 bg-slate-400/80 py-5">
            <img
              src="/images/ptsc/shareholder-pvpower-dhc.png"
              alt="PTSC"
              className="h-[3.75rem] w-auto object-contain"
            />
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
              <h2 className="text-2xl font-semibold text-slate-900">Photo Gallery</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {photoGalleryTabs.map((tab) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">Video Library</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {videoLibrary.map((video) => (
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
                href="/en-US/news"
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
