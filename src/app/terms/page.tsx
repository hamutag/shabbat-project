import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "תנאי שימוש | פרויקט השבת",
  description: "תנאי השימוש באתר ובשירותי פרויקט השבת",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[var(--color-blue-deep)] text-white py-12">
        <div className="container-main text-center">
          <h1 className="text-3xl md:text-4xl font-bold">תנאי שימוש</h1>
          <p className="text-blue-200 mt-2">עדכון אחרון: מרץ 2026</p>
        </div>
      </div>

      <div className="container-main py-12 max-w-3xl">
        <div className="prose prose-lg mx-auto text-right space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">1. קבלת התנאים</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              בעצם הרישום והשימוש באתר פרויקט השבת (&quot;השירות&quot;), הנך מסכים
              לתנאי שימוש אלה. אם אינך מסכים לתנאים, אנא הימנע משימוש בשירות.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">2. תיאור השירות</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              פרויקט השבת הוא פלטפורמה דיגיטלית המסייעת ליהודים להתחזק בשמירת שבת
              ובמצוות. השירות כולל: מעקב אחר מצוות, שיעורי תורה, מלווה רוחני, תכנים
              מקוריים ומסלולי התחזקות.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">3. התנהלות משתמשים</h2>
            <ul className="text-[var(--color-warm-gray)] space-y-2 list-disc list-inside">
              <li>השתמש בשירות בכבוד ובהתאם לערכי הפרויקט</li>
              <li>אל תפרסם תוכן פוגעני, שקרי או מטעה</li>
              <li>אל תנסה לפגוע במערכת או במשתמשים אחרים</li>
              <li>שמור על סודיות פרטי ההתחברות שלך</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">4. קניין רוחני</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              כל התכנים באתר, כולל טקסטים, תמונות, עיצוב וקוד, הם רכוש הפרויקט
              ומוגנים בזכויות יוצרים. אין להעתיק, לשכפל או להפיץ תכנים ללא אישור.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">5. הגבלת אחריות</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              השירות מסופק &quot;כמות שהוא&quot; (AS IS). הפרויקט אינו אחראי
              לנזקים ישירים או עקיפים הנובעים מהשימוש בשירות. התוכן הרוחני באתר הוא
              להשכלה כללית בלבד ואינו מהווה פסיקה הלכתית.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-3">6. שינויים בתנאים</h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              הפרויקט שומר לעצמו את הזכות לעדכן תנאי שימוש אלה בכל עת. שינויים
              מהותיים יפורסמו באתר. ליצירת קשר:{" "}
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
