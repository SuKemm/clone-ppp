import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

export default function ProjectsPage() {
  const projects = getCollection("projects");

  return (
    <PtscShell
      title="Dự án"
      description="Các dự án của PTSC là minh chứng cho năng lực kỹ thuật, quản lý vận hành và chất lượng công trình quốc tế."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              {project.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt="" className="mb-6 h-48 w-full rounded-2xl object-cover" />
              )}
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{project.category}</p>
              <h2 className="mt-4 break-words text-2xl font-semibold text-slate-900">{project.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
