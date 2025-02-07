// app/dashboard/page.tsx (Complete version)
import PetCard from "@/components/dashboard/PetCard";
import FilterPanel from "@/components/search/FilterPanel";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Available Pets</h1>
        <p className="mt-2 text-gray-600">
          Find your perfect companion from our available pets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <FilterPanel />
        </div>

        {/* Pet Grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample pets - Replace with actual data */}
            <PetCard
              id="1"
              name="Max"
              breed="Golden Retriever"
              age="2 years"
              imageUrl="/pets/dog1.jpg"
              distance="2.5 miles"
            />
            {/* Add more PetCards */}
          </div>
        </div>
      </div>
    </div>
  );
}
