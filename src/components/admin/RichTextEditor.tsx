"use client";

// Bọc TinyMCE (bản Cloud, load qua CDN của tiny.cloud bằng apiKey) thành 1
// component dùng lại được cho mọi field kiểu "richtext" khai báo trong
// src/lib/cms/schema.ts. Chỉ dùng cho các ô cần định dạng (in đậm, danh
// sách, chèn link/ảnh...) — các ô tóm tắt ngắn vẫn dùng textarea thường.
//
// Cần biến môi trường NEXT_PUBLIC_TINYMCE_API_KEY — xem hướng dẫn lấy key
// miễn phí trong README-admin.md. Nếu chưa cấu hình, editor vẫn chạy được ở
// chế độ dùng thử (Evaluation) nhưng sẽ có 1 dòng cảnh báo nhỏ của TinyMCE.

import { Editor } from "@tinymce/tinymce-react";

// Upload 1 file ảnh lên API sẵn có của trang quản trị (dùng chung với ô ảnh
// đại diện) — trả về URL đã lưu trên server.
async function uploadImageFile(file: File | Blob): Promise<string> {
  const fd = new FormData();
  fd.append("file", file, file instanceof File ? file.name : "image.png");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? "Tải ảnh lên thất bại");
  return body.url as string;
}

export function RichTextEditor({
  value,
  onChange,
  rows = 12,
}: {
  value: string;
  onChange: (html: string) => void;
  rows?: number;
}) {
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key";

  return (
    <div className="mt-1 overflow-hidden rounded-lg border border-slate-300 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-100">
      <Editor
        apiKey={apiKey}
        value={value}
        onEditorChange={(html) => onChange(html)}
        init={{
          height: rows * 28,
          menubar: false,
          statusbar: false,
          plugins: [
            "link",
            "lists",
            "image",
            "table",
            "autolink",
            "code", // xem/sửa Mã HTML
            "charmap", // chèn ký tự đặc biệt
            "preview", // xem trước nội dung
            "searchreplace", // tìm & thay thế
            "visualblocks", // hiện khung các khối (đoạn văn, div...)
            "fullscreen", // phóng to toàn màn hình
            "media", // chèn video/media
            "insertdatetime",
            "wordcount",
            "help",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | " +
            "forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | " + // căn lề hai bên và căn giữa đầy đủ
            "bullist numlist outdent indent | " +
            "link image media table charmap | " +
            "removeformat code | searchreplace fullscreen preview | help",
          content_style:
            "body { font-family: system-ui, sans-serif; font-size: 14px; }",
          branding: false,

          // Kéo-thả ảnh hoặc dán ảnh (Ctrl+V) vào bài viết sẽ tự upload lên
          // server rồi chèn URL — không cần thao tác thủ công.
          automatic_uploads: true,
          images_upload_handler: async (blobInfo: { blob: () => Blob }) => {
            return uploadImageFile(blobInfo.blob());
          },

          // Thêm nút chọn file (icon thư mục) ngay trong ô "Source" của hộp
          // thoại Insert/Edit Image — bấm vào là mở hộp thoại chọn file trên
          // máy tính, chọn xong tự upload và điền URL vào ô Source.
          file_picker_types: "image",
          file_picker_callback: (callback: (url: string, meta?: { alt?: string }) => void) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;
              try {
                const url = await uploadImageFile(file);
                callback(url, { alt: file.name });
              } catch (e) {
                alert((e as Error).message);
              }
            };
            input.click();
          },
        }}
      />
    </div>
  );
}
