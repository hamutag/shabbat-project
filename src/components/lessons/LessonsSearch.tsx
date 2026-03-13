"use client";

import { useState } from "react";

const CITIES = [
  "ירושלים", "תל אביב", "חיפה", "באר שבע", "נתניה", "ראשון לציון",
  "פתח תקווה", "אשדוד", "חולון", "בני ברק", "רמת גן", "אשקלון",
  "בת ים", "הרצליה", "כפר סבא", "חדרה", "בית שמש", "מודיעין",
  "רעננה", "לוד", "רמלה", "עפולה", "נצרת עילית", "קריית גת",
  "אילת", "טבריה", "צפת", "עכו", "כרמיאל", "דימונה",
];

const TOPICS = [
  "פרשת שבוע", "אמונה וביטחון", "הלכה", "מוסר", "חסידות",
  "גמרא", "משנה", "תפילה", "שלום בית", "חינוך ילדים",
  "כשרות", "שבת", "חגים", "תשובה", "קבלה",
];

const DAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];

export function LessonsSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="card p-6 mb-8">
      {/* Search Bar */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="חפש שיעור תורה..."
          className="input-field flex-1"
        />
        <button className="btn-primary px-6">
          🔍 חפש
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <select className="input-field text-sm">
          <option value="">כל הערים</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select className="input-field text-sm">
          <option value="">כל הנושאים</option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>

        <select className="input-field text-sm">
          <option value="">כל הימים</option>
          {DAYS.map((day, i) => (
            <option key={day} value={i}>{day}</option>
          ))}
        </select>

        <select className="input-field text-sm">
          <option value="">קהל יעד</option>
          <option value="men">גברים</option>
          <option value="women">נשים</option>
          <option value="mixed">מעורב</option>
          <option value="youth">נוער</option>
          <option value="beginner">מתחילים</option>
        </select>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button className="badge badge-blue cursor-pointer hover:bg-[var(--color-blue-mid)] hover:text-white transition-colors">
          📍 ליד שלי
        </button>
        <button className="badge badge-gold cursor-pointer hover:bg-[var(--color-gold)] hover:text-white transition-colors">
          🕯️ שבת
        </button>
        <button className="badge badge-blue cursor-pointer hover:bg-[var(--color-blue-mid)] hover:text-white transition-colors">
          👩 נשים
        </button>
        <button className="badge badge-gold cursor-pointer hover:bg-[var(--color-gold)] hover:text-white transition-colors">
          🌱 מתחילים
        </button>
      </div>
    </div>
  );
}
