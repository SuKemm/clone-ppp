import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string; // bỏ trống nếu là mục hiện tại (không click được)
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M10 2.5 2.5 8.75V17.5h5v-5h5v5h5V8.75L10 2.5Z" />
    </svg>
  );
}

/**
 * Thanh điều hướng breadcrumb dùng chung cho toàn site, dạng:
 * 🏠 / Tin tức – Sự kiện / Hoạt động PV Power
 *
 * `homeLabel`/`homeHref` cho phép dùng ở bản tiếng Anh (href="/en-US").
 */
export function Breadcrumb({
  items,
  homeHref = "/",
}: {
  items: BreadcrumbItem[];
  homeHref?: string;
}) {
  return (
    <nav
      aria-label="breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400"
    >
      <Link href={homeHref} className="flex items-center transition hover:text-cyan-700" aria-label="Trang chủ">
        <HomeIcon />
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-2">
          <span className="text-slate-300">/</span>
          {item.href ? (
            <Link href={item.href} className="transition hover:text-cyan-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-600">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
