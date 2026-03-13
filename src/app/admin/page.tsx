import type { Metadata } from "next";
import AdminDashboardContent from "@/components/admin/AdminDashboardContent";

export const metadata: Metadata = {
  title: "לוח בקרה | ניהול",
  description: "לוח בקרה לרכזי ערים ומנהלי פרויקט השבת",
};

export default function AdminDashboardPage() {
  return <AdminDashboardContent />;
}
