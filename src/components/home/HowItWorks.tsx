"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { GradientOrbs } from "@/components/ui/GradientOrbs";

const STEPS = [
  {
    number: "01",
    title: "הירשם ובחר את הצעד הראשון שלך",
    desc: "הרשמה פשוטה ומהירה. בחר מצווה אחת או מסלול התחזקות שמתאים בדיוק למצב שלך.",
  },
  {
    number: "02",
    title: "קבל תוכן, ליווי ושיעורים מתאימים",
    desc: "המערכת תמליץ לך על תכנים, שיעורי תורה קרובים ומלווה אישי שילווה אותך בדרך.",
  },
  {
    number: "03",
    title: "התחזק והפוך לחלק מתנועה לאומית",
    desc: "התקדם בקצב שלך, עקוב אחרי ההתקדמות שלך, ועזור גם לאחרים להתחזק.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 gradient-light relative overflow-hidden">
      <GradientOrbs variant="light" />

      <div className="container-main relative">
        <AnimatedSection variant="fadeUp">
          <h2 className="section-title">איך זה עובד?</h2>
          <p className="section-subtitle">
            שלושה צעדים פשוטים שמשנים הכל
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto" stagger={0.15}>
          {STEPS.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="text-center relative group">
                {/* Step number circle */}
                <div
                  className="rounded-full gradient-gold flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-md ring-4 ring-[var(--color-gold-light)]/30 transition-transform duration-300 group-hover:scale-110"
                  style={{ width: "72px", height: "72px" }}
                >
                  {step.number}
                </div>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-9 right-0 w-full h-[2px] bg-gradient-to-l from-[var(--color-gold-light)] to-[var(--color-gold-light)]/20 -z-10" />
                )}

                <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
