import PetCard from "./PetCard";

// app/dashboard/page.tsx
// Sample pet data without images
const samplePets = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    distance: "2.5 miles",
  },
  {
    id: "2",
    name: "Luna",
    breed: "Labrador",
    age: "1 year",
    distance: "3 miles",
  },
];

async function getDogImage() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    next: { revalidate: 0 }, // Disable cache
  });
  const data = await res.json();
  console.log("[SERVER] Dog API Response:", data);
  return data.message;
}

export default async function DashboardPage() {
  // Get dog images for each pet
  const petsWithImages = await Promise.all(
    samplePets.map(async (pet) => ({
      ...pet,
      imageUrl: await getDogImage(),
    }))
  );

  console.log("[SERVER] Pets with images:", petsWithImages);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Pets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petsWithImages.map((pet) => (
          <PetCard key={pet.id} {...pet} />
        ))}
      </div>
    </div>
  );
}
