"use client";

import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/lib/trpc";

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
    <div className="gradient-light min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <div className="container-main max-w-3xl">
          <div className="flex justify-center mb-4">
            <Image src="/icons/candle-holder.png" alt="מרכז לנשים" width={64} height={64} className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-blue-deep)] mb-4">
            מרכז חיזוק לנשים
          </h1>
          <p className="text-xl text-[var(--color-warm-gray)] leading-relaxed">
            בזכות נשים צדקניות נגאלו ישראל.
            <br />
            כל מצווה שלך מאירה את הבית, המשפחה והעולם כולו.
          </p>
        </div>
      </section>

      <div className="container-main pb-20">
        {/* Topics Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
            מצוות מיוחדות לנשים
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WOMEN_TOPICS.map((topic) => (
              <Link
                key={topic.title}
                href={topic.link}
                className="card group p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-3">
                  <Image src={`/icons/${topic.icon}.png`} alt={topic.title} width={48} height={48} className="w-12 h-12 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors mb-2">
                  {topic.title}
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Tracks for Women */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
            מסלולים לנשים
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {WOMEN_TRACKS.map((track) => (
              <Link
                key={track.slug}
                href={`/join?track=${track.slug}`}
                className="card group p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Image src={`/icons/${track.icon}.png`} alt={track.title} width={40} height={40} className="w-10 h-10 object-contain" />
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
            ))}
          </div>
        </section>

        {/* Inspiration */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
            השראה וחיזוק
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {INSPIRATION.map((item, i) => (
              <div key={i} className="quote-box">
                <p className="text-lg leading-relaxed">{item.quote}</p>
                <p className="text-xs mt-2 text-[var(--color-gold)] opacity-70">
                  — {item.source}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Quote */}
        {dailyQuote && (
          <section className="mb-16">
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
          </section>
        )}

        {/* Content Links */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
            תכנים לנשים
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {CONTENT_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card py-4 text-center group hover:shadow-md transition-all"
              >
                <div className="flex justify-center mb-1">
                  <Image src={`/icons/${item.icon}.png`} alt={item.label} width={32} height={32} className="w-8 h-8 object-contain" />
                </div>
                <span className="text-sm font-medium text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Lessons for Women */}
        <section className="mb-16">
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
        </section>

        {/* CTA */}
        <section>
          <div className="card max-w-lg mx-auto p-8 text-center gradient-gold text-white rounded-2xl">
            <h3 className="text-2xl font-black mb-3">
              התחילי את המסע שלך
            </h3>
            <p className="text-white/90 mb-6">
              בחרי מצווה אחת שמתאימה לך ותתחילי להאיר
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-blue-deep)] font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors"
            >
              הצטרפי עכשיו
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
