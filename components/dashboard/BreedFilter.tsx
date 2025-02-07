// components/dashboard/BreedFilter.tsx
"use client";

import { useDogsStore } from "@/store/dogsStore";

export default function BreedFilter() {
  const { breeds, selectedBreeds, setSelectedBreeds } = useDogsStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h3 className="font-medium mb-3 text-gray-900">Filter by Breed</h3>
      <div className="max-h-96 overflow-y-auto">
        <select
          multiple
          className="w-full border rounded p-2 text-gray-900"
          value={selectedBreeds}
          onChange={(e) => {
            const values = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setSelectedBreeds(values);
          }}
        >
          {breeds.map((breed) => (
            <option key={breed} value={breed} className="text-gray-900">
              {breed}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
