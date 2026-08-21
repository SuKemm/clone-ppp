"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
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
  attachment?: string;
};

export type SrTab = {
  key: string;
  label: string;
  articles: SrArticle[];
};

export type SrVideoItem = {
  title: string;
  image?: string;
};

export function ShareholderRelations({
  tabs,
  sidebarTitle,
  sidebarItems,
  videoSectionTitle,
  videoItems = [],
  videoLinkHref = "/dich-vu#thu-vien-video",
  isEnglish = false,
  detailBasePath = "/co-dong",
}: {
  tabs: SrTab[];
  sidebarTitle: string;
  sidebarItems: { id: string; image: string; title: string }[];
  videoSectionTitle?: string;
  videoItems?: SrVideoItem[];
  videoLinkHref?: string;
  isEnglish?: boolean;
  detailBasePath?: string;
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

  // Giống pvpower.vn: bài ĐẦU TIÊN của toàn bộ tab (không phải đầu mỗi
  // trang) được tách ra hiện dạng "nổi bật" — logo to, tiêu đề lớn. Vì
  // pageArticles ở trang 1 luôn chứa đúng bài đầu tab tại vị trí [0], chỉ
  // cần tách nó ra khi đang ở trang 1; các bài còn lại xếp dạng lưới 2 cột.
  const isFirstPage = currentPage === 1;
  const featuredArticle = isFirstPage ? pageArticles[0] : undefined;
  const gridArticles = isFirstPage ? pageArticles.slice(1) : pageArticles;

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
          {/* Bài nổi bật — chỉ hiện ở trang 1 của mỗi tab */}
          {featuredArticle && (
            <article className="border-b border-slate-100 pb-8 text-center sm:text-left">
              <div className="mx-auto flex h-56 w-full max-w-sm items-center justify-center overflow-hidden rounded-lg bg-white sm:mx-0">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="h-full w-full object-contain p-4"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold leading-snug text-slate-900 transition hover:text-cyan-700 sm:text-2xl">
                  <Link href={`${detailBasePath}/${featuredArticle.id}`}>{featuredArticle.title}</Link>
                </h2>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                  {featuredArticle.category}{" "}
                  <span className="font-normal normal-case italic text-slate-400">
                    ({featuredArticle.date})
                  </span>
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{featuredArticle.excerpt}</p>
                {featuredArticle.attachment && (
                  <a
                    href={featuredArticle.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-100"
                  >
                    📄 {isEnglish ? "Download PDF" : "Tải xuống PDF"}
                  </a>
                )}
                <ArticleViewCount
                  id={featuredArticle.id}
                  mode="display"
                  className="mt-2 text-xs text-slate-400"
                  isEnglish={isEnglish}
                />
              </div>
            </article>
          )}

          {/* Các bài còn lại — lưới 2 cột, giống trang danh sách của
              pvpower.vn (mỗi thẻ: logo, tiêu đề, danh mục+ngày, tóm tắt) */}
          {gridArticles.length > 0 && (
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {gridArticles.map((article) => (
                <article key={article.id}>
                  <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-white">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-contain p-3"
                    />
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-slate-900 transition hover:text-cyan-700">
                    <Link href={`${detailBasePath}/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                    {article.category}{" "}
                    <span className="font-normal normal-case italic text-slate-400">
                      ({article.date})
                    </span>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{article.excerpt}</p>
                  {article.attachment && (
                    <a
                      href={article.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-100"
                    >
                      📄 {isEnglish ? "Download PDF" : "Tải xuống PDF"}
                    </a>
                  )}
                  <ArticleViewCount
                    id={article.id}
                    mode="display"
                    className="mt-2 text-xs text-slate-400"
                    isEnglish={isEnglish}
                  />
                </article>
              ))}
            </div>
          )}

          {!featuredArticle && gridArticles.length === 0 && (
            <p className="text-slate-500">
              {isEnglish ? "No documents yet." : "Chưa có tài liệu nào trong mục này."}
            </p>
          )}

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
              <li key={item.id} className="flex gap-3">
                <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <Link
                  href={`${detailBasePath}/${item.id}`}
                  className="text-sm font-medium leading-snug text-slate-700 transition hover:text-cyan-700"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Video nổi bật — lấy từ Admin > Thư viện video, không có trang
              chi tiết riêng nên bấm vào sẽ tới thẳng mục Thư viện video. */}
          {videoItems.length > 0 && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                {videoSectionTitle ?? (isEnglish ? "Featured Videos" : "Video nổi bật")}
              </h3>
              <ul className="mt-5 space-y-5">
                {videoItems.map((video) => (
                  <li key={video.title}>
                    <Link
                      href={videoLinkHref}
                      className="text-sm font-medium leading-snug text-slate-700 transition hover:text-cyan-700"
                    >
                      {video.title}
                    </Link>
                    <Link
                      href={videoLinkHref}
                      className="group relative mt-2 flex h-28 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-800"
                    >
                      {video.image ? (
                        <img
                          src={video.image}
                          alt={video.title}
                          className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                        />
                      ) : null}
                      <span className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 transition group-hover:bg-white">
                        <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
