import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";

// English counterpart of src/app/trang-noi-bo/page.tsx — keep both lists in
// sync when adding a new internal page.
const internalPages = [
  { href: "/en-US/internal-pages/speedmaint", label: "Speedmaint" },
  { href: "/en-US/internal-pages/internal-email", label: "Internal Email" },
  { href: "/en-US/internal-pages/monitoring-station", label: "Monitoring Station" },
  { href: "/en-US/internal-pages/reservoir", label: "Reservoir" },
  { href: "/en-US/internal-pages/e-learning", label: "E-Learning & Online Tests" },
];

export default function InternalPagesIndexEn() {
  return (
    <PtscShell
      title="Internal Pages"
      description="Internal systems and pages for the company's staff."
    >
      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Link href="/en-US" className="transition hover:text-cyan-700">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-600">Internal Pages</span>
        </nav>

        <h1 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
          Internal Pages
        </h1>

        <ul className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {internalPages.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#089F50]"
              >
                {item.label}
                <span aria-hidden="true">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PtscShell>
  );
}
