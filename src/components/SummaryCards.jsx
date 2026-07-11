import { formatCurrency } from "../utils/taxCalculations";

function TermCard({ label, sub, data }) {
  const improved = data.offset > 0;
  return (
    <div className="flex-1 rounded-xl2 border border-ink-900/8 bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold text-ink-900">{label}</h3>
          <p className="text-xs text-ink-900/50">{sub}</p>
        </div>
        <span className="rounded-full bg-ink-900/5 px-2.5 py-1 font-mono-num text-[11px] font-semibold text-ink-900/60">
          {(data.rate * 100).toFixed(0)}% rate
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-ink-900/40">
            Pre-Harvesting
          </p>
          <p className="mt-1 font-mono-num text-lg font-semibold text-ink-900">
            {formatCurrency(data.preGain)}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-ink-900/40">
            After Harvesting
          </p>
          <p
            className={`mt-1 font-mono-num text-lg font-semibold ${
              improved ? "text-mint-600" : "text-ink-900"
            }`}
          >
            {formatCurrency(data.postGain)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-sand-50 px-3 py-2">
        <span className="text-xs font-medium text-ink-900/60">Est. tax saved</span>
        <span className="font-mono-num text-sm font-semibold text-mint-700">
          {formatCurrency(data.savings)}
        </span>
      </div>
    </div>
  );
}

export default function SummaryCards({ summary }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <TermCard label="Short-Term Capital Gains" sub="Held under 12 months" data={summary.perTerm.short} />
      <TermCard label="Long-Term Capital Gains" sub="Held 12 months or more" data={summary.perTerm.long} />
    </div>
  );
}
