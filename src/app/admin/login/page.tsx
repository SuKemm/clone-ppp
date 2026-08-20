"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Đăng nhập thất bại");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Có lỗi xảy ra, thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Cột thương hiệu — cùng tông tối + xanh cyan với sidebar trang /admin,
          ẩn trên màn hình nhỏ để form đăng nhập luôn là trọng tâm. */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-12 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(8,145,178,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(8,145,178,0.25), transparent 40%)",
          }}
        />

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ptsc/logo-ptsc.png"
              alt="Logo công ty"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-sm font-semibold text-white">Trang quản trị</span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-3xl font-semibold leading-snug text-white">
            Quản lý toàn bộ nội dung website ở một nơi duy nhất.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Đăng nhập để cập nhật tin tức, dự án, tuyển dụng, thư viện ảnh/video và các nội dung
            khác trên website.
          </p>
        </div>

        <p className="relative text-xs text-slate-500">
          © {new Date().getFullYear()} — Khu vực quản trị nội bộ.
        </p>
      </div>

      {/* Cột form */}
      <div className="flex w-full flex-1 items-center justify-center bg-slate-50 px-4 py-12 lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          {/* Logo hiện trên mobile, thay cho cột thương hiệu bị ẩn */}
          <div className="mb-6 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ptsc/logo-ptsc.png"
                alt="Logo công ty"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-slate-900">Trang quản trị</span>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
            <Lock className="h-5 w-5 text-cyan-700" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900">Đăng nhập quản trị</h2>
          <p className="mt-1 text-sm text-slate-500">Nhập mật khẩu quản trị để tiếp tục.</p>

          <label className="mt-6 block text-sm font-medium text-slate-700">
            Tên đăng nhập
            <input
              type="text"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="vd: admin"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-slate-700">
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            />
          </label>

          {error && (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="mt-6 w-full rounded-lg bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-cyan-900/10 transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
