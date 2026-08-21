"use client";

import Link from "next/link";
import { ArrowUp, ArrowDown, Home } from "lucide-react";

// Thanh điều hướng nổi bên phải màn hình — dùng chung được cho mọi trang,
// hiện tại gắn ở trang Tin tức – Sự kiện theo yêu cầu. Ẩn khi in ấn
// (print:hidden) vì chỉ có ý nghĩa khi thao tác trên màn hình.
export function FloatingNav() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const buttonClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md shadow-slate-900/5 transition hover:border-cyan-600 hover:text-cyan-700";

  return (
    <div className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2.5 print:hidden sm:right-5 lg:right-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Lên đầu trang"
        title="Lên đầu trang"
        className={buttonClass}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <Link href="/" aria-label="Trang chủ" title="Trang chủ" className={buttonClass}>
        <Home className="h-5 w-5" />
      </Link>
      <button
        type="button"
        onClick={scrollToBottom}
        aria-label="Xuống cuối trang"
        title="Xuống cuối trang"
        className={buttonClass}
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </div>
  );
}
