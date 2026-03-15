import type { Metadata } from "next";
import RegisterContent from "@/components/auth/RegisterContent";

export const metadata: Metadata = {
  title: "הרשמה",
  description: "הצטרף לפרויקט השבת - יחד נאיר את עם ישראל",
};

export default function RegisterPage() {
  return <RegisterContent />;
}
