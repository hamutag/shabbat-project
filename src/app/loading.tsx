import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-light relative overflow-hidden">
      {/* Subtle background orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[var(--color-blue-mid)]/5 rounded-full blur-3xl" />

      <div className="text-center relative">
        <div className="relative w-20 h-20 mx-auto mb-5">
          <Image
            src="/logo.png"
            alt="טוען"
            width={80}
            height={80}
            className="w-20 h-20 object-contain animate-pulse"
          />
          <div className="absolute inset-0 rounded-full border-2 border-[var(--color-gold)]/20 animate-ping" />
        </div>
        <p className="text-[var(--color-warm-gray)] text-sm font-medium">טוען...</p>
      </div>
    </div>
  );
}
