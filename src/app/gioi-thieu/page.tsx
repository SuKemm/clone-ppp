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

const emulationTitles = [
  ["2012", "Tập thể lao động xuất sắc", "QĐ số 608/QĐ-ĐLDK ngày 04/12/2012 của Tổng Công ty Điện lực Dầu khí Việt Nam"],
  ["2013", "Tập thể lao động xuất sắc", "QĐ số 665/QĐ-ĐLDK ngày 29/11/2013 của Tổng Công ty Điện lực Dầu khí Việt Nam"],
  ["2015", "Tập thể lao động tiên tiến", "QĐ số 956/QĐ-ĐLDK ngày 01/12/2015 của Tổng Công ty Điện lực Dầu khí Việt Nam"],
  ["2016", "Tập thể lao động tiên tiến", "QĐ số 1313/QĐ-ĐLDK ngày 01/12/2016 của Tổng Công ty Điện lực Dầu khí Việt Nam"],
  ["2017", "Tập thể lao động tiên tiến", "QĐ số 1158/QĐ-ĐLDK ngày 01/12/2017 của Tổng Công ty Điện lực Dầu khí Việt Nam"],
  ["2018", "Tập thể lao động tiên tiến", "QĐ số 698/QĐ-ĐLDK ngày 06/12/2018 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP"],
  ["2019", "Tập thể hoàn thành tốt nhiệm vụ", "QĐ số 1220/QĐ-ĐKDK ngày 28/11/2019 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP"],
  ["2020", "Tập thể lao động tiên tiến", "QĐ số 1081/QĐ-ĐKDK ngày 27/11/2020 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP"],
];

const commendations = [
  ["2012", "Giấy khen của Tổng Công ty", "QĐ số 609/QĐ-ĐLDK ngày 04/12/2012 của Tổng Công ty Điện lực Dầu khí Việt Nam"],
  ["2014", "Bằng khen của Bộ trưởng Bộ Công Thương", "QĐ số 783/QĐ-BCT ngày 22/01/2014 của Bộ trưởng Bộ Công Thương"],
  ["2015", "Giấy khen của Tổng Công ty", "QĐ số 959/QĐ-ĐLDK ngày 07/12/2015 của Tổng Công ty Điện lực Dầu khí Việt Nam"],
  ["2016", "Bằng khen của UBND tỉnh Quảng Ngãi", "QĐ số 1699/QĐ-UBND ngày 20/9/2016 của UBND tỉnh Quảng Ngãi"],
  ["2016", "Giấy khen của Tổng Công ty", "QĐ số 1312/QĐ-ĐLDK ngày 01/12/2016 của Tổng Công ty Điện lực Dầu khí Việt Nam"],
  ["2017", "Bằng khen của UBND tỉnh Quảng Ngãi", "QĐ số 496/QĐ-UBND ngày 23/3/2017 của UBND tỉnh Quảng Ngãi"],
  ["2017", "Giấy khen của Tổng Công ty", "QĐ số 1160/QĐ-ĐLDK ngày 01/12/2017 của Tổng Công ty Điện lực Dầu khí Việt Nam"],
  ["2018", "Bằng khen của UBND tỉnh Quảng Ngãi", "QĐ số 185/QĐ-UBND ngày 30/01/2018 của UBND tỉnh Quảng Ngãi"],
  ["2018", "Giấy khen của Tổng Công ty", "QĐ số 697/QĐ-ĐLDK ngày 06/12/2018 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP"],
  ["2019", "Giấy khen của Tổng Công ty", "QĐ số 1220/QĐ-ĐKDK ngày 28/11/2019 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP"],
  ["2020", "Giấy khen của Tổng Công ty", "QĐ số 1084/QĐ-ĐKDK ngày 27/11/2019 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP"],
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
                Nhà máy thủy điện Đakđrinh có công suất thiết kế 125 MW, tổng mức
                đầu tư 5.921 tỷ đồng, điện lượng bình quân thiết kế E0 đạt
                540,29 triệu kWh/năm, sản lượng theo hợp đồng mua bán điện là
                527 triệu kWh/năm. Lũy kế sản lượng phát điện từ ngày 29/5/2014
                đến nay đạt hơn 7 tỷ kWh, đóng góp hàng nghìn tỷ đồng cho ngân
                sách hai tỉnh Quảng Ngãi và Kon Tum.
              </p>

              <p>
                Công ty cổ phần Thủy điện Đakđrinh được thành lập ngày
                16/03/2007 bởi 4 cổ đông sáng lập: Tập đoàn Dầu khí Quốc gia
                Việt Nam (nay chuyển quyền cho Tổng Công ty Điện lực Dầu khí
                Việt Nam - CTCP, PV Power), Ngân hàng TMCP Đầu tư và Phát triển
                Việt Nam (BIDV), Tổng Công ty Sông Đà - CTCP (Sông Đà) và Tổng
                Công ty LICOGI - CTCP (LICOGI), theo Giấy chứng nhận đăng ký
                kinh doanh công ty cổ phần số 4300350203 do Sở Kế hoạch và Đầu
                tư tỉnh Quảng Ngãi cấp lần đầu ngày 21/03/2007, vốn điều lệ ban
                đầu 930 tỷ đồng. Qua nhiều lần thay đổi giấy chứng nhận đăng ký
                doanh nghiệp, vốn điều lệ hiện nay của Công ty là 1.160,011 tỷ
                đồng.
              </p>

              <p>
                Công ty là chủ đầu tư Dự án thủy điện Đakđrinh, bố trí trên lưu
                vực sông Đakđrinh thuộc huyện Sơn Tây, tỉnh Quảng Ngãi và huyện
                Kon Plông, tỉnh Kon Tum, cách thành phố Quảng Ngãi khoảng 70 km
                về phía tây - một dự án trọng điểm trong chương trình phát
                triển kinh tế - xã hội và an ninh năng lượng quốc gia nói
                chung, tỉnh Quảng Ngãi nói riêng. Nhà máy gồm 2 tổ máy, tổ máy
                số 1 hòa lưới điện Quốc gia tháng 6/2014 và tổ máy số 2 vào
                tháng 9/2014; ngoài phát điện, Nhà máy còn tham gia cắt/giảm lũ
                mùa mưa và bổ sung nước mùa hạn cho hạ du.
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
            <p className="mt-4 leading-7 text-slate-600">
              Phát triển bền vững, trở thành một trong những công ty cổ phần
              hoạt động sản xuất, kinh doanh điện hiệu quả hàng đầu khu vực
              miền Trung.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Sứ mệnh</h3>
            <p className="mt-4 leading-7 text-slate-600">
              Cung cấp nguồn điện đảm bảo chất lượng, đề cao hợp tác bền vững
              với cổ đông và đối tác; xây dựng môi trường làm việc chuyên
              nghiệp, năng động, sáng tạo, hiệu quả, nhân văn và có trách
              nhiệm với xã hội.
            </p>
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
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Nhân sự chủ chốt
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Ban lãnh đạo</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Hội đồng Quản trị, Ban Tổng Giám đốc và Ban Kiểm soát Công ty cổ
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
                  {emulationTitles.map(([year, title, decision], i) => (
                    <tr key={`${year}-${title}-${i}`} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-3 font-semibold text-cyan-700">{year}</td>
                      <td className="px-5 py-3 text-slate-700">{title}</td>
                      <td className="px-5 py-3 leading-6 text-slate-500">{decision}</td>
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
                  {commendations.map(([year, title, decision], i) => (
                    <tr key={`${year}-${title}-${i}`} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-3 font-semibold text-cyan-700">{year}</td>
                      <td className="px-5 py-3 text-slate-700">{title}</td>
                      <td className="px-5 py-3 leading-6 text-slate-500">{decision}</td>
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
          <div className="grid gap-6 lg:grid-cols-2">
            <p className="leading-8 text-slate-600">
              Từ vốn điều lệ ban đầu 930 tỷ đồng, sau gần 12 năm hoạt động vốn
              điều lệ của Công ty đã tăng lên 1.160,01 tỷ đồng, với 4 phòng
              ban và 1 phân xưởng vận hành sửa chữa. Nhà máy thủy điện
              Đakđrinh duy trì sản lượng điện bình quân hằng năm gần 540,925
              triệu kWh. Công ty có kế hoạch niêm yết hơn 116 triệu cổ phiếu
              lên sàn chứng khoán, hướng tới trở thành công ty đại chúng
              trong lĩnh vực đầu tư, xây dựng, sản xuất kinh doanh điện năng.
            </p>
            <p className="leading-8 text-slate-600">
              Hai tổ máy của Nhà máy thủy điện Đakđrinh vận hành ổn định dưới
              sự chỉ đạo, điều hành sát sao của Ban lãnh đạo, đồng bộ từ quản
              lý sản xuất, kỹ thuật đến chào giá cạnh tranh trên thị trường
              điện, cùng hệ thống quản lý theo tiêu chuẩn ISO 9001-2008 - nhờ
              đó lợi nhuận lũy kế các năm 2014-2022 của Công ty đạt 863 tỷ
              đồng.
            </p>
          </div>
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
