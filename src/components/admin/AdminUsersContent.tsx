"use client";

import { useState } from "react";
import Link from "next/link";
import { trpc } from "@/lib/trpc";

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
    onSuccess: () => {
      // Refetch users
    },
  });

  const users = data?.items || [];
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
              <h1 className="text-2xl font-bold mt-1">ניהול משתמשים</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="חיפוש לפי שם או טלפון..."
              className="input-field text-sm md:col-span-2"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
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

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <div className="text-2xl font-black text-[var(--color-blue-deep)]">{total}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">סה״כ משתמשים</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <div className="text-2xl font-black text-green-600">{users.length}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">בעמוד זה</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <div className="text-2xl font-black text-[var(--color-blue-deep)]">{page}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">עמוד נוכחי</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <div className="text-2xl font-black text-[var(--color-blue-deep)]">{totalPages}</div>
            <div className="text-xs text-[var(--color-warm-gray)]">סה״כ עמודים</div>
          </div>
        </div>

        {/* Users Table */}
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
                    <th className="p-3 font-medium">שם</th>
                    <th className="p-3 font-medium">טלפון</th>
                    <th className="p-3 font-medium">עיר</th>
                    <th className="p-3 font-medium">תפקיד</th>
                    <th className="p-3 font-medium">הצטרף</th>
                    <th className="p-3 font-medium">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-3 font-medium text-[var(--color-blue-deep)]">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="p-3 text-[var(--color-warm-gray)]" dir="ltr">
                        {user.phone}
                      </td>
                      <td className="p-3 text-xs text-[var(--color-warm-gray)]">
                        {user.city?.name || "—"}
                      </td>
                      <td className="p-3">
                        <span className={`badge text-xs ${ROLE_COLORS[user.role] || "bg-gray-100 text-gray-600"}`}>
                          {ROLE_LABELS[user.role] || user.role}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-[var(--color-warm-gray)]">
                        {new Date(user.createdAt).toLocaleDateString("he-IL")}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <select
                            className="text-xs border rounded px-1 py-1"
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
                מציג עמוד {page} מתוך {totalPages} ({total} משתמשים)
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
