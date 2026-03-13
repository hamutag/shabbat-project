import type { Metadata } from "next";
import ProfileContent from "@/components/profile/ProfileContent";

export const metadata: Metadata = {
  title: "הפרופיל שלי",
  description: "הגדרות חשבון ופרופיל אישי",
};

export default function ProfilePage() {
  return <ProfileContent />;
}
