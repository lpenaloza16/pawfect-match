// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDogsStore } from "@/store/dogsStore";
import FilterPanel from "@/components/search/FilterPanel";
import PetCard from "@/components/dashboard/PetCard";
import FavoritesBar from "@/components/dashboard/FavoritesBar";
import Pagination from "@/components/dashboard/Pagination";

export default function DashboardPage() {
  const router = useRouter();
  const {
    dogs,
    fetchDogs,
    fetchBreeds,
    currentPage,
    totalPages,
    isLoading,
    error,
  } = useDogsStore();

  useEffect(() => {
    // Check authentication and fetch data
    const initializeDashboard = async () => {
      try {
        // Try to fetch breeds as an auth check
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          // If not authenticated, redirect to login
          router.push("/login");
          return;
        }

        // If authenticated, fetch data
        await fetchBreeds();
        await fetchDogs();
      } catch (error) {
        console.error("Dashboard initialization error:", error);
        router.push("/login");
      }
    };

    initializeDashboard();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Find Your Perfect Dog
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="md:col-span-1">
            <FilterPanel />
          </div>

          {/* Dogs Grid */}
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            ) : dogs.length === 0 ? (
              <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg">
                No dogs found matching your criteria.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dogs.map((dog) => (
                    <PetCard key={dog.id} {...dog} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-6">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={fetchDogs}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <FavoritesBar />
    </div>
  );
}
