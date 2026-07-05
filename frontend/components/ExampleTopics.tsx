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
      </div>
    </section>
  );
}
