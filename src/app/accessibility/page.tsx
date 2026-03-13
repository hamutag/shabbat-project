import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "הצהרת נגישות | פרויקט השבת",
  description: "הצהרת נגישות של אתר פרויקט השבת",
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[var(--color-blue-deep)] text-white py-12">
        <div className="container-main text-center">
          <h1 className="text-3xl md:text-4xl font-bold">הצהרת נגישות</h1>
          <p className="text-blue-200 mt-2">עדכון אחרון: מרץ 2026</p>
        </div>
      </div>

      <div className="container-main py-12 max-w-3xl">
        <div className="prose prose-lg mx-auto text-right space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">מחויבות לנגישות</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              פרויקט השבת מחויב להנגיש את האתר והשירותים שלו לכלל הציבור, כולל אנשים
              עם מוגבלויות. אנו פועלים בהתאם לתקן הישראלי לנגישות אתרי אינטרנט
              (ת&quot;י 5568) ולהנחיות WCAG 2.1 ברמת AA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">פעולות שננקטו</h2>
            <ul className="text-[var(--color-warm-gray)] space-y-2 list-disc list-inside">
              <li>תמיכה בכיוון RTL (ימין לשמאל) לעברית</li>
              <li>ניגודיות צבעים ברמה גבוהה לקריאות טובה</li>
              <li>תמיכה בניווט מקלדת לכל אלמנטים אינטראקטיביים</li>
              <li>מבנה HTML סמנטי עם כותרות מסודרות</li>
              <li>תצוגה מותאמת למכשירים ניידים (Responsive Design)</li>
              <li>גופנים ברורים בגדלים קריאים</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">טכנולוגיות נגישות</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              האתר בנוי בטכנולוגיות מודרניות (Next.js, React) עם תמיכה מובנית
              בתקני נגישות ARIA. אנו משתמשים באלמנטים סמנטיים, תגיות alt לתמונות,
              ותוויות מתאימות לשדות טפסים.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">דפדפנים נתמכים</h2>
            <ul className="text-[var(--color-warm-gray)] space-y-2 list-disc list-inside">
              <li>Google Chrome (גרסה אחרונה)</li>
              <li>Mozilla Firefox (גרסה אחרונה)</li>
              <li>Safari (גרסה אחרונה)</li>
              <li>Microsoft Edge (גרסה אחרונה)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">דיווח על בעיות נגישות</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              אם נתקלת בבעיית נגישות באתר, נשמח לשמוע ולתקן. אנא פנה אלינו דרך{" "}
              <Link href="/contact" className="text-[var(--color-gold)] hover:underline">
                דף צור קשר
              </Link>{" "}
              או בטלפון{" "}
              <span dir="ltr" className="inline-block">058-7267726</span>. אנו
              מתחייבים להגיב תוך 5 ימי עסקים.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
