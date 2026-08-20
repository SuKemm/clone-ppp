"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COLLECTIONS, translationPairs, type CollectionDef, type CollectionId } from "@/lib/cms/schema";
import type { CmsItem } from "@/lib/cms/store";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default function AdminApp() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<CollectionId>(COLLECTIONS[0].id);
  const active = COLLECTIONS.find((c) => c.id === activeId)!;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-slate-900">Trang quản trị nội dung</h1>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
          }}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
        >
          Đăng xuất
        </button>
      </header>

      <div className="mx-auto flex max-w-6xl gap-6 px-6 py-8">
        <nav className="w-48 shrink-0 space-y-1">
          {COLLECTIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                c.id === activeId
                  ? "bg-cyan-700 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </nav>

        <main className="flex-1">
          <CollectionPanel key={active.id} def={active} />
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

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">{def.label}</h2>
        <button
          onClick={() => setEditing("new")}
          className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800"
        >
          + Thêm mới
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {!items && !error && <p className="text-sm text-slate-500">Đang tải...</p>}

      {items && items.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
          Chưa có mục nào. Bấm &quot;Thêm mới&quot; để tạo.
        </p>
      )}

      <div className="space-y-3">
        {items?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{item[titleField] || "(không có tiêu đề)"}</p>
              {def.fields[1] && (
                <p className="truncate text-sm text-slate-500">{item[def.fields[1].key]}</p>
              )}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => setEditing(item)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
              >
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <h3 className="text-lg font-semibold text-slate-900">
          {item ? "Sửa" : "Thêm"} — {def.label}
        </h3>

        <div className="mt-4 space-y-4">
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

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
          >
            Huỷ
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </form>
    </div>
  );
}
