import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

export default function NewsPage() {
  const news = getCollection("news");

  return (
    <PtscShell
      title="Tin tức"
      description="Cập nhật các hoạt động, dự án mới và thông tin phát triển bền vững của PTSC."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="space-y-6">
          {news.map((item) => (
            <article key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" className="mb-6 h-56 w-full rounded-2xl object-cover" />
              )}
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{item.category}</p>
              <Link href={`/tin-tuc/${item.id}`} className="mt-3 block text-2xl font-semibold text-slate-900 transition hover:text-cyan-700">
                {item.title}
              </Link>
              {item.excerpt && <p className="mt-3 text-slate-600">{item.excerpt}</p>}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <p>{item.date}</p>
                  <span aria-hidden>·</span>
                  <ArticleViewCount id={item.id} mode="display" />
                </div>
                <Link href={`/tin-tuc/${item.id}`} className="text-sm font-semibold text-cyan-700 hover:underline">
                  Xem chi tiết →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}
