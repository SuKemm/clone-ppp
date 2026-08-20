import { NextRequest, NextResponse } from "next/server";
import { createItem } from "@/lib/cms/store";

// Endpoint CÔNG KHAI (không yêu cầu đăng nhập) — nhận dữ liệu từ form
// "Liên hệ" ở trang chủ (src/app/lien-he/page.tsx) và lưu thành 1 bản ghi
// trong collection "contacts". Admin xem/duyệt/xoá các bản ghi này tại
// /admin → "Khách hàng liên hệ" (xem src/lib/cms/schema.ts).
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email) {
    return NextResponse.json({ error: "Thiếu họ tên hoặc email" }, { status: 400 });
  }

  const now = new Date();
  const createdAt = now.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const item = createItem("contacts", {
    name,
    email,
    phone,
    // Ghép "Tiêu đề" (nếu người dùng có nhập) vào đầu nội dung, vì collection
    // "contacts" không có field "subject" riêng — giữ đúng những gì họ gõ.
    message: subject ? `[${subject}] ${message}` : message,
    status: "Chưa duyệt",
    createdAt,
  });

  return NextResponse.json({ item }, { status: 201 });
}
