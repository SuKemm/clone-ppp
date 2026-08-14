import Link from "next/link";
import { FileText, Users2, BarChart3, Play } from "lucide-react";
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
];

const productionStatus = [
  ["1.384,48", "Sản lượng", "Ngày 12/08"],
  ["12.296,65", "Sản lượng", "Tháng 08"],
  ["45.647,83", "Sản lượng", "Quý III"],
  ["220.125,45", "Sản lượng", "Năm 2026"],
];

const shareholderRelations = [
  {
    label: "Thông tin/Tài liệu cổ đông",
    icon: FileText,
    href: "/co-dong",
    tone: "bg-sky-500",
  },
  {
    label: "Đại hội cổ đông",
    icon: Users2,
    href: "/co-dong",
    tone: "bg-blue-700",
  },
  {
    label: "Báo cáo tài chính/Báo cáo thường niên",
    icon: BarChart3,
    href: "/co-dong",
    tone: "bg-slate-900",
  },
];

const photoGalleryTabs = [
  {
    label: "Hoạt động sản xuất kinh doanh",
    image: "/images/ptsc/service-fso.jpg",
  },
  {
    label: "Dịch vụ nhà máy điện",
    image: "/images/ptsc/service-co-khi.jpg",
  },
  {
    label: "Hoạt động đảng đoàn thể",
    image: "/images/ptsc/service-bien.jpg",
  },
];

const videoLibrary = [
  { title: "Sê San 3A - Kết nối niềm tin" },
  { title: "Sê San 3A tổng kết công tác năm 2023" },
  { title: "Sê San 3A - 20 năm \"Xây dựng và phát triển\"" },
  { title: "SESAN 3A - Connect" },
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
          {news.map((item) => (
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

      <section id="quan-he-co-dong" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-center gap-3 bg-slate-400/80 py-5">
            <BarChart3 className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold uppercase tracking-[0.15em] text-white">
              Quan hệ cổ đông
            </h2>
          </div>
          <div className="grid sm:grid-cols-3">
            {shareholderRelations.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex flex-col items-center justify-center gap-5 px-6 py-14 text-center transition hover:brightness-110 ${item.tone}`}
              >
                <item.icon className="h-14 w-14 text-white/90" strokeWidth={1.25} />
                <span className="text-base font-semibold uppercase tracking-wide text-white">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="thu-vien" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Thư viện ảnh</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {photoGalleryTabs.map((tab) => (
                  <div key={tab.label} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <img src={tab.image} alt={tab.label} className="h-36 w-full object-cover" />
                    <p className="p-3 text-center text-xs font-semibold uppercase leading-5 text-slate-700">
                      {tab.label}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="/dich-vu#thu-vien-anh"
                className="mt-6 inline-block rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                Xem tất cả
              </a>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Video tư liệu</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {videoLibrary.map((video) => (
                  <div
                    key={video.title}
                    className="group relative flex h-32 items-end overflow-hidden rounded-xl border border-slate-200 bg-slate-800"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-900/10" />
                    <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 transition group-hover:bg-white">
                      <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                    </span>
                    <p className="relative z-10 p-3 text-xs font-semibold leading-5 text-white">
                      {video.title}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="/tin-tuc"
                className="mt-6 inline-block rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                Xem tất cả
              </a>
            </div>
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
