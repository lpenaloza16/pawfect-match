// app/dashboard/match/[id]/page.tsx
export default function MatchDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Match Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details about your potential furry friend.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {/* Add pet details here */}
          </dl>
        </div>
      </div>
    </div>
  );
}
