import { PtscShell } from "@/components/ptsc-shell";

const services = [
  {
    title: "Mechanical Engineering",
    description: "Providing design, procurement, fabrication, installation, hook-up and commissioning services for offshore facilities.",
  },
  {
    title: "FSO/FPSO",
    description: "Managing, operating, and maintaining FSO/FPSO systems domestically and internationally.",
  },
  {
    title: "Offshore Construction",
    description: "Offering transportation, installation, operation and maintenance services for offshore structures.",
  },
  {
    title: "Port Services",
    description: "Operating port facilities across Vietnam to support oil and gas logistics and marine operations.",
  },
  {
    title: "Marine Services",
    description: "Operating a specialized fleet for offshore oil and gas support and marine logistics.",
  },
  {
    title: "Geological Survey",
    description: "Providing seismic, geological, and ROV-based underground structure inspection and repair.",
  },
];

export default function ServicesPage() {
  return (
    <PtscShell
      title="Services"
      description="PTSC delivers comprehensive technical services for oil and gas, industrial, and renewable energy sectors."
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
