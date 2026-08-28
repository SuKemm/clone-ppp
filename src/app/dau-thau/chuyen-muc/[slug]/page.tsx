import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { slugify } from "@/lib/slug";
import { TendersListView } from "../../TendersListView";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> };

function findCategoryBySlug(slug: string): string | undefined {
  const tenders = getCollection("tenders");
  const categories = Array.from(new Set(tenders.map((item) => item.category).filter(Boolean)));
  return categories.find((c) => slugify(c) === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  if (!category) return {};
  return { title: category };
}

export default async function TendersCategoryPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { page } = await searchParams;
  const category = findCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <PtscShell title={category}>
      <TendersListView
        activeCategory={category}
        basePath={`/dau-thau/chuyen-muc/${slug}`}
        page={page ? Number(page) : undefined}
      />
    </PtscShell>
  );
}
