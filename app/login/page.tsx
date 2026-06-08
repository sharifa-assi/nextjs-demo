import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  async function handleLogin(formData: FormData) {
    'use server';
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username.trim() && password.trim()) {
      const cookieStore = await cookies();
      cookieStore.set('isLoggedIn', 'true', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      const destination = callbackUrl || '/books';
      redirect(destination);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-150 dark:border-zinc-800 transition-all duration-300">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-650 dark:text-zinc-400">
            Sign in to access books, authors, and publishers
          </p>
        </div>

        <form action={handleLogin} className="mt-8 space-y-6">
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                defaultValue="admin"
                placeholder="Enter any username"
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-850 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-450 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                defaultValue="admin123"
                placeholder="••••••••"
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-850 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-450 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-150 dark:border-zinc-850">
            <span className="text-xs text-zinc-500 dark:text-zinc-450 flex items-center gap-1.5 leading-snug">
              ℹ️ <strong>Mock Authentication:</strong> You can enter any username and password (e.g. admin / admin123) to successfully sign in.
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors cursor-pointer shadow-md"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
