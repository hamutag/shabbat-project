"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Handshake,
  BarChart3,
  Settings,
  Home,
  Shield,
  Menu,
  X,
} from "lucide-react";

const ADMIN_LINKS = [
  { href: "/admin", label: "לוח בקרה", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/admin/users", label: "משתמשים", icon: <Users className="w-5 h-5" /> },
  { href: "/admin/lessons", label: "שיעורים", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/admin/content", label: "תוכן", icon: <FileText className="w-5 h-5" /> },
  { href: "/admin/mentoring", label: "ליווי", icon: <Handshake className="w-5 h-5" /> },
  { href: "/admin/reports", label: "דוחות", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/admin/settings", label: "הגדרות", icon: <Settings className="w-5 h-5" /> },
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
      <div className="bg-gradient-to-l from-[var(--color-blue-deep)] to-[#152d4a] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--color-gold)]/15 flex items-center justify-center">
            <Shield className="w-4 h-4 text-[var(--color-gold)]" />
          </div>
          <h2 className="text-sm font-bold text-[var(--color-gold)]">
            ניהול פרויקט השבת
          </h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-gradient-to-b from-[var(--color-blue-deep)] to-[#152d4a] border-t border-white/10"
          >
            <nav className="grid grid-cols-4 gap-2 px-4 py-4">
              {ADMIN_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-xs transition-all ${
                      isActive(link.href)
                        ? "bg-white/12 text-[var(--color-gold)] font-semibold"
                        : "text-gray-300 hover:bg-white/8"
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ADMIN_LINKS.length * 0.04 }}
              >
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-xs text-gray-300 hover:bg-white/8"
                >
                  <Home className="w-5 h-5" />
                  <span>חזרה</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
