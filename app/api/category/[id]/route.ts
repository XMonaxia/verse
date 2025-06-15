import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, updateCategory } from "@/lib/config/testing/axios";
import { AddCategoryPayload } from "@/utils/testing/zod";
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "@/utils/testing/status";

interface Context {
  params: Promise<{ id: string }>;
}
// UPDATE
export async function PUT(req: NextRequest, context: Promise<Context>) {
  const { params } = await context;
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
    const result = await updateCategory((await params).id, validated, token);
    return NextResponse.json({ message: "Update berhasil", data: result });
  } catch (err) {
    console.log("Failed to update category:", err);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
// DELETE
export async function DELETE(req: NextRequest, context: Promise<Context>) {
  const { params } = await context;
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "UNAUTHORIZED" },
      { status: UNAUTHORIZED }
    );
  }
  try {
    const result = await deleteCategory((await params).id, token);
    return NextResponse.json({ message: result.message });
  } catch (err) {
    console.log("Gagal delete kategori:", err);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
