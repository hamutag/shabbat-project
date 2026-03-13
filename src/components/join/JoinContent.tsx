"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc";

function DifficultyStars({ level }: { level: string }) {
  const diffMap: Record<string, number> = { EASY: 1, MEDIUM: 2, HARD: 3 };
  const numLevel = diffMap[level] || 1;
  return (
    <span className="text-xs text-[var(--color-gold)]">
      {"★".repeat(numLevel)}{"☆".repeat(3 - numLevel)}
    </span>
  );
}

export default function JoinContent() {
  const { data: mitzvotData, isLoading: mitzvotLoading } = trpc.mitzva.list.useQuery();
  const { data: tracksData, isLoading: tracksLoading } = trpc.track.list.useQuery();

  const mitzvot = mitzvotData || [];
  const tracks = tracksData || [];

  return (
    <div className="gradient-light min-h-screen">
      {/* Header */}
      <section className="py-16 text-center">
        <div className="container-main max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-blue-deep)] mb-4">
            כל צעד שלך מאיר את העולם
          </h1>
          <p className="text-xl text-[var(--color-warm-gray)]">
            בחר משהו אחד שתרצה לקחת על עצמך
          </p>
        </div>
      </section>

      <div className="container-main pb-20">
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
                <Link key={track.slug} href={`/join/${track.slug}`} className="card group">
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
                  href={`/join/mitzva/${mitzva.slug}`}
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
      </div>
    </div>
  );
}
