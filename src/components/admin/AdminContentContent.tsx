"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FileText,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Eye,
  CheckCircle2,
  FileEdit,
  Loader2,
  Hash,
  FileSpreadsheet,
  BookOpen,
  Video,
  Mic,
  Quote,
  BookMarked,
  HelpCircle,
  BarChart3,
  Lightbulb,
  Globe,
  EyeOff,
  Tag,
} from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  ARTICLE: "מאמר",
  VIDEO: "וידאו",
  PODCAST: "פודקאסט",
  QUOTE: "ציטוט",
  STORY: "סיפור",
  QA: "שאלה ותשובה",
  INFOGRAPHIC: "אינפוגרפיקה",
  TIP: "טיפ",
};

const TYPE_COLORS: Record<string, string> = {
  ARTICLE: "bg-blue-100 text-blue-700",
  VIDEO: "bg-purple-100 text-purple-700",
  STORY: "bg-pink-100 text-pink-700",
  QA: "bg-green-100 text-green-700",
  QUOTE: "bg-amber-100 text-amber-700",
  TIP: "bg-teal-100 text-teal-700",
  PODCAST: "bg-indigo-100 text-indigo-700",
  INFOGRAPHIC: "bg-orange-100 text-orange-700",
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  ARTICLE: <BookOpen className="w-3 h-3" />,
  VIDEO: <Video className="w-3 h-3" />,
  PODCAST: <Mic className="w-3 h-3" />,
  QUOTE: <Quote className="w-3 h-3" />,
  STORY: <BookMarked className="w-3 h-3" />,
  QA: <HelpCircle className="w-3 h-3" />,
  INFOGRAPHIC: <BarChart3 className="w-3 h-3" />,
  TIP: <Lightbulb className="w-3 h-3" />,
};

export default function AdminContentContent() {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [publishedFilter, setPublishedFilter] = useState<boolean | undefined>(undefined);

  const { data, isLoading, refetch } = trpc.content.adminList.useQuery({
    page,
    pageSize: 20,
    type: typeFilter || undefined,
    isPublished: publishedFilter,
  });

  const updateContent = trpc.content.update.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const items = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;
  const totalViews = items.reduce((sum, item) => sum + (item.viewCount || 0), 0);

  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const animTotal = useAnimatedCounter(total, statsVisible);
  const animViews = useAnimatedCounter(totalViews, statsVisible);

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
                <FileText className="w-6 h-6 text-[var(--color-gold)]" />
                ניהול תוכן
              </h1>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "סה״כ תכנים", value: animTotal, icon: <FileText className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "צפיות בעמוד", value: animViews, icon: <Eye className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-50" },
          { label: "עמוד נוכחי", value: page, icon: <Hash className="w-5 h-5" />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "סה״כ עמודים", value: totalPages, icon: <FileSpreadsheet className="w-5 h-5" />, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s) => (
          <motion.div
            key={s.label}
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center"
          >
            <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mx-auto mb-2`}>
              {s.icon}
            </div>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">{s.value}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <AnimatedSection variant="fadeUp" delay={0.05}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              className="input-field text-sm"
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            >
              <option value="">כל הסוגים</option>
              <option value="ARTICLE">מאמר</option>
              <option value="VIDEO">וידאו</option>
              <option value="STORY">סיפור</option>
              <option value="QA">שאלה ותשובה</option>
              <option value="QUOTE">ציטוט</option>
              <option value="TIP">טיפ</option>
              <option value="PODCAST">פודקאסט</option>
              <option value="INFOGRAPHIC">אינפוגרפיקה</option>
            </select>
            <div className="flex gap-2">
              {[
                { label: "הכל", filter: undefined, activeClass: "bg-[var(--color-blue-deep)] text-white" },
                { label: "מפורסם", filter: true, activeClass: "bg-green-600 text-white" },
                { label: "טיוטה", filter: false, activeClass: "bg-gray-600 text-white" },
              ].map((tab) => (
                <motion.button
                  key={tab.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setPublishedFilter(tab.filter); setPage(1); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex-1 ${
                    publishedFilter === tab.filter ? tab.activeClass + " shadow-sm" : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Content Table */}
      <AnimatedSection variant="fadeUp" delay={0.1}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-12 rounded-lg skeleton-shimmer" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/80 border-b border-gray-100">
                  <tr className="text-right text-xs text-[var(--color-warm-gray)]">
                    <th className="px-5 py-3.5 font-semibold">כותרת</th>
                    <th className="px-5 py-3.5 font-semibold">סוג</th>
                    <th className="px-5 py-3.5 font-semibold">קטגוריה</th>
                    <th className="px-5 py-3.5 font-semibold">סטטוס</th>
                    <th className="px-5 py-3.5 font-semibold">צפיות</th>
                    <th className="px-5 py-3.5 font-semibold">תאריך</th>
                    <th className="px-5 py-3.5 font-semibold">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className={`border-b border-gray-50 hover:bg-[var(--color-cream)]/30 transition-colors ${
                        !item.isPublished ? "bg-gray-50/30" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-deep)]/5 flex items-center justify-center">
                            <FileEdit className="w-4 h-4 text-[var(--color-blue-deep)]" />
                          </div>
                          <span className="font-medium text-[var(--color-blue-deep)] max-w-xs truncate">
                            {item.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`badge text-xs ${TYPE_COLORS[item.type] || "bg-gray-100"} flex items-center gap-1 w-fit`}>
                          {TYPE_ICONS[item.type]}
                          {TYPE_LABELS[item.type] || item.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-[var(--color-warm-gray)]">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {item.category || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {item.isPublished ? (
                          <span className="badge badge-success text-xs flex items-center gap-1 w-fit">
                            <Globe className="w-3 h-3" />
                            מפורסם
                          </span>
                        ) : (
                          <span className="badge text-xs bg-gray-100 text-gray-600 flex items-center gap-1 w-fit">
                            <FileEdit className="w-3 h-3" />
                            טיוטה
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="flex items-center gap-1 justify-center">
                          <Eye className="w-3 h-3 text-gray-400" />
                          <span className="font-bold text-[var(--color-blue-deep)]">
                            {(item.viewCount || 0).toLocaleString()}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-[var(--color-warm-gray)]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleDateString("he-IL")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1">
                          {!item.isPublished && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateContent.mutate({ id: item.id, isPublished: true })}
                              disabled={updateContent.isPending}
                              className="text-xs px-3 py-1.5 bg-[var(--color-gold)] text-white rounded-lg hover:opacity-90 disabled:opacity-60 flex items-center gap-1 transition-colors"
                            >
                              {updateContent.isPending ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3" />
                              )}
                              פרסם
                            </motion.button>
                          )}
                          {item.isPublished && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateContent.mutate({ id: item.id, isPublished: false })}
                              disabled={updateContent.isPending}
                              className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-60 flex items-center gap-1 transition-colors"
                            >
                              {updateContent.isPending ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <EyeOff className="w-3 h-3" />
                              )}
                              הסתר
                            </motion.button>
                          )}
                        </div>
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
                מציג עמוד <span className="font-bold text-[var(--color-blue-deep)]">{page}</span> מתוך {totalPages} ({total} תכנים)
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
