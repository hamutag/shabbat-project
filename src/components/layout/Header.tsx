"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const NAV_LINKS = [
  { href: "/", label: "דף הבית" },
  { href: "/vision", label: "חזון" },
  { href: "/how-it-works", label: "איך זה עובד" },
  { href: "/join", label: "קח על עצמך צעד" },
  { href: "/lessons", label: "שיעורי תורה" },
  { href: "/content", label: "מרכז תוכן" },
  { href: "/contact", label: "צור קשר" },
];

const USER_LINKS = [
  { href: "/dashboard", label: "האזור שלי", icon: "🏠" },
  { href: "/my-mitzvot", label: "המצוות שלי", icon: "🕯️" },
  { href: "/my-lessons", label: "השיעורים שלי", icon: "📖" },
  { href: "/progress", label: "התקדמות", icon: "📊" },
  { href: "/profile", label: "הגדרות", icon: "⚙️" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated" && !!session?.user;
  const userName = (session?.user as unknown as { firstName?: string })?.firstName
    || session?.user?.name
    || "משתמש";
  const userRole = (session?.user as unknown as { role?: string })?.role;
  const isAdmin = userRole && ["CITY_COORD_MALE", "CITY_COORD_FEMALE", "NEIGHBORHOOD_HEAD", "CITY_HEAD", "REGION_HEAD", "NATIONAL_ADMIN"].includes(userRole);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white text-lg">
            🕯️
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--color-blue-deep)] leading-tight">
              פרויקט השבת
            </h1>
            <p className="text-[10px] text-[var(--color-warm-gray)] leading-none hidden sm:block">
              שתי שבתות של אחדות וגאולה
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-blue-deep)] hover:text-[var(--color-gold)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Section + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Desktop: User Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--color-cream)] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center text-white text-sm">
                    {userName.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-[var(--color-blue-deep)]">
                    {userName}
                  </span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {USER_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-blue-deep)] hover:bg-[var(--color-cream)] transition-colors"
                      >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    ))}
                    {isAdmin && (
                      <>
                        <div className="border-t border-gray-100 my-1" />
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-blue-deep)] hover:bg-[var(--color-cream)] transition-colors"
                        >
                          <span>🛡️</span>
                          <span>ניהול</span>
                        </Link>
                      </>
                    )}
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-right"
                    >
                      <span>🚪</span>
                      <span>התנתק</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/register" className="btn-primary text-sm py-2 px-5 hidden sm:inline-flex">
                הצטרף עכשיו
              </Link>
              <Link href="/login" className="text-sm font-medium text-[var(--color-blue-mid)] hover:text-[var(--color-gold)] hidden sm:block">
                התחברות
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="תפריט"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 pb-4">
          <nav className="container-main flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 text-base font-medium text-[var(--color-blue-deep)] hover:bg-[var(--color-blue-light)] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <div className="border-t border-gray-100 my-2" />
                {USER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="py-3 px-4 text-base font-medium text-[var(--color-blue-deep)] hover:bg-[var(--color-blue-light)] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <span>{link.icon}</span> {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="py-3 px-4 text-base font-medium text-[var(--color-blue-deep)] hover:bg-[var(--color-blue-light)] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <span>🛡️</span> ניהול
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="py-3 px-4 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-right"
                >
                  🚪 התנתק
                </button>
              </>
            ) : (
              <div className="flex gap-3 mt-3 px-4">
                <Link href="/register" className="btn-primary text-sm py-2 px-5 flex-1 text-center">
                  הצטרף עכשיו
                </Link>
                <Link href="/login" className="btn-secondary text-sm py-2 px-5 flex-1 text-center">
                  התחברות
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
