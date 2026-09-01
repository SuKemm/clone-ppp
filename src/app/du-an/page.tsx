import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Số dự án hiển thị mỗi trang — cùng cơ chế phân trang với /tin-tuc và
// /dau-thau (xem getPageNumbers/buildHref bên dưới, sao chép từ 2 trang đó).
const PAGE_SIZE = 8;

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

function buildHref(page: number) {
  return page > 1 ? `/du-an?page=${page}` : "/du-an";
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const projects = getCollection("projects");

  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
  const requestedPage = Number(pageParam) || 1;
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageItems = projects.slice(startIdx, startIdx + PAGE_SIZE);
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <PtscShell
      title="Dự án"
      description="Các dự án của PTSC là minh chứng cho năng lực kỹ thuật, quản lý vận hành và chất lượng công trình quốc tế."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {projects.length === 0 && (
          <p className="text-center text-slate-500">Chưa có dự án nào.</p>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {pageItems.map((project) => (
            <article key={project.id} className="group rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <Link href={`/du-an/${project.id}`}>
                {project.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt=""
                    className="mb-6 h-48 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                )}
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">{project.category}</p>
                <h2 className="mt-4 break-words text-2xl font-semibold text-slate-900 transition group-hover:text-cyan-700">
                  {project.title}
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{project.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-cyan-700">Đọc bài viết →</span>
              </Link>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <nav aria-label="Phân trang dự án" className="mt-14 flex flex-wrap items-center justify-center gap-2">
            <Link
              href={buildHref(Math.max(1, page - 1))}
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
                <span key={`ellipsis-${i}`} className="flex h-10 w-10 items-center justify-center text-sm text-slate-400">
                  &hellip;
                </span>
              ) : (
                <Link
                  key={p}
                  href={buildHref(p)}
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
              href={buildHref(Math.min(totalPages, page + 1))}
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
      </section>
    </PtscShell>
  );
}
