"use client";

import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const COUNTERS = [
  { value: 127543, label: "מצטרפים", icon: "community" },
  { value: 34210, label: "שומרי שבת", icon: "candles" },
  { value: 1850, label: "שיעורים פעילים", icon: "open-torah" },
  { value: 85, label: "ערים פעילות", icon: "synagogue" },
];

function AnimatedCounter({ value, isVisible }: { value: number; isVisible: boolean }) {
  const count = useAnimatedCounter(value, isVisible, 2200);
  return <>{formatNumber(count)}</>;
}

export function CounterSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-[var(--color-blue-deep)] relative overflow-hidden">
      <GradientOrbs variant="dark" />

      <div className="container-main relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-14 tracking-tight">
          עם ישראל מתחזק יחד
        </h2>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" stagger={0.12}>
          {COUNTERS.map((counter, i) => (
            <StaggerItem key={counter.label}>
              <div className="text-center group relative">
                {/* Divider (not on last in row) */}
                {i < COUNTERS.length - 1 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />
                )}

                <div className="flex justify-center mb-3">
                  <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <Image
                      src={`/icons/${counter.icon}.png`}
                      alt={counter.label}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>
                <div
                  className="text-3xl md:text-5xl font-black text-[var(--color-gold)] mb-2 tabular-nums"
                  style={{ textShadow: "0 0 30px rgba(197, 150, 46, 0.3)" }}
                >
                  <AnimatedCounter value={counter.value} isVisible={isVisible} />
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium">
                  {counter.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
