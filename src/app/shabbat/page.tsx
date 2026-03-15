import type { Metadata } from "next";
import ShabbatContent from "@/components/shabbat/ShabbatContent";

export const metadata: Metadata = {
  title: "השבת",
  description: "הכל על שמירת שבת - מדריכים, זמנים, טיפים ותכנים לשומרי שבת מתחילים ומתקדמים",
};

export default function ShabbatPage() {
  return <ShabbatContent />;
}
