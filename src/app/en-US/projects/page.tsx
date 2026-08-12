import { PtscShell } from "@/components/ptsc-shell";

const projects = [
  {
    title: "Gallaf 1 Project",
    category: "Oil & Gas",
    details: "Design, procurement, construction, operation and commissioning of 3 wellhead platforms and 1 bridge link.",
  },
  {
    title: "Southern Petrochemical Complex",
    category: "Industrial",
    details: "Implemented the A1 Olefins plant package with high technical and construction capacity.",
  },
  {
    title: "Thi Vai LNG Terminal",
    category: "Industrial",
    details: "Built LNG receiving and storage facilities to ensure safe and efficient operation.",
  },
  {
    title: "Bien Dong 01 Project",
    category: "Oil & Gas",
    details: "Designed, procured, constructed, operated and commissioned the Hai Thach central processing platform and HT1/MT1 wellhead platforms.",
  },
];

export default function ProjectsPage() {
  return (
    <PtscShell
      title="Projects"
      description="Highlights of PTSC’s major projects that shape Vietnam’s industrial landscape."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{project.category}</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">{project.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{project.details}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
