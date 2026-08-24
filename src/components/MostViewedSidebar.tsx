import Link from "next/link";
import { Play } from "lucide-react";
import { formatNewsDateTime } from "@/lib/format-date";

// Sidebar dùng chung cho các trang CHI TIẾT (tin tức / quan hệ cổ đông):
// - Khối "Xem nhiều nhất": danh sách bài viết sắp xếp theo lượt xem giảm
//   dần (không phải theo ngày), lấy dữ liệu từ `news-views-store`.
// - Khối "Video nổi bật": vài video mới nhất từ Admin > Thư viện video,
//   giống cách trang danh sách Quan hệ cổ đông đang làm
//   (src/components/shareholder-relations.tsx) — bấm vào sẽ tới trang
//   Thư viện video vì video chưa có trang chi tiết riêng.

const FALLBACK_IMAGE = "/images/ptsc/shareholder-pvpower-dhc.png";

export type MostViewedItem = {
  id: string;
  image?: string;
  title: string;
  date?: string;
  gio?: string;
};

export type SidebarVideoItem = {
  title: string;
  image?: string;
};

export function MostViewedSidebar({
  sidebarTitle = "Xem nhiều nhất",
  items,
  detailBasePath,
  videoSectionTitle = "Video nổi bật",
  videoItems = [],
  videoLinkHref = "/dich-vu#thu-vien-video",
  className = "",
}: {
  sidebarTitle?: string;
  items: MostViewedItem[];
  detailBasePath: string;
  videoSectionTitle?: string;
  videoItems?: SidebarVideoItem[];
  videoLinkHref?: string;
  className?: string;
}) {
  return (
    <aside
      className={`h-fit rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-6 lg:sticky lg:top-24 lg:self-start ${className}`}
    >
      <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">{sidebarTitle}</h3>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Chưa có bài viết nào.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <Link
                href={`${detailBasePath}/${item.id}`}
                className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image || FALLBACK_IMAGE}
                  alt=""
                  className={item.image ? "h-full w-full object-cover" : "h-full w-full object-contain p-1"}
                />
              </Link>
              <div className="min-w-0">
                <Link
                  href={`${detailBasePath}/${item.id}`}
                  className="line-clamp-3 text-sm font-semibold leading-snug text-slate-700 transition hover:text-cyan-700"
                >
                  {item.title}
                </Link>
                {item.date && (
                  <p className="mt-1 text-xs text-slate-400">
                    {formatNewsDateTime(item.date, item.gio)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {videoItems.length > 0 && (
        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            {videoSectionTitle}
          </h3>
          <ul className="mt-5 space-y-5">
            {videoItems.map((video) => (
              <li key={video.title}>
                <Link
                  href={videoLinkHref}
                  className="text-sm font-medium leading-snug text-slate-700 transition hover:text-cyan-700"
                >
                  {video.title}
                </Link>
                {video.image ? (
                  <Link
                    href={videoLinkHref}
                    className="group relative mt-2 flex h-28 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-800"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.image}
                      alt={video.title}
                      className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                    />
                    <span className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 transition group-hover:bg-white">
                      <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                    </span>
                  </Link>
                ) : (
                  <Link href={videoLinkHref} className="mt-2 flex h-28 items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={FALLBACK_IMAGE} alt={video.title} className="h-full w-auto object-contain" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
