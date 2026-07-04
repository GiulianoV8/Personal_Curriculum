const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Personalized curriculum",
    description:
      "The planner turns a single idea into a structured path with modules, lessons, and milestones tailored to the user.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Realistic pacing",
    description:
      "The experience translates weekly availability into a schedule that feels doable and sustainable.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "AI tutor inside lessons",
    description:
      "When the learner is ready, the tutor explains, questions, and supports the next step without overwhelming them.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Progress that stays visible",
    description:
      "Learners can mark completion, log effort, and see momentum without needing a complex dashboard.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Flexible replanning",
    description:
      "If life changes, the plan shifts — shorter, deeper, or adjusted to match the learner’s current reality.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Private by default",
    description:
      "The system is designed with privacy in mind, making it feel safe and personal from day one.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-ink-800/60 bg-ink-900/20 py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A coach that plans, adapts, and teaches
          </h2>
          <p className="mt-4 text-lg text-ink-400">
            Pathway is designed to make self-learning feel structured, motivating, and genuinely usable.
          </p>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-ink-800/80 bg-ink-950/40 p-6 transition hover:border-sage-500/30 hover:bg-ink-900/60"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-500/15 text-sage-400">
                {feature.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
