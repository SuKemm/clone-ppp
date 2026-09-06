import { InternalPageTemplate } from "@/components/InternalPageTemplate";

// TODO: thay externalUrl bằng link hệ thống Văn phòng điện tử thật khi có.
export default function VanPhongDienTuPage() {
  return (
    <InternalPageTemplate
      title="Văn phòng điện tử"
      description="Hệ thống văn phòng điện tử dành cho cán bộ, nhân viên công ty."
      externalUrl=""
      externalLabel="Vào hệ thống Văn phòng điện tử"
    />
  );
}
