import { HeroSection } from "@/components/home/HeroSection";
import { ValueBar } from "@/components/home/ValueBar";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CounterSection } from "@/components/home/CounterSection";
import { PopularTracks } from "@/components/home/PopularTracks";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { QuoteSection } from "@/components/home/QuoteSection";
import { CtaBottom } from "@/components/home/CtaBottom";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueBar />
      <HowItWorks />
      <CounterSection />
      <PopularTracks />
      <TestimonialsSection />
      <QuoteSection />
      <CtaBottom />
    </>
  );
}
