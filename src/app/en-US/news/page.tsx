import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";

// Đọc cùng dữ liệu với trang tiếng Việt (/tin-tuc) để hai ngôn ngữ luôn đồng
// bộ — không còn mảng viết cứng riêng cho tiếng Anh. Field "<key>_en" (nhập
// ở /admin) được ưu tiên hiển thị; nếu bài viết chưa có bản dịch, tạm hiển
// thị bản tiếng Việt để trang không bị trống.
export const dynamic = "force-dynamic";

export default function NewsPageEn() {
  const news = getCollection("news");

  return (
    <PtscShell title="News" description="Latest news and updates from PTSC.">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {news.map((item) => {
            const title = item.title_en || item.title;
            const category = item.category_en || item.category;
            return (
              <article key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                {item.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" className="mb-4 h-40 w-full rounded-2xl object-cover" />
                )}
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{category}</p>
                <Link
                  href={`/en-US/news/${item.id}`}
                  className="mt-3 block text-lg font-semibold text-slate-900 transition hover:text-cyan-700"
                >
                  {title}
                </Link>
                <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
                  <p>{item.date}</p>
                  <span aria-hidden>·</span>
                  <ArticleViewCount id={item.id} mode="display" />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PtscShell>
  );
}
