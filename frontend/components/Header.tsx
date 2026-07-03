export function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
      <a href="#" className="group flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-500/20 ring-1 ring-sage-400/30 transition group-hover:bg-sage-500/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 text-sage-400"
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
        <span className="font-display text-xl font-semibold tracking-tight text-white">
          Pathway
        </span>
      </a>

      <nav className="hidden items-center gap-8 text-sm text-ink-300 md:flex">
        <a href="#how-it-works" className="transition hover:text-white">
          How it works
        </a>
        <a href="#features" className="transition hover:text-white">
          Features
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="hidden rounded-lg px-4 py-2 text-sm text-ink-300 transition hover:text-white sm:block"
        >
          Sign in
        </button>
        <button
          type="button"
          className="rounded-lg bg-sage-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-sage-600/20 transition hover:bg-sage-400"
        >
          Get started
        </button>
      </div>
    </header>
  );
}
