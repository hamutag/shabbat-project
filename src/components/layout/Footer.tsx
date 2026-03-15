import Link from "next/link";

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
  return (
    <footer className="bg-[var(--color-blue-deep)] text-white">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-lg">
                🕯️
              </div>
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
            <div className="text-sm text-gray-300 space-y-1">
              <p>ארנון דהאן</p>
              <p dir="ltr" className="text-right">058-7267726</p>
              <p dir="ltr" className="text-right">dahanarnon@gmail.com</p>
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
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
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
        </div>
      </div>
    </footer>
  );
}
