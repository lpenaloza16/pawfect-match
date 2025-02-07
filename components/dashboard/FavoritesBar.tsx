// components/dashboard/FavoritesBar.tsx
"use client";

import { useState } from "react";
import { useDogsStore } from "@/store/dogsStore";

export default function FavoritesBar() {
  const { favorites, generateMatch } = useDogsStore();
  const [matchedDogId, setMatchedDogId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMatch = async () => {
    setIsGenerating(true);
    try {
      const match = await generateMatch();
      setMatchedDogId(match);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-gray-900">
          <span className="font-medium">Favorites: </span>
          <span className="text-purple-600">{favorites.size}</span>
        </div>

        <button
          onClick={handleGenerateMatch}
          disabled={favorites.size === 0 || isGenerating}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg 
                   disabled:opacity-50 hover:bg-purple-700 transition-colors"
        >
          {isGenerating ? "Generating..." : "Find Match!"}
        </button>
      </div>

      {matchedDogId && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <p className="text-purple-700">
            You've been matched! Dog ID: {matchedDogId}
          </p>
        </div>
      )}
    </div>
  );
}
