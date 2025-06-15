import { NextResponse, NextRequest } from "next/server";
import ImageHomeModel from "@/model/ImageHome";
import { mongooseConnect } from "@/lib/config/db";
import cloudinary from "@/lib/config/testing/cloudinary";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import fs from "fs";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "@/utils/testing/status";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    if (!file) {
      return NextResponse.json(
        { error: "BAD_REQUEST" },
        { status: BAD_REQUEST }
      );
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempFilePath = path.join(os.tmpdir(), file.name);
    await writeFile(tempFilePath, buffer);
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "ImageTesting",
    });
    fs.unlinkSync(tempFilePath);
    return NextResponse.json({
      message: "Upload berhasil",
      url: result.url,
      status: OK,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
export async function GET() {
  await mongooseConnect();
  try {
    const images = await ImageHomeModel.find().sort();
    return NextResponse.json(images);
  } catch (error) {
    console.log("Gagal Ambil Gambar", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
