import type { Metadata } from "next";
import { Suspense } from "react";
import JoinContent from "@/components/join/JoinContent";

export const metadata: Metadata = {
  title: "קח על עצמך צעד אחד",
  description: "בחר מצווה או מסלול התחזקות שמתאים לך - שבת, תפילין, ברכות, כשרות ועוד",
};

export default function JoinPage() {
  return (
    <Suspense>
      <JoinContent />
    </Suspense>
  );
}
