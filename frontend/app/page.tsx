import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { ExampleTopics } from "@/components/ExampleTopics";
import { Footer } from "@/components/Footer";
import { MockCurriculumFlow } from "@/components/MockCurriculumFlow";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-sage-600/10 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full bg-amber-500/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-sage-500/5 blur-3xl" />
      </div>

      <Header />
      <main>
        <Hero />
        <MockCurriculumFlow />
        <ExampleTopics />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
