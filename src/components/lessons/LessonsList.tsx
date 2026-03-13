"use client";

import Link from "next/link";
import { DAYS_HE } from "@/lib/utils";

const SAMPLE_LESSONS = [
  {
    id: "1",
    title: "פרשת שבוע - עומק הפשט",
    rabbiName: "הרב ישראל כהן",
    topic: "פרשת שבוע",
    city: "ירושלים",
    neighborhood: "רחביה",
    address: "רחוב עזה 12",
    dayOfWeek: 2,
    time: "20:00",
    audience: "MIXED" as const,
    level: "ALL" as const,
    phone: "02-1234567",
  },
  {
    id: "2",
    title: "אמונה בזמנים מאתגרים",
    rabbiName: "הרב דוד לוי",
    topic: "אמונה וביטחון",
    city: "תל אביב",
    neighborhood: "פלורנטין",
    address: "רחוב האומנים 8",
    dayOfWeek: 3,
    time: "19:30",
    audience: "MIXED" as const,
    level: "BEGINNER" as const,
    phone: "03-9876543",
  },
  {
    id: "3",
    title: "הלכות שבת למתחילים",
    rabbiName: "הרב משה דהן",
    topic: "הלכה",
    city: "חיפה",
    neighborhood: "נווה שאנן",
    address: "רחוב הנביאים 5",
    dayOfWeek: 1,
    time: "20:30",
    audience: "MEN" as const,
    level: "BEGINNER" as const,
    phone: "04-5551234",
  },
  {
    id: "4",
    title: "שיעור לנשים - אור הבית",
    rabbiName: "הרבנית שרה גולד",
    topic: "שלום בית",
    city: "באר שבע",
    neighborhood: "נווה נוי",
    address: "רחוב ההגנה 22",
    dayOfWeek: 3,
    time: "10:00",
    audience: "WOMEN" as const,
    level: "ALL" as const,
    phone: "08-6543210",
  },
  {
    id: "5",
    title: "גמרא בבלי - מסכת ברכות",
    rabbiName: "הרב אברהם שטיין",
    topic: "גמרא",
    city: "נתניה",
    neighborhood: "מרכז",
    address: "רחוב הרצל 44",
    dayOfWeek: 0,
    time: "21:00",
    audience: "MEN" as const,
    level: "ADVANCED" as const,
    phone: "09-1112233",
  },
  {
    id: "6",
    title: "חסידות למתחילים",
    rabbiName: "הרב יצחק פרידמן",
    topic: "חסידות",
    city: "ראשון לציון",
    neighborhood: "נחלת יהודה",
    address: "רחוב הבנים 3",
    dayOfWeek: 4,
    time: "20:00",
    audience: "MIXED" as const,
    level: "BEGINNER" as const,
    phone: "03-9998877",
  },
];

const AUDIENCE_LABELS = {
  MEN: "גברים",
  WOMEN: "נשים",
  MIXED: "מעורב",
  FAMILIES: "משפחות",
  YOUTH: "נוער",
};

const LEVEL_LABELS = {
  BEGINNER: "מתחילים",
  ADVANCED: "מתקדמים",
  ALL: "לכולם",
};

export function LessonsList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[var(--color-warm-gray)]">
          נמצאו <span className="font-bold text-[var(--color-blue-deep)]">{SAMPLE_LESSONS.length}</span> שיעורים
        </p>
        <div className="flex gap-2">
          <button className="badge badge-blue text-xs">📋 רשימה</button>
          <button className="badge text-xs bg-gray-100 text-gray-500">🗺️ מפה</button>
        </div>
      </div>

      <div className="space-y-4">
        {SAMPLE_LESSONS.map((lesson) => (
          <div key={lesson.id} className="card p-5">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-[var(--color-blue-deep)]">
                    {lesson.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--color-gold)] font-medium mb-2">
                  {lesson.rabbiName}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-warm-gray)]">
                  <span>📍 {lesson.city}, {lesson.neighborhood}</span>
                  <span>📅 יום {DAYS_HE[lesson.dayOfWeek]} {lesson.time}</span>
                  <span>📞 {lesson.phone}</span>
                </div>

                <div className="flex gap-2 mt-3">
                  <span className="badge badge-blue text-xs">
                    {lesson.topic}
                  </span>
                  <span className="badge badge-gold text-xs">
                    {AUDIENCE_LABELS[lesson.audience]}
                  </span>
                  <span className="badge text-xs bg-gray-100 text-gray-600">
                    {LEVEL_LABELS[lesson.level]}
                  </span>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2">
                <button className="btn-primary text-sm py-2 px-4">
                  הרשמה
                </button>
                <button className="btn-secondary text-sm py-2 px-4">
                  ♡ שמור
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lesson CTA */}
      <div className="card mt-8 p-6 bg-[var(--color-cream)] text-center">
        <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-2">
          אתה מוסר שיעור תורה?
        </h3>
        <p className="text-sm text-[var(--color-warm-gray)] mb-4">
          הוסף את השיעור שלך למאגר הארצי והגע לקהל חדש
        </p>
        <Link href="/join?type=rabbi" className="btn-primary text-sm">
          הוסף שיעור חדש
        </Link>
      </div>
    </div>
  );
}
