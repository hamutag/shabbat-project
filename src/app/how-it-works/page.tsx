import type { Metadata } from "next";
import HowItWorksContent from "@/components/how-it-works/HowItWorksContent";

export const metadata: Metadata = {
  title: "איך זה עובד",
  description: "כך פרויקט השבת פועל - הצטרפות, בחירת מצווה, ליווי אישי ושיעורי תורה",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <HowItWorksContent />
    </div>
  );
}
