export default function DashboardLoading() {
  return (
    <div className="min-h-screen gradient-light py-8 px-4">
      <div className="container-main max-w-6xl">
        {/* Welcome Skeleton */}
        <div className="card p-6 mb-6">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-4 space-y-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6 space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="card p-6 space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
