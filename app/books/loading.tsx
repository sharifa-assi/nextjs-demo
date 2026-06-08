export default function BooksLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-48 mb-8"></div>
        
        <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full mb-8"></div>
        
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-9 bg-zinc-200 dark:bg-zinc-800 rounded-full w-24 flex-shrink-0"></div>
          ))}
        </div>

        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-36 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-850 shadow-sm">
              <div className="h-80 bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-7 bg-zinc-200 dark:bg-zinc-800 rounded-full w-20"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
