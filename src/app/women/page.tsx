import type { Metadata } from "next";
import WomenContent from "@/components/women/WomenContent";

export const metadata: Metadata = {
  title: "נשים",
  description: "מרכז חיזוק לנשים - הדלקת נרות, הפרשת חלה, טהרה, שלום בית ועוד",
};

export default function WomenPage() {
  return <WomenContent />;
}
