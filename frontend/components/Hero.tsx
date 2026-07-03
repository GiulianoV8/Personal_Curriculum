const EXAMPLE_TOPICS = [
  "Jazz guitar improvisation",
  "Korean for beginners",
  "Machine learning basics",
  "Film photography",
  "Bayesian statistics",
];

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage-500/30 bg-sage-500/10 px-4 py-1.5 text-sm text-sage-400">
          <span className="h-1.5 w-1.5 rounded-full bg-sage-400" />
          AI-powered learning coach
        </p>

        <h1 className="font-display text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          What should you learn next?
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-300">
          Enter any topic and get a personalized curriculum, pacing plan, and
          lesson sequence — built for your schedule, level, and learning style.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <div className="rounded-2xl border border-ink-700/60 bg-ink-900/80 p-2 shadow-2xl shadow-black/40 backdrop-blur-sm">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder="e.g. Learn jazz guitar improvisation"
              className="flex-1 rounded-xl border border-transparent bg-ink-950/60 px-5 py-4 text-base text-white placeholder:text-ink-500 focus:border-sage-500/50 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
              readOnly
              aria-label="Learning topic"
            />
            <button
              type="button"
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-4 text-base font-semibold text-ink-950 transition hover:bg-amber-400"
            >
              Build my plan
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-ink-500">
          Prototype — topic input and plan generation coming soon
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
        {[
          {
            stat: "Any topic",
            label: "From photography to programming",
          },
          {
            stat: "Your pace",
            label: "Hours per week, depth, and style",
          },
          {
            stat: "Guided lessons",
            label: "AI tutor inside every lesson",
          },
        ].map((item) => (
          <div
            key={item.stat}
            className="rounded-xl border border-ink-800/80 bg-ink-900/40 px-6 py-5 text-center"
          >
            <p className="font-display text-lg font-semibold text-sage-400">
              {item.stat}
            </p>
            <p className="mt-1 text-sm text-ink-400">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export { EXAMPLE_TOPICS };
