const STEPS = [
  {
    number: "01",
    title: "Start with a goal",
    description:
      "A learner enters any topic — from a hobby to a career objective — and the planner begins shaping a path immediately.",
  },
  {
    number: "02",
    title: "Shape the plan",
    description:
      "A few smart questions tailor the roadmap around level, time availability, timeline, and learning style.",
  },
  {
    number: "03",
    title: "See the roadmap",
    description:
      "The experience turns that input into a visible curriculum with modules, milestones, and realistic pacing.",
  },
  {
    number: "04",
    title: "Learn with support",
    description:
      "The AI tutor stays close to the lesson, helping the user understand, practice, and keep moving forward.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          A product story that feels tangible
        </h2>
        <p className="mt-4 text-lg text-ink-400">
          Instead of a static landing page, the experience frames the product as a coach that plans, adapts, and teaches.
        </p>
      </div>

      <ol className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number} className="rounded-2xl border border-ink-800/60 bg-ink-900/40 p-6">
            <span className="font-display text-4xl font-semibold text-sage-400">
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
