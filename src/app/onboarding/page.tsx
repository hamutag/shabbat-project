"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";

const STEPS = [
  { id: 1, title: "ברוכים הבאים", icon: "✨" },
  { id: 2, title: "בחירת מצוות", icon: "🕯️" },
  { id: 3, title: "בחירת מסלול", icon: "🛤️" },
  { id: 4, title: "סיום", icon: "🎉" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedMitzvot, setSelectedMitzvot] = useState<string[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Fetch real data from API
  const { data: mitzvotList } = trpc.mitzva.list.useQuery();
  const { data: tracksList } = trpc.track.list.useQuery();

  const addMitzva = trpc.mitzva.addToUser.useMutation();
  const startTrack = trpc.track.start.useMutation();

  const toggleMitzva = (id: string) => {
    setSelectedMitzvot((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      // Save selected mitzvot
      for (const mitzvaId of selectedMitzvot) {
        await addMitzva.mutateAsync({ mitzvaId });
      }
      // Start selected track
      if (selectedTrack) {
        await startTrack.mutateAsync({ trackId: selectedTrack });
      }
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error saving onboarding:", error);
      // Still redirect even if some saves fail
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  };

  type MitzvaItem = { id: string; name: string; slug: string; description: string; category: string; difficulty: string; iconUrl?: string | null; sortOrder: number; isActive: boolean; [key: string]: unknown };
  type TrackItem = { id: string; name: string; slug: string; description: string; durationDays?: number | null; imageUrl?: string | null; isActive: boolean; [key: string]: unknown };
  const mitzvot: MitzvaItem[] = (mitzvotList as MitzvaItem[] | undefined) || [];
  const tracks: TrackItem[] = (tracksList as TrackItem[] | undefined) || [];

  return (
    <div className="gradient-light min-h-screen py-8">
      <div className="container-main max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s.id
                    ? "gradient-gold text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s.icon}
              </div>
              {s.id < STEPS.length && (
                <div
                  className={`w-12 h-1 mx-1 rounded ${
                    step > s.id ? "gradient-gold" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="card p-8 text-center">
            <span className="text-5xl block mb-4">✨</span>
            <h1 className="text-3xl font-black text-[var(--color-blue-deep)] mb-3">
              ברוך הבא לפרויקט השבת!
            </h1>
            <p className="text-lg text-[var(--color-warm-gray)] mb-6 leading-relaxed">
              אנחנו שמחים שהצטרפת. בכמה צעדים קצרים נתאים את החוויה
              בדיוק בשבילך — בלי לחץ, בקצב שלך.
            </p>
            <div className="space-y-3 text-right max-w-md mx-auto mb-8">
              {[
                "תבחר מצוות שמעניינות אותך",
                "תבחר מסלול התחזקות אישי",
                "תתחיל את המסע שלך!",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full gradient-gold text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-[var(--color-blue-deep)]">{text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="btn-primary text-lg px-8"
            >
              בואו נתחיל!
            </button>
          </div>
        )}

        {/* Step 2: Choose Mitzvot */}
        {step === 2 && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-2 text-center">
              בחר מצוות שמעניינות אותך
            </h2>
            <p className="text-[var(--color-warm-gray)] text-center mb-6">
              אפשר לבחור כמה שרוצים. תמיד אפשר להוסיף או לשנות אחר כך.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {mitzvot.map((m) => (
                <button
                  key={m.id}
                  onClick={() => toggleMitzva(m.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedMitzvot.includes(m.id)
                      ? "border-[var(--color-gold)] bg-amber-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl block mb-1">{m.iconUrl || "✨"}</span>
                  <h4 className="font-semibold text-sm text-[var(--color-blue-deep)]">
                    {m.name}
                  </h4>
                  <p className="text-xs text-[var(--color-warm-gray)] mt-1">
                    {m.description}
                  </p>
                  <div className="flex justify-center gap-0.5 mt-2">
                    {[1, 2, 3].map((d) => {
                      const diffMap: Record<string, number> = { EASY: 1, MEDIUM: 2, HARD: 3 };
                      const diffLevel = diffMap[String(m.difficulty)] || 1;
                      return (
                        <span
                          key={d}
                          className={`text-xs ${
                            d <= diffLevel ? "text-[var(--color-gold)]" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      );
                    })}
                  </div>
                  {selectedMitzvot.includes(m.id) && (
                    <span className="text-[var(--color-gold)] text-lg mt-1 block">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary px-6"
              >
                חזרה
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary px-6"
              >
                {selectedMitzvot.length > 0
                  ? `המשך עם ${selectedMitzvot.length} מצוות`
                  : "דלג"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Track */}
        {step === 3 && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-2 text-center">
              בחר מסלול התחזקות
            </h2>
            <p className="text-[var(--color-warm-gray)] text-center mb-6">
              מסלול מובנה עם שלבים ומשימות יומיות. בחר אחד להתחלה.
            </p>

            <div className="space-y-3 mb-8">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-right transition-all ${
                    selectedTrack === track.id
                      ? "border-[var(--color-gold)] bg-amber-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-3xl">{track.imageUrl || "📚"}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-[var(--color-blue-deep)]">{track.name}</h4>
                    <p className="text-sm text-[var(--color-warm-gray)]">{track.description}</p>
                  </div>
                  <div className="text-center">
                    <span className="badge badge-blue text-xs">{track.durationDays} יום</span>
                    {selectedTrack === track.id && (
                      <span className="text-[var(--color-gold)] text-lg block mt-1">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary px-6"
              >
                חזרה
              </button>
              <button
                onClick={() => setStep(4)}
                className="btn-primary px-6"
              >
                {selectedTrack ? "המשך" : "דלג"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 4 && (
          <div className="card p-8 text-center">
            <span className="text-6xl block mb-4">🎉</span>
            <h2 className="text-3xl font-black text-[var(--color-blue-deep)] mb-3">
              מעולה! הכל מוכן
            </h2>
            <p className="text-lg text-[var(--color-warm-gray)] mb-6 leading-relaxed">
              בחרת {selectedMitzvot.length} מצוות
              {selectedTrack && " ומסלול התחזקות"}.
              <br />
              המסע שלך מתחיל עכשיו!
            </p>

            <div className="bg-[var(--color-cream)] rounded-xl p-6 max-w-md mx-auto mb-8">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-3">מה קורה עכשיו?</h3>
              <div className="space-y-2 text-right text-sm">
                <p>✅ נשייך לך מלווה אישי שיצור קשר</p>
                <p>✅ תקבל תוכן מותאם אישית</p>
                <p>✅ תוכל לעקוב אחרי ההתקדמות שלך</p>
                <p>✅ תמצא שיעורים קרובים אליך</p>
              </div>
            </div>

            <button
              onClick={handleComplete}
              disabled={saving}
              className="btn-primary text-lg px-8 disabled:opacity-60"
            >
              {saving ? "שומר..." : "כניסה לאזור האישי"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
