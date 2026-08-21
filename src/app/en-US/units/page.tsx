import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Đồng bộ nội dung với trang tiếng Việt (src/app/don-vi/page.tsx) — cùng đọc
// từ collection "units-page", chỉ khác lấy các field "_en".

export default function UnitsPageEn() {
  const content = getCollection("units-page")[0];
  const listItems = (content?.list_items_en || content?.list_items || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <PtscShell
      title="Corporate Information"
      description="Member units and departments of Dakdrinh Hydropower Joint Stock Company."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              {content?.intro_title_en || content?.intro_title || "Member Units"}
            </h2>
            {(content?.intro_content_en || content?.intro_content) && (
              <div
                className="prose prose-slate mt-4 max-w-none text-lg leading-8 text-slate-600 prose-p:my-4"
                dangerouslySetInnerHTML={{
                  __html: content?.intro_content_en || content?.intro_content || "",
                }}
              />
            )}
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">
              {content?.list_title_en || content?.list_title || "Units / Departments"}
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
