import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";
import { formatNewsDateTime } from "@/lib/format-date";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = getCollection("news").find((n) => n.id === id);
  if (!item) return {};

  return {
    title: item.title_en || item.title,
    description: item.excerpt_en || item.excerpt || undefined,
  };
}

export default async function NewsDetailPageEn({ params }: Params) {
  const { id } = await params;
  const item = getCollection("news").find((n) => n.id === id);

  if (!item) notFound();

  const title = item.title_en || item.title;
  const category = item.category_en || item.category;
  const excerpt = item.excerpt_en || item.excerpt || "";
  // Nội dung lưu sẵn dạng HTML từ TinyMCE — ưu tiên bản dịch EN, rơi về bản
  // VI (hoặc tóm tắt) nếu bài chưa có nội dung tiếng Anh.
  const contentHtml = item.content_en || item.content || "";

  return (
    <PtscShell title={title} description={excerpt}>
      <section className="mx-auto max-w-3xl px-6 py-10 sm:py-16 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Link href="/en-US/news" className="text-sm font-semibold text-cyan-700 hover:underline">
            ← Back to news
          </Link>
          <ArticleViewCount id={item.id} mode="increment" className="shrink-0 text-sm text-slate-500" isEnglish />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{category}</p>
        <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
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
          {formatNewsDateTime(item.date, item.gio, "en")}
        </p>

        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="mt-8 h-56 w-full rounded-2xl object-cover sm:h-72 lg:h-96"
          />
        )}

        <div
          className="prose prose-slate mt-8 max-w-none break-words
            [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto
            [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:aspect-video"
        >
          {contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : excerpt ? (
            <p className="text-lg leading-8 text-slate-700">{excerpt}</p>
          ) : (
            <p className="text-slate-500">No content available for this article yet.</p>
          )}
        </div>
      </section>
    </PtscShell>
  );
}
