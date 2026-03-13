"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/admin", label: "לוח בקרה", icon: "📊" },
  { href: "/admin/users", label: "ניהול משתמשים", icon: "👥" },
  { href: "/admin/lessons", label: "ניהול שיעורים", icon: "📚" },
  { href: "/admin/content", label: "ניהול תוכן", icon: "📝" },
  { href: "/admin/mentoring", label: "ליווי אישי", icon: "🤝" },
  { href: "/admin/reports", label: "דוחות", icon: "📈" },
  { href: "/admin/settings", label: "הגדרות", icon: "⚙️" },
];

const QUICK_ACTIONS = [
  { href: "/admin/users?action=add", label: "הוסף משתמש", icon: "➕" },
  { href: "/admin/lessons?action=add", label: "הוסף שיעור", icon: "📖" },
  { href: "/admin/content?action=add", label: "הוסף תוכן", icon: "✏️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-[var(--color-blue-deep)] min-h-[calc(100vh-80px)] text-white flex-shrink-0 hidden lg:block">
      <div className="p-6">
        {/* Admin Header */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[var(--color-gold)]">
            🛡️ ניהול
          </h2>
          <p className="text-xs text-gray-400 mt-1">פרויקט השבת</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                isActive(link.href)
                  ? "bg-white/15 text-[var(--color-gold)] font-semibold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-white/10 my-6" />

        {/* Quick Actions */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
            פעולות מהירות
          </h3>
          <div className="space-y-1">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6" />

        {/* Back to Site */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span>🏠</span>
          <span>חזרה לאתר</span>
        </Link>
      </div>
    </aside>
  );
}
