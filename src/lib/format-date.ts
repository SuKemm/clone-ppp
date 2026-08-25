const WEEKDAYS_VI = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];
const WEEKDAYS_EN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// "date" lưu dạng "dd/mm/yyyy" -> suy ra thứ trong tuần tương ứng để hiển thị
// kiểu "Thứ ba, 18/08/2026". Trả về null nếu chuỗi ngày không hợp lệ.
function getWeekdayLabel(date: string, locale: "vi" | "en"): string | null {
  const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (Number.isNaN(d.getTime())) return null;
  return (locale === "en" ? WEEKDAYS_EN : WEEKDAYS_VI)[d.getDay()];
}

// Ghép "Ngày đăng" (field "date", vd "18/08/2026") với "Giờ đăng" (field
// "gio", vd "09:00") thành 1 chuỗi hiển thị duy nhất, dùng chung cho mọi nơi
// hiện tin tức (trang chủ, /tin-tuc, /tin-tuc/[id], bản EN...).
// - Có cả ngày + giờ  -> "Thứ ba, 18/08/2026 | 09:00"
// - Chỉ có ngày (bài cũ chưa nhập giờ, hoặc admin để trống) -> "Thứ ba, 18/08/2026"
// - Không có gì -> "" (nơi gọi tự ẩn phần ngày nếu rỗng)
export function formatNewsDateTime(
  date?: string,
  gio?: string,
  locale: "vi" | "en" = "vi"
): string {
  const d = (date ?? "").trim();
  const g = (gio ?? "").trim();
  const weekday = d ? getWeekdayLabel(d, locale) : null;
  const dateWithWeekday = weekday ? `${weekday}, ${d}` : d;
  if (dateWithWeekday && g) return `${dateWithWeekday} | ${g}`;
  return dateWithWeekday || g;
}
