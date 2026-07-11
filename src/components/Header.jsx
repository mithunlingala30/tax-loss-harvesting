export default function Header() {
  return (
    <header className="border-b border-ink-900/8 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <path
                d="M9 21L15 11L20 18L23 13"
                stroke="#65DEAB"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
            Koin<span className="text-mint-600">X</span>
          </span>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-900/60 md:flex">
          <a className="transition hover:text-ink-900" href="#">
            Portfolio
          </a>
          <a className="text-ink-900" href="#">
            Tax Harvesting
          </a>
          <a className="transition hover:text-ink-900" href="#">
            Reports
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-mint-50 px-3 py-1 text-xs font-semibold text-mint-700 sm:inline-block">
            FY 2025–26
          </span>
          <div className="h-8 w-8 rounded-full bg-ink-800" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
