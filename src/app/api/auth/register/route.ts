import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import * as jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { comparePassword, formatError, formatSuccess, hashPassword } from "@/utils/helpers";
import joi from "joi";

const registerSchema = joi.object({
  firstName: joi.string().max(100).required().messages({
    "string.max": "First name cannot exceed 100 characters",
    "any.required": "First name is required",
  }),
  lastName: joi.string().max(100).required().messages({
    "string.max": "Last name cannot exceed 100 characters",
    "any.required": "Last name is required",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error, value } = registerSchema.validate(body);

    if (error) {
      return NextResponse.json(
        formatError(error.details[0]?.message || "Validation failed", "VALIDATION_ERROR"),
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password } = value;

    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        formatError("User already exists", "USER_ALREADY_EXISTS"),
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await db
      .insert(users)
      .values({ firstName, lastName, email, password: hashedPassword })
      .returning();

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser[0];

    return NextResponse.json(
      formatSuccess({ user: userWithoutPassword }, "User created successfully"),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      formatError("Internal server error", "INTERNAL_SERVER_ERROR"),
      { status: 500 }
    );
  }
}

