"use client";

// Widget thời tiết hiển thị thời tiết khu vực Sơn Tây, Quảng Ngãi (nơi đặt
// nhà máy thủy điện Đakđrinh).
//
// TRƯỚC ĐÂY: widget này nằm "absolute" NGAY BÊN TRONG banner trang chủ
// (section overflow-hidden ở HeroSlider). Vì banner cuộn theo trang còn
// header lại "sticky top-0" (đứng yên, z-30) nên chỉ cần lướt xuống một chút
// là nửa trên của widget bị header đè/che mất, trông rất luộm thuộm — đúng
// như ảnh chụp màn hình người dùng gửi.
//
// BÂY GIỜ: đổi sang "fixed" (nổi cố định trên màn hình, không nằm trong
// banner nữa) với "top" đủ lớn để luôn nằm NGAY DƯỚI header, dù cuộn trang
// đến đâu — tức là nó "đi theo" người dùng khi lướt trang thay vì bị che.
// Có thêm nút đóng để người dùng tắt đi cho gọn nếu thấy vướng.

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
  X,
} from "lucide-react";

// Vị trí "fixed" — canh ngay dưới header (header cao dần theo breakpoint vì
// logo/khẩu hiệu lớn dần trên màn hình rộng), cách 2 bên trái/trên 1 khoảng
// nhỏ để không dính sát mép, và z-20 để luôn nổi trên nội dung trang nhưng
// vẫn thấp hơn header (z-30) lẫn menu dropdown của header.
const WIDGET_POSITION_CLASSES =
  "fixed left-3 top-[88px] z-20 sm:left-4 sm:top-[104px] lg:top-[124px]";

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
  const [dismissed, setDismissed] = useState(false);

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

  // Lỗi mạng/API sập: ẩn hẳn widget, không để lỗi phá layout trang.
  // Người dùng tự bấm đóng: tôn trọng lựa chọn đó, không hiện lại.
  if (error || dismissed) return null;

  if (!current) {
    return (
      <div className={`${WIDGET_POSITION_CLASSES} w-56 animate-pulse rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm`}>
        <div className="h-3 w-32 rounded bg-slate-300" />
        <div className="mt-3 h-8 w-20 rounded bg-slate-300" />
      </div>
    );
  }

  const { label, Icon } = weatherInfo(current.weatherCode, isEnglish);

  return (
    <div className={`${WIDGET_POSITION_CLASSES} w-60 rounded-xl bg-white/90 p-4 text-slate-800 shadow-lg backdrop-blur-sm`}>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={isEnglish ? "Close weather widget" : "Đóng widget thời tiết"}
        className="absolute right-2 top-2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <p className="pr-4 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
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
