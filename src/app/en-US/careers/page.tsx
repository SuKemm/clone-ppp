import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import type { Metadata } from "next";

// Đọc cùng dữ liệu với trang tiếng Việt (/tuyen-dung) để hai ngôn ngữ luôn
// đồng bộ — không còn mảng viết cứng riêng cho tiếng Anh. Field "<key>_en"
// (nhập ở /admin) được ưu tiên hiển thị; nếu vị trí chưa có bản dịch, tạm
// hiển thị bản tiếng Việt để trang không bị trống.
export const dynamic = "force-dynamic";

// Ghi đè metadata tiếng Việt mặc định ở layout gốc.
export const metadata: Metadata = {
  title: "Careers",
  description: "Career opportunities at PTSC.",
};

export default function CareersPageEn() {
  const jobs = getCollection("jobs");

  return (
    <PtscShell
      title="Careers"
      description="Career opportunities at PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">Careers</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            PTSC is looking for passionate, team-spirited candidates who want to grow their careers in the oil &amp; gas, industrial, and renewable energy sectors.
          </p>

          <div className="mt-8 space-y-4">
            {jobs.map((job) => {
              const title = job.title_en || job.title;
              const location = job.location_en || job.location;
              const description = job.description_en || job.description;
              return (
                <div key={job.id} className="rounded-xl border border-slate-200 p-5">
                  <p className="text-lg font-semibold text-slate-900">{title}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {[location, job.deadline && `Deadline: ${job.deadline}`].filter(Boolean).join(" • ")}
                  </p>
                  {description && <p className="mt-2 text-slate-600">{description}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PtscShell>
  );
}
