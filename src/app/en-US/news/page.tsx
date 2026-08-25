import Link from "next/link";
import type { Metadata } from "next";
import {
  Newspaper,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection, type CmsItem } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";
import { formatNewsDateTime } from "@/lib/format-date";

// Đọc cùng dữ liệu với trang tiếng Việt (/tin-tuc)
export const dynamic = "force-dynamic";

// Ghi đè metadata tiếng Việt mặc định ở layout gốc.
export const metadata: Metadata = {
  title: "News & Events",
  description: "Latest news and events from Dakdrinh Hydropower Joint Stock Company.",
};

const PAGE_SIZE = 9;

// Ảnh placeholder khi bài viết chưa có ảnh
function ImagePlaceholder({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-cyan-600 via-sky-700 to-slate-900 ${className}`}
    >
      <Newspaper
        className="h-8 w-8 text-white/70"
        strokeWidth={1.25}
      />
    </div>
  );
}

// Sinh danh sách số trang
function getPageNumbers(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) {
    return Array.from(
      { length: total },
      (_, i) => i + 1
    );
  }

  const pages = new Set<number>([
    1,
    2,
    total - 1,
    total,
    current - 1,
    current,
    current + 1,
  ]);

  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | "...")[] = [];

  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) {
      result.push("...");
    }

    result.push(p);
  });

  return result;
}

// Tạo URL theo category và trang
function buildHref(category: string, page: number) {
  const params = new URLSearchParams();

  if (category !== "All") {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const qs = params.toString();

  return qs
    ? `/en-US/news?${qs}`
    : "/en-US/news";
}

export default async function NewsPageEn({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}) {
  // Chỉ khai báo 1 lần
  const { category, page: pageParam } =
    await searchParams;

  // Lấy dữ liệu từ Admin và ưu tiên nội dung tiếng Anh
  const news = getCollection("news").map(
    (item): CmsItem => ({
      ...item,
      title: item.title_en || item.title,
      category: item.category_en || item.category,
      excerpt: item.excerpt_en || item.excerpt,
    })
  );

  // Lấy danh mục trực tiếp từ dữ liệu bài viết do Admin tạo
  const categories = Array.from(
    new Set(
      news
        .map((item) => item.category)
        .filter(Boolean)
    )
  );

  // Danh mục từ Admin (không hiển thị tab "All" nữa)
  const tabs = categories;

  // Xác định tab hiện tại
  const activeTab =
    category && categories.includes(category)
      ? category
      : "All";

  // Lọc bài viết theo danh mục
  const filtered =
    activeTab === "All"
      ? news
      : news.filter(
          (item) => item.category === activeTab
        );

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const requestedPage =
    Number(pageParam) || 1;

  const page = Math.min(
    Math.max(1, requestedPage),
    totalPages
  );

  const startIdx =
    (page - 1) * PAGE_SIZE;

  const pageItems = filtered.slice(
    startIdx,
    startIdx + PAGE_SIZE
  );

  const featured =
    page === 1
      ? pageItems[0]
      : undefined;

  const rest =
    page === 1
      ? pageItems.slice(1)
      : pageItems;

  // Sidebar Most read
  const sidebarItems = news.slice(0, 5);

  const pageNumbers =
    getPageNumbers(page, totalPages);

  return (
    <PtscShell>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900">
          News &amp; Events
        </h1>

        {/* Category tabs */}
        <div className="mt-6 flex gap-8 overflow-x-auto border-b border-slate-200">
          {tabs.map((tab) => {
            const isActive =
              tab === activeTab;

            const href =
              buildHref(tab, 1);

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
          <p className="mt-10 text-center text-slate-500">
            No articles in this category yet.
          </p>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div>
            {featured && (
              <article className="group">
                <Link
                  href={`/en-US/news/${featured.id}`}
                >
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
                    href={buildHref(
                      featured.category,
                      1
                    )}
                    className="font-semibold text-cyan-700 hover:underline"
                  >
                    {featured.category}
                  </Link>{" "}

                  <span className="italic text-slate-500">
                    ({formatNewsDateTime(featured.date, featured.gio, "en")})
                  </span>
                </p>

                {featured.excerpt && (
                  <p className="mt-3 text-slate-600">
                    {featured.excerpt}
                  </p>
                )}

                <div className="mt-3">
                  <ArticleViewCount
                    id={featured.id}
                    mode="display"
                    className="text-xs text-slate-400"
                    isEnglish
                  />
                </div>
              </article>
            )}

            {/* Remaining articles grid */}
            {rest.length > 0 && (
              <div
                className={`grid gap-x-8 gap-y-10 sm:grid-cols-2 ${
                  featured
                    ? "mt-10"
                    : ""
                }`}
              >
                {rest.map((item) => (
                  <article
                    key={item.id}
                    className="group"
                  >
                    <Link
                      href={`/en-US/news/${item.id}`}
                    >
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
                        href={buildHref(
                          item.category,
                          1
                        )}
                        className="font-semibold text-cyan-700 hover:underline"
                      >
                        {item.category}
                      </Link>{" "}

                      <span className="italic text-slate-500">
                        ({formatNewsDateTime(item.date, item.gio, "en")})
                      </span>
                    </p>

                    {item.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {item.excerpt}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="News pagination"
                className="mt-14 flex flex-wrap items-center justify-center gap-2"
              >
                {/* Previous */}
                <Link
                  href={buildHref(
                    activeTab,
                    Math.max(1, page - 1)
                  )}
                  aria-disabled={page === 1}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition ${
                    page === 1
                      ? "pointer-events-none border-slate-200 text-slate-300"
                      : "border-slate-200 text-slate-500 hover:border-cyan-600 hover:text-cyan-700"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />

                  <span className="sr-only">
                    Previous page
                  </span>
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
                      href={buildHref(
                        activeTab,
                        p
                      )}
                      aria-current={
                        p === page
                          ? "page"
                          : undefined
                      }
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

                {/* Next */}
                <Link
                  href={buildHref(
                    activeTab,
                    Math.min(
                      totalPages,
                      page + 1
                    )
                  )}
                  aria-disabled={
                    page === totalPages
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition ${
                    page === totalPages
                      ? "pointer-events-none border-slate-200 text-slate-300"
                      : "border-slate-200 text-slate-500 hover:border-cyan-600 hover:text-cyan-700"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />

                  <span className="sr-only">
                    Next page
                  </span>
                </Link>
              </nav>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="border-b border-slate-200 pb-3 text-base font-bold uppercase tracking-wide text-slate-900">
              Most read
            </h2>

            <div className="mt-5 space-y-5">
              {sidebarItems.length === 0 && (
                <p className="text-sm text-slate-500">
                  No articles yet.
                </p>
              )}

              {sidebarItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/en-US/news/${item.id}`}
                  className="group flex gap-3"
                >
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

                    <p className="mt-1 text-xs text-slate-400">
                      {formatNewsDateTime(item.date, item.gio, "en")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/en-US/news"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:underline"
            >
              View all news

              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </aside>
        </div>
      </section>
    </PtscShell>
  );
}