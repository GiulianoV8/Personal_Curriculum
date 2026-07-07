import Link from "next/link";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { ExampleTopics } from "@/components/ExampleTopics";
import { Footer } from "@/components/Footer";

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
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-ink-900/70 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage-400">
                  Sample curriculum
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Explore a guided linear algebra curriculum.
                </h2>
                <p className="mt-4 text-lg leading-8 text-ink-300">
                  This sample path walks through scalars, vectors, matrices, and transformations with interactive lessons and practice questions.
                </p>
              </div>

              <Link
                href="/learn"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-sage-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sage-400"
              >
                Open the curriculum
              </Link>
            </div>
          </div>
        </section>
        <ExampleTopics />
        <HowItWorks />
        <Features />
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border border-sage-500/20 bg-sage-500/5 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage-400">
                  Stay in the loop
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Interested in Pathway? Let us know.
                </h2>
                <p className="mt-4 text-lg leading-8 text-ink-300">
                  Sign up to hear about new features and get early access as we build out the full experience.
                </p>
              </div>

              <Link
                href="https://forms.gle/3SFW57hiB1284Bgq9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-sage-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sage-400"
              >
                Fill out the interest form
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
