"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ArrowRight,
  BookOpen,
  Search,
  MapPin,
  Calendar,
  Clock,
  GraduationCap,
  Check,
  Loader2,
  XCircle,
} from "lucide-react";

export default function MyLessonsContent() {
  const { data: registrations, isLoading } = trpc.lesson.myLessons.useQuery();
  const { data: stats } = trpc.user.getStats.useQuery();
  const utils = trpc.useUtils();

  const unregister = trpc.lesson.unregister.useMutation({
    onSuccess: () => {
      utils.lesson.myLessons.invalidate();
      utils.user.getStats.invalidate();
    },
  });

  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const userRegistrations = registrations || [];
  const lessonsCount = stats?.lessonsAttended || userRegistrations.length;

  const animActive = useAnimatedCounter(userRegistrations.length, statsVisible);
  const animAttended = useAnimatedCounter(lessonsCount, statsVisible);

  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8 relative overflow-hidden">
        <GradientOrbs variant="light" />
        <div className="container-main max-w-3xl relative">
          <div className="h-8 w-48 rounded skeleton-shimmer mb-6" />
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-4 text-center space-y-2">
                <div className="h-8 w-10 mx-auto rounded skeleton-shimmer" />
                <div className="h-3 w-16 mx-auto rounded skeleton-shimmer" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="card p-5 h-32 skeleton-shimmer" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-light min-h-screen py-8 relative overflow-hidden">
      <GradientOrbs variant="light" />

      <div className="container-main max-w-3xl relative">
        <AnimatedSection variant="fadeUp">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/dashboard" className="text-sm text-[var(--color-gold)] hover:underline inline-flex items-center gap-1 group">
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                חזרה לאזור האישי
              </Link>
              <h1 className="text-2xl font-bold text-[var(--color-blue-deep)] mt-2">
                השיעורים שלי
              </h1>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/lessons" className="btn-primary text-sm inline-flex items-center gap-1">
                <Search className="w-4 h-4" />
                מצא שיעורים חדשים
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Summary */}
        <div ref={statsRef} className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "שיעורים פעילים", value: animActive, color: "text-[var(--color-gold)]", icon: <BookOpen className="w-4 h-4" /> },
            { label: "שיעורים שהשתתפתי", value: animAttended, color: "text-[var(--color-blue-deep)]", icon: <GraduationCap className="w-4 h-4" /> },
            { label: "נרשם", value: userRegistrations.length > 0 ? "✓" : "—", isText: true, color: "text-green-600", icon: <Check className="w-4 h-4" /> },
          ].map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -2 }}
              className="card p-4 text-center"
            >
              <div className={`text-2xl font-black ${s.color}`}>
                {"isText" in s ? s.value : s.value}
              </div>
              <div className="text-xs text-[var(--color-warm-gray)] flex items-center justify-center gap-1">
                {s.icon}
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Registrations */}
        {userRegistrations.length > 0 ? (
          <section className="mb-8">
            <AnimatedSection variant="fadeUp">
              <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--color-gold)]" />
                שיעורים שנרשמתי
              </h2>
            </AnimatedSection>
            <StaggerContainer className="space-y-3">
              {userRegistrations.map((reg) => {
                const lesson = reg.lesson;
                if (!lesson) return null;
                const dayLabel = typeof lesson.dayOfWeek === "number" ? days[lesson.dayOfWeek] : "";

                return (
                  <StaggerItem key={reg.id}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="card p-5 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[var(--color-blue-deep)]/5 flex items-center justify-center flex-shrink-0 mt-1">
                            <BookOpen className="w-5 h-5 text-[var(--color-blue-deep)]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[var(--color-blue-deep)]">{lesson.title}</h3>
                            <p className="text-sm text-[var(--color-gold)] flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5" />
                              {lesson.rabbiName}
                            </p>
                          </div>
                        </div>
                        <span className="badge badge-success text-xs flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          נרשם
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-4">
                        {lesson.address && (
                          <div className="flex items-center gap-1 text-[var(--color-blue-deep)]">
                            <MapPin className="w-3.5 h-3.5 text-[var(--color-warm-gray)]" />
                            {lesson.address}
                          </div>
                        )}
                        {dayLabel && (
                          <div className="flex items-center gap-1 text-[var(--color-blue-deep)]">
                            <Calendar className="w-3.5 h-3.5 text-[var(--color-warm-gray)]" />
                            יום {dayLabel}
                          </div>
                        )}
                        {lesson.time && (
                          <div className="flex items-center gap-1 text-[var(--color-blue-deep)]">
                            <Clock className="w-3.5 h-3.5 text-[var(--color-warm-gray)]" />
                            {lesson.time}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-xs text-[var(--color-warm-gray)]">
                          {lesson.description ? lesson.description.slice(0, 60) + "..." : ""}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => unregister.mutate({ registrationId: reg.id })}
                          disabled={unregister.isPending}
                          className="text-xs px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-60 flex items-center gap-1"
                        >
                          {unregister.isPending ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              מבטל...
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              בטל רישום
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </section>
        ) : (
          <AnimatedSection variant="scaleUp" className="mb-8">
            <div className="card p-12 text-center backdrop-blur-lg bg-white/80 border border-white/40">
              <div className="w-16 h-16 rounded-full bg-[var(--color-blue-deep)]/5 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[var(--color-blue-deep)]" />
              </div>
              <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
                אין שיעורים רשומים
              </h2>
              <p className="text-[var(--color-warm-gray)] mb-6">
                מצא שיעורי תורה קרובים אליך והירשם
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/lessons" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  מצא שיעורים
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
