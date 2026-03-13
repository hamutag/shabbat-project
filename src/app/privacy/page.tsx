import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | פרויקט השבת",
  description: "מדיניות הפרטיות של פרויקט השבת",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[var(--color-blue-deep)] text-white py-12">
        <div className="container-main text-center">
          <h1 className="text-3xl md:text-4xl font-bold">מדיניות פרטיות</h1>
          <p className="text-blue-200 mt-2">עדכון אחרון: מרץ 2026</p>
        </div>
      </div>

      <div className="container-main py-12 max-w-3xl">
        <div className="prose prose-lg mx-auto text-right space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">1. כללי</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              פרויקט השבת (&quot;הפרויקט&quot;) מכבד את פרטיות המשתמשים שלו. מדיניות פרטיות זו
              מתארת כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך בעת שימוש
              באתר ובשירותים שלנו.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">2. מידע שאנו אוספים</h2>
            <ul className="text-[var(--color-warm-gray)] space-y-2 list-disc list-inside">
              <li>פרטי רישום: שם, טלפון, אימייל, עיר מגורים</li>
              <li>העדפות אישיות: מצוות שנבחרו, מסלולים, רקע דתי</li>
              <li>נתוני שימוש: דיווחי שבת, התקדמות במצוות</li>
              <li>מידע טכני: סוג מכשיר, דפדפן, כתובת IP</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">3. שימוש במידע</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              המידע שנאסף משמש אותנו לצורך: מתן שירות מותאם אישית, שיבוץ למלווה
              רוחני, מעקב אחר התקדמות, שליחת עדכונים ותכנים רלוונטיים, ושיפור
              השירות.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">4. שיתוף מידע</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              איננו מוכרים, סוחרים או מעבירים את המידע האישי שלך לצדדים שלישיים.
              המידע משותף אך ורק עם מלווים רוחניים ורכזי ערים המשויכים אליך בפרויקט,
              ורק במידה הנדרשת לצורך מתן השירות.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">5. אבטחת מידע</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              אנו נוקטים באמצעי אבטחה מתקדמים להגנה על המידע שלך, כולל הצפנת
              סיסמאות, תקשורת מאובטחת (SSL), וגיבויים שוטפים.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">6. זכויותיך</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              יש לך זכות לצפות, לתקן או למחוק את המידע האישי שלך בכל עת. ליצירת
              קשר בנושאי פרטיות, אנא פנה אלינו דרך{" "}
              <Link href="/contact" className="text-[var(--color-gold)] hover:underline">
                דף צור קשר
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
