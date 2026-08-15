"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type SrArticle = {
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
}: {
  tabs: SrTab[];
  sidebarTitle: string;
  sidebarItems: { image: string; title: string }[];
}) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key);
  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];

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
          {active?.articles.map((article) => (
            <article
              key={article.title}
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
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="h-fit rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-6">
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
