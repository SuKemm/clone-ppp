import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { CultureHandbookViewer } from "@/components/CultureHandbookViewer";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

export default function CultureHandbookPageEn() {
  const cultureHandbookPages = getCollection("culture-handbook-pages").map((p) => ({
    image: p.image,
    caption: p.caption ?? "",
    captionEn: p.caption_en ?? "",
  }));

  return (
    <PtscShell
      title="Culture Handbook"
      description="The values, standards, and cultural identity of PV Power DHC, gathered in a handbook for every employee."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Link href="/en-US" className="transition hover:text-cyan-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/en-US/services#photos" className="transition hover:text-cyan-700">
            Gallery
          </Link>
          <span>/</span>
          <span className="text-slate-600">Culture Handbook</span>
        </nav>

        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
            Culture Handbook
          </h2>
          <div className="hidden h-[3px] flex-1 max-w-xs bg-gradient-to-r from-[#089F50]/70 to-transparent sm:block" />
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
          Click a page to view it enlarged; use the arrow keys or the side
          buttons to move between pages.
        </p>

        <CultureHandbookViewer pages={cultureHandbookPages} isEnglish={true} />
      </section>
    </PtscShell>
  );
}
