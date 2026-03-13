import type { Metadata } from "next";
import ProgressContent from "@/components/progress/ProgressContent";

export const metadata: Metadata = {
  title: "ההתקדמות שלי",
  description: "מעקב אחרי ההתקדמות הרוחנית שלך",
};

export default function ProgressPage() {
  return <ProgressContent />;
}
