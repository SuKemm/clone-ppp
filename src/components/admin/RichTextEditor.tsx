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
          plugins: ["link", "lists", "image", "table", "autolink"],
          toolbar:
            "undo redo | blocks | bold italic underline | bullist numlist | link image table | removeformat",
          content_style:
            "body { font-family: system-ui, sans-serif; font-size: 14px; }",
          branding: false,
        }}
      />
    </div>
  );
}
