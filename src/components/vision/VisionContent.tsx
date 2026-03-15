"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import {
  Heart,
  Flame,
  Sparkles,
  Handshake,
  Footprints,
  User,
  Users,
  BookOpen,
  Link2,
  Target,
  MessageCircle,
  Sunrise,
} from "lucide-react";

const VALUES = [
  { icon: <Heart className="w-5 h-5" />, name: "אהבת ישראל" },
  { icon: <Flame className="w-5 h-5" />, name: "קדושת השבת" },
  { icon: <Sparkles className="w-5 h-5" />, name: "אמונה וביטחון" },
  { icon: <Handshake className="w-5 h-5" />, name: "קירוב מתוך חום" },
  { icon: <Footprints className="w-5 h-5" />, name: "צעדים מעשיים" },
  { icon: <User className="w-5 h-5" />, name: "ליווי אישי" },
  { icon: <Users className="w-5 h-5" />, name: "אחדות" },
  { icon: <BookOpen className="w-5 h-5" />, name: "תורה לכל יהודי" },
  { icon: <Link2 className="w-5 h-5" />, name: "חיבור ולא כפייה" },
  { icon: <Target className="w-5 h-5" />, name: "כבוד לכל אדם" },
  { icon: <MessageCircle className="w-5 h-5" />, name: "שפה מכבדת" },
  { icon: <Sunrise className="w-5 h-5" />, name: "תקווה לגאולה" },
];

const POWER_ITEMS = [
  "עוד מצווה אחת",
  "עוד שבת אחת",
  "עוד שיעור תורה",
  "עוד תפילין",
  "עוד תפילה",
  "עוד קבלה טובה",
  "עוד לב יהודי שנפתח",
  "עוד נשמה שמתחברת",
  "עוד בית שמתחזק",
];

export default function VisionContent() {
  return (
    <>
      <PageHero
        title="החזון שלנו"
        subtitle="שתי שבתות של אחדות וגאולה"
        icon={<Flame className="w-8 h-8" />}
        gradient="gold"
      />

      <section className="py-16">
        <div className="container-main max-w-3xl">
          <AnimatedSection variant="fadeUp">
            <div className="card p-8 md:p-12 space-y-6 text-lg leading-relaxed text-[var(--color-blue-deep)] backdrop-blur-lg bg-white/80 border border-white/40">
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

              <AnimatedSection variant="scaleUp">
                <div className="quote-box my-8 relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-gold)]/10 rounded-full blur-2xl" />
                  <p className="text-xl relative z-10">
                    אנו מאמינים כי כל יהודי מסוגל להתקדם.
                    <br />
                    לא הכול בבת אחת. לא מתוך כפייה. לא מתוך לחץ.
                    <br />
                    אלא מתוך חום, אמת, ליווי, הקשבה ואהבה.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection variant="fadeUp">
                <p className="font-semibold text-xl text-center text-[var(--color-gold)]">
                  כוחו של המיזם טמון בפשטות הגדולה שלו:
                </p>
              </AnimatedSection>

              <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 my-8">
                {POWER_ITEMS.map((item) => (
                  <StaggerItem key={item}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-[var(--color-cream)] rounded-xl p-4 text-center text-sm font-medium border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 transition-colors"
                    >
                      {item}
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <AnimatedSection variant="fadeUp">
                <p>
                  אנו מאמינים שאין מעשה קטן בעם ישראל. כל צעד של קדושה, אפילו
                  הקטן ביותר, מוסיף אור עצום לעולם. כל יהודי שמתחזק משפיע על
                  ביתו. כל בית שמתחזק משפיע על סביבתו. וכלל הצעדים הקטנים של עם
                  ישראל מצטרפים לבניין רוחני עצום.
                </p>
              </AnimatedSection>

              <AnimatedSection variant="fadeUp" delay={0.1}>
                <p className="text-center font-semibold text-xl mt-8">
                  השבת היא הלב של עם ישראל.
                  <br />
                  השבת היא מקור הברכה.
                  <br />
                  השבת היא המקום שבו יהודי שב לעצמו, לביתו, למשפחתו ולשורשו.
                </p>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection variant="fadeUp" className="mt-16">
            <h2 className="section-title">ערכי היסוד שלנו</h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {VALUES.map((value) => (
              <StaggerItem key={value.name}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="card text-center py-6 group hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mx-auto mb-3 text-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/20 transition-colors">
                    {value.icon}
                  </div>
                  <span className="font-semibold text-sm text-[var(--color-blue-deep)]">{value.name}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
