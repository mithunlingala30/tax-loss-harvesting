export default function Tabs({ active, onChange, lossCount, gainCount }) {
  const tabs = [
    { id: "losses", label: "Losses", count: lossCount },
    { id: "gains", label: "Gains", count: gainCount },
  ];

  return (
    <div className="inline-flex rounded-full bg-ink-900/5 p-1">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-white text-ink-900 shadow-card"
                : "text-ink-900/50 hover:text-ink-900/80"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] font-mono-num ${
                isActive ? "bg-ink-900/8 text-ink-900/70" : "bg-ink-900/8 text-ink-900/40"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
