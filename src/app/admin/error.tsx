"use client";

import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <span className="text-5xl block mb-4">⚠️</span>
        <h1 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
          שגיאה בלוח הניהול
        </h1>
        <p className="text-[var(--color-warm-gray)] text-sm mb-6">
          {error.message || "אירעה שגיאה בטעינת לוח הניהול. אנא נסה שוב."}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary px-6 py-2 text-sm">
            נסה שוב
          </button>
          <Link
            href="/admin"
            className="px-6 py-2 text-sm rounded-lg border border-[var(--color-blue-deep)] text-[var(--color-blue-deep)] hover:bg-gray-100 transition-colors"
          >
            חזרה ללוח הבקרה
          </Link>
        </div>
      </div>
    </div>
  );
}
