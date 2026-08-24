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
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/en-US/news" className="text-sm font-semibold text-cyan-700 hover:underline">
            ← Back to news
          </Link>
          <ArticleViewCount id={item.id} mode="increment" className="text-sm text-slate-500" isEnglish />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{category}</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">{formatNewsDateTime(item.date, item.gio)}</p>

        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="mt-8 h-72 w-full rounded-2xl object-cover sm:h-96"
          />
        )}

        <div className="prose prose-slate mt-8 max-w-none">
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
