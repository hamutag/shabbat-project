export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-light">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[var(--color-gold)] animate-spin" />
        </div>
        <p className="text-[var(--color-warm-gray)] text-sm">טוען...</p>
      </div>
    </div>
  );
}
