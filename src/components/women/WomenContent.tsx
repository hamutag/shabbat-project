"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc";

const WOMEN_TOPICS = [
  {
    icon: "🕯️",
    title: "הדלקת נרות שבת",
    description: "הדלקת הנרות היא מצווה מיוחדת לנשים שמכניסה אור וקדושה לבית",
    link: "/join?mitzva=hadlakat-nerot",
  },
  {
    icon: "🍞",
    title: "הפרשת חלה",
    description: "מצוות הפרשת חלה - סגולה עצומה לפרנסה, בריאות וילדים",
    link: "/join?mitzva=hafrashat-challah",
  },
  {
    icon: "🌊",
    title: "טהרת המשפחה",
    description: "טהרת המשפחה היא יסוד הבית היהודי ומקור הברכה",
    link: "/join?mitzva=tahara",
  },
  {
    icon: "🏡",
    title: "שלום בית",
    description: "שלום בית הוא הכלי לכל הברכות. טיפים ותכנים לחיזוק",
    link: "/join?mitzva=shalom-bayit",
  },
  {
    icon: "🙏",
    title: "תפילה",
    description: "תפילת האישה היא עמוד התווך של הבית. למדי להתפלל בפשטות",
    link: "/join?mitzva=tefilla",
  },
  {
    icon: "📿",
    title: "צניעות",
    description: "צניעות היא כתר של כבוד. גלי את הכוח הפנימי שלך",
    link: "/join?mitzva=tzniut",
  },
];

const WOMEN_TRACKS = [
  {
    icon: "✨",
    title: "מסלול לנשים",
    description: "מסלול מותאם במיוחד לנשים - הדלקת נרות, הפרשת חלה ועוד",
    slug: "women-track",
    steps: 8,
  },
  {
    icon: "🕯️",
    title: "שבת למתחילות",
    description: "איך לשמור שבת ראשונה - מדריך צעד אחר צעד",
    slug: "shabbat-beginners",
    steps: 7,
  },
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
          <span className="text-5xl block mb-4">👩</span>
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
                <span className="text-4xl block mb-3">{topic.icon}</span>
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
                  <span className="text-3xl">{track.icon}</span>
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
              <div
                key={i}
                className="quote-box"
              >
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
            {[
              { href: "/content?category=shabbat", label: "שבת", icon: "🕯️" },
              { href: "/content?category=tahara", label: "טהרה", icon: "🌊" },
              { href: "/content?category=shalom-bayit", label: "שלום בית", icon: "🏡" },
              { href: "/content?category=family", label: "בית יהודי", icon: "👨‍👩‍👧‍👦" },
              { href: "/content?category=emunah", label: "אמונה", icon: "💫" },
              { href: "/content?category=tefilla", label: "תפילה", icon: "🙏" },
              { href: "/content?category=challah", label: "חלה", icon: "🍞" },
              { href: "/content?category=stories", label: "סיפורים", icon: "📖" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card py-4 text-center group hover:shadow-md transition-all"
              >
                <span className="text-2xl block mb-1">{item.icon}</span>
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
            <span className="text-3xl mb-3 block">📖</span>
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
