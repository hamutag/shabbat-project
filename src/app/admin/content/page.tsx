import type { Metadata } from "next";
import AdminContentContent from "@/components/admin/AdminContentContent";

export const metadata: Metadata = {
  title: "ניהול תוכן | ניהול",
  description: "ניהול מאמרים, סרטונים ותוכן חינוכי",
};

export default function AdminContentPage() {
  return <AdminContentContent />;
}
