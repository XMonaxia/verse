import { mongooseConnect } from "@/lib/config/db";
import { NextResponse } from "next/server";
import MusicModel from "@/model/Music";

export async function GET() {
  await mongooseConnect();
  try {
    const music = await MusicModel.find().sort();
    return NextResponse.json(music);
  } catch (error) {
    console.log("Gagal Ambil Music", error);
    return NextResponse.json(
      { error: "Gagal mengambil gambar" },
      { status: 500 }
    );
  }
}
