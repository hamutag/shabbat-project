"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc";

export default function MyLessonsContent() {
  const { data: registrations, isLoading } = trpc.lesson.myLessons.useQuery();
  const { data: stats } = trpc.user.getStats.useQuery();
  const utils = trpc.useUtils();

  const unregister = trpc.lesson.unregister.useMutation({
    onSuccess: () => {
      utils.lesson.myLessons.invalidate();
      utils.user.getStats.invalidate();
    },
  });

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8">
        <div className="container-main max-w-3xl">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-4 text-center space-y-2">
                <div className="h-8 w-10 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-16 mx-auto bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="card p-5 h-32 animate-pulse bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const userRegistrations = registrations || [];
  const lessonsCount = stats?.lessonsAttended || userRegistrations.length;
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

  return (
    <div className="gradient-light min-h-screen py-8">
      <div className="container-main max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/dashboard" className="text-sm text-[var(--color-gold)] hover:underline">
              ← חזרה לאזור האישי
            </Link>
            <h1 className="text-2xl font-bold text-[var(--color-blue-deep)] mt-2">
              השיעורים שלי
            </h1>
          </div>
          <Link href="/lessons" className="btn-primary text-sm">
            מצא שיעורים חדשים
          </Link>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card p-4 text-center">
            <div className="text-2xl font-black text-[var(--color-gold)]">
              {userRegistrations.length}
            </div>
            <div className="text-xs text-[var(--color-warm-gray)]">שיעורים פעילים</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-black text-[var(--color-blue-deep)]">
              {lessonsCount}
            </div>
            <div className="text-xs text-[var(--color-warm-gray)]">שיעורים שהשתתפתי</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-black text-green-600">
              {userRegistrations.length > 0 ? "✓" : "—"}
            </div>
            <div className="text-xs text-[var(--color-warm-gray)]">נרשם</div>
          </div>
        </div>

        {/* Active Registrations */}
        {userRegistrations.length > 0 ? (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">
              שיעורים שנרשמתי
            </h2>
            <div className="space-y-3">
              {userRegistrations.map((reg) => {
                const lesson = reg.lesson;
                if (!lesson) return null;
                const dayLabel = typeof lesson.dayOfWeek === "number" ? days[lesson.dayOfWeek] : "";

                return (
                  <div key={reg.id} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-[var(--color-blue-deep)]">{lesson.title}</h3>
                        <p className="text-sm text-[var(--color-gold)]">{lesson.rabbiName}</p>
                      </div>
                      <span className="badge badge-success text-xs">נרשם</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-4">
                      {lesson.address && (
                        <div>
                          <span className="text-xs text-[var(--color-warm-gray)] block">מיקום</span>
                          <span className="text-[var(--color-blue-deep)]">📍 {lesson.address}</span>
                        </div>
                      )}
                      {dayLabel && (
                        <div>
                          <span className="text-xs text-[var(--color-warm-gray)] block">יום</span>
                          <span className="text-[var(--color-blue-deep)]">📅 יום {dayLabel}</span>
                        </div>
                      )}
                      {lesson.time && (
                        <div>
                          <span className="text-xs text-[var(--color-warm-gray)] block">שעה</span>
                          <span className="text-[var(--color-blue-deep)]">🕐 {lesson.time}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-xs text-[var(--color-warm-gray)]">
                        {lesson.description ? lesson.description.slice(0, 60) + "..." : ""}
                      </span>
                      <button
                        onClick={() => unregister.mutate({ registrationId: reg.id })}
                        disabled={unregister.isPending}
                        className="text-xs px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-60"
                      >
                        {unregister.isPending ? "מבטל..." : "בטל רישום"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="card p-12 text-center mb-8">
            <span className="text-5xl block mb-4">📖</span>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
              אין שיעורים רשומים
            </h2>
            <p className="text-[var(--color-warm-gray)] mb-6">
              מצא שיעורי תורה קרובים אליך והירשם
            </p>
            <Link href="/lessons" className="btn-primary px-8 py-3">
              מצא שיעורים
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
