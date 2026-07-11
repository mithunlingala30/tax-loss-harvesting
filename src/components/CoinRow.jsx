import CoinBadge from "./CoinBadge";
import { formatCurrency, formatPercent } from "../utils/taxCalculations";

export default function CoinRow({ holding, selectable, selected, onToggle }) {
  const gainColor = holding.isGain ? "text-mint-600" : "text-coral-500";

  return (
    <tr
      className={`border-b border-ink-900/6 text-sm transition last:border-0 ${
        selected ? "bg-mint-50/60" : "hover:bg-ink-900/[0.02]"
      }`}
    >
      {selectable && (
        <td className="w-10 py-3 pl-5">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggle(holding.id)}
            aria-label={`Select ${holding.name} for harvesting`}
            className="h-4 w-4 cursor-pointer rounded border-ink-900/20 text-mint-500 accent-mint-500 focus:ring-mint-400"
          />
        </td>
      )}
      <td className={`py-3 ${selectable ? "pl-3" : "pl-5"} pr-3`}>
        <div className="flex items-center gap-3">
          <CoinBadge symbol={holding.symbol} color={holding.color} size={32} />
          <div>
            <p className="font-medium text-ink-900">{holding.name}</p>
            <p className="text-xs text-ink-900/45">{holding.symbol}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-right font-mono-num text-ink-900/80">
        {holding.quantity.toLocaleString("en-IN", { maximumFractionDigits: 4 })}
      </td>
      <td className="hidden px-3 py-3 text-right font-mono-num text-ink-900/80 sm:table-cell">
        {formatCurrency(holding.avgBuyPrice)}
      </td>
      <td className="hidden px-3 py-3 text-right font-mono-num text-ink-900/80 md:table-cell">
        {formatCurrency(holding.currentPrice)}
      </td>
      <td className="px-3 py-3 text-right">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${gainColor} ${holding.isGain ? "bg-mint-50" : "bg-coral-50"}`}>
          {formatPercent(holding.changePct)}
        </span>
      </td>
      <td className={`py-3 pl-3 pr-5 text-right font-mono-num font-semibold ${gainColor}`}>
        {formatCurrency(holding.unrealizedGain)}
      </td>
    </tr>
  );
}
