import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import {
  buildLeadershipGroups,
  LeadershipBoard,
} from "@/components/leadership";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

export default function BanLanhDaoPage() {
  const leadershipGroups = buildLeadershipGroups(getCollection("leadership"));

  return (
    <PtscShell>
      <section className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Link
              href="/"
              className="transition hover:text-cyan-700"
            >
              Trang chủ
            </Link>

            <span>/</span>

            <Link
              href="/gioi-thieu"
              className="transition hover:text-cyan-700"
            >
              Giới thiệu
            </Link>

            <span>/</span>

            <span className="font-semibold text-slate-900">
              Ban lãnh đạo
            </span>
          </nav>
        </div>
      </section>

      <section className="bg-white px-2 py-6 sm:px-4">
        <LeadershipBoard
          groups={leadershipGroups}
          locale="vi"
        />
      </section>

      <section className="bg-slate-900 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">
              Khám phá PV Power DHC
            </h2>

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