// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useDogsStore } from "@/store/dogsStore";
import PetCard from "@/components/dashboard/PetCard";
import BreedFilter from "@/components/dashboard/BreedFilter";
import Pagination from "@/components/dashboard/Pagination";
import SortControl from "@/components/dashboard/SortControl";
import FavoritesBar from "@/components/dashboard/FavoritesBar";

export default function DashboardPage() {
  const {
    dogs,
    fetchDogs,
    fetchBreeds,
    isLoading,
    error,
    currentPage,
    totalPages,
  } = useDogsStore();

  useEffect(() => {
    fetchBreeds();
    fetchDogs();
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Find Your Perfect Dog
        </h1>
        <FavoritesBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <BreedFilter />
          <SortControl />
        </div>

        <div className="md:col-span-3">
          {isLoading ? (
            <div className="text-gray-600">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dogs.map((dog) => (
                  <PetCard
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    breed={dog.breed}
                    age={`${dog.age} years`}
                    imageUrl={dog.img}
                    distance={`ZIP: ${dog.zip_code}`}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={fetchDogs}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
