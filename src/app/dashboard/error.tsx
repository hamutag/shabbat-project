"use client";

import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-light px-4">
      <div className="text-center max-w-md">
        <span className="text-5xl block mb-4">😔</span>
        <h1 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
          שגיאה בטעינת לוח הבקרה
        </h1>
        <p className="text-[var(--color-warm-gray)] text-sm mb-6">
          {error.message || "אירעה שגיאה. אנא נסה שוב."}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary px-6 py-2 text-sm">
            נסה שוב
          </button>
          <Link
            href="/"
            className="px-6 py-2 text-sm rounded-lg border border-[var(--color-blue-deep)] text-[var(--color-blue-deep)] hover:bg-[var(--color-blue-light)] transition-colors"
          >
            דף הבית
          </Link>
        </div>
      </div>
    </div>
  );
}
