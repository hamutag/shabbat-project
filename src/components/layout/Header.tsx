"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Flame,
  BookOpen,
  BarChart3,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "דף הבית" },
  { href: "/vision", label: "חזון" },
  { href: "/shabbat", label: "השבת" },
  { href: "/women", label: "מרכז לנשים" },
  { href: "/join", label: "קח על עצמך צעד" },
  { href: "/lessons", label: "שיעורי תורה" },
  { href: "/content", label: "מרכז תוכן" },
  { href: "/contact", label: "צור קשר" },
];

const USER_LINKS = [
  { href: "/dashboard", label: "האזור שלי", icon: LayoutDashboard },
  { href: "/my-mitzvot", label: "המצוות שלי", icon: Flame },
  { href: "/my-lessons", label: "השיעורים שלי", icon: BookOpen },
  { href: "/progress", label: "התקדמות", icon: BarChart3 },
  { href: "/profile", label: "הגדרות", icon: Settings },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const isLoggedIn = mounted && status === "authenticated" && !!session?.user;
  const userName =
    (session?.user as unknown as { firstName?: string })?.firstName ||
    session?.user?.name ||
    "משתמש";
  const userRole = (session?.user as unknown as { role?: string })?.role;
  const isAdmin =
    userRole &&
    [
      "CITY_COORD_MALE",
      "CITY_COORD_FEMALE",
      "NEIGHBORHOOD_HEAD",
      "CITY_HEAD",
      "REGION_HEAD",
      "NATIONAL_ADMIN",
    ].includes(userRole);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-md border-b border-gray-100/50"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="פרויקט השבת"
            width={48}
            height={48}
            className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-[var(--color-blue-deep)] leading-tight">
              פרויקט השבת
            </h1>
            <p className="text-[10px] text-[var(--color-warm-gray)] leading-none">
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
              className={`text-sm font-medium transition-colors relative py-1 ${
                isActive(link.href)
                  ? "text-[var(--color-gold)]"
                  : "text-[var(--color-blue-deep)] hover:text-[var(--color-gold)]"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-gold)] rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Auth Section + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {!mounted ? (
            <div className="w-24 h-8" />
          ) : isLoggedIn ? (
            <>
              {/* Desktop: User Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--color-cream)] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center text-white text-sm font-bold">
                    {userName.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-[var(--color-blue-deep)]">
                    {userName}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                    >
                      {USER_LINKS.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-blue-deep)] hover:bg-[var(--color-cream)] transition-colors"
                          >
                            <Icon className="w-4 h-4 text-[var(--color-warm-gray)]" />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                      {isAdmin && (
                        <>
                          <div className="border-t border-gray-100 my-1" />
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-blue-deep)] hover:bg-[var(--color-cream)] transition-colors"
                          >
                            <Shield className="w-4 h-4 text-[var(--color-warm-gray)]" />
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
                        <LogOut className="w-4 h-4" />
                        <span>התנתק</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="btn-primary text-sm py-2 px-5 hidden sm:inline-flex"
              >
                הצטרף עכשיו
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-[var(--color-blue-mid)] hover:text-[var(--color-gold)] hidden sm:block transition-colors"
              >
                התחברות
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="תפריט"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="container-main flex flex-col gap-1 pt-2 pb-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-[var(--color-gold)] bg-[var(--color-gold-light)]/20"
                      : "text-[var(--color-blue-deep)] hover:bg-[var(--color-blue-light)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  <div className="border-t border-gray-100 my-2" />
                  {USER_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="py-3 px-4 text-base font-medium text-[var(--color-blue-deep)] hover:bg-[var(--color-blue-light)] rounded-lg transition-colors flex items-center gap-3"
                      >
                        <Icon className="w-5 h-5 text-[var(--color-warm-gray)]" />
                        {link.label}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="py-3 px-4 text-base font-medium text-[var(--color-blue-deep)] hover:bg-[var(--color-blue-light)] rounded-lg transition-colors flex items-center gap-3"
                    >
                      <Shield className="w-5 h-5 text-[var(--color-warm-gray)]" />
                      ניהול
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="py-3 px-4 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-right flex items-center gap-3"
                  >
                    <LogOut className="w-5 h-5" />
                    התנתק
                  </button>
                </>
              ) : (
                <div className="flex gap-3 mt-3 px-4">
                  <Link
                    href="/register"
                    className="btn-primary text-sm py-2 px-5 flex-1 text-center"
                  >
                    הצטרף עכשיו
                  </Link>
                  <Link
                    href="/login"
                    className="btn-secondary text-sm py-2 px-5 flex-1 text-center"
                  >
                    התחברות
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
