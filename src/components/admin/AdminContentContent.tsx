"use client";

import { useState } from "react";
import Link from "next/link";
import { trpc } from "@/lib/trpc";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[var(--color-blue-deep)] text-white py-6">
        <div className="container-main">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-blue-200 text-sm hover:text-white">
                ← חזרה ללוח בקרה
              </Link>
              <h1 className="text-2xl font-bold mt-1">ניהול תוכן</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <span className="text-xl block mb-1">📚</span>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">{total}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">סה״כ תכנים</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <span className="text-xl block mb-1">📄</span>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">{page}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">עמוד נוכחי</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <span className="text-xl block mb-1">📑</span>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">{totalPages}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">סה״כ עמודים</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <span className="text-xl block mb-1">👁️</span>
            <div className="text-xl font-black text-[var(--color-blue-deep)]">
              {items.reduce((sum, item) => sum + (item.viewCount || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs text-[var(--color-warm-gray)]">צפיות בעמוד</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
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
            </select>
            <select
              className="input-field text-sm"
              value={publishedFilter === undefined ? "" : publishedFilter ? "true" : "false"}
              onChange={(e) => {
                setPublishedFilter(e.target.value === "" ? undefined : e.target.value === "true");
                setPage(1);
              }}
            >
              <option value="">כל הסטטוסים</option>
              <option value="true">מפורסם</option>
              <option value="false">טיוטה</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-right text-xs text-[var(--color-warm-gray)]">
                    <th className="p-3 font-medium">כותרת</th>
                    <th className="p-3 font-medium">סוג</th>
                    <th className="p-3 font-medium">קטגוריה</th>
                    <th className="p-3 font-medium">סטטוס</th>
                    <th className="p-3 font-medium">צפיות</th>
                    <th className="p-3 font-medium">תאריך</th>
                    <th className="p-3 font-medium">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-3 font-medium text-[var(--color-blue-deep)] max-w-xs truncate">
                        {item.title}
                      </td>
                      <td className="p-3">
                        <span className={`badge text-xs ${TYPE_COLORS[item.type] || "bg-gray-100"}`}>
                          {TYPE_LABELS[item.type] || item.type}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-[var(--color-warm-gray)]">
                        {item.category || "—"}
                      </td>
                      <td className="p-3">
                        {item.isPublished ? (
                          <span className="badge text-xs bg-green-100 text-green-700">מפורסם</span>
                        ) : (
                          <span className="badge text-xs bg-gray-100 text-gray-600">טיוטה</span>
                        )}
                      </td>
                      <td className="p-3 text-center">{(item.viewCount || 0).toLocaleString()}</td>
                      <td className="p-3 text-xs text-[var(--color-warm-gray)]">
                        {new Date(item.createdAt).toLocaleDateString("he-IL")}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          {!item.isPublished && (
                            <button
                              onClick={() => updateContent.mutate({ id: item.id, isPublished: true })}
                              disabled={updateContent.isPending}
                              className="text-xs px-2 py-1 bg-[var(--color-gold)] text-white rounded hover:opacity-90 disabled:opacity-60"
                            >
                              פרסם
                            </button>
                          )}
                          {item.isPublished && (
                            <button
                              onClick={() => updateContent.mutate({ id: item.id, isPublished: false })}
                              disabled={updateContent.isPending}
                              className="text-xs px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-60"
                            >
                              הסתר
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
                מציג עמוד {page} מתוך {totalPages} ({total} תכנים)
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
