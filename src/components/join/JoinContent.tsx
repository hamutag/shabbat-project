"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trpc } from "@/lib/trpc";
import { useSession } from "next-auth/react";

function DifficultyStars({ level }: { level: string }) {
  const diffMap: Record<string, number> = { EASY: 1, MEDIUM: 2, HARD: 3 };
  const numLevel = diffMap[level] || 1;
  return (
    <span className="text-xs text-[var(--color-gold)]">
      {"★".repeat(numLevel)}{"☆".repeat(3 - numLevel)}
    </span>
  );
}

function DifficultyLabel({ level }: { level: string }) {
  const labels: Record<string, string> = { EASY: "קל", MEDIUM: "בינוני", HARD: "מאתגר" };
  return <span>{labels[level] || level}</span>;
}

// Detail view for a selected track
function TrackDetail({ slug }: { slug: string }) {
  const { data: track, isLoading } = trpc.track.bySlug.useQuery({ slug });
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <span className="text-4xl block mb-4">🔍</span>
        <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-2">מסלול לא נמצא</h2>
        <p className="text-[var(--color-warm-gray)] mb-6">המסלול שחיפשת לא קיים או שהכתובת שגויה</p>
        <Link href="/join" className="btn-primary">חזרה לכל המסלולים</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back link */}
      <Link href="/join" className="inline-flex items-center gap-2 text-sm text-[var(--color-blue-mid)] hover:text-[var(--color-gold)] mb-6 transition-colors">
        → חזרה לכל המסלולים
      </Link>

      <div className="card p-8">
        {/* Track header */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-4xl">{track.imageUrl || "📚"}</span>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)]">{track.name}</h2>
            <p className="text-[var(--color-warm-gray)] mt-1">{track.description}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="badge badge-blue text-xs">{track.stepsCount} שלבים</span>
              <span className="badge badge-gold text-xs">
                <DifficultyLabel level={track.difficulty} />
              </span>
              {track.durationDays && (
                <span className="badge text-xs">{track.durationDays} ימים</span>
              )}
            </div>
          </div>
        </div>

        {/* Steps */}
        {track.steps && track.steps.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-[var(--color-blue-deep)] mb-4">שלבי המסלול:</h3>
            <div className="space-y-3">
              {track.steps.map((step) => (
                <div key={step.id} className="flex items-start gap-3 p-4 bg-[var(--color-cream)] rounded-xl">
                  <div className="w-8 h-8 rounded-full gradient-gold text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.stepNumber}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-blue-deep)]">{step.title}</p>
                    {step.description && (
                      <p className="text-sm text-[var(--color-warm-gray)] mt-1">{step.description}</p>
                    )}
                    {step.taskDescription && (
                      <p className="text-xs text-[var(--color-gold)] mt-1">משימה: {step.taskDescription}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-4 border-t border-gray-100">
          {isLoggedIn ? (
            <Link href="/onboarding" className="btn-primary text-lg py-3 px-10">
              התחל את המסלול
            </Link>
          ) : (
            <div>
              <Link href={`/register?redirect=/onboarding`} className="btn-primary text-lg py-3 px-10">
                הצטרף והתחל את המסלול
              </Link>
              <p className="text-xs text-[var(--color-warm-gray)] mt-3">
                כבר רשום? <Link href={`/login?callbackUrl=/onboarding`} className="text-[var(--color-gold)] hover:underline">התחבר כאן</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Detail view for a selected mitzva
function MitzvaDetail({ slug }: { slug: string }) {
  const { data: mitzva, isLoading } = trpc.mitzva.bySlug.useQuery({ slug });
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6" />
        </div>
      </div>
    );
  }

  if (!mitzva) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <span className="text-4xl block mb-4">🔍</span>
        <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-2">מצווה לא נמצאה</h2>
        <p className="text-[var(--color-warm-gray)] mb-6">המצווה שחיפשת לא קיימת או שהכתובת שגויה</p>
        <Link href="/join" className="btn-primary">חזרה לכל המצוות</Link>
      </div>
    );
  }

  // Parse steps if stored as JSON
  const steps = mitzva.steps as Array<{ title?: string; description?: string }> | null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back link */}
      <Link href="/join" className="inline-flex items-center gap-2 text-sm text-[var(--color-blue-mid)] hover:text-[var(--color-gold)] mb-6 transition-colors">
        → חזרה לכל המצוות
      </Link>

      <div className="card p-8">
        {/* Mitzva header */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-4xl">{mitzva.iconUrl || "✨"}</span>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)]">{mitzva.name}</h2>
            <p className="text-[var(--color-warm-gray)] mt-1">{mitzva.description}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="badge badge-blue text-xs">{mitzva.category}</span>
              <span className="badge badge-gold text-xs">
                <DifficultyStars level={mitzva.difficulty} /> <DifficultyLabel level={mitzva.difficulty} />
              </span>
            </div>
          </div>
        </div>

        {/* Short description */}
        {mitzva.shortDescription && (
          <div className="mb-6 p-4 bg-[var(--color-cream)] rounded-xl">
            <p className="text-[var(--color-blue-deep)]">{mitzva.shortDescription}</p>
          </div>
        )}

        {/* Steps */}
        {steps && Array.isArray(steps) && steps.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-[var(--color-blue-deep)] mb-4">איך מתחילים:</h3>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[var(--color-cream)] rounded-xl">
                  <div className="w-8 h-8 rounded-full gradient-gold text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    {step.title && <p className="font-semibold text-[var(--color-blue-deep)]">{step.title}</p>}
                    {step.description && <p className="text-sm text-[var(--color-warm-gray)] mt-1">{step.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {mitzva.videoUrl && (
          <div className="mb-8">
            <h3 className="font-bold text-[var(--color-blue-deep)] mb-3">סרטון הדרכה:</h3>
            <a
              href={mitzva.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-red-50 rounded-xl text-red-700 hover:bg-red-100 transition-colors"
            >
              <span className="text-2xl">▶️</span>
              <span className="font-medium">צפה בסרטון</span>
            </a>
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-4 border-t border-gray-100">
          {isLoggedIn ? (
            <Link href="/onboarding" className="btn-primary text-lg py-3 px-10">
              קח על עצמך את המצווה
            </Link>
          ) : (
            <div>
              <Link href={`/register?redirect=/onboarding`} className="btn-primary text-lg py-3 px-10">
                הצטרף וקח על עצמך
              </Link>
              <p className="text-xs text-[var(--color-warm-gray)] mt-3">
                כבר רשום? <Link href={`/login?callbackUrl=/onboarding`} className="text-[var(--color-gold)] hover:underline">התחבר כאן</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JoinContent() {
  const searchParams = useSearchParams();
  const selectedTrack = searchParams.get("track");
  const selectedMitzva = searchParams.get("mitzva");

  const { data: mitzvotData, isLoading: mitzvotLoading } = trpc.mitzva.list.useQuery();
  const { data: tracksData, isLoading: tracksLoading } = trpc.track.list.useQuery();

  const mitzvot = mitzvotData || [];
  const tracks = tracksData || [];

  // Show detail view if a track or mitzva is selected
  const showDetail = selectedTrack || selectedMitzva;

  return (
    <div className="gradient-light min-h-screen">
      {/* Header */}
      <section className="py-16 text-center">
        <div className="container-main max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-blue-deep)] mb-4">
            {showDetail ? "פרטי הצעד" : "כל צעד שלך מאיר את העולם"}
          </h1>
          {!showDetail && (
            <p className="text-xl text-[var(--color-warm-gray)]">
              בחר משהו אחד שתרצה לקחת על עצמך
            </p>
          )}
        </div>
      </section>

      <div className="container-main pb-20">
        {selectedTrack ? (
          <TrackDetail slug={selectedTrack} />
        ) : selectedMitzva ? (
          <MitzvaDetail slug={selectedMitzva} />
        ) : (
          <>
            {/* Tracks Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6">
                מסלולים מוכנים
              </h2>
              {tracksLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="card h-24 animate-pulse bg-gray-100" />
                  ))}
                </div>
              ) : tracks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tracks.map((track) => (
                    <Link key={track.slug} href={`/join?track=${track.slug}`} className="card group">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{track.imageUrl || "📚"}</span>
                        <div>
                          <h3 className="font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
                            {track.name}
                          </h3>
                          <p className="text-sm text-[var(--color-warm-gray)] mb-2">{track.description}</p>
                          <span className="badge badge-blue text-xs">
                            {track.stepsCount || track._count?.steps || 0} שלבים
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-[var(--color-warm-gray)]">מסלולים יתווספו בקרוב...</p>
              )}
            </section>

            {/* Mitzvot Section */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6">
                בחר מצווה ספציפית
              </h2>
              {mitzvotLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="card py-4 h-16 animate-pulse bg-gray-100" />
                  ))}
                </div>
              ) : mitzvot.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {mitzvot.map((mitzva) => (
                    <Link
                      key={mitzva.slug}
                      href={`/join?mitzva=${mitzva.slug}`}
                      className="card group py-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mitzva.iconUrl || "✨"}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors text-sm">
                            {mitzva.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[var(--color-warm-gray)]">{mitzva.category}</span>
                            <DifficultyStars level={mitzva.difficulty} />
                          </div>
                        </div>
                        <span className="text-[var(--color-warm-gray)] group-hover:text-[var(--color-gold)] transition-colors">
                          ←
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-[var(--color-warm-gray)]">מצוות יתווספו בקרוב...</p>
              )}
            </section>

            {/* Not Sure */}
            <section className="mt-16 text-center">
              <div className="card max-w-lg mx-auto p-8 bg-[var(--color-cream)]">
                <span className="text-3xl mb-3 block">🤔</span>
                <h3 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
                  לא בטוח מה לבחור?
                </h3>
                <p className="text-[var(--color-warm-gray)] mb-4">
                  ענה על 3 שאלות קצרות ונמליץ לך על הצעד המתאים ביותר
                </p>
                <Link href="/onboarding" className="btn-primary">
                  עזור לי לבחור
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
