import Link from "next/link";

const EXAMPLE_TOPICS = [
  "Learn jazz guitar improvisation",
  "Pick up Korean",
  "Build a coding routine",
  "Study photography",
  "Linear algebra foundations",
];

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage-500/30 bg-sage-500/10 px-4 py-1.5 text-sm text-sage-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-400" />
            AI-powered learning coach for ambitious self-learners
          </p>

          <h1 className="font-display text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Turn any curiosity into a clear, guided learning path.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-300 sm:mx-0">
            Pathway helps people turn hobbies, career goals, and side projects into structured plans with pacing, milestones, and a tutor that adapts to how they learn.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-ink-700/60 bg-ink-900/80 p-2 shadow-2xl shadow-black/40 backdrop-blur-sm">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  placeholder="e.g. Learn jazz guitar improvisation"
                  className="flex-1 rounded-xl border border-transparent bg-ink-950/60 px-5 py-4 text-base text-white placeholder:text-ink-500 focus:border-sage-500/50 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
                  readOnly
                  aria-label="Learning topic"
                />
                <Link
                  href="/learn"
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sage-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-sage-400"
                >
                  Start the curriculum
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-ink-800/70 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-950 p-5 shadow-2xl shadow-black/30">
          <div className="rounded-2xl border border-ink-800/70 bg-ink-950/80 p-4">
            <div className="flex items-center justify-between border-b border-ink-800/60 pb-3">
              <div>
                <p className="text-sm font-semibold text-white">Example curriculum</p>
                <p className="text-xs text-ink-500">A flexible plan for any new skill • 6 weeks</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                ["Foundation", "Start with the basics and build confidence"],
                ["Practice", "Turn concepts into small, repeatable habits"],
                ["Milestones", "Track progress and adjust the plan as you go"],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-ink-800/60 bg-ink-900/70 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-xs text-ink-500">{detail}</p>
                    </div>
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-sage-500/20 bg-sage-500/10 p-3 text-sm text-sage-300">
              Practice Plan: spend a little time each day and revisit one concept with the tutor.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { EXAMPLE_TOPICS };
