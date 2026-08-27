"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

type TinyMCEEditorInstance = {
  uploadImages: () => Promise<unknown>;
  getContent: () => string;
};

export type RichTextEditorHandle = {
  flushImages: () => Promise<string>;
};

// Chuẩn hóa URL ảnh upload.
// Ví dụ:
// api/uploads/abc.jpg  -> /api/uploads/abc.jpg
// http://domain/api/uploads/abc.jpg -> /api/uploads/abc.jpg
function normalizeUploadUrls(html: string): string {
  if (!html) return html;

  return html
    // URL bị mất dấu "/" đầu
    .replace(
      /(["'])api\/uploads\//gi,
      '$1/api/uploads/'
    )
    // URL đầy đủ domain -> giữ lại path để dùng đúng domain hiện tại
    .replace(
      /(["'])https?:\/\/[^/"']+\/api\/uploads\//gi,
      '$1/api/uploads/'
    );
}

// Upload ảnh lên server
async function uploadImageFile(file: File | Blob): Promise<string> {
  const fd = new FormData();

  const rawName = file instanceof File ? file.name : "";
  const dotIndex = rawName.lastIndexOf(".");
  const rawExt =
    dotIndex >= 0 ? rawName.slice(dotIndex + 1) : "";

  const safeExt = /^[a-zA-Z0-9]{1,10}$/.test(rawExt)
    ? rawExt
    : "png";

  const safeName =
    `upload-${Date.now()}-` +
    `${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  fd.append("file", file, safeName);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: fd,
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(
      body.error ?? "Tải ảnh lên thất bại"
    );
  }

  // Đảm bảo URL luôn bắt đầu bằng /
  const url = String(body.url ?? "");

  return url.startsWith("/")
    ? url
    : `/${url}`;
}

export const RichTextEditor = forwardRef<
  RichTextEditorHandle,
  {
    value: string;
    onChange: (html: string) => void;
    rows?: number;
  }
>(function RichTextEditor(
  {
    value,
    onChange,
    rows = 12,
  },
  ref
) {
  const apiKey =
    process.env.NEXT_PUBLIC_TINYMCE_API_KEY ||
    "no-api-key";

  const editorRef =
    useRef<TinyMCEEditorInstance | null>(null);

  useImperativeHandle(ref, () => ({
    flushImages: async () => {
      const editor = editorRef.current;

      if (!editor) {
        return normalizeUploadUrls(value);
      }

      try {
        await editor.uploadImages();
      } catch {
        // Không chặn việc lưu bài nếu có 1 ảnh upload lỗi
      }

      // Chuẩn hóa toàn bộ ảnh trước khi lưu
      return normalizeUploadUrls(editor.getContent());
    },
  }));

  return (
    <div className="mt-1 overflow-hidden rounded-lg border border-slate-300 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-100">
      <Editor
        apiKey={apiKey}
        value={value}
        onInit={(_evt, editor) => {
          editorRef.current =
            editor as unknown as TinyMCEEditorInstance;
        }}
        onEditorChange={(html) => {
          // Chuẩn hóa ngay khi nội dung thay đổi
          onChange(normalizeUploadUrls(html));
        }}
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
            "code",
            "charmap",
            "preview",
            "searchreplace",
            "visualblocks",
            "fullscreen",
            "media",
            "insertdatetime",
            "wordcount",
            "help",
          ],

          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | " +
            "forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | " +
            "link image media table charmap | " +
            "removeformat code | searchreplace fullscreen preview | help",

          content_style:
            "body { font-family: system-ui, sans-serif; font-size: 14px; } " +
            "img { max-width: 100%; height: auto !important; }",

          branding: false,

          /*
           * QUAN TRỌNG:
           * Không cho TinyMCE biến:
           *
           * /api/uploads/abc.jpg
           *
           * thành:
           *
           * api/uploads/abc.jpg
           *
           * Nếu mất dấu "/" đầu thì khi đang ở:
           * /tin-tuc/abc
           *
           * browser sẽ request sai:
           * /tin-tuc/api/uploads/abc.jpg
           *
           * và server trả HTML/404 thay vì image/jpeg.
           */
          relative_urls: false,
          remove_script_host: false,
          convert_urls: false,

          automatic_uploads: true,

          images_upload_handler: async (
            blobInfo: { blob: () => Blob }
          ) => {
            const url = await uploadImageFile(
              blobInfo.blob()
            );

            return url;
          },

          file_picker_types: "image",

          file_picker_callback: (
            callback: (
              url: string,
              meta?: { alt?: string }
            ) => void
          ) => {
            const input =
              document.createElement("input");

            input.type = "file";
            input.accept = "image/*";

            input.onchange = async () => {
              const file = input.files?.[0];

              if (!file) return;

              try {
                const url =
                  await uploadImageFile(file);

                callback(url, {
                  alt: file.name,
                });
              } catch (e) {
                alert(
                  (e as Error).message
                );
              }
            };

            input.click();
          },
        }}
      />
    </div>
  );
});