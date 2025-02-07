// components/dashboard/PetCard.tsx
"use client";

import { useDogsStore } from "@/store/dogsStore";

interface PetCardProps {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function PetCard({
  id,
  img,
  name,
  age,
  zip_code,
  breed,
}: PetCardProps) {
  const { favorites, toggleFavorite } = useDogsStore();
  const isFavorite = favorites.has(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img src={img} alt={name} className="w-full h-48 object-cover" />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white
                   transition-colors duration-200 z-10"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className="text-2xl">{isFavorite ? "❤️" : "🤍"}</span>
        </button>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Breed:</span> {breed}
          </p>
          <p>
            <span className="font-medium">Age:</span> {age} years
          </p>
          <p>
            <span className="font-medium">Location:</span> {zip_code}
          </p>
        </div>
      </div>
    </div>
  );
}
