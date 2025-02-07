// components/dashboard/FavoritesBar.tsx
"use client";

import { useDogsStore } from "@/store/dogsStore";

export default function FavoritesBar() {
  const { favorites, generateMatch, matchedDog, clearMatch, isLoading } =
    useDogsStore();

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 mt-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-gray-900">
          <span className="font-medium">Selected Favorites:</span>{" "}
          <span className="text-purple-600">{favorites.size}</span>
        </div>

        <button
          onClick={generateMatch}
          disabled={favorites.size === 0 || isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
                   disabled:opacity-50 hover:bg-purple-700 transition-colors"
        >
          {isLoading ? "Generating..." : "Find My Match!"}
        </button>
      </div>

      {/* Match Result Modal */}
      {matchedDog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              You've Been Matched!
            </h3>

            <div className="space-y-4">
              <img
                src={matchedDog.img}
                alt={matchedDog.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-gray-900">
                  {matchedDog.name}
                </h4>
                <p className="text-gray-600">{matchedDog.breed}</p>
                <p className="text-gray-600">{matchedDog.age} years old</p>
                <p className="text-gray-600">Location: {matchedDog.zip_code}</p>
              </div>

              <button
                onClick={clearMatch}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg
                         hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
