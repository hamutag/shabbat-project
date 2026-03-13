import type { Metadata } from "next";
import AdminUsersContent from "@/components/admin/AdminUsersContent";

export const metadata: Metadata = {
  title: "ניהול משתמשים | ניהול",
  description: "ניהול משתמשים, פעילים וחונכים",
};

export default function AdminUsersPage() {
  return <AdminUsersContent />;
}
