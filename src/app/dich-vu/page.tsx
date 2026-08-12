import { PtscShell } from "@/components/ptsc-shell";

const services = [
  {
    title: "Cơ khí dầu khí",
    description: "Cung cấp dịch vụ thiết kế, mua sắm, chế tạo, thi công, lắp đặt, đấu nối và chạy thử cho công trình ngoài khơi.",
  },
  {
    title: "Kho nổi chứa, xử lý và xuất dầu thô (FSO/FPSO)",
    description: "Quản lý, vận hành, khai thác và bảo dưỡng các hệ thống FSO/FPSO trong và ngoài nước.",
  },
  {
    title: "Vận chuyển, lắp đặt, vận hành và bảo dưỡng công trình biển",
    description: "Cung cấp dịch vụ vận chuyển, lắp đặt, đấu nối, vận hành và sửa chữa công trình biển.",
  },
  {
    title: "Căn cứ cảng dịch vụ",
    description: "Quản lý và khai thác hệ thống cảng dịch vụ trải dài từ Bắc vào Nam.",
  },
  {
    title: "Tàu dịch vụ dầu khí",
    description: "Sở hữu và khai thác đội tàu dịch vụ chuyên dụng phục vụ ngành dầu khí.",
  },
  {
    title: "Khảo sát địa chất và sửa chữa công trình ngầm",
    description: "Cung cấp dịch vụ khảo sát, kiểm tra và sửa chữa công trình ngầm bằng ROV.",
  },
];

export default function ServicesPage() {
  return (
    <PtscShell
      title="Dịch vụ"
      description="PTSC cung cấp các dịch vụ kỹ thuật toàn diện cho ngành dầu khí, công nghiệp và năng lượng tái tạo."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">{service.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
