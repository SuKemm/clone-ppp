import { NextRequest, NextResponse } from "next/server";
import { translateToEnglish, isTranslateConfigured, TranslateNotConfiguredError } from "@/lib/cms/translate";

// Route này nằm dưới /api/admin/ nên đã được `src/middleware.ts` tự động yêu
// cầu đăng nhập /admin trước khi gọi tới — không cần kiểm tra lại ở đây.

export async function GET() {
  return NextResponse.json({ configured: isTranslateConfigured() });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const text = body?.text;
  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Thiếu nội dung cần dịch" }, { status: 400 });
  }

  try {
    const translated = await translateToEnglish(text);
    return NextResponse.json({ translated });
  } catch (err) {
    const status = err instanceof TranslateNotConfiguredError ? 501 : 502;
    return NextResponse.json({ error: (err as Error).message }, { status });
  }
}
