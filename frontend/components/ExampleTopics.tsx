import { EXAMPLE_TOPICS } from "./Hero";

export function ExampleTopics() {
  return (
    <section className="border-y border-ink-800/60 bg-ink-900/30 py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-ink-500">
          Interest-based demo paths
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {EXAMPLE_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className="rounded-full border border-ink-700/80 bg-ink-950/50 px-4 py-2 text-sm text-ink-300 transition hover:border-sage-500/40 hover:bg-sage-500/10 hover:text-sage-400"
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { title: "Any topic", detail: "From photography to programming" },
            { title: "Your pace", detail: "Hours per week, depth, and style" },
            { title: "Guided lessons", detail: "AI tutor inside every lesson" },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-ink-800/80 bg-ink-900/70 p-6 shadow-2xl shadow-black/20"
            >
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{card.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
