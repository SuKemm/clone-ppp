import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";

const heroSlides = [
  {
    title: "Tổng thầu các dự án dầu khí và Năng lượng tái tạo ngoài khơi",
    image: "/images/ptsc/service-fso.jpg",
  },
  {
    title: "Tổng thầu các dự án Dầu khí và Năng lượng tái tạo ngoài khơi",
    image: "/images/ptsc/service-co-khi.jpg",
  },
  {
    title: "Tổng thầu các dự án dầu khí và Năng lượng tái tạo ngoài khơi",
    image: "/images/ptsc/service-bien.jpg",
  },
];

const projects = [
  {
    title: "Dự án Gallaf 1",
    category: "Dự án dầu khí",
    details:
      "Thiết kế, mua sắm, thi công, vận hành và chạy thử 03 giàn đầu giếng và 01 cầu dẫn.",
    image: "/images/ptsc/project-gallaf.jpg",
  },
  {
    title: "Tổ hợp Hóa dầu miền Nam",
    category: "Dự án công nghiệp",
    details:
      "Triển khai gói A1 nhà máy Olefins với quy mô kỹ thuật và năng lực thi công cao.",
    image: "/images/ptsc/project-hd-mien-nam.jpg",
  },
  {
    title: "Kho cảng LNG Thị Vải",
    category: "Dự án công nghiệp",
    details:
      "Xây dựng trạm tiếp nhận và trữ khí LNG, đáp ứng nhu cầu vận hành an toàn, hiệu quả.",
    image: "/images/ptsc/project-lng.jpg",
  },
  {
    title: "Dự án Biển Đông 01",
    category: "Dự án dầu khí",
    details:
      "Thiết kế, mua sắm, thi công, vận hành và chạy thử giàn xử lý trung tâm Hải Thạch và giàn đầu giếng HT1 & MT1.",
    image: "/images/ptsc/service-fso.jpg",
  },
];

const news = [
  {
    date: "24/06/2026",
    title:
      "PTSC tổ chức thành công Lễ Đặt tên và Bàn giao FSO PTSC Lạc Đà Vàng, sẵn sàng cho mục tiêu First Oil của mỏ Lạc Đà Vàng",
    category: "Sản xuất - Kinh doanh",
    link: "/tin-tuc",
  },
  {
    date: "20/06/2026",
    title: "Chủ động quản trị rủi ro, giữ vững tiến độ Dự án Khí Lô B – Gói EPCI#1",
    category: "Sản xuất - Kinh doanh",
    link: "/tin-tuc",
  },
  {
    date: "18/06/2026",
    title:
      "ĐHĐCĐ PTSC 2026: PTSC khẳng định vị thế sau năm kinh doanh kỷ lục, hướng tới mục tiêu nâng cao năng lực cạnh tranh trong khu vực",
    category: "Sản xuất - Kinh doanh",
    link: "/tin-tuc",
  },
  {
    date: "12/06/2026",
    title:
      "PVFCCo - Phú Mỹ và PTSC ký kết Thỏa thuận Hợp tác, tăng cường liên kết trong hệ sinh thái Petrovietnam",
    category: "Sản xuất - Kinh doanh",
    link: "/tin-tuc",
  },
  {
    date: "01/06/2026",
    title: "Bản tin Tài chính Quý I/2026",
    category: "Cổ đông",
    link: "/tin-tuc",
  },
];

const investorNews = [
  {
    date: "20/06/2026",
    title: "Thông báo Thay đổi nhân sự / Change in Personnel",
    link: "/lien-he",
  },
  {
    date: "19/06/2026",
    title: "Thông báo Thay đổi nhân sự / Change in personnel",
    link: "/lien-he",
  },
  {
    date: "19/06/2026",
    title: "Công bố thông tin Biên bản, Nghị quyết Họp Đại hội đồng Cổ đông thường niên 2026",
    link: "/lien-he",
  },
  {
    date: "16/06/2026",
    title: "Công bố thông tin Nghị quyết về Phê duyệt Nội dung và Tài liệu trình ĐHĐCĐ thường niên 2026",
    link: "/lien-he",
  },
];

const investorResources = [
  "Báo cáo thường niên",
  "Báo cáo tài chính",
  "Tài liệu quản trị",
];

const newsroomItems = [
  {
    category: "Sản xuất - Kinh doanh",
    title: "POS đặt mục tiêu doanh thu 3.500 tỷ đồng tại Đại hội đồng cổ đông thường niên năm 2026",
    date: "22/06/2026",
  },
  {
    category: "Đoàn thể - Xã hội",
    title: "PTSC thúc đẩy văn hóa Coaching & Mentoring – Mỗi nhà quản lý là người phát triển nhân tài",
    date: "17/06/2026",
  },
  {
    category: "Sản xuất - Kinh doanh",
    title: "PTSC M&C hạ thủy giàn xử lý trung tâm Lạc Đà Vàng-A, sẵn sàng cho giai đoạn lắp đặt ngoài khơi",
    date: "12/06/2026",
  },
];

const productionStatus = [
  ["1.384,48", "Sản lượng", "Ngày 12/08"],
  ["12.296,65", "Sản lượng", "Tháng 08"],
  ["45.647,83", "Sản lượng", "Quý III"],
  ["220.125,45", "Sản lượng", "Năm 2026"],
];

export default function Home() {
  return (
    <PtscShell>
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,24,0.95)_0%,rgba(7,13,24,0.84)_44%,rgba(7,13,24,0.32)_100%)]" />
          <img
            src={heroSlides[0].image}
            alt={heroSlides[0].title}
            className="h-[620px] w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-24 lg:px-8">
              <p className="max-w-2xl text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Tổng công ty Cổ phần Dịch vụ Kỹ thuật Dầu khí Việt Nam
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {heroSlides[0].title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                PTSC là đơn vị hàng đầu trong lĩnh vực cung cấp các dịch vụ kỹ thuật dầu khí, công nghiệp và năng lượng tái tạo tại Việt Nam.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Khám phá dự án
                </a>
                <a
                  href="/dich-vu"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Xem dịch vụ
                </a>
              </div>
              <div className="mt-2 flex gap-2">
                {heroSlides.map((slide, index) => (
                  <span
                    key={slide.title}
                    className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-cyan-400" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="news" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
                TIN NỔI BẬT
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                Thông tin mới nhất từ PTSC
              </h2>
            </div>
            <a href="/tin-tuc" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
              Xem thêm →
            </a>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {news.slice(0, 3).map((item) => (
              <a
                key={item.title}
                href={item.link}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                  {item.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-900">{item.title}</h3>
                <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                  <span>{item.date}</span>
                  <span className="text-cyan-700 transition group-hover:translate-x-1">→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
              CẬP NHẬT
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Tình hình sản xuất năm 2026
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          </div>
        </section>

        <section id="projects" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
                  DỰ ÁN NỔI BẬT
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                  Những công trình đã góp phần định hình ngành công nghiệp Việt Nam
                </h2>
              </div>
              <Link href="/du-an" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
                Xem thêm →
              </Link>
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm"
                >
                  <img src={project.image} alt={project.title} className="h-56 w-full object-cover" />
                  <div className="p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                      {project.category}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-slate-900">{project.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{project.details}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
                  CỔ ĐÔNG
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                  Thông tin và tài liệu quản trị
                </h2>
              </div>
              <a href="/lien-he" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
                Liên hệ bộ phận cổ đông →
              </a>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
              <div className="rounded-[1.25rem] bg-slate-50 p-6">
                <h3 className="text-xl font-semibold text-slate-900">Tin cổ đông</h3>
                <div className="mt-5 space-y-4">
                  {investorNews.map((item) => (
                    <a key={item.title} href={item.link} className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-cyan-300 hover:shadow-sm">
                      <p className="text-sm text-slate-500">{item.date}</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{item.title}</p>
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900">Dành cho cổ đông</h3>
                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                  {investorResources.map((resource) => (
                    <li key={resource} className="flex items-center gap-2">
                      <span className="text-cyan-700">→</span>
                      <span>{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-900 p-6 text-slate-100">
                <h3 className="text-xl font-semibold text-white">Cổ phiếu PVS</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  PTSC là doanh nghiệp niêm yết trên thị trường chứng khoán Việt Nam, tiếp tục nâng cao tính minh bạch và hiệu quả vận hành.
                </p>
                <div className="mt-6 rounded-xl border border-white/10 bg-white/10 p-4 text-sm">
                  <p className="font-semibold text-white">Mã cổ phiếu: PVS</p>
                  <p className="mt-2 text-slate-300">Thông tin cập nhật và các báo cáo định kỳ được công bố thường xuyên.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
                  TIN TỨC - SỰ KIỆN
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                  Cập nhật nhanh về hoạt động, dự án và phát triển bền vững
                </h2>
              </div>
              <a href="/tin-tuc" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
                Xem tất cả tin tức →
              </a>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                  Chuyên mục
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Tất cả', 'Tin PTSC', 'Tin dầu khí'].map((tab) => (
                    <span key={tab} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600">
                      {tab}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-7 text-slate-600">
                  PTSC luôn cập nhật những thành tựu mới, các sự kiện quan trọng và các sáng kiến phát triển bền vững trong và ngoài nước.
                </p>
              </div>
              <div className="grid gap-4">
                {newsroomItems.map((item) => (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{item.category}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-7 text-slate-900">{item.title}</h3>
                    <p className="mt-4 text-sm text-slate-500">{item.date}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </PtscShell>
  );
}
