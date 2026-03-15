"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { GradientOrbs } from "@/components/ui/GradientOrbs";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  icon?: string | ReactNode;
  gradient?: "gold" | "light" | "dark" | "rose";
}

const gradientClasses = {
  gold: "bg-gradient-to-b from-[var(--color-cream)] to-white",
  light: "bg-gradient-to-b from-[var(--color-blue-light)] to-white",
  dark: "bg-[var(--color-blue-deep)] text-white",
  rose: "bg-gradient-to-b from-[var(--color-women-pink)] to-white",
};

export function PageHero({
  title,
  subtitle,
  icon,
  gradient = "light",
}: PageHeroProps) {
  const isDark = gradient === "dark";

  return (
    <section
      className={`py-16 md:py-24 text-center relative overflow-hidden ${gradientClasses[gradient]}`}
    >
      <GradientOrbs variant={gradient} />

      <div className="container-main max-w-3xl relative">
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-4"
          >
            {typeof icon === "string" ? (
              <Image
                src={`/icons/${icon}.png`}
                alt={title}
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            ) : (
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                isDark ? "bg-white/10 text-white" : "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
              }`}>
                {icon}
              </div>
            )}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${
            isDark ? "text-white" : "text-[var(--color-blue-deep)]"
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`text-xl leading-relaxed ${
              isDark ? "text-gray-300" : "text-[var(--color-warm-gray)]"
            }`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
