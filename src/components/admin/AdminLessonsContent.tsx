"use client";

import { useState } from "react";
import Link from "next/link";
import { trpc } from "@/lib/trpc";
import { DAYS_HE } from "@/lib/utils";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[var(--color-blue-deep)] text-white py-6">
        <div className="container-main">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-blue-200 text-sm hover:text-white">
                ← חזרה ללוח בקרה
              </Link>
              <h1 className="text-2xl font-bold mt-1">ניהול שיעורים</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <span className="text-xl block mb-1">📖</span>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">{total}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">סה״כ שיעורים</div>
          </div>
          <div className={`bg-white rounded-xl shadow-sm border p-4 text-center ${pendingCount > 0 ? "border-amber-300 bg-amber-50" : "border-gray-100"}`}>
            <span className="text-xl block mb-1">⏳</span>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">{pendingCount}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">ממתינים לאישור</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <span className="text-xl block mb-1">📄</span>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">{page}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">עמוד נוכחי</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <span className="text-xl block mb-1">📚</span>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">{totalPages}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">סה״כ עמודים</div>
          </div>
        </div>

        {/* Pending Approval Banner */}
        {pendingCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-amber-800">{pendingCount} שיעורים ממתינים לאישור</p>
                <p className="text-sm text-amber-600">שיעורים חדשים שנוספו על ידי רבנים ומרצים</p>
              </div>
            </div>
            <button
              onClick={() => { setApprovedFilter(false); setPage(1); }}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700"
            >
              הצג ממתינים
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => { setApprovedFilter(undefined); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm ${approvedFilter === undefined ? "bg-[var(--color-blue-deep)] text-white" : "border hover:bg-gray-50"}`}
            >
              הכל
            </button>
            <button
              onClick={() => { setApprovedFilter(true); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm ${approvedFilter === true ? "bg-green-600 text-white" : "border hover:bg-gray-50"}`}
            >
              מאושרים
            </button>
            <button
              onClick={() => { setApprovedFilter(false); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm ${approvedFilter === false ? "bg-amber-600 text-white" : "border hover:bg-gray-50"}`}
            >
              ממתינים
            </button>
          </div>
        </div>

        {/* Lessons Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-right text-xs text-[var(--color-warm-gray)]">
                    <th className="p-3 font-medium">שיעור</th>
                    <th className="p-3 font-medium">רב/מרצה</th>
                    <th className="p-3 font-medium">מיקום</th>
                    <th className="p-3 font-medium">יום ושעה</th>
                    <th className="p-3 font-medium">קהל</th>
                    <th className="p-3 font-medium">נרשמים</th>
                    <th className="p-3 font-medium">סטטוס</th>
                    <th className="p-3 font-medium">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson) => (
                    <tr
                      key={lesson.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 ${
                        !lesson.approved ? "bg-amber-50/50" : ""
                      }`}
                    >
                      <td className="p-3 font-medium text-[var(--color-blue-deep)]">
                        {lesson.title}
                      </td>
                      <td className="p-3 text-[var(--color-gold)]">{lesson.rabbiName}</td>
                      <td className="p-3 text-xs text-[var(--color-warm-gray)]">
                        {lesson.city?.name || ""}{lesson.address ? `, ${lesson.address}` : ""}
                      </td>
                      <td className="p-3 text-xs">
                        {typeof lesson.dayOfWeek === "number" ? `יום ${DAYS_HE[lesson.dayOfWeek]}` : ""} {lesson.time || ""}
                      </td>
                      <td className="p-3">
                        <span className="badge text-xs bg-gray-100 text-gray-600">
                          {AUDIENCE_LABELS[lesson.audience || ""] || lesson.audience || ""}
                        </span>
                      </td>
                      <td className="p-3 text-center font-medium">
                        {lesson._count?.registrations || 0}
                      </td>
                      <td className="p-3">
                        {lesson.approved ? (
                          <span className="badge badge-success text-xs">מאושר</span>
                        ) : (
                          <span className="badge text-xs bg-amber-100 text-amber-700">ממתין</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          {!lesson.approved && (
                            <button
                              onClick={() => approveMutation.mutate({ lessonId: lesson.id })}
                              disabled={approveMutation.isPending}
                              className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                            >
                              אשר
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t bg-gray-50">
              <p className="text-sm text-[var(--color-warm-gray)]">
                מציג עמוד {page} מתוך {totalPages} ({total} שיעורים)
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  הקודם
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  הבא
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
