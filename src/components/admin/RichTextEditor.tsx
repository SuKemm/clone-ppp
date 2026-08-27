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

/**
 * Chuẩn hóa URL ảnh upload.
 *
 * api/uploads/a.jpg
 * /api/uploads/a.jpg
 * uploads/a.jpg
 * /uploads/a.jpg
 * http://domain.com/api/uploads/a.jpg
 *
 * => /uploads/a.jpg
 */
function normalizeUploadUrls(html: string): string {
  if (!html) return html;

  return html
    // URL đầy đủ: https://domain.com/api/uploads/...
    .replace(
      /(["'])https?:\/\/[^/"']+\/api\/uploads\//gi,
      '$1/uploads/'
    )

    // URL đầy đủ: https://domain.com/uploads/...
    .replace(
      /(["'])https?:\/\/[^/"']+\/uploads\//gi,
      '$1/uploads/'
    )

    // /api/uploads/... hoặc api/uploads/...
    .replace(
      /(["'])\/?api\/uploads\//gi,
      '$1/uploads/'
    )

    // uploads/... không có dấu /
    .replace(
      /(["'])uploads\//gi,
      '$1/uploads/'
    );
}

/**
 * Chuẩn hóa URL trả về từ API upload.
 */
function normalizeUploadUrl(url: string): string {
  if (!url) return url;

  return url
    // https://domain.com/api/uploads/abc.jpg
    .replace(
      /^https?:\/\/[^/]+\/api\/uploads\//i,
      "/uploads/"
    )

    // https://domain.com/uploads/abc.jpg
    .replace(
      /^https?:\/\/[^/]+\/uploads\//i,
      "/uploads/"
    )

    // /api/uploads/abc.jpg
    .replace(
      /^\/?api\/uploads\//i,
      "/uploads/"
    )

    // uploads/abc.jpg
    .replace(
      /^uploads\//i,
      "/uploads/"
    );
}

// Upload ảnh lên server
async function uploadImageFile(
  file: File | Blob
): Promise<string> {
  const fd = new FormData();

  const rawName =
    file instanceof File ? file.name : "";

  const dotIndex =
    rawName.lastIndexOf(".");

  const rawExt =
    dotIndex >= 0
      ? rawName.slice(dotIndex + 1)
      : "";

  const safeExt =
    /^[a-zA-Z0-9]{1,10}$/.test(rawExt)
      ? rawExt
      : "png";

  const safeName =
    `upload-${Date.now()}-` +
    `${Math.random()
      .toString(36)
      .slice(2, 8)}.${safeExt}`;

  fd.append(
    "file",
    file,
    safeName
  );

  const res = await fetch(
    "/api/admin/upload",
    {
      method: "POST",
      body: fd,
    }
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(
      body.error ??
        "Tải ảnh lên thất bại"
    );
  }

  return normalizeUploadUrl(
    String(body.url ?? "")
  );
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
    useRef<TinyMCEEditorInstance | null>(
      null
    );

  useImperativeHandle(
    ref,
    () => ({
      flushImages: async () => {
        const editor =
          editorRef.current;

        if (!editor) {
          return normalizeUploadUrls(
            value
          );
        }

        try {
          // Upload tất cả ảnh blob còn lại
          await editor.uploadImages();
        } catch {
          // Không chặn việc lưu bài
        }

        // Luôn chuẩn hóa ảnh trước khi lưu
        return normalizeUploadUrls(
          editor.getContent()
        );
      },
    }),
    [value]
  );

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
          onChange(
            normalizeUploadUrls(html)
          );
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
           * Giữ nguyên URL tuyệt đối tính từ domain.
           *
           * /uploads/abc.jpg
           *
           * Không biến thành:
           *
           * uploads/abc.jpg
           *
           * Nếu không, khi đang ở:
           * /tin-tuc/abc
           *
           * browser có thể gọi sai:
           * /tin-tuc/uploads/abc.jpg
           */
          relative_urls: false,
          remove_script_host: false,
          convert_urls: false,

          automatic_uploads: true,

          images_upload_handler: async (
            blobInfo: {
              blob: () => Blob;
            }
          ) => {
            return await uploadImageFile(
              blobInfo.blob()
            );
          },

          file_picker_types: "image",

          file_picker_callback: (
            callback: (
              url: string,
              meta?: {
                alt?: string;
              }
            ) => void
          ) => {
            const input =
              document.createElement("input");

            input.type = "file";
            input.accept = "image/*";

            input.onchange = async () => {
              const file =
                input.files?.[0];

              if (!file) return;

              try {
                const url =
                  await uploadImageFile(
                    file
                  );

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