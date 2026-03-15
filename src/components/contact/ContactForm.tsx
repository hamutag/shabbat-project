"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Check,
  AlertCircle,
  User,
  Phone,
  Mail,
  MessageSquare,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.name.trim()) {
      setError("יש להזין שם מלא");
      return;
    }
    if (!form.phone.trim()) {
      setError("יש להזין מספר טלפון");
      return;
    }
    if (!form.message.trim()) {
      setError("יש לכתוב הודעה");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "שגיאה בשליחת ההודעה");
        return;
      }

      setSuccess(true);
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch {
      setError("שגיאה בשליחת ההודעה. אנא נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-8 text-center backdrop-blur-lg bg-white/80 border border-white/40"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-8 h-8 text-green-600" />
        </motion.div>
        <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
          ההודעה נשלחה בהצלחה!
        </h2>
        <p className="text-[var(--color-warm-gray)] mb-6">
          תודה על פנייתך. נחזור אליך בהקדם האפשרי.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSuccess(false)}
          className="btn-primary px-6 py-2 inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          שלח הודעה נוספת
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="card p-8 backdrop-blur-lg bg-white/80 border border-white/40">
      <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-[var(--color-gold)]" />
        שלח לנו הודעה
      </h2>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            שם מלא *
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="השם שלך"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" />
            טלפון *
          </label>
          <input
            type="tel"
            className="input-field"
            placeholder="050-0000000"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            dir="ltr"
            style={{ textAlign: "right" }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            אימייל
          </label>
          <input
            type="email"
            className="input-field"
            placeholder="email@example.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            dir="ltr"
            style={{ textAlign: "right" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
            נושא
          </label>
          <select
            className="input-field"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
          >
            <option value="">בחר נושא</option>
            <option value="join">רוצה להצטרף</option>
            <option value="coordinator">רוצה להיות רכז/ת</option>
            <option value="rabbi">רוצה להוסיף שיעור</option>
            <option value="donate">רוצה לתרום/לשתף פעולה</option>
            <option value="question">שאלה כללית</option>
            <option value="other">אחר</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            הודעה *
          </label>
          <textarea
            className="input-field min-h-[120px] resize-y"
            placeholder="כתוב את ההודעה שלך כאן..."
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              שולח...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              שלח הודעה
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
