import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";

const visionMission = [
  {
    title: "Tầm nhìn PTSC",
    description:
      "Trở thành thương hiệu toàn cầu trong lĩnh vực năng lượng, trọng tâm là dịch vụ kỹ thuật dầu khí và năng lượng tái tạo ngoài khơi.",
  },
  {
    title: "Sứ mệnh PTSC",
    points: [
      "Cung cấp giải pháp toàn diện và tối ưu, mang lại giá trị gia tăng vượt trội.",
      "Phát huy văn hóa doanh nghiệp đặc sắc PTSC, truyền cảm hứng sáng tạo và khơi dậy tiềm năng người lao động.",
      "Thúc đẩy xu hướng chuyển dịch năng lượng, đóng góp cho sự phát triển bền vững của cộng đồng và xã hội.",
      "Góp phần quan trọng thúc đẩy chuỗi giá trị của PVN, tối ưu hiệu quả kinh doanh và nâng cao năng lực cạnh tranh quốc gia.",
    ],
  },
];

const timeline = [
  {
    year: "1976",
    summary:
      "Thủ tướng Chính phủ ban hành Quyết định số 458/TTg ngày 24/11/1976 phê duyệt dự án xây dựng căn cứ dịch vụ dầu khí Vũng Tàu, tiền đề thành lập Công ty Địa vật lý.",
  },
  {
    year: "1986",
    summary:
      "Thành lập Công ty Dịch vụ Dầu khí (PSC) với hoạt động chủ yếu cung cấp dịch vụ sinh hoạt và từ 1988 bắt đầu triển khai dịch vụ dầu khí chuyên ngành.",
  },
  {
    year: "1989",
    summary:
      "Thành lập Công ty Địa vật lý và Dịch vụ Kỹ thuật Dầu khí (GPTS) chuyên tiếp tục công tác địa vật lý và dịch vụ chuyên ngành dầu khí.",
  },
  {
    year: "1993",
    summary:
      "Sát nhập PSC và GPTS thành Công ty Dịch vụ Kỹ thuật Dầu khí (PTSC), doanh nghiệp Nhà nước duy nhất cung cấp dịch vụ kỹ thuật dầu khí với trọng tâm tàu dịch vụ, căn cứ cảng và lao động kỹ thuật.",
  },
  {
    year: "1994 - 2006",
    summary:
      "Đầu tư phát triển đội tàu dịch vụ dầu khí, mở rộng căn cứ cảng dịch vụ dầu khí PTSC trở thành căn cứ đa năng; thực hiện thành công các dự án khối nhà ở thượng tầng và dịch vụ cơ khí dầu khí.",
  },
  {
    year: "2006 - 2010",
    summary:
      "Cổ phần hóa, niêm yết trên sàn HNX với mã PVS và chuyển đổi hoạt động theo mô hình công ty mẹ - công ty con.",
  },
  {
    year: "2011 - 2015",
    summary:
      "Sở hữu FSO PTSC Biển Đông 01 và FPSO PTSC Lam Sơn, làm chủ công nghệ đóng mới, hoán cải, vận hành và bảo dưỡng FSO/FPSO.",
  },
  {
    year: "2016 - 2020",
    summary:
      "Triển khai các dự án công nghiệp trên bờ, mở rộng kho cảng LNG Thị Vải và tổ hợp lọc hóa dầu miền Nam.",
  },
  {
    year: "2021",
    summary:
      "Mở rộng ngành nghề kinh doanh năng lượng gồm sản xuất điện, truyền tải, phân phối, xây dựng công trình công nghiệp và năng lượng tái tạo. Nhận thầu dự án Gallaf giai đoạn 3 tại Qatar.",
  },
];

export default function AboutPage() {
  return (
    <PtscShell
      title="Giới thiệu"
      description="Tổng công ty Cổ phần Dịch vụ Kỹ thuật Dầu khí Việt Nam (PTSC) là thành viên của Tập đoàn công nghiệp - Năng lượng quốc gia Việt Nam, cung cấp dịch vụ kỹ thuật dầu khí, công nghiệp và năng lượng tái tạo đạt chuẩn quốc tế."
    >
      <section className="border-b border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="transition hover:text-cyan-700">
              Trang chủ
            </Link>
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-slate-900">Giới thiệu</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-slate-900">Thông tin chung</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                <strong>
                  Tổng công ty Cổ phần Dịch vụ Kỹ thuật Dầu khí Việt Nam (PTSC)
                  là thành viên của Tập đoàn công nghiệp - Năng lượng quốc gia
                  Việt Nam (PetroVietnam - PVN).
                </strong>
              </p>
              <p>
                Được thành lập trên cơ sở triển khai Quyết định số 458/TTg ngày
                24/11/1976 của Thủ tướng Chính phủ về việc phê duyệt đề án xây dựng
                căn cứ dịch vụ dầu khí Vũng Tàu, trải qua 50 năm hình thành và
                phát triển, PTSC đã có những bước phát triển vượt bậc. Là Tổng
                công ty hàng đầu trong lĩnh vực cung cấp các dịch vụ kỹ thuật dầu
                khí, công nghiệp tại Việt Nam, và là thương hiệu lớn trên thị trường
                dịch vụ dầu khí, công nghiệp trong khu vực.
              </p>
              <p>
                Lĩnh vực hoạt động chính của PTSC là cung cấp các loại hình dịch vụ
                kỹ thuật cho các ngành dầu khí, năng lượng, công nghiệp, trong đó có
                nhiều dịch vụ chất lượng cao, mũi nhọn, đã phát triển và được
                chuyên nghiệp hóa đạt trình độ quốc tế như: EPCI công trình biển; EPC
                công trình công nghiệp; Kho nổi chứa, xử lý và xuất dầu thô FSO/FPSO;
                Tàu dịch vụ dầu khí; Khảo sát địa chấn, địa chất và công trình ngầm;
                Lắp đặt, vận hành và bảo dưỡng công trình biển; Cảng dịch vụ;
                Dịch vụ cung ứng nhân lực kỹ thuật và các dịch vụ cho dự án năng lượng
                tái tạo.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "50", caption: "Năm phát triển bền vững" },
              { label: "14.890", caption: "Vốn chủ sở hữu (tỷ đồng)" },
              { label: "34.074", caption: "Tổng tài sản (tỷ đồng)" },
              { label: "10.000", caption: "Nguồn nhân lực" },
            ].map((item) => (
              <div key={item.caption} className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-3xl font-semibold text-slate-900">{item.label}</p>
                <p className="mt-2 text-sm text-slate-500">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-3xl font-semibold text-slate-900">Tầm nhìn - Sứ mệnh</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {visionMission.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
              {item.description ? (
                <p className="mt-4 text-slate-600">{item.description}</p>
              ) : null}
              {item.points ? (
                <ul className="mt-6 space-y-3 text-slate-600">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 text-cyan-700">➡</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Lịch sử hình thành và phát triển</h2>
            <p className="mt-3 text-slate-600">
              Các cột mốc quan trọng đánh dấu hành trình phát triển của PTSC trong hơn 50 năm.
            </p>
          </div>
          <Link href="/gioi-thieu" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
            Xem thêm →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {timeline.map((item) => (
            <article key={item.year} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xl font-semibold text-cyan-700">{item.year}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
