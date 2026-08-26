import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";
import { formatNewsDateTime } from "@/lib/format-date";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Đồng bộ với bản tiếng Việt (src/app/co-dong/[id]/page.tsx) — cùng đọc từ
// "shareholder-relations", chỉ khác lấy các field "_en".
const LOGO = "/images/ptsc/logo-ptsc.png";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = getCollection("shareholder-relations").find((n) => n.id === id);
  if (!item) return {};

  return { title: item.title_en || item.title, description: item.excerpt_en || item.excerpt || undefined };
}

export default async function ShareholderRelationDetailPageEn({ params }: Params) {
  const { id } = await params;
  const item = getCollection("shareholder-relations").find((n) => n.id === id);

  if (!item) notFound();

  const contentHtml = item.content_en || item.content || "";

  return (
    <PtscShell title={item.title_en || item.title} description={item.excerpt_en || item.excerpt || ""}>
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Link href="/en-US/shareholders" className="text-sm font-semibold text-cyan-700 hover:underline">
            ← Back to Shareholder Relations
          </Link>
          <ArticleViewCount id={item.id} mode="increment" className="text-sm text-slate-500" isEnglish />
        </div>

        <h1 className="mt-8 break-words text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
          {item.title_en || item.title}
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
          {item.category}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-4 w-4 shrink-0"
          >
            <circle cx="10" cy="10" r="7.25" />
            <path d="M10 6v4l2.6 1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {formatNewsDateTime(item.date, undefined, "en") || "latest update"}
        </p>

        <div className="mt-8 flex h-72 w-full items-center justify-center rounded-2xl bg-white sm:h-96">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt={item.title_en || item.title} className="h-full w-full object-contain p-6" />
        </div>

        {item.attachment && (
          <a
            href={item.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
          >
            📄 Download PDF
          </a>
        )}

        <div className="prose prose-slate mt-8 max-w-none">
          {contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : item.excerpt_en || item.excerpt ? (
            <p className="text-lg leading-8 text-slate-700">{item.excerpt_en || item.excerpt}</p>
          ) : (
            <p className="text-slate-500">This article has no full content yet.</p>
          )}
        </div>
      </section>
    </PtscShell>
  );
}
