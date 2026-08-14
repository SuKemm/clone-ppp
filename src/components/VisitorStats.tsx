"use client";

// Khối "Thống kê truy cập" hiển thị ở footer (mọi trang, vì đây là số liệu
// toàn site chứ không riêng gì trang chủ).
//
// Số liệu lấy real-time từ API /api/visitors/stats (xem
// src/app/api/visitors/), dựa trên heartbeat thật của trình duyệt
// (src/lib/useVisitorTracking.ts) — "Đang online" chỉ tính người có
// heartbeat trong 60s gần nhất, không phải số ảo. `initial*` bên dưới chỉ
// là giá trị hiển thị tạm trong lúc chờ lần gọi API đầu tiên hoàn tất, để
// tránh UI nhấp nháy/hiện 0.

import { useVisitorTracking } from "@/lib/useVisitorTracking";

type VisitorStatsProps = {
  initialOnline?: number;
  initialToday?: number;
  initialThisWeek?: number;
  initialTotal?: number;
  isEnglish?: boolean;
};

function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.3 0-8 1.66-8 4.5V18h16v-1.5c0-2.84-4.7-4.5-8-4.5Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M8 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 12c-3 0-6.5 1.5-6.5 4v2h13v-2c0-2.5-3.5-4-6.5-4Zm7 .2c2.6.4 5.5 1.7 5.5 3.8v2h-4v-2c0-1.4-.6-2.6-1.5-3.8Z" />
    </svg>
  );
}

export function VisitorStats({
  initialOnline = 0,
  initialToday = 0,
  initialThisWeek = 0,
  initialTotal = 0,
  isEnglish = false,
}: VisitorStatsProps) {
  const { online, today, thisWeek, total } = useVisitorTracking({
    online: initialOnline,
    today: initialToday,
    thisWeek: initialThisWeek,
    total: initialTotal,
  });

  const rows = [
    { icon: <UserIcon />, label: isEnglish ? "Online now" : "Đang online", value: online },
    { icon: <UserIcon />, label: isEnglish ? "Today" : "Hôm nay", value: today },
    { icon: <UserIcon />, label: isEnglish ? "This week" : "Tuần này", value: thisWeek },
    { icon: <UsersIcon />, label: isEnglish ? "Total visits" : "Tổng truy cập", value: total },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-white">
        {isEnglish ? "Visitor Statistics" : "Thống kê truy cập"}
      </h3>
      <ul className="mt-4 space-y-2">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-3 text-slate-300">
            <span className="flex items-center gap-2">
              {row.icon}
              {row.label}
            </span>
            <span className="font-semibold text-white">
              {row.value.toLocaleString(isEnglish ? "en-US" : "vi-VN")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
