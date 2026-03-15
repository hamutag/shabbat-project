"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import {
  Search,
  BookOpen,
  Video,
  Mic,
  Quote,
  BookHeart,
  HelpCircle,
  Lightbulb,
  BarChart3,
  Eye,
  ChevronLeft,
  FileText,
  Sparkles,
  Heart,
  Flame,
  Star,
  Droplets,
  Home,
  Users,
  Scale,
  Leaf,
  Baby,
  Church,
  HandHeart,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  emunah: <Sparkles className="w-5 h-5" />,
  shabbat: <Flame className="w-5 h-5" />,
  tefilla: <HandHeart className="w-5 h-5" />,
  tefillin: <Star className="w-5 h-5" />,
  brachot: <Droplets className="w-5 h-5" />,
  kashrut: <Leaf className="w-5 h-5" />,
  tahara: <Droplets className="w-5 h-5" />,
  challah: <Star className="w-5 h-5" />,
  "shalom-bayit": <Home className="w-5 h-5" />,
  "ahavat-israel": <Heart className="w-5 h-5" />,
  teshuva: <Sparkles className="w-5 h-5" />,
  geula: <Church className="w-5 h-5" />,
  youth: <Baby className="w-5 h-5" />,
  family: <Users className="w-5 h-5" />,
  halacha: <Scale className="w-5 h-5" />,
  stories: <BookHeart className="w-5 h-5" />,
};

const CATEGORIES = [
  { slug: "emunah", name: "אמונה וביטחון" },
  { slug: "shabbat", name: "השבת" },
  { slug: "tefilla", name: "תפילה" },
  { slug: "tefillin", name: "תפילין וטלית קטן" },
  { slug: "brachot", name: "ברכות ונטילת ידיים" },
  { slug: "kashrut", name: "כשרות" },
  { slug: "tahara", name: "טהרה" },
  { slug: "challah", name: "הפרשת חלה" },
  { slug: "shalom-bayit", name: "שלום בית" },
  { slug: "ahavat-israel", name: "אהבת ישראל" },
  { slug: "teshuva", name: "תשובה" },
  { slug: "geula", name: "גאולה ובית המקדש" },
  { slug: "youth", name: "נוער" },
  { slug: "family", name: "בית יהודי וחינוך" },
  { slug: "halacha", name: "הלכה למעשה" },
  { slug: "stories", name: "סיפורי התחזקות" },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  ARTICLE: <FileText className="w-3.5 h-3.5" />,
  VIDEO: <Video className="w-3.5 h-3.5" />,
  PODCAST: <Mic className="w-3.5 h-3.5" />,
  QUOTE: <Quote className="w-3.5 h-3.5" />,
  STORY: <BookHeart className="w-3.5 h-3.5" />,
  QA: <HelpCircle className="w-3.5 h-3.5" />,
  INFOGRAPHIC: <BarChart3 className="w-3.5 h-3.5" />,
  TIP: <Lightbulb className="w-3.5 h-3.5" />,
};

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
      <PageHero
        title="מרכז תוכן"
        subtitle="מאמרים, שיעורים, סיפורים וחיזוקים - הכל במקום אחד"
        icon={<BookOpen className="w-8 h-8" />}
        gradient="gold"
      />

      <div className="container-main py-12">
        {/* Categories Grid */}
        <AnimatedSection variant="fadeUp" className="mb-12">
          <h2 className="section-title mb-6">נושאים</h2>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <StaggerItem key={cat.slug}>
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug);
                    setPage(1);
                  }}
                  className={`card text-center py-5 w-full group transition-all ${
                    selectedCategory === cat.slug
                      ? "ring-2 ring-[var(--color-gold)] bg-amber-50/80 shadow-md"
                      : "hover:shadow-md"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-[var(--color-gold)] text-white"
                      : "bg-[var(--color-gold)]/10 text-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/20"
                  }`}>
                    {CATEGORY_ICONS[cat.slug] || <Star className="w-5 h-5" />}
                  </div>
                  <h3 className="font-semibold text-sm text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors">
                    {cat.name}
                  </h3>
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* Search & Type Filter */}
        <AnimatedSection variant="fadeUp" delay={0.1} className="mb-8">
          <div className="card p-4 backdrop-blur-sm bg-white/80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative md:col-span-2">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-warm-gray)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="חפש תוכן..."
                  className="input-field text-sm pr-10"
                />
              </div>
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
        </AnimatedSection>

        {/* Content Items */}
        <section className="mb-16">
          <AnimatedSection variant="fadeUp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">
                {selectedCategory
                  ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name || "תכנים"
                  : "תכנים מומלצים"}
              </h2>
              <p className="text-sm text-[var(--color-warm-gray)]">
                {total} תכנים
              </p>
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="card p-6 h-40 skeleton-shimmer" />
                ))}
              </motion.div>
            ) : items.length > 0 ? (
              <StaggerContainer key="items" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <StaggerItem key={item.id}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="card group p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="badge badge-gold text-xs flex items-center gap-1">
                          {CATEGORY_ICONS[item.category || ""] && (
                            <span className="w-3 h-3">{CATEGORY_ICONS[item.category || ""]}</span>
                          )}
                          {item.category || "כללי"}
                        </span>
                        <span className="badge text-xs bg-gray-100 text-gray-500 flex items-center gap-1">
                          {TYPE_ICONS[item.type]}
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
                        {item.viewCount > 0 && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {item.viewCount} צפיות
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 text-[var(--color-warm-gray)]"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg mb-2">אין תכנים עדיין</p>
                <p className="text-sm">תכנים יתווספו בקרוב</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                הקודם
              </button>
              <span className="text-sm text-[var(--color-warm-gray)] px-3">
                עמוד {page} מתוך {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                הבא
              </button>
            </div>
          )}
        </section>

        {/* Daily Chizuk */}
        <AnimatedSection variant="scaleUp" className="mb-16">
          <div className="quote-box max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-gold)]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[var(--color-gold)]/8 rounded-full blur-2xl" />
            <h3 className="text-sm text-[var(--color-gold)] mb-4 font-sans font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              חיזוק היום
            </h3>
            <p className="relative z-10 text-xl">
              {dailyQuote?.text || "כל מצווה שלך מוסיפה אור עצום לעולם. אין מעשה קטן בעם ישראל."}
            </p>
            {dailyQuote?.source && (
              <p className="text-xs mt-3 text-[var(--color-gold)] opacity-70">
                — {dailyQuote.source}
              </p>
            )}
          </div>
        </AnimatedSection>

        {/* Q&A Section */}
        <AnimatedSection variant="fadeUp">
          <h2 className="section-title mb-6">שאלות נפוצות של מתחילים</h2>
          <StaggerContainer className="space-y-3 max-w-2xl">
            {[
              "איך שומרים שבת?",
              "מה זה תפילין?",
              "איך מדליקים נרות שבת?",
              "מה עושים בבית כנסת?",
              "איך מתחילים להתחזק?",
              "האם אפשר להתחיל מדבר קטן?",
            ].map((q) => (
              <StaggerItem key={q}>
                <Link
                  href="/content?category=qa"
                  className="card py-4 px-5 flex items-center justify-between group hover:shadow-md transition-shadow"
                >
                  <span className="font-medium text-[var(--color-blue-deep)] group-hover:text-[var(--color-gold)] transition-colors flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[var(--color-gold)]" />
                    {q}
                  </span>
                  <ChevronLeft className="w-4 h-4 text-[var(--color-warm-gray)] group-hover:text-[var(--color-gold)] transition-colors" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>
      </div>
    </>
  );
}
