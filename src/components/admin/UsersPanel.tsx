"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, UserRound } from "lucide-react";

type AdminUserSummary = { id: string; username: string; createdAt: string };

export function UsersPanel() {
  const [users, setUsers] = useState<AdminUserSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setError(null);
    const res = await fetch("/api/admin/users");
    if (!res.ok) {
      setError("Không tải được danh sách người dùng");
      return;
    }
    const body = await res.json();
    setUsers(body.users);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Xoá tài khoản này? Người dùng đó sẽ không đăng nhập được nữa.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        load();
      } else {
        const body = await res.json().catch(() => ({}));
        alert(body.error ?? "Xoá thất bại");
      }
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Tạo tài khoản thất bại");
      setUsername("");
      setPassword("");
      setShowForm(false);
      load();
    } catch (e) {
      setFormError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Người dùng quản trị</h2>
          {users && <p className="text-sm text-slate-500">{users.length} tài khoản</p>}
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-cyan-900/10 transition hover:bg-cyan-700"
        >
          <Plus className="h-4 w-4" />
          Thêm người dùng
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Tên đăng nhập
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="vd: bientap01"
                autoFocus
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Mật khẩu
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
          </div>

          {formError && <p className="mt-3 text-sm text-red-600">{formError}</p>}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-50"
            >
              {saving ? "Đang tạo..." : "Tạo tài khoản"}
            </button>
          </div>
        </form>
      )}

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}
      {!users && !error && <p className="text-sm text-slate-500">Đang tải...</p>}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {users?.map((u, idx) => (
          <div
            key={u.id}
            className={`flex items-center gap-3 px-5 py-4 ${
              idx !== users.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-50">
              <UserRound className="h-4 w-4 text-cyan-700" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-900">{u.username}</p>
              <p className="text-xs text-slate-400">
                Tạo lúc {new Date(u.createdAt).toLocaleString("vi-VN")}
              </p>
            </div>
            <button
              onClick={() => handleDelete(u.id)}
              disabled={deletingId === u.id}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Xoá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
