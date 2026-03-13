"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { trpc } from "@/lib/trpc";

export default function ProfileContent() {
  const { data: user, isLoading } = trpc.user.me.useQuery();
  const utils = trpc.useUtils();

  const updateProfile = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      utils.user.me.invalidate();
      setSuccessMsg("הפרופיל עודכן בהצלחה!");
      setTimeout(() => setSuccessMsg(""), 3000);
    },
    onError: () => {
      setError("שגיאה בעדכון הפרופיל");
    },
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    neighborhood: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        neighborhood: user.neighborhood || "",
      });
    }
  }, [user]);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setError("");
    updateProfile.mutate({
      firstName: form.firstName || undefined,
      lastName: form.lastName || undefined,
      email: form.email || undefined,
      neighborhood: form.neighborhood || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8">
        <div className="container-main max-w-2xl">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="card p-6 mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("he-IL", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="gradient-light min-h-screen py-8">
      <div className="container-main max-w-2xl">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-[var(--color-gold)] hover:underline">
            ← חזרה לאזור האישי
          </Link>
          <h1 className="text-2xl font-bold text-[var(--color-blue-deep)] mt-2">
            הפרופיל שלי
          </h1>
        </div>

        {/* Success / Error Messages */}
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {successMsg}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Avatar & Name */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-[var(--color-blue-light)] flex items-center justify-center text-3xl">
              {user?.gender === "FEMALE" ? "👩" : "👤"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-blue-deep)]">
                {user?.firstName} {user?.lastName}
              </h2>
              {joinDate && (
                <p className="text-sm text-[var(--color-warm-gray)]">הצטרף: {joinDate}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                שם פרטי
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                שם משפחה
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                טלפון
              </label>
              <input
                type="tel"
                value={user?.phone || ""}
                className="input-field bg-gray-50"
                dir="ltr"
                disabled
              />
              <p className="text-xs text-[var(--color-warm-gray)] mt-1">
                לא ניתן לשנות מספר טלפון
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                אימייל
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="input-field"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                עיר
              </label>
              <input
                type="text"
                value={user?.city?.name || ""}
                className="input-field bg-gray-50"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
                שכונה
              </label>
              <input
                type="text"
                value={form.neighborhood}
                onChange={(e) => updateField("neighborhood", e.target.value)}
                className="input-field"
                placeholder="הזן שכונה"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={updateProfile.isPending}
            className="btn-primary mt-6 disabled:opacity-60"
          >
            {updateProfile.isPending ? "שומר..." : "שמור שינויים"}
          </button>
        </div>

        {/* Preferences */}
        <div className="card p-6 mb-6">
          <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">העדפות</h3>
          <div className="space-y-4">
            {[
              { label: "התראות SMS", desc: "קבל תזכורות וחיזוקים ב-SMS", defaultChecked: true },
              { label: "חיזוק יומי", desc: "קבל ציטוט חיזוק כל בוקר", defaultChecked: true },
              { label: "תזכורת שבת", desc: "תזכורת לפני כניסת שבת", defaultChecked: true },
              { label: "עדכוני שיעורים", desc: "הודעה על שיעורים חדשים ליד הבית", defaultChecked: false },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--color-blue-deep)]">{pref.label}</p>
                  <p className="text-xs text-[var(--color-warm-gray)]">{pref.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={pref.defaultChecked} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-gold)]" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">חשבון</h3>
          <div className="space-y-3">
            <button className="w-full text-right p-3 rounded-lg hover:bg-[var(--color-cream)] transition-colors text-sm flex items-center gap-2">
              🔑 שנה סיסמה
            </button>
            <button className="w-full text-right p-3 rounded-lg hover:bg-[var(--color-cream)] transition-colors text-sm flex items-center gap-2">
              📱 אימות דו-שלבי
            </button>
            <button className="w-full text-right p-3 rounded-lg hover:bg-[var(--color-cream)] transition-colors text-sm flex items-center gap-2">
              📥 הורד את המידע שלי
            </button>
            <hr className="my-2" />
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full text-right p-3 rounded-lg hover:bg-red-50 transition-colors text-sm text-red-600 flex items-center gap-2"
            >
              🚪 התנתק
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
