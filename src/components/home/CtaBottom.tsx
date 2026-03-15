"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GradientOrbs } from "@/components/ui/GradientOrbs";

export function CtaBottom() {
  return (
    <section
      className="py-24 text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #C5962E 0%, #1B3A5C 50%, #1B3A5C 100%)",
        backgroundSize: "200% 200%",
        animation: "gradient-shift 8s ease infinite",
      }}
    >
      <GradientOrbs variant="dark" />

      <div className="container-main text-center relative">
        <AnimatedSection variant="fadeUp">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
            אם כל אחד מאתנו יוסיף צעד אחד קטן,
            <br />
            כולנו ביחד נאיר את כל העולם
          </h2>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={0.15}>
          <p className="text-lg md:text-xl text-[var(--color-gold-light)] mb-10 max-w-xl mx-auto leading-relaxed">
            הצטרף עכשיו לתנועה הלאומית לחיזוק עם ישראל.
            <br />
            בחר את הצעד הראשון שלך.
          </p>
        </AnimatedSection>

        <AnimatedSection variant="scaleUp" delay={0.3}>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-white text-[var(--color-blue-deep)] font-bold text-lg py-4 px-10 rounded-xl hover:bg-[var(--color-gold-light)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
          >
            <span>הצטרף עכשיו</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
