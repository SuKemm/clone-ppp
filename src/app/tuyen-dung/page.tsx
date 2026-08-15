import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

export default function CareersPage() {
  const jobs = getCollection("jobs");

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

          <div className="mt-8 space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-xl border border-slate-200 p-5">
                <p className="text-lg font-semibold text-slate-900">{job.title}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {[job.location, job.deadline && `Hạn nộp: ${job.deadline}`].filter(Boolean).join(" • ")}
                </p>
                {job.description && <p className="mt-2 text-slate-600">{job.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
