"use client";

import Image from "next/image";
import { formatNumber } from "@/lib/utils";

const COUNTERS = [
  { value: 127543, label: "מצטרפים", icon: "community" },
  { value: 34210, label: "שומרי שבת", icon: "candles" },
  { value: 1850, label: "שיעורים פעילים", icon: "open-torah" },
  { value: 85, label: "ערים פעילות", icon: "synagogue" },
];

export function CounterSection() {
  return (
    <section className="py-16 bg-[var(--color-blue-deep)]">
      <div className="container-main">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          עם ישראל מתחזק יחד
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {COUNTERS.map((counter) => (
            <div key={counter.label} className="text-center">
              <div className="flex justify-center mb-2">
                <Image src={`/icons/${counter.icon}.png`} alt={counter.label} width={48} height={48} className="w-12 h-12 object-contain" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-[var(--color-gold)] mb-1">
                {formatNumber(counter.value)}
              </div>
              <div className="text-sm text-gray-300">{counter.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
