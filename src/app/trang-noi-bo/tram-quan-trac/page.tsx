import { InternalPageTemplate } from "@/components/InternalPageTemplate";

// TODO: thay externalUrl bằng link hệ thống trạm quan trắc thật khi có
// (hoặc bỏ externalUrl và chèn số liệu/biểu đồ trực tiếp vào children).
export default function TramQuanTracPage() {
  return (
    <InternalPageTemplate
      title="Trạm quan trắc"
      description="Số liệu quan trắc khí tượng, thuỷ văn của nhà máy."
      externalUrl=""
      externalLabel="Xem số liệu quan trắc"
    />
  );
}
