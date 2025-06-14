import { NextRequest, NextResponse } from "next/server";
import {
  allCategories,
  addCategory,
  // updateCategory,
  // deleteCategory,
} from "@/lib/config/testing/axios";
import { AddCategoryPayload } from "@/utils/testing/zod";
import {
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "@/utils/testing/status";

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

// interface Context {
//   params: Promise<{ id: string }>;
// }
// export async function PUT(req: NextRequest, context: Promise<Context>) {
//   const { params } = await context;
//   const token = req.cookies.get("token")?.value;
//   if (!token) {
//     return NextResponse.json(
//       { message: "UNAUTHORIZED" },
//       { status: UNAUTHORIZED }
//     );
//   }
//   try {
//     const body = await req.json();
//     const validated = AddCategoryPayload.parse(body);
//     const result = await updateCategory((await params).id, validated, token);
//     return NextResponse.json({ message: "Update berhasil", data: result });
//   } catch (err) {
//     console.log("Failed to update category:", err);
//     return NextResponse.json(
//       { message: "INTERNAL_SERVER_ERROR" },
//       { status: INTERNAL_SERVER_ERROR }
//     );
//   }
// }
// export async function DELETE(req: NextRequest, context: Promise<Context>) {
//   const { params } = await context;
//   const token = req.cookies.get("token")?.value;
//   if (!token) {
//     return NextResponse.json(
//       { message: "UNAUTHORIZED" },
//       { status: UNAUTHORIZED }
//     );
//   }
//   try {
//     const result = await deleteCategory((await params).id, token);
//     return NextResponse.json({ message: result.message });
//   } catch (err) {
//     console.log("Gagal delete kategori:", err);
//     return NextResponse.json(
//       { message: "INTERNAL_SERVER_ERROR" },
//       { status: INTERNAL_SERVER_ERROR }
//     );
//   }
// }
