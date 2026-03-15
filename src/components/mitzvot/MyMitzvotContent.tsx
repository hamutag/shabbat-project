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
  Flame,
  Plus,
  Check,
  BookOpen,
  Calendar,
  TrendingUp,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function MyMitzvotContent() {
  const { data: mitzvot, isLoading } = trpc.mitzva.myMitzvot.useQuery();
  const utils = trpc.useUtils();

  const updateProgress = trpc.mitzva.updateProgress.useMutation({
    onSuccess: () => {
      utils.mitzva.myMitzvot.invalidate();
      utils.user.getStats.invalidate();
    },
  });

  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const userMitzvot = mitzvot || [];
  const activeCount = userMitzvot.length;
  const keepingCount = userMitzvot.filter((m) => (m.progressLevel || 0) >= 80).length;
  const inProgressCount = userMitzvot.filter((m) => (m.progressLevel || 0) < 80).length;

  const animActive = useAnimatedCounter(activeCount, statsVisible);
  const animKeeping = useAnimatedCounter(keepingCount, statsVisible);
  const animProgress = useAnimatedCounter(inProgressCount, statsVisible);

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8 relative overflow-hidden">
        <GradientOrbs variant="light" />
        <div className="container-main max-w-3xl relative">
          <div className="h-8 w-48 rounded skeleton-shimmer mb-6" />
          <div className="grid grid-cols-4 gap-3 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-4 text-center space-y-2">
                <div className="h-8 w-10 mx-auto rounded skeleton-shimmer" />
                <div className="h-3 w-16 mx-auto rounded skeleton-shimmer" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-6 h-48 skeleton-shimmer" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleMarkToday = (userMitzvaId: string, currentLevel: number) => {
    const newLevel = Math.min(currentLevel + 2, 100);
    updateProgress.mutate({ userMitzvaId, progressLevel: newLevel });
  };

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
                המצוות שלי
              </h1>
              <p className="text-[var(--color-warm-gray)]">
                {activeCount} מצוות פעילות
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/join" className="btn-primary text-sm inline-flex items-center gap-1">
                <Plus className="w-4 h-4" />
                הוסף מצווה
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Summary */}
        <div ref={statsRef} className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "מצוות פעילות", value: animActive, color: "text-[var(--color-blue-deep)]", icon: <Flame className="w-4 h-4" /> },
            { label: "שומר קבוע", value: animKeeping, color: "text-green-600", icon: <Check className="w-4 h-4" /> },
            { label: "בתהליך", value: animProgress, color: "text-amber-600", icon: <TrendingUp className="w-4 h-4" /> },
            { label: "סה\"כ", value: animActive, color: "text-[var(--color-gold)]", icon: <Sparkles className="w-4 h-4" /> },
          ].map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -2 }}
              className="card p-4 text-center"
            >
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-[var(--color-warm-gray)] flex items-center justify-center gap-1">
                {s.icon}
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {userMitzvot.length > 0 ? (
          <StaggerContainer className="space-y-4">
            {userMitzvot.map((um) => {
              const mitzva = um.mitzva;
              const progress = um.progressLevel || 0;
              const statusLabel = progress >= 80 ? "שומר" : progress >= 40 ? "בתהליך" : "התחלה";
              const statusClass = progress >= 80 ? "badge-success" : progress >= 40 ? "badge-blue" : "badge-gold";
              const startDate = new Date(um.startedAt).toLocaleDateString("he-IL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <StaggerItem key={um.id}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="card p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center flex-shrink-0">
                        <Flame className="w-6 h-6 text-[var(--color-gold)]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-[var(--color-blue-deep)]">
                              {mitzva?.name || "מצווה"}
                            </h3>
                            <span className="badge text-xs bg-gray-100 text-gray-500">
                              {mitzva?.category || "כללי"}
                            </span>
                          </div>
                          <span className={`badge text-xs ${statusClass}`}>
                            {statusLabel}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[var(--color-warm-gray)]">התקדמות</span>
                            <span className="font-bold text-[var(--color-gold)]">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(progress, 100)}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="gradient-gold h-3 rounded-full"
                            />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="text-center p-2 bg-[var(--color-cream)] rounded-lg">
                            <div className="text-sm font-bold text-[var(--color-gold)] flex items-center justify-center gap-1">
                              {progress >= 80 ? <Check className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                              {statusLabel}
                            </div>
                            <div className="text-xs text-[var(--color-warm-gray)]">סטטוס</div>
                          </div>
                          <div className="text-center p-2 bg-[var(--color-cream)] rounded-lg">
                            <div className="text-xs font-medium text-[var(--color-blue-deep)] flex items-center justify-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {startDate}
                            </div>
                            <div className="text-xs text-[var(--color-warm-gray)]">תחילת מסלול</div>
                          </div>
                        </div>

                        {/* Description */}
                        {mitzva?.description && (
                          <div className="bg-blue-50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-blue-800">{mitzva.description}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMarkToday(um.id, progress)}
                        disabled={updateProgress.isPending}
                        className="btn-primary text-xs py-2 flex-1 disabled:opacity-60 flex items-center justify-center gap-1"
                      >
                        {updateProgress.isPending ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            מעדכן...
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            סימון היום
                          </>
                        )}
                      </motion.button>
                      <Link href="/content" className="btn-secondary text-xs py-2 flex-1 text-center flex items-center justify-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        תוכן קשור
                      </Link>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          <AnimatedSection variant="scaleUp">
            <div className="card p-12 text-center backdrop-blur-lg bg-white/80 border border-white/40">
              <div className="w-16 h-16 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-[var(--color-gold)]" />
              </div>
              <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
                עדיין לא בחרת מצוות
              </h2>
              <p className="text-[var(--color-warm-gray)] mb-6">
                בחר מצוות שתרצה להתחזק בהן והתחל את המסע שלך
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/join" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
                  בחר מצוות
                  <Sparkles className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        )}

        {/* Add More */}
        <AnimatedSection variant="fadeUp" className="mt-6">
          <Link
            href="/join"
            className="card p-6 text-center border-dashed border-2 border-gray-300 hover:border-[var(--color-gold)] transition-all block group hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[var(--color-gold)]/10 flex items-center justify-center mx-auto mb-2 transition-colors">
              <Plus className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-gold)] transition-colors" />
            </div>
            <p className="font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
              הוסף מצווה חדשה
            </p>
            <p className="text-sm text-[var(--color-warm-gray)]">
              בחר מתוך עשרות מצוות לכל רמה
            </p>
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
