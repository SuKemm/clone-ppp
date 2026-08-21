import { PtscShell } from "@/components/ptsc-shell";
import { ShareholderRelations, type SrTab } from "@/components/shareholder-relations";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Đồng bộ nội dung với trang tiếng Việt (src/app/co-dong/page.tsx) — cùng
// đọc từ "shareholder-categories" + "shareholder-relations", chỉ khác lấy
// các field "_en" (name_en, title_en, excerpt_en).

export default function ShareholdersPageEn() {
  const categories = getCollection("shareholder-categories");
  const items = getCollection("shareholder-relations");

  const tabs: SrTab[] =
    categories.length > 0
      ? categories.map((cat) => ({
          key: cat.id,
          label: cat.name_en || cat.name,
          articles: items
            .filter((item) => item.category === cat.name)
            .map((item) => ({
              id: item.id,
              image: item.image || "/images/ptsc/logo-ptsc.png",
              category: cat.name_en || cat.name,
              date: item.date || "latest update",
              title: item.title_en || item.title,
              excerpt: item.excerpt_en || item.excerpt,
            })),
        }))
      : [];

  const sidebarItems = items.slice(0, 4).map((item) => ({
    image: item.image || "/images/ptsc/logo-ptsc.png",
    title: item.title_en || item.title,
  }));

  if (tabs.length === 0) {
    return (
      <PtscShell>
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900">
            Shareholder Relations
          </h1>
          <p className="mt-6 text-slate-500">
            No content yet. Go to the admin panel (/admin) to add Shareholder Relations
            categories and documents.
          </p>
        </section>
      </PtscShell>
    );
  }

  return (
    <PtscShell>
      <ShareholderRelations
        tabs={tabs}
        sidebarTitle="Most Viewed"
        sidebarItems={sidebarItems}
        isEnglish
      />
    </PtscShell>
  );
}
