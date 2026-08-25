import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

export default function UnitsPage() {
  const content = getCollection("units-page")[0];
  const listItems = (content?.list_items ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <PtscShell
      title="Đơn vị"
      description="Các đơn vị, phòng ban trực thuộc Công ty Cổ phần Thủy điện Đakđrinh."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="break-words text-3xl font-semibold text-slate-900">
              {content?.intro_title ?? "Đơn vị thành viên"}
            </h2>
            {content?.intro_content && (
              <div
                className="prose prose-slate mt-4 max-w-none text-lg leading-8 text-slate-600 prose-p:my-4"
                dangerouslySetInnerHTML={{ __html: content.intro_content }}
              />
            )}
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="break-words text-2xl font-semibold text-slate-900">
              {content?.list_title ?? "Danh sách đơn vị"}
            </h3>
            <ul className="mt-6 space-y-3 text-slate-600">
              {listItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </PtscShell>
  );
}
