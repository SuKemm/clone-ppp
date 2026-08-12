"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItemsVi = [
  { href: "/", label: "home" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/co-dong", label: "Cổ đông" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/don-vi", label: "Đơn vị" },
  { href: "/tuyen-dung", label: "Tuyển dụng" },
  { href: "/dau-thau", label: "Đấu thầu" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "http://www.pvnindex.vn/index-overview/PVNASPRVND.html", label: "PVN", external: true },
  { href: "http://www.pvnindex.vn/index-overview/PVNASPRVND.html", label: "Allshare", external: true },
];

const navItemsEn = [
  { href: "/en-US", label: "home" },
  { href: "/en-US/about-us", label: "About" },
  { href: "/en-US/services", label: "Services" },
  { href: "/en-US/projects", label: "Projects" },
  { href: "/en-US/shareholders", label: "Shareholders" },
  { href: "/en-US/news", label: "News" },
  { href: "/en-US/units", label: "Units" },
  { href: "/en-US/careers", label: "Careers" },
  { href: "/en-US/tenders", label: "Tenders" },
  { href: "/en-US/contact", label: "Contact" },
  { href: "http://www.pvnindex.vn/index-overview/PVNASPRVND.html", label: "PVN", external: true },
  { href: "http://www.pvnindex.vn/index-overview/PVNASPRVND.html", label: "Allshare", external: true },
];

export function PtscShell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en-US");
  const navItems = isEnglish ? navItemsEn : navItemsVi;
  const homeHref = isEnglish ? "/en-US" : "/";
  const langHref = isEnglish ? "/" : "/en-US";
  const langLabel = isEnglish ? "VI" : "EN";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href={homeHref} className="flex items-center gap-3">
            <img src="/images/ptsc/logo-ptsc.png" alt="PETROVIETNAM POWER-DHC" className="h-10 w-auto" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item, index) => {
              const key = `${item.href}-${item.label}-${index}`;

              return item.external ? (
                <a
                  key={key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-cyan-700"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={key}
                  href={item.href}
                  className="transition hover:text-cyan-700"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={langHref}
              className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-700"
            >
              {langLabel}
            </Link>
          </div>
        </div>
      </header>

      <main>
        {title ? (
          <section className="border-b border-slate-200 bg-slate-50/80">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
                PV POWER DHC
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
                {title}
              </h1>
              {description ? (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
              ) : null}
            </div>
          </section>
        ) : null}
        {children}
      </main>

      <footer id="contact" className="border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-sm lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <img src="/images/ptsc/logo-ptsc.png" alt="PETROVIETNAM POWER-DHC" className="h-10 w-auto" />
            <p className="mt-4 max-w-md leading-7">
              Công ty cổ phần Thủy điện Đakđrinh (PV Power DHC)
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Liên kết nhanh</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://www.ptsc.com.vn/Data/Sites/1/media/video/Vie_PTSC_2025_up7.8.mp4" className="transition hover:text-white">
                  Phim giới thiệu
                </a>
              </li>
              <li>
                <a href="https://www.ptsc.com.vn/Data/Sites/1/media/brochure/TV_PTSC_Brochure_072025.pdf" className="transition hover:text-white">
                  Brochure
                </a>
              </li>
              <li>
                <a href="https://www.ptsc.com.vn/he-thong-quan-ly-noi-bo" className="transition hover:text-white">
                  Hệ thống quản lý nội bộ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Thông tin web</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/dieu-khoan-su-dung" className="transition hover:text-white">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="/chinh-sach-bao-mat" className="transition hover:text-white">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="/sitemap.aspx" className="transition hover:text-white">
                  Sơ đồ trang web
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
