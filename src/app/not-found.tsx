import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";

// Trang 404 tuỳ biến cho bản tiếng Việt (mọi route không nằm trong /en-US).
// Next.js App Router tự dùng file not-found.tsx gần nhất với route bị lỗi —
// xem thêm src/app/en-US/not-found.tsx cho bản tiếng Anh.
export default function NotFound() {
  return (
    <PtscShell>
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">
          Lỗi 404
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
          Không tìm thấy trang
        </h1>
        <p className="mt-4 max-w-xl text-slate-600">
          Trang bạn đang tìm không tồn tại hoặc đã bị gỡ bỏ. Vui lòng kiểm tra
          lại đường dẫn, hoặc quay về trang chủ.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            Về trang chủ
          </Link>
          <Link
            href="/tin-tuc"
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-700"
          >
            Xem tin tức
          </Link>
        </div>
      </section>
    </PtscShell>
  );
}
