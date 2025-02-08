// components/dashboard/PetCard.tsx
"use client";

import { Dog } from "@/types/dogs";
import { useDogsStore } from "@/store/dogsStore";
import Image from "next/image";

// Change the props to receive all dog properties directly
export default function PetCard({ id, img, name, age, zip_code, breed }: Dog) {
  const { favorites, toggleFavorite } = useDogsStore();

  const isFavorite = favorites.has(id);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative h-48">
        <Image src={img} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <button
            onClick={() => toggleFavorite(id)}
            className={`p-2 rounded-full ${
              isFavorite
                ? "text-red-600 hover:text-red-700"
                : "text-gray-400 hover:text-red-600"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">{breed}</p>
        <p className="text-sm text-gray-500">{age} years old</p>
        <p className="text-sm text-gray-500">Location: {zip_code}</p>
      </div>
    </div>
  );
}
