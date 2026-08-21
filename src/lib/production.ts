// Tính tự động sản lượng Tuần / Tháng / Quý / Năm bằng cách CỘNG DỒN các bản
// ghi "Sản lượng theo ngày" mà admin nhập mỗi ngày (collection
// "production-daily", xem src/lib/cms/schema.ts) — admin không cần tự cộng
// tay và nhập lại 4 con số như trước.
//
// Dùng chung cho cả trang tiếng Việt (src/app/page.tsx) và tiếng Anh
// (src/app/en-US/page.tsx) để tránh lệch logic giữa 2 bản.

export type ProductionDailyEntry = {
  ngay?: string; // "dd/mm/yyyy", admin nhập ở /admin
  san_luong?: string; // vd: "1.384,48" (dấu . = phân cách nghìn, dấu , = thập phân)
  [key: string]: string | undefined; // cho phép truyền thẳng CmsItem từ getCollection()
};

// "1.384,48" -> 1384.48. Chuỗi rỗng/không hợp lệ -> 0 (không cộng nhầm NaN).
export function parseVnNumber(value: string | undefined): number {
  if (!value) return 0;
  const cleaned = value.trim().replace(/\./g, "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isNaN(n) ? 0 : n;
}

// 1384.48 -> "1.384,48" — giữ đúng định dạng số kiểu Việt Nam như số liệu
// admin đang nhập tay trước đây.
export function formatVnNumber(value: number): string {
  return value.toLocaleString("vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// "15/08/2026" -> Date ở nửa đêm (local). Ngày sai định dạng -> null, để
// entry đó bị bỏ qua khi cộng dồn thay vì làm hỏng tổng của các ngày khác.
export function parseDmyDate(value: string | undefined): Date | null {
  if (!value) return null;
  const m = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const [, d, mo, y] = m;
  const date = new Date(Number(y), Number(mo) - 1, Number(d));
  return Number.isNaN(date.getTime()) ? null : date;
}

// "Hôm nay" tính theo giờ Việt Nam (server có thể chạy ở timezone khác VN),
// trả về Date ở nửa đêm để so sánh ngày-với-ngày cho chính xác.
export function getVnToday(now: Date = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? "0");
  return new Date(get("year"), get("month") - 1, get("day"));
}

function startOfWeekMonday(d: Date): Date {
  const day = d.getDay(); // 0 = Chủ nhật ... 6 = Thứ bảy
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const start = new Date(d);
  start.setDate(d.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);
  return start;
}

function endOfWeekSunday(d: Date): Date {
  const start = startOfWeekMonday(d);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

function quarterOf(month0: number): number {
  return Math.floor(month0 / 3) + 1; // month0: 0-11
}

export type ProductionTotals = {
  day: number;
  week: number;
  month: number;
  quarter: number;
  year: number;
};

// Cộng dồn: mỗi bản ghi ngày được xét vào tổng Ngày (nếu đúng hôm nay),
// Tuần (nếu rơi vào tuần hiện tại, Thứ 2 -> Chủ nhật), Tháng/Quý/Năm hiện
// tại tương ứng. Một ngày có thể vừa tính vào Ngày, vừa vào Tuần, Tháng,
// Quý, Năm cùng lúc — đúng bản chất "cộng dồn".
export function computeProductionTotals(
  entries: ProductionDailyEntry[],
  now: Date = new Date()
): ProductionTotals {
  const today = getVnToday(now);
  const weekStart = startOfWeekMonday(today);
  const weekEnd = endOfWeekSunday(today);

  const totals: ProductionTotals = { day: 0, week: 0, month: 0, quarter: 0, year: 0 };

  for (const entry of entries) {
    const date = parseDmyDate(entry.ngay);
    if (!date) continue;
    const value = parseVnNumber(entry.san_luong);
    if (value === 0) continue;

    if (date.getTime() === today.getTime()) totals.day += value;
    if (date >= weekStart && date <= weekEnd) totals.week += value;
    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
      totals.month += value;
    }
    if (
      date.getFullYear() === today.getFullYear() &&
      quarterOf(date.getMonth()) === quarterOf(today.getMonth())
    ) {
      totals.quarter += value;
    }
    if (date.getFullYear() === today.getFullYear()) totals.year += value;
  }

  return totals;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

const QUARTER_ROMAN = ["I", "II", "III", "IV"];

export type ProductionPeriodLabels = {
  ngay: string;
  tuan: string;
  thang: string;
  quy: string;
  nam: string;
};

const MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Nhãn hiển thị dưới mỗi số liệu, ví dụ "Ngày 21/08", "Tuần 18/08 - 24/08",
// "Tháng 08", "Quý III", "Năm 2026" — tự tính theo ngày hiện tại, không cần
// admin nhập tay. Bản tiếng Anh dùng tên tháng đầy đủ (January, February,
// ...) thay vì số, đúng văn phong tiếng Anh thay vì "Month 08".
export function getProductionPeriodLabels(
  now: Date = new Date(),
  lang: "vi" | "en" = "vi"
): ProductionPeriodLabels {
  const today = getVnToday(now);
  const weekStart = startOfWeekMonday(today);
  const weekEnd = endOfWeekSunday(today);
  const day = pad2(today.getDate());
  const month = pad2(today.getMonth() + 1);
  const year = String(today.getFullYear());
  const quarter = QUARTER_ROMAN[quarterOf(today.getMonth()) - 1];
  const weekRange = `${pad2(weekStart.getDate())}/${pad2(weekStart.getMonth() + 1)} - ${pad2(
    weekEnd.getDate()
  )}/${pad2(weekEnd.getMonth() + 1)}`;

  if (lang === "en") {
    const monthName = MONTH_NAMES_EN[today.getMonth()];
    return {
      ngay: `Day ${day}/${month}`,
      tuan: `Week ${weekRange}`,
      thang: monthName,
      quy: `Quarter ${quarter}`,
      nam: `Year ${year}`,
    };
  }

  return {
    ngay: `Ngày ${day}/${month}`,
    tuan: `Tuần ${weekRange}`,
    thang: `Tháng ${month}`,
    quy: `Quý ${quarter}`,
    nam: `Năm ${year}`,
  };
}
