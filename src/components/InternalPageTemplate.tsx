"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PtscShell } from "@/components/ptsc-shell";

// Khung dùng chung cho các trang trong mục "Trang nội bộ" / "Internal Pages"
// (Speedmaint, Email nội bộ, Trạm quan trắc, Hồ thuỷ điện, Học và thi
// Online, ...). Mỗi trang hiện đang là khung rỗng — sau này chỉ cần chỉnh
// nội dung/thêm link trong từng file page.tsx tương ứng (xem
// src/app/trang-noi-bo/* và src/app/en-US/internal-pages/*).
//
// Tự nhận biết VI/EN qua pathname (giống PtscShell) nên không cần truyền
// thêm prop ngôn ngữ — cứ đặt file EN dưới /en-US/internal-pages/... là
// breadcrumb, nút bấm, v.v. tự đổi sang tiếng Anh.
export function InternalPageTemplate({
  title,
  description,
  externalUrl,
  externalLabel,
  children,
}: {
  title: string;
  description?: string;
  // Nếu trang này chỉ là lối vào một hệ thống/link ngoài (vd Email nội bộ,
  // Speedmaint), truyền externalUrl để hiện nút mở link ở tab mới. Để trống
  // (hoặc "#") nếu chưa có link, nút vẫn hiện nhưng chưa hoạt động.
  externalUrl?: string;
  externalLabel?: string;
  children?: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const isEnglish = pathname.startsWith("/en-US");

  const homeHref = isEnglish ? "/en-US" : "/";
  const homeLabel = isEnglish ? "Home" : "Trang chủ";
  const sectionHref = isEnglish ? "/en-US/internal-pages" : "/trang-noi-bo";
  const sectionLabel = isEnglish ? "Internal Pages" : "Trang nội bộ";
  const defaultExternalLabel = isEnglish ? "Open system" : "Mở hệ thống";
  const placeholderText = isEnglish
    ? "Content is being updated."
    : "Nội dung đang được cập nhật.";

  return (
    <PtscShell title={title} description={description}>
      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Link href={homeHref} className="transition hover:text-cyan-700">
            {homeLabel}
          </Link>
          <span>/</span>
          <Link href={sectionHref} className="transition hover:text-cyan-700">
            {sectionLabel}
          </Link>
          <span>/</span>
          <span className="text-slate-600">{title}</span>
        </nav>

        <div className="flex items-end justify-between gap-4">
          <h1 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
            {title}
          </h1>
          <div className="hidden h-[3px] flex-1 max-w-xs bg-gradient-to-r from-[#089F50]/70 to-transparent sm:block" />
        </div>

        {description ? (
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">{description}</p>
        ) : null}

        {externalUrl !== undefined ? (
          <a
            href={externalUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#089F50] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#078a45]"
          >
            {externalLabel ?? defaultExternalLabel}
          </a>
        ) : null}

        {children ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
            {children}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-400">
            {placeholderText}
          </div>
        )}
      </section>
    </PtscShell>
  );
}
