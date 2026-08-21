"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Không render gì ra giao diện — chỉ âm thầm gọi router.refresh() theo chu kỳ
 * để trang gọi lại Server Component (page.tsx) và lấy dữ liệu MỚI NHẤT: số
 * liệu sản xuất từ /admin và các nhãn "Ngày/Tháng/Quý/Năm" tự tính theo giờ
 * hiện tại. Nhờ vậy khối "Thông tin sản xuất" tự cập nhật theo thời gian
 * thực (ví dụ sang ngày mới, nhãn "Ngày 12/08" tự nhảy thành "Ngày 13/08")
 * mà người dùng không cần bấm F5 tải lại trang.
 *
 * intervalMs mặc định 60s — đủ nhanh để cảm giác "thời gian thực" nhưng
 * không gọi server quá dồn dập.
 */
export function AutoRefresh({ intervalMs = 60_000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);

  return null;
}
