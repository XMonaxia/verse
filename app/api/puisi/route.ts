import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/config/db";
import PuisiModel from "@/model/Puisi";
import { INTERNAL_SERVER_ERROR } from "@/utils/testing/status";
export async function GET() {
  await mongooseConnect();
  try {
    const puisi = await PuisiModel.find().sort();
    return NextResponse.json(puisi);
  } catch (error) {
    console.log("Gagal Ambil Puisi", error);
    return NextResponse.json(
      { error: "Gagal mengambil Puisi" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
