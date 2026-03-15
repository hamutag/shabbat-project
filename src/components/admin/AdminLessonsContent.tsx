"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { DAYS_HE } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  BookOpen,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Users,
  MapPin,
  Calendar,
  Loader2,
  FileSpreadsheet,
  BookMarked,
} from "lucide-react";

const AUDIENCE_LABELS: Record<string, string> = {
  MEN: "גברים",
  WOMEN: "נשים",
  MIXED: "מעורב",
  FAMILIES: "משפחות",
  YOUTH: "נוער",
};

export default function AdminLessonsContent() {
  const [page, setPage] = useState(1);
  const [approvedFilter, setApprovedFilter] = useState<boolean | undefined>(undefined);

  const { data, isLoading, refetch } = trpc.lesson.adminList.useQuery({
    page,
    pageSize: 20,
    approved: approvedFilter,
  });

  const { data: pendingData } = trpc.lesson.adminList.useQuery({
    page: 1,
    pageSize: 1,
    approved: false,
  });

  const approveMutation = trpc.lesson.approve.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const lessons = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;
  const pendingCount = pendingData?.total || 0;

  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const animTotal = useAnimatedCounter(total, statsVisible);
  const animPending = useAnimatedCounter(pendingCount, statsVisible);

  return (
    <div>
      {/* Header Banner */}
      <AnimatedSection variant="fadeUp">
        <div className="bg-gradient-to-l from-[var(--color-blue-deep)] to-[#152d4a] text-white py-6 px-6 rounded-2xl mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
          <div className="flex items-center justify-between relative">
            <div>
              <Link href="/admin" className="text-blue-200/80 text-sm hover:text-white flex items-center gap-1 mb-1 group">
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                חזרה ללוח בקרה
              </Link>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[var(--color-gold)]" />
                ניהול שיעורים
              </h1>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "סה״כ שיעורים", value: animTotal, icon: <BookMarked className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "ממתינים לאישור", value: animPending, icon: <Clock className="w-5 h-5" />, color: "text-amber-600", bg: "bg-amber-50", highlight: pendingCount > 0 },
          { label: "עמוד נוכחי", value: page, icon: <FileSpreadsheet className="w-5 h-5" />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "סה״כ עמודים", value: totalPages, icon: <BookOpen className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-50" },
        ].map((s) => (
          <motion.div
            key={s.label}
            whileHover={{ y: -2 }}
            className={`bg-white rounded-2xl shadow-sm border p-4 text-center ${
              s.highlight ? "border-amber-300 ring-1 ring-amber-200" : "border-gray-100"
            }`}
          >
            <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mx-auto mb-2`}>
              {s.icon}
            </div>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">{s.value}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Pending Approval Banner */}
      {pendingCount > 0 && (
        <AnimatedSection variant="fadeUp">
          <div className="bg-gradient-to-l from-amber-50 to-amber-100/50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-200/50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <p className="font-bold text-amber-900">{pendingCount} שיעורים ממתינים לאישור</p>
                <p className="text-sm text-amber-700">שיעורים חדשים שנוספו על ידי רבנים ומרצים</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setApprovedFilter(false); setPage(1); }}
              className="bg-amber-600 text-white px-5 py-2.5 rounded-xl text-sm hover:bg-amber-700 transition-colors flex items-center gap-2 font-medium shadow-sm"
            >
              הצג ממתינים
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
          </div>
        </AnimatedSection>
      )}

      {/* Filter Tabs */}
      <AnimatedSection variant="fadeUp" delay={0.05}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex gap-2">
            {[
              { label: "הכל", filter: undefined, activeClass: "bg-[var(--color-blue-deep)] text-white" },
              { label: "מאושרים", filter: true, activeClass: "bg-green-600 text-white" },
              { label: "ממתינים", filter: false, activeClass: "bg-amber-600 text-white" },
            ].map((tab) => (
              <motion.button
                key={tab.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setApprovedFilter(tab.filter); setPage(1); }}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  approvedFilter === tab.filter ? tab.activeClass + " shadow-sm" : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Lessons Table */}
      <AnimatedSection variant="fadeUp" delay={0.1}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 rounded-lg skeleton-shimmer" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/80 border-b border-gray-100">
                  <tr className="text-right text-xs text-[var(--color-warm-gray)]">
                    <th className="px-5 py-3.5 font-semibold">שיעור</th>
                    <th className="px-5 py-3.5 font-semibold">רב/מרצה</th>
                    <th className="px-5 py-3.5 font-semibold">מיקום</th>
                    <th className="px-5 py-3.5 font-semibold">יום ושעה</th>
                    <th className="px-5 py-3.5 font-semibold">קהל</th>
                    <th className="px-5 py-3.5 font-semibold">נרשמים</th>
                    <th className="px-5 py-3.5 font-semibold">סטטוס</th>
                    <th className="px-5 py-3.5 font-semibold">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson, i) => (
                    <motion.tr
                      key={lesson.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className={`border-b border-gray-50 hover:bg-[var(--color-cream)]/30 transition-colors ${
                        !lesson.approved ? "bg-amber-50/30" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-deep)]/5 flex items-center justify-center">
                            <BookMarked className="w-4 h-4 text-[var(--color-blue-deep)]" />
                          </div>
                          <span className="font-medium text-[var(--color-blue-deep)]">{lesson.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[var(--color-gold)] font-medium">{lesson.rabbiName}</td>
                      <td className="px-5 py-4 text-xs text-[var(--color-warm-gray)]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {lesson.city?.name || ""}{lesson.address ? `, ${lesson.address}` : ""}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {typeof lesson.dayOfWeek === "number" ? `יום ${DAYS_HE[lesson.dayOfWeek]}` : ""} {lesson.time || ""}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="badge text-xs bg-gray-100 text-gray-600 flex items-center gap-1 w-fit">
                          <Users className="w-3 h-3" />
                          {AUDIENCE_LABELS[lesson.audience || ""] || lesson.audience || ""}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="font-bold text-[var(--color-blue-deep)]">
                          {lesson._count?.registrations || 0}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {lesson.approved ? (
                          <span className="badge badge-success text-xs flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" />
                            מאושר
                          </span>
                        ) : (
                          <span className="badge text-xs bg-amber-100 text-amber-700 flex items-center gap-1 w-fit">
                            <Clock className="w-3 h-3" />
                            ממתין
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {!lesson.approved && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => approveMutation.mutate({ lessonId: lesson.id })}
                            disabled={approveMutation.isPending}
                            className="text-xs px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60 flex items-center gap-1 transition-colors"
                          >
                            {approveMutation.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                            אשר
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-5 border-t bg-gray-50/50">
              <p className="text-sm text-[var(--color-warm-gray)]">
                מציג עמוד <span className="font-bold text-[var(--color-blue-deep)]">{page}</span> מתוך {totalPages} ({total} שיעורים)
              </p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 text-sm border rounded-xl hover:bg-white disabled:opacity-50 transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-4 h-4" />
                  הקודם
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 text-sm border rounded-xl hover:bg-white disabled:opacity-50 transition-colors flex items-center gap-1"
                >
                  הבא
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
