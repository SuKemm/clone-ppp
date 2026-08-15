// ============================================================================
// TIN TỨC - SỰ KIỆN — Đây là nơi DUY NHẤT bạn cần sửa khi muốn:
//   - Thêm bài viết mới
//   - Sửa nội dung bài đã có
//   - Xoá bài viết
// Không cần đụng vào bất kỳ file .tsx nào khác — trang danh sách
// (src/app/tin-tuc/page.tsx) và trang chi tiết từng bài
// (src/app/tin-tuc/[slug]/page.tsx) sẽ tự đọc dữ liệu từ đây.
//
// HƯỚNG DẪN THÊM 1 BÀI VIẾT MỚI:
// 1. Copy nguyên 1 khối { ... } bên dưới, dán vào ĐẦU mảng `newsArticles`
//    (bài mới nên để lên đầu để hiện đầu danh sách).
// 2. Đổi "slug" thành 1 chuỗi không dấu, không khoảng trắng, DUY NHẤT
//    (không trùng với bài nào khác) — đây sẽ là phần URL của bài viết,
//    ví dụ slug "khoi-cong-du-an-abc" -> URL sẽ là /tin-tuc/khoi-cong-du-an-abc
// 3. Điền title, category, date, excerpt.
// 4. "content" là mảng các đoạn văn — mỗi đoạn văn là 1 dòng string trong
//    dấu ngoặc kép, cách nhau bằng dấu phẩy. Muốn xuống dòng/thêm đoạn thì
//    thêm 1 dòng string mới vào mảng.
// 5. "image": nếu có ảnh minh hoạ, đưa file ảnh vào thư mục
//    public/images/news/ rồi điền đường dẫn dạng "/images/news/ten-file.jpg".
//    Để trống "" nếu chưa có ảnh.
//
// LƯU Ý: mỗi dòng phải kết thúc bằng dấu phẩy "," (trừ dòng/khối cuối cùng
// trong mảng), nếu không code sẽ báo lỗi khi build.
// ============================================================================

export type NewsArticle = {
  slug: string;
  title: string;
  category: string;
  date: string; // định dạng dd/mm/yyyy
  excerpt: string; // đoạn tóm tắt ngắn hiện ở trang danh sách
  content: string[]; // mỗi phần tử là 1 đoạn văn trong bài
  image?: string; // "/images/news/ten-file.jpg" hoặc "" nếu chưa có ảnh
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "ptsc-le-dat-ten-ban-giao-fso-lac-da-vang",
    title:
      "PTSC tổ chức thành công Lễ Đặt tên và Bàn giao FSO PTSC Lạc Đà Vàng, sẵn sàng cho mục tiêu First Oil của mỏ Lạc Đà Vàng",
    category: "Sản xuất - Kinh doanh",
    date: "24/06/2026",
    excerpt:
      "Sự kiện đánh dấu cột mốc quan trọng trong tiến độ triển khai dự án, sẵn sàng cho mục tiêu khai thác dòng dầu đầu tiên.",
    content: [
      "Sự kiện đánh dấu cột mốc quan trọng trong tiến độ triển khai dự án, sẵn sàng cho mục tiêu khai thác dòng dầu đầu tiên tại mỏ Lạc Đà Vàng.",
      "Nội dung chi tiết bài viết sẽ được cập nhật tại đây — bạn có thể chỉnh sửa trực tiếp trong file src/data/news.ts.",
    ],
    image: "",
  },
  {
    slug: "chu-dong-quan-tri-rui-ro-du-an-khi-lo-b",
    title: "Chủ động quản trị rủi ro, giữ vững tiến độ Dự án Khí Lô B – Gói EPCI#1",
    category: "Sản xuất - Kinh doanh",
    date: "20/06/2026",
    excerpt: "Công tác quản trị rủi ro được triển khai đồng bộ nhằm đảm bảo tiến độ tổng thể của dự án.",
    content: [
      "Công tác quản trị rủi ro được triển khai đồng bộ nhằm đảm bảo tiến độ tổng thể của dự án.",
      "Nội dung chi tiết bài viết sẽ được cập nhật tại đây — bạn có thể chỉnh sửa trực tiếp trong file src/data/news.ts.",
    ],
    image: "",
  },
  {
    slug: "dhdcd-ptsc-2026",
    title:
      "ĐHĐCĐ PTSC 2026: PTSC khẳng định vị thế sau năm kinh doanh kỷ lục, hướng tới mục tiêu nâng cao năng lực cạnh tranh trong khu vực",
    category: "Sản xuất - Kinh doanh",
    date: "18/06/2026",
    excerpt: "Đại hội đồng cổ đông thường niên thông qua các chỉ tiêu và định hướng phát triển giai đoạn tới.",
    content: [
      "Đại hội đồng cổ đông thường niên thông qua các chỉ tiêu và định hướng phát triển giai đoạn tới.",
      "Nội dung chi tiết bài viết sẽ được cập nhật tại đây — bạn có thể chỉnh sửa trực tiếp trong file src/data/news.ts.",
    ],
    image: "",
  },
  {
    slug: "pvfcco-ptsc-ky-ket-thoa-thuan-hop-tac",
    title: "PVFCCo - Phú Mỹ và PTSC ký kết Thỏa thuận Hợp tác, tăng cường liên kết trong hệ sinh thái Petrovietnam",
    category: "Sản xuất - Kinh doanh",
    date: "12/06/2026",
    excerpt: "Thỏa thuận hợp tác nhằm tăng cường liên kết, phát huy thế mạnh của các đơn vị trong hệ sinh thái Petrovietnam.",
    content: [
      "Thỏa thuận hợp tác nhằm tăng cường liên kết, phát huy thế mạnh của các đơn vị trong hệ sinh thái Petrovietnam.",
      "Nội dung chi tiết bài viết sẽ được cập nhật tại đây — bạn có thể chỉnh sửa trực tiếp trong file src/data/news.ts.",
    ],
    image: "",
  },
];
