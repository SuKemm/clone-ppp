// Bỏ dấu tiếng Việt nhưng GIỮ NGUYÊN khoảng trắng, hoa/thường — khác với
// slugify() (dùng cho URL, viết thường + nối gạch ngang). Dùng làm phương
// án dự phòng để hiển thị tên/chức danh trên bản tiếng Anh khi admin chưa
// kịp nhập field "_en" tương ứng, thay vì để nguyên chữ có dấu.
export function removeVietnameseDiacritics(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu (nguyên âm có dấu)
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
