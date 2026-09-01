import { getCollection } from "@/lib/cms/store";

// "category" của từng bài Đấu thầu / Quan hệ cổ đông là 1 lựa chọn (select)
// trỏ tới collection danh mục riêng ("tender-categories" /
// "shareholder-categories"), lưu đúng tên tiếng Việt của danh mục (field
// "name") — bản dịch tiếng Anh nằm ở field "name_en" của CHÍNH danh mục đó,
// không nằm trên từng bài viết. Vì vậy trang EN không thể chỉ đọc thêm
// "category_en" trên item như bên tin tức, mà phải tra ngược sang collection
// danh mục để lấy "name_en" tương ứng.
//
// Nếu danh mục chưa được tạo hoặc admin chưa điền "Tên danh mục (EN)", tạm
// hiện lại tên tiếng Việt — còn hơn để trống.
function resolveCategoryEn(
  category: string,
  collection: "tender-categories" | "shareholder-categories"
): string {
  const match = getCollection(collection).find((c) => c.name === category);
  const nameEn = match?.name_en;
  return nameEn && nameEn.trim() ? nameEn : category;
}

export function resolveTenderCategoryEn(category: string): string {
  return resolveCategoryEn(category, "tender-categories");
}

export function resolveShareholderCategoryEn(category: string): string {
  return resolveCategoryEn(category, "shareholder-categories");
}
