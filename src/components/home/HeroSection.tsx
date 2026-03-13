"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-cream)] via-white to-[var(--color-blue-light)]" />

      {/* Decorative light rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--color-gold)] to-transparent rotate-[-15deg]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--color-gold)] to-transparent rotate-[15deg]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--color-gold)] to-transparent rotate-[-5deg]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--color-gold)] to-transparent rotate-[5deg]" />
      </div>

      <div className="relative container-main text-center py-20 px-4">
        {/* Main Candle Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl mb-6"
        >
          🕯️
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black text-[var(--color-blue-deep)] mb-4"
        >
          פרויקט השבת
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl font-semibold text-gradient-gold mb-6"
        >
          שתי שבתות של אחדות וגאולה
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-[var(--color-warm-gray)] max-w-2xl mx-auto mb-10"
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
          <Link href="/register" className="btn-primary text-lg py-3 px-8">
            הצטרף עכשיו
          </Link>
          <Link href="/how-it-works" className="btn-secondary text-lg py-3 px-8">
            גלה איך זה עובד
          </Link>
        </motion.div>

        {/* Live Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-[var(--color-warm-gray)]">
            <span className="font-bold text-[var(--color-blue-deep)]">127,543</span>{" "}
            יהודים כבר הצטרפו
          </span>
        </motion.div>
      </div>
    </section>
  );
}
