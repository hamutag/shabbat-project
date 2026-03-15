"use client";

import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/lib/trpc";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const WOMEN_TOPICS = [
  {
    icon: "candles",
    title: "הדלקת נרות שבת",
    description: "הדלקת הנרות היא מצווה מיוחדת לנשים שמכניסה אור וקדושה לבית",
    link: "/join?mitzva=hadlakat-nerot",
  },
  {
    icon: "challah-braid",
    title: "הפרשת חלה",
    description: "מצוות הפרשת חלה - סגולה עצומה לפרנסה, בריאות וילדים",
    link: "/join?mitzva=hafrashat-challah",
  },
  {
    icon: "star-circle",
    title: "טהרת המשפחה",
    description: "טהרת המשפחה היא יסוד הבית היהודי ומקור הברכה",
    link: "/join?mitzva=tahara",
  },
  {
    icon: "synagogue",
    title: "שלום בית",
    description: "שלום בית הוא הכלי לכל הברכות. טיפים ותכנים לחיזוק",
    link: "/join?mitzva=shalom-bayit",
  },
  {
    icon: "hands-light",
    title: "תפילה",
    description: "תפילת האישה היא עמוד התווך של הבית. למדי להתפלל בפשטות",
    link: "/join?mitzva=tefilla",
  },
  {
    icon: "crown",
    title: "צניעות",
    description: "צניעות היא כתר של כבוד. גלי את הכוח הפנימי שלך",
    link: "/join?mitzva=tzniut",
  },
];

const WOMEN_TRACKS = [
  {
    icon: "candle-holder",
    title: "מסלול לנשים",
    description: "מסלול מותאם במיוחד לנשים - הדלקת נרות, הפרשת חלה ועוד",
    slug: "women-track",
    steps: 8,
  },
  {
    icon: "candles",
    title: "שבת למתחילות",
    description: "איך לשמור שבת ראשונה - מדריך צעד אחר צעד",
    slug: "shabbat-beginners",
    steps: 7,
  },
];

const CONTENT_LINKS = [
  { href: "/content?category=shabbat", label: "שבת", icon: "candles" },
  { href: "/content?category=tahara", label: "טהרה", icon: "star-circle" },
  { href: "/content?category=shalom-bayit", label: "שלום בית", icon: "synagogue" },
  { href: "/content?category=family", label: "בית יהודי", icon: "community" },
  { href: "/content?category=emunah", label: "אמונה", icon: "star-hands" },
  { href: "/content?category=tefilla", label: "תפילה", icon: "hands-light" },
  { href: "/content?category=challah", label: "חלה", icon: "challah-plate" },
  { href: "/content?category=stories", label: "סיפורים", icon: "open-torah" },
];

const INSPIRATION = [
  {
    quote: "בזכות נשים צדקניות נגאלו ישראל ממצרים, ובזכות נשים צדקניות עתידים להיגאל",
    source: "סוטה יא:",
  },
  {
    quote: "גדולה הבטחה שהבטיח הקב\"ה לנשים יותר מן האנשים",
    source: "ברכות יז.",
  },
  {
    quote: "אישה כשרה עושה רצון בעלה",
    source: "תנא דבי אליהו",
  },
];

export default function WomenContent() {
  const { data: dailyQuote } = trpc.content.dailyQuote.useQuery();

  return (
    <div className="min-h-screen">
      <PageHero
        title="מרכז חיזוק לנשים"
        subtitle="בזכות נשים צדקניות נגאלו ישראל. כל מצווה שלך מאירה את הבית, המשפחה והעולם כולו."
        icon="candle-holder"
        gradient="rose"
      />

      <div className="container-main pb-20">
        {/* Topics Grid */}
        <section className="mb-16">
          <AnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
              מצוות מיוחדות לנשים
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
            {WOMEN_TOPICS.map((topic) => (
              <StaggerItem key={topic.title}>
                <Link
                  href={topic.link}
                  className="card group p-6 text-center block h-full"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-xl bg-[var(--color-women-pink)]/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Image src={`/icons/${topic.icon}.png`} alt={topic.title} width={48} height={48} className="w-10 h-10 object-contain" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                    {topic.description}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Tracks for Women */}
        <section className="mb-16">
          <AnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
              מסלולים לנשים
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto" stagger={0.1}>
            {WOMEN_TRACKS.map((track) => (
              <StaggerItem key={track.slug}>
                <Link
                  href={`/join?track=${track.slug}`}
                  className="card group p-6 block h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-women-pink)]/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Image src={`/icons/${track.icon}.png`} alt={track.title} width={40} height={40} className="w-9 h-9 object-contain" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-sm text-[var(--color-warm-gray)] mb-2">
                        {track.description}
                      </p>
                      <span className="badge badge-gold text-xs">
                        {track.steps} שלבים
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Inspiration */}
        <section className="mb-16">
          <AnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
              השראה וחיזוק
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-4 max-w-2xl mx-auto" stagger={0.12}>
            {INSPIRATION.map((item, i) => (
              <StaggerItem key={i}>
                <div className="quote-box relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-gold)]/10 rounded-full blur-2xl" />
                  <p className="text-lg leading-relaxed relative z-10">{item.quote}</p>
                  <p className="text-xs mt-2 text-[var(--color-gold)] opacity-70 relative z-10">
                    — {item.source}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Daily Quote */}
        {dailyQuote && (
          <AnimatedSection variant="fadeUp" className="mb-16">
            <div className="quote-box max-w-2xl mx-auto">
              <h3 className="text-sm text-[var(--color-gold)] mb-4 font-sans font-bold">
                חיזוק היום
              </h3>
              <p className="relative z-10 text-xl">{dailyQuote.text}</p>
              {dailyQuote.source && (
                <p className="text-xs mt-3 text-[var(--color-gold)] opacity-70">
                  — {dailyQuote.source}
                </p>
              )}
            </div>
          </AnimatedSection>
        )}

        {/* Content Links */}
        <section className="mb-16">
          <AnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
              תכנים לנשים
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto" stagger={0.05}>
            {CONTENT_LINKS.map((item) => (
              <StaggerItem key={item.href}>
                <Link
                  href={item.href}
                  className="card py-4 text-center group block"
                >
                  <div className="flex justify-center mb-1">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <Image src={`/icons/${item.icon}.png`} alt={item.label} width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
                    {item.label}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Torah Lessons CTA */}
        <AnimatedSection variant="scaleUp" className="mb-16">
          <div className="card max-w-2xl mx-auto p-8 bg-[var(--color-cream)] text-center">
            <div className="flex justify-center mb-3">
              <Image src="/icons/open-torah.png" alt="שיעורי תורה" width={48} height={48} className="w-12 h-12 object-contain" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
              שיעורי תורה לנשים
            </h3>
            <p className="text-[var(--color-warm-gray)] mb-4">
              מצאי שיעור תורה קרוב אלייך - שיעורים ייעודיים לנשים בכל הארץ
            </p>
            <Link href="/lessons" className="btn-primary">
              חפשי שיעור
            </Link>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection variant="scaleUp">
          <div className="card max-w-lg mx-auto p-8 text-center gradient-gold text-white rounded-2xl">
            <h3 className="text-2xl font-black mb-3">
              התחילי את המסע שלך
            </h3>
            <p className="text-white/90 mb-6">
              בחרי מצווה אחת שמתאימה לך ותתחילי להאיר
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-blue-deep)] font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              הצטרפי עכשיו
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
