"use client";

// Widget thời tiết đặt ở góc trên-trái banner trang chủ, hiển thị thời tiết
// khu vực Sơn Tây, Quảng Ngãi (nơi đặt nhà máy thủy điện Đakđrinh).
//
// Nguồn dữ liệu: Open-Meteo (https://open-meteo.com) — miễn phí, KHÔNG cần
// API key, tổng hợp dữ liệu từ các cơ quan khí tượng quốc gia (NOAA, DWD,
// ECMWF...), được rất nhiều website/app thời tiết uy tín sử dụng.

import { useEffect, useState } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Snowflake,
  Droplets,
  Wind,
} from "lucide-react";

// Toạ độ gần đúng khu vực xã Sơn Tây, huyện Sơn Tây, tỉnh Quảng Ngãi — nơi
// đặt Nhà máy thủy điện Đakđrinh.
const LAT = 14.9;
const LON = 108.35;

const WEATHER_API_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
  `&timezone=Asia%2FBangkok&forecast_days=4`;

type CurrentWeather = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
};

type DailyForecast = {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
};

// Bảng mã thời tiết WMO (chuẩn Open-Meteo dùng) -> nhãn + icon, có cả bản
// tiếng Việt và tiếng Anh. Xem đầy đủ bảng mã tại: https://open-meteo.com/en/docs
// (mục "WMO Weather interpretation codes").
function weatherInfo(code: number, isEnglish: boolean) {
  if (code === 0) return { label: isEnglish ? "Clear sky" : "Trời quang", Icon: Sun };
  if (code === 1 || code === 2) return { label: isEnglish ? "Partly cloudy" : "Ít mây", Icon: CloudSun };
  if (code === 3) return { label: isEnglish ? "Overcast" : "Nhiều mây", Icon: Cloud };
  if (code === 45 || code === 48) return { label: isEnglish ? "Fog" : "Sương mù", Icon: CloudFog };
  if ([51, 53, 55, 56, 57].includes(code))
    return { label: isEnglish ? "Drizzle" : "Mưa phùn", Icon: CloudDrizzle };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { label: isEnglish ? "Rain" : "Có mưa", Icon: CloudRain };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { label: isEnglish ? "Snow" : "Có tuyết", Icon: Snowflake };
  if ([95, 96, 99].includes(code)) return { label: isEnglish ? "Thunderstorm" : "Dông", Icon: CloudLightning };
  return { label: isEnglish ? "Updating" : "Đang cập nhật", Icon: Cloud };
}

export function WeatherWidget({ isEnglish = false }: { isEnglish?: boolean }) {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [daily, setDaily] = useState<DailyForecast[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(WEATHER_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("weather fetch failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setCurrent({
          temperature: Math.round(data.current.temperature_2m),
          humidity: Math.round(data.current.relative_humidity_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
        });
        // Bỏ index 0 (hôm nay, đã hiện ở phần "hiện tại"), lấy 3 ngày kế tiếp.
        const days: DailyForecast[] = data.daily.time
          .slice(1, 4)
          .map((date: string, i: number) => ({
            date,
            weatherCode: data.daily.weather_code[i + 1],
            tempMax: Math.round(data.daily.temperature_2m_max[i + 1]),
            tempMin: Math.round(data.daily.temperature_2m_min[i + 1]),
          }));
        setDaily(days);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Lỗi mạng/API sập: ẩn hẳn widget, không để lỗi phá layout banner chính.
  if (error) return null;

  if (!current) {
    return (
      <div className="absolute left-4 top-4 z-10 w-56 animate-pulse rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:left-6 sm:top-6">
        <div className="h-3 w-32 rounded bg-slate-300" />
        <div className="mt-3 h-8 w-20 rounded bg-slate-300" />
      </div>
    );
  }

  const { label, Icon } = weatherInfo(current.weatherCode, isEnglish);

  return (
    <div className="absolute left-4 top-4 z-10 w-60 rounded-xl bg-white/90 p-4 text-slate-800 shadow-lg backdrop-blur-sm sm:left-6 sm:top-6">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {isEnglish ? "Weather in Son Tay, Quang Ngai" : "Thời tiết Sơn Tây, Quảng Ngãi"}
      </p>

      <div className="mt-2 flex items-center gap-3">
        <Icon className="h-10 w-10 shrink-0 text-cyan-600" strokeWidth={1.5} />
        <div>
          <p className="text-3xl font-bold leading-none text-slate-900">{current.temperature}°</p>
          <p className="mt-0.5 text-xs text-slate-500">{label}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 border-t border-slate-200 pt-3 text-xs text-slate-600">
        <span className="flex items-center gap-1">
          <Droplets className="h-3.5 w-3.5 text-cyan-600" />
          {current.humidity}%
        </span>
        <span className="flex items-center gap-1">
          <Wind className="h-3.5 w-3.5 text-cyan-600" />
          {current.windSpeed} km/h
        </span>
      </div>

      {daily.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-1 border-t border-slate-200 pt-3">
          {daily.map((d) => {
            const { Icon: DayIcon } = weatherInfo(d.weatherCode, isEnglish);
            const dayLabel = new Date(d.date).toLocaleDateString(isEnglish ? "en-US" : "vi-VN", {
              weekday: "short",
            });
            return (
              <div key={d.date} className="flex flex-col items-center gap-1">
                <span className="text-[10px] capitalize text-slate-500">{dayLabel}</span>
                <DayIcon className="h-4 w-4 text-cyan-600" strokeWidth={1.5} />
                <span className="text-[10px] font-medium text-slate-700">
                  {d.tempMax}°/{d.tempMin}°
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
