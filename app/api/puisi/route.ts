import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/config/db";
import PuisiModel from "@/model/Puisi";
export async function GET() {
  await mongooseConnect();
  try {
    const puisi = await PuisiModel.find().sort();
    return NextResponse.json(puisi);
  } catch (error) {
    console.log("Gagal Ambil Puisi", error);
    return NextResponse.json(
      { error: "Gagal mengambil Puisi" },
      { status: 500 }
    );
  }
}
