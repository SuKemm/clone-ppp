import { PtscShell } from "@/components/ptsc-shell";

// Đồng bộ nội dung với trang tiếng Việt (src/app/don-vi/page.tsx).

export default function UnitsPage() {
  return (
    <PtscShell
      title="Corporate Information"
      description="Member units, port bases and the specialized fleet of PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">Member Units</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              PTSC comprises numerous member units operating in port services, marine services, oil &amp; gas mechanical engineering, and specialized technical services.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">Port Services System</h3>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• PTSC Dinh Vu Port</li>
              <li>• Nghi Son Port</li>
              <li>• Hon La Port</li>
              <li>• Dung Quat Port</li>
            </ul>
          </article>
        </div>
      </section>
    </PtscShell>
  );
}
