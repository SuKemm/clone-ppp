import { PtscShell } from "@/components/ptsc-shell";

const news = [
  {
    date: "24/06/2026",
    title: "PTSC tổ chức thành công Lễ Đặt tên và Bàn giao FSO PTSC Lạc Đà Vàng, sẵn sàng cho mục tiêu First Oil của mỏ Lạc Đà Vàng",
    category: "Sản xuất - Kinh doanh",
  },
  {
    date: "20/06/2026",
    title: "Chủ động quản trị rủi ro, giữ vững tiến độ Dự án Khí Lô B – Gói EPCI#1",
    category: "Sản xuất - Kinh doanh",
  },
  {
    date: "18/06/2026",
    title: "ĐHĐCĐ PTSC 2026: PTSC khẳng định vị thế sau năm kinh doanh kỷ lục, hướng tới mục tiêu nâng cao năng lực cạnh tranh trong khu vực",
    category: "Sản xuất - Kinh doanh",
  },
  {
    date: "12/06/2026",
    title: "PVFCCo - Phú Mỹ và PTSC ký kết Thỏa thuận Hợp tác, tăng cường liên kết trong hệ sinh thái Petrovietnam",
    category: "Sản xuất - Kinh doanh",
  },
];

export default function NewsPage() {
  return (
    <PtscShell
      title="Tin tức"
      description="Cập nhật các hoạt động, dự án mới và thông tin phát triển bền vững của PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="space-y-6">
          {news.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{item.category}</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-4 text-sm text-slate-500">{item.date}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
