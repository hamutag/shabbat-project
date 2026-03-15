import type { Metadata } from "next";
import ContentPageContent from "@/components/content/ContentPageContent";

export const metadata: Metadata = {
  title: "מרכז תוכן",
  description: "מאמרים, סרטונים, שיעורים וחיזוקים - הכל במקום אחד",
};

export default function ContentPage() {
  return (
    <div className="gradient-light min-h-screen">
      <ContentPageContent />
    </div>
  );
}
