// app/api/favorites/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const authToken = cookies().get("auth-token");

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: Implement actual favorites fetching from database
  // This is mock data
  const mockFavorites = [
    {
      id: "1",
      name: "Max",
      breed: "Golden Retriever",
      age: "2 years",
      imageUrl: "/pets/dog1.jpg",
      distance: "2.5 miles",
    },
    // Add more mock data
  ];

  return NextResponse.json(mockFavorites);
}

export async function POST(request: Request) {
  const authToken = cookies().get("auth-token");

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { petId } = await request.json();

  // TODO: Implement actual favorite adding to database
  return NextResponse.json({ success: true });
}
