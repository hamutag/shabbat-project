import type { Metadata } from "next";
import MyMitzvotContent from "@/components/mitzvot/MyMitzvotContent";

export const metadata: Metadata = {
  title: "המצוות שלי",
  description: "מעקב אחרי המצוות שבחרת לשמור",
};

export default function MyMitzvotPage() {
  return <MyMitzvotContent />;
}
