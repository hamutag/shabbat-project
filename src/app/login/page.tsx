import type { Metadata } from "next";
import LoginContent from "@/components/auth/LoginContent";

export const metadata: Metadata = {
  title: "התחברות",
  description: "התחבר לפרויקט השבת כדי להמשיך את המסע שלך",
};

export default function LoginPage() {
  return <LoginContent />;
}
