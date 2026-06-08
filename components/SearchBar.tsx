'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search...", initialValue = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const isUserInput = useRef(false);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    // Only fire the search callback when the user has actually typed something
    if (!isUserInput.current) {
      return;
    }

    const timer = setTimeout(() => {
      onSearch(query);
      isUserInput.current = false;
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            isUserInput.current = true;
            setQuery(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {query && (
          <button
            onClick={() => {
              isUserInput.current = true;
              setQuery('');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
