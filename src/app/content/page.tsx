import type { Metadata } from "next";
import ContentPageContent from "@/components/content/ContentPageContent";

export const metadata: Metadata = {
  title: "מרכז תוכן",
  description: "מאמרים, סרטונים, שיעורים וחיזוקים - הכל במקום אחד",
};

export default function ContentPage() {
  return (
    <div className="gradient-light min-h-screen">
      <section className="py-16 text-center">
        <div className="container-main max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-blue-deep)] mb-4">
            מרכז תוכן
          </h1>
          <p className="text-xl text-[var(--color-warm-gray)]">
            מאמרים, סרטונים, שיעורים וחיזוקים — הכל במקום אחד
          </p>
        </div>
      </section>

      <div className="container-main pb-20">
        <ContentPageContent />
      </div>
    </div>
  );
}
