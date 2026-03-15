import Link from "next/link";
import Image from "next/image";
import { Home, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-light px-4 relative overflow-hidden">
      {/* Subtle background orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[var(--color-blue-mid)]/5 rounded-full blur-3xl" />

      <div className="text-center max-w-md relative">
        <div className="card p-10 backdrop-blur-lg bg-white/80 border border-white/40 shadow-lg">
          <Image
            src="/logo.png"
            alt="פרויקט השבת"
            width={64}
            height={64}
            className="w-16 h-16 mx-auto mb-4 object-contain opacity-60"
          />

          <h1 className="text-7xl font-black text-[var(--color-blue-deep)] mb-2 tracking-tight">
            404
          </h1>
          <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">
            הדף לא נמצא
          </h2>
          <p className="text-[var(--color-warm-gray)] mb-6">
            הדף שחיפשת לא קיים או שהועבר למקום אחר.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-primary px-6 py-2.5">
              <Home className="w-4 h-4" />
              דף הבית
            </Link>
            <Link href="/contact" className="btn-secondary px-6 py-2.5">
              <MessageCircle className="w-4 h-4" />
              צור קשר
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
