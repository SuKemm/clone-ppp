import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { PageHeader } from "@/components/PageHeader";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = getCollection("projects").find((p) => p.id === id);
  if (!item) return {};

  return { title: item.title, description: item.description || undefined };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { id } = await params;
  const projects = getCollection("projects");
  const item = projects.find((p) => p.id === id);

  if (!item) notFound();

  // Nội dung đầy đủ nhập ở /admin qua trình soạn thảo TinyMCE, lưu sẵn dạng
  // HTML — giống cách trang chi tiết tin tức (/tin-tuc/[id]) đang hiển thị.
  const contentHtml = item.content || "";

  // Các dự án khác — hiện tối đa 4 dự án còn lại để điều hướng sang bài
  // khác, giống khối gợi ý ở các trang chi tiết khác của site.
  const otherProjects = projects.filter((p) => p.id !== item.id).slice(0, 4);

  return (
    <PtscShell title={item.title} description={item.description || ""}>
      <PageHeader
        title={item.title}
        crumbs={[
          { label: "Dự án", href: "/du-an" },
          { label: item.category || item.title },
        ]}
      />
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 max-w-3xl">
            <Link href="/du-an" className="text-sm font-semibold text-cyan-700 hover:underline">
              ← Quay lại danh sách dự án
            </Link>

            <h2 className="mt-6 break-words text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
              {item.title}
            </h2>

            {item.category && (
              <p className="mt-3 break-words text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                {item.category}
              </p>
            )}

            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt=""
                className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover"
              />
            )}

            {/* prose = @tailwindcss/typography, style cho nội dung HTML nhập
                từ TinyMCE ở admin — giống trang chi tiết tin tức. */}
            <div
              className="prose prose-slate mt-8 max-w-none break-words
                [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto
                [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:aspect-video"
            >
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : item.description ? (
                <p className="text-lg leading-8 text-slate-700">{item.description}</p>
              ) : (
                <p className="text-slate-500">Bài viết chưa có nội dung chi tiết.</p>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="border-b border-slate-200 pb-3 text-base font-bold uppercase tracking-wide text-slate-900">
              Dự án khác
            </h2>
            <div className="mt-5 space-y-5">
              {otherProjects.length === 0 && (
                <p className="text-sm text-slate-500">Chưa có dự án nào khác.</p>
              )}
              {otherProjects.map((p) => (
                <Link key={p.id} href={`/du-an/${p.id}`} className="group flex gap-3">
                  <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-3 text-sm font-semibold leading-snug text-slate-800 transition group-hover:text-cyan-700">
                      {p.title}
                    </p>
                    {p.category && <p className="mt-1 text-xs text-slate-400">{p.category}</p>}
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/du-an" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:underline">
              Xem tất cả dự án →
            </Link>
          </aside>
        </div>
      </section>
    </PtscShell>
  );
}
