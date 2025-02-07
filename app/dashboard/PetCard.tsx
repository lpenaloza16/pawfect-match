// components/dashboard/PetCard.tsx
import Image from "next/image";
import Link from "next/link";

interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  imageUrl: string;
  distance: string;
}

export default function PetCard({
  id,
  name,
  breed,
  age,
  imageUrl,
  distance,
}: PetCardProps) {
  return (
    <Link href={`/dashboard/match/${id}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="relative h-48">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{breed}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500">{age}</span>
            <span className="text-sm text-gray-500">{distance} away</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
