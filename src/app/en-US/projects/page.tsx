import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

// Đồng bộ với trang tiếng Việt /du-an — không còn mảng viết cứng riêng.
export const dynamic = "force-dynamic";

export default function ProjectsPageEn() {
  const projects = getCollection("projects");

  return (
    <PtscShell
      title="Projects"
      description="Highlights of PTSC’s major projects that shape Vietnam’s industrial landscape."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => {
            const title = project.title_en || project.title;
            const category = project.category_en || project.category;
            const description = project.description_en || project.description;
            return (
              <article key={project.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                {project.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt="" className="mb-6 h-48 w-full rounded-2xl object-cover" />
                )}
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{category}</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </PtscShell>
  );
}
