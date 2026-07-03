export function Footer() {
  return (
    <footer className="border-t border-ink-800/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-500/20 ring-1 ring-sage-400/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-sage-400"
              aria-hidden
            >
              <path
                d="M4 19V5a1 1 0 011-1h14a1 1 0 011 1v14M8 7h8M8 11h8M8 15h5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold text-white">
            Pathway
          </span>
        </div>

        <p className="text-sm text-ink-500">
          Personal Curriculum Planner — prototype
        </p>

        <button
          type="button"
          className="rounded-lg border border-ink-700 px-5 py-2.5 text-sm font-medium text-ink-300 transition hover:border-sage-500/40 hover:text-white"
        >
          Start learning
        </button>
      </div>
    </footer>
  );
}
