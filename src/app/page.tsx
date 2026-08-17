import Link from "next/link";
import { FileText, Users2, BarChart3, Play } from "lucide-react";
import { PtscShell } from "@/components/ptsc-shell";
import { MarqueeBar } from "@/components/MarqueeBar";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin (sản lượng, mực nước, dòng chữ chạy)

const heroSlides = [
  {
    title: "Tổng thầu các dự án dầu khí và Năng lượng tái tạo ngoài khơi",
    // Ảnh panorama toàn cảnh nhà máy — đặt file tại
    // public/images/ptsc/banner-panorama.jpg (đã đổi tên từ
    // "Untitled_Panorama-00.jpg" cho gọn, không dấu/khoảng trắng).
    image: "/images/ptsc/banner-panorama.jpg",
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

// Logo cổ đông / nhà đầu tư đã chuyển xuống chân trang — xem
// src/components/ptsc-shell.tsx. Vị trí cũ ngay dưới banner giờ là
// <MarqueeBar /> (dòng chữ chạy, sửa được ở /admin -> "Dòng chữ chạy").

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

// Sản lượng & mực nước hiện tại được lấy từ /admin -> "Tình hình sản xuất &
// Mực nước" (xem src/lib/cms/schema.ts, id "production-info"), không còn
// hardcode ở đây nữa — xem hàm Home() bên dưới.


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
  const productionInfo = getCollection("production-info")[0];

  const productionStatus: [string, string, string][] = [
    [productionInfo?.san_luong_ngay ?? "", "Sản lượng", productionInfo?.san_luong_ngay_ky ?? ""],
    [productionInfo?.san_luong_thang ?? "", "Sản lượng", productionInfo?.san_luong_thang_ky ?? ""],
    [productionInfo?.san_luong_quy ?? "", "Sản lượng", productionInfo?.san_luong_quy_ky ?? ""],
    [productionInfo?.san_luong_nam ?? "", "Sản lượng", productionInfo?.san_luong_nam_ky ?? ""],
  ];

  const waterLevels = [
    { label: "Mực nước hồ hiện tại", value: productionInfo?.muc_nuoc_ho ?? "", unit: "m" },
    { label: "Lưu lượng về hồ", value: productionInfo?.luu_luong_ve_ho ?? "", unit: "m³/s" },
    {
      label: "Lưu lượng phát điện trung bình ngày",
      value: productionInfo?.luu_luong_phat_dien ?? "",
      unit: "m³/s",
    },
  ];

  return (
    <PtscShell>
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src={heroSlides[0].image}
          alt={heroSlides[0].title}
          className="h-[620px] w-full object-cover"
        />
      </section>

      {/* ===== Dòng chữ chạy (thay cho khối logo cổ đông cũ) ===== */}
      <MarqueeBar isEnglish={false} />

     {/* News */}
<section id="news" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
  <div className="flex flex-col items-center text-center">
    <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900 md:text-3xl">
      TIN TỨC VÀ SỰ KIỆN
    </h2>

    <a
      href="/tin-tuc"
      className="mt-3 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800"
    >
      Xem thêm →
    </a>
  </div>

  <div className="mt-10 grid gap-6 lg:grid-cols-3">
    {news.map((item) => (
      <a
        key={item.title}
        href={item.link}
        className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        {/* Đã bỏ CẬP NHẬT */}

        <h3 className="text-lg font-semibold leading-7 text-slate-900">
          {item.title}
        </h3>

        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
          <span>{item.date}</span>
          <span className="text-cyan-700 transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </a>
    ))}
  </div>
</section>


{/* Production */}
<section id="news" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
  <div className="flex flex-col items-center text-center">
    <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900 md:text-3xl">
      Thông tin sản xuất
    </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Bên trái: 4 thẻ sản lượng, xếp 2x2 */}
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
              {productionStatus.map(([value, label, period], index) => (
                <div
                  key={`${period}-${index}`}
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

            {/* Bên phải: Mực nước hiện tại */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-center text-3xl font-bold text-cyan-700">
                Mực nước hiện tại
              </h3>
              <div className="mt-6 space-y-5">
                {waterLevels.map((row) => (
                  <div key={row.label} className="flex items-end gap-2 text-sm text-slate-600">
                    <span className="shrink-0">{row.label}</span>
                    <span className="mb-1 flex-1 border-b border-dotted border-slate-300" />
                    <span className="shrink-0 font-bold text-cyan-700">
                      {row.value} {row.unit}
                    </span>
                  </div>
                ))}
              </div>
              {productionInfo?.ngay_cap_nhat && (
                <p className="mt-8 text-right text-xs text-slate-400">
                  Cập nhật ngày: {productionInfo.ngay_cap_nhat}
                </p>
              )}
            </div>
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
