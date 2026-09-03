import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Ngày vận hành chính thức của tổ máy 1 (29/05/2014) — dùng để tự tính số
// năm vận hành và mốc "tính đến nay" cho 2 ô thông số bổ sung, luôn chạy
// theo ngày thực tế mỗi lần trang được render (không hardcode).
const OPERATION_START_DATE = new Date(2014, 4, 29);

function formatTodayVi(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function yearsOperating(from: Date, to: Date): number {
  let years = to.getFullYear() - from.getFullYear();
  const beforeAnniversary =
    to.getMonth() < from.getMonth() ||
    (to.getMonth() === from.getMonth() && to.getDate() < from.getDate());
  if (beforeAnniversary) years -= 1;
  return years;
}

export default function AboutPage() {
  const overview = getCollection("company-overview")[0];
  const shareholders = getCollection("shareholders-list");
  const projectSpecs = getCollection("company-specs");
  const timeline = getCollection("company-timeline");
  const allAwards = getCollection("company-awards");
  const emulationTitles = allAwards.filter((a) => a.award_type === "Danh hiệu thi đua");
  const commendations = allAwards.filter((a) => a.award_type === "Hình thức khen thưởng");

  const today = new Date();
  const todayLabel = formatTodayVi(today);
  const yearsRunning = yearsOperating(OPERATION_START_DATE, today);

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
        <div>
          <h2 className="mt-3 text-center text-3xl font-semibold uppercase tracking-tight text-[#075B9F] sm:text-4xl">
            Tổng quan doanh nghiệp
          </h2>

          {overview?.overview_intro && (
            <div
              className="prose prose-slate mt-6 max-w-none text-[16px] leading-8 text-slate-600 prose-p:my-5 prose-strong:font-semibold prose-strong:text-slate-800"
              dangerouslySetInnerHTML={{ __html: overview.overview_intro }}
            />
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold uppercase text-[#075B9F]">
            Tầm nhìn &amp; Sứ mệnh
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-center text-xl font-semibold uppercase text-slate-900">Tầm nhìn</h3>
            <p className="mt-4 leading-7 text-slate-600">{overview?.vision}</p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-center text-xl font-semibold uppercase text-slate-900">Sứ mệnh</h3>
            <p className="mt-4 leading-7 text-slate-600">{overview?.mission}</p>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold uppercase text-[#075B9F]">
              Các cổ đông
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-center text-2xl font-semibold uppercase text-slate-900">Danh sách các cổ đông</h3>
              <ul className="mt-5 space-y-3">
                {shareholders.map((s) => (
                  <li key={s.id} className="flex gap-3 leading-7 text-slate-600">
                    <span className="mt-1 font-semibold text-cyan-700">✓</span>
                    <span>{s.name}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-center text-2xl font-semibold uppercase text-slate-900">Tổng mức đầu tư</h3>
              {overview?.investment_note && (
                <div
                  className="prose prose-slate mt-4 max-w-none leading-7 text-slate-600 prose-p:my-4 prose-strong:font-semibold prose-strong:text-slate-800"
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
            <h2 className="text-center text-2xl font-semibold uppercase text-[#075B9F]">Ban lãnh đạo</h2>
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
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold uppercase text-[#075B9F]">
            Thông số về dự án
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projectSpecs.map((spec) => (
            <div
              key={spec.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-slate-500">{spec.label}</div>
              <div className="mt-2 text-lg font-semibold text-cyan-700">{spec.value}</div>
            </div>
          ))}

          {/* 2 ô bổ sung — tự tính theo ngày thực tế mỗi lần trang render,
              không hardcode ngày tháng. */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">Sản lượng điện</div>
            <div className="mt-2 text-lg font-semibold text-cyan-700">
              ~7 tỷ kWh <span className="text-sm font-semibold text-slate-500">(tính đến: {todayLabel})</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">Vận hành từ năm 2014</div>
            <div className="mt-2 text-lg font-semibold text-cyan-700">
              {yearsRunning} năm <span className="text-sm font-semibold text-slate-500">(tính đến nay: {todayLabel})</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold uppercase text-[#075B9F]">
            Các mốc tiến độ chính của dự án
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {timeline.map((t) => (
            <article
              key={t.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-xl font-semibold text-cyan-700">{t.date}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold uppercase text-[#075B9F]">
            Hình thức khen thưởng
          </h2>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="mb-4 text-xl font-semibold uppercase text-slate-900">Danh hiệu thi đua</h3>
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
            <h3 className="mb-4 text-xl font-semibold uppercase text-slate-900">Hình thức khen thưởng</h3>
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
          {overview?.closing_content && (
            <div
              className="prose prose-slate grid max-w-none gap-6 leading-8 text-slate-600 lg:grid-cols-2 prose-p:my-0 prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: overview.closing_content }}
            />
          )}
        </div>
      </section>

      <section className="bg-slate-900 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold">Khám phá PV Power DHC</h2>
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
