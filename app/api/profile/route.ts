import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "@/utils/testing/status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const EndPoint = process.env.TESTING_ENDPOINT;
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "UNAUTHORIZED" },
      { status: UNAUTHORIZED }
    );
  }
  try {
    const response = await fetch(`${EndPoint}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return NextResponse.json(
        { message: "UNAUTHORIZED" },
        { status: UNAUTHORIZED }
      );
    }
    const profile = await response.json();
    return NextResponse.json({ profile });
  } catch (err) {
    console.log("Failed to validate token:", err);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}
