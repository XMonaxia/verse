import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const Response = NextResponse.json({ message: "Logout berhasil" });
    Response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    return Response;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ message: "Gagal Logout" }, { status: 500 });
  }
}
