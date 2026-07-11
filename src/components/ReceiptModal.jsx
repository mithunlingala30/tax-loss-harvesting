import { formatCurrency } from "../utils/taxCalculations";

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center bg-ink-950/50 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-xl2 bg-white p-6 shadow-pop">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-mint-50">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#0B9C67" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-center font-display text-lg font-semibold text-ink-900">Harvest locked in</h2>
        <p className="mt-1 text-center text-sm text-ink-900/55">
          Confirmation <span className="font-mono-num">{receipt.confirmationId}</span>
        </p>

        <div className="mt-5 space-y-2 rounded-lg bg-sand-50 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-900/55">Assets harvested</span>
            <span className="font-mono-num font-semibold text-ink-900">{receipt.harvestedCoinIds.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-900/55">Estimated tax saved</span>
            <span className="font-mono-num font-semibold text-mint-700">
              {formatCurrency(receipt.estimatedSavings)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
        >
          Done
        </button>
      </div>
    </div>
  );
}
