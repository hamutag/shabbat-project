"use client";

import { useState } from "react";
import Link from "next/link";
import { trpc } from "@/lib/trpc";
import { DAYS_HE } from "@/lib/utils";

const AUDIENCE_LABELS: Record<string, string> = {
  MEN: "גברים",
  WOMEN: "נשים",
  MIXED: "מעורב",
  FAMILIES: "משפחות",
  YOUTH: "נוער",
};

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: "מתחילים",
  ADVANCED: "מתקדמים",
  ALL: "לכולם",
};

export default function LessonsContent() {
  const [search, setSearch] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<number | undefined>();
  const [audience, setAudience] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = trpc.lesson.search.useQuery({
    search: search || undefined,
    dayOfWeek,
    audience: audience ? (audience as "MEN" | "WOMEN" | "MIXED" | "FAMILIES" | "YOUTH") : undefined,
    level: level ? (level as "BEGINNER" | "ADVANCED" | "ALL") : undefined,
    page,
    pageSize: 20,
  });

  const registerMutation = trpc.lesson.register.useMutation({
    onSuccess: () => {
      alert("נרשמת בהצלחה לשיעור!");
    },
  });

  const lessons = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const handleSearch = () => {
    setPage(1);
  };

  return (
    <>
      {/* Search & Filters */}
      <div className="card p-6 mb-8">
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="חפש שיעור תורה..."
            className="input-field flex-1"
          />
          <button onClick={handleSearch} className="btn-primary px-6">
            🔍 חפש
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <select
            className="input-field text-sm"
            value={dayOfWeek ?? ""}
            onChange={(e) => {
              setDayOfWeek(e.target.value ? Number(e.target.value) : undefined);
              setPage(1);
            }}
          >
            <option value="">כל הימים</option>
            {DAYS_HE.slice(0, 6).map((day, i) => (
              <option key={day} value={i}>{day}</option>
            ))}
          </select>

          <select
            className="input-field text-sm"
            value={audience}
            onChange={(e) => { setAudience(e.target.value); setPage(1); }}
          >
            <option value="">קהל יעד</option>
            <option value="MEN">גברים</option>
            <option value="WOMEN">נשים</option>
            <option value="MIXED">מעורב</option>
            <option value="YOUTH">נוער</option>
          </select>

          <select
            className="input-field text-sm"
            value={level}
            onChange={(e) => { setLevel(e.target.value); setPage(1); }}
          >
            <option value="">רמה</option>
            <option value="BEGINNER">מתחילים</option>
            <option value="ADVANCED">מתקדמים</option>
            <option value="ALL">לכולם</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[var(--color-warm-gray)]">
            נמצאו <span className="font-bold text-[var(--color-blue-deep)]">{total}</span> שיעורים
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-5 h-32 animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : lessons.length > 0 ? (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="card p-5">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--color-blue-deep)]">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-[var(--color-gold)] font-medium mb-2">
                      {lesson.rabbiName}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-warm-gray)]">
                      <span>📍 {lesson.city?.name || ""}{lesson.address ? `, ${lesson.address}` : ""}</span>
                      <span>📅 יום {typeof lesson.dayOfWeek === "number" ? DAYS_HE[lesson.dayOfWeek] : ""} {lesson.time || ""}</span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      {lesson.audience && (
                        <span className="badge badge-gold text-xs">
                          {AUDIENCE_LABELS[lesson.audience] || lesson.audience}
                        </span>
                      )}
                      {lesson.level && (
                        <span className="badge text-xs bg-gray-100 text-gray-600">
                          {LEVEL_LABELS[lesson.level] || lesson.level}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2">
                    <button
                      onClick={() => registerMutation.mutate({ lessonId: lesson.id })}
                      disabled={registerMutation.isPending}
                      className="btn-primary text-sm py-2 px-4 disabled:opacity-60"
                    >
                      {registerMutation.isPending ? "נרשם..." : "הרשמה"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[var(--color-warm-gray)]">
            <span className="text-3xl block mb-2">📖</span>
            <p className="text-lg mb-2">לא נמצאו שיעורים</p>
            <p className="text-sm">נסה לשנות את מילות החיפוש או הפילטרים</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              הקודם
            </button>
            <span className="text-sm text-[var(--color-warm-gray)]">
              עמוד {page} מתוך {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              הבא
            </button>
          </div>
        )}
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
    </>
  );
}
