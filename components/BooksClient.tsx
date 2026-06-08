'use client';

import { useTransition, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { Book, Author } from '@/lib/data';

interface BooksClientProps {
  books: Book[];
  authors: Author[];
  genres: string[];
  currentGenre: string;
  currentSearch: string;
  currentPage: number;
  totalPages: number;
}

export default function BooksClient({
  books,
  authors,
  genres,
  currentGenre,
  currentSearch,
  currentPage,
  totalPages,
}: BooksClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback((updates: { genre?: string; search?: string; page?: number }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.genre !== undefined) {
      if (updates.genre === 'all') {
        params.delete('genre');
      } else {
        params.set('genre', updates.genre);
      }
      params.set('page', '1');
    }

    if (updates.search !== undefined) {
      if (!updates.search) {
        params.delete('search');
      } else {
        params.set('search', updates.search);
      }
      params.set('page', '1'); 
    }

    if (updates.page !== undefined) {
      params.set('page', updates.page.toString());
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [searchParams, pathname, router, startTransition]);

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleSearch = useCallback((query: string) => updateParams({ search: query }), [updateParams]);

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-opacity duration-200 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Books
      </h1>

      <SearchBar 
        onSearch={handleSearch}
        initialValue={currentSearch}
        placeholder="Search by title or author..."
      />

      {/* Genre Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => updateParams({ genre })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                currentGenre === genre
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {genre === 'all' ? 'All Genres' : genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing page {currentPage} of {totalPages}
      </p>
      
      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-650 dark:text-zinc-400">
            No books found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => {
              const author = authors.find(a => a.id === book.authorId);
              
              return (
                <Link 
                  key={book.id} 
                  href={`/books/${book.id}`}
                  className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-850 hover:-translate-y-1"
                >
                  <div className="relative h-80 bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 truncate">
                      {book.title}
                    </h2>
                    <p className="text-sm text-zinc-650 dark:text-zinc-455 mb-3 font-medium">
                      by {author?.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
                      <span className="bg-zinc-100 dark:bg-zinc-850 px-2.5 py-1 rounded-full font-medium">
                        {book.genre}
                      </span>
                      <span>{book.publishedYear}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            createPageUrl={createPageUrl}
          />
        </>
      )}
    </div>
  );
}
