import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import * as jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { comparePassword, formatError, formatSuccess } from "@/utils/helpers";
import joi from "joi";

const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
});

const generateToken = (userId: string, userEmail: string): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  const payload = { userId, userEmail };

  return jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error, value } = loginSchema.validate(body);

    if (error) {
      return NextResponse.json(
        formatError(error.details[0]?.message || "Validation failed", "VALIDATION_ERROR"),
        { status: 400 }
      );
    }

    const { email, password } = value;

    const userResults = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (userResults.length === 0) {
      return NextResponse.json(formatError("Invalid email or password", "INVALID_CREDENTIALS"), {
        status: 400,
      });
    }

    const user = userResults[0];
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(formatError("Invalid email or password", "INVALID_CREDENTIALS"), {
        status: 400,
      });
    }

    const token = generateToken(user.id, user.email);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response = NextResponse.json(
      formatSuccess({ token, user: userWithoutPassword }, "Login successful"),
      { status: 200 }
    );

    // Set HTTP-only cookie for token
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      formatError("Internal server error", "INTERNAL_SERVER_ERROR"),
      { status: 500 }
    );
  }
}

