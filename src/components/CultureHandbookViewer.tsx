"use client";

import { useEffect, useState } from "react";
import type { HandbookPage } from "@/data/culture-handbook";

export function CultureHandbookViewer({
  pages,
  isEnglish,
}: {
  pages: HandbookPage[];
  isEnglish: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);

  function next() {
    setIndex((i) => (i === null ? null : (i + 1) % pages.length));
  }
  function prev() {
    setIndex((i) => (i === null ? null : (i - 1 + pages.length) % pages.length));
  }
  function close() {
    setIndex(null);
  }

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {pages.map((page, i) => (
          <button
            key={page.image + i}
            type="button"
            onClick={() => setIndex(i)}
            className="group block overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm transition hover:shadow-md"
          >
            <div className="aspect-[3/4] w-full overflow-hidden">
              <img
                src={page.image}
                alt={isEnglish ? page.captionEn : page.caption}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <p className="px-3 py-2 text-left text-xs font-medium text-slate-600">
              {isEnglish ? page.captionEn : page.caption}
            </p>
          </button>
        ))}
      </div>

      {index !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:left-6"
          >
            ‹
          </button>
          <div
            className="flex max-h-[85vh] max-w-3xl flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={pages[index].image}
              alt={isEnglish ? pages[index].captionEn : pages[index].caption}
              className="max-h-[75vh] w-auto rounded-md object-contain shadow-2xl"
            />
            <p className="text-center text-sm text-slate-200">
              {isEnglish ? pages[index].captionEn : pages[index].caption}{" "}
              <span className="text-slate-400">
                ({index + 1}/{pages.length})
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:right-6"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
