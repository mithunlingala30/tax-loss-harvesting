// Mock API layer
//
// In a real KoinX app these calls would hit the portfolio service
// (e.g. GET /api/v1/portfolio/holdings, POST /api/v1/tax/harvest).
// Here we simulate network latency and an envelope shape so the rest
// of the app can be swapped over to a real backend by only touching
// this file.

import rawHoldings from "../data/mockHoldings.json";

const NETWORK_DELAY_MS = 650;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Simulates GET /portfolio/holdings
 * Randomly (rarely) rejects to exercise the UI's error state.
 */
export async function fetchHoldings({ simulateError = false } = {}) {
  await delay(NETWORK_DELAY_MS);

  if (simulateError) {
    throw new Error("Unable to reach the portfolio service. Please try again.");
  }

  return {
    ok: true,
    data: clone(rawHoldings),
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Simulates POST /tax/harvest — "locks in" the selected lots.
 * Returns a confirmation payload the UI can use for a receipt/toast.
 */
export async function submitHarvest({ coinIds, estimatedSavings }) {
  await delay(500);

  if (!coinIds || coinIds.length === 0) {
    throw new Error("Select at least one asset to harvest.");
  }

  return {
    ok: true,
    confirmationId: `TLH-${Date.now().toString(36).toUpperCase()}`,
    harvestedCoinIds: coinIds,
    estimatedSavings,
    submittedAt: new Date().toISOString(),
  };
}
