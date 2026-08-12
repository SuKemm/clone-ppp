import { PtscShell } from "@/components/ptsc-shell";

export default function UnitsPage() {
  return (
    <PtscShell
      title="Đơn vị"
      description="Các đơn vị thành viên, căn cứ cảng và đội tàu chuyên dụng của PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">Đơn vị thành viên</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              PTSC bao gồm nhiều đơn vị thành viên hoạt động trong các lĩnh vực cảng dịch vụ, tàu dịch vụ, cơ khí dầu khí và dịch vụ kỹ thuật chuyên ngành.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">Hệ thống cảng dịch vụ</h3>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• Cảng PTSC Đình Vũ</li>
              <li>• Cảng Nghi Sơn</li>
              <li>• Cảng Hòn La</li>
              <li>• Cảng Dung Quất</li>
            </ul>
          </article>
        </div>
      </section>
    </PtscShell>
  );
}
