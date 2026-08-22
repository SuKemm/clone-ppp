"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { VisitorStats } from "./VisitorStats";

// Logo cổ đông / nhà đầu tư — trước đây nằm ngay dưới banner trang chủ, nay
// chuyển xuống chân trang (dùng chung cho mọi trang vì Footer nằm trong
// PtscShell). Vị trí cũ trên trang chủ đã thay bằng <MarqueeBar /> (dòng
// chữ chạy, sửa được ở /admin).
const investorLogos = [
  { name: "PetroVietnam Power", image: "/images/ptsc/shareholder-petrovietnam-power.png" },
  { name: "BIDV", image: "/images/ptsc/shareholder-bidv.png" },
  { name: "PV Power DHC", image: "/images/ptsc/shareholder-pvpower-dhc.png" },
  { name: "Shareholder 3", image: "/images/ptsc/shareholder-03.png" },
  { name: "LICOGI", image: "/images/ptsc/shareholder-licogi.png" },
];

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
      { href: "/gioi-thieu/ban-lanh-dao", label: "Ban lãnh đạo" },
      { href: "/du-an", label: "Dự án" },
      { href: "/dau-thau", label: "Đấu thầu" },
    ],
  },
  {
    href: "/co-dong",
    label: "Quan hệ cổ đông",
    children: [
      { href: "/co-dong#thong-tin", label: "Thông tin / tài liệu cổ đông" },
      { href: "/co-dong#dai-hoi", label: "Đại hội cổ đông" },
      { href: "/co-dong#bao-cao", label: "Báo cáo tài chính/Báo cáo thường niên" },
    ],
  },
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
      { href: "/so-tay-van-hoa", label: "Sổ tay văn hóa" },
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
      { href: "/en-US/about-us/leadership", label: "Board of Directors" },
      { href: "/en-US/projects", label: "Projects" },
      { href: "/en-US/units", label: "Corporate Information" },
    ],
  },
  {
    href: "/en-US/shareholders",
    label: "Investor Relations",
    children: [
      { href: "/en-US/shareholders#info", label: "Shareholder Information" },
      { href: "/en-US/shareholders#agm", label: "General Meeting of Shareholders" },
      { href: "/en-US/shareholders#reports", label: "Financial / Annual Reports" },
    ],
  },
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
      { href: "/en-US/culture-handbook", label: "Culture Handbook" },
    ],
  },
  { href: "/en-US/contact", label: "Contact" },
];

// Ánh xạ segment đầu tiên của URL giữa 2 bản VI <-> EN (và một vài segment
// con đã biết, vd "ban-lanh-dao" <-> "leadership"), để nút chuyển ngôn ngữ ở
// header đưa người dùng sang ĐÚNG trang tương ứng thay vì luôn về trang chủ.
const VI_TO_EN_SEGMENT: Record<string, string> = {
  "gioi-thieu": "about-us",
  "du-an": "projects",
  "don-vi": "units",
  "co-dong": "shareholders",
  "tin-tuc": "news",
  "dich-vu": "services",
  "so-tay-van-hoa": "culture-handbook",
  "lien-he": "contact",
  "dau-thau": "tenders",
  "tuyen-dung": "careers",
};
const VI_TO_EN_SUBSEGMENT: Record<string, string> = {
  "ban-lanh-dao": "leadership",
};
const EN_TO_VI_SEGMENT: Record<string, string> = Object.fromEntries(
  Object.entries(VI_TO_EN_SEGMENT).map(([vi, en]) => [en, vi])
);
const EN_TO_VI_SUBSEGMENT: Record<string, string> = Object.fromEntries(
  Object.entries(VI_TO_EN_SUBSEGMENT).map(([vi, en]) => [en, vi])
);

// Trả về href tương ứng ở bản ngôn ngữ kia cho pathname hiện tại, thay vì
// luôn hard-code về "/" hay "/en-US". Segment lạ (không nằm trong bảng ánh
// xạ, vd "/admin") sẽ rơi về trang chủ của ngôn ngữ đích.
function getLanguageSwitchHref(pathname: string, toEnglish: boolean): string {
  const segments = pathname.split("/").filter(Boolean);

  if (toEnglish) {
    if (segments[0] === "en-US") return pathname; // đã ở bản EN
    const [first, ...rest] = segments;
    const enFirst = first ? VI_TO_EN_SEGMENT[first] : undefined;
    if (!enFirst) return "/en-US";
    const mappedRest = rest.map((seg) => VI_TO_EN_SUBSEGMENT[seg] ?? seg);
    return ["/en-US", enFirst, ...mappedRest].join("/");
  }

  if (segments[0] !== "en-US") return pathname; // đã ở bản VI
  const [, first, ...rest] = segments;
  const viFirst = first ? EN_TO_VI_SEGMENT[first] : undefined;
  if (!viFirst) return "/";
  const mappedRest = rest.map((seg) => EN_TO_VI_SUBSEGMENT[seg] ?? seg);
  return "/" + [viFirst, ...mappedRest].join("/");
}

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
  const pathname = usePathname() || "/";
  const isEnglish = pathname.startsWith("/en-US");
  const navItems = isEnglish ? navItemsEn : navItemsVi;
  const homeHref = isEnglish ? "/en-US" : "/";

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Layout gốc (src/app/layout.tsx) không biết route hiện tại nên luôn để
  // sẵn lang="vi" — component này (dùng chung mọi trang) tự cập nhật lại
  // thuộc tính lang của thẻ <html> mỗi khi chuyển qua bản tiếng Anh.
  useEffect(() => {
    document.documentElement.lang = isEnglish ? "en" : "vi";
  }, [isEnglish]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30">
        {/* Top utility bar — same navy as the main nav so the header reads as one block,
            plus the company slogan (bilingual) sitting level with the language switcher. */}
        <div className="bg-[#075B9F] border-b border-[#063E70]">
  <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 py-1.5 lg:px-8">

    {/* Slogan chính giữa */}
    <p className="text-center text-[12px] font-bold uppercase tracking-[0.04em] text-[#FF6B00] sm:text-sm">
      {isEnglish
        ? "Quality - Safety - Efficiency - Development"
        : "Chất lượng - An toàn - Hiệu quả - Phát triển"}
    </p>

    {/* VI / EN bên phải */}
    <div className="absolute right-6 flex shrink-0 items-center overflow-hidden rounded-sm text-xs font-semibold lg:right-8">
      <Link
        href={getLanguageSwitchHref(pathname, false)}
        className={`px-2.5 py-1 transition ${
          !isEnglish
            ? "bg-[#FF6B00] text-white"
            : "bg-[#064B82] text-slate-200 hover:bg-[#0868AD] hover:text-white"
        }`}
      >
        VI
      </Link>

      <Link
        href={getLanguageSwitchHref(pathname, true)}
        className={`px-2.5 py-1 transition ${
          isEnglish
            ? "bg-[#FF6B00] text-white"
            : "bg-[#064B82] text-slate-200 hover:bg-[#0868AD] hover:text-white"
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
            <Link href={homeHref} className="flex min-w-0 items-center gap-2 sm:gap-4">
              <img
                src="/images/ptsc/logo-ptsc.png"
                alt="PETROVIETNAM POWER-DHC"
                className="h-12 w-auto shrink-0 sm:h-16 lg:h-20"
              />
              {/* Company name */}
<span className="flex min-w-0 flex-col justify-center leading-tight">
  {isEnglish ? (
    <span className="w-max text-left sm:text-center">
      <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#089F50] xs:text-xs sm:text-base lg:text-lg">
        Dakdrinh Hydropower
      </span>
      <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#089F50] xs:text-xs sm:text-base lg:text-lg">
        Joint Stock Company
      </span>
    </span>
  ) : (
    <span className="w-max text-left sm:text-center">
      <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#089F50] xs:text-xs sm:text-base lg:text-lg">
        Công ty cổ phần
      </span>
      <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#089F50] xs:text-xs sm:text-base lg:text-lg">
        Thủy điện ĐAKĐRINH
      </span>
    </span>
  )}
</span>
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
              aria-label={isEnglish ? "Toggle menu" : "Mở/đóng menu"}
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
        {children}
      </main>

      {/* Shareholder / investor logos — chạy ngang liên tục như dòng chữ chạy,
          mỗi logo có khung viền trắng ôm sát logo (không quá rộng). */}
      <section className="border-t border-slate-200 bg-white">
        <div className="overflow-hidden py-8">
          <div className="flex w-max items-center gap-6 animate-logo-marquee">
            {[...investorLogos, ...investorLogos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-4"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  title={logo.name}
                  className="h-10 w-auto object-contain sm:h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="relative overflow-hidden border-t border-slate-200 bg-[#0a1330] text-slate-300">
        {/* Decorative radiating lines, echoing the reference footer */}
        <svg
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 opacity-[0.07] sm:h-96 sm:w-96"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 100 * Math.cos((i * Math.PI) / 12)}
              y2={100 + 100 * Math.sin((i * Math.PI) / 12)}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Centered brand block */}
        <div className="relative mx-auto max-w-3xl px-6 pt-12 text-center lg:px-8">
          <img
            src="/images/ptsc/logo-ptsc.png"
            alt="PETROVIETNAM POWER-DHC"
            className="mx-auto h-24 w-auto sm:h-28"
          />
          <p className="mt-4 text-lg font-extrabold uppercase tracking-wide text-[#089F50] sm:text-xl">
            {isEnglish
              ? "Dakdrinh Hydropower Joint Stock Company"
              : "Công ty cổ phần Thủy điện Đakđrinh"}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {isEnglish
              ? "Ra Nhua Village, Son Tay Commune, Quang Ngai Province"
              : " Thôn Ra Nhua, xã Sơn Tây, tỉnh Quảng Ngãi"}
            <span className="mx-2 text-slate-600">|</span>
            (+84) 255 629 3777
          </p>

          {/* Gradient divider, echoing the reference footer's colored line, split with the site name in the middle */}
          <div className="mx-auto mt-8 flex w-full max-w-2xl items-center gap-4">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-600 to-cyan-400" />
            <span className="shrink-0 text-xs font-medium text-slate-300">dakdrink.vn</span>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-red-500 to-amber-400" />
          </div>
        </div>

        {/* Visitor stats bar — full-width, left to right, sitting right above the footer's bottom edge */}
        <div className="relative border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
            <VisitorStats isEnglish={isEnglish} layout="horizontal" />
          </div>
        </div>

        <div className="relative border-t border-white/5 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} PV Power DHC.{" "}
          {isEnglish ? "All rights reserved." : "Bảo lưu mọi quyền."}
        </div>
      </footer>
    </div>
  );
}
