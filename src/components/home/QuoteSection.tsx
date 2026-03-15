"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GradientOrbs } from "@/components/ui/GradientOrbs";

export function QuoteSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container-main max-w-3xl relative">
        <AnimatedSection variant="scaleUp">
          <div className="quote-box relative overflow-hidden">
            {/* Decorative orbs inside quote box */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-gold)]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-[var(--color-gold)]/8 rounded-full blur-3xl" />

            <p className="relative z-10 text-xl md:text-2xl leading-relaxed">
              אם ישראל שומרים שתי שבתות כהלכתן — מיד נגאלין
            </p>
            <p className="text-sm mt-4 text-[var(--color-gold)] opacity-70 relative z-10">
              — מסכת שבת קי&quot;ח
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
