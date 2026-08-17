import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { leadershipGroups, PersonCard } from "@/components/leadership";

// Đồng bộ với trang tiếng Việt (src/app/gioi-thieu/ban-lanh-dao/page.tsx),
// dùng chung dữ liệu leadershipGroups và hiển thị bản tiếng Anh của "title"
// (title_en/groupTitle_en) qua prop locale="en" của PersonCard.

export default function LeadershipPageEn() {
  return (
    <PtscShell
      title="Leadership"
      description="Leadership of Dakdrinh Hydropower Joint Stock Company (PV Power DHC): Board of Directors, Board of Management, Supervisory Board."
    >
      <section className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Link href="/en-US" className="transition hover:text-cyan-700">
              Home
            </Link>
            <span>/</span>
            <Link href="/en-US/about-us" className="transition hover:text-cyan-700">
              About Us
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">Leadership</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-8">
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
          Key Personnel
        </span>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Leadership</h1>
      </section>

      {leadershipGroups.map((group, index) => (
        <section
          key={group.id}
          className={`px-6 py-12 lg:px-8 ${index % 2 === 1 ? "bg-slate-50" : ""}`}
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
              {group.groupTitle_en || group.groupTitle}
            </h2>

            <div className="flex justify-center">
              <PersonCard person={group.leader} size="lg" locale="en" />
            </div>

            {group.members.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                {group.members.map((member) => (
                  <PersonCard key={member.name} person={member} size="md" locale="en" />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

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
