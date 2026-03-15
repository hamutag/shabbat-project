import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "צור קשר עם צוות פרויקט השבת",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactPageContent />
    </div>
  );
}
