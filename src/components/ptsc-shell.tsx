"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { VisitorStats } from "./VisitorStats";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

// NOTE: to keep the total at 5 top-level items (per yêu cầu "thêm mục Liên hệ,
// tổng 5 mục"), "Phòng truyền thống" from the reference screenshot was dropped
// and "Liên hệ" takes its place as the 5th item. Adjust the hrefs below to
// match your real routes/anchors if the guessed mapping isn't right.
const navItemsVi: NavItem[] = [
  {
    href: "/gioi-thieu",
    label: "Giới thiệu DHC",
    children: [
      { href: "/gioi-thieu", label: "Giới thiệu chung" },
      { href: "/gioi-thieu#ban-lanh-dao", label: "Ban lãnh đạo" },
      { href: "/du-an", label: "Dự án" },
      { href: "/don-vi", label: "Thông tin doanh nghiệp" },
    ],
  },
  // TODO xác nhận lại nội dung sub-menu này với anh Phước — chưa đọc rõ hết
  // chữ viết tay ở cột "Quan hệ cổ đông", nên tạm để link thẳng, chưa thêm dropdown.
  { href: "/co-dong", label: "Quan hệ cổ đông" },
  {
    href: "/tin-tuc",
    label: "Tin tức – Sự kiện",
    children: [
      { href: "/tin-tuc#hoat-dong-pvpower", label: "Hoạt động PV Power" },
      { href: "/tin-tuc#hoat-dong-dhc", label: "Hoạt động PV Power DHC" },
      { href: "/tin-tuc#khac", label: "Tin tức khác" },
    ],
  },
  {
    href: "/dich-vu",
    label: "Thư viện",
    children: [
      { href: "/dich-vu#thu-vien-anh", label: "Thư viện ảnh" },
      { href: "/dich-vu#thu-vien-video", label: "Thư viện video" },
    ],
  },
  { href: "/lien-he", label: "Liên hệ" },
];

const navItemsEn: NavItem[] = [
  {
    href: "/en-US/about-us",
    label: "Introduction",
    children: [
      { href: "/en-US/about-us", label: "Overview" },
      { href: "/en-US/about-us#leadership", label: "Board of Directors" },
      { href: "/en-US/projects", label: "Projects" },
      { href: "/en-US/units", label: "Corporate Information" },
    ],
  },
  { href: "/en-US/shareholders", label: "Investor Relations" },
  {
    href: "/en-US/news",
    label: "News and Events",
    children: [
      { href: "/en-US/news#pvpower", label: "PV Power Activities" },
      { href: "/en-US/news#dhc", label: "PV Power DHC Activities" },
      { href: "/en-US/news#other", label: "Other News" },
    ],
  },
  {
    href: "/en-US/services",
    label: "Gallery",
    children: [
      { href: "/en-US/services#photos", label: "Photo Gallery" },
      { href: "/en-US/services#videos", label: "Video Gallery" },
    ],
  },
  { href: "/en-US/contact", label: "Contact" },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30">
        {/* Top utility bar */}
        <div className="bg-[#0e1d3d]">
          <div className="mx-auto flex max-w-7xl items-center justify-end px-6 py-1.5 lg:px-8">
            <div className="flex shrink-0 items-center overflow-hidden rounded-sm text-xs font-semibold">
              <Link
                href="/"
                className={`px-2.5 py-1 transition ${
                  !isEnglish
                    ? "bg-cyan-500 text-white"
                    : "bg-[#16294f] text-slate-300 hover:text-white"
                }`}
              >
                VI
              </Link>
              <Link
                href="/en-US"
                className={`px-2.5 py-1 transition ${
                  isEnglish
                    ? "bg-cyan-500 text-white"
                    : "bg-[#16294f] text-slate-300 hover:text-white"
                }`}
              >
                EN
              </Link>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="border-b border-white/5 bg-[#0a1330]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-8">
            <Link href={homeHref} className="flex items-center gap-3">
              <img
                src="/images/ptsc/logo-ptsc.png"
                alt="PETROVIETNAM POWER-DHC"
                className="h-14 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 text-[13px] font-semibold tracking-wide text-slate-100 md:flex">
              {navItems.map((item, index) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenIndex(index)}
                  onMouseLeave={() => item.children && setOpenIndex(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 py-4 uppercase transition hover:text-cyan-300"
                  >
                    {item.label}
                    {item.children ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : null}
                  </Link>

                  {item.children && openIndex === index ? (
                    <div className="absolute left-0 top-full w-64 rounded-b-sm bg-white py-2 text-slate-700 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-6 py-3 text-sm font-normal normal-case transition hover:bg-slate-50 hover:text-cyan-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-sm text-white md:hidden"
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Mobile nav */}
          {mobileOpen ? (
            <nav className="flex flex-col gap-1 border-t border-white/10 bg-[#0a1330] px-6 py-3 text-sm font-semibold text-slate-100 md:hidden">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 uppercase"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-1.5 text-xs font-normal normal-case text-slate-300"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
          ) : null}
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
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-sm lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr] lg:px-8">
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
          <VisitorStats />
        </div>
      </footer>
    </div>
  );
}
