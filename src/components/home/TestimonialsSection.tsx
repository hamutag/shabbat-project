"use client";

import { Heart } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const TESTIMONIALS = [
  {
    name: "דוד כהן",
    location: "ירושלים",
    text: "התחלתי מהדלקת נרות בלבד, והיום אני שומר שבת מלאה. המלווה האישי שלי עזר לי בכל צעד.",
    initials: "ד",
  },
  {
    name: "שרה לוי",
    location: "תל אביב",
    text: "המסלול לנשים שינה לי את החיים. מצאתי קהילה חמה ותומכת שמלוות אותי בדרך.",
    initials: "ש",
  },
  {
    name: "יוסי מזרחי",
    location: "באר שבע",
    text: "בזכות השיעורים והמסלולים, השבת הפכה ליום הכי מיוחד בשבוע שלי ושל המשפחה.",
    initials: "י",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[var(--color-cream)]/50 relative">
      <div className="container-main">
        <AnimatedSection variant="fadeUp">
          <h2 className="section-title">מה אומרים המצטרפים</h2>
          <p className="section-subtitle">
            אלפי יהודים כבר התחילו את הדרך שלהם
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" stagger={0.12}>
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <div className="card p-6 h-full flex flex-col">
                {/* Heart icon */}
                <div className="flex justify-end mb-3">
                  <Heart className="w-5 h-5 text-[var(--color-gold)] fill-[var(--color-gold-light)]" />
                </div>

                {/* Quote text */}
                <p className="text-[var(--color-warm-gray)] leading-relaxed flex-1 mb-5 text-sm md:text-base">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--color-blue-deep)] text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-[var(--color-warm-gray)]">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
