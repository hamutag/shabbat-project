import type { Metadata } from "next";
import DashboardContent from "@/components/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "האזור שלי",
  description: "הדשבורד האישי שלך בפרויקט השבת",
};

export default function DashboardPage() {
  return <DashboardContent />;
}
