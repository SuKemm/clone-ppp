import { PtscShell } from "@/components/ptsc-shell";

const shareholders = [
  {
    title: "Annual Reports",
    description: "Detailed financial reports and governance disclosures for shareholders.",
  },
  {
    title: "Corporate Governance",
    description: "Information on our board, committees, and shareholder rights.",
  },
  {
    title: "Investor News",
    description: "Latest announcements and updates relevant to investors and stakeholders.",
  },
];

export default function ShareholdersPage() {
  return (
    <PtscShell
      title="Shareholders"
      description="Information for investors, corporate governance, and shareholder services."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {shareholders.map((item) => (
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
