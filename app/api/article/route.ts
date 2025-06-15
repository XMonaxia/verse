import { NextRequest, NextResponse } from "next/server";
import { addArticle, allArticle } from "@/lib/config/testing/axios";
import { AddArticlePayload } from "@/utils/testing/zod";
import {
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "@/utils/testing/status";

export async function GET() {
  try {
    const result = await allArticle();
    return NextResponse.json(
      { message: "Berhasil mengambil Article", data: result.data },
      { status: OK }
    );
  } catch (err) {
    console.error("Gagal mengambil Article:", err);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "UNAUTHORIZED" },
      { status: UNAUTHORIZED }
    );
  }
  try {
    const body = await req.json();
    const validated = AddArticlePayload.parse(body);
    const result = await addArticle(validated, token);
    return NextResponse.json(
      {
        message: "Article Berhasil Ditambahkan",
        data: result,
      },
      { status: OK }
    );
  } catch (err) {
    console.log("Validasi Error:", err);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
