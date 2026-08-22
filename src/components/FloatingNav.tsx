"use client";

import Link from "next/link";
import { ArrowUp, ArrowDown, Home } from "lucide-react";

// Thanh điều hướng nổi bên phải màn hình — dùng chung được cho mọi trang,
// hiện tại gắn ở trang Tin tức – Sự kiện theo yêu cầu. Ẩn khi in ấn
// (print:hidden) vì chỉ có ý nghĩa khi thao tác trên màn hình.
export function FloatingNav({ isEnglish = false }: { isEnglish?: boolean }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const buttonClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md shadow-slate-900/5 transition hover:border-cyan-600 hover:text-cyan-700";

  const labels = isEnglish
    ? { top: "Back to top", home: "Home", bottom: "Go to bottom" }
    : { top: "Lên đầu trang", home: "Trang chủ", bottom: "Xuống cuối trang" };

  return (
    <div className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2.5 print:hidden sm:right-5 lg:right-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={labels.top}
        title={labels.top}
        className={buttonClass}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <Link
        href={isEnglish ? "/en-US" : "/"}
        aria-label={labels.home}
        title={labels.home}
        className={buttonClass}
      >
        <Home className="h-5 w-5" />
      </Link>
      <button
        type="button"
        onClick={scrollToBottom}
        aria-label={labels.bottom}
        title={labels.bottom}
        className={buttonClass}
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </div>
  );
}
