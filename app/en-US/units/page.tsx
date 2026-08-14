import { PtscShell } from "@/components/ptsc-shell";

const units = [
  {
    title: "Offshore Services",
    description: "Specialized units providing offshore installation, maintenance and logistics services.",
  },
  {
    title: "Marine Operations",
    description: "Vessels and marine support operations serving the oil and gas industry.",
  },
  {
    title: "Industrial Solutions",
    description: "In-house teams delivering EPC and technical services for industrial projects.",
  },
];

export default function UnitsPage() {
  return (
    <PtscShell
      title="Units"
      description="Discover the PTSC units that deliver our operational and service excellence."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {units.map((unit) => (
            <article key={unit.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">{unit.title}</h2>
              <p className="mt-4 text-slate-600">{unit.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
