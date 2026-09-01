import Link from "next/link";
import { Home } from "lucide-react";

// Header tiêu đề trang + breadcrumb (Trang chủ / Cha / Trang hiện tại), dùng
// chung cho các trang danh sách/chi tiết cần hiển thị đường dẫn điều hướng
// kiểu "🏠 / Tin tức – Sự kiện / Hoạt động PV Power" giống bản gốc PV Power.
export type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  crumbs,
  homeHref = "/",
}: {
  title: string;
  crumbs: Crumb[];
  homeHref?: string;
}) {
  return (
    <div className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <h1 className="break-words text-xl font-bold text-slate-900 sm:text-2xl">
          {title}
        </h1>

        <nav
          aria-label="Breadcrumb"
          className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500"
        >
          <Link
            href={homeHref}
            className="flex items-center text-slate-500 transition hover:text-cyan-700"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>

          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-slate-300">/</span>
              {crumb.href ? (
                <Link href={crumb.href} className="text-cyan-700 transition hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-700">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
