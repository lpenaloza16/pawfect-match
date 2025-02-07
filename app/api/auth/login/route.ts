// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod"; // For input validation

// Input validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // TODO: Replace this with your actual authentication logic
    const isValidUser = await validateUser(email, password);

    if (!isValidUser) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await generateToken(email);

    // Set the authentication cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/", // Make cookie available across the site
    });

    return NextResponse.json({
      success: true,
      user: {
        email,
        // Add any other user data you want to return
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Mock function to validate user - Replace with your actual authentication logic
async function validateUser(email: string, password: string): Promise<boolean> {
  // TODO: Replace with actual database query and password comparison
  // Example using prisma:
  // const user = await prisma.user.findUnique({ where: { email } });
  // if (!user) return false;
  // return await bcrypt.compare(password, user.password);

  // Mock validation (remove in production)
  return email === "test@example.com" && password === "password123";
}

// Generate JWT token
async function generateToken(email: string): Promise<string> {
  // TODO: Replace with actual JWT token generation
  // Example using jsonwebtoken:
  // return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  // Mock token (remove in production)
  return `mock-token-${email}-${Date.now()}`;
}

// Optional: Add GET method to check authentication status
export async function GET() {
  const authToken = cookies().get("auth-token");

  if (!authToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    // TODO: Verify token
    // const verified = jwt.verify(authToken.value, process.env.JWT_SECRET!);

    return NextResponse.json({
      authenticated: true,
      // user: verified
    });
  } catch (error) {
    cookies().delete("auth-token");
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
