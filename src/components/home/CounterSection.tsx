"use client";

import { formatNumber } from "@/lib/utils";

const COUNTERS = [
  { value: 127543, label: "מצטרפים", icon: "👥" },
  { value: 34210, label: "שומרי שבת", icon: "🕯️" },
  { value: 1850, label: "שיעורים פעילים", icon: "📖" },
  { value: 85, label: "ערים פעילות", icon: "🏙️" },
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
              <div className="text-3xl mb-2">{counter.icon}</div>
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
