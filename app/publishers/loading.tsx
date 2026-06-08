export default function PublishersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-zinc-250 dark:bg-zinc-800 rounded-lg w-64 mb-8"></div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="h-11 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex-1"></div>
          <div className="h-11 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full sm:w-64"></div>
        </div>

        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-36 mb-4"></div>

        <div className="overflow-hidden bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-150 dark:border-zinc-800">
          <div className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
            <div className="bg-zinc-50 dark:bg-zinc-850/50 px-6 py-4 flex justify-between">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-32"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-24"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-28"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16"></div>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
              {[1, 2, 3].map((n) => (
                <div key={n} className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
                    <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-36"></div>
                  </div>
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-14"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-28"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16"></div>
                  <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
