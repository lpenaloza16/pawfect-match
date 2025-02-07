// components/dashboard/SortControl.tsx
"use client";

import { useDogsStore } from "@/store/dogsStore";

export default function SortControl() {
  const { sortOrder, setSortOrder } = useDogsStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h3 className="font-medium mb-3 text-gray-900">Sort by Breed</h3>
      <select
        className="w-full border rounded p-2 text-gray-900"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
      >
        <option value="asc" className="text-gray-900">
          A to Z
        </option>
        <option value="desc" className="text-gray-900">
          Z to A
        </option>
      </select>
    </div>
  );
}
