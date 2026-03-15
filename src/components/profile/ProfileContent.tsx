"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  ArrowRight,
  User,
  Save,
  Check,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Home,
  KeyRound,
  Smartphone,
  Download,
  LogOut,
  Bell,
  Sparkles,
  Clock,
  BookOpen,
  Loader2,
} from "lucide-react";

export default function ProfileContent() {
  const { data: user, isLoading } = trpc.user.me.useQuery();
  const utils = trpc.useUtils();

  const updateProfile = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      utils.user.me.invalidate();
      setSuccessMsg("הפרופיל עודכן בהצלחה!");
      setTimeout(() => setSuccessMsg(""), 3000);
    },
    onError: () => {
      setError("שגיאה בעדכון הפרופיל");
    },
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    neighborhood: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        neighborhood: user.neighborhood || "",
      });
    }
  }, [user]);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setError("");
    updateProfile.mutate({
      firstName: form.firstName || undefined,
      lastName: form.lastName || undefined,
      email: form.email || undefined,
      neighborhood: form.neighborhood || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="gradient-light min-h-screen py-8 relative overflow-hidden">
        <GradientOrbs variant="light" />
        <div className="container-main max-w-2xl relative">
          <div className="h-8 w-48 rounded skeleton-shimmer mb-6" />
          <div className="card p-6 mb-6 space-y-4 backdrop-blur-lg bg-white/80">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full skeleton-shimmer" />
              <div className="space-y-2">
                <div className="h-6 w-32 rounded skeleton-shimmer" />
                <div className="h-4 w-24 rounded skeleton-shimmer" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 rounded skeleton-shimmer" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("he-IL", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="gradient-light min-h-screen py-8 relative overflow-hidden">
      <GradientOrbs variant="light" />

      <div className="container-main max-w-2xl relative">
        <AnimatedSection variant="fadeUp">
          <div className="mb-6">
            <Link href="/dashboard" className="text-sm text-[var(--color-gold)] hover:underline inline-flex items-center gap-1 group">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              חזרה לאזור האישי
            </Link>
            <h1 className="text-2xl font-bold text-[var(--color-blue-deep)] mt-2">
              הפרופיל שלי
            </h1>
          </div>
        </AnimatedSection>

        {/* Success / Error Messages */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2"
            >
              <Check className="w-4 h-4 flex-shrink-0" />
              {successMsg}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar & Form */}
        <AnimatedSection variant="fadeUp" delay={0.1}>
          <div className="card p-6 mb-6 backdrop-blur-lg bg-white/80 border border-white/40">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-blue-light)] to-[var(--color-blue-mid)]/20 flex items-center justify-center">
                <User className="w-8 h-8 text-[var(--color-blue-deep)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--color-blue-deep)]">
                  {user?.firstName} {user?.lastName}
                </h2>
                {joinDate && (
                  <p className="text-sm text-[var(--color-warm-gray)] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    הצטרף: {joinDate}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  שם פרטי
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  שם משפחה
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  טלפון
                </label>
                <input
                  type="tel"
                  value={user?.phone || ""}
                  className="input-field bg-gray-50"
                  dir="ltr"
                  disabled
                />
                <p className="text-xs text-[var(--color-warm-gray)] mt-1">
                  לא ניתן לשנות מספר טלפון
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  אימייל
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="input-field"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  עיר
                </label>
                <input
                  type="text"
                  value={user?.city?.name || ""}
                  className="input-field bg-gray-50"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  שכונה
                </label>
                <input
                  type="text"
                  value={form.neighborhood}
                  onChange={(e) => updateField("neighborhood", e.target.value)}
                  className="input-field"
                  placeholder="הזן שכונה"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={updateProfile.isPending}
              className="btn-primary mt-6 disabled:opacity-60 inline-flex items-center gap-2"
            >
              {updateProfile.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  שומר...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  שמור שינויים
                </>
              )}
            </motion.button>
          </div>
        </AnimatedSection>

        {/* Preferences */}
        <AnimatedSection variant="fadeUp" delay={0.2}>
          <div className="card p-6 mb-6 backdrop-blur-lg bg-white/80 border border-white/40">
            <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[var(--color-gold)]" />
              העדפות
            </h3>
            <div className="space-y-4">
              {[
                { label: "התראות SMS", desc: "קבל תזכורות וחיזוקים ב-SMS", defaultChecked: true, icon: <Phone className="w-4 h-4" /> },
                { label: "חיזוק יומי", desc: "קבל ציטוט חיזוק כל בוקר", defaultChecked: true, icon: <Sparkles className="w-4 h-4" /> },
                { label: "תזכורת שבת", desc: "תזכורת לפני כניסת שבת", defaultChecked: true, icon: <Clock className="w-4 h-4" /> },
                { label: "עדכוני שיעורים", desc: "הודעה על שיעורים חדשים ליד הבית", defaultChecked: false, icon: <BookOpen className="w-4 h-4" /> },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)]">
                      {pref.icon}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-blue-deep)]">{pref.label}</p>
                      <p className="text-xs text-[var(--color-warm-gray)]">{pref.desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={pref.defaultChecked} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-gold)]" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Account Actions */}
        <AnimatedSection variant="fadeUp" delay={0.3}>
          <div className="card p-6 backdrop-blur-lg bg-white/80 border border-white/40">
            <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--color-gold)]" />
              חשבון
            </h3>
            <div className="space-y-1">
              {[
                { label: "שנה סיסמה", icon: <KeyRound className="w-4 h-4" /> },
                { label: "אימות דו-שלבי", icon: <Smartphone className="w-4 h-4" /> },
                { label: "הורד את המידע שלי", icon: <Download className="w-4 h-4" /> },
              ].map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ x: -4 }}
                  className="w-full text-right p-3 rounded-lg hover:bg-[var(--color-cream)] transition-colors text-sm flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-warm-gray)] group-hover:text-[var(--color-gold)] transition-colors">
                    {action.icon}
                  </div>
                  <span className="text-[var(--color-blue-deep)]">{action.label}</span>
                </motion.button>
              ))}
              <hr className="my-2" />
              <motion.button
                whileHover={{ x: -4 }}
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-right p-3 rounded-lg hover:bg-red-50 transition-colors text-sm flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="text-red-600">התנתק</span>
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
