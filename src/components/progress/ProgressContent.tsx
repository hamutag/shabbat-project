"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc";

const ACHIEVEMENTS_DEF = [
  { name: "שבת ראשונה", desc: "שמרת שבת בפעם הראשונה", icon: "🕯️", threshold: { shabbat: 1 } },
  { name: "שומר קבוע", desc: "שמרת 4 שבתות ברצף", icon: "⭐", threshold: { streak: 4 } },
  { name: "10 שבתות", desc: "שמרת 10 שבתות", icon: "🏆", threshold: { shabbat: 10 } },
  { name: "שיעור ראשון", desc: "השתתפת בשיעור הראשון", icon: "📖", threshold: { lessons: 1 } },
  { name: "5 שיעורים", desc: "השתתפת ב-5 שיעורים", icon: "📚", threshold: { lessons: 5 } },
  { name: "מקרב אחד", desc: "הבאת חבר ראשון לפרויקט", icon: "🤝", threshold: { referrals: 1 } },
  { name: "חודש מלא", desc: "חודש של מצוות", icon: "💪", threshold: { streak: 30 } },
  { name: "מלווה", desc: "הפכת לפעיל מלווה", icon: "🌟", threshold: { mentor: true } },
];

export default function ProgressContent() {
  const { data: stats, isLoading: statsLoading } = trpc.user.getStats.useQuery();
  const { data: shabbatStreak, isLoading: streakLoading } = trpc.shabbat.streak.useQuery();
  const { data: shabbatHistory, isLoading: historyLoading } = trpc.shabbat.history.useQuery({ limit: 12 });
  const { data: tracks } = trpc.track.myTracks.useQuery();
  const { data: dailyQuote } = trpc.content.dailyQuote.useQuery();

  const isLoading = statsLoading || streakLoading;

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8">
        <div className="container-main">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="card p-4 text-center space-y-2">
                <div className="h-8 w-8 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-10 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-16 mx-auto bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalShabbat = shabbatStreak?.totalKept || stats?.shabbatCount || 0;
  const currentStreak = shabbatStreak?.currentStreak || 0;
  const maxStreak = shabbatStreak?.maxStreak || 0;
  const lessonsCount = stats?.lessonsAttended || 0;
  const mitzvotCount = stats?.totalMitzvot || 0;

  // Calculate achievements
  const achievements = ACHIEVEMENTS_DEF.map((a) => {
    let earned = false;
    if ("shabbat" in a.threshold && typeof a.threshold.shabbat === "number") {
      earned = totalShabbat >= a.threshold.shabbat;
    } else if ("streak" in a.threshold && typeof a.threshold.streak === "number") {
      earned = maxStreak >= a.threshold.streak;
    } else if ("lessons" in a.threshold && typeof a.threshold.lessons === "number") {
      earned = lessonsCount >= a.threshold.lessons;
    }
    return { ...a, earned };
  });

  const earnedCount = achievements.filter((a) => a.earned).length;

  const historyItems = (shabbatHistory || []).map((record) => {
    const date = new Date(record.shabbatDate);
    const day = date.getDate();
    const months = ["ינו", "פבר", "מרס", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"];
    return {
      date: `${day} ${months[date.getMonth()]}`,
      kept: record.kept,
    };
  });

  return (
    <div className="gradient-light min-h-screen py-8">
      <div className="container-main">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-[var(--color-gold)] hover:underline">
            ← חזרה לאזור האישי
          </Link>
          <h1 className="text-2xl font-bold text-[var(--color-blue-deep)] mt-2">
            ההתקדמות שלי
          </h1>
          <p className="text-[var(--color-warm-gray)]">כל צעד חשוב. ראה כמה התקדמת!</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { label: "שבתות", value: totalShabbat, icon: "🕯️", sub: `שיעור שמירה ${shabbatStreak?.keepRate || 0}%` },
            { label: "רצף נוכחי", value: currentStreak, icon: "🔥", sub: "שבתות ברצף" },
            { label: "שיעורים", value: lessonsCount, icon: "📖", sub: "השתתפת" },
            { label: "הישגים", value: earnedCount, icon: "🏆", sub: `מתוך ${achievements.length}` },
            { label: "מצוות", value: mitzvotCount, icon: "✨", sub: "פעילות" },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <span className="text-2xl block mb-1">{stat.icon}</span>
              <div className="text-2xl font-black text-[var(--color-gold)]">{stat.value}</div>
              <div className="text-xs text-[var(--color-blue-deep)] font-medium">{stat.label}</div>
              <div className="text-xs text-[var(--color-warm-gray)]">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Shabbat Tracking */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">
                מעקב שבתות
              </h2>
              {historyLoading ? (
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : historyItems.length > 0 ? (
                <>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {historyItems.map((s, i) => (
                      <div key={i} className="text-center">
                        <div
                          className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-lg ${
                            s.kept
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {s.kept ? "✓" : "—"}
                        </div>
                        <span className="text-xs text-[var(--color-warm-gray)] mt-1 block">
                          {s.date}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 justify-center text-xs text-[var(--color-warm-gray)]">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-green-100 rounded" /> שמרתי
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-gray-100 rounded" /> לא שמרתי
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-[var(--color-warm-gray)]">
                  <span className="text-3xl block mb-2">🕯️</span>
                  <p className="text-sm">עדיין אין נתוני שבתות</p>
                  <p className="text-xs mt-1">דווח על שמירת שבת מהדשבורד שלך</p>
                </div>
              )}
            </div>

            {/* Current Track Progress */}
            {tracks && tracks.length > 0 && (
              <div className="card p-6">
                <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">
                  מסלול: {tracks[0].track?.name || "מסלול פעיל"}
                </h2>
                <div className="space-y-4">
                  {tracks[0].track?.steps?.map((step) => {
                    const currentStep = tracks[0].currentStep || 0;
                    const status = step.stepNumber < currentStep ? "done"
                      : step.stepNumber === currentStep ? "current"
                      : "locked";
                    return (
                      <div key={step.id} className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                            status === "done"
                              ? "bg-green-100 text-green-600"
                              : status === "current"
                              ? "gradient-gold text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {status === "done" ? "✓" : step.stepNumber}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium text-sm ${
                              status === "locked"
                                ? "text-gray-400"
                                : "text-[var(--color-blue-deep)]"
                            }`}
                          >
                            {step.title}
                          </p>
                        </div>
                        {status === "current" && (
                          <span className="badge badge-gold text-xs">בתהליך</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {(!tracks || tracks.length === 0) && (
              <div className="card p-6">
                <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">
                  מסלולי לימוד
                </h2>
                <div className="text-center py-8 text-[var(--color-warm-gray)]">
                  <span className="text-3xl block mb-2">📚</span>
                  <p className="text-sm mb-3">טרם הצטרפת למסלול לימוד</p>
                  <Link href="/join" className="btn-primary text-sm px-4 py-2">
                    בחר מסלול
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="card p-6">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-4">הישגים</h3>
              <div className="space-y-3">
                {achievements.map((a) => (
                  <div
                    key={a.name}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      a.earned ? "bg-[var(--color-cream)]" : "bg-gray-50 opacity-50"
                    }`}
                  >
                    <span className="text-2xl">{a.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-[var(--color-blue-deep)]">
                        {a.name}
                      </p>
                      <p className="text-xs text-[var(--color-warm-gray)]">{a.desc}</p>
                    </div>
                    {a.earned && <span className="text-green-500">✓</span>}
                    {!a.earned && <span className="text-gray-300">🔒</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Chizuk */}
            <div className="quote-box text-base">
              <p className="relative z-10">
                {dailyQuote?.text || "כל מצווה שאתה מקיים מקרבת אותך ואת כל עם ישראל לגאולה"}
              </p>
              <p className="text-xs mt-3 text-[var(--color-gold)] opacity-70">
                — {dailyQuote?.source || "רמב\"ם"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
