import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { CultureHandbookViewer } from "@/components/CultureHandbookViewer";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

export default function CultureHandbookPage() {
  const cultureHandbookPages = getCollection("culture-handbook-pages").map((p) => ({
    image: p.image,
    caption: p.caption ?? "",
    captionEn: p.caption_en ?? "",
    content: p.content ?? "",
    contentEn: p.content_en ?? "",
  }));

  return (
    <PtscShell
      title="Sổ tay văn hóa"
      description="Những giá trị, chuẩn mực và bản sắc văn hóa của PV Power DHC, được tổng hợp trong cuốn sổ tay dành cho toàn thể cán bộ, nhân viên."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Link href="/" className="transition hover:text-cyan-700">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/dich-vu#thu-vien-anh" className="transition hover:text-cyan-700">
            Thư viện
          </Link>
          <span>/</span>
          <span className="text-slate-600">Sổ tay văn hóa</span>
        </nav>

        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
            Sổ tay văn hóa
          </h2>
          <div className="hidden h-[3px] flex-1 max-w-xs bg-gradient-to-r from-[#089F50]/70 to-transparent sm:block" />
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
          Nhấp vào một trang để xem phóng to, dùng phím mũi tên hoặc nút hai bên
          để lật qua các trang tiếp theo.
        </p>

        <CultureHandbookViewer pages={cultureHandbookPages} isEnglish={false} />
      </section>
    </PtscShell>
  );
}
