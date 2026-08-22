// Khai báo tất cả "collection" (loại nội dung) mà trang quản trị /admin có thể
// thêm/sửa/xoá, cùng dữ liệu mặc định ban đầu (seed) — chính là nội dung đang
// nằm cứng trong các trang trước đây, nay chuyển ra đây làm giá trị khởi tạo.
//
// Khi thêm 1 loại nội dung mới cần quản lý qua /admin, chỉ cần thêm 1 entry
// vào COLLECTIONS bên dưới rồi dùng `getCollection(id)` ở trang hiển thị.

export type FieldType = "text" | "textarea" | "richtext" | "date" | "image" | "gallery" | "file" | "select";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  // Dùng cho field type "select":
  // - options: danh sách cố định, khai báo thẳng trong schema.
  // - optionsFrom: lấy danh sách động từ 1 collection khác (vd: "news-categories"),
  //   dùng field "name" của mỗi item trong collection đó làm nhãn hiển thị + giá trị lưu.
  options?: string[];
  optionsFrom?: CollectionId;
  // "half": field này xếp chung 1 hàng với field "half" liền sau nó (2 cột,
  // giống layout trang quản trị dakdrinh.com.vn). Mặc định ("full" / không
  // khai báo) chiếm trọn 1 hàng. Chỉ ghép được 2 field "half" liên tiếp nhau
  // trong mảng `fields` — xem `buildFieldRows()` ở AdminApp.tsx.
  width?: "half" | "full";
};

export type CollectionId =
  | "news"
  | "news-categories"
  | "projects"
  | "jobs"
  | "photo-albums"
  | "video-albums"
  | "site-marquee"
  | "production-info"
  | "production-daily"
  | "contacts"
  | "shareholder-categories"
  | "shareholder-relations"
  | "tender-categories"
  | "tenders"
  | "company-overview"
  | "company-stats"
  | "company-timeline"
  | "company-specs"
  | "company-awards"
  | "shareholders-list"
  | "leadership"
  | "units-page"
  | "culture-handbook-pages";

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
    id: "news-categories",
    label: "Danh mục Tin tức",
    fields: [
      { key: "name", label: "Tên danh mục", type: "text", required: true },
      { key: "name_en", label: "Tên danh mục (EN)", type: "text" },
    ],
    seed: [
      { name: "Hoạt động Cộng đồng", name_en: "Community Activities" },
      { name: "Hoạt động của ngành điện", name_en: "Power Industry News" },
      { name: "Sản xuất - Kinh doanh", name_en: "Production & Business" },
      { name: "Tin tức khác", name_en: "Other News" },
    ],
  },
  {
    id: "news",
    label: "Tin tức",
    fields: [
      { key: "category", label: "Chuyên mục", type: "select", optionsFrom: "news-categories" },
      { key: "title", label: "Tiêu đề", type: "text", required: true, width: "half" },
      { key: "title_en", label: "Tiêu đề (EN)", type: "text", width: "half" },
      { key: "excerpt", label: "Tóm tắt (hiện ở trang danh sách)", type: "textarea", width: "half" },
      { key: "excerpt_en", label: "Tóm tắt (EN)", type: "textarea", width: "half" },
      { key: "date", label: "Ngày đăng", type: "date", width: "half" },
      { key: "category_en", label: "Chuyên mục (EN)", type: "text", width: "half" },
      { key: "image", label: "Ảnh đại diện", type: "image" },
      { key: "content", label: "Nội dung đầy đủ (hiện ở trang chi tiết bài)", type: "richtext" },
      { key: "content_en", label: "Nội dung đầy đủ (EN)", type: "richtext" },
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
    id: "shareholder-categories",
    label: "Danh mục Quan hệ cổ đông",
    fields: [
      { key: "name", label: "Tên danh mục", type: "text", required: true },
      { key: "name_en", label: "Tên danh mục (EN)", type: "text" },
    ],
    seed: [
      { name: "Thông tin / tài liệu cổ đông", name_en: "Shareholder information / documents" },
      { name: "Đại hội cổ đông", name_en: "General meeting of shareholders" },
      { name: "Báo cáo tài chính / Báo cáo thường niên", name_en: "Financial statements / Annual report" },
    ],
  },
  {
    id: "shareholder-relations",
    label: "Danh sách Quan hệ cổ đông",
    fields: [
      { key: "category", label: "Danh mục", type: "select", optionsFrom: "shareholder-categories", width: "half" },
      { key: "date", label: "Ngày cập nhật", type: "text", width: "half" },
      { key: "title", label: "Tiêu đề", type: "text", required: true, width: "half" },
      { key: "title_en", label: "Tiêu đề (EN)", type: "text", width: "half" },
      { key: "excerpt", label: "Tóm tắt (hiện ở trang danh sách)", type: "textarea", width: "half" },
      { key: "excerpt_en", label: "Tóm tắt (EN)", type: "textarea", width: "half" },
      // Ảnh đại diện riêng cho từng bài — nếu admin không chọn ảnh, trang sẽ
      // tự dùng logo công ty làm ảnh dự phòng (xem FALLBACK_IMAGE trong
      // shareholder-relations.tsx).
      { key: "image", label: "Ảnh đại diện (hiện ở trang danh sách)", type: "image" },
      { key: "attachment", label: "File đính kèm (PDF)", type: "file" },
      { key: "content", label: "Nội dung đầy đủ (hiện ở trang chi tiết)", type: "richtext" },
      { key: "content_en", label: "Nội dung đầy đủ (EN)", type: "richtext" },
    ],
    seed: [
      {
        category: "Thông tin / tài liệu cổ đông",
        date: "cập nhật gần nhất",
        title: "Thông báo chốt danh sách cổ đông",
        title_en: "Notice of Shareholder Record Date",
        excerpt: "Thông báo về ngày đăng ký cuối cùng để thực hiện quyền của cổ đông hiện hữu.",
        excerpt_en: "Notice of the final registration date for existing shareholders to exercise their rights.",
        image: "/images/ptsc/project-hd-mien-nam.jpg",
      },
      {
        category: "Thông tin / tài liệu cổ đông",
        date: "cập nhật gần nhất",
        title: "Điều lệ và quy chế quản trị công ty",
        title_en: "Company Charter and Governance Regulations",
        excerpt: "Bản cập nhật Điều lệ tổ chức và hoạt động, Quy chế quản trị nội bộ của công ty.",
        excerpt_en: "Updated Charter of organization and operation, and internal Corporate Governance Regulations.",
        image: "/images/ptsc/service-fso.jpg",
      },
      {
        category: "Thông tin / tài liệu cổ đông",
        date: "cập nhật gần nhất",
        title: "Công bố thông tin định kỳ",
        title_en: "Periodic Information Disclosure",
        excerpt: "Các tài liệu công bố thông tin định kỳ theo quy định dành cho công ty đại chúng.",
        excerpt_en: "Periodic disclosure documents required for a public company.",
        image: "/images/ptsc/project-lng.jpg",
      },
      {
        category: "Thông tin / tài liệu cổ đông",
        date: "cập nhật gần nhất",
        title: "Danh sách người có liên quan sở hữu cổ phiếu",
        title_en: "List of Related Persons Holding Shares",
        excerpt: "Danh sách công bố định kỳ về người nội bộ và người có liên quan.",
        excerpt_en: "Periodic disclosure of insiders and related persons.",
        image: "/images/ptsc/service-cong-nghiep.jpg",
      },
      {
        category: "Thông tin / tài liệu cổ đông",
        date: "cập nhật gần nhất",
        title: "Nghị quyết Hội đồng quản trị",
        title_en: "Board of Directors' Resolutions",
        excerpt: "Các nghị quyết, quyết định của Hội đồng quản trị công bố tới cổ đông.",
        excerpt_en: "Resolutions and decisions of the Board of Directors disclosed to shareholders.",
        image: "/images/ptsc/project-bien-dong.jpg",
      },
      {
        category: "Thông tin / tài liệu cổ đông",
        date: "cập nhật gần nhất",
        title: "Thông báo giao dịch cổ phiếu của cổ đông nội bộ",
        title_en: "Notice of Share Transactions by Internal Shareholders",
        excerpt: "Thông báo về việc mua/bán cổ phiếu của cổ đông nội bộ và người liên quan.",
        excerpt_en: "Notice of share purchases/sales by internal shareholders and related persons.",
        image: "/images/ptsc/service-fso.jpg",
      },
      {
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Thông báo mời họp Đại hội đồng cổ đông thường niên",
        title_en: "Notice of Annual General Meeting of Shareholders",
        excerpt: "Thư mời và tài liệu họp gửi tới quý cổ đông trước thềm Đại hội đồng cổ đông thường niên.",
        excerpt_en: "Invitation letter and meeting documents sent to shareholders ahead of the Annual General Meeting.",
        image: "/images/ptsc/service-cong-nghiep.jpg",
      },
      {
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Biên bản và Nghị quyết Đại hội đồng cổ đông thường niên",
        title_en: "Minutes and Resolutions of the Annual General Meeting",
        excerpt: "Tổng hợp các nội dung đã được thông qua tại Đại hội đồng cổ đông thường niên.",
        excerpt_en: "Summary of resolutions approved at the Annual General Meeting of Shareholders.",
        image: "/images/ptsc/project-bien-dong.jpg",
      },
      {
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Tài liệu Đại hội đồng cổ đông bất thường",
        title_en: "Extraordinary General Meeting Documents",
        excerpt: "Tài liệu liên quan tới các nội dung trình Đại hội đồng cổ đông bất thường (nếu có).",
        excerpt_en: "Documents related to matters submitted to an Extraordinary General Meeting, if any.",
        image: "/images/ptsc/project-hd-mien-nam.jpg",
      },
      {
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Quy chế tổ chức Đại hội đồng cổ đông",
        title_en: "Rules of Procedure for the General Meeting of Shareholders",
        excerpt: "Quy chế làm việc và biểu quyết áp dụng tại Đại hội đồng cổ đông.",
        excerpt_en: "Rules of procedure and voting applicable at the General Meeting of Shareholders.",
        image: "/images/ptsc/service-fso.jpg",
      },
      {
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Tài liệu ứng cử, đề cử thành viên HĐQT/BKS",
        title_en: "Board/Supervisory Board Nomination Documents",
        excerpt: "Hồ sơ ứng cử, đề cử nhân sự trình Đại hội đồng cổ đông thông qua.",
        excerpt_en: "Nomination dossiers for personnel submitted to the General Meeting of Shareholders.",
        image: "/images/ptsc/project-lng.jpg",
      },
      {
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Video/hình ảnh Đại hội đồng cổ đông thường niên",
        title_en: "Photos/Video of the Annual General Meeting",
        excerpt: "Tổng hợp hình ảnh và video ghi nhận tại Đại hội đồng cổ đông thường niên.",
        excerpt_en: "Collection of photos and videos recorded at the Annual General Meeting of Shareholders.",
        image: "/images/ptsc/project-bien-dong.jpg",
      },
      {
        category: "Báo cáo tài chính / Báo cáo thường niên",
        date: "cập nhật gần nhất",
        title: "Báo cáo tài chính đã kiểm toán",
        title_en: "Audited Financial Statements",
        excerpt: "Báo cáo tài chính năm đã được kiểm toán bởi đơn vị kiểm toán độc lập.",
        excerpt_en: "Annual financial statements audited by an independent auditor.",
        image: "/images/ptsc/service-fso.jpg",
      },
      {
        category: "Báo cáo tài chính / Báo cáo thường niên",
        date: "cập nhật gần nhất",
        title: "Báo cáo thường niên",
        title_en: "Annual Report",
        excerpt: "Tổng quan kết quả hoạt động sản xuất kinh doanh và định hướng phát triển của công ty.",
        excerpt_en: "Overview of business results and the company's development orientation.",
        image: "/images/ptsc/project-lng.jpg",
      },
      {
        category: "Báo cáo tài chính / Báo cáo thường niên",
        date: "cập nhật gần nhất",
        title: "Báo cáo tài chính các quý trong năm",
        title_en: "Quarterly Financial Statements",
        excerpt: "Báo cáo tài chính theo từng quý gửi tới cổ đông và nhà đầu tư.",
        excerpt_en: "Quarterly financial statements provided to shareholders and investors.",
        image: "/images/ptsc/service-cong-nghiep.jpg",
      },
      {
        category: "Báo cáo tài chính / Báo cáo thường niên",
        date: "cập nhật gần nhất",
        title: "Báo cáo phát triển bền vững",
        title_en: "Sustainability Report",
        excerpt: "Báo cáo về các hoạt động phát triển bền vững, môi trường và xã hội.",
        excerpt_en: "Report on sustainability, environmental and social activities.",
        image: "/images/ptsc/project-bien-dong.jpg",
      },
      {
        category: "Báo cáo tài chính / Báo cáo thường niên",
        date: "cập nhật gần nhất",
        title: "Giải trình biến động kết quả kinh doanh",
        title_en: "Explanation of Business Results Fluctuation",
        excerpt: "Giải trình chênh lệch lợi nhuận sau thuế theo quy định công bố thông tin.",
        excerpt_en: "Explanation of after-tax profit variance as required for information disclosure.",
        image: "/images/ptsc/project-hd-mien-nam.jpg",
      },
      {
        category: "Báo cáo tài chính / Báo cáo thường niên",
        date: "cập nhật gần nhất",
        title: "Báo cáo tài chính hợp nhất",
        title_en: "Consolidated Financial Statements",
        excerpt: "Báo cáo tài chính hợp nhất toàn Tổng công ty đã được kiểm toán.",
        excerpt_en: "Audited consolidated financial statements of the whole Corporation.",
        image: "/images/ptsc/service-fso.jpg",
      },
    ],
  },
  {
    // Danh mục (tab) cho mục Đấu thầu — giống cấu trúc "shareholder-categories"
    // ở trên. Trước đây mục "Đấu thầu" trên menu trỏ tới trang tĩnh /don-vi
    // (Thông tin doanh nghiệp); nay thay bằng nội dung thật, quản trị được
    // qua Admin.
    id: "tender-categories",
    label: "Danh mục Đấu thầu",
    fields: [
      { key: "name", label: "Tên danh mục", type: "text", required: true },
      { key: "name_en", label: "Tên danh mục (EN)", type: "text" },
    ],
    seed: [
      { name: "Thông báo mời thầu", name_en: "Invitation for Bids" },
      { name: "Kế hoạch lựa chọn nhà thầu", name_en: "Contractor Selection Plan" },
      { name: "Kết quả lựa chọn nhà thầu", name_en: "Contractor Selection Results" },
      { name: "Thông báo mời sơ tuyển", name_en: "Pre-qualification Notice" },
    ],
  },
  {
    id: "tenders",
    label: "Danh sách Đấu thầu",
    fields: [
      { key: "category", label: "Danh mục", type: "select", optionsFrom: "tender-categories", width: "half" },
      { key: "date", label: "Ngày đăng", type: "date", width: "half" },
      { key: "title", label: "Tiêu đề", type: "text", required: true, width: "half" },
      { key: "title_en", label: "Tiêu đề (EN)", type: "text", width: "half" },
      { key: "excerpt", label: "Tóm tắt (hiện ở trang danh sách)", type: "textarea", width: "half" },
      { key: "excerpt_en", label: "Tóm tắt (EN)", type: "textarea", width: "half" },
      // Các trường nghiệp vụ đấu thầu thường gặp — không bắt buộc, chỉ hiện
      // ở trang chi tiết nếu admin có điền.
      { key: "ben_moi_thau", label: "Bên mời thầu", type: "text", width: "half" },
      { key: "nguon_von", label: "Nguồn vốn", type: "text", width: "half" },
      { key: "hinh_thuc", label: "Hình thức lựa chọn nhà thầu", type: "text", width: "half" },
      { key: "thoi_gian_dong_thau", label: "Thời gian đóng thầu", type: "text", width: "half" },
      { key: "image", label: "Ảnh đại diện", type: "image" },
      { key: "attachment", label: "File đính kèm (PDF)", type: "file" },
      { key: "content", label: "Nội dung đầy đủ (hiện ở trang chi tiết)", type: "richtext" },
      { key: "content_en", label: "Nội dung đầy đủ (EN)", type: "richtext" },
    ],
    seed: [
      {
        category: "Thông báo mời thầu",
        date: "20/08/2026",
        title: "Thông báo mời thầu gói thầu bảo dưỡng, sửa chữa thiết bị cơ khí thủy công",
        title_en: "Invitation for Bids: Hydro-mechanical Equipment Maintenance Package",
        excerpt: "Công ty Cổ phần Thủy điện Đakđrinh thông báo mời thầu gói thầu bảo dưỡng, sửa chữa hệ thống thiết bị cơ khí thủy công năm 2026.",
        excerpt_en: "PV Power DHC invites bids for the 2026 hydro-mechanical equipment maintenance package.",
        ben_moi_thau: "Công ty Cổ phần Thủy điện Đakđrinh",
        nguon_von: "Vốn sản xuất kinh doanh của Công ty",
        hinh_thuc: "Đấu thầu rộng rãi trong nước",
        thoi_gian_dong_thau: "09h00 ngày 05/09/2026",
      },
      {
        category: "Kế hoạch lựa chọn nhà thầu",
        date: "10/08/2026",
        title: "Kế hoạch lựa chọn nhà thầu cung cấp vật tư dự phòng năm 2026",
        title_en: "Contractor Selection Plan: 2026 Spare Parts Supply",
        excerpt: "Thông báo kế hoạch lựa chọn nhà thầu cung cấp vật tư, thiết bị dự phòng phục vụ vận hành nhà máy năm 2026.",
        excerpt_en: "Notice of the contractor selection plan for supplying spare parts and equipment for plant operation in 2026.",
        ben_moi_thau: "Công ty Cổ phần Thủy điện Đakđrinh",
        nguon_von: "Vốn sản xuất kinh doanh của Công ty",
        hinh_thuc: "Chào hàng cạnh tranh",
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
  {
    id: "site-marquee",
    label: "Dòng chữ chạy (trang chủ)",
    fields: [
      { key: "text", label: "Nội dung dòng chữ chạy", type: "text", required: true },
      { key: "text_en", label: "Nội dung dòng chữ chạy (EN)", type: "text" },
    ],
    seed: [
      {
        text: "Chào mừng Quý cổ đông, đối tác và khách hàng đến với Công ty Cổ phần Thủy điện Đakđrinh!",
        text_en: "Welcome shareholders, partners and customers to Dakdrinh Hydropower Joint Stock Company!",
      },
    ],
  },
  {
    // CHỈ GIỮ 1 BẢN GHI DUY NHẤT: khối "Mực nước hiện tại" ở trang chủ luôn
    // lấy bản ghi ĐẦU TIÊN của collection này. Ở /admin, chỉ cần bấm "Sửa"
    // trên mục có sẵn để cập nhật số liệu — không cần (và không nên) bấm
    // "+ Thêm mới" thêm bản ghi khác.
    //
    // Sản lượng Ngày/Tuần/Tháng/Quý/Năm KHÔNG còn nhập ở đây — xem collection
    // "production-daily" ngay bên dưới: trang chủ tự CỘNG DỒN từ đó.
    id: "production-info",
    label: "Mực nước hiện tại",
    fields: [
      { key: "muc_nuoc_ho", label: "Mực nước hồ hiện tại (m)", type: "text" },
      { key: "luu_luong_ve_ho", label: "Lưu lượng về hồ (m³/s)", type: "text" },
      { key: "luu_luong_phat_dien", label: "Lưu lượng phát điện trung bình ngày (m³/s)", type: "text" },
      { key: "ngay_cap_nhat", label: "Ngày cập nhật số liệu", type: "date" },
    ],
    seed: [
      {
        muc_nuoc_ho: "410",
        luu_luong_ve_ho: "60",
        luu_luong_phat_dien: "50",
        ngay_cap_nhat: "",
      },
    ],
  },
  {
    // Mỗi bản ghi = sản lượng phát điện của ĐÚNG 1 NGÀY. Mỗi ngày admin bấm
    // "+ Thêm mới", nhập ngày hôm đó (dd/mm/yyyy) + sản lượng (MWh) — trang
    // chủ sẽ TỰ CỘNG DỒN các bản ghi này lại để ra số Ngày/Tuần/Tháng/Quý/Năm,
    // không cần admin tự cộng tay và nhập nhiều con số tổng như trước. Xem
    // computeProductionTotals() trong src/lib/production.ts.
    id: "production-daily",
    label: "Sản lượng theo ngày (tự cộng dồn Tuần/Tháng/Quý/Năm)",
    fields: [
      { key: "ngay", label: "Ngày (dd/mm/yyyy)", type: "date", required: true },
      { key: "san_luong", label: "Sản lượng trong ngày (MWh)", type: "text", required: true },
    ],
    seed: [
      { ngay: "19/08/2026", san_luong: "1.298,10" },
      { ngay: "20/08/2026", san_luong: "1.352,90" },
      { ngay: "21/08/2026", san_luong: "1.384,48" },
    ],
  },
  {
    // Không có nút "+ Thêm mới" nào tạo dữ liệu ở đây trong thực tế — mỗi
    // bản ghi được tạo tự động khi có người gửi form "Liên hệ" ở trang chủ
    // (POST /api/contact, xem src/app/lien-he/page.tsx). Admin vào đây chỉ
    // để xem, đổi trạng thái Chưa duyệt/Đã duyệt, và xoá bớt các liên hệ
    // rác/spam.
    id: "contacts",
    label: "Khách hàng liên hệ",
    fields: [
      { key: "name", label: "Khách hàng", type: "text", required: true, width: "half" },
      { key: "status", label: "Trạng thái", type: "select", options: ["Chưa duyệt", "Đã duyệt"], width: "half" },
      { key: "email", label: "Email", type: "text", required: true, width: "half" },
      { key: "phone", label: "Điện thoại", type: "text", width: "half" },
      { key: "message", label: "Nội dung liên hệ", type: "textarea" },
      { key: "createdAt", label: "Ngày tạo", type: "text" },
    ],
    seed: [],
  },
  {
    // CHỈ GIỮ 1 BẢN GHI DUY NHẤT — các đoạn văn bản chính của trang
    // "Giới thiệu" (/gioi-thieu). Bấm "Sửa" trên mục có sẵn để cập nhật,
    // không bấm "+ Thêm mới".
    id: "company-overview",
    label: "Giới thiệu — Nội dung chính",
    fields: [
      { key: "overview_intro", label: "Đoạn giới thiệu tổng quan (Tổng quan doanh nghiệp)", type: "richtext" },
      { key: "overview_intro_en", label: "Đoạn giới thiệu tổng quan (EN)", type: "richtext" },
      { key: "vision", label: "Tầm nhìn", type: "textarea", width: "half" },
      { key: "vision_en", label: "Tầm nhìn (EN)", type: "textarea", width: "half" },
      { key: "mission", label: "Sứ mệnh", type: "textarea", width: "half" },
      { key: "mission_en", label: "Sứ mệnh (EN)", type: "textarea", width: "half" },
      { key: "investment_note", label: "Cơ cấu sở hữu — Tổng mức đầu tư", type: "richtext" },
      { key: "investment_note_en", label: "Cơ cấu sở hữu — Tổng mức đầu tư (EN)", type: "richtext" },
      { key: "closing_content", label: "Đoạn kết (Khẳng định thương hiệu)", type: "richtext" },
      { key: "closing_content_en", label: "Đoạn kết (Khẳng định thương hiệu) (EN)", type: "richtext" },
    ],
    seed: [
      {
        overview_intro:
          "<p><strong>Nhà máy thủy điện Đakđrinh có công suất thiết kế 125 MW, tổng mức đầu tư 5.921 tỷ đồng, điện lượng bình quân thiết kế E0 đạt 540,29 triệu kWh/năm, sản lượng theo hợp đồng mua bán điện là 527 triệu kWh/năm. Lũy kế sản lượng phát điện từ ngày 29/5/2014 đến nay đạt hơn 7 tỷ kWh, đóng góp hàng nghìn tỷ đồng cho ngân sách hai tỉnh Quảng Ngãi và Kon Tum.</strong></p><p>Công ty cổ phần Thủy điện Đakđrinh được thành lập ngày 16/03/2007 bởi 4 cổ đông sáng lập: Tập đoàn Dầu khí Quốc gia Việt Nam (nay chuyển quyền cho Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP, PV Power), Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV), Tổng Công ty Sông Đà - CTCP (Sông Đà) và Tổng Công ty LICOGI - CTCP (LICOGI), theo Giấy chứng nhận đăng ký kinh doanh công ty cổ phần số 4300350203 do Sở Kế hoạch và Đầu tư tỉnh Quảng Ngãi cấp lần đầu ngày 21/03/2007, vốn điều lệ ban đầu 930 tỷ đồng. Qua nhiều lần thay đổi giấy chứng nhận đăng ký doanh nghiệp, vốn điều lệ hiện nay của Công ty là 1.160,011 tỷ đồng.</p><p>Công ty là chủ đầu tư Dự án thủy điện Đakđrinh, bố trí trên lưu vực sông Đakđrinh thuộc huyện Sơn Tây, tỉnh Quảng Ngãi và huyện Kon Plông, tỉnh Kon Tum, cách thành phố Quảng Ngãi khoảng 70 km về phía tây - một dự án trọng điểm trong chương trình phát triển kinh tế - xã hội và an ninh năng lượng quốc gia nói chung, tỉnh Quảng Ngãi nói riêng. Nhà máy gồm 2 tổ máy, tổ máy số 1 hòa lưới điện Quốc gia tháng 6/2014 và tổ máy số 2 vào tháng 9/2014; ngoài phát điện, Nhà máy còn tham gia cắt/giảm lũ mùa mưa và bổ sung nước mùa hạn cho hạ du.</p>",
        overview_intro_en:
          "<p><strong>Dakdrinh Hydropower Plant has a designed capacity of 125 MW, total investment of VND 5,921 billion, a designed average output (E0) of 540.29 million kWh/year, and a contracted output under the power purchase agreement of 527 million kWh/year. Cumulative generation from 29 May 2014 to date has exceeded 7 billion kWh, contributing thousands of billions of VND to the budgets of Quang Ngai and Kon Tum provinces.</strong></p><p>Dakdrinh Hydropower Joint Stock Company was established on 16 March 2007 by four founding shareholders: Vietnam Oil and Gas Group (rights since transferred to PetroVietnam Power Corporation - JSC, PV Power), the Joint Stock Commercial Bank for Investment and Development of Vietnam (BIDV), Song Da Corporation - JSC (Song Da), and LICOGI Corporation - JSC (LICOGI), under Business Registration Certificate No. 4300350203 first issued by the Quang Ngai Department of Planning and Investment on 21 March 2007, with an initial charter capital of VND 930 billion. Following several amendments to the enterprise registration certificate, the Company's charter capital now stands at VND 1,160.011 billion.</p><p>The Company is the investor of the Dakdrinh Hydropower Project, located on the Dakdrinh river basin in Son Tay District, Quang Ngai Province and Kon Plong District, Kon Tum Province, about 70 km west of Quang Ngai City — a key project in the country's socio-economic development and energy security programs, and in Quang Ngai Province in particular. The plant comprises two generating units; Unit 1 was connected to the National Grid in June 2014 and Unit 2 in September 2014. Besides power generation, the plant also helps mitigate flooding during the rainy season and supplements downstream water supply during the dry season.</p>",
        vision:
          "Phát triển bền vững, trở thành một trong những công ty cổ phần hoạt động sản xuất, kinh doanh điện hiệu quả hàng đầu khu vực miền Trung.",
        vision_en:
          "Sustainable development — becoming one of the leading, most efficient power generation and trading joint stock companies in the Central Vietnam region.",
        mission:
          "Cung cấp nguồn điện đảm bảo chất lượng, đề cao hợp tác bền vững với cổ đông và đối tác; xây dựng môi trường làm việc chuyên nghiệp, năng động, sáng tạo, hiệu quả, nhân văn và có trách nhiệm với xã hội.",
        mission_en:
          "Provide a reliable, quality power supply; foster sustainable cooperation with shareholders and partners; and build a professional, dynamic, creative, effective, people-centered and socially responsible working environment.",
        investment_note:
          "<p>Dự án đầu tư được Hội đồng Quản trị Công ty phê duyệt tại Quyết định số 16/DHC-HĐQT-QĐ ngày 17/05/2008.</p><p>Tổng mức đầu tư điều chỉnh lần 2 của dự án là <strong>5.921 tỷ đồng</strong>, đã được Đại hội đồng Cổ đông Công ty phê duyệt tại Quyết định số 105/QĐ-ĐHĐCĐ ngày 24/11/2017.</p>",
        investment_note_en:
          "<p>The investment project was approved by the Company's Board of Directors under Decision No. 16/DHC-HĐQT-QĐ dated 17 May 2008.</p><p>The project's second revised total investment of <strong>VND 5,921 billion</strong>, was approved by the Company's General Meeting of Shareholders under Resolution No. 105/QĐ-ĐHĐCĐ dated 24 November 2017.</p>",
        closing_content:
          "<p>Từ vốn điều lệ ban đầu 930 tỷ đồng, sau gần 12 năm hoạt động vốn điều lệ của Công ty đã tăng lên 1.160,01 tỷ đồng, với 4 phòng ban và 1 phân xưởng vận hành sửa chữa. Nhà máy thủy điện Đakđrinh duy trì sản lượng điện bình quân hằng năm gần 540,925 triệu kWh. Công ty có kế hoạch niêm yết hơn 116 triệu cổ phiếu lên sàn chứng khoán, hướng tới trở thành công ty đại chúng trong lĩnh vực đầu tư, xây dựng, sản xuất kinh doanh điện năng.</p><p>Hai tổ máy của Nhà máy thủy điện Đakđrinh vận hành ổn định dưới sự chỉ đạo, điều hành sát sao của Ban lãnh đạo, đồng bộ từ quản lý sản xuất, kỹ thuật đến chào giá cạnh tranh trên thị trường điện, cùng hệ thống quản lý theo tiêu chuẩn ISO 9001-2008 - nhờ đó lợi nhuận lũy kế các năm 2014-2022 của Công ty đạt 863 tỷ đồng.</p>",
        closing_content_en:
          "<p>From an initial charter capital of VND 930 billion, after nearly 12 years of operation the Company's charter capital has grown to VND 1,160.01 billion, supported by 4 departments and 1 operations and maintenance workshop. Dakdrinh Hydropower Plant maintains an average annual output of nearly 540.925 million kWh. The Company plans to list more than 116 million shares on the stock exchange, aiming to become a public company in power investment, construction, generation and trading.</p><p>Both units of Dakdrinh Hydropower Plant operate stably under the close direction of the Company's leadership, with coordinated production management, technical operations and competitive bidding on the power market, supported by an ISO 9001-2008 management system — as a result, the Company's cumulative profit for 2014–2022 reached VND 863 billion.</p>",
      },
    ],
  },
  {
    id: "company-stats",
    label: "Giới thiệu — Số liệu nổi bật",
    fields: [
      { key: "section", label: "Nhóm hiển thị", type: "select", options: ["Tổng quan doanh nghiệp", "Lũy kế phát điện"] },
      { key: "value", label: "Giá trị", type: "text", width: "half" },
      { key: "label", label: "Chú thích", type: "text", width: "half" },
      { key: "label_en", label: "Chú thích (EN)", type: "text" },
    ],
    seed: [
      { section: "Tổng quan doanh nghiệp", value: "125 MW", label: "Công suất lắp máy", label_en: "Installed capacity" },
      { section: "Tổng quan doanh nghiệp", value: "1.160,011", label: "Vốn điều lệ (tỷ đồng)", label_en: "Charter capital (VND bn)" },
      { section: "Tổng quan doanh nghiệp", value: "~7 tỷ", label: "Sản lượng điện lũy kế (kWh)", label_en: "Cumulative output (kWh)" },
      { section: "Tổng quan doanh nghiệp", value: "12", label: "Năm vận hành (từ 2014)", label_en: "Years in operation (since 2014)" },
      { section: "Lũy kế phát điện", value: "~7 tỷ kWh", label: "Sản lượng điện lũy kế lên lưới điện Quốc gia (29/5/2014 - hết tháng 5/2026), bình quân 564 triệu kWh/năm, cao hơn E0 540,29 triệu kWh/năm", label_en: "Cumulative output delivered to the National Grid (29/05/2014 – end of May 2026), averaging 564 million kWh/year, above the E0 target of 540.29 million kWh/year" },
      { section: "Lũy kế phát điện", value: "6.622 tỷ đồng", label: "Doanh thu trước thuế VAT lũy kế", label_en: "Cumulative revenue before VAT" },
      { section: "Lũy kế phát điện", value: "1.050 tỷ đồng", label: "Lợi nhuận sau thuế lũy kế", label_en: "Cumulative after-tax profit" },
      { section: "Lũy kế phát điện", value: "1.550 tỷ đồng", label: "Nộp Ngân sách Nhà nước từ khi vận hành Nhà máy", label_en: "Contributions to the State Budget since the plant began operation" },
    ],
  },
  {
    id: "company-timeline",
    label: "Giới thiệu — Lịch sử hình thành",
    fields: [
      { key: "date", label: "Mốc thời gian", type: "text", required: true },
      { key: "summary", label: "Nội dung", type: "textarea", required: true },
      { key: "summary_en", label: "Nội dung (EN)", type: "textarea" },
    ],
    seed: [
      { date: "21/03/2007", summary: "Thành lập Công ty cổ phần Thủy điện Đakđrinh theo quy định của Luật Doanh nghiệp, hoạt động theo mô hình công ty cổ phần.", summary_en: "Established Dakdrinh Hydropower Joint Stock Company under the Enterprise Law, operating as a joint stock company." },
      { date: "28/03/2007", summary: "Dự án thủy điện Đakđrinh chính thức động thổ.", summary_en: "The Dakdrinh Hydropower Project officially broke ground." },
      { date: "17/05/2008", summary: "Hội đồng Quản trị Công ty phê duyệt dự án đầu tư tại Quyết định số 16/DHC-HĐQT-QĐ.", summary_en: "The Company's Board of Directors approved the investment project under Decision No. 16/DHC-HĐQT-QĐ." },
      { date: "23/01/2011", summary: "Khởi công xây dựng, ngăn sông đợt 1.", summary_en: "Construction began, first-stage river diversion." },
      { date: "16/10/2013", summary: "Tích nước hồ chứa (ngăn sông đợt 2).", summary_en: "Reservoir impoundment began (second-stage river diversion)." },
      { date: "29/05/2014", summary: "Tổ máy 1 (H1) phát điện, hòa lưới điện Quốc gia.", summary_en: "Unit 1 (H1) generated power and was connected to the National Grid." },
      { date: "29/08/2014", summary: "Tổ máy 2 phát điện, hòa lưới điện Quốc gia.", summary_en: "Unit 2 generated power and was connected to the National Grid." },
      { date: "24/11/2017", summary: "Đại hội đồng Cổ đông phê duyệt tổng mức đầu tư điều chỉnh lần 2 tại Quyết định số 105/QĐ-ĐHĐCĐ.", summary_en: "The General Meeting of Shareholders approved the second revision of the total investment under Resolution No. 105/QĐ-ĐHĐCĐ." },
      { date: "2015 - 27/01/2016", summary: "Hoàn thành công trình; Hội đồng nghiệm thu Nhà nước chấp thuận cho Chủ đầu tư bàn giao, đưa công trình vào khai thác sử dụng (Thông báo số 02/TB-HĐNTNN).", summary_en: "Construction completed; the State Acceptance Council approved handover of the facility for commercial operation (Notice No. 02/TB-HĐNTNN)." },
    ],
  },
  {
    id: "company-specs",
    label: "Giới thiệu — Thông số Dự án",
    fields: [
      { key: "label", label: "Tên thông số", type: "text", required: true, width: "half" },
      { key: "label_en", label: "Tên thông số (EN)", type: "text", width: "half" },
      { key: "value", label: "Giá trị", type: "text", required: true, width: "half" },
      { key: "value_en", label: "Giá trị (EN)", type: "text", width: "half" },
    ],
    seed: [
      { label: "Công suất lắp máy", label_en: "Installed capacity", value: "125 MW", value_en: "125 MW" },
      { label: "Sản lượng điện bình quân nhiều năm (E0, theo hợp đồng)", label_en: "Multi-year average output (E0, per PPA)", value: "527,6 triệu kWh/năm", value_en: "527.6 million kWh/year" },
      { label: "Vị trí xây dựng", label_en: "Location", value: "Huyện Sơn Tây, tỉnh Quảng Ngãi và huyện Kon Plông, tỉnh Kon Tum", value_en: "Son Tay District, Quang Ngai Province and Kon Plong District, Kon Tum Province" },
      { label: "Quy hoạch", label_en: "Power planning", value: "Thuộc Quy hoạch điện VI và Quy hoạch điện VII", value_en: "Part of Power Development Plan VI and Plan VII" },
      { label: "Cấp công trình", label_en: "Structure classification", value: "Công trình cấp I", value_en: "Grade I structure" },
      { label: "Đường hầm dẫn nước", label_en: "Headrace tunnel", value: "Dài 10,7 km - một trong những đường hầm thủy điện dài nhất tại thời điểm xây dựng", value_en: "10.7 km long — one of the longest hydropower tunnels at the time of construction" },
      { label: "Khối lượng bê tông", label_en: "Concrete volume", value: "Trên 800.000 m³ bê tông RCC và CVC", value_en: "Over 800,000 m³ of RCC and CVC concrete" },
      { label: "Dung tích hồ chứa", label_en: "Reservoir capacity", value: "248 triệu m³", value_en: "248 million m³" },
      { label: "Diện tích lưu vực", label_en: "Catchment area", value: "420 km²", value_en: "420 km²" },
      { label: "Mực nước dâng bình thường (MNDBT)", label_en: "Normal water level", value: "410 m", value_en: "410 m" },
      { label: "Diện tích mặt hồ ứng với MNDBT", label_en: "Reservoir surface area at normal water level", value: "9,12 km²", value_en: "9.12 km²" },
    ],
  },
  {
    id: "company-awards",
    label: "Giới thiệu — Khen thưởng",
    fields: [
      { key: "award_type", label: "Loại", type: "select", options: ["Danh hiệu thi đua", "Hình thức khen thưởng"], required: true },
      { key: "year", label: "Năm", type: "text", required: true, width: "half" },
      { key: "title", label: "Tên danh hiệu/khen thưởng", type: "text", required: true, width: "half" },
      { key: "title_en", label: "Tên danh hiệu/khen thưởng (EN)", type: "text", width: "half" },
      { key: "decision", label: "Quyết định công nhận", type: "textarea", width: "half" },
      { key: "decision_en", label: "Quyết định công nhận (EN)", type: "textarea", width: "half" },
    ],
    seed: [
      { award_type: "Danh hiệu thi đua", year: "2012", title: "Tập thể lao động xuất sắc", title_en: "Excellent Labor Collective", decision: "QĐ số 608/QĐ-ĐLDK ngày 04/12/2012 của Tổng Công ty Điện lực Dầu khí Việt Nam", decision_en: "Decision No. 608/QĐ-ĐLDK dated 04/12/2012 issued by PetroVietnam Power Corporation" },
      { award_type: "Danh hiệu thi đua", year: "2013", title: "Tập thể lao động xuất sắc", title_en: "Excellent Labor Collective", decision: "QĐ số 665/QĐ-ĐLDK ngày 29/11/2013 của Tổng Công ty Điện lực Dầu khí Việt Nam", decision_en: "Decision No. 665/QĐ-ĐLDK dated 29/11/2013 issued by PetroVietnam Power Corporation" },
      { award_type: "Danh hiệu thi đua", year: "2015", title: "Tập thể lao động tiên tiến", title_en: "Advanced Labor Collective", decision: "QĐ số 956/QĐ-ĐLDK ngày 01/12/2015 của Tổng Công ty Điện lực Dầu khí Việt Nam", decision_en: "Decision No. 956/QĐ-ĐLDK dated 01/12/2015 issued by PetroVietnam Power Corporation" },
      { award_type: "Danh hiệu thi đua", year: "2016", title: "Tập thể lao động tiên tiến", title_en: "Advanced Labor Collective", decision: "QĐ số 1313/QĐ-ĐLDK ngày 01/12/2016 của Tổng Công ty Điện lực Dầu khí Việt Nam", decision_en: "Decision No. 1313/QĐ-ĐLDK dated 01/12/2016 issued by PetroVietnam Power Corporation" },
      { award_type: "Danh hiệu thi đua", year: "2017", title: "Tập thể lao động tiên tiến", title_en: "Advanced Labor Collective", decision: "QĐ số 1158/QĐ-ĐLDK ngày 01/12/2017 của Tổng Công ty Điện lực Dầu khí Việt Nam", decision_en: "Decision No. 1158/QĐ-ĐLDK dated 01/12/2017 issued by PetroVietnam Power Corporation" },
      { award_type: "Danh hiệu thi đua", year: "2018", title: "Tập thể lao động tiên tiến", title_en: "Advanced Labor Collective", decision: "QĐ số 698/QĐ-ĐLDK ngày 06/12/2018 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP", decision_en: "Decision No. 698/QĐ-ĐLDK dated 06/12/2018 issued by PetroVietnam Power Corporation - JSC" },
      { award_type: "Danh hiệu thi đua", year: "2019", title: "Tập thể hoàn thành tốt nhiệm vụ", title_en: "Collective That Successfully Fulfilled Its Duties", decision: "QĐ số 1220/QĐ-ĐKDK ngày 28/11/2019 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP", decision_en: "Decision No. 1220/QĐ-ĐKDK dated 28/11/2019 issued by PetroVietnam Power Corporation - JSC" },
      { award_type: "Danh hiệu thi đua", year: "2020", title: "Tập thể lao động tiên tiến", title_en: "Advanced Labor Collective", decision: "QĐ số 1081/QĐ-ĐKDK ngày 27/11/2020 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP", decision_en: "Decision No. 1081/QĐ-ĐKDK dated 27/11/2020 issued by PetroVietnam Power Corporation - JSC" },
      { award_type: "Hình thức khen thưởng", year: "2012", title: "Giấy khen của Tổng Công ty", title_en: "Certificate of Merit from the Corporation", decision: "QĐ số 609/QĐ-ĐLDK ngày 04/12/2012 của Tổng Công ty Điện lực Dầu khí Việt Nam", decision_en: "Decision No. 609/QĐ-ĐLDK dated 04/12/2012 issued by PetroVietnam Power Corporation" },
      { award_type: "Hình thức khen thưởng", year: "2014", title: "Bằng khen của Bộ trưởng Bộ Công Thương", title_en: "Certificate of Merit from the Minister of Industry and Trade", decision: "QĐ số 783/QĐ-BCT ngày 22/01/2014 của Bộ trưởng Bộ Công Thương", decision_en: "Decision No. 783/QĐ-BCT dated 22/01/2014 issued by the Minister of Industry and Trade" },
      { award_type: "Hình thức khen thưởng", year: "2015", title: "Giấy khen của Tổng Công ty", title_en: "Certificate of Merit from the Corporation", decision: "QĐ số 959/QĐ-ĐLDK ngày 07/12/2015 của Tổng Công ty Điện lực Dầu khí Việt Nam", decision_en: "Decision No. 959/QĐ-ĐLDK dated 07/12/2015 issued by PetroVietnam Power Corporation" },
      { award_type: "Hình thức khen thưởng", year: "2016", title: "Bằng khen của UBND tỉnh Quảng Ngãi", title_en: "Certificate of Merit from the Quang Ngai Provincial People's Committee", decision: "QĐ số 1699/QĐ-UBND ngày 20/9/2016 của UBND tỉnh Quảng Ngãi", decision_en: "Decision No. 1699/QĐ-UBND dated 20/9/2016 issued by the Quang Ngai Provincial People's Committee" },
      { award_type: "Hình thức khen thưởng", year: "2016", title: "Giấy khen của Tổng Công ty", title_en: "Certificate of Merit from the Corporation", decision: "QĐ số 1312/QĐ-ĐLDK ngày 01/12/2016 của Tổng Công ty Điện lực Dầu khí Việt Nam", decision_en: "Decision No. 1312/QĐ-ĐLDK dated 01/12/2016 issued by PetroVietnam Power Corporation" },
      { award_type: "Hình thức khen thưởng", year: "2017", title: "Bằng khen của UBND tỉnh Quảng Ngãi", title_en: "Certificate of Merit from the Quang Ngai Provincial People's Committee", decision: "QĐ số 496/QĐ-UBND ngày 23/3/2017 của UBND tỉnh Quảng Ngãi", decision_en: "Decision No. 496/QĐ-UBND dated 23/3/2017 issued by the Quang Ngai Provincial People's Committee" },
      { award_type: "Hình thức khen thưởng", year: "2017", title: "Giấy khen của Tổng Công ty", title_en: "Certificate of Merit from the Corporation", decision: "QĐ số 1160/QĐ-ĐLDK ngày 01/12/2017 của Tổng Công ty Điện lực Dầu khí Việt Nam", decision_en: "Decision No. 1160/QĐ-ĐLDK dated 01/12/2017 issued by PetroVietnam Power Corporation" },
      { award_type: "Hình thức khen thưởng", year: "2018", title: "Bằng khen của UBND tỉnh Quảng Ngãi", title_en: "Certificate of Merit from the Quang Ngai Provincial People's Committee", decision: "QĐ số 185/QĐ-UBND ngày 30/01/2018 của UBND tỉnh Quảng Ngãi", decision_en: "Decision No. 185/QĐ-UBND dated 30/01/2018 issued by the Quang Ngai Provincial People's Committee" },
      { award_type: "Hình thức khen thưởng", year: "2018", title: "Giấy khen của Tổng Công ty", title_en: "Certificate of Merit from the Corporation", decision: "QĐ số 697/QĐ-ĐLDK ngày 06/12/2018 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP", decision_en: "Decision No. 697/QĐ-ĐLDK dated 06/12/2018 issued by PetroVietnam Power Corporation - JSC" },
      { award_type: "Hình thức khen thưởng", year: "2019", title: "Giấy khen của Tổng Công ty", title_en: "Certificate of Merit from the Corporation", decision: "QĐ số 1220/QĐ-ĐKDK ngày 28/11/2019 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP", decision_en: "Decision No. 1220/QĐ-ĐKDK dated 28/11/2019 issued by PetroVietnam Power Corporation - JSC" },
      { award_type: "Hình thức khen thưởng", year: "2020", title: "Giấy khen của Tổng Công ty", title_en: "Certificate of Merit from the Corporation", decision: "QĐ số 1084/QĐ-ĐKDK ngày 27/11/2019 của Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP", decision_en: "Decision No. 1084/QĐ-ĐKDK dated 27/11/2019 issued by PetroVietnam Power Corporation - JSC" },
    ],
  },
  {
    id: "shareholders-list",
    label: "Giới thiệu — Danh sách cổ đông sáng lập",
    fields: [
      { key: "name", label: "Tên cổ đông", type: "text", required: true, width: "half" },
      { key: "name_en", label: "Tên cổ đông (EN)", type: "text", width: "half" },
    ],
    seed: [
      { name: "Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP (PV Power)", name_en: "PetroVietnam Power Corporation - JSC (PV Power)" },
      { name: "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam (BIDV)", name_en: "Joint Stock Commercial Bank for Investment and Development of Vietnam (BIDV)" },
      { name: "Tổng Công ty LICOGI - CTCP (LICOGI)", name_en: "LICOGI Corporation - JSC (LICOGI)" },
      { name: "Tổng Công ty Sông Đà - CTCP (Sông Đà)", name_en: "Song Da Corporation - JSC (Song Da)" },
      { name: "Bà Hà Thị Phương Thúy", name_en: "Ms. Ha Thi Phuong Thuy" },
    ],
  },
  {
    id: "leadership",
    label: "Ban lãnh đạo",
    fields: [
      { key: "group", label: "Nhóm", type: "select", options: ["Hội đồng Quản trị", "Ban Giám đốc", "Ban kiểm soát"], required: true, width: "half" },
      { key: "role", label: "Vai trò trong nhóm", type: "select", options: ["Trưởng nhóm", "Thành viên"], required: true, width: "half" },
      { key: "name", label: "Họ tên", type: "text", required: true, width: "half" },
      { key: "name_en", label: "Họ tên (EN)", type: "text", width: "half" },
      { key: "title", label: "Chức danh", type: "text", required: true, width: "half" },
      { key: "title_en", label: "Chức danh (EN)", type: "text", width: "half" },
      { key: "photo", label: "Ảnh chân dung", type: "image" },
    ],
    seed: [
      { group: "Hội đồng Quản trị", role: "Trưởng nhóm", name: "Ông Nguyễn Ngọc Hải", name_en: "Mr. Nguyễn Ngọc Hải", title: "Chủ tịch Hội đồng Quản trị", title_en: "Chairman of the Board of Directors", photo: "/images/leadership/hdqt-chu-tich-nguyen-ngoc-hai.png" },
      { group: "Hội đồng Quản trị", role: "Thành viên", name: "Ông Đỗ Xuân Bình", name_en: "Mr. Đỗ Xuân Bình", title: "Thành viên HĐQT", title_en: "Board Member", photo: "/images/leadership/hdqt-uv-do-xuan-binh.jpg" },
      { group: "Hội đồng Quản trị", role: "Thành viên", name: "Ông Lê Quang Hào", name_en: "Mr. Lê Quang Hào", title: "Thành viên HĐQT", title_en: "Board Member", photo: "/images/leadership/hdqt-uv-le-quang-hao.jpg" },
      { group: "Ban Giám đốc", role: "Trưởng nhóm", name: "Ông Đỗ Xuân Bình", name_en: "Mr. Đỗ Xuân Bình", title: "Giám đốc", title_en: "Director", photo: "/images/leadership/bgd-giam-doc-do-xuan-binh.jpg" },
      { group: "Ban Giám đốc", role: "Thành viên", name: "Ông Lê Năng", name_en: "Mr. Lê Năng", title: "Phó Giám đốc", title_en: "Deputy Director", photo: "/images/leadership/bgd-pgd-le-nang.jpg" },
      { group: "Ban Giám đốc", role: "Thành viên", name: "Ông Nguyễn Xuân Hải", name_en: "Mr. Nguyễn Xuân Hải", title: "Phó Giám đốc", title_en: "Deputy Director", photo: "/images/leadership/bgd-pgd-nguyen-xuan-hai.png" },
      { group: "Ban Giám đốc", role: "Thành viên", name: "Ông Nguyễn Đình Tới", name_en: "Mr. Nguyễn Đình Tới", title: "Kế toán trưởng", title_en: "Chief Accountant", photo: "/images/leadership/bgd-ktt-nguyen-dinh-toi.jpg" },
      { group: "Ban kiểm soát", role: "Trưởng nhóm", name: "Ông Nguyễn Thanh Khiết", name_en: "Mr. Nguyễn Thanh Khiết", title: "Trưởng Ban kiểm soát", title_en: "Head of the Supervisory Board", photo: "/images/leadership/bks-truong-nguyen-thanh-khiet.jpg" },
      { group: "Ban kiểm soát", role: "Thành viên", name: "Ông Nguyễn Trung Tuấn", name_en: "Mr. Nguyễn Trung Tuấn", title: "Thành viên Ban Kiểm soát", title_en: "Supervisor", photo: "/images/leadership/bks-tv-nguyen-trung-tuan.jpg" },
      { group: "Ban kiểm soát", role: "Thành viên", name: "Bà Ngô Thị Hồng Hạnh", name_en: "Mrs. Ngô Thị Hồng Hạnh", title: "Thành viên Ban Kiểm soát", title_en: "Supervisor", photo: "/images/leadership/bks-tv-ngo-thi-hong-hanh.png" },
    ],
  },
  {
    // CHỈ GIỮ 1 BẢN GHI DUY NHẤT — nội dung trang "Đơn vị" (/don-vi).
    id: "units-page",
    label: "Đơn vị — Nội dung trang",
    fields: [
      { key: "intro_title", label: "Tiêu đề khối giới thiệu", type: "text", width: "half" },
      { key: "intro_title_en", label: "Tiêu đề khối giới thiệu (EN)", type: "text", width: "half" },
      { key: "intro_content", label: "Nội dung giới thiệu", type: "richtext" },
      { key: "intro_content_en", label: "Nội dung giới thiệu (EN)", type: "richtext" },
      { key: "list_title", label: "Tiêu đề danh sách", type: "text", width: "half" },
      { key: "list_title_en", label: "Tiêu đề danh sách (EN)", type: "text", width: "half" },
      { key: "list_items", label: "Danh sách (mỗi dòng 1 mục)", type: "textarea" },
      { key: "list_items_en", label: "Danh sách (EN, mỗi dòng 1 mục)", type: "textarea" },
    ],
    seed: [
      {
        intro_title: "Đơn vị thành viên",
        intro_title_en: "Member Units",
        intro_content:
          "<p>Thông tin về các đơn vị, phòng ban trực thuộc Công ty Cổ phần Thủy điện Đakđrinh — nội dung mẫu, vui lòng cập nhật lại cho đúng thực tế qua trang quản trị.</p>",
        intro_content_en:
          "<p>Information about the units and departments under Dakdrinh Hydropower Joint Stock Company — sample content, please update via the admin panel to reflect actual information.</p>",
        list_title: "Danh sách đơn vị / phòng ban",
        list_title_en: "Units / Departments",
        list_items: "Phòng Tổ chức - Hành chính\nPhòng Kỹ thuật - An toàn\nPhòng Tài chính - Kế toán\nPhân xưởng Vận hành - Sửa chữa",
        list_items_en: "Organization - Administration Department\nTechnical - Safety Department\nFinance - Accounting Department\nOperations - Maintenance Workshop",
      },
    ],
  },
  {
    id: "culture-handbook-pages",
    label: "Sổ tay văn hóa — Các trang",
    fields: [
      { key: "image", label: "Ảnh trang sổ tay", type: "image", required: true },
      { key: "caption", label: "Chú thích", type: "text", width: "half" },
      { key: "caption_en", label: "Chú thích (EN)", type: "text", width: "half" },
    ],
    seed: [
      { image: "/images/ptsc/service-nang-luong.jpg", caption: "Trang bìa — Sổ tay văn hóa PV Power DHC", caption_en: "Cover — PV Power DHC Culture Handbook" },
      { image: "/images/ptsc/service-tau.jpg", caption: "Tầm nhìn — Sứ mệnh", caption_en: "Vision — Mission" },
      { image: "/images/ptsc/service-cong-nghiep.jpg", caption: "Giá trị cốt lõi", caption_en: "Core values" },
      { image: "/images/ptsc/service-khao-sat.jpg", caption: "Chuẩn mực ứng xử", caption_en: "Code of conduct" },
    ],
  },
];

export function getCollectionDef(id: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}

