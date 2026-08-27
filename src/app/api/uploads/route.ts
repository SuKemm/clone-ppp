import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getUploadsDir } from "@/lib/storage-paths";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Đọc file từ key 'upload' hoặc 'file'
    const file = (formData.get("upload") || formData.get("file")) as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy file" },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name || "img.png").toLowerCase();
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadsDir = getUploadsDir();

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(uploadsDir, filename), buffer);

    // Trả về response đúng định dạng CKEditor yêu cầu
    return NextResponse.json({
      uploaded: true,
      url: `/api/uploads/${filename}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Lỗi upload file", details: String(error) },
      { status: 400 }
    );
  }
}