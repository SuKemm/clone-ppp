import { NextRequest, NextResponse } from "next/server";
import { recordHeartbeat } from "@/lib/visitor-store";

export async function POST(req: NextRequest) {
  let visitorId: string | undefined;
  try {
    const body = await req.json();
    visitorId = typeof body?.visitorId === "string" ? body.visitorId : undefined;
  } catch {
    // xử lý ở dưới
  }

  if (!visitorId || visitorId.length < 8 || visitorId.length > 100) {
    return NextResponse.json({ error: "invalid visitorId" }, { status: 400 });
  }

  recordHeartbeat(visitorId);
  return NextResponse.json({ ok: true });
}
