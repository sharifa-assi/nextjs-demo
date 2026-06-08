import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPublisherById, getBooksByPublisherId, getAuthorById } from '@/lib/data';

interface PublisherPageProps {
  params: Promise<{ id: string }>;
}

export default async function PublisherPage({ params }: PublisherPageProps) {
  const { id } = await params;
  const publisher = await getPublisherById(parseInt(id));

  if (!publisher) {
    notFound();
  }

  const books = await getBooksByPublisherId(publisher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/publishers" 
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-6 inline-block font-medium transition-colors"
      >
        ← Back to Publishers
      </Link>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 mt-6 border border-zinc-150 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-md border border-zinc-200 dark:border-zinc-700">
              <img
                src={publisher.logoUrl}
                alt={publisher.name}
                className="object-cover h-full w-full"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4 text-center md:text-left">
              {publisher.name}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
              <div className="bg-zinc-100 dark:bg-zinc-850 px-4 py-2.5 rounded-xl border border-zinc-150 dark:border-zinc-800 min-w-28 text-center md:text-left">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-450 block uppercase font-bold tracking-wider mb-0.5">Founded</span>
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                  {publisher.foundedYear}
                </span>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-850 px-4 py-2.5 rounded-xl border border-zinc-150 dark:border-zinc-800 min-w-40 text-center md:text-left">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-450 block uppercase font-bold tracking-wider mb-0.5">Headquarters</span>
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                  {publisher.headquarters}
                </span>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-850 px-4 py-2.5 rounded-xl border border-zinc-150 dark:border-zinc-800 min-w-28 text-center md:text-left">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-450 block uppercase font-bold tracking-wider mb-0.5">Books Catalog</span>
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                  {books.length}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                About the Publisher
              </h2>
              <p className="text-zinc-700 dark:text-zinc-350 leading-relaxed text-sm">
                {publisher.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
          Books Published by {publisher.name}
        </h2>

        {books.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-150 dark:border-zinc-800 text-center">
            No books found for this publisher.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {await Promise.all(
              books.map(async (book) => {
                const author = await getAuthorById(book.authorId);
                return (
                  <Link 
                    key={book.id} 
                    href={`/books/${book.id}`}
                    className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-zinc-150 dark:border-zinc-800 hover:-translate-y-1"
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
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 truncate">
                        {book.title}
                      </h3>
                      <p className="text-sm text-zinc-650 dark:text-zinc-450 mb-3 font-medium">
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
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
