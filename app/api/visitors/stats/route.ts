import { NextResponse } from "next/server";
import { getStats } from "@/lib/visitor-store";

export const dynamic = "force-dynamic"; // luôn tính lại theo request, không cache trang static

export async function GET() {
  return NextResponse.json(getStats());
}
