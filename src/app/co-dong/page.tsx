import { PtscShell } from "@/components/ptsc-shell";
import { ShareholderRelations, type SrTab } from "@/components/shareholder-relations";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

export default async function ShareholdersPage() {
  const categories = getCollection("shareholder-categories");
  const items = getCollection("shareholder-relations");

  // Mỗi danh mục (Admin > Danh mục Quan hệ cổ đông) trở thành 1 tab; các mục
  // (Admin > Danh sách Quan hệ cổ đông) được nhóm vào đúng tab theo trường
  // "category". Nếu chưa có danh mục nào trong Admin, fallback về không hiển
  // thị tab nào để tránh trang lỗi.
  const tabs: SrTab[] =
    categories.length > 0
      ? categories.map((cat) => ({
          key: cat.id,
          label: cat.name,
          articles: items
            .filter((item) => item.category === cat.name)
            .map((item) => ({
              id: item.id,
              image: item.image || "/images/ptsc/logo-ptsc.png",
              category: item.category,
              date: item.date || "cập nhật gần nhất",
              title: item.title,
              excerpt: item.excerpt,
              attachment: item.attachment || undefined,
            })),
        }))
      : [];

  const sidebarItems = items.slice(0, 4).map((item) => ({
    image: item.image || "/images/ptsc/logo-ptsc.png",
    title: item.title,
  }));

  if (tabs.length === 0) {
    return (
      <PtscShell>
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900">
            Quan hệ cổ đông
          </h1>
          <p className="mt-6 text-slate-500">
            Chưa có nội dung. Vào trang quản trị (/admin) để thêm Danh mục và Danh sách Quan hệ cổ
            đông.
          </p>
        </section>
      </PtscShell>
    );
  }

  return (
    <PtscShell>
      <ShareholderRelations
        tabs={tabs}
        sidebarTitle="Xem nhiều nhất"
        sidebarItems={sidebarItems}
      />
    </PtscShell>
  );
}
