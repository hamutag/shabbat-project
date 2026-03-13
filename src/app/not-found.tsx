import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-light px-4">
      <div className="text-center max-w-md">
        <span className="text-7xl block mb-4">🕯️</span>
        <h1 className="text-6xl font-black text-[var(--color-blue-deep)] mb-2">
          404
        </h1>
        <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">
          הדף לא נמצא
        </h2>
        <p className="text-[var(--color-warm-gray)] mb-6">
          הדף שחיפשת לא קיים או שהועבר למקום אחר.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary px-6 py-2"
          >
            חזרה לדף הבית
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 rounded-lg border border-[var(--color-blue-deep)] text-[var(--color-blue-deep)] hover:bg-[var(--color-blue-light)] transition-colors"
          >
            צור קשר
          </Link>
        </div>
      </div>
    </div>
  );
}
