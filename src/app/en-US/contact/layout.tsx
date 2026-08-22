import type { Metadata } from "next";

// src/app/en-US/contact/page.tsx là client component ("use client") nên
// không thể tự export metadata — đặt ở layout.tsx riêng cho route này để
// ghi đè metadata tiếng Việt mặc định ở layout gốc.
export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Dakdrinh Hydropower Joint Stock Company.",
};

export default function ContactLayoutEn({ children }: { children: React.ReactNode }) {
  return children;
}
