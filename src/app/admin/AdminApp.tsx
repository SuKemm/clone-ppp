"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  Newspaper,
  Tags,
  FolderKanban,
  Briefcase,
  Images,
  Video,
  Megaphone,
  Activity,
  Users,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  MessageSquare,
  Eye,
  Landmark,
  ScrollText,
  ChevronDown,
  Building2,
  BarChart3,
  History,
  Ruler,
  Award,
  UserCircle2,
  UsersRound,
  BookImage,
} from "lucide-react";
import { COLLECTIONS, translationPairs, type CollectionDef, type CollectionId } from "@/lib/cms/schema";
import type { CmsItem } from "@/lib/cms/store";
import type { AdminRole } from "@/lib/cms/users";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SelectField, type SelectOption } from "@/components/admin/SelectField";
import { UsersPanel } from "@/components/admin/UsersPanel";

// Lấy ngày/giờ thực tế hiện tại theo múi giờ Việt Nam (Asia/Ho_Chi_Minh),
// trả về đúng định dạng đang dùng cho field "date" (dd/mm/yyyy) và "gio"
// (HH:mm) trong schema.ts. Dùng chung cho cả bản VN lẫn EN vì 2 bản hiển thị
// chung 1 giá trị ngày/giờ đăng bài (xem src/lib/format-date.ts).
function getCurrentVietnamDateTime(): { date: string; time: string } {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    date: `${get("day")}/${get("month")}/${get("year")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

type CurrentUser = { id: string; username: string; role: AdminRole; permissions: CollectionId[] };

// Icon riêng cho từng collection để sidebar dễ quét mắt hơn là chỉ có chữ.
const COLLECTION_ICONS: Record<CollectionId, React.ComponentType<{ className?: string }>> = {
  "news-categories": Tags,
  news: Newspaper,
  projects: FolderKanban,
  jobs: Briefcase,
  "photo-albums": Images,
  "video-albums": Video,
  "site-marquee": Megaphone,
  "site-notices": Megaphone,
  "production-info": Activity,
  "production-daily": BarChart3,
  contacts: MessageSquare,
  "shareholder-categories": Landmark,
  "shareholder-relations": ScrollText,
  "company-overview": Building2,
  "company-stats": BarChart3,
  "company-timeline": History,
  "company-specs": Ruler,
  "company-awards": Award,
  "shareholders-list": UserCircle2,
  leadership: UsersRound,
  "units-page": Landmark,
  "culture-handbook-pages": BookImage,
  "tender-categories": Landmark,
  tenders: ScrollText,
};

// Nhóm các collection vào đúng thư mục chính, khớp với cấu trúc menu chính
// của website (Giới thiệu DHC / Quan hệ cổ đông / Tin tức – Sự kiện / Thư
// viện / Liên hệ) — xem `navItemsVi` trong `src/components/ptsc-shell.tsx`.
// Collection nào không thuộc mục nào trên menu chính (chỉ hiện ở trang chủ
// hoặc là trang độc lập) thì gom vào nhóm "Khác" ở cuối.
const SIDEBAR_GROUPS: { label: string; ids: CollectionId[] }[] = [
  {
    label: "Giới thiệu DHC",
    ids: [
      "projects",
      "company-overview",
      "company-stats",
      "company-timeline",
      "company-specs",
      "company-awards",
      "shareholders-list",
      "leadership",
      "units-page",
    ],
  },
  { label: "Quan hệ cổ đông", ids: ["shareholder-categories", "shareholder-relations"] },
  { label: "Đấu thầu", ids: ["tender-categories", "tenders"] },
  { label: "Tin tức – Sự kiện", ids: ["news-categories", "news"] },
  { label: "Thư viện", ids: ["photo-albums", "video-albums", "culture-handbook-pages"] },
  { label: "Liên hệ", ids: ["contacts"] },
  { label: "Khác", ids: ["jobs", "site-marquee", "site-notices", "production-info", "production-daily"] },
];

// "list": danh sách các mục của 1 collection.
// "edit": trang Thêm mới / Sửa (trang riêng, không phải modal) — `item: null`
//   nghĩa là đang thêm mới, có giá trị nghĩa là đang sửa mục đó.
type View =
  | { kind: "list"; id: CollectionId }
  | { kind: "edit"; id: CollectionId; item: CmsItem | null }
  | { kind: "users" };

export default function AdminApp() {
  const router = useRouter();
  const [view, setView] = useState<View | null>(null);
  const [me, setMe] = useState<CurrentUser | null>(null);
  const active = view && view.kind !== "users" ? COLLECTIONS.find((c) => c.id === view.id)! : null;

  // Nhóm nào đang đóng/mở trong sidebar — mặc định đóng hết cho gọn, chỉ
  // nhóm chứa mục đang xem thì tự mở (xem effect bên dưới).
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  // "user con" (role editor) chỉ thấy các collection nằm trong permissions
  // của họ — admin luôn thấy toàn bộ COLLECTIONS.
  const visibleCollections =
    !me || me.role === "admin"
      ? COLLECTIONS
      : COLLECTIONS.filter((c) => me.permissions.includes(c.id));

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((body: CurrentUser | null) => {
        setMe(body);
        const first = body && body.role !== "admin"
          ? COLLECTIONS.find((c) => body.permissions.includes(c.id))
          : COLLECTIONS[0];
        const firstId = (first ?? COLLECTIONS[0]).id;
        setView({ kind: "list", id: firstId });
        // Mở sẵn nhóm chứa mục đầu tiên được chọn để không mở ra thấy trống trơn.
        const firstGroup = SIDEBAR_GROUPS.find((g) => g.ids.includes(firstId));
        if (firstGroup) setOpenGroups({ [firstGroup.label]: true });
      })
      .catch(() => setView({ kind: "list", id: COLLECTIONS[0].id }));
  }, []);

  if (!view) return null;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar tối màu — cố định, tách biệt khỏi vùng nội dung sáng màu */}
      <aside className="flex w-64 shrink-0 flex-col bg-slate-900">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ptsc/logo-ptsc.png"
              alt="Logo công ty"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Trang quản trị</p>
            <p className="truncate text-xs text-slate-400">Quản lý nội dung website</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {SIDEBAR_GROUPS.map((group) => {
            // Chỉ hiện các collection trong nhóm mà user hiện tại được thấy
            // (đã lọc theo quyền ở `visibleCollections`); nhóm nào không còn
            // collection nào (vd: editor không có quyền) thì ẩn cả nhóm.
            const groupCollections = group.ids
              .map((id) => visibleCollections.find((c) => c.id === id))
              .filter((c): c is CollectionDef => Boolean(c));
            if (groupCollections.length === 0) return null;
            const isOpen = Boolean(openGroups[group.label]);

            return (
              <div key={group.label} className="pb-1">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className="flex w-full items-center justify-between px-3 pb-1 pt-2 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 transition hover:text-slate-300"
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="space-y-0.5">
                    {groupCollections.map((c) => {
                      const Icon = COLLECTION_ICONS[c.id] ?? LayoutGrid;
                      const isActive = view.kind !== "users" && c.id === view.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setView({ kind: "list", id: c.id })}
                          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                            isActive
                              ? "bg-cyan-600 text-white shadow-sm shadow-cyan-900/40"
                              : "text-slate-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                          <span className="truncate">{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Mục "Người dùng" — chỉ Admin mới thấy; user con (editor) không
              được phân quyền cho người khác. */}
          {me?.role === "admin" && (
            <>
              <div className="my-3 border-t border-white/10" />
              <button
                onClick={() => setView({ kind: "users" })}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                  view.kind === "users"
                    ? "bg-cyan-600 text-white shadow-sm shadow-cyan-900/40"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Users
                  className={`h-4 w-4 shrink-0 ${view.kind === "users" ? "text-white" : "text-slate-400"}`}
                />
                <span className="truncate">Người dùng</span>
              </button>
            </>
          )}
        </nav>

        <div className="border-t border-white/10 p-3">
          {me && (
            <p className="truncate px-3 pb-2 text-xs text-slate-500">
              Đăng nhập: <span className="text-slate-300">{me.username}</span>
              <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                {me.role === "admin" ? "Admin" : "User con"}
              </span>
            </p>
          )}
          <button
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.push("/admin/login");
              router.refresh();
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0 text-slate-400" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Vùng nội dung */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-2 border-b border-slate-200 bg-white px-8 py-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                visibleCollections[0] && setView({ kind: "list", id: visibleCollections[0].id })
              }
              className="hover:text-cyan-700"
            >
              Trang chủ
            </button>
            <span className="text-slate-300">/</span>
            {view.kind === "users" ? (
              <span className="font-medium text-slate-900">Người dùng</span>
            ) : view.kind === "list" ? (
              <span className="font-medium text-slate-900">{active!.label}</span>
            ) : (
              <>
                <button
                  onClick={() => setView({ kind: "list", id: view.id })}
                  className="hover:text-cyan-700"
                >
                  {active!.label}
                </button>
                <span className="text-slate-300">/</span>
                <span className="font-medium text-slate-900">
                  {view.item ? "Sửa" : "Thêm mới"}
                </span>
              </>
            )}
          </div>

          {/* Nút "Xem website" luôn hiện ở mọi trang trong khu vực admin —
              bấm vào mở trang chủ website ở tab mới, tiện xem lại ngay sau
              khi vừa thêm/sửa xong một nội dung nào đó. */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700 transition hover:bg-cyan-100"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Xem website
          </a>
        </header>

        <main className="flex-1 px-8 py-7">
          {view.kind === "users" ? (
            <UsersPanel />
          ) : view.kind === "list" ? (
            active!.id === "contacts" ? (
              <ContactsListPanel def={active!} onEdit={(item) => setView({ kind: "edit", id: active!.id, item })} />
            ) : (
              <CollectionListPanel
                key={active!.id}
                def={active!}
                onAdd={() => setView({ kind: "edit", id: active!.id, item: null })}
                onEdit={(item) => setView({ kind: "edit", id: active!.id, item })}
              />
            )
          ) : (
            <ItemFormPage
              key={`${view.id}-${view.item?.id ?? "new"}`}
              def={active!}
              item={view.item}
              onClose={() => setView({ kind: "list", id: view.id })}
              onSaved={() => setView({ kind: "list", id: view.id })}
            />
          )}
        </main>
      </div>
    </div>
  );
}


// Bảng "Khách hàng liên hệ" — bố cục dạng bảng (Khách hàng / Email / Điện
// thoại / Nội dung / Ngày tạo / Trạng thái / Chức năng) giống trang quản trị
// dakdrinh.com.vn, khác với kiểu danh sách thẻ dùng chung cho các collection
// còn lại (CollectionListPanel bên dưới) vì dữ liệu ở đây không có ảnh đại
// diện và cần xem được nhiều cột cùng lúc.
function ContactsListPanel({
  def,
  onEdit,
}: {
  def: CollectionDef;
  onEdit: (item: CmsItem) => void;
}) {
  const [items, setItems] = useState<CmsItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function load() {
    setError(null);
    const res = await fetch(`/api/admin/content/${def.id}`);
    if (!res.ok) {
      setError("Không tải được dữ liệu");
      return;
    }
    const body = await res.json();
    setItems(body.items);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def.id]);

  async function handleDelete(id: string) {
    if (!confirm("Xoá liên hệ này?")) return;
    const res = await fetch(`/api/admin/content/${def.id}/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  // Bấm trực tiếp vào nhãn trạng thái trong bảng để duyệt/bỏ duyệt — không
  // cần mở form Sửa chỉ để đổi mỗi trường này.
  async function toggleStatus(item: CmsItem) {
    setUpdatingId(item.id);
    const nextStatus = item.status === "Đã duyệt" ? "Chưa duyệt" : "Đã duyệt";
    try {
      const res = await fetch(`/api/admin/content/${def.id}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, status: nextStatus }),
      });
      if (res.ok) load();
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{def.label}</h2>
          {items && <p className="text-sm text-slate-500">{items.length} liên hệ</p>}
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}
      {!items && !error && <p className="text-sm text-slate-500">Đang tải...</p>}

      {items && items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Chưa có khách hàng nào gửi liên hệ. Dữ liệu ở đây tự thêm vào khi có người gửi form
            &quot;Liên hệ&quot; ở trang chủ.
          </p>
        </div>
      )}

      {items && items.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Khách hàng</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Điện thoại</th>
                <th className="px-4 py-3">Nội dung liên hệ</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 align-top last:border-0">
                  <td className="max-w-[220px] px-4 py-3 font-medium text-slate-900">{item.name}</td>
                  <td className="px-4 py-3 text-slate-600">{item.email}</td>
                  <td className="px-4 py-3 text-slate-600">{item.phone}</td>
                  <td className="max-w-[280px] whitespace-pre-wrap px-4 py-3 text-slate-600">
                    {item.message}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">{item.createdAt}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(item)}
                      disabled={updatingId === item.id}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition disabled:opacity-50 ${
                        item.status === "Đã duyệt"
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      }`}
                      title="Bấm để đổi trạng thái"
                    >
                      {updatingId === item.id ? "Đang cập nhật..." : item.status || "Chưa duyệt"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Xem
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CollectionListPanel({
  def,
  onAdd,
  onEdit,
}: {
  def: CollectionDef;
  onAdd: () => void;
  onEdit: (item: CmsItem) => void;
}) {
  const [items, setItems] = useState<CmsItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    const res = await fetch(`/api/admin/content/${def.id}`);
    if (!res.ok) {
      setError("Không tải được dữ liệu");
      return;
    }
    const body = await res.json();
    setItems(body.items);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def.id]);

  async function handleDelete(id: string) {
    if (!confirm("Xoá mục này?")) return;
    const res = await fetch(`/api/admin/content/${def.id}/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  const titleField = def.fields[0]?.key ?? "title";
  const categoryField = def.fields.find((f) => f.key === "category");
  const dateField = def.fields.find((f) => f.key === "date" || f.key === "deadline");
  const imageField = def.fields.find((f) => f.type === "image");
  const hasMetaFields = Boolean(categoryField || dateField);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{def.label}</h2>
          {items && (
            <p className="text-sm text-slate-500">{items.length} mục</p>
          )}
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-cyan-900/10 transition hover:bg-cyan-700"
        >
          <Plus className="h-4 w-4" />
          Thêm mới
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}
      {!items && !error && <p className="text-sm text-slate-500">Đang tải...</p>}

      {items && items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Chưa có mục nào. Bấm &quot;Thêm mới&quot; để tạo mục đầu tiên.
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {items?.map((item, idx) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 px-5 py-4 ${
              idx !== items.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            {imageField && (
              // eslint-disable-next-line @next/next/no-img-element
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {item[imageField.key] && (
                  <img src={item[imageField.key]} alt="" className="h-full w-full object-cover" />
                )}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-900">{item[titleField] || "(không có tiêu đề)"}</p>

              {hasMetaFields ? (
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  {categoryField && item[categoryField.key] && (
                    <span className="inline-flex items-center rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-medium text-cyan-700">
                      {item[categoryField.key]}
                    </span>
                  )}
                  {dateField && item[dateField.key] && (
                    <span className="text-xs text-slate-400">{item[dateField.key]}</span>
                  )}
                </div>
              ) : (
                def.fields[1] && (
                  <p className="truncate text-sm text-slate-500">{item[def.fields[1].key]}</p>
                )
              )}
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => onEdit(item)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
              >
                <Pencil className="h-3.5 w-3.5" />
                Sửa
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Gom các field liền kề có width:"half" thành từng cặp 1 hàng (lưới 2 cột) —
// giống layout trang quản trị dakdrinh.com.vn. Field không khai báo width
// (hoặc "full") luôn chiếm trọn 1 hàng riêng.
function buildFieldRows(fields: CollectionDef["fields"]) {
  const rows: (typeof fields)[] = [];
  let i = 0;
  while (i < fields.length) {
    const f = fields[i];
    const next = fields[i + 1];
    if (f.width === "half" && next?.width === "half") {
      rows.push([f, next]);
      i += 2;
    } else {
      rows.push([f]);
      i += 1;
    }
  }
  return rows;
}

function ItemFormPage({
  def,
  item,
  onClose,
  onSaved,
}: {
  def: CollectionDef;
  item: CmsItem | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of def.fields) init[f.key] = item?.[f.key] ?? "";
    // Tạo bài tin tức mới (chưa có "item") -> tự động điền ngày + giờ đăng
    // theo thời gian thực tại thời điểm mở form (giờ Việt Nam). Áp dụng cho
    // cả 2 field "date" và "gio" vì trang EN dùng chung 2 field này với
    // trang VN (xem src/lib/format-date.ts). Admin vẫn có thể sửa tay nếu
    // muốn đăng lùi ngày / lên lịch cho bài viết.
    if (!item && def.fields.some((f) => f.key === "date") && def.fields.some((f) => f.key === "gio")) {
      const { date, time } = getCurrentVietnamDateTime();
      init.date = date;
      init.gio = time;
    }
    return init;
  });
  // Đánh dấu admin đã tự tay sửa ngày/giờ (để đăng lùi, lên lịch...). Khi
  // vẫn còn false lúc bấm Lưu, ta tự lấy lại giờ hiện tại ngay tại thời điểm
  // lưu (chứ không dùng giá trị đã điền sẵn lúc mở form, có thể đã cũ nếu
  // admin soạn bài lâu) — xem handleSubmit bên dưới.
  const dateTimeAutoRef = useRef(!item);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [translatingKey, setTranslatingKey] = useState<string | null>(null);
  const [optionsData, setOptionsData] = useState<Record<string, CmsItem[]>>({});

  // Với field type "select" khai báo optionsFrom (vd: category lấy từ
  // collection "news-categories"), tải danh sách item của collection đó về
  // để làm option cho dropdown.
  useEffect(() => {
    const sources = Array.from(
      new Set(def.fields.filter((f) => f.type === "select" && f.optionsFrom).map((f) => f.optionsFrom!))
    );
    sources.forEach((sourceId) => {
      fetch(`/api/admin/content/${sourceId}`)
        .then((res) => (res.ok ? res.json() : { items: [] }))
        .then((body) => setOptionsData((prev) => ({ ...prev, [sourceId]: body.items ?? [] })))
        .catch(() => setOptionsData((prev) => ({ ...prev, [sourceId]: [] })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def.id]);

  // Với mỗi field tiếng Việt có field "<key>_en" tương ứng (khai báo trong
  // schema.ts), cho phép bấm nút để tự động điền bản dịch tiếng Anh bằng API
  // đã cấu hình (ANTHROPIC_API_KEY hoặc DEEPL_API_KEY trong .env.local).
  const pairs = translationPairs(def);
  const targetKeyBySource = new Map(pairs.map((p) => [p.source.key, p.target.key]));

  async function translateField(sourceKey: string, targetKey: string) {
    const sourceText = values[sourceKey];
    if (!sourceText || !sourceText.trim()) return;
    setTranslatingKey(targetKey);
    setError(null);
    try {
      const res = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sourceText }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Dịch thất bại");
      setValues((v) => ({ ...v, [targetKey]: body.translated }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setTranslatingKey(null);
    }
  }

  async function uploadOne(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? "Upload lỗi");
    return body.url as string;
  }

  async function handleUpload(key: string, file: File) {
    setUploadingKey(key);
    setError(null);
    try {
      const url = await uploadOne(file);
      setValues((v) => ({ ...v, [key]: url }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploadingKey(null);
    }
  }

  function parseGallery(raw: string): string[] {
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
    } catch {
      return [];
    }
  }

  async function handleGalleryUpload(key: string, files: FileList) {
    setUploadingKey(key);
    setError(null);
    try {
      const existing = parseGallery(values[key]);
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        uploaded.push(await uploadOne(file));
      }
      setValues((v) => ({ ...v, [key]: JSON.stringify([...existing, ...uploaded]) }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploadingKey(null);
    }
  }

  function handleGalleryRemove(key: string, index: number) {
    const existing = parseGallery(values[key]);
    existing.splice(index, 1);
    setValues((v) => ({ ...v, [key]: JSON.stringify(existing) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = item
        ? `/api/admin/content/${def.id}/${item.id}`
        : `/api/admin/content/${def.id}`;
      // Bài mới, chưa bị admin sửa tay ngày/giờ -> lấy đúng thời điểm bấm
      // Lưu (chứ không phải lúc mở form) để "Ngày đăng" luôn khớp thực tế.
      let payload = values;
      if (!item && dateTimeAutoRef.current) {
        const { date, time } = getCurrentVietnamDateTime();
        payload = { ...values, date, gio: time };
      }
      const res = await fetch(url, {
        method: item ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Lưu thất bại");
      onSaved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }


  // Render 1 field — dùng chung cho cả field đứng 1 mình (full width) lẫn
  // field ghép cặp 2 cột trong buildFieldRows().
  function renderField(f: CollectionDef["fields"][number]) {
    return (
      <label key={f.key} className="block text-sm font-medium text-slate-700">
        <span className="flex items-center justify-between gap-2">
          <span>
            {f.label}
            {f.required && <span className="text-red-500"> *</span>}
          </span>
          {targetKeyBySource.has(f.key) && (
            <button
              type="button"
              disabled={translatingKey === targetKeyBySource.get(f.key) || !values[f.key]?.trim()}
              onClick={() => translateField(f.key, targetKeyBySource.get(f.key)!)}
              className="shrink-0 rounded-md border border-cyan-200 bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-700 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
              title="Tự động điền bản dịch tiếng Anh vào ô bên dưới"
            >
              {translatingKey === targetKeyBySource.get(f.key) ? "Đang dịch..." : "Dịch tự động → EN"}
            </button>
          )}
          {(f.key === "date" || f.key === "gio") &&
            def.fields.some((x) => x.key === "date") &&
            def.fields.some((x) => x.key === "gio") && (
              <button
                type="button"
                onClick={() => {
                  const { date, time } = getCurrentVietnamDateTime();
                  setValues((v) => ({ ...v, date, gio: time }));
                  // Bấm nút này = quay lại chế độ tự động -> lúc bấm Lưu sẽ
                  // lấy lại giờ mới nhất một lần nữa thay vì giữ giá trị này.
                  dateTimeAutoRef.current = true;
                }}
                className="shrink-0 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                title="Điền ngày + giờ hiện tại (giờ Việt Nam) vào lúc đăng bài"
              >
                Lấy giờ hiện tại
              </button>
            )}
        </span>

        {f.type === "richtext" ? (
          <RichTextEditor
            value={values[f.key]}
            onChange={(html) => setValues((v) => ({ ...v, [f.key]: html }))}
          />
        ) : f.type === "textarea" ? (
          <textarea
            rows={f.key === "content" ? 12 : 4}
            value={values[f.key]}
            onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          />
        ) : f.type === "image" ? (
          <div className="mt-1 space-y-2">
            {values[f.key] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={values[f.key]}
                alt=""
                className="h-24 w-auto rounded-lg border border-slate-200 object-cover"
              />
            )}
            <label className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 transition hover:border-cyan-400 hover:bg-cyan-50">
              <span className="truncate">
                {values[f.key] ? "Đổi ảnh khác" : "Chọn hình ảnh"}
              </span>
              <span className="shrink-0 rounded-md bg-cyan-600 px-2.5 py-1 text-xs font-semibold text-white">
                Tải lên
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(f.key, file);
                }}
                className="hidden"
              />
            </label>
            {uploadingKey === f.key && (
              <p className="text-xs text-slate-400">Đang tải ảnh lên...</p>
            )}
          </div>
        ) : f.type === "file" ? (
          <div className="mt-1 space-y-2">
            {values[f.key] && (
              <a
                href={values[f.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-cyan-700 underline decoration-dotted hover:text-cyan-800"
              >
                📄 Xem file hiện tại
              </a>
            )}

            {/* Cách 1: dán sẵn link PDF (vd: file đã đăng trên pvpower.vn,
                trang khác của Tổng công ty...) — không cần tải file lên
                server, chỉ cần dán URL đầy đủ (bắt đầu bằng http/https). */}
            <input
              type="url"
              placeholder="Dán link PDF có sẵn (https://...)"
              value={values[f.key]?.startsWith("http") ? values[f.key] : ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            />

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              hoặc
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Cách 2: tải file PDF trực tiếp lên server (giống ảnh) */}
            <label className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 transition hover:border-cyan-400 hover:bg-cyan-50">
              <span className="truncate">
                {values[f.key] && !values[f.key]?.startsWith("http")
                  ? "Đổi file khác"
                  : "Tải file PDF lên server"}
              </span>
              <span className="shrink-0 rounded-md bg-cyan-600 px-2.5 py-1 text-xs font-semibold text-white">
                Tải lên
              </span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(f.key, file);
                  e.target.value = "";
                }}
                className="hidden"
              />
            </label>
            {uploadingKey === f.key && (
              <p className="text-xs text-slate-400">Đang tải file lên...</p>
            )}
            <p className="text-xs text-slate-400">
              Dùng link có sẵn nếu file đã đăng ở nơi khác (nhanh, không tốn dung lượng server).
              Chỉ tải lên server khi chưa có link công khai. Nếu tải lên, giới hạn 20MB.
            </p>
          </div>
        ) : f.type === "gallery" ? (
          <div className="mt-1 space-y-2">
            {parseGallery(values[f.key]).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {parseGallery(values[f.key]).map((url, idx) => (
                  <div key={`${url}-${idx}`} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      className="h-20 w-20 rounded-lg border border-slate-200 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleGalleryRemove(f.key, idx)}
                      className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white hover:bg-red-700"
                      aria-label="Xoá ảnh"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) handleGalleryUpload(f.key, files);
                e.target.value = "";
              }}
              className="block w-full text-sm text-slate-600"
            />
            {uploadingKey === f.key && (
              <p className="text-xs text-slate-400">Đang tải ảnh lên...</p>
            )}
            <p className="text-xs text-slate-400">
              Có thể chọn nhiều ảnh cùng lúc. Ảnh sẽ được thêm vào cuối danh sách, bấm ✕ để xoá bớt.
            </p>
          </div>
        ) : f.type === "date" ? (
          <input
            type="text"
            placeholder="vd: 15/08/2026"
            value={values[f.key]}
            onChange={(e) => {
              setValues((v) => ({ ...v, [f.key]: e.target.value }));
              if (f.key === "date") dateTimeAutoRef.current = false;
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          />
        ) : f.type === "select" ? (
          <SelectField
            value={values[f.key]}
            onChange={(val) => setValues((v) => ({ ...v, [f.key]: val }))}
            options={
              f.optionsFrom
                ? (optionsData[f.optionsFrom] ?? []).map(
                    (option): SelectOption => ({ value: option.name, label: option.name })
                  )
                : (f.options ?? []).map((o): SelectOption => ({ value: o, label: o }))
            }
          />
        ) : (
          <input
            type="text"
            value={values[f.key]}
            onChange={(e) => {
              setValues((v) => ({ ...v, [f.key]: e.target.value }));
              if (f.key === "gio") dateTimeAutoRef.current = false;
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          />
        )}
      </label>
    );
  }

  const rows = buildFieldRows(def.fields);

  return (
    <form onSubmit={handleSubmit}>
      {/* Thanh tiêu đề + nút hành động — cùng cấu trúc với trang
          "Thông tin chi tiết" của dakdrinh.com.vn/admin (tiêu đề bên trái,
          Lưu/Thoát bên phải, luôn nổi trên đầu khi cuộn trang dài). */}
      <div className="sticky top-0 z-10 -mx-8 mb-6 flex items-center justify-between border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur">
        <h2 className="text-lg font-semibold text-slate-900">Thông tin chi tiết</h2>
        <div className="flex items-center gap-2">
          {/* Mở trang chủ website ở tab mới — dùng sau khi bấm Lưu để xem
              ngay nội dung vừa đăng, không cần rời khỏi trang admin đang làm. */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100"
          >
            <ExternalLink className="h-4 w-4" />
            Xem website
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            Thoát
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-cyan-700 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-cyan-900/10 transition hover:bg-cyan-800 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          {rows.map((row, idx) =>
            row.length === 2 ? (
              <div key={idx} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {row.map((f) => renderField(f))}
              </div>
            ) : (
              <div key={idx}>{renderField(row[0])}</div>
            )
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </form>
  );
}
