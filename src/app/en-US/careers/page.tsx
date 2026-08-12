import { PtscShell } from "@/components/ptsc-shell";

const opportunities = [
  {
    title: "Engineering",
    description: "Join teams delivering offshore, industrial, and renewable energy projects.",
  },
  {
    title: "Operations",
    description: "Support vessel operations, maintenance, and project logistics.",
  },
  {
    title: "Corporate Support",
    description: "Roles in project management, HSEQ, finance, and administration.",
  },
];

export default function CareersPage() {
  return (
    <PtscShell
      title="Careers"
      description="Build your career with PTSC and contribute to Vietnam’s energy development."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {opportunities.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-4 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
