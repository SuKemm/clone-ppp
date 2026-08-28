import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { formatNewsDateTime } from "@/lib/format-date";
import { Breadcrumb } from "@/components/Breadcrumb";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

const LOGO = "/images/ptsc/logo-ptsc.png";

type Params = { params: Promise<{ slug: string }> };

function findCategoryBySlug(slug: string): string | undefined {
  const categories = getCollection("shareholder-categories");
  return categories.find((c) => slugify(c.name) === slug)?.name;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  if (!category) return {};
  return { title: category };
}

export default async function ShareholderCategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);

  if (!category) notFound();

  const items = getCollection("shareholder-relations").filter((item) => item.category === category);

  return (
    <PtscShell title={category}>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Breadcrumb items={[{ label: "Quan hệ cổ đông", href: "/co-dong" }, { label: category }]} />
        <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900">{category}</h1>

        {items.length === 0 ? (
          <p className="mt-10 text-center text-slate-500">Chưa có bài viết nào trong chuyên mục này.</p>
        ) : (
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {items.map((item) => (
              <article key={item.id} className="group">
                <Link href={`/co-dong/${item.id}`}>
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || LOGO}
                      alt=""
                      className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 break-words text-lg font-semibold leading-snug text-slate-900 transition group-hover:text-cyan-700">
                    {item.title}
                  </h3>
                </Link>
                <p className="mt-1.5 text-sm italic text-slate-500">
                  {formatNewsDateTime(item.date) || "cập nhật gần nhất"}
                </p>
                {item.excerpt && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.excerpt}</p>}
              </article>
            ))}
          </div>
        )}

        <Link href="/co-dong" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:underline">
          ← Xem tất cả Quan hệ cổ đông
        </Link>
      </section>
    </PtscShell>
  );
}
