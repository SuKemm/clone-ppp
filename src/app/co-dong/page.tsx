import { PtscShell } from "@/components/ptsc-shell";
import { ShareholderRelations, type SrTab } from "@/components/shareholder-relations";

const images = [
  "/images/ptsc/project-hd-mien-nam.jpg",
  "/images/ptsc/service-fso.jpg",
  "/images/ptsc/project-lng.jpg",
  "/images/ptsc/service-cong-nghiep.jpg",
  "/images/ptsc/project-bien-dong.jpg",
];

const tabs: SrTab[] = [
  {
    key: "thong-tin",
    label: "Thông tin / tài liệu cổ đông",
    articles: [
      {
        id: "sr-01",
        image: images[0],
        category: "Thông tin cổ đông",
        date: "cập nhật gần nhất",
        title: "Thông báo chốt danh sách cổ đông",
        excerpt:
          "Thông báo về ngày đăng ký cuối cùng để thực hiện quyền của cổ đông hiện hữu.",
      },
      {
        id: "sr-02",
        image: images[1],
        category: "Thông tin cổ đông",
        date: "cập nhật gần nhất",
        title: "Điều lệ và quy chế quản trị công ty",
        excerpt:
          "Bản cập nhật Điều lệ tổ chức và hoạt động, Quy chế quản trị nội bộ của công ty.",
      },
      {
        id: "sr-03",
        image: images[2],
        category: "Thông tin cổ đông",
        date: "cập nhật gần nhất",
        title: "Công bố thông tin định kỳ",
        excerpt:
          "Các tài liệu công bố thông tin định kỳ theo quy định dành cho công ty đại chúng.",
      },
      {
        id: "sr-04",
        image: images[3],
        category: "Thông tin cổ đông",
        date: "cập nhật gần nhất",
        title: "Danh sách người có liên quan sở hữu cổ phiếu",
        excerpt: "Danh sách công bố định kỳ về người nội bộ và người có liên quan.",
      },
      {
        id: "sr-05",
        image: images[4],
        category: "Thông tin cổ đông",
        date: "cập nhật gần nhất",
        title: "Nghị quyết Hội đồng quản trị",
        excerpt: "Các nghị quyết, quyết định của Hội đồng quản trị công bố tới cổ đông.",
      },
      {
        id: "sr-06",
        image: images[1],
        category: "Thông tin cổ đông",
        date: "cập nhật gần nhất",
        title: "Thông báo giao dịch cổ phiếu của cổ đông nội bộ",
        excerpt: "Thông báo về việc mua/bán cổ phiếu của cổ đông nội bộ và người liên quan.",
      },
    ],
  },
  {
    key: "dai-hoi",
    label: "Đại hội cổ đông",
    articles: [
      {
        id: "sr-07",
        image: images[3],
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Thông báo mời họp Đại hội đồng cổ đông thường niên",
        excerpt:
          "Thư mời và tài liệu họp gửi tới quý cổ đông trước thềm Đại hội đồng cổ đông thường niên.",
      },
      {
        id: "sr-08",
        image: images[4],
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Biên bản và Nghị quyết Đại hội đồng cổ đông thường niên",
        excerpt:
          "Tổng hợp các nội dung đã được thông qua tại Đại hội đồng cổ đông thường niên.",
      },
      {
        id: "sr-09",
        image: images[0],
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Tài liệu Đại hội đồng cổ đông bất thường",
        excerpt:
          "Tài liệu liên quan tới các nội dung trình Đại hội đồng cổ đông bất thường (nếu có).",
      },
      {
        id: "sr-10",
        image: images[1],
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Quy chế tổ chức Đại hội đồng cổ đông",
        excerpt: "Quy chế làm việc và biểu quyết áp dụng tại Đại hội đồng cổ đông.",
      },
      {
        id: "sr-11",
        image: images[2],
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Tài liệu ứng cử, đề cử thành viên HĐQT/BKS",
        excerpt: "Hồ sơ ứng cử, đề cử nhân sự trình Đại hội đồng cổ đông thông qua.",
      },
      {
        id: "sr-12",
        image: images[4],
        category: "Đại hội cổ đông",
        date: "cập nhật gần nhất",
        title: "Video/hình ảnh Đại hội đồng cổ đông thường niên",
        excerpt: "Tổng hợp hình ảnh và video ghi nhận tại Đại hội đồng cổ đông thường niên.",
      },
    ],
  },
  {
    key: "bao-cao",
    label: "Báo cáo tài chính / Báo cáo thường niên",
    articles: [
      {
        id: "sr-13",
        image: images[1],
        category: "Báo cáo tài chính",
        date: "cập nhật gần nhất",
        title: "Báo cáo tài chính đã kiểm toán",
        excerpt: "Báo cáo tài chính năm đã được kiểm toán bởi đơn vị kiểm toán độc lập.",
      },
      {
        id: "sr-14",
        image: images[2],
        category: "Báo cáo thường niên",
        date: "cập nhật gần nhất",
        title: "Báo cáo thường niên",
        excerpt:
          "Tổng quan kết quả hoạt động sản xuất kinh doanh và định hướng phát triển của công ty.",
      },
      {
        id: "sr-15",
        image: images[3],
        category: "Báo cáo tài chính",
        date: "cập nhật gần nhất",
        title: "Báo cáo tài chính các quý trong năm",
        excerpt: "Báo cáo tài chính theo từng quý gửi tới cổ đông và nhà đầu tư.",
      },
      {
        id: "sr-16",
        image: images[4],
        category: "Báo cáo thường niên",
        date: "cập nhật gần nhất",
        title: "Báo cáo phát triển bền vững",
        excerpt: "Báo cáo về các hoạt động phát triển bền vững, môi trường và xã hội.",
      },
      {
        id: "sr-17",
        image: images[0],
        category: "Báo cáo tài chính",
        date: "cập nhật gần nhất",
        title: "Giải trình biến động kết quả kinh doanh",
        excerpt: "Giải trình chênh lệch lợi nhuận sau thuế theo quy định công bố thông tin.",
      },
      {
        id: "sr-18",
        image: images[1],
        category: "Báo cáo tài chính",
        date: "cập nhật gần nhất",
        title: "Báo cáo tài chính hợp nhất",
        excerpt: "Báo cáo tài chính hợp nhất toàn Tổng công ty đã được kiểm toán.",
      },
    ],
  },
];

const sidebarItems = [
  { image: images[4], title: "Thông báo mời họp Đại hội đồng cổ đông thường niên" },
  { image: images[0], title: "Báo cáo tài chính đã kiểm toán" },
  { image: images[1], title: "Điều lệ và quy chế quản trị công ty" },
  { image: images[2], title: "Báo cáo thường niên" },
];

export default function ShareholdersPage() {
  return (
    <PtscShell
      title="Quan hệ cổ đông"
      description="Thông tin minh bạch và cập nhật dành cho cổ đông: tài liệu cổ đông, Đại hội đồng cổ đông và các báo cáo tài chính, báo cáo thường niên."
    >
      <ShareholderRelations
        tabs={tabs}
        sidebarTitle="Xem nhiều nhất"
        sidebarItems={sidebarItems}
      />
    </PtscShell>
  );
}
