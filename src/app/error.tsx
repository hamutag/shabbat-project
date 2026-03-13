"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-light px-4">
      <div className="text-center max-w-md">
        <span className="text-6xl block mb-4">😔</span>
        <h1 className="text-2xl font-black text-[var(--color-blue-deep)] mb-3">
          משהו השתבש
        </h1>
        <p className="text-[var(--color-warm-gray)] mb-6">
          {error.message || "אירעה שגיאה בלתי צפויה. אנא נסה שוב."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary px-6 py-2"
          >
            נסה שוב
          </button>
          <Link
            href="/"
            className="px-6 py-2 rounded-lg border border-[var(--color-blue-deep)] text-[var(--color-blue-deep)] hover:bg-[var(--color-blue-light)] transition-colors"
          >
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  );
}
