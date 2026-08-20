"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, UserRound, ShieldCheck, KeyRound, Pencil } from "lucide-react";
import { COLLECTIONS, type CollectionId } from "@/lib/cms/schema";

type AdminRole = "admin" | "editor";
type AdminUserSummary = {
  id: string;
  username: string;
  role: AdminRole;
  permissions: CollectionId[];
  createdAt: string;
};

// Form dùng chung cho cả "Thêm người dùng" (tạo mới, cần username+password)
// và "Sửa quyền" (chỉ role/permissions/đổi mật khẩu, username giữ nguyên).
function PermissionsForm({
  mode,
  initial,
  onCancel,
  onSubmit,
}: {
  mode: "create" | "edit";
  initial?: AdminUserSummary;
  onCancel: () => void;
  onSubmit: (payload: {
    username?: string;
    password?: string;
    role: AdminRole;
    permissions: CollectionId[];
  }) => Promise<string | null>; // trả về message lỗi, hoặc null nếu thành công
}) {
  const [username, setUsername] = useState(initial?.username ?? "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminRole>(initial?.role ?? "editor");
  const [permissions, setPermissions] = useState<Set<CollectionId>>(
    new Set(initial?.permissions ?? [])
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function togglePermission(id: CollectionId) {
    setPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const err = await onSubmit({
      username: mode === "create" ? username : undefined,
      password: password || undefined,
      role,
      permissions: Array.from(permissions),
    });
    setSaving(false);
    if (err) setError(err);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        {mode === "create" && (
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
        )}
        <label className="block text-sm font-medium text-slate-700">
          {mode === "create" ? "Mật khẩu" : "Đặt lại mật khẩu (bỏ trống nếu giữ nguyên)"}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tối thiểu 6 ký tự"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          />
        </label>
      </div>

      <div className="mt-4">
        <span className="block text-sm font-medium text-slate-700">Vai trò</span>
        <div className="mt-1.5 flex gap-2">
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 rounded-lg border px-3 py-2.5 text-left text-sm transition ${
              role === "admin"
                ? "border-cyan-600 bg-cyan-50 text-cyan-800"
                : "border-slate-300 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="font-medium">Admin</span>
            <span className="block text-xs text-slate-500">Toàn quyền mọi mục + quản lý người dùng</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("editor")}
            className={`flex-1 rounded-lg border px-3 py-2.5 text-left text-sm transition ${
              role === "editor"
                ? "border-cyan-600 bg-cyan-50 text-cyan-800"
                : "border-slate-300 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="font-medium">User con</span>
            <span className="block text-xs text-slate-500">Chỉ được vào các mục được tick bên dưới</span>
          </button>
        </div>
      </div>

      {role === "editor" && (
        <div className="mt-4">
          <span className="block text-sm font-medium text-slate-700">
            Được phép quản lý những mục nào
          </span>
          <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
            {COLLECTIONS.map((c) => (
              <label
                key={c.id}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={permissions.has(c.id)}
                  onChange={() => togglePermission(c.id)}
                  className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                {c.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
        >
          Huỷ
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : mode === "create" ? "Tạo tài khoản" : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}

export function UsersPanel() {
  const [users, setUsers] = useState<AdminUserSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setError(null);
    const res = await fetch("/api/admin/users");
    if (!res.ok) {
      setError(res.status === 403 ? "Chỉ Admin mới xem được mục này" : "Không tải được danh sách người dùng");
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

  function permissionLabels(u: AdminUserSummary): string {
    if (u.role === "admin") return "Toàn quyền";
    if (u.permissions.length === 0) return "Chưa được cấp quyền nào";
    return u.permissions
      .map((id) => COLLECTIONS.find((c) => c.id === id)?.label ?? id)
      .join(", ");
  }

  const editingUser = editingId ? users?.find((u) => u.id === editingId) ?? null : null;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Người dùng quản trị</h2>
          {users && <p className="text-sm text-slate-500">{users.length} tài khoản</p>}
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setShowCreate((v) => !v);
          }}
          className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-cyan-900/10 transition hover:bg-cyan-700"
        >
          <Plus className="h-4 w-4" />
          Thêm người dùng
        </button>
      </div>

      {showCreate && (
        <PermissionsForm
          mode="create"
          onCancel={() => setShowCreate(false)}
          onSubmit={async ({ username, password, role, permissions }) => {
            const res = await fetch("/api/admin/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password, role, permissions }),
            });
            const body = await res.json();
            if (!res.ok) return body.error ?? "Tạo tài khoản thất bại";
            setShowCreate(false);
            load();
            return null;
          }}
        />
      )}

      {editingUser && (
        <PermissionsForm
          mode="edit"
          initial={editingUser}
          onCancel={() => setEditingId(null)}
          onSubmit={async ({ password, role, permissions }) => {
            const res = await fetch(`/api/admin/users/${editingUser.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password, role, permissions }),
            });
            const body = await res.json();
            if (!res.ok) return body.error ?? "Cập nhật thất bại";
            setEditingId(null);
            load();
            return null;
          }}
        />
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
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-slate-900">{u.username}</p>
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                    u.role === "admin" ? "bg-cyan-50 text-cyan-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  <ShieldCheck className="h-3 w-3" />
                  {u.role === "admin" ? "Admin" : "User con"}
                </span>
              </div>
              <p className="truncate text-xs text-slate-400">{permissionLabels(u)}</p>
              <p className="text-xs text-slate-400">
                Tạo lúc {new Date(u.createdAt).toLocaleString("vi-VN")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => {
                  setShowCreate(false);
                  setEditingId((cur) => (cur === u.id ? null : u.id));
                }}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {u.role === "editor" ? <Pencil className="h-3.5 w-3.5" /> : <KeyRound className="h-3.5 w-3.5" />}
                Sửa quyền
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                disabled={deletingId === u.id}
                className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
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
