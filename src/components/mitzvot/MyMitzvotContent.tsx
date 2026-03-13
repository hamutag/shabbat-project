"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc";

export default function MyMitzvotContent() {
  const { data: mitzvot, isLoading } = trpc.mitzva.myMitzvot.useQuery();
  const utils = trpc.useUtils();

  const updateProgress = trpc.mitzva.updateProgress.useMutation({
    onSuccess: () => {
      utils.mitzva.myMitzvot.invalidate();
      utils.user.getStats.invalidate();
    },
  });

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8">
        <div className="container-main max-w-3xl">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-4 gap-3 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-4 text-center space-y-2">
                <div className="h-8 w-10 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-16 mx-auto bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-6 h-48 animate-pulse bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const userMitzvot = mitzvot || [];
  const activeCount = userMitzvot.length;
  const keepingCount = userMitzvot.filter((m) => (m.progressLevel || 0) >= 80).length;
  const inProgressCount = userMitzvot.filter((m) => (m.progressLevel || 0) < 80).length;

  const handleMarkToday = (userMitzvaId: string, currentLevel: number) => {
    const newLevel = Math.min(currentLevel + 2, 100);
    updateProgress.mutate({ userMitzvaId, progressLevel: newLevel });
  };

  return (
    <div className="gradient-light min-h-screen py-8">
      <div className="container-main max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/dashboard" className="text-sm text-[var(--color-gold)] hover:underline">
              ← חזרה לאזור האישי
            </Link>
            <h1 className="text-2xl font-bold text-[var(--color-blue-deep)] mt-2">
              המצוות שלי
            </h1>
            <p className="text-[var(--color-warm-gray)]">
              {activeCount} מצוות פעילות
            </p>
          </div>
          <Link href="/join" className="btn-primary text-sm">
            + הוסף מצווה
          </Link>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "מצוות פעילות", value: activeCount, color: "text-[var(--color-blue-deep)]" },
            { label: "שומר קבוע", value: keepingCount, color: "text-green-600" },
            { label: "בתהליך", value: inProgressCount, color: "text-amber-600" },
            { label: "סה\"כ מצוות", value: activeCount, color: "text-[var(--color-gold)]" },
          ].map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-[var(--color-warm-gray)]">{s.label}</div>
            </div>
          ))}
        </div>

        {userMitzvot.length > 0 ? (
          <div className="space-y-4">
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
                <div key={um.id} className="card p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{mitzva?.iconUrl || "✨"}</span>
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
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="gradient-gold h-3 rounded-full transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-2 bg-[var(--color-cream)] rounded-lg">
                          <div className="text-lg font-bold text-[var(--color-gold)]">
                            {progress >= 80 ? "✓" : "◦"} {statusLabel}
                          </div>
                          <div className="text-xs text-[var(--color-warm-gray)]">סטטוס</div>
                        </div>
                        <div className="text-center p-2 bg-[var(--color-cream)] rounded-lg">
                          <div className="text-xs font-medium text-[var(--color-blue-deep)]">
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
                    <button
                      onClick={() => handleMarkToday(um.id, progress)}
                      disabled={updateProgress.isPending}
                      className="btn-primary text-xs py-2 flex-1 disabled:opacity-60"
                    >
                      {updateProgress.isPending ? "מעדכן..." : "✓ סימון היום"}
                    </button>
                    <Link href="/content" className="btn-secondary text-xs py-2 flex-1 text-center">
                      📖 תוכן קשור
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <span className="text-5xl block mb-4">🕯️</span>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
              עדיין לא בחרת מצוות
            </h2>
            <p className="text-[var(--color-warm-gray)] mb-6">
              בחר מצוות שתרצה להתחזק בהן והתחל את המסע שלך
            </p>
            <Link href="/join" className="btn-primary px-8 py-3">
              בחר מצוות
            </Link>
          </div>
        )}

        {/* Add More */}
        <Link
          href="/join"
          className="card p-6 text-center mt-6 border-dashed border-2 border-gray-300 hover:border-[var(--color-gold)] transition-colors block group"
        >
          <span className="text-3xl block mb-2">➕</span>
          <p className="font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
            הוסף מצווה חדשה
          </p>
          <p className="text-sm text-[var(--color-warm-gray)]">
            בחר מתוך עשרות מצוות לכל רמה
          </p>
        </Link>
      </div>
    </div>
  );
}
