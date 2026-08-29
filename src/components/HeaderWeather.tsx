"use client";

// Widget thời tiết gọn đặt trong thanh menu chính (kiểu baomoi.com): hiện
// tên tỉnh + nhiệt độ hiện tại, bấm vào mở danh sách tra thời tiết các tỉnh
// thành khác (có ô tìm kiếm). KHÔNG tự ẩn / không có nút đóng — luôn hiển
// thị cố định trong header.

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Snowflake,
  Search,
  ChevronDown,
} from "lucide-react";

type Province = { vi: string; en: string; lat: number; lon: number };

// Danh sách tỉnh/thành để tra cứu nhanh trong dropdown. Tỉnh đầu tiên
// (Quảng Ngãi) là mặc định vì đây là địa bàn đặt Nhà máy thủy điện Đakđrinh.
const PROVINCES: Province[] = [
  { vi: "Quảng Ngãi", en: "Quang Ngai", lat: 15.12, lon: 108.8 },
  { vi: "Hà Nội", en: "Ha Noi", lat: 21.03, lon: 105.85 },
  { vi: "Hồ Chí Minh", en: "Ho Chi Minh City", lat: 10.78, lon: 106.7 },
  { vi: "Đà Nẵng", en: "Da Nang", lat: 16.05, lon: 108.2 },
  { vi: "Hải Phòng", en: "Hai Phong", lat: 20.86, lon: 106.68 },
  { vi: "Cần Thơ", en: "Can Tho", lat: 10.03, lon: 105.78 },
  { vi: "Huế", en: "Hue", lat: 16.46, lon: 107.59 },
  { vi: "Lạng Sơn", en: "Lang Son", lat: 21.85, lon: 106.76 },
  { vi: "Lào Cai", en: "Lao Cai", lat: 22.48, lon: 103.97 },
  { vi: "Nghệ An", en: "Nghe An", lat: 18.68, lon: 105.68 },
  { vi: "Ninh Bình", en: "Ninh Binh", lat: 20.25, lon: 105.97 },
  { vi: "Phú Thọ", en: "Phu Tho", lat: 21.4, lon: 105.2 },
  { vi: "Thanh Hóa", en: "Thanh Hoa", lat: 19.8, lon: 105.78 },
  { vi: "Quảng Ninh", en: "Quang Ninh", lat: 21.0, lon: 107.3 },
  { vi: "Thái Nguyên", en: "Thai Nguyen", lat: 21.59, lon: 105.85 },
  { vi: "Bắc Giang", en: "Bac Giang", lat: 21.27, lon: 106.2 },
  { vi: "Nam Định", en: "Nam Dinh", lat: 20.42, lon: 106.17 },
  { vi: "Hà Tĩnh", en: "Ha Tinh", lat: 18.34, lon: 105.9 },
  { vi: "Quảng Trị", en: "Quang Tri", lat: 16.75, lon: 107.19 },
  { vi: "Quảng Nam", en: "Quang Nam", lat: 15.57, lon: 108.47 },
  { vi: "Bình Định", en: "Binh Dinh", lat: 13.78, lon: 109.22 },
  { vi: "Phú Yên", en: "Phu Yen", lat: 13.09, lon: 109.3 },
  { vi: "Khánh Hòa", en: "Khanh Hoa", lat: 12.24, lon: 109.19 },
  { vi: "Gia Lai", en: "Gia Lai", lat: 13.98, lon: 108.0 },
  { vi: "Đắk Lắk", en: "Dak Lak", lat: 12.71, lon: 108.24 },
  { vi: "Lâm Đồng", en: "Lam Dong", lat: 11.94, lon: 108.44 },
  { vi: "Đồng Nai", en: "Dong Nai", lat: 10.95, lon: 106.85 },
  { vi: "Bà Rịa - Vũng Tàu", en: "Ba Ria - Vung Tau", lat: 10.35, lon: 107.08 },
  { vi: "An Giang", en: "An Giang", lat: 10.52, lon: 105.13 },
  { vi: "Kiên Giang", en: "Kien Giang", lat: 10.01, lon: 105.08 },
  { vi: "Cà Mau", en: "Ca Mau", lat: 9.18, lon: 105.15 },
];

type ProvinceWeather = {
  temp: number;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
};

function weatherIcon(code: number) {
  if (code === 0) return Sun;
  if (code === 1 || code === 2) return CloudSun;
  if (code === 3) return Cloud;
  if (code === 45 || code === 48) return CloudFog;
  if ([51, 53, 55, 56, 57].includes(code)) return CloudDrizzle;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return CloudRain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return Snowflake;
  if ([95, 96, 99].includes(code)) return CloudLightning;
  return Cloud;
}

// Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu (gõ "quang ngai" vẫn ra
// "Quảng Ngãi").
function stripDiacritics(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export function HeaderWeather({ isEnglish = false }: { isEnglish?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [weatherByIndex, setWeatherByIndex] = useState<Record<number, ProvinceWeather>>({});
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Tải thời tiết cho TẤT CẢ tỉnh trong danh sách bằng 1 lần gọi API duy
  // nhất (Open-Meteo hỗ trợ nhiều toạ độ cách nhau bằng dấu phẩy), để danh
  // sách tra cứu hiện sẵn nhiệt độ từng nơi mà không cần đợi người dùng bấm.
  useEffect(() => {
    let cancelled = false;
    const lats = PROVINCES.map((p) => p.lat).join(",");
    const lons = PROVINCES.map((p) => p.lon).join(",");
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}` +
      `&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min` +
      `&timezone=Asia%2FBangkok&forecast_days=1`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("weather fetch failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list: any[] = Array.isArray(data) ? data : [data];
        const next: Record<number, ProvinceWeather> = {};
        list.forEach((entry, i) => {
          if (!entry?.current) return;
          next[i] = {
            temp: Math.round(entry.current.temperature_2m),
            weatherCode: entry.current.weather_code,
            tempMax: Math.round(entry.daily.temperature_2m_max[0]),
            tempMin: Math.round(entry.daily.temperature_2m_min[0]),
          };
        });
        setWeatherByIndex(next);
      })
      .catch(() => {
        /* Lỗi mạng: badge vẫn hiện tên tỉnh, chỉ là chưa có số liệu. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Đóng dropdown khi bấm ra ngoài.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return PROVINCES.map((p, i) => ({ ...p, index: i }));
    const q = stripDiacritics(query.trim());
    return PROVINCES.map((p, i) => ({ ...p, index: i })).filter((p) =>
      stripDiacritics(isEnglish ? p.en : p.vi).includes(q)
    );
  }, [query, isEnglish]);

  const current = weatherByIndex[selected];
  const CurrentIcon = weatherIcon(current?.weatherCode ?? 3);
  const currentName = isEnglish ? PROVINCES[selected].en : PROVINCES[selected].vi;

  return (
    <div ref={containerRef} className="relative hidden shrink-0 lg:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-slate-100 transition hover:text-cyan-300"
        aria-expanded={open}
        aria-label={isEnglish ? "Weather by province" : "Thời tiết theo tỉnh thành"}
      >
        <CurrentIcon className="h-5 w-5 shrink-0 text-cyan-300" strokeWidth={1.75} />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-xs font-semibold normal-case">{currentName}</span>
          <span className="text-[11px] font-medium normal-case text-slate-300">
            {current
              ? `${current.temp}°C / ${current.tempMin}°-${current.tempMax}°`
              : "--°C"}
          </span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-40 mt-2 w-72 overflow-hidden rounded-md bg-white text-slate-800 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEnglish ? "Search province / city..." : "Nhập tỉnh thành..."}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="max-h-80 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-slate-400">
                {isEnglish ? "No matching province." : "Không tìm thấy tỉnh thành phù hợp."}
              </p>
            ) : (
              filtered.map((p) => {
                const w = weatherByIndex[p.index];
                const Icon = weatherIcon(w?.weatherCode ?? 3);
                return (
                  <button
                    key={p.vi}
                    type="button"
                    onClick={() => {
                      setSelected(p.index);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-slate-50 ${
                      p.index === selected ? "bg-cyan-50" : ""
                    }`}
                  >
                    <span className="font-medium text-slate-700">
                      {isEnglish ? p.en : p.vi}
                    </span>
                    <span className="flex items-center gap-2 text-slate-500">
                      <span>{w ? `${w.temp}°C` : "--°C"}</span>
                      <Icon className="h-4 w-4 text-cyan-600" strokeWidth={1.75} />
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
