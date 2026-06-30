"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen px-4 py-16 flex items-center justify-center">
      <article className="max-w-lg mx-auto text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
        <p className="text-text-muted mb-8">
          An error occurred while processing your request. Don't worry, we've been
          notified and are working to fix it.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
          >
            Go Home
          </Link>
        </div>
      </article>
    </main>
  );
}
