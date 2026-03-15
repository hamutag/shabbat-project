"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { formatNumber } from "@/lib/utils";

export function HeroSection() {
  const { ref: counterRef, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const animatedCount = useAnimatedCounter(127543, isVisible, 2500);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-cream)] via-white to-[var(--color-blue-light)]" />

      {/* Floating gradient orbs */}
      <GradientOrbs variant="light" />

      <div className="relative container-main text-center py-20 px-4">
        {/* Main Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <Image
            src="/logo.png"
            alt="פרויקט השבת"
            width={140}
            height={140}
            className="mx-auto w-28 h-28 md:w-40 md:h-40 object-contain drop-shadow-lg"
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-black text-[var(--color-blue-deep)] mb-4 tracking-tight leading-[1.1]"
        >
          פרויקט השבת
        </motion.h1>

        {/* Slogan with shimmer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl font-bold mb-6"
          style={{
            background: "linear-gradient(90deg, #C5962E, #E8D5A3, #A67B1E, #C5962E)",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 4s ease-in-out infinite",
          }}
        >
          שתי שבתות של אחדות וגאולה
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-[var(--color-warm-gray)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          כל יהודי. צעד אחד. אור גדול.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link
            href="/register"
            className="btn-primary text-lg py-4 px-10 shadow-lg hover:shadow-xl group"
          >
            <span>הצטרף עכשיו</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </Link>
          <Link
            href="/how-it-works"
            className="btn-secondary text-lg py-4 px-10 group"
          >
            <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>גלה איך זה עובד</span>
          </Link>
        </motion.div>

        {/* Live Counter */}
        <motion.div
          ref={counterRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-8 py-4 shadow-md border border-white/50"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="text-base text-[var(--color-warm-gray)]">
            <span className="font-bold text-lg text-[var(--color-blue-deep)]">
              {formatNumber(animatedCount)}
            </span>{" "}
            יהודים כבר הצטרפו
          </span>
        </motion.div>
      </div>
    </section>
  );
}
