"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Smartphone,
  Target,
  BookOpen,
  Handshake,
  TrendingUp,
  ArrowLeft,
  Check,
  Info,
} from "lucide-react";

const STEPS = [
  {
    number: 1,
    title: "הירשם בקלות",
    desc: "הרשמה מהירה באמצעות טלפון נייד או אימייל. תוך דקה אתה בפנים.",
    icon: <Smartphone className="w-6 h-6" />,
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
    icon: <Target className="w-6 h-6" />,
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
    icon: <BookOpen className="w-6 h-6" />,
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
    icon: <Handshake className="w-6 h-6" />,
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
    icon: <TrendingUp className="w-6 h-6" />,
    details: [
      "מעקב התקדמות אישי",
      "תגים והישגים",
      "הזמן חברים והפוך לפעיל",
    ],
  },
];

export default function HowItWorksContent() {
  return (
    <>
      <PageHero
        title="איך זה עובד?"
        subtitle="חמישה צעדים פשוטים שמשנים הכל"
        icon={<Info className="w-8 h-8" />}
        gradient="light"
      />

      <section className="pb-20 pt-8">
        <div className="container-main max-w-3xl">
          <div className="space-y-8 relative">
            {/* Vertical line connector */}
            <div className="absolute right-[1.75rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[var(--color-gold)] via-[var(--color-gold)]/30 to-transparent hidden md:block" />

            {STEPS.map((step, idx) => (
              <AnimatedSection
                key={step.number}
                variant="fadeUp"
                delay={idx * 0.1}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  className="card flex gap-6 p-6 md:p-8 hover:shadow-lg transition-shadow relative"
                >
                  <div className="flex-shrink-0 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center text-white text-xl font-bold shadow-md"
                    >
                      {step.number}
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)]">
                        {step.icon}
                      </div>
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
                          <Check className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection variant="scaleUp" className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/register" className="btn-primary text-lg py-3 px-8 inline-flex items-center gap-2">
                הצטרף עכשיו - זה בחינם
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </motion.div>
            <p className="text-sm text-[var(--color-warm-gray)] mt-3">
              ללא לחץ. ללא כפייה. רק חיבור ואהבה.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
