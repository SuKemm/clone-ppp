import { PtscShell } from "@/components/ptsc-shell";

export default function ShareholdersPage() {
  return (
    <PtscShell
      title="Cổ đông"
      description="Thông tin dành cho cổ đông và các tài liệu quản trị quan trọng của PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">Thông tin cổ đông</h2>
            <p className="text-lg leading-8 text-slate-600">
              PTSC luôn cung cấp thông tin minh bạch và cập nhật cho cổ đông về kết quả hoạt động kinh doanh, quy trình quản trị và các quyết định quan trọng.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li>• Báo cáo thường niên</li>
              <li>• Báo cáo tài chính</li>
              <li>• Thông tin họp Đại hội đồng cổ đông</li>
              <li>• Nghị quyết và biên bản họp</li>
            </ul>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">Liên kết cổ đông</h3>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• Tin cổ đông</li>
              <li>• Tài liệu quản trị</li>
              <li>• Báo cáo phát triển bền vững</li>
              <li>• Cập nhật thông tin niêm yết</li>
            </ul>
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
