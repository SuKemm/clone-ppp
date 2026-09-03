import type { Metadata } from "next";
import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // always read the latest admin data, no static caching

export const metadata: Metadata = {
  title: "Featured Notices — Dakdrinh Hydropower Joint Stock Company",
};

// English counterpart of src/app/thong-bao/page.tsx — full list of
// "Thông báo nổi bật", linked from the "View all" arrow on the English
// homepage's Featured Notices box. Same "site-notices" collection as the
// Vietnamese page, just preferring the "_en" fields when filled in.
export default function EnNoticePage() {
  const siteNotices = getCollection("site-notices");

  return (
    <PtscShell>
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900">
          Featured Notices
        </h1>

        {siteNotices.length === 0 ? (
          <p className="mt-10 text-center text-slate-500">No notices yet.</p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {siteNotices.map((notice) => {
              const content = (
                <div className="h-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition hover:-translate-y-0.5 hover:shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-cyan-700">
                    Notice
                  </span>
                  <p className="mt-1.5 break-words text-sm font-semibold leading-5 text-slate-900">
                    {notice.tieu_de_en || notice.tieu_de}
                  </p>
                  {(notice.mo_ta_en || notice.mo_ta) && (
                    <p className="mt-2 break-words text-sm leading-5 text-slate-600">
                      {notice.mo_ta_en || notice.mo_ta}
                    </p>
                  )}
                </div>
              );
              // Prefer "Đường dẫn khi bấm vào" if the admin filled it in;
              // otherwise fall back to the uploaded attachment (PDF...).
              const href = notice.lien_ket || notice.file || "";
              return href ? (
                <a
                  key={notice.id}
                  href={href}
                  target={notice.lien_ket ? undefined : "_blank"}
                  rel={notice.lien_ket ? undefined : "noopener noreferrer"}
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={notice.id}>{content}</div>
              );
            })}
          </div>
        )}
      </section>
    </PtscShell>
  );
}
