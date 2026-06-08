import Link from 'next/link';

interface NavigationProps {
  isLoggedIn: boolean;
}

export default function Navigation({ isLoggedIn }: NavigationProps) {
  async function handleLogout() {
    'use server';
    const { cookies } = await import('next/headers');
    const { redirect } = await import('next/navigation');
    const cookieStore = await cookies();
    cookieStore.delete('isLoggedIn');
    redirect('/login');
  }

  return (
    <nav className="bg-zinc-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold hover:text-zinc-300 transition-colors flex items-center gap-2">
              <span>📚</span> BookHub
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="hover:text-zinc-300 transition-colors font-medium text-sm"
            >
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link 
                  href="/books" 
                  className="hover:text-zinc-300 transition-colors font-medium text-sm"
                >
                  Books
                </Link>
                <Link 
                  href="/authors" 
                  className="hover:text-zinc-300 transition-colors font-medium text-sm"
                >
                  Authors
                </Link>
                <Link 
                  href="/publishers" 
                  className="hover:text-zinc-300 transition-colors font-medium text-sm"
                >
                  Publishers
                </Link>
              </>
            )}

            <div className="border-l border-zinc-700 h-5 my-auto mx-2" />

            {isLoggedIn ? (
              <form action={handleLogout} className="flex items-center">
                <button 
                  type="submit" 
                  className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer hover:shadow-md"
                >
                  Logout
                </button>
              </form>
            ) : (
              <Link 
                href="/login" 
                className="bg-white text-zinc-900 hover:bg-zinc-100 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
