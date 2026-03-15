"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import {
  Sparkles,
  Flame,
  Route,
  PartyPopper,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Star,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "ברוכים הבאים", icon: <Sparkles className="w-5 h-5" /> },
  { id: 2, title: "בחירת מצוות", icon: <Flame className="w-5 h-5" /> },
  { id: 3, title: "בחירת מסלול", icon: <Route className="w-5 h-5" /> },
  { id: 4, title: "סיום", icon: <PartyPopper className="w-5 h-5" /> },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

export default function OnboardingContent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
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

  const goToStep = (newStep: number) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
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
    <div className="gradient-light min-h-screen py-8 relative overflow-hidden">
      <GradientOrbs variant="light" />

      <div className="container-main max-w-2xl relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            {STEPS.map((s) => (
              <div key={s.id} className="flex items-center">
                <motion.div
                  animate={{
                    scale: step === s.id ? 1.1 : 1,
                    backgroundColor: step >= s.id ? "var(--color-gold)" : "#e5e7eb",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= s.id ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step > s.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    s.icon
                  )}
                </motion.div>
                {s.id < STEPS.length && (
                  <div className="w-12 h-1 mx-1 rounded overflow-hidden bg-gray-200">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: step > s.id ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full gradient-gold"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Step label */}
          <p className="text-center text-sm text-[var(--color-warm-gray)]">
            שלב {step} מתוך 4 — {STEPS[step - 1].title}
          </p>
        </div>

        {/* Animated step transitions */}
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card p-8 text-center backdrop-blur-lg bg-white/80 border border-white/40"
            >
              <Image
                src="/logo.png"
                alt="פרויקט השבת"
                width={80}
                height={80}
                className="w-20 h-20 mx-auto mb-4 object-contain"
              />
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
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-8 h-8 rounded-full gradient-gold text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-[var(--color-blue-deep)]">{text}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => goToStep(2)}
                className="btn-primary text-lg px-8 inline-flex items-center gap-2"
              >
                בואו נתחיל!
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Choose Mitzvot */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card p-8 backdrop-blur-lg bg-white/80 border border-white/40"
            >
              <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-2 text-center">
                בחר מצוות שמעניינות אותך
              </h2>
              <p className="text-[var(--color-warm-gray)] text-center mb-6">
                אפשר לבחור כמה שרוצים. תמיד אפשר להוסיף או לשנות אחר כך.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {mitzvot.map((m, i) => (
                  <motion.button
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleMitzva(m.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all relative ${
                      selectedMitzvot.includes(m.id)
                        ? "border-[var(--color-gold)] bg-amber-50/80 shadow-md"
                        : "border-gray-200 hover:border-[var(--color-gold)]/30"
                    }`}
                  >
                    {selectedMitzvot.includes(m.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 left-2 w-5 h-5 rounded-full bg-[var(--color-gold)] flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mx-auto mb-2">
                      <Flame className="w-5 h-5 text-[var(--color-gold)]" />
                    </div>
                    <h4 className="font-semibold text-sm text-[var(--color-blue-deep)]">
                      {m.name}
                    </h4>
                    <p className="text-xs text-[var(--color-warm-gray)] mt-1 line-clamp-2">
                      {m.description}
                    </p>
                    <div className="flex justify-center gap-0.5 mt-2">
                      {[1, 2, 3].map((d) => {
                        const diffMap: Record<string, number> = { EASY: 1, MEDIUM: 2, HARD: 3 };
                        const diffLevel = diffMap[String(m.difficulty)] || 1;
                        return (
                          <Star
                            key={d}
                            className={`w-3 h-3 ${
                              d <= diffLevel ? "text-[var(--color-gold)] fill-[var(--color-gold)]" : "text-gray-300"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => goToStep(1)}
                  className="btn-secondary px-6 flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  חזרה
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => goToStep(3)}
                  className="btn-primary px-6 flex items-center gap-2"
                >
                  {selectedMitzvot.length > 0
                    ? `המשך עם ${selectedMitzvot.length} מצוות`
                    : "דלג"}
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Choose Track */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card p-8 backdrop-blur-lg bg-white/80 border border-white/40"
            >
              <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-2 text-center">
                בחר מסלול התחזקות
              </h2>
              <p className="text-[var(--color-warm-gray)] text-center mb-6">
                מסלול מובנה עם שלבים ומשימות יומיות. בחר אחד להתחלה.
              </p>

              <div className="space-y-3 mb-8">
                {tracks.map((track, i) => (
                  <motion.button
                    key={track.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTrack(track.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-right transition-all ${
                      selectedTrack === track.id
                        ? "border-[var(--color-gold)] bg-amber-50/80 shadow-md"
                        : "border-gray-200 hover:border-[var(--color-gold)]/30"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-blue-deep)]/5 flex items-center justify-center flex-shrink-0">
                      <Route className="w-6 h-6 text-[var(--color-blue-deep)]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[var(--color-blue-deep)]">{track.name}</h4>
                      <p className="text-sm text-[var(--color-warm-gray)]">{track.description}</p>
                    </div>
                    <div className="text-center flex-shrink-0">
                      <span className="badge badge-blue text-xs">{track.durationDays} יום</span>
                      {selectedTrack === track.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-[var(--color-gold)] flex items-center justify-center mx-auto mt-2"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => goToStep(2)}
                  className="btn-secondary px-6 flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  חזרה
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => goToStep(4)}
                  className="btn-primary px-6 flex items-center gap-2"
                >
                  {selectedTrack ? "המשך" : "דלג"}
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card p-8 text-center backdrop-blur-lg bg-white/80 border border-white/40"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
              >
                <PartyPopper className="w-10 h-10 text-green-600" />
              </motion.div>
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
                  {[
                    "נשייך לך מלווה אישי שיצור קשר",
                    "תקבל תוכן מותאם אישית",
                    "תוכל לעקוב אחרי ההתקדמות שלך",
                    "תמצא שיעורים קרובים אליך",
                  ].map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {text}
                    </motion.p>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleComplete}
                disabled={saving}
                className="btn-primary text-lg px-8 disabled:opacity-60 inline-flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    שומר...
                  </>
                ) : (
                  <>
                    כניסה לאזור האישי
                    <ArrowLeft className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
