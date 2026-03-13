import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "איך זה עובד",
  description: "כך פרויקט השבת פועל - הצטרפות, בחירת מצווה, ליווי אישי ושיעורי תורה",
};

const STEPS = [
  {
    number: 1,
    title: "הירשם בקלות",
    desc: "הרשמה מהירה באמצעות טלפון נייד או אימייל. תוך דקה אתה בפנים.",
    icon: "📱",
    details: [
      "הזן שם, טלפון ועיר",
      "אמת את הטלפון שלך",
      "בחר מה מעניין אותך",
    ],
  },
  {
    number: 2,
    title: "בחר את הצעד הראשון שלך",
    desc: "בחר מצווה אחת שתרצה לקחת על עצמך, או הצטרף למסלול התחזקות מוכן.",
    icon: "🎯",
    details: [
      "בחר מתוך עשרות מצוות",
      "או הצטרף למסלול מובנה",
      "קבל מדריך מעשי פשוט",
    ],
  },
  {
    number: 3,
    title: "קבל תוכן וליווי מותאם",
    desc: "המערכת תמליץ לך על תכנים, שיעורי תורה קרובים, וסרטונים שמתאימים בדיוק לך.",
    icon: "📖",
    details: [
      "חיזוק יומי מותאם אישית",
      "שיעורי תורה קרובים למיקום שלך",
      "סרטונים ומאמרים לפי הנושא שבחרת",
    ],
  },
  {
    number: 4,
    title: "קבל מלווה אישי",
    desc: "אם תרצה, נשבץ לך מלווה אנושי שילווה אותך בחום ובאהבה.",
    icon: "🤝",
    details: [
      "מלווה מאותה העיר שלך",
      "שיחות, מפגשים ותמיכה",
      "בלי לחץ, בקצב שלך",
    ],
  },
  {
    number: 5,
    title: "התקדם וצמח",
    desc: "עקוב אחרי ההתקדמות שלך, קבל תגי הישג, ועזור גם לאחרים.",
    icon: "🌟",
    details: [
      "מעקב התקדמות אישי",
      "תגים והישגים",
      "הזמן חברים והפוך לפעיל",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="gradient-light">
      <section className="py-20 text-center">
        <div className="container-main max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-blue-deep)] mb-4">
            איך זה עובד?
          </h1>
          <p className="text-xl text-[var(--color-warm-gray)]">
            חמישה צעדים פשוטים שמשנים הכל
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-main max-w-3xl">
          <div className="space-y-8">
            {STEPS.map((step) => (
              <div key={step.number} className="card flex gap-6 p-6 md:p-8">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center text-white text-xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{step.icon}</span>
                    <h3 className="text-xl font-bold text-[var(--color-blue-deep)]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[var(--color-warm-gray)] mb-4">
                    {step.desc}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-sm text-[var(--color-blue-deep)]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/register" className="btn-primary text-lg py-3 px-8">
              הצטרף עכשיו - זה בחינם
            </Link>
            <p className="text-sm text-[var(--color-warm-gray)] mt-3">
              ללא לחץ. ללא כפייה. רק חיבור ואהבה.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
