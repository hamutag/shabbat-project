"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const TRACKS = [
  {
    slug: "shabbat-beginners",
    name: "שבת למתחילים",
    desc: "מדריך צעד אחר צעד לשמירת שבת ראשונה",
    icon: "candles",
    steps: 4,
    difficulty: "קל",
  },
  {
    slug: "foundations-of-faith",
    name: "יסודות האמונה",
    desc: "שיעורים יומיים קצרים על אמונה וביטחון",
    icon: "star-hands",
    steps: 3,
    difficulty: "קל",
  },
  {
    slug: "morning-routine",
    name: "שגרת בוקר יהודית",
    desc: "תפילין, ברכות השחר, ונטילת ידיים כל בוקר",
    icon: "kippah-star",
    steps: 3,
    difficulty: "קל",
  },
  {
    slug: "womens-track",
    name: "מסלול לנשים",
    desc: "הדלקת נרות, הפרשת חלה, ועוד - מסלול מיוחד",
    icon: "candle-holder",
    steps: 3,
    difficulty: "קל",
  },
  {
    slug: "world-of-brachot",
    name: "עולם הברכות",
    desc: "ללמוד את כל הברכות הבסיסיות",
    icon: "hand-kiddush",
    steps: 3,
    difficulty: "קל",
  },
  {
    slug: "full-shabbat",
    name: "שבת מלאה",
    desc: "שמירת שבת מלאה מכניסה ועד צאת - מסלול מתקדם",
    icon: "star-david",
    steps: 5,
    difficulty: "מאתגר",
  },
];

export function PopularTracks() {
  return (
    <section className="py-20 relative">
      <div className="container-main">
        <AnimatedSection variant="fadeUp">
          <h2 className="section-title">מסלולים פופולריים</h2>
          <p className="section-subtitle">
            בחר מסלול התחזקות שמתאים לך ותתחיל עוד היום
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {TRACKS.map((track) => (
            <StaggerItem key={track.slug}>
              <motion.div whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={`/join?track=${track.slug}`}
                  className="card group block border-r-2 border-r-transparent hover:border-r-[var(--color-gold)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-[var(--color-gold-light)]/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--color-gold-light)]/40 group-hover:scale-105">
                        <Image
                          src={`/icons/${track.icon}.png`}
                          alt={track.name}
                          width={40}
                          height={40}
                          className="w-9 h-9 object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors mb-1">
                        {track.name}
                      </h3>
                      <p className="text-sm text-[var(--color-warm-gray)] mb-3 leading-relaxed">
                        {track.desc}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="badge badge-blue text-xs">
                          {track.steps} שלבים
                        </span>
                        <span className="badge badge-gold text-xs">
                          {track.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection variant="fadeUp" delay={0.4}>
          <div className="text-center mt-10">
            <Link href="/join" className="btn-primary">
              ראה את כל המסלולים
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
