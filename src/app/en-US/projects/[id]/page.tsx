import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { PageHeader } from "@/components/PageHeader";
import { getCollection } from "@/lib/cms/store";

// Đồng bộ với bản tiếng Việt (src/app/du-an/[id]/page.tsx) — cùng đọc từ
// "projects", chỉ khác lấy các field "_en" (title_en, category_en,
// description_en, content_en) và đường link/nhãn đổi sang bản EN.
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = getCollection("projects").find((p) => p.id === id);
  if (!item) return {};

  return {
    title: item.title_en || item.title,
    description: item.description_en || item.description || undefined,
  };
}

export default async function ProjectDetailPageEn({ params }: Params) {
  const { id } = await params;
  const projects = getCollection("projects");
  const item = projects.find((p) => p.id === id);

  if (!item) notFound();

  const title = item.title_en || item.title;
  const category = item.category_en || item.category;
  const description = item.description_en || item.description || "";
  const contentHtml = item.content_en || item.content || "";

  const otherProjects = projects.filter((p) => p.id !== item.id).slice(0, 4);

  return (
    <PtscShell title={title} description={description}>
      <PageHeader
        title={title}
        crumbs={[
          { label: "Projects", href: "/en-US/projects" },
          { label: category || title },
        ]}
        homeHref="/en-US"
      />
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 max-w-3xl">
            <Link href="/en-US/projects" className="text-sm font-semibold text-cyan-700 hover:underline">
              ← Back to projects
            </Link>

            <h2 className="mt-6 break-words text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
              {title}
            </h2>

            {category && (
              <p className="mt-3 break-words text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                {category}
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

            <div
              className="prose prose-slate mt-8 max-w-none break-words
                [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto
                [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:aspect-video"
            >
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : description ? (
                <p className="text-lg leading-8 text-slate-700">{description}</p>
              ) : (
                <p className="text-slate-500">This project has no full content yet.</p>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="border-b border-slate-200 pb-3 text-base font-bold uppercase tracking-wide text-slate-900">
              Other projects
            </h2>
            <div className="mt-5 space-y-5">
              {otherProjects.length === 0 && (
                <p className="text-sm text-slate-500">No other projects yet.</p>
              )}
              {otherProjects.map((p) => (
                <Link key={p.id} href={`/en-US/projects/${p.id}`} className="group flex gap-3">
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
                      {p.title_en || p.title}
                    </p>
                    {(p.category_en || p.category) && (
                      <p className="mt-1 text-xs text-slate-400">{p.category_en || p.category}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/en-US/projects" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:underline">
              View all projects →
            </Link>
          </aside>
        </div>
      </section>
    </PtscShell>
  );
}
