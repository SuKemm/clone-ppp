import { PtscShell } from "@/components/ptsc-shell";

const news = [
  {
    date: "24/06/2026",
    title: "PTSC successfully held the naming and handover ceremony for FSO PTSC Lac Da Vang, ready for First Oil at Lac Da Vang field.",
    category: "Production & Business",
  },
  {
    date: "20/06/2026",
    title: "Proactively manage risks to maintain progress on the Lo B Gas Project – EPCI#1 package.",
    category: "Production & Business",
  },
  {
    date: "18/06/2026",
    title: "PTSC confirms its position after a record year and aims to strengthen regional competitiveness.",
    category: "Production & Business",
  },
];

export default function NewsPage() {
  return (
    <PtscShell
      title="News"
      description="Latest news and updates from PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{item.category}</p>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-4 text-sm text-slate-500">{item.date}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
