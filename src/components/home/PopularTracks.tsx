import Link from "next/link";

const TRACKS = [
  {
    slug: "shabbat-beginners",
    name: "שבת למתחילים",
    desc: "מדריך צעד אחר צעד לשמירת שבת ראשונה",
    icon: "🕯️",
    steps: 7,
    difficulty: "קל",
  },
  {
    slug: "emunah",
    name: "אמונה וביטחון",
    desc: "מסלול לחיזוק האמונה והביטחון בחיי היומיום",
    icon: "💫",
    steps: 10,
    difficulty: "קל",
  },
  {
    slug: "tefillin",
    name: "תפילין",
    desc: "למד להניח תפילין ולהפוך את זה להרגל יומי",
    icon: "📿",
    steps: 5,
    difficulty: "קל",
  },
  {
    slug: "women-track",
    name: "מסלול לנשים",
    desc: "הדלקת נרות, הפרשת חלה, ועוד - מסלול מיוחד",
    icon: "✨",
    steps: 8,
    difficulty: "קל",
  },
  {
    slug: "brachot",
    name: "ברכות ונטילת ידיים",
    desc: "התחל עם ברכות הנהנין ונטילת ידיים",
    icon: "🙏",
    steps: 6,
    difficulty: "קל",
  },
  {
    slug: "two-shabbatot",
    name: "שתי שבתות",
    desc: "המסלול המרכזי - שתי שבתות רצופות של קדושה",
    icon: "🌟",
    steps: 14,
    difficulty: "בינוני",
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
                <div className="text-3xl">{track.icon}</div>
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
