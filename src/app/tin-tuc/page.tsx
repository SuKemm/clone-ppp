import Link from "next/link";
import { Newspaper, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

const PAGE_SIZE = 9; // số bài / trang (trang 1 gồm 1 bài nổi bật + 8 bài lưới)

// Ảnh placeholder khi bài viết chưa có ảnh minh hoạ — dùng gradient + icon
// thay vì để trống, giữ layout đều và đẹp hơn.
function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-cyan-600 via-sky-700 to-slate-900 ${className}`}
    >
      <Newspaper className="h-8 w-8 text-white/70" strokeWidth={1.25} />
    </div>
  );
}

// Sinh danh sách số trang kiểu "1 2 3 ... 10", ẩn bớt số ở giữa khi có
// nhiều trang để thanh phân trang không bị quá dài.
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const result: (number | "...")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("...");
    result.push(p);
  });
  return result;
}

function buildHref(category: string, page: number) {
  const params = new URLSearchParams();
  if (category !== "Tất cả") params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/tin-tuc?${qs}` : "/tin-tuc";
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page: pageParam } = await searchParams;
  const news = getCollection("news");

  // Danh sách chuyên mục (tab) — lấy từ chính dữ liệu bài viết, giữ đúng thứ
  // tự xuất hiện lần đầu, không cần khai báo cứng ở đâu khác.
  // Danh mục cố định (hiển thị luôn dù chưa có bài trong danh mục đó), theo
  // đúng thứ tự chuẩn của trang PV Power DHC gốc. Nếu admin thêm chuyên mục
  // khác ngoài danh sách này, nó sẽ được nối thêm vào cuối tự động.
  const dataCategories = Array.from(new Set(news.map((item) => item.category).filter(Boolean)));
  const extraCategories = dataCategories.filter((c) => !CANONICAL_CATEGORIES.includes(c));
  const categories = [...CANONICAL_CATEGORIES, ...extraCategories];
  const tabs = ["Tất cả", ...categories];
  const activeTab = category && categories.includes(category) ? category : "Tất cả";

  const filtered = activeTab === "Tất cả" ? news : news.filter((item) => item.category === activeTab);

  // Phân trang
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requestedPage = Number(pageParam) || 1;
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIdx, startIdx + PAGE_SIZE);
  const featured = page === 1 ? pageItems[0] : undefined;
  const rest = page === 1 ? pageItems.slice(1) : pageItems;

  // Sidebar "Tin nổi bật" — 5 bài mới nhất trong toàn bộ danh sách (không lọc
  // theo tab/trang) để luôn có nội dung điều hướng sang các bài khác.
  const sidebarItems = news.slice(0, 5);

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <PtscShell>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900">
          Tin tức &ndash; Sự kiện
        </h1>

        {/* Tabs chuyên mục */}
        <div className="mt-6 flex gap-8 overflow-x-auto border-b border-slate-200">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            const href = buildHref(tab, 1);
            return (
              <Link
                key={tab}
                href={href}
                className={`-mb-px whitespace-nowrap border-b-2 pb-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-cyan-600 text-cyan-700"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-slate-500">Chưa có tin tức nào trong chuyên mục này.</p>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Cột nội dung chính */}
          <div>
            {featured && (
              <article className="group">
                <Link href={`/tin-tuc/${featured.id}`}>
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
                    {featured.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featured.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <ImagePlaceholder className="h-full w-full" />
                    )}
                  </div>
                  <h2 className="mt-5 text-2xl font-bold leading-snug text-slate-900 transition group-hover:text-cyan-700">
                    {featured.title}
                  </h2>
                </Link>
                <p className="mt-2 text-sm">
                  <Link
                    href={buildHref(featured.category, 1)}
                    className="font-semibold text-cyan-700 hover:underline"
                  >
                    {featured.category}
                  </Link>{" "}
                  <span className="italic text-slate-500">({featured.date})</span>
                </p>
                {featured.excerpt && <p className="mt-3 text-slate-600">{featured.excerpt}</p>}
                <div className="mt-3">
                  <ArticleViewCount id={featured.id} mode="display" className="text-xs text-slate-400" />
                </div>
              </article>
            )}

            {/* Lưới các bài còn lại */}
            {rest.length > 0 && (
              <div
                className={`grid gap-x-8 gap-y-10 sm:grid-cols-2 ${featured ? "mt-10" : ""}`}
              >
                {rest.map((item) => (
                  <article key={item.id} className="group">
                    <Link href={`/tin-tuc/${item.id}`}>
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl">
                        {item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image}
                            alt=""
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <ImagePlaceholder className="h-full w-full" />
                        )}
                      </div>
                      <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900 transition group-hover:text-cyan-700">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="mt-1.5 text-sm">
                      <Link
                        href={buildHref(item.category, 1)}
                        className="font-semibold text-cyan-700 hover:underline"
                      >
                        {item.category}
                      </Link>{" "}
                      <span className="italic text-slate-500">({item.date})</span>
                    </p>
                    {item.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.excerpt}</p>
                    )}
                  </article>
                ))}
              </div>
            )}

            {/* Phân trang */}
            {totalPages > 1 && (
              <nav
                aria-label="Phân trang tin tức"
                className="mt-14 flex flex-wrap items-center justify-center gap-2"
              >
                <Link
                  href={buildHref(activeTab, Math.max(1, page - 1))}
                  aria-disabled={page === 1}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition ${
                    page === 1
                      ? "pointer-events-none border-slate-200 text-slate-300"
                      : "border-slate-200 text-slate-500 hover:border-cyan-600 hover:text-cyan-700"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Trang trước</span>
                </Link>

                {pageNumbers.map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="flex h-10 w-10 items-center justify-center text-sm text-slate-400"
                    >
                      &hellip;
                    </span>
                  ) : (
                    <Link
                      key={p}
                      href={buildHref(activeTab, p)}
                      aria-current={p === page ? "page" : undefined}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                        p === page
                          ? "border-cyan-700 bg-cyan-700 text-white"
                          : "border-slate-200 text-slate-600 hover:border-cyan-600 hover:text-cyan-700"
                      }`}
                    >
                      {p}
                    </Link>
                  )
                )}

                <Link
                  href={buildHref(activeTab, Math.min(totalPages, page + 1))}
                  aria-disabled={page === totalPages}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition ${
                    page === totalPages
                      ? "pointer-events-none border-slate-200 text-slate-300"
                      : "border-slate-200 text-slate-500 hover:border-cyan-600 hover:text-cyan-700"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Trang sau</span>
                </Link>
              </nav>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="border-b border-slate-200 pb-3 text-base font-bold uppercase tracking-wide text-slate-900">
              Tin nổi bật
            </h2>
            <div className="mt-5 space-y-5">
              {sidebarItems.length === 0 && (
                <p className="text-sm text-slate-500">Chưa có bài viết nào.</p>
              )}
              {sidebarItems.map((item) => (
                <Link key={item.id} href={`/tin-tuc/${item.id}`} className="group flex gap-3">
                  <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <ImagePlaceholder className="h-full w-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-3 text-sm font-semibold leading-snug text-slate-800 transition group-hover:text-cyan-700">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{item.date}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/tin-tuc"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:underline"
            >
              Xem tất cả tin tức
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </aside>
        </div>
      </section>
    </PtscShell>
  );
}
