"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Users,
  Search,
  Shield,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  MapPin,
  UserCheck,
  Hash,
  FileSpreadsheet,
} from "lucide-react";

const ROLE_COLORS: Record<string, string> = {
  USER: "bg-gray-100 text-gray-600",
  ACTIVIST: "bg-blue-100 text-blue-700",
  MENTOR: "bg-purple-100 text-purple-700",
  CITY_COORD_MALE: "bg-amber-100 text-amber-700",
  CITY_COORD_FEMALE: "bg-amber-100 text-amber-700",
  NEIGHBORHOOD_HEAD: "bg-green-100 text-green-700",
  CITY_HEAD: "bg-green-100 text-green-700",
  REGION_HEAD: "bg-red-100 text-red-700",
  NATIONAL_ADMIN: "bg-red-100 text-red-700",
  RABBI: "bg-indigo-100 text-indigo-700",
  LECTURER: "bg-indigo-100 text-indigo-700",
  DONOR: "bg-pink-100 text-pink-700",
};

const ROLE_LABELS: Record<string, string> = {
  USER: "משתמש",
  ACTIVIST: "פעיל",
  MENTOR: "חונך",
  CITY_COORD_MALE: "רכז עיר",
  CITY_COORD_FEMALE: "רכזת עיר",
  NEIGHBORHOOD_HEAD: "ראש שכונה",
  CITY_HEAD: "ראש עיר",
  REGION_HEAD: "ראש אזור",
  NATIONAL_ADMIN: "מנהל ארצי",
  RABBI: "רב",
  LECTURER: "מרצה",
  DONOR: "תורם",
};

export default function AdminUsersContent() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = trpc.user.list.useQuery({
    page,
    pageSize: 20,
    search: search || undefined,
    role: roleFilter || undefined,
  });

  const updateRole = trpc.user.updateRole.useMutation({
    onSuccess: () => {},
  });

  const users = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const animTotal = useAnimatedCounter(total, statsVisible);

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
                <Users className="w-6 h-6 text-[var(--color-gold)]" />
                ניהול משתמשים
              </h1>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection variant="fadeUp" delay={0.05}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="חיפוש לפי שם או טלפון..."
                className="input-field text-sm pr-10"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <select
              className="input-field text-sm"
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            >
              <option value="">כל התפקידים</option>
              <option value="USER">משתמש</option>
              <option value="ACTIVIST">פעיל</option>
              <option value="MENTOR">חונך</option>
              <option value="RABBI">רב</option>
              <option value="CITY_COORD_MALE">רכז עיר</option>
              <option value="CITY_COORD_FEMALE">רכזת עיר</option>
            </select>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Bar */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "סה״כ משתמשים", value: animTotal, icon: <Users className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "בעמוד זה", value: users.length, icon: <UserCheck className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-50" },
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

      {/* Users Table */}
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
                    <th className="px-5 py-3.5 font-semibold">שם</th>
                    <th className="px-5 py-3.5 font-semibold">טלפון</th>
                    <th className="px-5 py-3.5 font-semibold">עיר</th>
                    <th className="px-5 py-3.5 font-semibold">תפקיד</th>
                    <th className="px-5 py-3.5 font-semibold">הצטרף</th>
                    <th className="px-5 py-3.5 font-semibold">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-gray-50 hover:bg-[var(--color-cream)]/30 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-deep)]/5 flex items-center justify-center text-[var(--color-blue-deep)]">
                            <Users className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-[var(--color-blue-deep)]">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[var(--color-warm-gray)] font-mono text-xs" dir="ltr">
                        {user.phone}
                      </td>
                      <td className="px-5 py-4 text-xs text-[var(--color-warm-gray)]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {user.city?.name || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`badge text-xs ${ROLE_COLORS[user.role] || "bg-gray-100 text-gray-600"}`}>
                          {ROLE_LABELS[user.role] || user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-[var(--color-warm-gray)]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(user.createdAt).toLocaleDateString("he-IL")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white hover:border-[var(--color-gold)] transition-colors cursor-pointer"
                          value={user.role}
                          onChange={(e) => {
                            updateRole.mutate({
                              userId: user.id,
                              role: e.target.value as "USER" | "ACTIVIST" | "MENTOR" | "CITY_COORD_MALE" | "CITY_COORD_FEMALE" | "NEIGHBORHOOD_HEAD" | "CITY_HEAD" | "REGION_HEAD" | "NATIONAL_ADMIN" | "RABBI" | "LECTURER" | "DONOR",
                            });
                          }}
                        >
                          <option value="USER">משתמש</option>
                          <option value="ACTIVIST">פעיל</option>
                          <option value="MENTOR">חונך</option>
                          <option value="RABBI">רב</option>
                          <option value="CITY_COORD_MALE">רכז עיר</option>
                        </select>
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
                מציג עמוד <span className="font-bold text-[var(--color-blue-deep)]">{page}</span> מתוך {totalPages} ({total} משתמשים)
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
