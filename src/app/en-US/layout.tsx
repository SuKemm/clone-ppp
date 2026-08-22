import type { ReactNode } from "react";

// File này chỉ pass-through children, không thêm UI gì — mục đích DUY NHẤT là
// đánh dấu "/en-US" là 1 route segment riêng để Next.js biết dùng
// src/app/en-US/not-found.tsx (bản 404 tiếng Anh) cho MỌI route con không
// khớp, thay vì rơi về src/app/not-found.tsx (bản tiếng Việt) ở gốc.
// Không có file này, chỉ những trang gọi notFound() tường minh (vd
// /en-US/news/[id]) mới ra đúng 404 tiếng Anh — còn 1 URL sai hoàn toàn như
// /en-US/khong-ton-tai sẽ bị hiện nhầm bản 404 tiếng Việt.
export default function EnLayout({ children }: { children: ReactNode }) {
  return children;
}
