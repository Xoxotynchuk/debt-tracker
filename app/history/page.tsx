"use client";

import { useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useDebts } from "@/hooks/useDebts";
import type { HistoryFilter } from "@/types/debt";
import { DebtCard } from "@/components/debts/DebtCard";
import { HistoryFilters } from "@/components/debts/DebtFilters";
import { EmptyState, LoadingState } from "@/components/ui";

export default function HistoryPage() {
  const { loading: authLoading } = useRequireAuth();
  const { loading, error, filterHistory } = useDebts();
  const [filter, setFilter] = useState<HistoryFilter>("all");

  if (authLoading || loading) return <LoadingState />;

  const items = filterHistory(filter);

  return (
    <div className="page-shell">
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">История</h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          Уплаченные и прощённые долги
        </p>
      </div>

      <div className="mb-6">
        <HistoryFilters value={filter} onChange={setFilter} />
      </div>

      {error && (
        <p className="mb-4 rounded-[var(--radius-md)] bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {items.length === 0 ? (
        <EmptyState
          title="История пуста"
          description="Закройте долг на странице «Мои долги», и он появится здесь."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((debt) => (
            <DebtCard key={debt.id} debt={debt} showActions={false} />
          ))}
        </div>
      )}
    </div>
  );
}
