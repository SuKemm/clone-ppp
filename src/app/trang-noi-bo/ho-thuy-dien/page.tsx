import { InternalPageTemplate } from "@/components/InternalPageTemplate";

// TODO: thay externalUrl / children bằng thông tin hồ thuỷ điện thật khi có
// (mực nước, lưu lượng, ...).
export default function HoThuyDienPage() {
  return (
    <InternalPageTemplate
      title="Hồ thuỷ điện"
      description="Thông tin mực nước, lưu lượng hồ chứa của nhà máy."
      externalUrl=""
      externalLabel="Xem thông tin hồ thuỷ điện"
    />
  );
}
