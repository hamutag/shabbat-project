import type { Metadata } from "next";
import LessonsContent from "@/components/lessons/LessonsContent";

export const metadata: Metadata = {
  title: "שיעורי תורה",
  description: "מצא שיעורי תורה קרובים אליך - חיפוש לפי עיר, נושא, רב, יום ושעה",
};

export default function LessonsPage() {
  return (
    <div className="gradient-light min-h-screen">
      <section className="py-16 text-center">
        <div className="container-main max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-blue-deep)] mb-4">
            שיעורי תורה
          </h1>
          <p className="text-xl text-[var(--color-warm-gray)]">
            מצא שיעור תורה קרוב אליך — חינם
          </p>
        </div>
      </section>

      <div className="container-main pb-20">
        <LessonsContent />
      </div>
    </div>
  );
}
