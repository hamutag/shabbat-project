"use client";

import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/lib/trpc";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const SHABBAT_STEPS = [
  {
    step: 1,
    title: "הדלקת נרות",
    time: "18 דקות לפני השקיעה",
    description: "האישה מדליקה שני נרות (או יותר), מכסה את העיניים, מברכת ומתפללת",
    icon: "candles",
  },
  {
    step: 2,
    title: "קבלת שבת",
    time: "עם השקיעה",
    description: "תפילת קבלת שבת בבית הכנסת או בבית. שירת 'לכה דודי' ו'מזמור שיר ליום השבת'",
    icon: "synagogue",
  },
  {
    step: 3,
    title: "קידוש",
    time: "אחרי תפילת ערבית",
    description: "קידוש על היין, ברכת המזון על שני חלות, סעודת שבת משפחתית",
    icon: "kiddush-cup",
  },
  {
    step: 4,
    title: "סעודות שבת",
    time: "שלוש סעודות",
    description: "סעודת ליל שבת, סעודת שבת בבוקר, וסעודה שלישית לפני צאת שבת",
    icon: "shabbat-table",
  },
  {
    step: 5,
    title: "מנוחה וקדושה",
    time: "כל יום השבת",
    description: "מנוחה ממלאכות, זמן למשפחה, תורה, תפילה, שינה ושמחה",
    icon: "crown",
  },
  {
    step: 6,
    title: "הבדלה",
    time: "צאת השבת",
    description: "הבדלה על יין, בשמים ונר. מפרידים בין קודש לחול ומתחילים שבוע חדש באור",
    icon: "havdalah",
  },
];

const SHABBAT_DONT = [
  { icon: "candle-single", text: "הדלקת אש ובישול" },
  { icon: "oil-lamp", text: "הדלקה וכיבוי חשמל" },
  { icon: "clock", text: "שימוש בטלפון ומחשב" },
  { icon: "key", text: "נסיעה ברכב" },
  { icon: "torah-scroll", text: "כתיבה" },
  { icon: "tzedakah-box", text: "קנייה ומכירה" },
];

const BEGINNER_TIPS = [
  {
    title: "התחל מדבר אחד",
    description: "לא חייב הכל בבת אחת. תבחר דבר אחד - הדלקת נרות, קידוש, או סעודה משפחתית",
    icon: "step-badge",
  },
  {
    title: "הכן מראש",
    description: "הכנות לשבת ביום שישי: בישול, ניקיון, הכנת בגדים חגיגיים",
    icon: "challah-plate",
  },
  {
    title: "צור אווירה",
    description: "מפה לבנה, כלים יפים, אוכל טעים, שירים - השבת היא חוויה",
    icon: "shabbat-cover",
  },
  {
    title: "הזמן אורחים",
    description: "שבת היא זמן של חיבור. הזמן חברים או משפחה לסעודה",
    icon: "community",
  },
  {
    title: "אל תלחץ על עצמך",
    description: "כל צעד נחשב. אפילו שמירה חלקית מביאה אור עצום",
    icon: "hands-light",
  },
];

export default function ShabbatContent() {
  const { data: dailyQuote } = trpc.content.dailyQuote.useQuery();

  return (
    <div className="min-h-screen">
      <PageHero
        title="קדושת השבת"
        subtitle="השבת היא הלב של עם ישראל. מקור הברכה, המנוחה והקדושה."
        icon="candles"
        gradient="light"
      />

      <div className="container-main pb-20">
        {/* Quote */}
        <AnimatedSection variant="scaleUp" className="mb-16 -mt-8">
          <div className="quote-box max-w-xl mx-auto">
            <p className="text-lg">
              אם ישראל שומרים שתי שבתות כהלכתן — מיד נגאלין
            </p>
            <p className="text-xs mt-2 text-[var(--color-gold)] opacity-70">
              — מסכת שבת קי&quot;ח
            </p>
          </div>
        </AnimatedSection>

        {/* How Shabbat Works */}
        <section className="mb-16">
          <AnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-8 text-center">
              מהלך השבת
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <StaggerContainer className="space-y-4" stagger={0.08}>
              {SHABBAT_STEPS.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="card p-5 flex items-start gap-4 group">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-gold-light)]/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Image src={`/icons/${step.icon}.png`} alt={step.title} width={40} height={40} className="w-8 h-8 object-contain" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
                          {step.title}
                        </h3>
                        <span className="badge badge-blue text-xs">{step.time}</span>
                      </div>
                      <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* What Not to Do */}
        <section className="mb-16">
          <AnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
              מלאכות שנמנעים מהן בשבת
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto" stagger={0.06}>
            {SHABBAT_DONT.map((item) => (
              <StaggerItem key={item.text}>
                <div className="card py-4 px-5 text-center group">
                  <div className="flex justify-center mb-2">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <Image src={`/icons/${item.icon}.png`} alt={item.text} width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-blue-deep)]">
                    {item.text}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection variant="fadeIn" delay={0.3}>
            <p className="text-center text-sm text-[var(--color-warm-gray)] mt-4 max-w-md mx-auto">
              יש 39 מלאכות ותולדותיהן. מומלץ ללמוד בהדרגה עם רב או מלווה אישי.
            </p>
          </AnimatedSection>
        </section>

        {/* Tips for Beginners */}
        <section className="mb-16">
          <AnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
              טיפים למתחילים
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-3 max-w-2xl mx-auto" stagger={0.08}>
            {BEGINNER_TIPS.map((tip) => (
              <StaggerItem key={tip.title}>
                <div className="card p-5 flex items-start gap-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-cream)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Image src={`/icons/${tip.icon}.png`} alt={tip.title} width={36} height={36} className="w-8 h-8 object-contain" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-blue-deep)] mb-1 group-hover:text-[var(--color-gold)] transition-colors">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Shabbat Track CTA */}
        <AnimatedSection variant="scaleUp" className="mb-16">
          <div className="card max-w-2xl mx-auto p-8 bg-[var(--color-cream)] text-center">
            <div className="flex justify-center mb-3">
              <Image src="/icons/golden-gate.png" alt="מסלול שבת" width={48} height={48} className="w-12 h-12 object-contain" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
              מסלול שבת למתחילים
            </h3>
            <p className="text-[var(--color-warm-gray)] mb-4">
              מדריך צעד אחר צעד לשמירת שבת ראשונה. 7 שלבים פשוטים.
            </p>
            <Link href="/join?track=shabbat-beginners" className="btn-primary">
              התחל את המסלול
            </Link>
          </div>
        </AnimatedSection>

        {/* Q&A */}
        <section className="mb-16">
          <AnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6 text-center">
              שאלות נפוצות
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-3 max-w-2xl mx-auto" stagger={0.06}>
            {[
              { q: "מתי מתחילה ומסתיימת השבת?", a: "השבת מתחילה בערב שישי 18 דקות לפני השקיעה ומסתיימת במוצאי שבת עם צאת הכוכבים (כ-40 דקות אחרי השקיעה)." },
              { q: "האם אפשר להתחיל לשמור שבת בהדרגה?", a: "בהחלט! כל צעד נחשב. אפשר להתחיל מהדלקת נרות, קידוש, סעודה משפחתית או הימנעות מטלפון. אין 'הכל או כלום'." },
              { q: "מה עושים כל השבת?", a: "תפילה, סעודות משפחתיות, לימוד תורה, שינה, טיולים ברגל, משחקי קופסא, שיחות עם המשפחה, קריאה - והרבה מנוחה." },
              { q: "האם ילדים חייבים לשמור שבת?", a: "ילדים לומדים בהדרגה. המטרה היא ליצור חוויה חיובית ומשמחת שתגרום להם לרצות לשמור שבת." },
            ].map((item) => (
              <StaggerItem key={item.q}>
                <details className="card p-5 group">
                  <summary className="font-bold text-[var(--color-blue-deep)] cursor-pointer list-none flex items-center justify-between">
                    {item.q}
                    <span className="text-[var(--color-gold)] group-open:rotate-180 transition-transform duration-300">▼</span>
                  </summary>
                  <p className="text-sm text-[var(--color-warm-gray)] mt-3 leading-relaxed">
                    {item.a}
                  </p>
                </details>
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

        {/* CTA */}
        <AnimatedSection variant="scaleUp">
          <div className="card max-w-lg mx-auto p-8 text-center gradient-gold text-white rounded-2xl">
            <h3 className="text-2xl font-black mb-3">
              שתי שבתות של אחדות וגאולה
            </h3>
            <p className="text-white/90 mb-6">
              הצטרף לתנועה הלאומית לחיזוק שמירת השבת
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-blue-deep)] font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              הצטרף עכשיו
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
