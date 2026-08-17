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

// Với mỗi trường tiếng Việt cần có bản tiếng Anh song song (hiển thị ở các
// trang /en-US/...), ta khai báo thêm 1 field "<key>_en" cùng loại. Trang
// Admin sẽ tự nhận field nào có hậu tố "_en" để hiện nút "Dịch tự động" ngay
// cạnh field tiếng Việt gốc — xem `translationPairs()` bên dưới.
export function translationPairs(def: CollectionDef): { source: FieldDef; target: FieldDef }[] {
  const pairs: { source: FieldDef; target: FieldDef }[] = [];
  for (const target of def.fields) {
    if (!target.key.endsWith("_en")) continue;
    const sourceKey = target.key.slice(0, -3);
    const source = def.fields.find((f) => f.key === sourceKey);
    if (source) pairs.push({ source, target });
  }
  return pairs;
}

export const COLLECTIONS: CollectionDef[] = [
  {
    id: "news",
    label: "Tin tức",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text", required: true },
      { key: "title_en", label: "Tiêu đề (EN)", type: "text" },
      { key: "category", label: "Chuyên mục", type: "text" },
      { key: "category_en", label: "Chuyên mục (EN)", type: "text" },
      { key: "date", label: "Ngày đăng", type: "date" },
      { key: "excerpt", label: "Tóm tắt (hiện ở trang danh sách)", type: "textarea" },
      { key: "excerpt_en", label: "Tóm tắt (EN)", type: "textarea" },
      { key: "content", label: "Nội dung đầy đủ (hiện ở trang chi tiết bài)", type: "textarea" },
      { key: "content_en", label: "Nội dung đầy đủ (EN)", type: "textarea" },
      { key: "image", label: "Ảnh minh hoạ", type: "image" },
    ],
    seed: [
      {
        date: "24/06/2026",
        title:
          "PTSC tổ chức thành công Lễ Đặt tên và Bàn giao FSO PTSC Lạc Đà Vàng, sẵn sàng cho mục tiêu First Oil của mỏ Lạc Đà Vàng",
        title_en:
          "PTSC Successfully Holds Naming and Handover Ceremony for FSO PTSC Lac Da Vang, Ready for the Lac Da Vang Field's First Oil Target",
        category: "Sản xuất - Kinh doanh",
        category_en: "Production & Business",
      },
      {
        date: "20/06/2026",
        title: "Chủ động quản trị rủi ro, giữ vững tiến độ Dự án Khí Lô B – Gói EPCI#1",
        title_en:
          "Proactive Risk Management Keeps the Block B Gas Project – EPCI#1 Package on Schedule",
        category: "Sản xuất - Kinh doanh",
        category_en: "Production & Business",
      },
      {
        date: "18/06/2026",
        title:
          "ĐHĐCĐ PTSC 2026: PTSC khẳng định vị thế sau năm kinh doanh kỷ lục, hướng tới mục tiêu nâng cao năng lực cạnh tranh trong khu vực",
        title_en:
          "PTSC's 2026 Annual General Meeting: PTSC Affirms Its Position After a Record Business Year, Aiming to Strengthen Regional Competitiveness",
        category: "Sản xuất - Kinh doanh",
        category_en: "Production & Business",
      },
      {
        date: "12/06/2026",
        title:
          "PVFCCo - Phú Mỹ và PTSC ký kết Thỏa thuận Hợp tác, tăng cường liên kết trong hệ sinh thái Petrovietnam",
        title_en:
          "PVFCCo - Phu My and PTSC Sign Cooperation Agreement to Strengthen Ties Within the Petrovietnam Ecosystem",
        category: "Sản xuất - Kinh doanh",
        category_en: "Production & Business",
      },
    ],
  },
  {
    id: "projects",
    label: "Dự án",
    fields: [
      { key: "title", label: "Tên dự án", type: "text", required: true },
      { key: "title_en", label: "Tên dự án (EN)", type: "text" },
      { key: "category", label: "Phân loại", type: "text" },
      { key: "category_en", label: "Phân loại (EN)", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "description_en", label: "Mô tả (EN)", type: "textarea" },
      { key: "image", label: "Ảnh minh hoạ", type: "image" },
    ],
    seed: [
      {
        title: "Dự án Gallaf 1",
        title_en: "Gallaf 1 Project",
        category: "Dự án dầu khí",
        category_en: "Oil & Gas Project",
        description:
          "Thiết kế, mua sắm, thi công, vận hành và chạy thử 03 giàn đầu giếng và 01 cầu dẫn.",
        description_en:
          "Design, procurement, construction, operation, and commissioning of three wellhead platforms and one bridge link.",
      },
      {
        title: "Tổ hợp Hóa dầu miền Nam",
        title_en: "Southern Petrochemical Complex",
        category: "Dự án công nghiệp",
        category_en: "Industrial Project",
        description:
          "Triển khai gói A1 nhà máy Olefins với quy mô kỹ thuật và năng lực thi công cao.",
        description_en:
          "Delivery of the Olefins Plant Package A1, reflecting a high level of technical scale and construction capability.",
      },
      {
        title: "Kho cảng LNG Thị Vải",
        title_en: "Thi Vai LNG Terminal",
        category: "Dự án công nghiệp",
        category_en: "Industrial Project",
        description:
          "Xây dựng trạm tiếp nhận và trữ khí LNG, đáp ứng nhu cầu vận hành an toàn, hiệu quả.",
        description_en:
          "Construction of an LNG receiving and storage terminal, ensuring safe and efficient operation.",
      },
      {
        title: "Dự án Biển Đông 01",
        title_en: "Bien Dong 01 Project",
        category: "Dự án dầu khí",
        category_en: "Oil & Gas Project",
        description:
          "Thiết kế, mua sắm, thi công, vận hành và chạy thử giàn xử lý trung tâm Hải Thạch và giàn đầu giếng HT1 & MT1.",
        description_en:
          "Design, procurement, construction, operation, and commissioning of the Hai Thach central processing platform and the HT1 & MT1 wellhead platforms.",
      },
    ],
  },
  {
    id: "jobs",
    label: "Tuyển dụng",
    fields: [
      { key: "title", label: "Vị trí tuyển dụng", type: "text", required: true },
      { key: "title_en", label: "Vị trí tuyển dụng (EN)", type: "text" },
      { key: "location", label: "Địa điểm làm việc", type: "text" },
      { key: "location_en", label: "Địa điểm làm việc (EN)", type: "text" },
      { key: "deadline", label: "Hạn nộp hồ sơ", type: "date" },
      { key: "description", label: "Mô tả công việc", type: "textarea" },
      { key: "description_en", label: "Mô tả công việc (EN)", type: "textarea" },
    ],
    seed: [
      {
        title: "Kỹ sư cơ khí dầu khí",
        title_en: "Oil & Gas Mechanical Engineer",
        location: "",
        location_en: "",
        deadline: "",
        description: "",
      },
      {
        title: "Chuyên viên vận hành cảng",
        title_en: "Port Operations Specialist",
        location: "",
        location_en: "",
        deadline: "",
        description: "",
      },
      {
        title: "Nhân viên an toàn HSEQ",
        title_en: "HSEQ Safety Officer",
        location: "",
        location_en: "",
        deadline: "",
        description: "",
      },
      {
        title: "Chuyên viên quản lý dự án",
        title_en: "Project Management Specialist",
        location: "",
        location_en: "",
        deadline: "",
        description: "",
      },
    ],
  },
  {
    id: "photo-albums",
    label: "Thư viện ảnh (Album)",
    fields: [
      { key: "title", label: "Tên album", type: "text", required: true },
      { key: "title_en", label: "Tên album (EN)", type: "text" },
      { key: "date", label: "Ngày đăng", type: "date" },
      { key: "image", label: "Ảnh đại diện (hiện ở trang danh sách)", type: "image" },
      {
        key: "images",
        label: "Các ảnh trong album (khi bấm vào album trên web sẽ xem lần lượt các ảnh này)",
        type: "gallery",
      },
    ],
    seed: [
      {
        title: "Năm 2024",
        title_en: "Year 2024",
        date: "12.03.2024",
        image: "/images/ptsc/project-gallaf.jpg",
      },
      {
        title: "Năm 2023",
        title_en: "Year 2023",
        date: "20.11.2023",
        image: "/images/ptsc/service-fso.jpg",
      },
      {
        title: "Năm 2022",
        title_en: "Year 2022",
        date: "08.08.2022",
        image: "/images/ptsc/service-cong-nghiep.jpg",
      },
    ],
  },
  {
    id: "video-albums",
    label: "Thư viện video",
    fields: [
      { key: "title", label: "Tên video", type: "text", required: true },
      { key: "title_en", label: "Tên video (EN)", type: "text" },
      { key: "date", label: "Ngày đăng", type: "date" },
      { key: "image", label: "Ảnh đại diện", type: "image" },
    ],
    seed: [
      {
        title: "Lễ khánh thành nhà máy",
        title_en: "Plant Inauguration Ceremony",
        date: "15.09.2023",
        image: "/images/ptsc/project-lng.jpg",
      },
      {
        title: "Phóng sự hoạt động sản xuất",
        title_en: "Production Activities Documentary",
        date: "02.06.2023",
        image: "/images/ptsc/service-bien.jpg",
      },
    ],
  },
];

export function getCollectionDef(id: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}
