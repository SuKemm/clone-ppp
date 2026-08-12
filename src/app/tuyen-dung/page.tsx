import { PtscShell } from "@/components/ptsc-shell";

export default function CareersPage() {
  return (
    <PtscShell
      title="Tuyển dụng"
      description="Thông tin tuyển dụng và cơ hội nghề nghiệp tại PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">Tuyển dụng</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            PTSC tìm kiếm những ứng viên nhiệt huyết, có tinh thần đồng đội và mong muốn phát triển trong lĩnh vực dầu khí, công nghiệp và năng lượng tái tạo.
          </p>
          <ul className="mt-6 space-y-3 text-slate-600">
            <li>• Kỹ sư cơ khí dầu khí</li>
            <li>• Chuyên viên vận hành cảng</li>
            <li>• Nhân viên an toàn HSEQ</li>
            <li>• Chuyên viên quản lý dự án</li>
          </ul>
        </div>
      </section>
    </PtscShell>
  );
}
