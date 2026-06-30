import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen px-4 py-16 flex items-center justify-center">
      <article className="max-w-lg mx-auto text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-text-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
          >
            Go Home
          </Link>
          <Link
            href="/guides/"
            className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
          >
            View Guides
          </Link>
        </div>
      </article>
    </main>
  );
}
