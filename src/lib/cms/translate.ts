// Dịch tự động Việt -> Anh cho nội dung nhập ở /admin.
//
// Thiết kế "pluggable": hàm `translateToEnglish()` tự chọn nhà cung cấp dịch
// dựa trên biến môi trường đã cấu hình, theo thứ tự ưu tiên:
//   1. ANTHROPIC_API_KEY  — dùng Claude (Anthropic) để dịch, cho chất lượng
//      ngữ pháp và văn phong tốt nhất vì hiểu ngữ cảnh (thuật ngữ dầu khí,
//      tên riêng, số liệu...) thay vì dịch từng từ.
//   2. DEEPL_API_KEY      — dùng DeepL API (free hoặc pro) làm phương án dự phòng.
//   3. Không có key nào   — trả lỗi rõ ràng để giao diện /admin hiển thị
//      hướng dẫn cấu hình, thay vì âm thầm trả về text gốc.
//
// Khi có key, chỉ cần thêm vào .env.local (xem .env.example) — không cần
// sửa code. Xem README-admin.md để biết cách lấy key.

export class TranslateNotConfiguredError extends Error {
  constructor() {
    super(
      "Chưa cấu hình dịch tự động — thêm ANTHROPIC_API_KEY hoặc DEEPL_API_KEY vào .env.local rồi khởi động lại server."
    );
    this.name = "TranslateNotConfiguredError";
  }
}

async function translateWithAnthropic(text: string, apiKey: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system:
        "You are a professional Vietnamese-to-English translator for PTSC (PetroVietnam Technical Services Corporation), an oil & gas / industrial services company. " +
        "Translate the given Vietnamese text into natural, grammatically correct, professional English suitable for a corporate website. " +
        "Keep proper nouns, project names, and technical/industry terms accurate (e.g. FSO, EPCI, HSEQ, LNG). " +
        "Preserve the original meaning, tone, and paragraph breaks. " +
        "Reply with ONLY the translated English text — no preamble, no notes, no quotation marks.",
      messages: [{ role: "user", content: text }],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Anthropic API lỗi (${res.status}): ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const textBlock = (data.content ?? []).find(
    (b: { type: string; text?: string }) => b.type === "text"
  );
  const translated = textBlock?.text?.trim();
  if (!translated) throw new Error("Anthropic API không trả về nội dung dịch.");
  return translated;
}

async function translateWithDeepL(text: string, apiKey: string): Promise<string> {
  // Hỗ trợ cả DeepL Free (api-free.deepl.com) lẫn Pro (api.deepl.com) — key
  // DeepL Free luôn có hậu tố ":fx".
  const endpoint = apiKey.endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [text],
      source_lang: "VI",
      target_lang: "EN-US",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`DeepL API lỗi (${res.status}): ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const translated = data.translations?.[0]?.text?.trim();
  if (!translated) throw new Error("DeepL API không trả về nội dung dịch.");
  return translated;
}

export async function translateToEnglish(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) return translateWithAnthropic(trimmed, anthropicKey);

  const deeplKey = process.env.DEEPL_API_KEY;
  if (deeplKey) return translateWithDeepL(trimmed, deeplKey);

  throw new TranslateNotConfiguredError();
}

export function isTranslateConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.DEEPL_API_KEY);
}
