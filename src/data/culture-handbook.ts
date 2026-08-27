// Nội dung "Sổ tay văn hóa" — mỗi phần tử là 1 trang/ảnh trong sổ tay.
// Đang dùng ảnh placeholder có sẵn trong /public/images/ptsc để trang chạy
// được ngay; hãy thay "image" bằng ảnh scan thật của sổ tay (đặt file vào
// /public/images/ptsc/ hoặc /public/uploads/ rồi sửa đường dẫn bên dưới).
export type HandbookPage = {
  image: string;
  caption: string;
  captionEn: string;
  content?: string;
  contentEn?: string;
};

export const cultureHandbookPages: HandbookPage[] = [
  {
    image: "/images/ptsc/service-nang-luong.jpg",
    caption: "Trang bìa — Sổ tay văn hóa PV Power DHC",
    captionEn: "Cover — PV Power DHC Culture Handbook",
  },
  {
    image: "/images/ptsc/service-tau.jpg",
    caption: "Tầm nhìn — Sứ mệnh",
    captionEn: "Vision — Mission",
  },
  {
    image: "/images/ptsc/service-cong-nghiep.jpg",
    caption: "Giá trị cốt lõi",
    captionEn: "Core values",
  },
  {
    image: "/images/ptsc/service-khao-sat.jpg",
    caption: "Chuẩn mực ứng xử",
    captionEn: "Code of conduct",
  },
  {
    image: "/images/ptsc/service-bien.jpg",
    caption: "Quy tắc an toàn — Chất lượng",
    captionEn: "Safety — Quality standards",
  },
  {
    image: "/images/ptsc/service-cang.jpg",
    caption: "Trang bìa sau",
    captionEn: "Back cover",
  },
];
