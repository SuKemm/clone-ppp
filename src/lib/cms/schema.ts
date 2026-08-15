// Khai báo tất cả "collection" (loại nội dung) mà trang quản trị /admin có thể
// thêm/sửa/xoá, cùng dữ liệu mặc định ban đầu (seed) — chính là nội dung đang
// nằm cứng trong các trang trước đây, nay chuyển ra đây làm giá trị khởi tạo.
//
// Khi thêm 1 loại nội dung mới cần quản lý qua /admin, chỉ cần thêm 1 entry
// vào COLLECTIONS bên dưới rồi dùng `getCollection(id)` ở trang hiển thị.

export type FieldType = "text" | "textarea" | "date" | "image" | "gallery";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
};

export type CollectionId =
  | "news"
  | "projects"
  | "jobs"
  | "photo-albums"
  | "video-albums";

export type CollectionDef = {
  id: CollectionId;
  label: string; // tên hiển thị trong /admin
  fields: FieldDef[];
  seed: Record<string, string>[];
};

export const COLLECTIONS: CollectionDef[] = [
  {
    id: "news",
    label: "Tin tức",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text", required: true },
      { key: "category", label: "Chuyên mục", type: "text" },
      { key: "date", label: "Ngày đăng", type: "date" },
      { key: "excerpt", label: "Tóm tắt (hiện ở trang danh sách)", type: "textarea" },
      { key: "content", label: "Nội dung đầy đủ (hiện ở trang chi tiết bài)", type: "textarea" },
      { key: "image", label: "Ảnh minh hoạ", type: "image" },
    ],
    seed: [
      {
        date: "24/06/2026",
        title:
          "PTSC tổ chức thành công Lễ Đặt tên và Bàn giao FSO PTSC Lạc Đà Vàng, sẵn sàng cho mục tiêu First Oil của mỏ Lạc Đà Vàng",
        category: "Sản xuất - Kinh doanh",
      },
      {
        date: "20/06/2026",
        title: "Chủ động quản trị rủi ro, giữ vững tiến độ Dự án Khí Lô B – Gói EPCI#1",
        category: "Sản xuất - Kinh doanh",
      },
      {
        date: "18/06/2026",
        title:
          "ĐHĐCĐ PTSC 2026: PTSC khẳng định vị thế sau năm kinh doanh kỷ lục, hướng tới mục tiêu nâng cao năng lực cạnh tranh trong khu vực",
        category: "Sản xuất - Kinh doanh",
      },
      {
        date: "12/06/2026",
        title:
          "PVFCCo - Phú Mỹ và PTSC ký kết Thỏa thuận Hợp tác, tăng cường liên kết trong hệ sinh thái Petrovietnam",
        category: "Sản xuất - Kinh doanh",
      },
    ],
  },
  {
    id: "projects",
    label: "Dự án",
    fields: [
      { key: "title", label: "Tên dự án", type: "text", required: true },
      { key: "category", label: "Phân loại", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "image", label: "Ảnh minh hoạ", type: "image" },
    ],
    seed: [
      {
        title: "Dự án Gallaf 1",
        category: "Dự án dầu khí",
        description:
          "Thiết kế, mua sắm, thi công, vận hành và chạy thử 03 giàn đầu giếng và 01 cầu dẫn.",
      },
      {
        title: "Tổ hợp Hóa dầu miền Nam",
        category: "Dự án công nghiệp",
        description:
          "Triển khai gói A1 nhà máy Olefins với quy mô kỹ thuật và năng lực thi công cao.",
      },
      {
        title: "Kho cảng LNG Thị Vải",
        category: "Dự án công nghiệp",
        description:
          "Xây dựng trạm tiếp nhận và trữ khí LNG, đáp ứng nhu cầu vận hành an toàn, hiệu quả.",
      },
      {
        title: "Dự án Biển Đông 01",
        category: "Dự án dầu khí",
        description:
          "Thiết kế, mua sắm, thi công, vận hành và chạy thử giàn xử lý trung tâm Hải Thạch và giàn đầu giếng HT1 & MT1.",
      },
    ],
  },
  {
    id: "jobs",
    label: "Tuyển dụng",
    fields: [
      { key: "title", label: "Vị trí tuyển dụng", type: "text", required: true },
      { key: "location", label: "Địa điểm làm việc", type: "text" },
      { key: "deadline", label: "Hạn nộp hồ sơ", type: "date" },
      { key: "description", label: "Mô tả công việc", type: "textarea" },
    ],
    seed: [
      { title: "Kỹ sư cơ khí dầu khí", location: "", deadline: "", description: "" },
      { title: "Chuyên viên vận hành cảng", location: "", deadline: "", description: "" },
      { title: "Nhân viên an toàn HSEQ", location: "", deadline: "", description: "" },
      { title: "Chuyên viên quản lý dự án", location: "", deadline: "", description: "" },
    ],
  },
  {
    id: "photo-albums",
    label: "Thư viện ảnh (Album)",
    fields: [
      { key: "title", label: "Tên album", type: "text", required: true },
      { key: "date", label: "Ngày đăng", type: "date" },
      { key: "image", label: "Ảnh đại diện (hiện ở trang danh sách)", type: "image" },
      {
        key: "images",
        label: "Các ảnh trong album (khi bấm vào album trên web sẽ xem lần lượt các ảnh này)",
        type: "gallery",
      },
    ],
    seed: [
      { title: "Năm 2024", date: "12.03.2024", image: "/images/ptsc/project-gallaf.jpg" },
      { title: "Năm 2023", date: "20.11.2023", image: "/images/ptsc/service-fso.jpg" },
      { title: "Năm 2022", date: "08.08.2022", image: "/images/ptsc/service-cong-nghiep.jpg" },
    ],
  },
  {
    id: "video-albums",
    label: "Thư viện video",
    fields: [
      { key: "title", label: "Tên video", type: "text", required: true },
      { key: "date", label: "Ngày đăng", type: "date" },
      { key: "image", label: "Ảnh đại diện", type: "image" },
    ],
    seed: [
      {
        title: "Lễ khánh thành nhà máy",
        date: "15.09.2023",
        image: "/images/ptsc/project-lng.jpg",
      },
      {
        title: "Phóng sự hoạt động sản xuất",
        date: "02.06.2023",
        image: "/images/ptsc/service-bien.jpg",
      },
    ],
  },
];

export function getCollectionDef(id: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}
