import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";

// Custom 404 page for the English section (/en-US/*). Next.js App Router
// renders whichever not-found.tsx is closest to the failing route — see
// src/app/not-found.tsx for the Vietnamese version.
export default function NotFoundEn() {
  return (
    <PtscShell>
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">
          404 Error
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-slate-600">
          The page you are looking for doesn&apos;t exist or has been moved.
          Please check the URL, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/en-US"
            className="rounded-lg bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            Back to home
          </Link>
          <Link
            href="/en-US/news"
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-700"
          >
            View news
          </Link>
        </div>
      </section>
    </PtscShell>
  );
}
