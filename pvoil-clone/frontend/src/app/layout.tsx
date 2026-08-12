import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trang chủ - PVOIL',
  description: 'Clone frontend của website PVOIL',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
