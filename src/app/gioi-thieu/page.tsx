import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";

const shareholders = [
  "Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP (PV Power)",
  "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam (BIDV)",
  "Tổng Công ty LICOGI - CTCP (LICOGI)",
  "Tổng Công ty Sông Đà - CTCP (Sông Đà)",
  "Bà Hà Thị Phương Thúy",
];

const projectSpecs = [
  ["Công suất lắp máy", "125 MW"],
  ["Sản lượng điện bình quân nhiều năm (E0, theo hợp đồng)", "527,6 triệu kWh/năm"],
  ["Vị trí xây dựng", "Huyện Sơn Tây, tỉnh Quảng Ngãi và huyện Kon Plông, tỉnh Kon Tum"],
  ["Quy hoạch", "Thuộc Quy hoạch điện VI và Quy hoạch điện VII"],
  ["Cấp công trình", "Công trình cấp I"],
  ["Đường hầm dẫn nước", "Dài 10,7 km - một trong những đường hầm thủy điện dài nhất tại thời điểm xây dựng"],
  ["Khối lượng bê tông", "Trên 800.000 m³ bê tông RCC và CVC"],
  ["Dung tích hồ chứa", "248 triệu m³"],
  ["Diện tích lưu vực", "420 km²"],
  ["Mực nước dâng bình thường (MNDBT)", "410 m"],
  ["Diện tích mặt hồ ứng với MNDBT", "9,12 km²"],
];

const timeline = [
  ["21/03/2007", "Thành lập Công ty cổ phần Thủy điện Đakđrinh theo quy định của Luật Doanh nghiệp, hoạt động theo mô hình công ty cổ phần."],
  ["28/03/2007", "Dự án thủy điện Đakđrinh chính thức động thổ."],
  ["17/05/2008", "Hội đồng Quản trị Công ty phê duyệt dự án đầu tư tại Quyết định số 16/DHC-HĐQT-QĐ."],
  ["23/01/2011", "Khởi công xây dựng, ngăn sông đợt 1."],
  ["16/10/2013", "Tích nước hồ chứa (ngăn sông đợt 2)."],
  ["29/05/2014", "Tổ máy 1 (H1) phát điện, hòa lưới điện Quốc gia."],
  ["29/08/2014", "Tổ máy 2 phát điện, hòa lưới điện Quốc gia."],
  ["24/11/2017", "Đại hội đồng Cổ đông phê duyệt tổng mức đầu tư điều chỉnh lần 2 tại Quyết định số 105/QĐ-ĐHĐCĐ."],
  ["2015 - 27/01/2016", "Hoàn thành công trình; Hội đồng nghiệm thu Nhà nước chấp thuận cho Chủ đầu tư bàn giao, đưa công trình vào khai thác sử dụng (Thông báo số 02/TB-HĐNTNN)."],
];

const stats = [
  ["125 MW", "Công suất lắp máy"],
  ["1.160,011", "Vốn điều lệ (tỷ đồng)"],
  ["~7 tỷ", "Sản lượng điện lũy kế (kWh)"],
  ["12", "Năm vận hành (từ 2014)"],
];

const productionStatus = [
  ["1.384,48", "Sản lượng", "Ngày 12/08"],
  ["12.296,65", "Sản lượng", "Tháng 08"],
  ["45.647,83", "Sản lượng", "Quý III"],
  ["220.125,45", "Sản lượng", "Năm 2026"],
];

const operatingResults = [
  ["~7 tỷ kWh", "Sản lượng điện lũy kế lên lưới điện Quốc gia (29/5/2014 - hết tháng 5/2026), bình quân 564 triệu kWh/năm, cao hơn E0 540,29 triệu kWh/năm"],
  ["6.622 tỷ đồng", "Doanh thu trước thuế VAT lũy kế"],
  ["1.050 tỷ đồng", "Lợi nhuận sau thuế lũy kế"],
  ["1.550 tỷ đồng", "Nộp Ngân sách Nhà nước từ khi vận hành Nhà máy"],
];

export default function AboutPage() {
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

            <div className="mt-6 space-y-5 text-[16px] leading-8 text-slate-600">
              <p className="font-semibold text-slate-800">
                Công ty cổ phần Thủy điện Đakđrinh (PV Power DHC) được thành lập
                ngày 21/03/2007 theo quy định của Luật Doanh nghiệp và hoạt động
                theo chế độ công ty cổ phần.
              </p>

              <p>
                Qua 11 lần thay đổi Giấy chứng nhận đăng ký doanh nghiệp, đến nay
                vốn điều lệ của Công ty là 1.160,011 tỷ đồng với 5 cổ đông: Tổng
                Công ty Điện lực Dầu khí Việt Nam - CTCP (PV Power), Ngân hàng
                Thương mại cổ phần Đầu tư và Phát triển Việt Nam (BIDV), Tổng
                Công ty LICOGI - CTCP (LICOGI), Tổng Công ty Sông Đà - CTCP
                (Sông Đà) và Bà Hà Thị Phương Thúy.
              </p>

              <p>
                Công ty là chủ đầu tư trực tiếp Dự án thủy điện Đakđrinh, công
                suất 125 MW, sản lượng điện năng bình quân nhiều năm tại điểm
                giao nhận (theo hợp đồng) là 527,6 triệu kWh/năm. Dự án được xây
                dựng trên địa bàn các huyện đặc biệt khó khăn là huyện Sơn Tây,
                tỉnh Quảng Ngãi và huyện Kon Plông, tỉnh Kon Tum, thuộc Quy hoạch
                điện VI và Quy hoạch điện VII.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-3xl font-bold text-cyan-700">{value}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Cập nhật
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Tình hình sản xuất năm 2026
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                {shareholders.map((name) => (
                  <li key={name} className="flex gap-3 leading-7 text-slate-600">
                    <span className="mt-1 font-bold text-cyan-700">✓</span>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">Tổng mức đầu tư</h3>
              <p className="mt-4 leading-7 text-slate-600">
                Dự án đầu tư được Hội đồng Quản trị Công ty phê duyệt tại Quyết
                định số 16/DHC-HĐQT-QĐ ngày 17/05/2008.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                Tổng mức đầu tư điều chỉnh lần 2 của dự án là{" "}
                <span className="font-semibold text-slate-800">5.921 tỷ đồng</span>,
                đã được Đại hội đồng Cổ đông Công ty phê duyệt tại Quyết định số
                105/QĐ-ĐHĐCĐ ngày 24/11/2017.
              </p>
            </article>
          </div>
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
          {projectSpecs.map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-slate-500">{label}</div>
              <div className="mt-2 text-lg font-bold text-cyan-700">{value}</div>
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
            {operatingResults.map(([value, label]) => (
              <div
                key={value}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-2xl font-bold text-cyan-700">{value}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{label}</div>
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
          {timeline.map(([date, summary]) => (
            <article
              key={date}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-xl font-bold text-cyan-700">{date}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{summary}</p>
            </article>
          ))}
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
