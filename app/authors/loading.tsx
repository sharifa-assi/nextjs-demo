export default function AuthorsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-48 mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-150 dark:border-zinc-850 p-6 flex flex-col justify-between h-64 shadow-sm">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0"></div>
                  <div className="space-y-2 flex-1 pt-2">
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850 flex justify-between items-center mt-4">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20"></div>
                <div className="h-7 bg-zinc-200 dark:bg-zinc-800 rounded-full w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
