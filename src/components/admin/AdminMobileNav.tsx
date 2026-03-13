"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ADMIN_LINKS = [
  { href: "/admin", label: "לוח בקרה", icon: "📊" },
  { href: "/admin/users", label: "משתמשים", icon: "👥" },
  { href: "/admin/lessons", label: "שיעורים", icon: "📚" },
  { href: "/admin/content", label: "תוכן", icon: "📝" },
  { href: "/admin/mentoring", label: "ליווי", icon: "🤝" },
  { href: "/admin/reports", label: "דוחות", icon: "📈" },
  { href: "/admin/settings", label: "הגדרות", icon: "⚙️" },
];

export default function AdminMobileNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Top Bar */}
      <div className="bg-[var(--color-blue-deep)] text-white px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-gold)]">
          🛡️ ניהול פרויקט השבת
        </h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-[var(--color-blue-deep)] border-t border-white/10 px-4 pb-4">
          <nav className="grid grid-cols-4 gap-2">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex flex-col items-center gap-1 px-2 py-3 rounded-lg text-xs transition-colors ${
                  isActive(link.href)
                    ? "bg-white/15 text-[var(--color-gold)] font-semibold"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex flex-col items-center gap-1 px-2 py-3 rounded-lg text-xs text-gray-300 hover:bg-white/10"
            >
              <span className="text-lg">🏠</span>
              <span>חזרה</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
