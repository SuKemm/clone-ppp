import { PtscShell } from "@/components/ptsc-shell";

export default function AboutUsPage() {
  return (
    <PtscShell
      title="About PTSC"
      description="PetroVietnam Technical Services Corporation (PTSC) is a leading provider of technical services for oil and gas, industrial, and offshore renewable energy projects."
    >
      <section className="border-b border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <a href="/" className="transition hover:text-cyan-700">Home</a>
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-slate-900">About</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-slate-900">Corporate Overview</h2>
            <p className="text-slate-600">
              PetroVietnam Technical Services Corporation (PTSC) is a member of the PetroVietnam Group.
              Founded in 1976, PTSC has grown into a leading provider of technical services for the oil and gas,
              industrial, and offshore renewable energy sectors in Vietnam and the region.
            </p>
            <p className="text-slate-600">
              PTSC offers a wide range of high-quality, strategic services including offshore EPCI, onshore EPC,
              FSO/FPSO operations, marine transportation, geological survey, offshore construction, port services,
              skilled workforce provision, and renewable energy project support.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "50", caption: "Years of operation" },
              { label: "14.890", caption: "Equity (billion VND)" },
              { label: "34.074", caption: "Total assets (billion VND)" },
              { label: "10.000", caption: "Employees" },
            ].map((item) => (
              <div key={item.caption} className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-3xl font-semibold text-slate-900">{item.label}</p>
                <p className="mt-2 text-sm text-slate-500">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-3xl font-semibold text-slate-900">Vision - Mission</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">PTSC Vision</h3>
            <p className="mt-4 text-slate-600">
              Become a global brand in the energy sector, with a focus on offshore oil and gas technical services and renewable energy.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">PTSC Mission</h3>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• Deliver comprehensive, optimized solutions that bring superior value.</li>
              <li>• Promote PTSC’s distinct corporate culture and inspire the potential of employees.</li>
              <li>• Drive the energy transition and contribute to sustainable social development.</li>
              <li>• Strengthen PVN’s value chain, improve business efficiency, and enhance national competitiveness.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">History & Development</h2>
            <p className="mt-3 text-slate-600">
              Key milestones marking PTSC’s development over five decades.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              year: "1976",
              summary:
                "Government approval for the Vung Tau oilfield service base, laying the foundation for the company’s establishment.",
            },
            {
              year: "1986",
              summary:
                "PTSC was established as PSC, expanding into specialized oil and gas services.",
            },
            {
              year: "1993",
              summary:
                "PSC and GPTS merged to form PTSC, the country’s leading technical service provider for offshore operations.",
            },
          ].map((item) => (
            <article key={item.year} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xl font-semibold text-cyan-700">{item.year}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
