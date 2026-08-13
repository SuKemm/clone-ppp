"use client";

// Khối "Thống kê truy cập" hiển thị ở footer (mọi trang, vì đây là số liệu
// toàn site chứ không riêng gì trang chủ).
//
// LƯU Ý: hiện tại chưa có backend đếm lượt truy cập thật, nên component này
// đang nhận số liệu qua props (giá trị mẫu). Khi có API/analytics thật
// (ví dụ 1 API route tự viết ghi vào DB, hoặc lấy từ Google Analytics),
// chỉ cần fetch dữ liệu rồi truyền vào props bên dưới là xong — không cần
// sửa gì trong UI này.

type VisitorStatsProps = {
  online?: number;
  today?: number;
  thisWeek?: number;
  total?: number;
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
  online = 1,
  today = 33,
  thisWeek = 115,
  total = 52411,
}: VisitorStatsProps) {
  const rows = [
    { icon: <UserIcon />, label: "Đang online", value: online },
    { icon: <UserIcon />, label: "Hôm nay", value: today },
    { icon: <UserIcon />, label: "Tuần này", value: thisWeek },
    { icon: <UsersIcon />, label: "Tổng truy cập", value: total },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-white">Thống kê truy cập</h3>
      <ul className="mt-4 space-y-2">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-3 text-slate-300">
            <span className="flex items-center gap-2">
              {row.icon}
              {row.label}
            </span>
            <span className="font-semibold text-white">{row.value.toLocaleString("vi-VN")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
