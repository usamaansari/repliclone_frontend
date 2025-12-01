import { NextRequest, NextResponse } from "next/server";
import { formatSuccess } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  const response = NextResponse.json(
    formatSuccess({ message: "Logout successful" }, "Logout successful"),
    { status: 200 }
  );

  // Clear the auth token cookie
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}

