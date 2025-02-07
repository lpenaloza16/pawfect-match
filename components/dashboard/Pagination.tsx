// components/dashboard/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded bg-purple-600 text-white 
                 disabled:opacity-50 hover:bg-purple-700 transition-colors"
      >
        Previous
      </button>

      <span className="text-gray-900">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded bg-purple-600 text-white 
                 disabled:opacity-50 hover:bg-purple-700 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
