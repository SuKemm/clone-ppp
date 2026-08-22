import { NextRequest, NextResponse } from "next/server";
import { getViews, incrementViews } from "@/lib/tender-views-store";

// GET /api/tenders/view?id=... — chỉ đọc, dùng ở trang DANH SÁCH (không tính lượt xem).
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }
  return NextResponse.json({ views: getViews(id) });
}

// POST /api/tenders/view — tăng lượt xem, dùng ở trang CHI TIẾT gói thầu.
export async function POST(req: NextRequest) {
  let id: string | undefined;
  try {
    const body = await req.json();
    id = typeof body?.id === "string" ? body.id : undefined;
  } catch {
    // xử lý ở dưới
  }

  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  return NextResponse.json({ views: incrementViews(id) });
}
