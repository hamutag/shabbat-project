"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Handshake,
  BarChart3,
  Settings,
  UserPlus,
  BookPlus,
  PenSquare,
  Home,
  Shield,
  ChevronLeft,
} from "lucide-react";

const ADMIN_LINKS = [
  { href: "/admin", label: "לוח בקרה", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/admin/users", label: "ניהול משתמשים", icon: <Users className="w-5 h-5" /> },
  { href: "/admin/lessons", label: "ניהול שיעורים", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/admin/content", label: "ניהול תוכן", icon: <FileText className="w-5 h-5" /> },
  { href: "/admin/mentoring", label: "ליווי אישי", icon: <Handshake className="w-5 h-5" /> },
  { href: "/admin/reports", label: "דוחות", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/admin/settings", label: "הגדרות", icon: <Settings className="w-5 h-5" /> },
];

const QUICK_ACTIONS = [
  { href: "/admin/users?action=add", label: "הוסף משתמש", icon: <UserPlus className="w-4 h-4" /> },
  { href: "/admin/lessons?action=add", label: "הוסף שיעור", icon: <BookPlus className="w-4 h-4" /> },
  { href: "/admin/content?action=add", label: "הוסף תוכן", icon: <PenSquare className="w-4 h-4" /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-[var(--color-blue-deep)] to-[#152d4a] min-h-[calc(100vh-80px)] text-white flex-shrink-0 hidden lg:block relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-24 h-24 bg-[var(--color-gold)]/5 rounded-full blur-2xl" />

      <div className="p-6 relative">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-gold)]/15 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[var(--color-gold)]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-gold)]">ניהול</h2>
              <p className="text-[10px] text-gray-400">פרויקט השבת</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {ADMIN_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  active
                    ? "bg-white/12 text-[var(--color-gold)] font-semibold shadow-sm"
                    : "text-gray-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="admin-nav-active"
                    className="absolute inset-0 bg-white/12 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.icon}</span>
                <span className="relative z-10">{link.label}</span>
                {active && (
                  <ChevronLeft className="w-4 h-4 text-[var(--color-gold)] mr-auto relative z-10" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-white/8 my-6" />

        {/* Quick Actions */}
        <div>
          <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3 px-4">
            פעולות מהירות
          </h3>
          <div className="space-y-1">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/8 hover:text-white transition-all group"
              >
                <span className="group-hover:text-[var(--color-gold)] transition-colors">{action.icon}</span>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 my-6" />

        {/* Back to Site */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/8 hover:text-white transition-all group"
        >
          <Home className="w-5 h-5 group-hover:text-[var(--color-gold)] transition-colors" />
          <span>חזרה לאתר</span>
        </Link>
      </div>
    </aside>
  );
}
