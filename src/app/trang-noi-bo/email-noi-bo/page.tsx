import { InternalPageTemplate } from "@/components/InternalPageTemplate";

// TODO: thay externalUrl bằng link đăng nhập email nội bộ thật khi có.
export default function EmailNoiBoPage() {
  return (
    <InternalPageTemplate
      title="Email nội bộ"
      description="Truy cập hệ thống email nội bộ dành cho cán bộ, nhân viên."
      externalUrl=""
      externalLabel="Đăng nhập Email nội bộ"
    />
  );
}
