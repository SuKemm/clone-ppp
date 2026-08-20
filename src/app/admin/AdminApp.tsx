"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import { COLLECTIONS, translationPairs, type CollectionDef, type CollectionId } from "@/lib/cms/schema";
import type { CmsItem } from "@/lib/cms/store";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SelectField, type SelectOption } from "@/components/admin/SelectField";
import { UsersPanel } from "@/components/admin/UsersPanel";

// Icon riêng cho từng collection để sidebar dễ quét mắt hơn là chỉ có chữ.
const COLLECTION_ICONS: Record<CollectionId, React.ComponentType<{ className?: string }>> = {
  "news-categories": Tags,
  news: Newspaper,
  projects: FolderKanban,
  jobs: Briefcase,
  "photo-albums": Images,
  "video-albums": Video,
  "site-marquee": Megaphone,
  "production-info": Activity,
};

type View = { kind: "collection"; id: CollectionId } | { kind: "users" };

export default function AdminApp() {
  const router = useRouter();
  const [view, setView] = useState<View>({ kind: "collection", id: COLLECTIONS[0].id });
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const active = view.kind === "collection" ? COLLECTIONS.find((c) => c.id === view.id)! : null;

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => setCurrentUsername(body?.username ?? null))
      .catch(() => setCurrentUsername(null));
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar tối màu — cố định, tách biệt khỏi vùng nội dung sáng màu */}
      <aside className="flex w-64 shrink-0 flex-col bg-slate-900">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-600">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Trang quản trị</p>
            <p className="truncate text-xs text-slate-400">Quản lý nội dung website</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {COLLECTIONS.map((c) => {
            const Icon = COLLECTION_ICONS[c.id] ?? LayoutGrid;
            const isActive = view.kind === "collection" && c.id === view.id;
            return (
              <button
                key={c.id}
                onClick={() => setView({ kind: "collection", id: c.id })}
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

          <div className="my-3 border-t border-white/10" />

          <button
            onClick={() => setView({ kind: "users" })}
            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
              view.kind === "users"
                ? "bg-cyan-600 text-white shadow-sm shadow-cyan-900/40"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Users className={`h-4 w-4 shrink-0 ${view.kind === "users" ? "text-white" : "text-slate-400"}`} />
            <span className="truncate">Người dùng</span>
          </button>
        </nav>

        <div className="border-t border-white/10 p-3">
          {currentUsername && (
            <p className="truncate px-3 pb-2 text-xs text-slate-500">
              Đăng nhập: <span className="text-slate-300">{currentUsername}</span>
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
        <header className="flex items-center gap-2 border-b border-slate-200 bg-white px-8 py-4 text-sm text-slate-500">
          <span>{view.kind === "users" ? "Quản trị" : "Nội dung"}</span>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-900">
            {view.kind === "users" ? "Người dùng" : active!.label}
          </span>
        </header>

        <main className="flex-1 px-8 py-7">
          {view.kind === "users" ? (
            <UsersPanel />
          ) : (
            <CollectionPanel key={active!.id} def={active!} />
          )}
        </main>
      </div>
    </div>
  );
}


function CollectionPanel({ def }: { def: CollectionDef }) {
  const [items, setItems] = useState<CmsItem[] | null>(null);
  const [editing, setEditing] = useState<CmsItem | "new" | null>(null);
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
          onClick={() => setEditing("new")}
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
                onClick={() => setEditing(item)}
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

      {editing && (
        <ItemForm
          def={def}
          item={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}
function ItemForm({
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
    return init;
  });
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
      const res = await fetch(url, {
        method: item ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Banner màu ở đầu form — cùng tông với nút "Thêm mới" để có mạch nhất quán */}
        <div className="flex shrink-0 items-center justify-between bg-cyan-700 px-6 py-4">
          <h3 className="text-base font-semibold text-white">
            {item ? "Sửa" : "Thêm mới"} — {def.label}
          </h3>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-4">
            {def.fields.map((f) => (
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(f.key, file);
                      }}
                      className="block w-full text-sm text-slate-600"
                    />
                    {uploadingKey === f.key && (
                      <p className="text-xs text-slate-400">Đang tải ảnh lên...</p>
                    )}
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
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
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
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                  />
                )}
              </label>
            ))}
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex shrink-0 justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            Huỷ
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-cyan-900/10 transition hover:bg-cyan-800 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </form>
    </div>
  );
}
