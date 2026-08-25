import type { MetadataRoute } from "next";
import { getCollection } from "@/lib/cms/store";

// Next.js tự nhận file này và serve tại /sitemap.xml (quy ước "Metadata
// Files" của App Router — không cần route.ts thủ công).
//
// Liệt kê đầy đủ: (1) các trang tĩnh — cả bản tiếng Việt lẫn tiếng Anh, và
// (2) từng bài viết động (Tin tức, Đấu thầu, Quan hệ cổ đông) lấy trực
// tiếp từ dữ liệu admin, để Google/Bing tìm và index bài mới nhanh hơn
// thay vì phải tự dò qua link nội bộ.
export const dynamic = "force-dynamic"; // luôn liệt kê đúng danh sách bài viết mới nhất từ admin

// Chuyển "dd/mm/yyyy" hoặc "dd.mm.yyyy" (định dạng admin nhập) thành đối
// tượng Date cho trường lastModified — dùng chung logic với các trang
// list/detail khác trong dự án (vd src/app/tin-tuc/page.tsx).
function parseAdminDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const m = value.trim().match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (!m) return undefined;
  const [, d, mo, y] = m;
  const date = new Date(Number(y), Number(mo) - 1, Number(d));
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// Các trang tĩnh (không phải trang chi tiết theo id) — mỗi trang tiếng Việt
// đi kèm 1 dòng ghi chú đường dẫn tiếng Anh tương ứng ngay bên cạnh, để dễ
// đối chiếu và không bị quên khi có trang mới.
const STATIC_PATHS: { vi: string; en: string; priority: number }[] = [
  { vi: "/", en: "/en-US", priority: 1 },
  { vi: "/gioi-thieu", en: "/en-US/about-us", priority: 0.8 },
  { vi: "/gioi-thieu/ban-lanh-dao", en: "/en-US/about-us/leadership", priority: 0.6 },
  { vi: "/co-dong", en: "/en-US/shareholders", priority: 0.8 },
  { vi: "/dau-thau", en: "/en-US/tenders", priority: 0.8 },
  { vi: "/dich-vu", en: "/en-US/services", priority: 0.7 },
  { vi: "/don-vi", en: "/en-US/units", priority: 0.6 },
  { vi: "/du-an", en: "/en-US/projects", priority: 0.7 },
  { vi: "/lien-he", en: "/en-US/contact", priority: 0.5 },
  { vi: "/so-tay-van-hoa", en: "/en-US/culture-handbook", priority: 0.4 },
  { vi: "/tin-tuc", en: "/en-US/news", priority: 0.9 },
  { vi: "/tuyen-dung", en: "/en-US/careers", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dakdrinh.vn";
  const url = (path: string) => `${siteUrl}${path}`;

  const entries: MetadataRoute.Sitemap = [];

  for (const { vi, en, priority } of STATIC_PATHS) {
    entries.push({ url: url(vi), priority, changeFrequency: "weekly" });
    entries.push({ url: url(en), priority, changeFrequency: "weekly" });
  }

  // Tin tức — /tin-tuc/{id} (VN) + /en-US/news/{id} (EN)
  for (const item of getCollection("news")) {
    const lastModified = parseAdminDate(item.date);
    entries.push({ url: url(`/tin-tuc/${item.id}`), lastModified, changeFrequency: "monthly", priority: 0.7 });
    entries.push({ url: url(`/en-US/news/${item.id}`), lastModified, changeFrequency: "monthly", priority: 0.7 });
  }

  // Đấu thầu — /dau-thau/{id} (VN) + /en-US/tenders/{id} (EN)
  for (const item of getCollection("tenders")) {
    const lastModified = parseAdminDate(item.date);
    entries.push({ url: url(`/dau-thau/${item.id}`), lastModified, changeFrequency: "monthly", priority: 0.7 });
    entries.push({ url: url(`/en-US/tenders/${item.id}`), lastModified, changeFrequency: "monthly", priority: 0.7 });
  }

  // Quan hệ cổ đông — /co-dong/{id} (VN) + /en-US/shareholders/{id} (EN)
  for (const item of getCollection("shareholder-relations")) {
    const lastModified = parseAdminDate(item.date);
    entries.push({ url: url(`/co-dong/${item.id}`), lastModified, changeFrequency: "monthly", priority: 0.6 });
    entries.push({ url: url(`/en-US/shareholders/${item.id}`), lastModified, changeFrequency: "monthly", priority: 0.6 });
  }

  return entries;
}
