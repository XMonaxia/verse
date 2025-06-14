import { mongooseConnect } from "@/lib/config/db";
import { NextResponse } from "next/server";
import MusicModel from "@/model/Music";
import { INTERNAL_SERVER_ERROR } from "@/utils/testing/status";

export async function GET() {
  await mongooseConnect();
  try {
    const music = await MusicModel.find().sort();
    return NextResponse.json(music);
  } catch (error) {
    console.log("Gagal Ambil Music", error);
    return NextResponse.json(
      { error: "Gagal mengambil gambar" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
