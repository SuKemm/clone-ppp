// Chuyển 1 chuỗi tiếng Việt có dấu (ví dụ "Hoạt động PV Power") thành dạng
// slug dùng trong URL (ví dụ "hoat-dong-pv-power") — bỏ dấu, viết thường,
// khoảng trắng/ký tự đặc biệt thành dấu gạch ngang. Dùng cho URL danh mục
// (vd: /tin-tuc/chuyen-muc/hoat-dong-pv-power) thay vì query param.
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu (nguyên âm có dấu)
    .replace(/đ/gi, "d") // "đ" không thuộc nhóm dấu ở trên, xử lý riêng
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
