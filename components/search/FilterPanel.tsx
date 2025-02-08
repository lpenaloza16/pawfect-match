// components/search/FilterPanel.tsx
"use client";
import { useState, useEffect } from "react";
import { useDogsStore } from "@/store/dogsStore";

export default function FilterPanel() {
  const {
    breeds,
    fetchBreeds,
    filters, // Current filters from store
    updateFilters, // Action to update filters
  } = useDogsStore();

  // Initialize local state with current filters
  const [localFilters, setLocalFilters] = useState({
    breeds: filters.breeds,
    zipCodes: filters.zipCodes,
    ageMin: filters.ageMin,
    ageMax: filters.ageMax,
    sort: filters.sort,
    size: filters.size,
  });

  // When Apply button is clicked, update store filters
  const handleApplyFilters = () => {
    updateFilters(localFilters);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
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

      {/* Age Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700">Age</label>
        <div className="mt-2 space-y-2">
          {[
            { label: "Puppy (0-1 year)", value: "puppy", min: 0, max: 1 },
            { label: "Young (1-3 years)", value: "young", min: 1, max: 3 },
            { label: "Adult (3-8 years)", value: "adult", min: 3, max: 8 },
            {
              label: "Senior (8+ years)",
              value: "senior",
              min: 8,
              max: undefined,
            },
          ].map(({ label, value, min, max }) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="age"
                checked={
                  localFilters.ageMin === min && localFilters.ageMax === max
                }
                onChange={() =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    ageMin: min,
                    ageMax: max,
                  }))
                }
                className="rounded-full border-gray-300 text-purple-600 
                         focus:ring-purple-500"
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

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md 
                   hover:bg-purple-700 focus:outline-none focus:ring-2 
                   focus:ring-purple-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>

        <button
          onClick={() => {
            setLocalFilters(DEFAULT_FILTERS);
            updateFilters(DEFAULT_FILTERS);
          }}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md 
                   hover:bg-gray-200 focus:outline-none focus:ring-2 
                   focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
