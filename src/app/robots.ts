import type { MetadataRoute } from "next";

// Next.js tự nhận file này và serve tại /robots.txt (quy ước "Metadata
// Files" của App Router — không cần route.ts thủ công).
//
// Chặn bot index nhầm khu vực quản trị (/admin) và các API nội bộ
// (/api/**) — những chỗ này không có nội dung để tìm kiếm, và không nên
// xuất hiện trong kết quả tìm kiếm vì lý do bảo mật/riêng tư (vd trang
// đăng nhập admin, hay các bản ghi "Khách hàng liên hệ").
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dakdrinh.vn";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
