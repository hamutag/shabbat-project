"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-light px-4 relative overflow-hidden">
      <GradientOrbs variant="light" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md relative"
      >
        <div className="card p-10 backdrop-blur-lg bg-white/80 border border-white/40 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>

          <h1 className="text-2xl font-black text-[var(--color-blue-deep)] mb-3">
            משהו השתבש
          </h1>
          <p className="text-[var(--color-warm-gray)] mb-6">
            {error.message || "אירעה שגיאה בלתי צפויה. אנא נסה שוב."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="btn-primary px-6 py-2.5 group"
            >
              <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
              נסה שוב
            </button>
            <Link
              href="/"
              className="btn-secondary px-6 py-2.5"
            >
              <Home className="w-4 h-4" />
              דף הבית
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
