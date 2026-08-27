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
 * Chuẩn hóa URL ảnh về duy nhất:
 *
 * /api/uploads/filename.jpg
 */
function normalizeUploadUrl(url: string): string {
  if (!url) return "";

  // Không đụng vào URL không phải ảnh upload của hệ thống
  if (
    !/(^|\/)uploads\//i.test(url) &&
    !/(^|\/)api\/uploads\//i.test(url)
  ) {
    return url;
  }

  // https://domain.com/api/uploads/file.jpg
  // https://domain.com/uploads/file.jpg
  url = url.replace(
    /^https?:\/\/[^/]+\/(?:api\/)?uploads\//i,
    "/api/uploads/"
  );

  // /api/uploads/file.jpg
  // api/uploads/file.jpg
  url = url.replace(
    /^\/?api\/uploads\//i,
    "/api/uploads/"
  );

  // /uploads/file.jpg
  // uploads/file.jpg
  url = url.replace(
    /^\/?uploads\//i,
    "/api/uploads/"
  );

  return url;
}

/**
 * Chuẩn hóa tất cả src ảnh trong HTML.
 */
function normalizeUploadUrls(html: string): string {
  if (!html) return html;

  return html.replace(
    /\bsrc=(["'])([^"']+)\1/gi,
    (_match, quote, url: string) => {
      const normalized = normalizeUploadUrl(url);

      return `src=${quote}${normalized}${quote}`;
    }
  );
}

/**
 * Upload ảnh lên server.
 */
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

  const url = normalizeUploadUrl(
    String(body.url ?? "")
  );

  if (!url) {
    throw new Error(
      "Server không trả về URL ảnh"
    );
  }

  return url;
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
        const editor = editorRef.current;

        if (!editor) {
          return normalizeUploadUrls(value);
        }

        try {
          // Upload toàn bộ blob: còn lại
          await editor.uploadImages();
        } catch {
          // Không chặn việc lưu bài nếu một ảnh lỗi
        }

        // Lấy HTML mới nhất và chuẩn hóa URL
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

          // Không cho TinyMCE tự đổi URL
          convert_urls: false,
          relative_urls: false,
          remove_script_host: false,

          automatic_uploads: true,

          images_upload_handler: async (
            blobInfo: {
              blob: () => Blob;
            }
          ) => {
            return uploadImageFile(
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
                  await uploadImageFile(file);

                callback(url, {
                  alt: file.name,
                });
              } catch (error) {
                alert(
                  error instanceof Error
                    ? error.message
                    : "Tải ảnh lên thất bại"
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