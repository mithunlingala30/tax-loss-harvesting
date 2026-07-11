import CoinRow from "./CoinRow";

export default function CoinTable({
  holdings,
  selectable,
  selectedIds,
  onToggle,
  onSelectAll,
  onClearAll,
  emptyLabel,
}) {
  if (holdings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl2 border border-dashed border-ink-900/12 bg-white/60 py-16 text-center">
        <p className="font-display text-sm font-semibold text-ink-900/70">{emptyLabel}</p>
        <p className="text-xs text-ink-900/45">Nothing to show in this view right now.</p>
      </div>
    );
  }

  const allSelected = selectable && holdings.every((h) => selectedIds.has(h.id));

  return (
    <div className="overflow-hidden rounded-xl2 border border-ink-900/8 bg-white shadow-card">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-ink-900/8 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-900/40">
              {selectable && (
                <th className="w-10 py-3 pl-5">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => (allSelected ? onClearAll() : onSelectAll())}
                    aria-label="Select all"
                    className="h-4 w-4 cursor-pointer rounded border-ink-900/20 accent-mint-500"
                  />
                </th>
              )}
              <th className={`py-3 ${selectable ? "pl-3" : "pl-5"} pr-3 font-medium`}>Asset</th>
              <th className="px-3 py-3 text-right font-medium">Holdings</th>
              <th className="hidden px-3 py-3 text-right font-medium sm:table-cell">Avg. Buy</th>
              <th className="hidden px-3 py-3 text-right font-medium md:table-cell">Current Price</th>
              <th className="px-3 py-3 text-right font-medium">Change</th>
              <th className="py-3 pl-3 pr-5 text-right font-medium">Unrealised {selectable ? "Loss" : "Gain"}</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <CoinRow
                key={holding.id}
                holding={holding}
                selectable={selectable}
                selected={selectedIds.has(holding.id)}
                onToggle={onToggle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
