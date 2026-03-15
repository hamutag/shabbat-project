"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import {
  Flame,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  Users,
  Share2,
  Phone,
  MessageCircle,
  Check,
  ArrowLeft,
} from "lucide-react";

export default function DashboardContent() {
  const { data: user, isLoading: userLoading } = trpc.user.me.useQuery();
  const { data: stats, isLoading: statsLoading } = trpc.user.getStats.useQuery();
  const { data: mitzvot, isLoading: mitzvotLoading } = trpc.mitzva.myMitzvot.useQuery();
  const { data: lessons, isLoading: lessonsLoading } = trpc.lesson.myLessons.useQuery();
  const { data: shabbatStreak } = trpc.shabbat.streak.useQuery();
  const { data: mentor } = trpc.mentoring.myMentor.useQuery();
  const { data: dailyQuote } = trpc.content.dailyQuote.useQuery();

  const [shabbatLogged, setShabbatLogged] = useState(false);
  const [mentorRequested, setMentorRequested] = useState(false);
  const utils = trpc.useUtils();

  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 });
  const shabbatCount = useAnimatedCounter(
    shabbatStreak?.totalKept || stats?.shabbatCount || 0,
    statsVisible,
    1500
  );
  const streakCount = useAnimatedCounter(shabbatStreak?.currentStreak || 0, statsVisible, 1500);
  const lessonsAttended = useAnimatedCounter(stats?.lessonsAttended || 0, statsVisible, 1500);
  const mitzvotActive = useAnimatedCounter(stats?.totalMitzvot || 0, statsVisible, 1500);

  const requestMentor = trpc.mentoring.requestMentor.useMutation({
    onSuccess: (data) => {
      if (data.status === "created") {
        setMentorRequested(true);
      }
    },
  });

  const logShabbat = trpc.shabbat.log.useMutation({
    onSuccess: () => {
      setShabbatLogged(true);
      utils.shabbat.streak.invalidate();
      utils.shabbat.history.invalidate();
      utils.user.getStats.invalidate();
    },
  });

  const handleLogShabbat = (kept: boolean) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const fridayOffset = dayOfWeek === 6 ? 0 : dayOfWeek === 0 ? 1 : dayOfWeek + 1;
    const lastFriday = new Date(now);
    lastFriday.setDate(now.getDate() - fridayOffset);
    logShabbat.mutate({
      date: lastFriday.toISOString().split("T")[0],
      kept,
    });
  };

  const isLoading = userLoading || statsLoading;

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8">
        <div className="container-main">
          <div className="card p-6 mb-6 backdrop-blur-lg bg-white/80">
            <div className="h-7 w-48 bg-gray-200 rounded-lg animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded-lg animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-4 space-y-2 backdrop-blur-lg bg-white/80">
                <div className="h-4 w-16 bg-gray-200 rounded animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                <div className="h-8 w-12 bg-gray-200 rounded animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const firstName = user?.firstName || "חבר";
  const userMitzvot = mitzvot || [];
  const userLessons = lessons || [];

  return (
    <div className="gradient-light min-h-screen py-8 relative overflow-hidden">
      <GradientOrbs variant="light" />

      <div className="container-main relative">
        {/* Welcome */}
        <AnimatedSection variant="fadeUp" className="mb-8">
          <h1 className="text-3xl font-black text-[var(--color-blue-deep)] tracking-tight">
            שלום, {firstName}!
          </h1>
          <p className="text-[var(--color-warm-gray)] text-lg">
            כל צעד שלך חשוב. המשך להתחזק!
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Stats */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div className="card p-6" ref={statsRef}>
                <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">
                  ההתקדמות שלי
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: "candles", label: "שבתות ששמרתי", value: shabbatCount },
                    { icon: "crown-flame", label: "רצף נוכחי", value: streakCount },
                    { icon: "open-torah", label: "שיעורים", value: lessonsAttended },
                    { icon: "star-hands", label: "מצוות פעילות", value: mitzvotActive },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-4 bg-[var(--color-cream)]/50 rounded-xl group hover:bg-[var(--color-cream)] transition-colors">
                      <div className="flex justify-center mb-1">
                        <div className="transition-transform duration-300 group-hover:scale-110">
                          <Image src={`/icons/${s.icon}.png`} alt={s.label} width={32} height={32} className="w-8 h-8 object-contain" />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-[var(--color-gold)] tabular-nums">
                        {s.value}
                      </div>
                      <div className="text-xs text-[var(--color-warm-gray)]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* My Mitzvot */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[var(--color-blue-deep)]">
                    המצוות שלי
                  </h2>
                  <Link href="/my-mitzvot" className="text-sm text-[var(--color-gold)] hover:underline flex items-center gap-1 group">
                    ראה הכל
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </Link>
                </div>

                {mitzvotLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded-xl animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
                    ))}
                  </div>
                ) : userMitzvot.length > 0 ? (
                  <StaggerContainer className="space-y-3" stagger={0.06}>
                    {userMitzvot.slice(0, 3).map((um) => {
                      const progress = um.progressLevel || 0;
                      const statusLabel = progress >= 80 ? "שומר" : progress >= 40 ? "בתהליך" : "התחלה";
                      const statusClass = progress >= 80 ? "badge-success" : progress >= 40 ? "badge-blue" : "badge-gold";

                      return (
                        <StaggerItem key={um.id}>
                          <div className="flex items-center gap-4 p-4 bg-[var(--color-cream)]/50 rounded-xl hover:bg-[var(--color-cream)] transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                              <Flame className="w-5 h-5 text-[var(--color-gold)]" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-[var(--color-blue-deep)] text-sm">
                                {um.mitzva?.name || "מצווה"}
                              </h3>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                                <motion.div
                                  className="gradient-gold h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(progress, 100)}%` }}
                                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                />
                              </div>
                              <p className="text-xs text-[var(--color-warm-gray)] mt-1">
                                {progress}%
                              </p>
                            </div>
                            <span className={`badge ${statusClass} text-xs`}>
                              {statusLabel}
                            </span>
                          </div>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                ) : (
                  <div className="text-center py-8 text-[var(--color-warm-gray)]">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-cream)] flex items-center justify-center mx-auto mb-3">
                      <Image src="/icons/candles.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <p className="text-sm mb-3">עדיין לא בחרת מצוות</p>
                    <Link href="/join" className="btn-primary text-sm px-4 py-2">
                      בחר מצוות
                    </Link>
                  </div>
                )}

                <Link href="/join" className="inline-flex items-center gap-1 text-sm text-[var(--color-gold)] font-medium mt-4 hover:underline">
                  + הוסף מצווה חדשה
                </Link>
              </div>
            </AnimatedSection>

            {/* Upcoming Lessons */}
            <AnimatedSection variant="fadeUp" delay={0.3}>
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[var(--color-blue-deep)]">
                    שיעורים קרובים
                  </h2>
                  <Link href="/lessons" className="text-sm text-[var(--color-gold)] hover:underline flex items-center gap-1 group">
                    מצא שיעורים
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </Link>
                </div>

                {lessonsLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded-xl animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
                    ))}
                  </div>
                ) : userLessons.length > 0 ? (
                  <StaggerContainer className="space-y-3" stagger={0.06}>
                    {userLessons.slice(0, 3).map((reg) => {
                      const lesson = reg.lesson;
                      if (!lesson) return null;
                      const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
                      const dayLabel = typeof lesson.dayOfWeek === "number" ? days[lesson.dayOfWeek] : "";

                      return (
                        <StaggerItem key={reg.id}>
                          <div className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:border-[var(--color-gold-light)] hover:shadow-sm transition-all group">
                            <div className="text-center min-w-[60px]">
                              <div className="text-sm font-bold text-[var(--color-gold)]">
                                יום {dayLabel}
                              </div>
                              <div className="text-lg font-black text-[var(--color-blue-deep)]">
                                {lesson.time || ""}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{lesson.title}</h4>
                              <p className="text-xs text-[var(--color-warm-gray)]">
                                {lesson.rabbiName}{lesson.address ? ` | ${lesson.address}` : ""}
                              </p>
                            </div>
                            <span className="text-xs badge badge-gold">נרשם</span>
                          </div>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                ) : (
                  <div className="text-center py-6 text-[var(--color-warm-gray)]">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-cream)] flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-[var(--color-gold)]" />
                    </div>
                    <p className="text-sm mb-3">אין שיעורים קרובים</p>
                    <Link href="/lessons" className="btn-primary text-sm px-4 py-2">
                      מצא שיעורים
                    </Link>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shabbat Log */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
              <div className="card p-6 border-2 border-[var(--color-gold)]/30 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-gold)]/5 rounded-full blur-2xl" />

                <h3 className="font-bold text-[var(--color-blue-deep)] mb-3 flex items-center gap-2 relative">
                  <Image src="/icons/candles.png" alt="" width={24} height={24} className="w-6 h-6 object-contain" />
                  דיווח שבת
                </h3>

                <AnimatePresence mode="wait">
                  {shabbatLogged ? (
                    <motion.div
                      key="logged"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4 relative"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="font-semibold text-[var(--color-blue-deep)]">תודה על הדיווח!</p>
                      <p className="text-sm text-[var(--color-warm-gray)] mt-1">
                        כל שבת שלך היא אור לעולם
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="text-sm text-[var(--color-warm-gray)] mb-4 relative">
                        האם שמרת שבת השבוע?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLogShabbat(true)}
                          disabled={logShabbat.isPending}
                          className="btn-primary text-sm py-2 flex-1 disabled:opacity-60"
                        >
                          {logShabbat.isPending ? "שומר..." : "כן, שמרתי!"}
                        </button>
                        <button
                          onClick={() => handleLogShabbat(false)}
                          disabled={logShabbat.isPending}
                          className="btn-secondary text-sm py-2 flex-1 disabled:opacity-60"
                        >
                          בשבוע הבא
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>

            {/* Daily Chizuk */}
            <AnimatedSection variant="fadeUp" delay={0.25}>
              <div className="quote-box text-base relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[var(--color-gold)]/10 rounded-full blur-2xl" />
                <p className="relative z-10">
                  {dailyQuote?.text || "הקב\"ה לא מבקש אלא לפי כוחו של כל אחד ואחד"}
                </p>
                <p className="text-xs mt-3 text-[var(--color-gold)] opacity-70 relative z-10">
                  — {dailyQuote?.source || "מדרש רבה"}
                </p>
              </div>
            </AnimatedSection>

            {/* My Mentor */}
            <AnimatedSection variant="fadeUp" delay={0.35}>
              <div className="card p-6">
                <h3 className="font-bold text-[var(--color-blue-deep)] mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--color-gold)]" />
                  המלווה שלי
                </h3>
                {mentor ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-white font-bold text-lg">
                        {mentor.mentor?.firstName?.charAt(0) || "מ"}
                      </div>
                      <div>
                        <p className="font-semibold">
                          {mentor.mentor?.firstName} {mentor.mentor?.lastName}
                        </p>
                        <p className="text-xs text-[var(--color-warm-gray)]">
                          פעיל מלווה
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {mentor.mentor?.phone && (
                        <a
                          href={`tel:${mentor.mentor.phone}`}
                          className="btn-primary text-xs py-2 px-3 flex-1 text-center"
                        >
                          <Phone className="w-4 h-4 inline ml-1" />
                          התקשר
                        </a>
                      )}
                      <a
                        href={`https://wa.me/972${mentor.mentor?.phone?.replace(/^0/, "").replace(/-/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs py-2 px-3 flex-1 text-center"
                      >
                        <MessageCircle className="w-4 h-4 inline ml-1" />
                        וואטסאפ
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-[var(--color-warm-gray)]">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-cream)] flex items-center justify-center mx-auto mb-2">
                      <Image src="/icons/handshake.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    {mentorRequested || requestMentor.data?.status === "already_exists" ? (
                      <>
                        <p className="text-sm font-medium text-green-600">הבקשה נשלחה בהצלחה!</p>
                        <p className="text-xs mt-1">נשבץ לך מלווה אישי בהקדם</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm mb-3">רוצה מלווה אישי שילווה אותך במסע?</p>
                        <button
                          onClick={() => requestMentor.mutate({})}
                          disabled={requestMentor.isPending}
                          className="btn-primary text-sm py-2 px-6"
                        >
                          {requestMentor.isPending ? "שולח..." : "בקש מלווה אישי"}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Refer a Friend */}
            <AnimatedSection variant="fadeUp" delay={0.4}>
              <div className="card p-6 bg-[var(--color-cream)]/50">
                <h3 className="font-bold text-[var(--color-blue-deep)] mb-2 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[var(--color-gold)]" />
                  כל אחד מקרב שניים
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)] mb-3">
                  הזמן חבר, שכן או בן משפחה להתחזק איתך
                </p>
                <button className="btn-primary text-sm w-full">
                  הזמן חבר
                </button>
              </div>
            </AnimatedSection>

            {/* Quick Links */}
            <AnimatedSection variant="fadeUp" delay={0.45}>
              <div className="card p-6">
                <h3 className="font-bold text-[var(--color-blue-deep)] mb-3">
                  קישורים מהירים
                </h3>
                <div className="space-y-1">
                  {[
                    { href: "/my-mitzvot", label: "המצוות שלי", icon: Flame },
                    { href: "/lessons", label: "שיעורים קרובים", icon: BookOpen },
                    { href: "/content", label: "מרכז תוכן", icon: FileText },
                    { href: "/progress", label: "התקדמות", icon: BarChart3 },
                    { href: "/profile", label: "הגדרות", icon: Settings },
                  ].map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 p-2.5 hover:bg-[var(--color-cream)] rounded-lg text-sm transition-colors group"
                      >
                        <Icon className="w-4 h-4 text-[var(--color-warm-gray)] group-hover:text-[var(--color-gold)] transition-colors" />
                        <span className="group-hover:text-[var(--color-gold)] transition-colors">
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
