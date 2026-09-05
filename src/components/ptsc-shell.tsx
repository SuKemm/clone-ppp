"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { VisitorStats } from "./VisitorStats";
import { HeaderWeather } from "./HeaderWeather";

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
  children?: { href: string; label: string; external?: boolean }[];
};

// NOTE: ban đầu chốt 5 mục top-level (bỏ "Phòng truyền thống", thay bằng
// "Liên hệ"). Đã thêm thêm mục "Trang nội bộ" (giống ảnh mẫu huana.com.vn)
// nên giờ có 6 mục — nếu muốn giữ đúng 5, có thể gộp "Trang nội bộ" vào
// dropdown "Thư viện" thay vì để riêng.
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
  {
    href: "/trang-noi-bo",
    label: "Trang nội bộ",
    children: [
      { href: "https://amisapp.misa.vn/login/", label: "MISA AMIS", external: true },
      { href: "/trang-noi-bo/email-noi-bo", label: "Email nội bộ" },
      { href: "https://achipvn.com/domua/", label: "ACHIP Đo Mưa", external: true },
      { href: "https://quanly.dwrm.gov.vn/hochua/#/login", label: "CỤC TÀI NGUYÊN NƯỚC", external: true },
      { href: "/trang-noi-bo/hoc-va-thi-online", label: "Học và thi Online" },
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
      { href: "/en-US/tenders", label: "Tenders" },
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
  {
    href: "/en-US/internal-pages",
    label: "Internal Pages",
    children: [
      { href: "https://amisapp.misa.vn/login/", label: "MISA AMIS", external: true },
      { href: "/en-US/internal-pages/internal-email", label: "Internal Email" },
      { href: "https://achipvn.com/domua/", label: "ACHIP Procurement", external: true },
      { href: "https://quanly.dwrm.gov.vn/hochua/#/login", label: "DWRM", external: true },
      { href: "/en-US/internal-pages/e-learning", label: "E-Learning & Online Tests" },
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
  "trang-noi-bo": "internal-pages",
};
const VI_TO_EN_SUBSEGMENT: Record<string, string> = {
  "ban-lanh-dao": "leadership",
  "email-noi-bo": "internal-email",
  "tram-quan-trac": "monitoring-station",
  "ho-thuy-dien": "reservoir",
  "hoc-va-thi-online": "e-learning",
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

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
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
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);

  // Layout gốc (src/app/layout.tsx) không biết route hiện tại nên luôn để
  // sẵn lang="vi" — component này (dùng chung mọi trang) tự cập nhật lại
  // thuộc tính lang của thẻ <html> mỗi khi chuyển qua bản tiếng Anh.
  useEffect(() => {
    document.documentElement.lang = isEnglish ? "en" : "vi";
  }, [isEnglish]);

  // Khoá cuộn trang nền khi menu mobile (dạng overlay toàn màn hình) đang mở,
  // để người dùng không vô tình cuộn trang phía sau menu.
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30">
        {/* Top utility bar — same navy as the main nav so the header reads as one block,
            plus the company slogan (bilingual) sitting level with the language switcher. */}
        <div className="bg-[#075B9F] border-b border-[#063E70]">
  <div className="relative mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 py-1.5 lg:px-8">

    {/* Cột trống bên trái để cân bằng với khối VI/EN bên phải, giữ khẩu hiệu
        luôn đứng giữa thật sự thay vì canh giữa "ảo" (trước đây VI/EN nằm
        absolute nên trên màn hình hẹp <380px, khẩu hiệu dài có thể lấn vào
        khối VI/EN). */}
    <span aria-hidden="true" />

    {/* Slogan chính giữa */}
    <p className="text-center text-[11px] font-bold uppercase leading-tight tracking-[0.04em] text-[#FF6B00] xs:text-[12px] sm:text-sm">
      {isEnglish
        ? "Quality - Safety - Efficiency - Development"
        : "Chất lượng - An toàn - Hiệu quả - Phát triển"}
    </p>

    {/* VI / EN bên phải */}
    <div className="flex shrink-0 items-center justify-self-end overflow-hidden rounded-sm text-[10px] font-semibold sm:text-[11px]">
      <Link
        href={getLanguageSwitchHref(pathname, false)}
        className={`px-2 py-0.5 transition sm:px-2.5 sm:py-1 ${
          !isEnglish
            ? "bg-[#FF6B00] text-white"
            : "bg-[#064B82] text-slate-200 hover:bg-[#0868AD] hover:text-white"
        }`}
      >
        VI
      </Link>

      <Link
        href={getLanguageSwitchHref(pathname, true)}
        className={`px-2 py-0.5 transition sm:px-2.5 sm:py-1 ${
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
        <div className="relative border-b border-white/5 bg-[#0a1330]">
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8 ${
              isEnglish ? "gap-2 lg:gap-4" : "gap-3 lg:gap-6"
            }`}
          >
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
      <span className="block text-[10px] font-extrabold uppercase tracking-wide text-[#089F50] xs:text-[11px] sm:text-xs lg:text-sm">
        Dakdrinh Hydropower
      </span>
      <span className="block text-[10px] font-extrabold uppercase tracking-wide text-[#089F50] xs:text-[11px] sm:text-xs lg:text-sm">
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
            <nav
              className={`hidden items-center font-semibold tracking-normal text-slate-100 md:flex ${
                isEnglish
                  ? "gap-2 text-[9.5px] lg:gap-3 lg:text-[10.5px]"
                  : "gap-4 text-[11px] lg:gap-5 lg:text-[12px]"
              }`}
            >
              {navItems.map((item, index) => (
                <div
                  key={item.href}
                  className="relative shrink-0"
                  onMouseEnter={() => item.children && setOpenIndex(index)}
                  onMouseLeave={() => item.children && setOpenIndex(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 whitespace-nowrap py-4 uppercase transition hover:text-cyan-300"
                  >
                    {item.label}
                    {item.children ? (
                      <ChevronDown className="h-3 w-3 shrink-0" />
                    ) : null}
                  </Link>

                  {item.children && openIndex === index ? (
                    <div className="absolute left-0 top-full w-60 rounded-b-sm bg-white py-2 text-slate-700 shadow-xl">
                      {item.children.map((child) =>
                        child.external ? (
                          <a
                            key={child.href}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-5 py-2.5 text-[13px] font-normal normal-case transition hover:bg-slate-50 hover:text-cyan-700"
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-[13px] font-normal normal-case transition hover:bg-slate-50 hover:text-cyan-700"
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            {/* Widget thời tiết gọn — cố định trong thanh menu, không tự ẩn,
                bấm vào để tra thời tiết tỉnh thành khác. */}
            <HeaderWeather isEnglish={isEnglish} />

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen((v) => !v);
                setMobileExpandedIndex(null);
              }}
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

          {/* Mobile nav — dạng dropdown xổ xuống ngay dưới thanh menu (không
              che logo/thanh điều hướng phía trên), nền màu navy đồng bộ
              thương hiệu, cao tối đa 60% màn hình rồi tự cuộn — thay cho
              kiểu phủ trắng toàn màn hình trước đây. Có lớp nền mờ phía sau,
              bấm ra ngoài để đóng, giống hành vi menu mobile của trang tham
              chiếu (pvpower.vn). */}
          {mobileOpen ? (
            <>
              <div
                className="fixed inset-0 z-[59] bg-black/40 md:hidden"
                onClick={() => {
                  setMobileOpen(false);
                  setMobileExpandedIndex(null);
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 top-full z-[60] flex max-h-[60vh] flex-col overflow-hidden rounded-b-2xl bg-[#0a1330] text-white shadow-2xl md:hidden">
                <div className="flex items-center justify-end border-b border-white/10 px-6 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileExpandedIndex(null);
                    }}
                    aria-label={isEnglish ? "Close menu" : "Đóng menu"}
                    className="flex h-10 w-10 items-center justify-center text-slate-300 transition hover:text-white"
                  >
                    <CloseIcon className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-2">
                  {navItems.map((item, index) => {
                    const isExpanded = mobileExpandedIndex === index;
                    return (
                      <div key={item.href} className="border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            className="block flex-1 py-4 text-base font-bold uppercase tracking-wide text-white"
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileExpandedIndex(null);
                            }}
                          >
                            {item.label}
                          </Link>
                          {item.children ? (
                            <button
                              type="button"
                              onClick={() =>
                                setMobileExpandedIndex((current) => (current === index ? null : index))
                              }
                              aria-label={
                                isEnglish
                                  ? isExpanded
                                    ? "Collapse submenu"
                                    : "Expand submenu"
                                  : isExpanded
                                    ? "Thu gọn mục con"
                                    : "Mở rộng mục con"
                              }
                              aria-expanded={isExpanded}
                              className="flex h-11 w-11 shrink-0 items-center justify-center text-slate-400"
                            >
                              <ChevronDown
                                className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </button>
                          ) : null}
                        </div>
                        {item.children && isExpanded ? (
                          <div className="flex flex-col gap-1 pb-4 pl-1">
                            {item.children.map((child) =>
                              child.external ? (
                                <a
                                  key={child.href}
                                  href={child.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="py-2 text-sm normal-case text-slate-300"
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileExpandedIndex(null);
                                  }}
                                >
                                  {child.label}
                                </a>
                              ) : (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="py-2 text-sm normal-case text-slate-300"
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileExpandedIndex(null);
                                  }}
                                >
                                  {child.label}
                                </Link>
                              )
                            )}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </>
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
        {/* Decorative background: ảnh cột điện cao thế chạy ngang toàn bộ
            chiều rộng chân trang (thay cho bản vẽ SVG trước đó), phủ thêm
            gradient tối để chữ trong footer luôn đọc rõ. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 w-full overflow-hidden sm:h-64" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ptsc/footer-power-lines.jpg"
            alt=""
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1330]/25 via-[#0a1330]/55 to-[#0a1330]" />
        </div>

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
