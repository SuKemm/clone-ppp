// Bản dịch dự phòng cho "Chuyên mục" tin tức khi admin CHƯA điền field
// "Chuyên mục (EN)" (category_en) trong /admin.
//
// Trước đây, các trang tiếng Anh (/en-US/news, /en-US/news/[id]) chỉ dùng
// `item.category_en || item.category` — nếu category_en trống thì hiện
// thẳng tiếng Việt (vd "Hoạt động PV Power DHC") ngay trên bản EN, dù toàn
// bộ phần còn lại của trang đã là tiếng Anh. Vì dữ liệu tin tức do admin
// nhập trực tiếp (lưu trong file JSON riêng, không nằm trong repo này) nên
// không thể "sửa tận gốc" ở đây — chỉ có thể đảm bảo trang EN LUÔN hiển thị
// tiếng Anh bằng cách tra thêm 1 bảng dịch các tên chuyên mục đã biết trước
// khi đành phải rơi về tiếng Việt gốc.
//
// => Khi thêm chuyên mục mới trong /admin, tốt nhất vẫn nên điền
// "Chuyên mục (EN)" để chính xác tuyệt đối; bảng này chỉ là lưới an toàn.
const KNOWN_CATEGORY_TRANSLATIONS: Record<string, string> = {
  "Hoạt động PV Power": "PV Power Activities",
  "Hoạt động PV Power DHC": "PV Power DHC Activities",
  "Tin tức khác": "Other News",
  "Sản xuất - Kinh doanh": "Production & Business",
};

/**
 * Trả về nhãn chuyên mục tiếng Anh tốt nhất có thể:
 * 1. Dùng category_en nếu admin đã điền.
 * 2. Nếu chưa, tra bảng dịch các chuyên mục đã biết ở trên.
 * 3. Nếu vẫn không khớp (chuyên mục mới, hoàn toàn chưa từng thấy), đành
 *    hiện tạm tiếng Việt gốc — còn hơn để trống.
 */
export function resolveNewsCategoryEn(category: string, categoryEn?: string): string {
  if (categoryEn && categoryEn.trim()) return categoryEn;
  return KNOWN_CATEGORY_TRANSLATIONS[category] ?? category;
}
