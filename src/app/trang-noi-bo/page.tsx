import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";

// Danh sách các trang con trong mục "Trang nội bộ". Thêm mục mới ở đây và
// tạo thêm thư mục src/app/trang-noi-bo/<slug>/page.tsx tương ứng.
const internalPages = [
  { href: "/trang-noi-bo/email-noi-bo", label: "Email nội bộ" },
  { href: "https://achipvn.com/domua/", label: "ACHIP Đồ mua", external: true },
  { href: "https://quanly.dwrm.gov.vn/hochua/#/login", label: "CỤC TÀI NGUYÊN NƯỚC", external: true },
  { href: "/trang-noi-bo/hoc-va-thi-online", label: "Học và thi Online" },
];

export default function InternalPagesIndex() {
  return (
    <PtscShell
      title="Trang nội bộ"
      description="Các hệ thống và trang dùng nội bộ dành cho cán bộ, nhân viên công ty."
    >
      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Link href="/" className="transition hover:text-cyan-700">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-slate-600">Trang nội bộ</span>
        </nav>

        <h1 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
          Trang nội bộ
        </h1>

        <ul className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {internalPages.map((item) =>
            item.external ? (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#089F50]"
                >
                  {item.label}
                  <span aria-hidden="true">›</span>
                </a>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#089F50]"
                >
                  {item.label}
                  <span aria-hidden="true">›</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </section>
    </PtscShell>
  );
}
