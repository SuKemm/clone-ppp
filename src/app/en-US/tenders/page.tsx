import { PtscShell } from "@/components/ptsc-shell";
import type { Metadata } from "next";

// Ghi đè metadata tiếng Việt mặc định ở layout gốc.
export const metadata: Metadata = {
  title: "Tenders",
  description: "Tender information and cooperation opportunities with PTSC.",
};

export default function TendersPageEn() {
  return (
    <PtscShell
      title="Tenders"
      description="Tender information and cooperation opportunities with PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">Tenders</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            PTSC provides information on open tender packages, cooperation criteria, and a transparent,
            public tendering process.
          </p>
          <ul className="mt-6 space-y-3 text-slate-600">
            <li>• Oil and gas project tender packages</li>
            <li>• Industrial project tender packages</li>
            <li>• Vessel and port service tender packages</li>
            <li>• Cooperation criteria and contractor registration</li>
          </ul>
        </div>
      </section>
    </PtscShell>
  );
}
