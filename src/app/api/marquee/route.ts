import { NextResponse } from "next/server";
import { getCollection } from "@/lib/cms/store";

// API công khai (không cần đăng nhập) để trang chủ lấy nội dung "dòng chữ
// chạy" đang được nhập ở /admin -> mục "Dòng chữ chạy (trang chủ)".
// Luôn đọc mới nhất, không cache trang static, để admin sửa xong là hiện
// ngay trên web (giống các mục Tin tức, Dự án...).
export const dynamic = "force-dynamic";

export async function GET() {
  const items = getCollection("site-marquee");
  return NextResponse.json({ items });
}
