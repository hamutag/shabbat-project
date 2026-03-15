import type { Metadata } from "next";
import OnboardingContent from "@/components/onboarding/OnboardingContent";

export const metadata: Metadata = {
  title: "התאמה אישית",
  description: "בחר מצוות ומסלול התחזקות שמתאימים לך",
};

export default function OnboardingPage() {
  return <OnboardingContent />;
}
