export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-3 border-gray-200 border-t-[var(--color-gold)]`}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-light">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto animate-spin rounded-full border-4 border-gray-200 border-t-[var(--color-gold)] mb-4" />
        <p className="text-[var(--color-warm-gray)]">טוען...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="bg-gray-50 p-3 flex gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-3 bg-gray-200 rounded flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-3 flex gap-4 border-t">
          {[1, 2, 3, 4, 5].map((j) => (
            <div key={j} className="h-3 bg-gray-200 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
