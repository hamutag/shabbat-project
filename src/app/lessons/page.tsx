import type { Metadata } from "next";
import LessonsContent from "@/components/lessons/LessonsContent";

export const metadata: Metadata = {
  title: "שיעורי תורה",
  description: "מצא שיעורי תורה קרובים אליך - חיפוש לפי עיר, נושא, רב, יום ושעה",
};

export default function LessonsPage() {
  return (
    <div className="min-h-screen">
      <LessonsContent />
    </div>
  );
}
