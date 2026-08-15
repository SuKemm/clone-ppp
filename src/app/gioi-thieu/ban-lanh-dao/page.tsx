import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { leadershipGroups, PersonCard } from "@/components/leadership";

export default function BanLanhDaoPage() {
  return (
    <PtscShell
      title="Ban lãnh đạo"
      description="Ban lãnh đạo Công ty cổ phần Thủy điện Đakđrinh (PV Power DHC): Hội đồng Quản trị, Ban Tổng Giám đốc, Ban Kiểm soát."
    >
      <section className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="transition hover:text-cyan-700">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/gioi-thieu" className="transition hover:text-cyan-700">
              Giới thiệu
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">Ban lãnh đạo</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-8">
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
          Nhân sự chủ chốt
        </span>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Ban lãnh đạo</h1>
      </section>

      {leadershipGroups.map((group, index) => (
        <section
          key={group.id}
          className={`px-6 py-12 lg:px-8 ${index % 2 === 1 ? "bg-slate-50" : ""}`}
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
              {group.groupTitle}
            </h2>

            <div className="flex justify-center">
              <PersonCard person={group.leader} size="lg" />
            </div>

            {group.members.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                {group.members.map((member) => (
                  <PersonCard key={member.name} person={member} size="md" />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="bg-slate-900 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Khám phá PV Power DHC</h2>
            <p className="mt-2 text-slate-300">
              Tìm hiểu thêm về dự án, hoạt động vận hành và thông tin doanh nghiệp.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/gioi-thieu"
              className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold transition hover:bg-cyan-500"
            >
              Giới thiệu chung
            </Link>
            <Link
              href="/du-an"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Dự án
            </Link>
            <Link
              href="/lien-he"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
