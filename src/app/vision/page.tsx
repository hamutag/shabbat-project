import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "חזון",
  description: "החזון של פרויקט השבת - לאחד את עם ישראל סביב קדושת השבת",
};

export default function VisionPage() {
  return (
    <div className="gradient-light">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="container-main max-w-3xl">
          <span className="text-5xl mb-6 block">🕯️</span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-blue-deep)] mb-6">
            החזון שלנו
          </h1>
          <p className="text-xl text-[var(--color-gold)] font-semibold">
            שתי שבתות של אחדות וגאולה
          </p>
        </div>
      </section>

      {/* Vision Content */}
      <section className="py-16">
        <div className="container-main max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm space-y-6 text-lg leading-relaxed text-[var(--color-blue-deep)]">
            <p>
              בדור שבו עם ישראל ניצב מול אתגרים גדולים, איומים מבחוץ ובלבול
              גדול מבפנים, ומתוך תחושה עמוקה כי אנו חיים בתקופה של התעוררות
              ושל סימני גאולה — אנו מאמינים שאין זו עת לעמוד מן הצד, אלא עת
              לקום, לפעול, להתחזק ולהוסיף אור.
            </p>

            <p>
              פרויקט השבת הוא תנועה ארצית רחבה שמטרתה לאחד את עם ישראל סביב
              קדושת השבת, לחזק כל יהודי ויהודייה בצעד מעשי אחד קדימה, ולעורר
              מהלך חי, עמוק ומתמשך של קירוב לבבות, אמונה, ביטחון בה&apos;
              יתברך, אהבת ישראל, חיבור לתורה ושמירת מצוות.
            </p>

            <div className="quote-box my-8">
              <p className="text-xl">
                אנו מאמינים כי כל יהודי מסוגל להתקדם.
                <br />
                לא הכול בבת אחת. לא מתוך כפייה. לא מתוך לחץ.
                <br />
                אלא מתוך חום, אמת, ליווי, הקשבה ואהבה.
              </p>
            </div>

            <p className="font-semibold text-xl text-center text-[var(--color-gold)]">
              כוחו של המיזם טמון בפשטות הגדולה שלו:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-8">
              {[
                "עוד מצווה אחת",
                "עוד שבת אחת",
                "עוד שיעור תורה",
                "עוד תפילין",
                "עוד תפילה",
                "עוד קבלה טובה",
                "עוד לב יהודי שנפתח",
                "עוד נשמה שמתחברת",
                "עוד בית שמתחזק",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-[var(--color-cream)] rounded-lg p-3 text-center text-sm font-medium"
                >
                  {item}
                </div>
              ))}
            </div>

            <p>
              אנו מאמינים שאין מעשה קטן בעם ישראל. כל צעד של קדושה, אפילו
              הקטן ביותר, מוסיף אור עצום לעולם. כל יהודי שמתחזק משפיע על
              ביתו. כל בית שמתחזק משפיע על סביבתו. וכלל הצעדים הקטנים של עם
              ישראל מצטרפים לבניין רוחני עצום.
            </p>

            <p className="text-center font-semibold text-xl mt-8">
              השבת היא הלב של עם ישראל.
              <br />
              השבת היא מקור הברכה.
              <br />
              השבת היא המקום שבו יהודי שב לעצמו, לביתו, למשפחתו ולשורשו.
            </p>
          </div>

          {/* Values */}
          <div className="mt-16">
            <h2 className="section-title">ערכי היסוד שלנו</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {[
                { icon: "❤️", name: "אהבת ישראל" },
                { icon: "🕯️", name: "קדושת השבת" },
                { icon: "💫", name: "אמונה וביטחון" },
                { icon: "🤝", name: "קירוב מתוך חום" },
                { icon: "🚶", name: "צעדים מעשיים" },
                { icon: "👤", name: "ליווי אישי" },
                { icon: "🤲", name: "אחדות" },
                { icon: "📖", name: "תורה לכל יהודי" },
                { icon: "🔗", name: "חיבור ולא כפייה" },
                { icon: "🎯", name: "כבוד לכל אדם" },
                { icon: "💬", name: "שפה מכבדת" },
                { icon: "🌅", name: "תקווה לגאולה" },
              ].map((value) => (
                <div key={value.name} className="card text-center py-6">
                  <span className="text-2xl mb-2 block">{value.icon}</span>
                  <span className="font-semibold text-sm">{value.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
