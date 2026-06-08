export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse space-y-8">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/3"></div>
        <div className="space-y-3">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
