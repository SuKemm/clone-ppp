import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Đồng bộ nội dung với trang tiếng Việt (src/app/gioi-thieu/page.tsx) — cùng
// đọc từ các collection "company-*", chỉ khác lấy các field "_en".

export default function AboutUsPage() {
  const overview = getCollection("company-overview")[0];
  const allStats = getCollection("company-stats");
  const stats = allStats.filter((s) => s.section === "Tổng quan doanh nghiệp");
  const operatingResults = allStats.filter((s) => s.section === "Lũy kế phát điện");
  const shareholders = getCollection("shareholders-list");
  const projectSpecs = getCollection("company-specs");
  const timeline = getCollection("company-timeline");
  const allAwards = getCollection("company-awards");
  const emulationTitles = allAwards.filter((a) => a.award_type === "Danh hiệu thi đua");
  const commendations = allAwards.filter((a) => a.award_type === "Hình thức khen thưởng");

  const overviewIntroEn = overview?.overview_intro_en || overview?.overview_intro;
  const investmentNoteEn = overview?.investment_note_en || overview?.investment_note;
  const closingContentEn = overview?.closing_content_en || overview?.closing_content;

  return (
    <PtscShell
      title="About Us"
      description="Dakdrinh Hydropower Joint Stock Company (PV Power DHC) — investor and operator of the 125 MW Dakdrinh Hydropower Plant in Son Tay District (Quang Ngai) and Kon Plong District (Kon Tum)."
    >
      <section className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Link href="/en-US" className="transition hover:text-cyan-700">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">About Us</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              PV Power DHC
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Corporate Overview
            </h2>

            {overviewIntroEn && (
              <div
                className="prose prose-slate mt-6 max-w-none text-[16px] leading-8 text-slate-600 prose-p:my-5 prose-strong:text-slate-800"
                dangerouslySetInnerHTML={{ __html: overviewIntroEn }}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-3xl font-bold text-cyan-700">{s.value}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{s.label_en || s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            2015 – 2020 Strategy, 2030 Vision
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Vision &amp; Mission
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Vision</h3>
            <p className="mt-4 leading-7 text-slate-600">{overview?.vision_en || overview?.vision}</p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Mission</h3>
            <p className="mt-4 leading-7 text-slate-600">{overview?.mission_en || overview?.mission}</p>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Ownership Structure
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Company Shareholders
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">List of Shareholders</h3>
              <ul className="mt-5 space-y-3">
                {shareholders.map((s) => (
                  <li key={s.id} className="flex gap-3 leading-7 text-slate-600">
                    <span className="mt-1 font-bold text-cyan-700">✓</span>
                    <span>{s.name_en || s.name}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">Total Investment</h3>
              {investmentNoteEn && (
                <div
                  className="prose prose-slate mt-4 max-w-none leading-7 text-slate-600 prose-p:my-4 prose-strong:text-slate-800"
                  dangerouslySetInnerHTML={{ __html: investmentNoteEn }}
                />
              )}
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Key Personnel
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Leadership</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              The Board of Directors, Board of Management, and Supervisory
              Board of Dakdrinh Hydropower Joint Stock Company (PV Power
              DHC).
            </p>
          </div>
          <Link
            href="/en-US/about-us/leadership"
            className="shrink-0 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
          >
            View Leadership
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Project
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Dakdrinh Hydropower Project Specifications
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projectSpecs.map((spec) => (
            <div
              key={spec.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-slate-500">{spec.label_en || spec.label}</div>
              <div className="mt-2 text-lg font-bold text-cyan-700">{spec.value_en || spec.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Operating Results
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Cumulative Generation (29/05/2014 – end of May 2026)
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {operatingResults.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-2xl font-bold text-cyan-700">{r.value}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{r.label_en || r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Development Journey
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            History of Formation and Development
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {timeline.map((t) => (
            <article
              key={t.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-xl font-bold text-cyan-700">{t.date}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t.summary_en || t.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Recognition
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Awards and Commendations Received
          </h2>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Emulation Titles</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="px-5 py-3 font-semibold">Year</th>
                    <th className="px-5 py-3 font-semibold">Emulation Title</th>
                    <th className="px-5 py-3 font-semibold">Recognition Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {emulationTitles.map((a) => (
                    <tr key={a.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-3 font-semibold text-cyan-700">{a.year}</td>
                      <td className="px-5 py-3 text-slate-700">{a.title_en || a.title}</td>
                      <td className="px-5 py-3 leading-6 text-slate-500">{a.decision_en || a.decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Forms of Commendation</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="px-5 py-3 font-semibold">Year</th>
                    <th className="px-5 py-3 font-semibold">Form of Commendation</th>
                    <th className="px-5 py-3 font-semibold">Commendation Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {commendations.map((a) => (
                    <tr key={a.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-3 font-semibold text-cyan-700">{a.year}</td>
                      <td className="px-5 py-3 text-slate-700">{a.title_en || a.title}</td>
                      <td className="px-5 py-3 leading-6 text-slate-500">{a.decision_en || a.decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Brand Affirmation
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              PV Power DHC Continues to Grow
            </h2>
          </div>
          {closingContentEn && (
            <div
              className="prose prose-slate grid max-w-none gap-6 leading-8 text-slate-600 lg:grid-cols-2 prose-p:my-0"
              dangerouslySetInnerHTML={{ __html: closingContentEn }}
            />
          )}
        </div>
      </section>

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
              href="/en-US/services"
              className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold transition hover:bg-cyan-500"
            >
              Services
            </Link>
            <Link
              href="/en-US/projects"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Projects
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
