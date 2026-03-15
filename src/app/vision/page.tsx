import type { Metadata } from "next";
import VisionContent from "@/components/vision/VisionContent";

export const metadata: Metadata = {
  title: "חזון",
  description: "החזון של פרויקט השבת - לאחד את עם ישראל סביב קדושת השבת",
};

export default function VisionPage() {
  return (
    <div className="min-h-screen">
      <VisionContent />
    </div>
  );
}
