"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientOrbs } from "@/components/ui/GradientOrbs";

export default function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("טלפון/אימייל או סיסמה שגויים");
      } else {
        window.location.href = callbackUrl;
      }
    } catch {
      setError("שגיאה בהתחברות. אנא נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-light flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <GradientOrbs variant="gold" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/logo.png" alt="פרויקט השבת" width={80} height={80} className="mx-auto mb-3 w-20 h-20 object-contain" />
          </motion.div>
          <h1 className="text-3xl font-black text-[var(--color-blue-deep)] mb-2">
            ברוך שובך
          </h1>
          <p className="text-[var(--color-warm-gray)]">
            התחבר כדי להמשיך את המסע שלך
          </p>
        </div>

        <div className="card p-8 shadow-lg backdrop-blur-lg bg-white/80 border border-white/40">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                טלפון או אימייל
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="הזן טלפון או אימייל"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                סיסמה
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="הזן סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-[var(--color-warm-gray)]">זכור אותי</span>
              </label>
              <Link href="/contact" className="text-sm text-[var(--color-gold)] hover:underline">
                שכחתי סיסמה
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  מתחבר...
                </span>
              ) : (
                "התחבר"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--color-warm-gray)] mt-6">
          עדיין אין לך חשבון?{" "}
          <Link href="/register" className="text-[var(--color-gold)] font-semibold hover:underline">
            הצטרף עכשיו
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
