"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ptsc_visitor_id";
const HEARTBEAT_MS = 25_000; // < 60s cửa sổ "online" ở server

export type VisitorStatsData = {
  online: number;
  today: number;
  thisWeek: number;
  total: number;
};

function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    // Safari private mode / localStorage bị chặn: id tạm cho phiên này
    return crypto.randomUUID();
  }
}

/**
 * Gửi heartbeat báo "mình đang mở trang" và định kỳ lấy lại số liệu thống
 * kê thật (đang online / hôm nay / tuần này / tổng) từ server.
 */
export function useVisitorTracking(initial: VisitorStatsData) {
  const [stats, setStats] = useState<VisitorStatsData>(initial);

  useEffect(() => {
    const visitorId = getOrCreateVisitorId();
    let cancelled = false;

    async function sendHeartbeatAndRefresh() {
      try {
        await fetch("/api/visitors/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
          keepalive: true,
        });
        const res = await fetch("/api/visitors/stats", { cache: "no-store" });
        if (!cancelled && res.ok) {
          const data = (await res.json()) as VisitorStatsData;
          setStats(data);
        }
      } catch {
        // Lỗi mạng tạm thời: giữ số liệu cũ, thử lại ở lần heartbeat sau.
      }
    }

    sendHeartbeatAndRefresh();
    const interval = setInterval(sendHeartbeatAndRefresh, HEARTBEAT_MS);

    function onVisible() {
      if (document.visibilityState === "visible") sendHeartbeatAndRefresh();
    }
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return stats;
}
