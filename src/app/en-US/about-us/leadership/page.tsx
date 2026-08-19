import Link from "next/link";
import {
  leadershipGroups,
  LeadershipBoard,
} from "@/components/leadership";
import { PtscShell } from "@/components/ptsc-shell";

export default function LeadershipPageEn() {
  return (
    <PtscShell>
      {/* =========================================================
          BREADCRUMB
      ========================================================= */}
      <section className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Link
              href="/en-US"
              className="transition hover:text-cyan-700"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/en-US/about-us"
              className="transition hover:text-cyan-700"
            >
              About Us
            </Link>

            <span>/</span>

            <span className="font-semibold text-slate-900">
              Leadership
            </span>
          </nav>
        </div>
      </section>

      {/* =========================================================
          LEADERSHIP ORGANIZATION CHART
          Same layout as the Vietnamese page and reference mockup
      ========================================================= */}
      <section className="bg-white px-2 py-6 sm:px-4">
        <LeadershipBoard
          groups={leadershipGroups}
          locale="en"
        />
      </section>

      {/* =========================================================
          FOOTER CTA
      ========================================================= */}
      <section className="bg-slate-900 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
          
          <div>
            <h2 className="text-2xl font-bold">
              Explore PV Power DHC
            </h2>

            <p className="mt-2 text-slate-300">
              Learn more about our projects, operations,
              and corporate information.
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