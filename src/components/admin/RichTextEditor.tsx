"use client";

// Bọc TinyMCE (bản Cloud, load qua CDN của tiny.cloud bằng apiKey) thành 1
// component dùng lại được cho mọi field kiểu "richtext" khai báo trong
// src/lib/cms/schema.ts. Chỉ dùng cho các ô cần định dạng (in đậm, danh
// sách, chèn link/ảnh...) — các ô tóm tắt ngắn vẫn dùng textarea thường.
//
// Cần biến môi trường NEXT_PUBLIC_TINYMCE_API_KEY — xem hướng dẫn lấy key
// miễn phí trong README-admin.md. Nếu chưa cấu hình, editor vẫn chạy được ở
// chế độ dùng thử (Evaluation) nhưng sẽ có 1 dòng cảnh báo nhỏ của TinyMCE.

import { forwardRef, useImperativeHandle, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

// Kiểu tối thiểu cho instance editor TinyMCE — chỉ khai 2 hàm thực sự dùng
// tới, tránh phải cài thêm gói "tinymce" chỉ để lấy type đầy đủ.
type TinyMCEEditorInstance = {
  uploadImages: () => Promise<unknown>;
  getContent: () => string;
};

export type RichTextEditorHandle = {
  /**
   * Đảm bảo mọi ảnh vừa dán/kéo-thả vào bài (đang ở dạng "blob:" tạm trong
   * trình duyệt, chưa upload xong lên server) được upload xong và thay
   * bằng URL thật, rồi trả về nội dung HTML mới nhất. BẮT BUỘC gọi hàm
   * này và chờ xong (await) TRƯỚC khi lưu bài — nếu bấm "Lưu" ngay sau
   * khi vừa dán/kéo-thả ảnh (trước khi ảnh kịp upload xong, nhất là ảnh
   * dung lượng lớn/mạng chậm), nội dung lưu xuống server sẽ chứa link ảnh
   * tạm "blob:..." — link này CHỈ có giá trị trong đúng phiên trình duyệt
   * vừa dán, tải lại trang hoặc người khác mở bài sẽ không thấy ảnh đâu.
   */
  flushImages: () => Promise<string>;
};

// Upload 1 file ảnh lên API sẵn có của trang quản trị (dùng chung với ô ảnh
// đại diện) — trả về URL đã lưu trên server.
async function uploadImageFile(file: File | Blob): Promise<string> {
  const fd = new FormData();
  // Next.js (undici) hiện có bug parse multipart/form-data khi tên file
  // chứa ký tự có dấu/Unicode trong header Content-Disposition, gây lỗi
  // "Failed to parse body as FormData." — đổi sang tên ASCII an toàn
  // trước khi gửi. Server xác định đuôi file dựa vào file.type (mime),
  // không dựa vào tên file, nên đổi tên ở đây không ảnh hưởng gì.
  const rawName = file instanceof File ? file.name : "";
  const dotIndex = rawName.lastIndexOf(".");
  const rawExt = dotIndex >= 0 ? rawName.slice(dotIndex + 1) : "";
  const safeExt = /^[a-zA-Z0-9]{1,10}$/.test(rawExt) ? rawExt : "png";
  const safeName = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
  fd.append("file", file, safeName);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? "Tải ảnh lên thất bại");
  return body.url as string;
}

export const RichTextEditor = forwardRef<
  RichTextEditorHandle,
  {
    value: string;
    onChange: (html: string) => void;
    rows?: number;
  }
>(function RichTextEditor({ value, onChange, rows = 12 }, ref) {
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key";
  const editorRef = useRef<TinyMCEEditorInstance | null>(null);

  useImperativeHandle(ref, () => ({
    flushImages: async () => {
      const editor = editorRef.current;
      if (!editor) return value;
      try {
        // uploadImages() của TinyMCE tự tìm mọi ảnh còn đang ở dạng blob:
        // trong nội dung, upload từng cái (gọi lại đúng images_upload_handler
        // bên dưới) và tự thay src bằng URL thật khi xong.
        await editor.uploadImages();
      } catch {
        // Nếu 1 ảnh lỡ upload lỗi (mất mạng giữa chừng...), vẫn cho lưu
        // tiếp phần nội dung còn lại thay vì chặn đứng việc lưu cả bài —
        // admin có thể sửa/chèn lại đúng ảnh đó sau.
      }
      return editor.getContent();
    },
  }));

  return (
    <div className="mt-1 overflow-hidden rounded-lg border border-slate-300 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-100">
      <Editor
        apiKey={apiKey}
        value={value}
        onInit={(_evt, editor) => {
          editorRef.current = editor as unknown as TinyMCEEditorInstance;
        }}
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
            "body { font-family: system-ui, sans-serif; font-size: 14px; } " +
            "img { max-width: 100%; height: auto !important; }",
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
});
