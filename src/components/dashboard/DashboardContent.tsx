"use client";

import Link from "next/link";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function DashboardContent() {
  const { data: user, isLoading: userLoading } = trpc.user.me.useQuery();
  const { data: stats, isLoading: statsLoading } = trpc.user.getStats.useQuery();
  const { data: mitzvot, isLoading: mitzvotLoading } = trpc.mitzva.myMitzvot.useQuery();
  const { data: lessons, isLoading: lessonsLoading } = trpc.lesson.myLessons.useQuery();
  const { data: shabbatStreak } = trpc.shabbat.streak.useQuery();
  const { data: mentor } = trpc.mentoring.myMentor.useQuery();
  const { data: dailyQuote } = trpc.content.dailyQuote.useQuery();

  const [shabbatLogged, setShabbatLogged] = useState(false);
  const [mentorRequested, setMentorRequested] = useState(false);
  const utils = trpc.useUtils();

  const requestMentor = trpc.mentoring.requestMentor.useMutation({
    onSuccess: (data) => {
      if (data.status === "created") {
        setMentorRequested(true);
      }
    },
  });

  const logShabbat = trpc.shabbat.log.useMutation({
    onSuccess: () => {
      setShabbatLogged(true);
      utils.shabbat.streak.invalidate();
      utils.shabbat.history.invalidate();
      utils.user.getStats.invalidate();
    },
  });

  const handleLogShabbat = (kept: boolean) => {
    // Get last Friday's date
    const now = new Date();
    const dayOfWeek = now.getDay();
    const fridayOffset = dayOfWeek === 6 ? 0 : dayOfWeek === 0 ? 1 : dayOfWeek + 1;
    const lastFriday = new Date(now);
    lastFriday.setDate(now.getDate() - fridayOffset);
    logShabbat.mutate({
      date: lastFriday.toISOString().split("T")[0],
      kept,
    });
  };

  const isLoading = userLoading || statsLoading;

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8">
        <div className="container-main">
          <div className="card p-6 mb-6">
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-4 space-y-2">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const firstName = user?.firstName || "חבר";
  const userMitzvot = mitzvot || [];
  const userLessons = lessons || [];

  return (
    <div className="gradient-light min-h-screen py-8">
      <div className="container-main">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-blue-deep)]">
            שלום, {firstName}! 👋
          </h1>
          <p className="text-[var(--color-warm-gray)]">
            כל צעד שלך חשוב. המשך להתחזק!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Mitzvot */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[var(--color-blue-deep)]">
                  המצוות שלי
                </h2>
                <Link href="/my-mitzvot" className="text-sm text-[var(--color-gold)] hover:underline">
                  ראה הכל →
                </Link>
              </div>

              {mitzvotLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : userMitzvot.length > 0 ? (
                <div className="space-y-4">
                  {userMitzvot.slice(0, 3).map((um) => {
                    const progress = um.progressLevel || 0;
                    const statusLabel = progress >= 80 ? "שומר" : progress >= 40 ? "בתהליך" : "התחלה";
                    const statusClass = progress >= 80 ? "badge-success" : progress >= 40 ? "badge-blue" : "badge-gold";

                    return (
                      <div key={um.id} className="flex items-center gap-4 p-4 bg-[var(--color-cream)] rounded-xl">
                        <span className="text-2xl">{um.mitzva?.iconUrl || "✨"}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--color-blue-deep)]">
                            {um.mitzva?.name || "מצווה"}
                          </h3>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="gradient-gold h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-[var(--color-warm-gray)] mt-1">
                            {progress}%
                          </p>
                        </div>
                        <span className={`badge ${statusClass} text-xs`}>
                          {statusLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-[var(--color-warm-gray)]">
                  <span className="text-3xl block mb-2">🕯️</span>
                  <p className="text-sm mb-3">עדיין לא בחרת מצוות</p>
                  <Link href="/join" className="btn-primary text-sm px-4 py-2">
                    בחר מצוות
                  </Link>
                </div>
              )}

              <Link href="/join" className="inline-flex items-center gap-1 text-sm text-[var(--color-gold)] font-medium mt-4 hover:underline">
                + הוסף מצווה חדשה
              </Link>
            </div>

            {/* Upcoming Lessons */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[var(--color-blue-deep)]">
                  שיעורים קרובים
                </h2>
                <Link href="/lessons" className="text-sm text-[var(--color-gold)] hover:underline">
                  מצא שיעורים →
                </Link>
              </div>

              {lessonsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : userLessons.length > 0 ? (
                <div className="space-y-3">
                  {userLessons.slice(0, 3).map((reg) => {
                    const lesson = reg.lesson;
                    if (!lesson) return null;
                    const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
                    const dayLabel = typeof lesson.dayOfWeek === "number" ? days[lesson.dayOfWeek] : "";

                    return (
                      <div key={reg.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl">
                        <div className="text-center min-w-[60px]">
                          <div className="text-sm font-bold text-[var(--color-gold)]">
                            יום {dayLabel}
                          </div>
                          <div className="text-lg font-black text-[var(--color-blue-deep)]">
                            {lesson.time || ""}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{lesson.title}</h4>
                          <p className="text-xs text-[var(--color-warm-gray)]">
                            {lesson.rabbiName}{lesson.address ? ` | ${lesson.address}` : ""}
                          </p>
                        </div>
                        <span className="text-xs badge badge-gold">נרשם</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-[var(--color-warm-gray)]">
                  <span className="text-3xl block mb-2">📖</span>
                  <p className="text-sm mb-3">אין שיעורים קרובים</p>
                  <Link href="/lessons" className="btn-primary text-sm px-4 py-2">
                    מצא שיעורים
                  </Link>
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4">
                ההתקדמות שלי
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[var(--color-cream)] rounded-xl">
                  <span className="text-2xl block mb-1">🕯️</span>
                  <div className="text-2xl font-black text-[var(--color-gold)]">
                    {shabbatStreak?.totalKept || stats?.shabbatCount || 0}
                  </div>
                  <div className="text-xs text-[var(--color-warm-gray)]">שבתות ששמרתי</div>
                </div>
                <div className="text-center p-4 bg-[var(--color-cream)] rounded-xl">
                  <span className="text-2xl block mb-1">🔥</span>
                  <div className="text-2xl font-black text-[var(--color-gold)]">
                    {shabbatStreak?.currentStreak || 0}
                  </div>
                  <div className="text-xs text-[var(--color-warm-gray)]">רצף נוכחי</div>
                </div>
                <div className="text-center p-4 bg-[var(--color-cream)] rounded-xl">
                  <span className="text-2xl block mb-1">📖</span>
                  <div className="text-2xl font-black text-[var(--color-gold)]">
                    {stats?.lessonsAttended || 0}
                  </div>
                  <div className="text-xs text-[var(--color-warm-gray)]">שיעורים</div>
                </div>
                <div className="text-center p-4 bg-[var(--color-cream)] rounded-xl">
                  <span className="text-2xl block mb-1">✨</span>
                  <div className="text-2xl font-black text-[var(--color-gold)]">
                    {stats?.totalMitzvot || 0}
                  </div>
                  <div className="text-xs text-[var(--color-warm-gray)]">מצוות פעילות</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shabbat Log */}
            <div className="card p-6 border-2 border-[var(--color-gold)]/30">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-3">
                🕯️ דיווח שבת
              </h3>
              {shabbatLogged ? (
                <div className="text-center py-4">
                  <span className="text-3xl block mb-2">🎉</span>
                  <p className="font-semibold text-[var(--color-blue-deep)]">תודה על הדיווח!</p>
                  <p className="text-sm text-[var(--color-warm-gray)] mt-1">
                    כל שבת שלך היא אור לעולם
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[var(--color-warm-gray)] mb-4">
                    האם שמרת שבת השבוע?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLogShabbat(true)}
                      disabled={logShabbat.isPending}
                      className="btn-primary text-sm py-2 flex-1 disabled:opacity-60"
                    >
                      {logShabbat.isPending ? "שומר..." : "✅ כן, שמרתי!"}
                    </button>
                    <button
                      onClick={() => handleLogShabbat(false)}
                      disabled={logShabbat.isPending}
                      className="btn-secondary text-sm py-2 flex-1 disabled:opacity-60"
                    >
                      בשבוע הבא
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Daily Chizuk */}
            <div className="quote-box text-base">
              <p className="relative z-10">
                {dailyQuote?.text || "הקב\"ה לא מבקש אלא לפי כוחו של כל אחד ואחד"}
              </p>
              <p className="text-xs mt-3 text-[var(--color-gold)] opacity-70">
                — {dailyQuote?.source || "מדרש רבה"}
              </p>
            </div>

            {/* My Mentor */}
            <div className="card p-6">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-3">
                המלווה שלי
              </h3>
              {mentor ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-blue-light)] flex items-center justify-center text-xl">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold">
                        {mentor.mentor?.firstName} {mentor.mentor?.lastName}
                      </p>
                      <p className="text-xs text-[var(--color-warm-gray)]">
                        פעיל מלווה
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {mentor.mentor?.phone && (
                      <a
                        href={`tel:${mentor.mentor.phone}`}
                        className="btn-primary text-xs py-2 px-3 flex-1 text-center"
                      >
                        📞 התקשר
                      </a>
                    )}
                    <a
                      href={`https://wa.me/972${mentor.mentor?.phone?.replace(/^0/, "").replace(/-/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs py-2 px-3 flex-1 text-center"
                    >
                      💬 וואטסאפ
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-[var(--color-warm-gray)]">
                  <span className="text-2xl block mb-2">🤝</span>
                  {mentorRequested || requestMentor.data?.status === "already_exists" ? (
                    <>
                      <p className="text-sm font-medium text-green-600">הבקשה נשלחה בהצלחה!</p>
                      <p className="text-xs mt-1">נשבץ לך מלווה אישי בהקדם</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm mb-3">רוצה מלווה אישי שילווה אותך במסע?</p>
                      <button
                        onClick={() => requestMentor.mutate({})}
                        disabled={requestMentor.isPending}
                        className="btn-primary text-sm py-2 px-6"
                      >
                        {requestMentor.isPending ? "שולח..." : "בקש מלווה אישי"}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Refer a Friend */}
            <div className="card p-6 bg-[var(--color-cream)]">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-2">
                🤝 כל אחד מקרב שניים
              </h3>
              <p className="text-sm text-[var(--color-warm-gray)] mb-3">
                הזמן חבר, שכן או בן משפחה להתחזק איתך
              </p>
              <button className="btn-primary text-sm w-full">
                הזמן חבר
              </button>
            </div>

            {/* Quick Links */}
            <div className="card p-6">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-3">
                קישורים מהירים
              </h3>
              <div className="space-y-2">
                <Link href="/my-mitzvot" className="flex items-center gap-2 p-2 hover:bg-[var(--color-cream)] rounded-lg text-sm transition-colors">
                  🕯️ המצוות שלי
                </Link>
                <Link href="/lessons" className="flex items-center gap-2 p-2 hover:bg-[var(--color-cream)] rounded-lg text-sm transition-colors">
                  📖 שיעורים קרובים
                </Link>
                <Link href="/content" className="flex items-center gap-2 p-2 hover:bg-[var(--color-cream)] rounded-lg text-sm transition-colors">
                  📝 מרכז תוכן
                </Link>
                <Link href="/progress" className="flex items-center gap-2 p-2 hover:bg-[var(--color-cream)] rounded-lg text-sm transition-colors">
                  📊 התקדמות
                </Link>
                <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-[var(--color-cream)] rounded-lg text-sm transition-colors">
                  ⚙️ הגדרות
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
