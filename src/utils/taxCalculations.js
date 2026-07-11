// Core business logic for the Tax Loss Harvesting tool.
//
// Model (kept intentionally simple + explainable):
// 1. Every holding has an unrealised gain/loss = (currentPrice - avgBuyPrice) * quantity.
// 2. Holdings are bucketed by term ("short" < 12mo, "long" >= 12mo) because
//    they're taxed at different rates and can only offset gains of the same term.
// 3. "Pre-Harvesting" capital gains = the tax you're on the hook for today,
//    i.e. the sum of unrealised GAINS only (your losers haven't been sold yet,
//    so they can't offset anything until you harvest them).
// 4. "Post-Harvesting" capital gains = Pre-Harvesting gains minus whichever
//    LOSS-making holdings the user selects to harvest (sell), floored at 0
//    per term — you can't harvest your way into a negative tax bill.
// 5. Estimated savings = the resulting reduction in taxable gains * the
//    applicable tax rate for that term.

export const TAX_RATES = {
  short: 0.3, // illustrative short-term capital gains rate
  long: 0.2, // illustrative long-term capital gains rate
};

export function withMetrics(holding) {
  const unrealizedGain = (holding.currentPrice - holding.avgBuyPrice) * holding.quantity;
  const costBasis = holding.avgBuyPrice * holding.quantity;
  const currentValue = holding.currentPrice * holding.quantity;
  const changePct = costBasis === 0 ? 0 : (unrealizedGain / costBasis) * 100;

  return {
    ...holding,
    unrealizedGain,
    costBasis,
    currentValue,
    changePct,
    isGain: unrealizedGain >= 0,
  };
}

export function enrichHoldings(rawHoldings) {
  return rawHoldings.map(withMetrics);
}

export function splitByPosition(holdings) {
  const gains = holdings.filter((h) => h.isGain).sort((a, b) => b.unrealizedGain - a.unrealizedGain);
  const losses = holdings.filter((h) => !h.isGain).sort((a, b) => a.unrealizedGain - b.unrealizedGain);
  return { gains, losses };
}

function sumGainsByTerm(holdings, term) {
  return holdings
    .filter((h) => h.term === term && h.isGain)
    .reduce((total, h) => total + h.unrealizedGain, 0);
}

function sumSelectedLossesByTerm(holdings, selectedIds, term) {
  return holdings
    .filter((h) => h.term === term && !h.isGain && selectedIds.has(h.id))
    .reduce((total, h) => total + h.unrealizedGain, 0); // negative number
}

/**
 * Computes the full pre/post harvesting summary for both terms.
 * @param {Array} holdings - enriched holdings (see enrichHoldings)
 * @param {Set<string>} selectedIds - ids of loss-making holdings the user has chosen to harvest
 */
export function summarizeHarvest(holdings, selectedIds) {
  const terms = ["short", "long"];

  const perTerm = terms.reduce((acc, term) => {
    const preGain = sumGainsByTerm(holdings, term);
    const harvestedLoss = sumSelectedLossesByTerm(holdings, selectedIds, term); // <= 0
    const postGain = Math.max(preGain + harvestedLoss, 0);
    const offset = preGain - postGain;
    const savings = offset * TAX_RATES[term];

    acc[term] = {
      preGain,
      harvestedLoss,
      postGain,
      offset,
      savings,
      rate: TAX_RATES[term],
    };
    return acc;
  }, {});

  const totals = terms.reduce(
    (acc, term) => ({
      preGain: acc.preGain + perTerm[term].preGain,
      postGain: acc.postGain + perTerm[term].postGain,
      savings: acc.savings + perTerm[term].savings,
      harvestedLoss: acc.harvestedLoss + perTerm[term].harvestedLoss,
    }),
    { preGain: 0, postGain: 0, savings: 0, harvestedLoss: 0 }
  );

  return { perTerm, totals };
}

export function formatCurrency(value, { compact = false } = {}) {
  const rounded = Math.round(Math.abs(value));
  const sign = value < 0 ? "-" : "";
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: compact ? 1 : 0,
    notation: compact ? "compact" : "standard",
  });
  return `${sign}${formatter.format(rounded).replace("-", "")}`;
}

export function formatPercent(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}
