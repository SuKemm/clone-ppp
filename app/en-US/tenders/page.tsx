import { PtscShell } from "@/components/ptsc-shell";

const tenders = [
  {
    title: "Offshore Engineering Contracts",
    description: "Procurement and contracting opportunities for offshore EPC and installation work.",
  },
  {
    title: "Marine Service Packages",
    description: "Tenders for marine logistics, vessel support, and offshore transport.",
  },
  {
    title: "Industrial Construction",
    description: "Open tenders for onshore industrial and renewable energy project execution.",
  },
];

export default function TendersPage() {
  return (
    <PtscShell
      title="Tenders"
      description="Current tender opportunities for technical services and construction projects."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {tenders.map((item) => (
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
