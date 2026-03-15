"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { DAYS_HE } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import {
  Search,
  BookOpen,
  MapPin,
  Calendar,
  Clock,
  Users,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Loader2,
  BookMarked,
  Sparkles,
} from "lucide-react";

const AUDIENCE_LABELS: Record<string, string> = {
  MEN: "גברים",
  WOMEN: "נשים",
  MIXED: "מעורב",
  FAMILIES: "משפחות",
  YOUTH: "נוער",
};

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: "מתחילים",
  ADVANCED: "מתקדמים",
  ALL: "לכולם",
};

export default function LessonsContent() {
  const [search, setSearch] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<number | undefined>();
  const [audience, setAudience] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = trpc.lesson.search.useQuery({
    search: search || undefined,
    dayOfWeek,
    audience: audience ? (audience as "MEN" | "WOMEN" | "MIXED" | "FAMILIES" | "YOUTH") : undefined,
    level: level ? (level as "BEGINNER" | "ADVANCED" | "ALL") : undefined,
    page,
    pageSize: 20,
  });

  const registerMutation = trpc.lesson.register.useMutation({
    onSuccess: () => {
      alert("נרשמת בהצלחה לשיעור!");
    },
  });

  const lessons = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const handleSearch = () => {
    setPage(1);
  };

  return (
    <>
      <PageHero
        title="שיעורי תורה"
        subtitle="מצא שיעורים קרובים אליך, הירשם והתחזק"
        icon={<BookOpen className="w-8 h-8" />}
        gradient="light"
      />

      <div className="container-main py-12">
        {/* Search & Filters */}
        <AnimatedSection variant="fadeUp" className="mb-8">
          <div className="card p-6 backdrop-blur-sm bg-white/80">
            <div className="flex gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-warm-gray)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="חפש שיעור תורה..."
                  className="input-field flex-1 pr-10"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="btn-primary px-6 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                חפש
              </motion.button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <select
                className="input-field text-sm"
                value={dayOfWeek ?? ""}
                onChange={(e) => {
                  setDayOfWeek(e.target.value ? Number(e.target.value) : undefined);
                  setPage(1);
                }}
              >
                <option value="">כל הימים</option>
                {DAYS_HE.slice(0, 6).map((day, i) => (
                  <option key={day} value={i}>{day}</option>
                ))}
              </select>

              <select
                className="input-field text-sm"
                value={audience}
                onChange={(e) => { setAudience(e.target.value); setPage(1); }}
              >
                <option value="">קהל יעד</option>
                <option value="MEN">גברים</option>
                <option value="WOMEN">נשים</option>
                <option value="MIXED">מעורב</option>
                <option value="YOUTH">נוער</option>
              </select>

              <select
                className="input-field text-sm"
                value={level}
                onChange={(e) => { setLevel(e.target.value); setPage(1); }}
              >
                <option value="">רמה</option>
                <option value="BEGINNER">מתחילים</option>
                <option value="ADVANCED">מתקדמים</option>
                <option value="ALL">לכולם</option>
              </select>
            </div>
          </div>
        </AnimatedSection>

        {/* Results */}
        <div>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[var(--color-warm-gray)]">
                נמצאו <span className="font-bold text-[var(--color-blue-deep)]">{total}</span> שיעורים
              </p>
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="card p-5 h-32 skeleton-shimmer" />
                ))}
              </motion.div>
            ) : lessons.length > 0 ? (
              <StaggerContainer key="lessons" className="space-y-4">
                {lessons.map((lesson) => (
                  <StaggerItem key={lesson.id}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="card p-5 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="hidden md:flex w-14 h-14 rounded-xl bg-[var(--color-blue-deep)]/5 items-center justify-center flex-shrink-0">
                          <BookMarked className="w-6 h-6 text-[var(--color-blue-deep)]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[var(--color-blue-deep)]">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-[var(--color-gold)] font-medium mb-2 flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5" />
                            {lesson.rabbiName}
                          </p>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-warm-gray)]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {lesson.city?.name || ""}{lesson.address ? `, ${lesson.address}` : ""}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              יום {typeof lesson.dayOfWeek === "number" ? DAYS_HE[lesson.dayOfWeek] : ""}
                            </span>
                            {lesson.time && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {lesson.time}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2 mt-3">
                            {lesson.audience && (
                              <span className="badge badge-gold text-xs flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {AUDIENCE_LABELS[lesson.audience] || lesson.audience}
                              </span>
                            )}
                            {lesson.level && (
                              <span className="badge text-xs bg-gray-100 text-gray-600">
                                {LEVEL_LABELS[lesson.level] || lesson.level}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => registerMutation.mutate({ lessonId: lesson.id })}
                            disabled={registerMutation.isPending}
                            className="btn-primary text-sm py-2 px-4 disabled:opacity-60 flex items-center gap-2"
                          >
                            {registerMutation.isPending ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                נרשם...
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-3.5 h-3.5" />
                                הרשמה
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 text-[var(--color-warm-gray)]"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg mb-2">לא נמצאו שיעורים</p>
                <p className="text-sm">נסה לשנות את מילות החיפוש או הפילטרים</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-4 h-4" />
                הקודם
              </motion.button>
              <span className="text-sm text-[var(--color-warm-gray)] px-3">
                עמוד {page} מתוך {totalPages}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors flex items-center gap-1"
              >
                הבא
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Add Lesson CTA */}
        <AnimatedSection variant="scaleUp" className="mt-12">
          <div className="card p-8 bg-gradient-to-l from-[var(--color-cream)] to-white text-center relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--color-gold)]/10 rounded-full blur-2xl" />
            <div className="w-14 h-14 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-[var(--color-gold)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-2">
              אתה מוסר שיעור תורה?
            </h3>
            <p className="text-sm text-[var(--color-warm-gray)] mb-4">
              הוסף את השיעור שלך למאגר הארצי והגע לקהל חדש
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/join?type=rabbi" className="btn-primary text-sm inline-flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                הוסף שיעור חדש
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
