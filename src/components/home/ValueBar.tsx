"use client";

import Image from "next/image";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const VALUES = [
  {
    icon: "candles",
    title: "בחר מצווה אחת",
    desc: "בחר צעד רוחני שמתאים לך",
  },
  {
    icon: "handshake",
    title: "קבל ליווי אישי",
    desc: "מלווה שילווה אותך באהבה",
  },
  {
    icon: "book-open",
    title: "מצא שיעור קרוב",
    desc: "שיעורי תורה בכל הארץ",
  },
  {
    icon: "footsteps",
    title: "התקדם בקצב שלך",
    desc: "ללא לחץ, ללא כפייה",
  },
];

export function ValueBar() {
  return (
    <section className="py-14 bg-white/80 backdrop-blur-sm border-y border-gray-100/50">
      <div className="container-main">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {VALUES.map((item) => (
            <StaggerItem key={item.title}>
              <div className="text-center group">
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-gold-light)]/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={`/icons/${item.icon}.png`}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-[var(--color-blue-deep)] mb-1 group-hover:text-[var(--color-gold)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)]">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
