import { formatCurrency } from "../utils/taxCalculations";

export default function SavingsBanner({ savings, selectedCount, totalLossCount }) {
  const hasSelection = selectedCount > 0;

  return (
    <div className="relative overflow-hidden rounded-xl2 bg-ink-900 px-6 py-7 text-sand-50 sm:px-8">
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #33C98D, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-mint-300">
            Tax loss harvesting
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">
            {hasSelection ? (
              <>
                You could save{" "}
                <span className="text-mint-300">{formatCurrency(savings)}</span> in taxes
              </>
            ) : (
              <>Harvest your losses to offset this year's gains</>
            )}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-sand-100/70">
            {totalLossCount > 0
              ? `${selectedCount} of ${totalLossCount} loss-making assets selected. Selling them locks in the loss so it can offset your taxable gains.`
              : "No unrealised losses in your portfolio right now — nothing to harvest today."}
          </p>
        </div>
      </div>
    </div>
  );
}
