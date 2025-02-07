// components/search/FilterPanel.tsx
"use client";
import { useState, useEffect } from "react";
import { useDogsStore } from "@/store/dogsStore";

export default function FilterPanel() {
  const { breeds, fetchBreeds, filters, updateFilters } = useDogsStore();

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  const [localFilters, setLocalFilters] = useState({
    breeds: [] as string[],
    ageMin: undefined as number | undefined,
    ageMax: undefined as number | undefined,
    sort: "breed:asc" as "breed:asc" | "breed:desc",
  });

  const handleAgeChange = (ageRange: string) => {
    switch (ageRange) {
      case "puppy":
        setLocalFilters((prev) => ({ ...prev, ageMin: 0, ageMax: 1 }));
        break;
      case "young":
        setLocalFilters((prev) => ({ ...prev, ageMin: 1, ageMax: 3 }));
        break;
      case "adult":
        setLocalFilters((prev) => ({ ...prev, ageMin: 3, ageMax: 8 }));
        break;
      case "senior":
        setLocalFilters((prev) => ({ ...prev, ageMin: 8, ageMax: undefined }));
        break;
    }
  };

  const handleApplyFilters = () => {
    updateFilters(localFilters);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <p className="text-sm text-gray-500">Refine your search</p>
      </div>

      {/* Breed Selection */}
      <div>
        <label className="text-sm font-medium text-gray-700">Breed</label>
        <select
          multiple
          value={localFilters.breeds}
          onChange={(e) => {
            const values = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setLocalFilters((prev) => ({ ...prev, breeds: values }));
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-purple-500 focus:ring-purple-500"
        >
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      {/* Age */}
      <div>
        <label className="text-sm font-medium text-gray-700">Age</label>
        <div className="mt-2 space-y-2">
          {[
            { label: "Puppy", value: "puppy" },
            { label: "Young", value: "young" },
            { label: "Adult", value: "adult" },
            { label: "Senior", value: "senior" },
          ].map(({ label, value }) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="age"
                className="rounded-full border-gray-300 text-purple-600 
                         focus:ring-purple-500"
                onChange={() => handleAgeChange(value)}
              />
              <span className="ml-2 text-sm text-gray-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Order */}
      <div>
        <label className="text-sm font-medium text-gray-700">Sort Order</label>
        <select
          value={localFilters.sort}
          onChange={(e) =>
            setLocalFilters((prev) => ({
              ...prev,
              sort: e.target.value as "breed:asc" | "breed:desc",
            }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="breed:asc">Breed (A to Z)</option>
          <option value="breed:desc">Breed (Z to A)</option>
        </select>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md 
                 hover:bg-purple-700 focus:outline-none focus:ring-2 
                 focus:ring-purple-500 focus:ring-offset-2"
      >
        Apply Filters
      </button>
    </div>
  );
}
