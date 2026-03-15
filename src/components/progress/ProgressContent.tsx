"use client";

import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { ArrowRight, Check, Lock, Trophy } from "lucide-react";

const ACHIEVEMENTS_DEF = [
  { name: "שבת ראשונה", desc: "שמרת שבת בפעם הראשונה", icon: "candles", threshold: { shabbat: 1 } },
  { name: "שומר קבוע", desc: "שמרת 4 שבתות ברצף", icon: "crown-flame", threshold: { streak: 4 } },
  { name: "10 שבתות", desc: "שמרת 10 שבתות", icon: "star-david", threshold: { shabbat: 10 } },
  { name: "שיעור ראשון", desc: "השתתפת בשיעור הראשון", icon: "open-torah", threshold: { lessons: 1 } },
  { name: "5 שיעורים", desc: "השתתפת ב-5 שיעורים", icon: "torah-scroll", threshold: { lessons: 5 } },
  { name: "מקרב אחד", desc: "הבאת חבר ראשון לפרויקט", icon: "handshake", threshold: { referrals: 1 } },
  { name: "חודש מלא", desc: "חודש של מצוות", icon: "crown", threshold: { streak: 30 } },
  { name: "מלווה", desc: "הפכת לפעיל מלווה", icon: "star-hands", threshold: { mentor: true } },
];

export default function ProgressContent() {
  const { data: stats, isLoading: statsLoading } = trpc.user.getStats.useQuery();
  const { data: shabbatStreak, isLoading: streakLoading } = trpc.shabbat.streak.useQuery();
  const { data: shabbatHistory, isLoading: historyLoading } = trpc.shabbat.history.useQuery({ limit: 12 });
  const { data: tracks } = trpc.track.myTracks.useQuery();
  const { data: dailyQuote } = trpc.content.dailyQuote.useQuery();

  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 });

  const totalShabbat = shabbatStreak?.totalKept || stats?.shabbatCount || 0;
  const currentStreak = shabbatStreak?.currentStreak || 0;
  const maxStreak = shabbatStreak?.maxStreak || 0;
  const lessonsCount = stats?.lessonsAttended || 0;
  const mitzvotCount = stats?.totalMitzvot || 0;

  const animShabbat = useAnimatedCounter(totalShabbat, statsVisible, 1500);
  const animStreak = useAnimatedCounter(currentStreak, statsVisible, 1500);
  const animLessons = useAnimatedCounter(lessonsCount, statsVisible, 1500);
  const animMitzvot = useAnimatedCounter(mitzvotCount, statsVisible, 1500);

  const isLoading = statsLoading || streakLoading;

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8">
        <div className="container-main">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="card p-4 text-center space-y-2">
                <div className="h-8 w-8 mx-auto bg-gray-200 rounded animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                <div className="h-6 w-10 mx-auto bg-gray-200 rounded animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const achievements = ACHIEVEMENTS_DEF.map((a) => {
    let earned = false;
    if ("shabbat" in a.threshold && typeof a.threshold.shabbat === "number") {
      earned = totalShabbat >= a.threshold.shabbat;
    } else if ("streak" in a.threshold && typeof a.threshold.streak === "number") {
      earned = maxStreak >= a.threshold.streak;
    } else if ("lessons" in a.threshold && typeof a.threshold.lessons === "number") {
      earned = lessonsCount >= a.threshold.lessons;
    }
    return { ...a, earned };
  });

  const earnedCount = achievements.filter((a) => a.earned).length;

  const historyItems = (shabbatHistory || []).map((record) => {
    const date = new Date(record.shabbatDate);
    const day = date.getDate();
    const months = ["ינו", "פבר", "מרס", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"];
    return { date: `${day} ${months[date.getMonth()]}`, kept: record.kept };
  });

  return (
    <div className="gradient-light min-h-screen py-8 relative overflow-hidden">
      <GradientOrbs variant="light" />

      <div className="container-main relative">
        <AnimatedSection variant="fadeUp" className="mb-6">
          <Link href="/dashboard" className="text-sm text-[var(--color-gold)] hover:underline flex items-center gap-1">
            <ArrowRight className="w-4 h-4" />
            חזרה לאזור האישי
          </Link>
          <h1 className="text-3xl font-black text-[var(--color-blue-deep)] mt-2 tracking-tight">
            ההתקדמות שלי
          </h1>
          <p className="text-[var(--color-warm-gray)]">כל צעד חשוב. ראה כמה התקדמת!</p>
        </AnimatedSection>

        {/* Overview Stats */}
        <AnimatedSection variant="fadeUp" delay={0.1}>
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {[
              { label: "שבתות", value: animShabbat, icon: "candles", sub: `שיעור שמירה ${shabbatStreak?.keepRate || 0}%` },
              { label: "רצף נוכחי", value: animStreak, icon: "crown-flame", sub: "שבתות ברצף" },
              { label: "שיעורים", value: animLessons, icon: "open-torah", sub: "השתתפת" },
              { label: "הישגים", value: earnedCount, icon: "star-david", sub: `מתוך ${achievements.length}` },
              { label: "מצוות", value: animMitzvot, icon: "star-hands", sub: "פעילות" },
            ].map((stat) => (
              <div key={stat.label} className="card p-4 text-center group hover:shadow-md transition-all">
                <div className="flex justify-center mb-1">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <Image src={`/icons/${stat.icon}.png`} alt={stat.label} width={32} height={32} className="w-8 h-8 object-contain" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[var(--color-gold)] tabular-nums">{stat.value}</div>
                <div className="text-xs text-[var(--color-blue-deep)] font-medium">{stat.label}</div>
                <div className="text-xs text-[var(--color-warm-gray)]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Shabbat Tracking */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div className="card p-6">
                <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">
                  מעקב שבתות
                </h2>
                {historyLoading ? (
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-12 bg-gray-100 rounded-lg animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
                    ))}
                  </div>
                ) : historyItems.length > 0 ? (
                  <>
                    <StaggerContainer className="grid grid-cols-6 md:grid-cols-12 gap-2" stagger={0.04}>
                      {historyItems.map((s, i) => (
                        <StaggerItem key={i}>
                          <div className="text-center group">
                            <div
                              className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-lg transition-transform duration-200 group-hover:scale-110 ${
                                s.kept
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {s.kept ? <Check className="w-5 h-5" /> : "—"}
                            </div>
                            <span className="text-xs text-[var(--color-warm-gray)] mt-1 block">
                              {s.date}
                            </span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                    <div className="flex items-center gap-4 mt-4 justify-center text-xs text-[var(--color-warm-gray)]">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-green-100 rounded" /> שמרתי
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-gray-100 rounded" /> לא שמרתי
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-[var(--color-warm-gray)]">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-cream)] flex items-center justify-center mx-auto mb-3">
                      <Image src="/icons/candles.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <p className="text-sm">עדיין אין נתוני שבתות</p>
                    <p className="text-xs mt-1">דווח על שמירת שבת מהדשבורד שלך</p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Current Track Progress */}
            {tracks && tracks.length > 0 && (
              <AnimatedSection variant="fadeUp" delay={0.3}>
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">
                    מסלול: {tracks[0].track?.name || "מסלול פעיל"}
                  </h2>
                  <StaggerContainer className="space-y-3" stagger={0.06}>
                    {tracks[0].track?.steps?.map((step) => {
                      const currentStep = tracks[0].currentStep || 0;
                      const status = step.stepNumber < currentStep ? "done"
                        : step.stepNumber === currentStep ? "current"
                        : "locked";
                      return (
                        <StaggerItem key={step.id}>
                          <div className="flex items-center gap-4 group">
                            <motion.div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-200 group-hover:scale-110 ${
                                status === "done"
                                  ? "bg-green-100 text-green-600"
                                  : status === "current"
                                  ? "gradient-gold text-white shadow-md"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {status === "done" ? <Check className="w-5 h-5" /> : step.stepNumber}
                            </motion.div>
                            <div className="flex-1">
                              <p
                                className={`font-medium text-sm ${
                                  status === "locked"
                                    ? "text-gray-400"
                                    : "text-[var(--color-blue-deep)]"
                                }`}
                              >
                                {step.title}
                              </p>
                            </div>
                            {status === "current" && (
                              <span className="badge badge-gold text-xs animate-pulse">בתהליך</span>
                            )}
                            {status === "locked" && (
                              <Lock className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                </div>
              </AnimatedSection>
            )}

            {(!tracks || tracks.length === 0) && (
              <AnimatedSection variant="fadeUp" delay={0.3}>
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">
                    מסלולי לימוד
                  </h2>
                  <div className="text-center py-8 text-[var(--color-warm-gray)]">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-cream)] flex items-center justify-center mx-auto mb-3">
                      <Image src="/icons/torah-scroll.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <p className="text-sm mb-3">טרם הצטרפת למסלול לימוד</p>
                    <Link href="/join" className="btn-primary text-sm px-4 py-2">
                      בחר מסלול
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div className="card p-6">
                <h3 className="font-bold text-[var(--color-blue-deep)] mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[var(--color-gold)]" />
                  הישגים
                </h3>
                <StaggerContainer className="space-y-2" stagger={0.05}>
                  {achievements.map((a) => (
                    <StaggerItem key={a.name}>
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          a.earned
                            ? "bg-[var(--color-cream)]/70 hover:bg-[var(--color-cream)]"
                            : "bg-gray-50 opacity-50"
                        }`}
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          <Image src={`/icons/${a.icon}.png`} alt={a.name} width={28} height={28} className="w-7 h-7 object-contain" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-[var(--color-blue-deep)]">
                            {a.name}
                          </p>
                          <p className="text-xs text-[var(--color-warm-gray)]">{a.desc}</p>
                        </div>
                        {a.earned ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimatedSection>

            {/* Chizuk */}
            <AnimatedSection variant="scaleUp" delay={0.3}>
              <div className="quote-box text-base relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[var(--color-gold)]/10 rounded-full blur-2xl" />
                <p className="relative z-10">
                  {dailyQuote?.text || "כל מצווה שאתה מקיים מקרבת אותך ואת כל עם ישראל לגאולה"}
                </p>
                <p className="text-xs mt-3 text-[var(--color-gold)] opacity-70 relative z-10">
                  — {dailyQuote?.source || "רמב\"ם"}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
