"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { trpc } from "@/lib/trpc";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { ArrowRight, ArrowLeft, Search, Play } from "lucide-react";

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

function TrackDetail({ slug }: { slug: string }) {
  const { data: track, isLoading } = trpc.track.bySlug.useQuery({ slug });
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-8 backdrop-blur-lg bg-white/80">
          <div className="h-8 bg-gray-200 rounded-lg w-1/2 mb-4 animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-6 animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[var(--color-cream)] flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-[var(--color-warm-gray)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-2">מסלול לא נמצא</h2>
        <p className="text-[var(--color-warm-gray)] mb-6">המסלול שחיפשת לא קיים או שהכתובת שגויה</p>
        <Link href="/join" className="btn-primary">חזרה לכל המסלולים</Link>
      </div>
    );
  }

  return (
    <AnimatedSection variant="fadeUp">
      <div className="max-w-2xl mx-auto">
        <Link href="/join" className="inline-flex items-center gap-2 text-sm text-[var(--color-blue-mid)] hover:text-[var(--color-gold)] mb-6 transition-colors group">
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          חזרה לכל המסלולים
        </Link>

        <div className="card p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-gold-light)]/20 flex items-center justify-center flex-shrink-0">
              <Image src="/icons/golden-gate.png" alt="" width={40} height={40} className="w-10 h-10 object-contain" />
            </div>
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

          {track.steps && track.steps.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-4">שלבי המסלול:</h3>
              <StaggerContainer className="space-y-3" stagger={0.06}>
                {track.steps.map((step) => (
                  <StaggerItem key={step.id}>
                    <div className="flex items-start gap-3 p-4 bg-[var(--color-cream)]/50 rounded-xl hover:bg-[var(--color-cream)] transition-colors group">
                      <div className="w-8 h-8 rounded-full gradient-gold text-white flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
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
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          <div className="text-center pt-4 border-t border-gray-100">
            {isLoggedIn ? (
              <Link href="/onboarding" className="btn-primary text-lg py-3 px-10 group">
                <span>התחל את המסלול</span>
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
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
    </AnimatedSection>
  );
}

function MitzvaDetail({ slug }: { slug: string }) {
  const { data: mitzva, isLoading } = trpc.mitzva.bySlug.useQuery({ slug });
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-8 backdrop-blur-lg bg-white/80">
          <div className="h-8 bg-gray-200 rounded-lg w-1/2 mb-4 animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-6 animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
        </div>
      </div>
    );
  }

  if (!mitzva) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[var(--color-cream)] flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-[var(--color-warm-gray)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-2">מצווה לא נמצאה</h2>
        <p className="text-[var(--color-warm-gray)] mb-6">המצווה שחיפשת לא קיימת או שהכתובת שגויה</p>
        <Link href="/join" className="btn-primary">חזרה לכל המצוות</Link>
      </div>
    );
  }

  const steps = mitzva.steps as Array<{ title?: string; description?: string }> | null;

  return (
    <AnimatedSection variant="fadeUp">
      <div className="max-w-2xl mx-auto">
        <Link href="/join" className="inline-flex items-center gap-2 text-sm text-[var(--color-blue-mid)] hover:text-[var(--color-gold)] mb-6 transition-colors group">
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          חזרה לכל המצוות
        </Link>

        <div className="card p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-gold-light)]/20 flex items-center justify-center flex-shrink-0">
              <Image src="/icons/candles.png" alt="" width={40} height={40} className="w-10 h-10 object-contain" />
            </div>
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

          {mitzva.shortDescription && (
            <div className="mb-6 p-4 bg-[var(--color-cream)]/50 rounded-xl">
              <p className="text-[var(--color-blue-deep)]">{mitzva.shortDescription}</p>
            </div>
          )}

          {steps && Array.isArray(steps) && steps.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-4">איך מתחילים:</h3>
              <StaggerContainer className="space-y-3" stagger={0.06}>
                {steps.map((step, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-3 p-4 bg-[var(--color-cream)]/50 rounded-xl hover:bg-[var(--color-cream)] transition-colors group">
                      <div className="w-8 h-8 rounded-full gradient-gold text-white flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                        {i + 1}
                      </div>
                      <div>
                        {step.title && <p className="font-semibold text-[var(--color-blue-deep)]">{step.title}</p>}
                        {step.description && <p className="text-sm text-[var(--color-warm-gray)] mt-1">{step.description}</p>}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          {mitzva.videoUrl && (
            <div className="mb-8">
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-3">סרטון הדרכה:</h3>
              <a
                href={mitzva.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-red-50 rounded-xl text-red-700 hover:bg-red-100 transition-colors group"
              >
                <Play className="w-6 h-6 transition-transform group-hover:scale-110" />
                <span className="font-medium">צפה בסרטון</span>
              </a>
            </div>
          )}

          <div className="text-center pt-4 border-t border-gray-100">
            {isLoggedIn ? (
              <Link href="/onboarding" className="btn-primary text-lg py-3 px-10 group">
                <span>קח על עצמך את המצווה</span>
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
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
    </AnimatedSection>
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

  const showDetail = selectedTrack || selectedMitzva;

  return (
    <div className="gradient-light min-h-screen">
      <PageHero
        title={showDetail ? "פרטי הצעד" : "כל צעד שלך מאיר את העולם"}
        subtitle={showDetail ? undefined : "בחר משהו אחד שתרצה לקחת על עצמך"}
        icon="golden-gate"
        gradient="gold"
      />

      <div className="container-main pb-20 -mt-4">
        {selectedTrack ? (
          <TrackDetail slug={selectedTrack} />
        ) : selectedMitzva ? (
          <MitzvaDetail slug={selectedMitzva} />
        ) : (
          <>
            {/* Tracks Section */}
            <section className="mb-16">
              <AnimatedSection variant="fadeUp">
                <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6">
                  מסלולים מוכנים
                </h2>
              </AnimatedSection>

              {tracksLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="card h-24 animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
                  ))}
                </div>
              ) : tracks.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.06}>
                  {tracks.map((track) => (
                    <StaggerItem key={track.slug}>
                      <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
                        <Link href={`/join?track=${track.slug}`} className="card group block">
                          <div className="flex items-start gap-3">
                            <div className="w-11 h-11 rounded-xl bg-[var(--color-gold-light)]/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                              <Image src="/icons/golden-gate.png" alt="" width={32} height={32} className="w-7 h-7 object-contain" />
                            </div>
                            <div>
                              <h3 className="font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
                                {track.name}
                              </h3>
                              <p className="text-sm text-[var(--color-warm-gray)] mb-2 line-clamp-2">{track.description}</p>
                              <span className="badge badge-blue text-xs">
                                {track.stepsCount || track._count?.steps || 0} שלבים
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <p className="text-center text-[var(--color-warm-gray)]">מסלולים יתווספו בקרוב...</p>
              )}
            </section>

            {/* Mitzvot Section */}
            <section>
              <AnimatedSection variant="fadeUp">
                <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6">
                  בחר מצווה ספציפית
                </h2>
              </AnimatedSection>

              {mitzvotLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="card py-4 h-16 animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
                  ))}
                </div>
              ) : mitzvot.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" stagger={0.04}>
                  {mitzvot.map((mitzva) => (
                    <StaggerItem key={mitzva.slug}>
                      <Link
                        href={`/join?mitzva=${mitzva.slug}`}
                        className="card group py-4 border-r-2 border-r-transparent hover:border-r-[var(--color-gold)]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[var(--color-gold-light)]/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <Image src="/icons/candles.png" alt="" width={24} height={24} className="w-6 h-6 object-contain" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors text-sm">
                              {mitzva.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-[var(--color-warm-gray)]">{mitzva.category}</span>
                              <DifficultyStars level={mitzva.difficulty} />
                            </div>
                          </div>
                          <ArrowLeft className="w-4 h-4 text-[var(--color-warm-gray)] group-hover:text-[var(--color-gold)] transition-colors" />
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <p className="text-center text-[var(--color-warm-gray)]">מצוות יתווספו בקרוב...</p>
              )}
            </section>

            {/* Not Sure */}
            <AnimatedSection variant="scaleUp" className="mt-16">
              <div className="card max-w-lg mx-auto p-8 bg-[var(--color-cream)]/50 text-center">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3">
                  <Image src="/icons/star-hands.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                </div>
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
            </AnimatedSection>
          </>
        )}
      </div>
    </div>
  );
}
