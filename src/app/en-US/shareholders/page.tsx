import { PtscShell } from "@/components/ptsc-shell";
import { FloatingNav } from "@/components/FloatingNav";
import { ShareholderRelations, type SrTab } from "@/components/shareholder-relations";
import { getCollection } from "@/lib/cms/store";
import type { Metadata } from "next";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Đồng bộ nội dung với trang tiếng Việt (src/app/co-dong/page.tsx) — cùng
// đọc từ "shareholder-categories" + "shareholder-relations", chỉ khác lấy
// các field "_en" (name_en, title_en, excerpt_en).

// Ghi đè metadata tiếng Việt mặc định ở layout gốc.
export const metadata: Metadata = {
  title: "Shareholder Relations",
  description: "Shareholder information, general meetings, and financial/annual reports.",
};

function parseAlbumDate(value: string | undefined): number {
  if (!value) return -Infinity;
  const m = value.trim().match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (!m) return -Infinity;
  const [, d, mo, y] = m;
  const t = new Date(Number(y), Number(mo) - 1, Number(d)).getTime();
  return Number.isNaN(t) ? -Infinity : t;
}

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
              // Dùng ảnh riêng của bài — đồng bộ với trang tiếng Việt
              // (src/app/co-dong/page.tsx); nếu chưa có ảnh, component sẽ tự
              // dùng logo công ty làm ảnh dự phòng.
              image: item.image || "",
              category: cat.name_en || cat.name,
              date: item.date || "latest update",
              title: item.title_en || item.title,
              excerpt: item.excerpt_en || item.excerpt,
              attachment: item.attachment || undefined,
            })),
        }))
      : [];

  const sidebarItems = items.slice(0, 4).map((item) => ({
    id: item.id,
    image: item.image || "",
    title: item.title_en || item.title,
  }));

  const videoItems = [...getCollection("video-albums")]
    .sort((a, b) => parseAlbumDate(b.date) - parseAlbumDate(a.date))
    .slice(0, 2)
    .map((v) => ({ title: v.title_en || v.title, image: v.image || undefined }));

  if (tabs.length === 0) {
    return (
      <PtscShell>
        <FloatingNav isEnglish />
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
      <FloatingNav isEnglish />
      <ShareholderRelations
        tabs={tabs}
        pageTitle="Shareholder Relations"
        sidebarTitle="Most Viewed"
        sidebarItems={sidebarItems}
        videoSectionTitle="Featured Videos"
        videoItems={videoItems}
        videoLinkHref="/en-US/services#videos"
        isEnglish
        detailBasePath="/en-US/shareholders"
      />
    </PtscShell>
  );
}
