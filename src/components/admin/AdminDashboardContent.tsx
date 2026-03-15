"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Users,
  BookOpen,
  Clock,
  FileText,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  ArrowLeft,
  ChevronLeft,
  Eye,
  Calendar,
  Shield,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardContent() {
  const { data: usersData, isLoading: usersLoading } = trpc.user.list.useQuery({ page: 1, pageSize: 5 });
  const { data: lessonsData, isLoading: lessonsLoading } = trpc.lesson.adminList.useQuery({ page: 1, pageSize: 5 });
  const { data: pendingLessons } = trpc.lesson.adminList.useQuery({ page: 1, pageSize: 5, approved: false });
  const { data: contentData } = trpc.content.adminList.useQuery({ page: 1, pageSize: 5 });
  const { data: funnelData, isLoading: funnelLoading } = trpc.mentoring.funnel.useQuery();

  const totalUsers = usersData?.total || 0;
  const totalLessons = lessonsData?.total || 0;
  const pendingCount = pendingLessons?.total || 0;
  const totalContent = contentData?.total || 0;
  const recentUsers = usersData?.items || [];

  const { ref: kpiRef, isVisible: kpiVisible } = useScrollAnimation();
  const animUsers = useAnimatedCounter(totalUsers, kpiVisible);
  const animLessons = useAnimatedCounter(totalLessons, kpiVisible);
  const animPending = useAnimatedCounter(pendingCount, kpiVisible);
  const animContent = useAnimatedCounter(totalContent, kpiVisible);
  const animRecent = useAnimatedCounter(recentUsers.length, kpiVisible);

  const isLoading = usersLoading || lessonsLoading;

  if (isLoading) {
    return (
      <div>
        <div className="bg-gradient-to-l from-[var(--color-blue-deep)] to-[#152d4a] text-white py-8 px-6 rounded-2xl mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
          <div className="h-8 w-48 bg-white/10 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-64 bg-white/5 rounded mt-2 skeleton-shimmer" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 h-28 skeleton-shimmer border border-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Admin Header Banner */}
      <AnimatedSection variant="fadeUp">
        <div className="bg-gradient-to-l from-[var(--color-blue-deep)] to-[#152d4a] text-white py-8 px-6 rounded-2xl mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/3 rounded-full blur-2xl" />
          <div className="flex items-center justify-between relative">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/15 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <h1 className="text-2xl font-bold">לוח בקרה</h1>
              </div>
              <p className="text-blue-200 text-sm">סקירה כללית של הפרויקט</p>
            </div>
            <div className="flex gap-2">
              {[
                { href: "/admin/users", label: "משתמשים", icon: <Users className="w-4 h-4" /> },
                { href: "/admin/lessons", label: "שיעורים", icon: <BookOpen className="w-4 h-4" /> },
                { href: "/admin/content", label: "תוכן", icon: <FileText className="w-4 h-4" /> },
              ].map((btn) => (
                <Link
                  key={btn.href}
                  href={btn.href}
                  className="bg-white/8 hover:bg-white/15 px-4 py-2 rounded-xl text-sm transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  {btn.icon}
                  <span className="hidden md:inline">{btn.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* KPI Cards */}
      <div ref={kpiRef}>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "סה״כ נרשמים", value: animUsers, icon: <Users className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "שיעורים פעילים", value: animLessons, icon: <BookOpen className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-50" },
            { label: "ממתינים לאישור", value: animPending, icon: <Clock className="w-5 h-5" />, color: "text-amber-600", bg: "bg-amber-50", highlight: pendingCount > 0 },
            { label: "תכנים", value: animContent, icon: <FileText className="w-5 h-5" />, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "נרשמים חדשים", value: animRecent, icon: <UserPlus className="w-5 h-5" />, color: "text-teal-600", bg: "bg-teal-50" },
            { label: "משפך ליווי", value: funnelData?.length || 0, icon: <TrendingUp className="w-5 h-5" />, color: "text-rose-600", bg: "bg-rose-50" },
          ].map((kpi) => (
            <StaggerItem key={kpi.label}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className={`bg-white rounded-2xl p-5 text-center shadow-sm border transition-shadow hover:shadow-md ${
                  kpi.highlight ? "border-amber-300 ring-1 ring-amber-200" : "border-gray-100"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center mx-auto mb-3`}>
                  {kpi.icon}
                </div>
                <div className="text-2xl font-black text-[var(--color-blue-deep)]">{kpi.value}</div>
                <div className="text-xs text-[var(--color-warm-gray)] mt-1">{kpi.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Approval Alert */}
          {pendingCount > 0 && (
            <AnimatedSection variant="fadeUp">
              <motion.div
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                className="bg-gradient-to-l from-amber-50 to-amber-100/50 border border-amber-200 rounded-2xl p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-200/50 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-bold text-amber-900">{pendingCount} שיעורים ממתינים לאישור</p>
                    <p className="text-sm text-amber-700">שיעורים חדשים שנוספו על ידי רבנים ומרצים</p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/admin/lessons" className="bg-amber-600 text-white px-5 py-2.5 rounded-xl text-sm hover:bg-amber-700 transition-colors flex items-center gap-2 font-medium shadow-sm">
                    בדוק ואשר
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          )}

          {/* Recent Signups */}
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between p-6 pb-4">
                <h2 className="text-lg font-bold text-[var(--color-blue-deep)] flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[var(--color-gold)]" />
                  נרשמים אחרונים
                </h2>
                <Link href="/admin/users" className="text-sm text-[var(--color-gold)] hover:underline flex items-center gap-1">
                  ראה הכל
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
              {recentUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-right text-xs text-[var(--color-warm-gray)] border-b border-gray-100 bg-gray-50/50">
                        <th className="px-6 py-3 font-medium">שם</th>
                        <th className="px-6 py-3 font-medium">טלפון</th>
                        <th className="px-6 py-3 font-medium">תפקיד</th>
                        <th className="px-6 py-3 font-medium">הצטרף</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user, i) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-gray-50 hover:bg-[var(--color-cream)]/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-deep)]/5 flex items-center justify-center">
                                <Users className="w-4 h-4 text-[var(--color-blue-deep)]" />
                              </div>
                              <span className="font-medium text-[var(--color-blue-deep)]">
                                {user.firstName} {user.lastName}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[var(--color-warm-gray)] font-mono text-xs" dir="ltr">
                            {user.phone}
                          </td>
                          <td className="px-6 py-4">
                            <span className="badge text-xs bg-gray-100 text-gray-600">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-[var(--color-warm-gray)] flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(user.createdAt).toLocaleDateString("he-IL")}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-[var(--color-warm-gray)] text-sm">
                  <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  אין נרשמים חדשים
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <AnimatedSection variant="fadeUp" delay={0.15}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
                פעולות מהירות
              </h3>
              <div className="space-y-2">
                {[
                  { href: "/admin/users", label: "ניהול משתמשים", icon: <Users className="w-4 h-4" />, color: "text-blue-600" },
                  { href: "/admin/lessons", label: "ניהול שיעורים", icon: <BookOpen className="w-4 h-4" />, color: "text-green-600" },
                  { href: "/admin/content", label: "ניהול תוכן", icon: <FileText className="w-4 h-4" />, color: "text-purple-600" },
                ].map((action) => (
                  <motion.div key={action.href} whileHover={{ x: -4 }}>
                    <Link
                      href={action.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-cream)] transition-colors text-sm group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center ${action.color} transition-colors`}>
                        {action.icon}
                      </div>
                      <span className="text-[var(--color-blue-deep)] font-medium">{action.label}</span>
                      <ChevronLeft className="w-4 h-4 text-gray-300 mr-auto group-hover:text-[var(--color-gold)] transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Mentoring Funnel */}
          {!funnelLoading && funnelData && funnelData.length > 0 && (
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-[var(--color-blue-deep)] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--color-gold)]" />
                  משפך ליווי
                </h3>
                <div className="space-y-4">
                  {funnelData.map((step, i) => (
                    <motion.div
                      key={step.stage}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-[var(--color-blue-deep)] font-medium">{step.label}</span>
                        <span className="text-[var(--color-warm-gray)] font-mono">{step.count} ({step.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${step.percentage}%` }}
                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                          className="gradient-gold h-2.5 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  );
}
