import type { Metadata } from "next";
import AdminLessonsContent from "@/components/admin/AdminLessonsContent";

export const metadata: Metadata = {
  title: "ניהול שיעורים | ניהול",
  description: "ניהול שיעורים, אישור שיעורים חדשים ומעקב",
};

export default function AdminLessonsPage() {
  return <AdminLessonsContent />;
}
