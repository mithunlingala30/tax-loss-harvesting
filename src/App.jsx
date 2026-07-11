import { useState } from "react";
import Header from "./components/Header";
import SavingsBanner from "./components/SavingsBanner";
import SummaryCards from "./components/SummaryCards";
import Tabs from "./components/Tabs";
import CoinTable from "./components/CoinTable";
import Loader from "./components/Loader";
import ErrorState from "./components/ErrorState";
import HarvestBar from "./components/HarvestBar";
import ReceiptModal from "./components/ReceiptModal";
import { useTaxHarvesting } from "./hooks/useTaxHarvesting";

export default function App() {
  const [activeTab, setActiveTab] = useState("losses");
  const {
    status,
    error,
    gains,
    losses,
    selectedIds,
    toggleSelected,
    selectAllLosses,
    clearSelection,
    summary,
    reload,
    harvestState,
    submit,
    receipt,
    dismissReceipt,
  } = useTaxHarvesting();

  const activeHoldings = activeTab === "losses" ? losses : gains;

  return (
    <div className="min-h-screen bg-sand-50 pb-16">
      <Header />

      <main className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        {status === "loading" && <Loader />}

        {status === "error" && <ErrorState message={error} onRetry={reload} />}

        {status === "success" && (
          <>
            <SavingsBanner
              savings={summary.totals.savings}
              selectedCount={selectedIds.size}
              totalLossCount={losses.length}
            />

            <section className="mt-6">
              <SummaryCards summary={summary} />
            </section>

            <section className="mt-8">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Tabs
                  active={activeTab}
                  onChange={setActiveTab}
                  lossCount={losses.length}
                  gainCount={gains.length}
                />
                {activeTab === "losses" && losses.length > 0 && (
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={selectAllLosses}
                      className="rounded-full px-3 py-1.5 text-mint-700 transition hover:bg-mint-50"
                    >
                      Select all
                    </button>
                    <span className="text-ink-900/20">·</span>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="rounded-full px-3 py-1.5 text-ink-900/50 transition hover:bg-ink-900/5"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <CoinTable
                holdings={activeHoldings}
                selectable={activeTab === "losses"}
                selectedIds={selectedIds}
                onToggle={toggleSelected}
                onSelectAll={selectAllLosses}
                onClearAll={clearSelection}
                emptyLabel={
                  activeTab === "losses"
                    ? "No unrealised losses right now"
                    : "No unrealised gains right now"
                }
              />
            </section>

            <HarvestBar
              selectedCount={selectedIds.size}
              savings={summary.totals.savings}
              onSubmit={submit}
              submitting={harvestState === "submitting"}
              disabled={selectedIds.size === 0}
            />
          </>
        )}
      </main>

      <ReceiptModal receipt={harvestState === "done" ? receipt : null} onClose={dismissReceipt} />
    </div>
  );
}
