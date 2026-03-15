import Link from "next/link";
import Image from "next/image";

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
    <section className="py-20">
      <div className="container-main">
        <h2 className="section-title">מסלולים פופולריים</h2>
        <p className="section-subtitle">
          בחר מסלול התחזקות שמתאים לך ותתחיל עוד היום
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRACKS.map((track) => (
            <Link
              key={track.slug}
              href={`/join?track=${track.slug}`}
              className="card group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image src={`/icons/${track.icon}.png`} alt={track.name} width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors mb-1">
                    {track.name}
                  </h3>
                  <p className="text-sm text-[var(--color-warm-gray)] mb-3">
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
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/join" className="btn-primary">
            ראה את כל המסלולים
          </Link>
        </div>
      </div>
    </section>
  );
}
