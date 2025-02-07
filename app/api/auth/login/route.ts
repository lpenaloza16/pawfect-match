// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { cookies } from "next/headers";
import { z } from "zod";

// Demo user configuration
const DEMO_USER = {
  id: "demo-1",
  email: "demo@example.com",
  password: "demo123",
  name: "Demo User",
};

// Input validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const { email, password } = loginSchema.parse(body);

    logger.info("Login attempt", { email });

    // Check for demo user first
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      logger.info("Demo user logged in successfully", { email });

      // Set demo auth cookie
      cookies().set("auth-token", "demo-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        user: {
          id: DEMO_USER.id,
          email: DEMO_USER.email,
          name: DEMO_USER.name,
        },
      });
    }

    // If not demo user, handle regular login (for future implementation)
    logger.error("Login failed - Invalid credentials", { email });
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      logger.error("Login validation error", error.errors);
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    // Handle other errors
    logger.error("Login error", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
