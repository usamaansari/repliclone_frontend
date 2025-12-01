import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

export interface AuthUser {
  userId: string;
  userEmail: string;
}

/**
 * Verify JWT token from request headers or cookies
 */
export async function verifyAuth(req: NextRequest): Promise<AuthUser | null> {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT_SECRET environment variable is not set");
      return null;
    }

    // Try to get token from Authorization header first
    const authHeader = req.headers.get("authorization");
    let token: string | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // Fallback to cookie
      token = req.cookies.get("auth-token")?.value || null;
    }

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, jwtSecret) as { userId: string; userEmail: string };

    return {
      userId: decoded.userId,
      userEmail: decoded.userEmail,
    };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

