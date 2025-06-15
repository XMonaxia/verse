import { NextRequest, NextResponse } from "next/server";
import { allCategories, addCategory } from "@/lib/config/testing/axios";
import { AddCategoryPayload } from "@/utils/testing/zod";
import {
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "@/utils/testing/status";

// GET
export async function GET() {
  try {
    const result = await allCategories();
    return NextResponse.json(
      { message: "Berhasil mengambil kategori", data: result.data },
      { status: OK }
    );
  } catch (err) {
    console.error("Gagal mengambil kategori:", err);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
// POST
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
    const validated = AddCategoryPayload.parse(body);
    const result = await addCategory(validated, token);
    return NextResponse.json(
      {
        message: "Kategori berhasil ditambahkan",
        data: result,
      },
      { status: OK }
    );
  } catch (err) {
    console.error("Gagal menambahkan kategori:", err);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
