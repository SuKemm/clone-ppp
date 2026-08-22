import { notFound } from "next/navigation";

// Next.js chỉ dùng not-found.tsx lồng trong 1 thư mục khi route đó đã "khớp"
// được ít nhất tới thư mục đó (vd gọi notFound() bên trong 1 trang có thật,
// hoặc khớp 1 segment động). Với URL SAI HOÀN TOÀN không khớp route nào (vd
// /en-US/abc-khong-ton-tai), Next.js mặc định nhảy thẳng lên not-found.tsx ở
// GỐC (bản tiếng Việt) — bỏ qua nhánh /en-US.
//
// File catch-all này "hứng" mọi đường dẫn con của /en-US không khớp trang cụ
// thể nào khác, biến nó thành 1 route CÓ THẬT trong nhánh /en-US, rồi tự gọi
// notFound() — nhờ vậy Next.js mới dùng đúng src/app/en-US/not-found.tsx
// (bản 404 tiếng Anh) thay vì bản tiếng Việt ở gốc.
export default function CatchAllEn() {
  notFound();
}
