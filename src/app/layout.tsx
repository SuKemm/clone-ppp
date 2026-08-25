import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Công ty cổ phần thủy điện ĐakĐrinh",
  description: "Trang thông tin chính thức của Công ty cổ phần thủy điện Dakdrinh.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Next.js chỉ render DUY NHẤT 1 thẻ <html> cho toàn bộ app (ở layout gốc
  // này) — không có cách nào để /en-US/layout.tsx tự đặt lang="en" riêng.
  // Đọc lại pathname mà middleware đã gắn vào header (xem src/middleware.ts)
  // để chọn đúng ngôn ngữ khai báo cho mọi trang trong nhánh /en-US.
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const lang = pathname.startsWith("/en-US") ? "en" : "vi";

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
