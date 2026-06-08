import Link from 'next/link';
import { getAllPublishers, getBooksByPublisherId } from '@/lib/data';
import PublishersFilter from '@/components/PublishersFilter';
import Pagination from '@/components/Pagination';

const PUBLISHERS_PER_PAGE = 3;

interface PublishersPageProps {
  searchParams: Promise<{
    search?: string;
    hq?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function PublishersPage({ searchParams }: PublishersPageProps) {
  const { search = '', hq = 'all', sort = 'name_asc', page = '1' } = await searchParams;
  
  const allPublishers = await getAllPublishers();

  const locationsSet = new Set(allPublishers.map(pub => pub.headquarters));
  const locations = Array.from(locationsSet);

  let filteredPublishers = allPublishers.filter(pub => {
    const matchesSearch = pub.name.toLowerCase().includes(search.toLowerCase());
    const matchesHq = hq === 'all' || pub.headquarters.toLowerCase() === hq.toLowerCase();
    return matchesSearch && matchesHq;
  });

  filteredPublishers.sort((a, b) => {
    if (sort === 'name_asc') {
      return a.name.localeCompare(b.name);
    } else if (sort === 'name_desc') {
      return b.name.localeCompare(a.name);
    } else if (sort === 'year_asc') {
      return a.foundedYear - b.foundedYear;
    } else if (sort === 'year_desc') {
      return b.foundedYear - a.foundedYear;
    }
    return 0;
  });

  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const totalPages = Math.max(1, Math.ceil(filteredPublishers.length / PUBLISHERS_PER_PAGE));
  const paginatedPublishers = filteredPublishers.slice(
    (currentPage - 1) * PUBLISHERS_PER_PAGE,
    currentPage * PUBLISHERS_PER_PAGE
  );

  const getSortLink = (column: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (hq !== 'all') params.set('hq', hq);
    
    let newSort = `${column}_asc`;
    if (sort === `${column}_asc`) {
      newSort = `${column}_desc`;
    }
    params.set('sort', newSort);
    params.set('page', '1'); 
    return `/publishers?${params.toString()}`;
  };

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (hq !== 'all') params.set('hq', hq);
    params.set('sort', sort);
    params.set('page', pageNumber.toString());
    return `/publishers?${params.toString()}`;
  };

  const getSortIcon = (column: string) => {
    if (sort === `${column}_asc`) return ' ▴';
    if (sort === `${column}_desc`) return ' ▾';
    return '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        Book Publishers
      </h1>

      <PublishersFilter
        currentSearch={search}
        currentHq={hq}
        locations={locations}
      />

      <p className="text-sm text-zinc-650 dark:text-zinc-400 mb-4">
        Showing page {currentPage} of {totalPages}
      </p>

      {paginatedPublishers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-150 dark:border-zinc-800">
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            No publishers found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-150 dark:border-zinc-800">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
              <thead className="bg-zinc-50 dark:bg-zinc-850/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
                    <Link href={getSortLink('name')} className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 font-bold">
                      Publisher Name{getSortIcon('name')}
                    </Link>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
                    <Link href={getSortLink('year')} className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 font-bold">
                      Founded{getSortIcon('year')}
                    </Link>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
                    Headquarters
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
                    Books Published
                  </th>
                  <th scope="col" className="relative px-6 py-4">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                {await Promise.all(
                  paginatedPublishers.map(async (pub) => {
                    const books = await getBooksByPublisherId(pub.id);
                    return (
                      <tr key={pub.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-150 dark:border-zinc-700">
                              <img
                                src={pub.logoUrl}
                                alt={`${pub.name} logo`}
                                className="object-cover h-full w-full"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                {pub.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                            {pub.foundedYear}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-650 dark:text-zinc-400">
                          {pub.headquarters}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-50 font-semibold">
                          {books.length} {books.length === 1 ? 'book' : 'books'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/publishers/${pub.id}`}
                            className="text-zinc-900 dark:text-zinc-55 hover:text-zinc-600 dark:hover:text-zinc-300 font-bold transition-colors"
                          >
                            Details →
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
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
