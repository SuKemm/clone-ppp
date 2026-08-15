import Link from "next/link";
import { notFound } from "next/navigation";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

type Params = { params: Promise<{ id: string }> };

export default async function NewsDetailPage({ params }: Params) {
  const { id } = await params;
  const item = getCollection("news").find((n) => n.id === id);

  if (!item) notFound();

  // Nội dung đầy đủ nhập ở /admin dạng văn bản thường — mỗi dòng trống
  // cách nhau được hiểu là 1 đoạn văn mới khi hiển thị.
  const paragraphs = (item.content || item.excerpt || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <PtscShell title={item.title} description={item.excerpt || ""}>
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/tin-tuc" className="text-sm font-semibold text-cyan-700 hover:underline">
            ← Quay lại danh sách tin tức
          </Link>
          <ArticleViewCount id={item.id} mode="increment" className="text-sm text-slate-500" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
          {item.category}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{item.title}</h1>
        <p className="mt-3 text-sm text-slate-500">{item.date}</p>

        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="mt-8 h-72 w-full rounded-2xl object-cover sm:h-96"
          />
        )}

        <div className="prose prose-slate mt-8 max-w-none">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="mt-4 whitespace-pre-line text-lg leading-8 text-slate-700 first:mt-0">
                {p}
              </p>
            ))
          ) : (
            <p className="text-slate-500">Bài viết chưa có nội dung chi tiết.</p>
          )}
        </div>
      </section>
    </PtscShell>
  );
}
