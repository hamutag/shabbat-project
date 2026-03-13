import type { Metadata } from "next";
import MyLessonsContent from "@/components/lessons/MyLessonsContent";

export const metadata: Metadata = {
  title: "השיעורים שלי",
  description: "שיעורים שנרשמת אליהם ושיעורים שמורים",
};

export default function MyLessonsPage() {
  return <MyLessonsContent />;
}
