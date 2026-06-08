'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface PublishersFilterProps {
  currentSearch: string;
  currentHq: string;
  locations: string[];
}

export default function PublishersFilter({ currentSearch, currentHq, locations }: PublishersFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);

  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const currentQuery = searchParams.get('search') || '';
      if (search === currentQuery) return;

      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set('search', search);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      router.push(`/publishers?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, router, searchParams]);

  const handleHqChange = (hq: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (hq === 'all') {
      params.delete('hq');
    } else {
      params.set('hq', hq);
    }
    params.set('page', '1'); 
    router.push(`/publishers?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1 relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search publishers by name..."
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300 text-sm"
          >
            Clear
          </button>
        )}
      </div>
      <div className="w-full sm:w-64">
        <select
          value={currentHq}
          onChange={(e) => handleHqChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 text-sm cursor-pointer"
        >
          <option value="all">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
