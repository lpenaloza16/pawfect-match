// components/dashboard/FilterBar.tsx
"use client";

import { useDogsStore } from "@/store/dogsStore";

export default function FilterBar() {
  const { breeds, filters, updateFilters } = useDogsStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      {/* Breed Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Breed
        </label>
        <select
          multiple
          className="w-full p-2 border rounded-lg text-gray-900"
          value={filters.breeds}
          onChange={(e) => {
            const values = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            updateFilters({ breeds: values });
          }}
        >
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort by Breed
        </label>
        <select
          className="w-full p-2 border rounded-lg text-gray-900"
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
        >
          <option value="breed:asc">Breed (A to Z)</option>
          <option value="breed:desc">Breed (Z to A)</option>
        </select>
      </div>
    </div>
  );
}
