"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ArticleViewCount } from "@/components/ArticleViewCount";

const PAGE_SIZE = 5; // số bài / trang trong mỗi tab

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

export type SrArticle = {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

export type SrTab = {
  key: string;
  label: string;
  articles: SrArticle[];
};

export function ShareholderRelations({
  tabs,
  sidebarTitle,
  sidebarItems,
  isEnglish = false,
}: {
  tabs: SrTab[];
  sidebarTitle: string;
  sidebarItems: { image: string; title: string }[];
  isEnglish?: boolean;
}) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key);
  const [page, setPage] = useState(1);
  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  const totalPages = Math.max(1, Math.ceil((active?.articles.length ?? 0) / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageArticles = active?.articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  ) ?? [];
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  // Cho phép menu điều hướng liên kết thẳng tới 1 tab cụ thể qua URL hash,
  // ví dụ /co-dong#dai-hoi sẽ tự mở tab "Đại hội cổ đông" khi vào trang.
  useEffect(() => {
    const applyHash = () => {
      const key = window.location.hash.replace("#", "");
      if (tabs.some((t) => t.key === key)) {
        setActiveKey(key);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              setActiveKey(tab.key);
              setPage(1);
              window.history.replaceState(null, "", `#${tab.key}`);
            }}
            className={`relative pb-4 text-sm font-semibold uppercase tracking-wide transition ${
              activeKey === tab.key
                ? "text-cyan-700"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
            {activeKey === tab.key ? (
              <span className="absolute inset-x-0 -bottom-px h-[2px] bg-cyan-600" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Article list */}
        <div className="space-y-8">
          {pageArticles.map((article) => (
            <article
              key={article.id}
              className="grid gap-5 border-b border-slate-100 pb-8 last:border-0 sm:grid-cols-[220px_1fr]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                  {article.category}{" "}
                  <span className="font-normal text-slate-400">
                    ({article.date})
                  </span>
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900 transition hover:text-cyan-700">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {article.excerpt}
                </p>
                <ArticleViewCount
                  id={article.id}
                  mode="display"
                  className="mt-2 text-xs text-slate-400"
                  isEnglish={isEnglish}
                />
              </div>
            </article>
          ))}

          {/* Phân trang */}
          {totalPages > 1 && (
            <nav
              aria-label={isEnglish ? "Document pagination" : "Phân trang tài liệu"}
              className="flex flex-wrap items-center justify-center gap-2 pt-2"
            >
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition ${
                  currentPage === 1
                    ? "cursor-not-allowed border-slate-200 text-slate-300"
                    : "border-slate-200 text-slate-500 hover:border-cyan-600 hover:text-cyan-700"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">{isEnglish ? "Previous page" : "Trang trước"}</span>
              </button>

              {pageNumbers.map((p, i) =>
                p === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="flex h-10 w-10 items-center justify-center text-sm text-slate-400"
                  >
                    &hellip;
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                      p === currentPage
                        ? "border-cyan-700 bg-cyan-700 text-white"
                        : "border-slate-200 text-slate-600 hover:border-cyan-600 hover:text-cyan-700"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition ${
                  currentPage === totalPages
                    ? "cursor-not-allowed border-slate-200 text-slate-300"
                    : "border-slate-200 text-slate-500 hover:border-cyan-600 hover:text-cyan-700"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">{isEnglish ? "Next page" : "Trang sau"}</span>
              </button>
            </nav>
          )}
        </div>

        {/* Sidebar */}
        <aside className="h-fit rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-6 lg:sticky lg:top-24 lg:self-start">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            {sidebarTitle}
          </h3>
          <ul className="mt-5 space-y-4">
            {sidebarItems.map((item) => (
              <li key={item.title} className="flex gap-3">
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-md bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <Link
                  href="#"
                  className="text-sm font-medium leading-snug text-slate-700 transition hover:text-cyan-700"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
