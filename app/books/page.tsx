import { getAllBooks, getAllAuthors } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

const BOOKS_PER_PAGE = 3;

interface BooksPageProps {
  searchParams: Promise<{
    genre?: string;
    page?: string;
    search?: string;
  }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const { genre = 'all', page = '1', search = '' } = await searchParams;
  
  const allBooks = await getAllBooks();
  const authors = await getAllAuthors();

  const genresSet = new Set(allBooks.map(book => book.genre));
  const genres = ['all', ...Array.from(genresSet)];

  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = !search ||
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      authors.find(a => a.id === book.authorId)?.name.toLowerCase().includes(search.toLowerCase());
      
    const matchesGenre = genre === 'all' || book.genre === genre;
    return matchesSearch && matchesGenre;
  });

  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / BOOKS_PER_PAGE));
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  return (
    <BooksClient
      books={paginatedBooks}
      authors={authors}
      genres={genres}
      currentGenre={genre}
      currentSearch={search}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
