"use client";

import { useState } from "react";

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
      <div className="card p-8 text-center">
        <span className="text-5xl block mb-4">✅</span>
        <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-2">
          ההודעה נשלחה בהצלחה!
        </h2>
        <p className="text-[var(--color-warm-gray)] mb-6">
          תודה על פנייתך. נחזור אליך בהקדם האפשרי.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="btn-primary px-6 py-2"
        >
          שלח הודעה נוספת
        </button>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-6">
        שלח לנו הודעה
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
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
          <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
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
          <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
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
          <label className="block text-sm font-medium text-[var(--color-blue-deep)] mb-1">
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
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "שולח..." : "שלח הודעה"}
        </button>
      </form>
    </div>
  );
}
