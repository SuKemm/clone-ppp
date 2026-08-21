import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";
import { ArticleViewCount } from "@/components/ArticleViewCount";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Logo công ty — luôn dùng làm ảnh đại diện cho mọi bài Quan hệ cổ đông,
// đồng bộ với danh sách (xem src/app/co-dong/page.tsx và schema.ts: mục này
// không cho admin chọn ảnh riêng để tránh gắn nhầm ảnh không liên quan).
const LOGO = "/images/ptsc/logo-ptsc.png";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = getCollection("shareholder-relations").find((n) => n.id === id);
  if (!item) return {};

  return { title: item.title, description: item.excerpt || undefined };
}

export default async function ShareholderRelationDetailPage({ params }: Params) {
  const { id } = await params;
  const item = getCollection("shareholder-relations").find((n) => n.id === id);

  if (!item) notFound();

  // Nội dung đầy đủ nhập ở /admin qua trình soạn thảo TinyMCE, lưu sẵn dạng
  // HTML — hiển thị thẳng ra trang, giống cách trang chi tiết Tin tức đang làm.
  const contentHtml = item.content || "";

  return (
    <PtscShell title={item.title} description={item.excerpt || ""}>
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/co-dong" className="text-sm font-semibold text-cyan-700 hover:underline">
            ← Quay lại Quan hệ cổ đông
          </Link>
          <ArticleViewCount id={item.id} mode="increment" className="text-sm text-slate-500" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Petrovietnam Power" className="mx-auto mt-8 h-32 w-auto object-contain" />

        <h1 className="mt-8 text-3xl font-bold text-slate-900 sm:text-4xl">{item.title}</h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
          {item.category}{" "}
          <span className="font-normal normal-case text-slate-400">
            ({item.date || "cập nhật gần nhất"})
          </span>
        </p>

        {item.attachment && (
          <a
            href={item.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
          >
            📄 Tải xuống PDF
          </a>
        )}

        <div className="prose prose-slate mt-8 max-w-none">
          {contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : item.excerpt ? (
            <p className="text-lg leading-8 text-slate-700">{item.excerpt}</p>
          ) : (
            <p className="text-slate-500">Bài viết chưa có nội dung chi tiết.</p>
          )}
        </div>
      </section>
    </PtscShell>
  );
}
