// components/dashboard/FavoritesList.tsx
"use client";

import { useState, useEffect } from "react";
import PetCard from "../PetCard";

export default function FavoritesList() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites");
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No favorites yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Start browsing to add some pets to your favorites!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((pet) => (
        <PetCard key={pet.id} {...pet} />
      ))}
    </div>
  );
}
