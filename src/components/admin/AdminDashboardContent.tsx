"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc";

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

  const isLoading = usersLoading || lessonsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[var(--color-blue-deep)] text-white py-6">
          <div className="container-main">
            <div className="h-8 w-48 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
        <div className="container-main py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 h-24 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-[var(--color-blue-deep)] text-white py-6">
        <div className="container-main">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">לוח בקרה</h1>
              <p className="text-blue-200 text-sm mt-1">סקירה כללית של הפרויקט</p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/users" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
                ניהול משתמשים
              </Link>
              <Link href="/admin/lessons" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
                ניהול שיעורים
              </Link>
              <Link href="/admin/content" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
                ניהול תוכן
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {[
            { label: "סה״כ נרשמים", value: totalUsers, icon: "👥" },
            { label: "שיעורים פעילים", value: totalLessons, icon: "📖" },
            { label: "ממתינים לאישור", value: pendingCount, icon: "⏳", highlight: pendingCount > 0 },
            { label: "תכנים", value: totalContent, icon: "📝" },
            { label: "נרשמים חדשים", value: recentUsers.length, icon: "🆕" },
            { label: "משפך ליווי", value: funnelData?.length || 0, icon: "📈" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className={`bg-white rounded-xl p-4 text-center shadow-sm border ${
                kpi.highlight ? "border-[var(--color-gold)] bg-amber-50" : "border-gray-100"
              }`}
            >
              <span className="text-xl block mb-1">{kpi.icon}</span>
              <div className="text-xl font-black text-[var(--color-blue-deep)]">{kpi.value}</div>
              <div className="text-xs text-[var(--color-warm-gray)] mt-1">{kpi.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Approval */}
            {pendingCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-semibold text-amber-800">{pendingCount} שיעורים ממתינים לאישור</p>
                    <p className="text-sm text-amber-600">שיעורים חדשים שנוספו על ידי רבנים ומרצים</p>
                  </div>
                </div>
                <Link href="/admin/lessons" className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700">
                  בדוק ואשר
                </Link>
              </div>
            )}

            {/* Recent Signups */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[var(--color-blue-deep)]">
                  נרשמים אחרונים
                </h2>
                <Link href="/admin/users" className="text-sm text-[var(--color-gold)] hover:underline">
                  ראה הכל →
                </Link>
              </div>
              {recentUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-right text-xs text-[var(--color-warm-gray)] border-b">
                        <th className="pb-2 font-medium">שם</th>
                        <th className="pb-2 font-medium">טלפון</th>
                        <th className="pb-2 font-medium">תפקיד</th>
                        <th className="pb-2 font-medium">הצטרף</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 font-medium text-[var(--color-blue-deep)]">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="py-3 text-[var(--color-warm-gray)]" dir="ltr">
                            {user.phone}
                          </td>
                          <td className="py-3">
                            <span className="badge text-xs bg-gray-100 text-gray-600">
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 text-xs text-[var(--color-warm-gray)]">
                            {new Date(user.createdAt).toLocaleDateString("he-IL")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-4 text-[var(--color-warm-gray)] text-sm">
                  אין נרשמים חדשים
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-4">פעולות מהירות</h3>
              <div className="space-y-2">
                <Link href="/admin/users" className="flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--color-cream)] transition-colors text-sm">
                  ➕ ניהול משתמשים
                </Link>
                <Link href="/admin/lessons" className="flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--color-cream)] transition-colors text-sm">
                  📖 ניהול שיעורים
                </Link>
                <Link href="/admin/content" className="flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--color-cream)] transition-colors text-sm">
                  📝 ניהול תוכן
                </Link>
              </div>
            </div>

            {/* Mentoring Funnel */}
            {!funnelLoading && funnelData && funnelData.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-[var(--color-blue-deep)] mb-4">משפך ליווי</h3>
                <div className="space-y-3">
                  {funnelData.map((step) => (
                    <div key={step.stage}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[var(--color-blue-deep)] font-medium">{step.label}</span>
                        <span className="text-[var(--color-warm-gray)]">{step.count} ({step.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="gradient-gold h-2 rounded-full transition-all"
                          style={{ width: `${step.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
