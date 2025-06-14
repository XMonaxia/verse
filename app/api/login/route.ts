import { NextRequest, NextResponse } from "next/server";
import { LoginPayload } from "@/utils/testing/zod";
import { login } from "@/lib/config/testing/axios"; // Ini fetch ke BACKEND-mu

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = LoginPayload.parse(body);
    const result = await login(validated);
    const response = NextResponse.json(
      { message: "Login berhasil" },
      { status: 200 }
    );
    response.cookies.set("token", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (err) {
    console.log("error", err);
    return NextResponse.json({ message: "Gagal Login" }, { status: 401 });
  }
}
