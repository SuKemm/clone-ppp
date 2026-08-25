import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";

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
        <div className="flex items-center justify-between">
          <Link href="/en-US/shareholders" className="text-sm font-semibold text-cyan-700 hover:underline">
            ← Back to Shareholder Relations
          </Link>
          <ArticleViewCount id={item.id} mode="increment" className="text-sm text-slate-500" isEnglish />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image || LOGO}
          alt={item.title_en || item.title}
          className="mx-auto mt-8 h-32 w-auto object-contain"
        />

        <h1 className="mt-8 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
          {item.title_en || item.title}
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
          {item.category}{" "}
          <span className="font-normal normal-case text-slate-400">
            ({item.date || "latest update"})
          </span>
        </p>

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
