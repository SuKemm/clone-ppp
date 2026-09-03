import { PtscShell } from "@/components/ptsc-shell";
import { getCollection } from "@/lib/cms/store";

export const dynamic = "force-dynamic"; // luôn đọc dữ liệu mới nhất từ admin, không cache trang static

// Trang danh sách đầy đủ "Thông báo nổi bật" — trang chủ chỉ hiện 4 thông
// báo mới nhất trong khung nhỏ, nút "Xem tất cả" ở đó dẫn sang đây để xem
// hết toàn bộ thông báo admin đã đăng ở /admin -> Khác -> "Thông báo nổi
// bật (trang chủ)".
export default function ThongBaoPage() {
  const siteNotices = getCollection("site-notices");

  return (
    <PtscShell>
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900">
          Thông báo nổi bật
        </h1>

        {siteNotices.length === 0 ? (
          <p className="mt-10 text-center text-slate-500">Chưa có thông báo nào.</p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {siteNotices.map((notice) => {
              const content = (
                <div className="h-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition hover:-translate-y-0.5 hover:shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-cyan-700">
                    Thông báo
                  </span>
                  <p className="mt-1.5 break-words text-sm font-semibold leading-5 text-slate-900">
                    {notice.tieu_de}
                  </p>
                  {notice.mo_ta && (
                    <p className="mt-2 break-words text-sm leading-5 text-slate-600">
                      {notice.mo_ta}
                    </p>
                  )}
                </div>
              );
              // Ưu tiên "Đường dẫn khi bấm vào" nếu admin có điền; nếu không
              // thì dùng file đính kèm (PDF...) đã tải lên làm đích bấm vào.
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
