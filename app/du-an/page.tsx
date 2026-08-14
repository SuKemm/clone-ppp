import { PtscShell } from "@/components/ptsc-shell";

const projects = [
  {
    title: "Dự án Gallaf 1",
    category: "Dự án dầu khí",
    description: "Thiết kế, mua sắm, thi công, vận hành và chạy thử 03 giàn đầu giếng và 01 cầu dẫn.",
  },
  {
    title: "Tổ hợp Hóa dầu miền Nam",
    category: "Dự án công nghiệp",
    description: "Triển khai gói A1 nhà máy Olefins với quy mô kỹ thuật và năng lực thi công cao.",
  },
  {
    title: "Kho cảng LNG Thị Vải",
    category: "Dự án công nghiệp",
    description: "Xây dựng trạm tiếp nhận và trữ khí LNG, đáp ứng nhu cầu vận hành an toàn, hiệu quả.",
  },
  {
    title: "Dự án Biển Đông 01",
    category: "Dự án dầu khí",
    description: "Thiết kế, mua sắm, thi công, vận hành và chạy thử giàn xử lý trung tâm Hải Thạch và giàn đầu giếng HT1 & MT1.",
  },
];

export default function ProjectsPage() {
  return (
    <PtscShell
      title="Dự án"
      description="Các dự án của PTSC là minh chứng cho năng lực kỹ thuật, quản lý vận hành và chất lượng công trình quốc tế."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{project.category}</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">{project.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
