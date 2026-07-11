import { formatCurrency } from "../utils/taxCalculations";

export default function HarvestBar({ selectedCount, savings, onSubmit, submitting, disabled }) {
  return (
    <div className="sticky bottom-4 z-10 mt-6">
      <div className="flex flex-col items-center justify-between gap-3 rounded-xl2 border border-ink-900/8 bg-white/95 px-5 py-4 shadow-pop backdrop-blur sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-50 font-mono-num text-sm font-semibold text-mint-700">
            {selectedCount}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-900">
              {selectedCount === 0 ? "No assets selected" : `Asset${selectedCount > 1 ? "s" : ""} ready to harvest`}
            </p>
            <p className="text-xs text-ink-900/50">
              Estimated tax saved:{" "}
              <span className="font-mono-num font-semibold text-mint-700">{formatCurrency(savings)}</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={disabled || submitting}
          onClick={onSubmit}
          className="w-full rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {submitting ? "Harvesting…" : "Harvest selected losses"}
        </button>
      </div>
    </div>
  );
}
