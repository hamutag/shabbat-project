"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
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
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("שגיאה בהתחברות. אנא נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-light flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl mb-3 block">🕯️</span>
          <h1 className="text-3xl font-black text-[var(--color-blue-deep)] mb-2">
            ברוך שובך
          </h1>
          <p className="text-[var(--color-warm-gray)]">
            התחבר כדי להמשיך את המסע שלך
          </p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

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
              {loading ? "מתחבר..." : "התחבר"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--color-warm-gray)] mt-6">
          עדיין אין לך חשבון?{" "}
          <Link href="/register" className="text-[var(--color-gold)] font-semibold hover:underline">
            הצטרף עכשיו
          </Link>
        </p>
      </div>
    </div>
  );
}
