import { NextResponse } from "next/server";
import ImageHomeModel from "@/model/ImageHome";
import { mongooseConnect } from "@/lib/config/db";

export async function GET() {
  await mongooseConnect();
  try {
    const images = await ImageHomeModel.find().sort();
    return NextResponse.json(images);
  } catch (error) {
    console.log("Gagal Ambil Gambar", error);
    return NextResponse.json(
      { error: "Gagal mengambil gambar" },
      { status: 500 }
    );
  }
}
