"use client";

import { useState } from "react";
import Link from "next/link";
import { trpc } from "@/lib/trpc";

const CATEGORIES = [
  { slug: "emunah", name: "אמונה וביטחון", icon: "💫" },
  { slug: "shabbat", name: "השבת", icon: "🕯️" },
  { slug: "tefilla", name: "תפילה", icon: "🙏" },
  { slug: "tefillin", name: "תפילין וטלית קטן", icon: "📿" },
  { slug: "brachot", name: "ברכות ונטילת ידיים", icon: "💧" },
  { slug: "kashrut", name: "כשרות", icon: "🥗" },
  { slug: "tahara", name: "טהרה", icon: "🌊" },
  { slug: "challah", name: "הפרשת חלה", icon: "🍞" },
  { slug: "shalom-bayit", name: "שלום בית", icon: "🏡" },
  { slug: "ahavat-israel", name: "אהבת ישראל", icon: "❤️" },
  { slug: "teshuva", name: "תשובה", icon: "💛" },
  { slug: "geula", name: "גאולה ובית המקדש", icon: "🏛️" },
  { slug: "youth", name: "נוער", icon: "🌱" },
  { slug: "family", name: "בית יהודי וחינוך", icon: "👨‍👩‍👧‍👦" },
  { slug: "halacha", name: "הלכה למעשה", icon: "⚖️" },
  { slug: "stories", name: "סיפורי התחזקות", icon: "📖" },
];

const TYPE_LABELS: Record<string, string> = {
  ARTICLE: "מאמר",
  VIDEO: "וידאו",
  PODCAST: "פודקאסט",
  QUOTE: "ציטוט",
  STORY: "סיפור",
  QA: "שאלה ותשובה",
  INFOGRAPHIC: "אינפוגרפיקה",
  TIP: "טיפ",
};

export default function ContentPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = trpc.content.list.useQuery({
    category: selectedCategory || undefined,
    type: selectedType ? (selectedType as "ARTICLE" | "VIDEO" | "PODCAST" | "QUOTE" | "STORY" | "QA" | "INFOGRAPHIC" | "TIP") : undefined,
    search: search || undefined,
    page,
    pageSize: 12,
  });

  const { data: dailyQuote } = trpc.content.dailyQuote.useQuery();

  const items = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  return (
    <>
      {/* Categories Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6">
          נושאים
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug);
                setPage(1);
              }}
              className={`card text-center py-5 group transition-all ${
                selectedCategory === cat.slug
                  ? "ring-2 ring-[var(--color-gold)] bg-amber-50"
                  : ""
              }`}
            >
              <span className="text-2xl block mb-2">{cat.icon}</span>
              <h3 className="font-semibold text-sm text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
                {cat.name}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* Search & Type Filter */}
      <section className="mb-8">
        <div className="card p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="חפש תוכן..."
              className="input-field text-sm md:col-span-2"
            />
            <select
              className="input-field text-sm"
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); setPage(1); }}
            >
              <option value="">כל הסוגים</option>
              <option value="ARTICLE">מאמר</option>
              <option value="VIDEO">וידאו</option>
              <option value="STORY">סיפור</option>
              <option value="QA">שאלה ותשובה</option>
              <option value="QUOTE">ציטוט</option>
              <option value="TIP">טיפ</option>
            </select>
          </div>
        </div>
      </section>

      {/* Content Items */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-blue-deep)]">
            {selectedCategory
              ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name || "תכנים"
              : "תכנים מומלצים"}
          </h2>
          <p className="text-sm text-[var(--color-warm-gray)]">
            {total} תכנים
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-6 h-40 animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <Link key={item.id} href={`/content/article/${item.id}`} className="card group p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-gold text-xs">
                    {item.category || "כללי"}
                  </span>
                  <span className="badge text-xs bg-gray-100 text-gray-500">
                    {TYPE_LABELS[item.type] || item.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors mb-2">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-3 text-xs text-[var(--color-warm-gray)]">
                  {item.viewCount > 0 && <span>👁 {item.viewCount} צפיות</span>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[var(--color-warm-gray)]">
            <span className="text-3xl block mb-2">📝</span>
            <p className="text-lg mb-2">אין תכנים עדיין</p>
            <p className="text-sm">תכנים יתווספו בקרוב</p>
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
      </section>

      {/* Daily Chizuk */}
      <section className="mb-16">
        <div className="quote-box max-w-2xl mx-auto">
          <h3 className="text-sm text-[var(--color-gold)] mb-4 font-sans font-bold">חיזוק היום</h3>
          <p className="relative z-10 text-xl">
            {dailyQuote?.text || "כל מצווה שלך מוסיפה אור עצום לעולם. אין מעשה קטן בעם ישראל."}
          </p>
          {dailyQuote?.source && (
            <p className="text-xs mt-3 text-[var(--color-gold)] opacity-70">
              — {dailyQuote.source}
            </p>
          )}
        </div>
      </section>

      {/* Q&A Section */}
      <section>
        <h2 className="text-2xl font-bold text-[var(--color-blue-deep)] mb-6">
          שאלות נפוצות של מתחילים
        </h2>
        <div className="space-y-3 max-w-2xl">
          {[
            "איך שומרים שבת?",
            "מה זה תפילין?",
            "איך מדליקים נרות שבת?",
            "מה עושים בבית כנסת?",
            "איך מתחילים להתחזק?",
            "האם אפשר להתחיל מדבר קטן?",
          ].map((q) => (
            <Link key={q} href="/content/qa" className="card py-4 px-5 flex items-center justify-between group">
              <span className="font-medium text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
                {q}
              </span>
              <span className="text-[var(--color-warm-gray)]">←</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
