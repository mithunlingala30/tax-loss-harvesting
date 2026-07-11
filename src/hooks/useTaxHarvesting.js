import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchHoldings, submitHarvest } from "../api/mockApi";
import { enrichHoldings, splitByPosition, summarizeHarvest } from "../utils/taxCalculations";

export function useTaxHarvesting() {
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [harvestState, setHarvestState] = useState("idle"); // idle | submitting | done
  const [receipt, setReceipt] = useState(null);

  const loadHoldings = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetchHoldings();
      const enriched = enrichHoldings(res.data);
      setHoldings(enriched);
      // Sensible default: auto-select every loss-making holding so the
      // user immediately sees the maximum possible savings, then can
      // deselect ones they don't want to sell.
      const lossIds = enriched.filter((h) => !h.isGain).map((h) => h.id);
      setSelectedIds(new Set(lossIds));
      setStatus("success");
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadHoldings();
  }, [loadHoldings]);

  const toggleSelected = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const { gains, losses } = useMemo(() => splitByPosition(holdings), [holdings]);

  const selectAllLosses = useCallback(() => {
    setSelectedIds(new Set(losses.map((h) => h.id)));
  }, [losses]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const summary = useMemo(() => summarizeHarvest(holdings, selectedIds), [holdings, selectedIds]);

  const submit = useCallback(async () => {
    setHarvestState("submitting");
    try {
      const res = await submitHarvest({
        coinIds: Array.from(selectedIds),
        estimatedSavings: summary.totals.savings,
      });
      setReceipt(res);
      setHarvestState("done");
    } catch (err) {
      setHarvestState("idle");
      setError(err.message);
    }
  }, [selectedIds, summary.totals.savings]);

  const dismissReceipt = useCallback(() => {
    setReceipt(null);
    setHarvestState("idle");
  }, []);

  return {
    status,
    error,
    holdings,
    gains,
    losses,
    selectedIds,
    toggleSelected,
    selectAllLosses,
    clearSelection,
    summary,
    reload: loadHoldings,
    harvestState,
    submit,
    receipt,
    dismissReceipt,
  };
}
