"use client";

import { useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useDebts } from "@/hooks/useDebts";
import type { DebtFilter } from "@/types/debt";
import { DebtCard } from "@/components/debts/DebtCard";
import { DebtFilters } from "@/components/debts/DebtFilters";
import { DebtForm } from "@/components/debts/DebtForm";
import { EmptyState, GlassButton, GlassModal, LoadingState } from "@/components/ui";

export default function DebtsPage() {
  const { loading: authLoading } = useRequireAuth();
  const { loading, error, filterActive, createDebt, setStatus } = useDebts();
  const [filter, setFilter] = useState<DebtFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  if (authLoading || loading) return <LoadingState />;

  const items = filterActive(filter);

  const handleStatus = async (id: string, status: "paid" | "forgiven") => {
    setBusyId(id);
    await setStatus(id, status);
    setBusyId(null);
  };

  return (
    <div className="page-shell">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
            Мои долги
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">Активные долги и быстрые действия</p>
        </div>
        <GlassButton onClick={() => setModalOpen(true)}>Добавить долг</GlassButton>
      </div>

      <div className="mb-6">
        <DebtFilters value={filter} onChange={setFilter} />
      </div>

      {error && (
        <p className="mb-4 rounded-[var(--radius-md)] bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {items.length === 0 ? (
        <EmptyState
          title="Нет долгов по фильтру"
          description="Добавьте новый долг или смените фильтр."
          action={<GlassButton onClick={() => setModalOpen(true)}>Добавить долг</GlassButton>}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((debt) => (
            <DebtCard
              key={debt.id}
              debt={debt}
              busy={busyId === debt.id}
              onPaid={(id) => handleStatus(id, "paid")}
              onForgive={(id) => handleStatus(id, "forgiven")}
            />
          ))}
        </div>
      )}

      <GlassModal open={modalOpen} onClose={() => setModalOpen(false)} title="Новый долг">
        <DebtForm
          onSubmit={createDebt}
          onSuccess={() => setModalOpen(false)}
        />
      </GlassModal>
    </div>
  );
}
