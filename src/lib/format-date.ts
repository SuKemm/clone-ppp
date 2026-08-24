// Ghép "Ngày đăng" (field "date", vd "24/06/2026") với "Giờ đăng" (field
// "gio", vd "14:30") thành 1 chuỗi hiển thị duy nhất, dùng chung cho mọi nơi
// hiện tin tức (trang chủ, /tin-tuc, /tin-tuc/[id], bản EN...).
// - Có cả ngày + giờ  -> "24/06/2026 - 14:30"
// - Chỉ có ngày (bài cũ chưa nhập giờ, hoặc admin để trống) -> "24/06/2026"
// - Không có gì -> "" (nơi gọi tự ẩn phần ngày nếu rỗng)
export function formatNewsDateTime(date?: string, gio?: string): string {
  const d = (date ?? "").trim();
  const g = (gio ?? "").trim();
  if (d && g) return `${d} - ${g}`;
  return d || g;
}
