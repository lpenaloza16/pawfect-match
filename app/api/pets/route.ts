// for testing purposes:
// app/api/pets/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get random dog images for each pet
    const getDogImage = async () => {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      console.log("[SERVER] Dog API Response in API route:", data);
      return data.message;
    };

    const pets = await Promise.all([
      {
        id: "1",
        name: "Max",
        breed: "Golden Retriever",
        age: "2 years",
        distance: "2.5 miles",
        imageUrl: await getDogImage(),
      },
      {
        id: "2",
        name: "Luna",
        breed: "Labrador",
        age: "1 year",
        distance: "3 miles",
        imageUrl: await getDogImage(),
      },
    ]);

    console.log("[SERVER] API Response:", pets);
    return NextResponse.json(pets);
  } catch (error) {
    console.error("[SERVER] API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pets" },
      { status: 500 }
    );
  }
}
