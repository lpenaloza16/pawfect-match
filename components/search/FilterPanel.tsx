// components/search/FilterPanel.tsx
"use client";

import { useState } from "react";

export default function FilterPanel() {
  const [filters, setFilters] = useState({
    species: "dog",
    age: [],
    size: [],
    gender: "",
    distance: 50,
  });

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <p className="text-sm text-gray-500">Refine your search</p>
      </div>

      {/* Species */}
      <div>
        <label className="text-sm font-medium text-gray-700">Species</label>
        <select
          value={filters.species}
          onChange={(e) => setFilters({ ...filters, species: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Age */}
      <div>
        <label className="text-sm font-medium text-gray-700">Age</label>
        <div className="mt-2 space-y-2">
          {["Puppy", "Young", "Adult", "Senior"].map((age) => (
            <label key={age} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                checked={filters.age.includes(age.toLowerCase())}
                onChange={(e) => {
                  const newAge = [...filters.age];
                  if (e.target.checked) {
                    newAge.push(age.toLowerCase());
                  } else {
                    const index = newAge.indexOf(age.toLowerCase());
                    if (index > -1) newAge.splice(index, 1);
                  }
                  setFilters({ ...filters, age: newAge });
                }}
              />
              <span className="ml-2 text-sm text-gray-600">{age}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Distance Slider */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Distance: {filters.distance} miles
        </label>
        <input
          type="range"
          min="5"
          max="100"
          value={filters.distance}
          onChange={(e) =>
            setFilters({ ...filters, distance: Number(e.target.value) })
          }
          className="mt-2 w-full"
        />
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
        Apply Filters
      </button>
    </div>
  );
}
