"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { trpc } from "@/lib/trpc";

export default function RegisterContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: regions } = trpc.city.regions.useQuery();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "" as "MALE" | "FEMALE" | "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("הסיסמאות לא תואמות");
      return;
    }
    if (form.password.length < 6) {
      setError("סיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }
    if (!form.gender) {
      setError("יש לבחור מגדר");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email || undefined,
          gender: form.gender,
          city: form.city,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "שגיאה בהרשמה");
        return;
      }

      // Auto-login after registration
      const loginResult = await signIn("credentials", {
        identifier: form.phone,
        password: form.password,
        redirect: false,
      });

      if (loginResult?.error) {
        router.push("/login");
      } else {
        router.push("/onboarding");
        router.refresh();
      }
    } catch {
      setError("שגיאה בהרשמה. אנא נסה שוב.");
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
            הצטרף לפרויקט השבת
          </h1>
          <p className="text-[var(--color-warm-gray)]">
            יחד נאיר את עם ישראל
          </p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                  שם פרטי *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="שם פרטי"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                  שם משפחה *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="שם משפחה"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                טלפון נייד *
              </label>
              <input
                type="tel"
                className="input-field"
                placeholder="050-0000000"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                אימייל
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="email@example.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                מגדר *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`card py-3 text-center cursor-pointer border-2 transition-colors ${
                    form.gender === "MALE"
                      ? "border-[var(--color-gold)] bg-amber-50"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    className="sr-only"
                    onChange={() => updateField("gender", "MALE")}
                    checked={form.gender === "MALE"}
                  />
                  <span className="text-xl block mb-1">👨</span>
                  <span className="text-sm font-medium">גבר</span>
                </label>
                <label
                  className={`card py-3 text-center cursor-pointer border-2 transition-colors ${
                    form.gender === "FEMALE"
                      ? "border-[var(--color-gold)] bg-amber-50"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    className="sr-only"
                    onChange={() => updateField("gender", "FEMALE")}
                    checked={form.gender === "FEMALE"}
                  />
                  <span className="text-xl block mb-1">👩</span>
                  <span className="text-sm font-medium">אישה</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                עיר *
              </label>
              <select
                className="input-field"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                required
              >
                <option value="">בחר עיר</option>
                {regions ? (
                  regions.map((region) => (
                    <optgroup key={region.id} label={region.name}>
                      {region.cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </optgroup>
                  ))
                ) : (
                  <>
                    <option value="ירושלים">ירושלים</option>
                    <option value="תל אביב-יפו">תל אביב-יפו</option>
                    <option value="חיפה">חיפה</option>
                    <option value="באר שבע">באר שבע</option>
                    <option value="נתניה">נתניה</option>
                    <option value="אשדוד">אשדוד</option>
                    <option value="פתח תקווה">פתח תקווה</option>
                    <option value="בני ברק">בני ברק</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                סיסמה *
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="לפחות 6 תווים"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                אימות סיסמה *
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="הזן סיסמה שוב"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                dir="ltr"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "נרשם..." : "הצטרף עכשיו"}
            </button>

            <p className="text-center text-xs text-[var(--color-warm-gray)] mt-4">
              בהצטרפותך אתה מסכים ל
              <Link href="/terms" className="text-[var(--color-gold)] hover:underline">תנאי השימוש</Link>
              {" "}ול
              <Link href="/privacy" className="text-[var(--color-gold)] hover:underline">מדיניות הפרטיות</Link>
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--color-warm-gray)] mt-6">
          כבר יש לך חשבון?{" "}
          <Link href="/login" className="text-[var(--color-gold)] font-semibold hover:underline">
            התחבר
          </Link>
        </p>
      </div>
    </div>
  );
}
