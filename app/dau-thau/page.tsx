import { PtscShell } from "@/components/ptsc-shell";

export default function TendersPage() {
  return (
    <PtscShell
      title="Đấu thầu"
      description="Thông tin về đấu thầu và cơ hội hợp tác cùng PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">Đấu thầu</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            PTSC cung cấp thông tin về các gói thầu đang mở, tiêu chí hợp tác và quy trình đấu thầu công khai minh bạch.
          </p>
          <ul className="mt-6 space-y-3 text-slate-600">
            <li>• Gói thầu dự án dầu khí</li>
            <li>• Gói thầu dự án công nghiệp</li>
            <li>• Gói thầu cung cấp dịch vụ tàu và cảng</li>
            <li>• Tiêu chí hợp tác và đăng ký nhà thầu</li>
          </ul>
        </div>
      </section>
    </PtscShell>
  );
}
