const STEPS = [
  {
    number: "01",
    title: "Enter a topic",
    description:
      "Tell us what you want to learn — broad or specific. Jazz guitar, Korean, ML basics, anything.",
  },
  {
    number: "02",
    title: "Answer a few questions",
    description:
      "Share your goal, current level, weekly hours, timeline, depth, and preferred learning style.",
  },
  {
    number: "03",
    title: "Review your roadmap",
    description:
      "Get modules, lessons, milestones, and time estimates. Tweak duration, depth, or regenerate anytime.",
  },
  {
    number: "04",
    title: "Learn with your coach",
    description:
      "Work through lessons at your pace. Ask questions, get explanations, and track your progress.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          From curiosity to a clear path
        </h2>
        <p className="mt-4 text-lg text-ink-400">
          No rigid courses. Just a plan that fits how you actually learn.
        </p>
      </div>

      <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number} className="relative">
            <span className="font-display text-4xl font-semibold text-ink-800">
              {step.number}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
