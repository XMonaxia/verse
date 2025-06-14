import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "No token" }, { status: 401 });
  }
  try {
    const response = await fetch(
      "https://test-fe.mysellerpintar.com/api/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const profile = await response.json();
    return NextResponse.json({ token, profile });
  } catch (err) {
    console.log("Failed to validate token:", err);
    return NextResponse.json(
      { message: "Token validation failed" },
      { status: 500 }
    );
  }
}
