// components/dashboard/PetCard.tsx
import Image from "next/image";
import { useDogsStore } from "@/store/dogsStore";

interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  imageUrl: string;
  distance: string;
}

export default function PetCard({
  id,
  name,
  breed,
  age,
  imageUrl,
  distance,
}: PetCardProps) {
  const { favorites, toggleFavorite } = useDogsStore();
  const isFavorite = favorites.has(id);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
        <button
          onClick={() => toggleFavorite(id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{breed}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-500">{age}</span>
          <span className="text-sm text-gray-500">{distance}</span>
        </div>
      </div>
    </div>
  );
}
