import { NextResponse } from "next/server";
import { getCollection } from "@/lib/cms/store";

// API công khai (không cần đăng nhập) để header (PtscShell) lấy khẩu hiệu
// đang được nhập ở /admin -> mục "Khẩu hiệu (thanh trên cùng, mọi trang)".
// Luôn đọc mới nhất, không cache trang static, để admin sửa xong là hiện
// ngay trên web (giống MarqueeBar / /api/marquee).
export const dynamic = "force-dynamic";

export async function GET() {
  const items = getCollection("site-slogan");
  // Chỉ dùng bản ghi ĐẦU TIÊN — đây là collection "singleton" (xem ghi chú
  // trong schema.ts), lỡ admin thêm nhầm nhiều bản ghi thì vẫn chỉ có 1
  // khẩu hiệu duy nhất hiển thị ngoài trang public.
  const item = items[0] ?? null;
  return NextResponse.json({
    text: item?.text ?? "",
    text_en: item?.text_en ?? "",
  });
}
