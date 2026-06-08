import Link from 'next/link';
import Image from 'next/image';
import { getAllAuthors, getBooksByAuthorId } from '@/lib/data';
import Pagination from '@/components/Pagination';

const AUTHORS_PER_PAGE = 3;

interface AuthorsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function AuthorsPage({ searchParams }: AuthorsPageProps) {
  const { page = '1' } = await searchParams;
  
  const allAuthors = await getAllAuthors();

  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const totalPages = Math.max(1, Math.ceil(allAuthors.length / AUTHORS_PER_PAGE));
  const paginatedAuthors = allAuthors.slice(
    (currentPage - 1) * AUTHORS_PER_PAGE,
    currentPage * AUTHORS_PER_PAGE
  );

  const createPageUrl = (pageNumber: number) => {
    return `/authors?page=${pageNumber}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Authors
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {await Promise.all(
          paginatedAuthors.map(async (author) => {
            const bookCount = (await getBooksByAuthorId(author.id)).length;
            
            return (
              <Link 
                key={author.id} 
                href={`/authors/${author.id}`}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-850 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex-shrink-0">
                      <Image
                        src={author.imageUrl}
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1 line-clamp-1">
                        {author.name}
                      </h2>
                      <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium">
                        {author.nationality}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {author.bio}
                  </p>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs border-t border-zinc-100 dark:border-zinc-850 mt-auto bg-zinc-50/50 dark:bg-zinc-900/50">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                    Born: {author.birthYear}
                  </span>
                  <span className="bg-zinc-250 dark:bg-zinc-800 text-zinc-750 dark:text-zinc-300 px-3 py-1 rounded-full font-semibold">
                    {bookCount} {bookCount === 1 ? 'book' : 'books'}
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        createPageUrl={createPageUrl}
      />
    </div>
  );
}
