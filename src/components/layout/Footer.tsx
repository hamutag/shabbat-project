"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ChevronUp, Phone, Mail } from "lucide-react";

const FOOTER_LINKS = {
  about: {
    title: "אודות",
    links: [
      { href: "/vision", label: "חזון" },
      { href: "/how-it-works", label: "איך זה עובד" },
      { href: "/contact", label: "צור קשר" },
    ],
  },
  join: {
    title: "הצטרפות",
    links: [
      { href: "/register", label: "הצטרף כמתחזק" },
      { href: "/join?type=activist", label: "הצטרף כפעיל" },
      { href: "/join?type=coordinator", label: "הצטרף כרכז עיר" },
      { href: "/join?type=rabbi", label: "הצטרף כרב/מרצה" },
    ],
  },
  content: {
    title: "תוכן",
    links: [
      { href: "/content", label: "מרכז תוכן" },
      { href: "/lessons", label: "שיעורי תורה" },
      { href: "/shabbat", label: "השבת" },
      { href: "/women", label: "מרכז לנשים" },
    ],
  },
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--color-blue-deep)] text-white relative">
      {/* Gradient separator */}
      <div className="h-1 bg-gradient-to-l from-[var(--color-gold)] via-[var(--color-gold-light)] to-[var(--color-gold)]" />

      <AnimatedSection variant="fadeUp" once>
        <div className="container-main py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="פרויקט השבת" width={40} height={40} className="w-10 h-10 object-contain" />
                <div>
                  <h3 className="text-lg font-bold">פרויקט השבת</h3>
                  <p className="text-xs text-[var(--color-gold-light)]">
                    שתי שבתות של אחדות וגאולה
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                לאחד את עם ישראל סביב קדושת השבת, לחזק כל יהודי בצעד מעשי אחד
                קדימה.
              </p>
              <div className="text-sm text-gray-300 space-y-2">
                <p className="font-medium text-white">ארנון דהאן</p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--color-gold-light)]" />
                  <span dir="ltr">058-7267726</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--color-gold-light)]" />
                  <span dir="ltr">dahanarnon@gmail.com</span>
                </p>
              </div>
            </div>

            {/* Links */}
            {Object.values(FOOTER_LINKS).map((section) => (
              <div key={section.title}>
                <h4 className="font-bold text-[var(--color-gold)] mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors relative inline-block group"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 right-0 w-0 h-px bg-[var(--color-gold-light)] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} פרויקט השבת. כל הזכויות שמורות.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-4 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  מדיניות פרטיות
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  תנאי שימוש
                </Link>
                <Link href="/accessibility" className="hover:text-white transition-colors">
                  נגישות
                </Link>
              </div>

              {/* Back to top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="חזרה למעלה"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}
