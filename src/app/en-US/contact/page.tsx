import { PtscShell } from "@/components/ptsc-shell";

export default function ContactPage() {
  return (
    <PtscShell
      title="Contact"
      description="Contact information and communication channels with PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              PetroVietnam Tower, 1 Le Duan Street, Saigon Ward, Ho Chi Minh City, Vietnam
            </p>
            <p className="mt-4 text-lg text-slate-600">T: (+84) 28 3910 2828</p>
            <p className="text-lg text-slate-600">F: (+84) 28 3910 2929</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Communication Channels</h2>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• PTSC introduction video</li>
              <li>• Brochures and corporate documents</li>
              <li>• Internal management system</li>
              <li>• HSEQ and sustainability reports</li>
            </ul>
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
