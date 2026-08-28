import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

export default function AboutPage() {
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

  return (
    <PtscShell
      title="Giới thiệu"
      description="Công ty cổ phần Thủy điện Đakđrinh (PV Power DHC) - chủ đầu tư và vận hành Nhà máy thủy điện Đakđrinh, công suất 125 MW, tại huyện Sơn Tây (Quảng Ngãi) và huyện Kon Plông (Kon Tum)."
    >
      <section className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="transition hover:text-cyan-700">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">Giới thiệu</span>
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
              Tổng quan doanh nghiệp
            </h2>

            {overview?.overview_intro && (
              <div
                className="prose prose-slate mt-6 max-w-none text-[16px] leading-8 text-slate-600 prose-p:my-5 prose-strong:text-slate-800"
                dangerouslySetInnerHTML={{ __html: overview.overview_intro }}
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
                <div className="mt-2 text-sm leading-6 text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Chiến lược 2015 - 2020, tầm nhìn 2030
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Tầm nhìn &amp; Sứ mệnh
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Tầm nhìn</h3>
            <p className="mt-4 leading-7 text-slate-600">{overview?.vision}</p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Sứ mệnh</h3>
            <p className="mt-4 leading-7 text-slate-600">{overview?.mission}</p>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Cơ cấu sở hữu
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Cổ đông Công ty
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">Danh sách cổ đông</h3>
              <ul className="mt-5 space-y-3">
                {shareholders.map((s) => (
                  <li key={s.id} className="flex gap-3 leading-7 text-slate-600">
                    <span className="mt-1 font-bold text-cyan-700">✓</span>
                    <span>{s.name}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">Tổng mức đầu tư</h3>
              {overview?.investment_note && (
                <div
                  className="prose prose-slate mt-4 max-w-none leading-7 text-slate-600 prose-p:my-4 prose-strong:text-slate-800"
                  dangerouslySetInnerHTML={{ __html: overview.investment_note }}
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
              Nhân sự chủ chốt
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Ban lãnh đạo</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Hội đồng Quản trị, Ban Giám đốc và Ban Kiểm soát Công ty cổ
              phần Thủy điện Đakđrinh (PV Power DHC).
            </p>
          </div>
          <Link
            href="/gioi-thieu/ban-lanh-dao"
            className="shrink-0 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
          >
            Xem Ban lãnh đạo
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Dự án
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Thông số Dự án thủy điện Đakđrinh
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projectSpecs.map((spec) => (
            <div
              key={spec.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-slate-500">{spec.label}</div>
              <div className="mt-2 text-lg font-bold text-cyan-700">{spec.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Kết quả vận hành
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Lũy kế phát điện (29/05/2014 - hết tháng 05/2026)
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {operatingResults.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-2xl font-bold text-cyan-700">{r.value}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Hành trình phát triển
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Lịch sử hình thành và phát triển
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {timeline.map((t) => (
            <article
              key={t.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-xl font-bold text-cyan-700">{t.date}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Ghi nhận
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Hình thức khen thưởng đã đạt được
          </h2>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Danh hiệu thi đua</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="px-5 py-3 font-semibold">Năm</th>
                    <th className="px-5 py-3 font-semibold">Danh hiệu thi đua</th>
                    <th className="px-5 py-3 font-semibold">Quyết định công nhận</th>
                  </tr>
                </thead>
                <tbody>
                  {emulationTitles.map((a) => (
                    <tr key={a.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-3 font-semibold text-cyan-700">{a.year}</td>
                      <td className="px-5 py-3 text-slate-700">{a.title}</td>
                      <td className="px-5 py-3 leading-6 text-slate-500">{a.decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Hình thức khen thưởng</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="px-5 py-3 font-semibold">Năm</th>
                    <th className="px-5 py-3 font-semibold">Hình thức khen thưởng</th>
                    <th className="px-5 py-3 font-semibold">Quyết định khen thưởng</th>
                  </tr>
                </thead>
                <tbody>
                  {commendations.map((a) => (
                    <tr key={a.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-3 font-semibold text-cyan-700">{a.year}</td>
                      <td className="px-5 py-3 text-slate-700">{a.title}</td>
                      <td className="px-5 py-3 leading-6 text-slate-500">{a.decision}</td>
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
              Khẳng định thương hiệu
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              PV Power DHC không ngừng lớn mạnh
            </h2>
          </div>
          {overview?.closing_content && (
            <div
              className="prose prose-slate grid max-w-none gap-6 leading-8 text-slate-600 lg:grid-cols-2 prose-p:my-0"
              dangerouslySetInnerHTML={{ __html: overview.closing_content }}
            />
          )}
        </div>
      </section>

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
              href="/dich-vu"
              className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold transition hover:bg-cyan-500"
            >
              Dịch vụ
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
