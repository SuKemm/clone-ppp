import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { leadershipGroups, PersonCard } from "@/components/leadership";

export default function BanLanhDaoPage() {
  return (
    <PtscShell
      title="Ban lãnh đạo"
      description="Ban lãnh đạo Công ty cổ phần Thủy điện Đakđrinh (PV Power DHC): Hội đồng Quản trị, Ban Giám đốc, Ban Kiểm soát."
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

      <section className="mx-auto max-w-6xl px-6 pt-14 text-center lg:px-8">
        <h1 className="mt-2 text-3xl font-bold text-[#454A8A] sm:text-4xl">Ban lãnh đạo</h1>
      </section>

      {leadershipGroups.map((group) => (
        <section key={group.id} className="px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold text-[#454A8A]">{group.groupTitle}</h2>
              <div className="mt-3 h-[3px] w-14 rounded-full bg-[#454A8A]" />
            </div>

            <div className="flex justify-center">
              <PersonCard person={group.leader} size="lg" />
            </div>

            {group.members.length > 0 && (
              <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-10">
                {group.members.map((member) => (
                  <div key={member.name} className="w-32 sm:w-36">
                    <PersonCard person={member} size="md" />
                  </div>
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
