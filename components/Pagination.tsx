import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  createPageUrl: (page: number) => string;
}

export default function Pagination({ currentPage, totalPages, createPageUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-1 mt-12" aria-label="Pagination Navigation">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-750 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 text-sm font-medium"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border border-zinc-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-950/50 cursor-not-allowed text-sm font-medium">
          Previous
        </span>
      )}

      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 text-sm font-medium ${
                isActive
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-semibold shadow-md shadow-zinc-900/10 dark:shadow-zinc-50/10'
                  : 'border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-755 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 text-sm font-medium"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border border-zinc-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-950/50 cursor-not-allowed text-sm font-medium">
          Next
        </span>
      )}
    </nav>
  );
}
