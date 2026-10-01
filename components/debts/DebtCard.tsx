"use client";

import type { Debt } from "@/types/debt";
import { formatCurrency, formatDate, isOverdue } from "@/lib/utils";
import { GlassButton, GlassCard } from "@/components/ui";
import { DebtStatusBadge } from "./DebtStatusBadge";

interface DebtCardProps {
  debt: Debt;
  onPaid?: (id: string) => void;
  onForgive?: (id: string) => void;
  busy?: boolean;
  showActions?: boolean;
}

export function DebtCard({
  debt,
  onPaid,
  onForgive,
  busy = false,
  showActions = true,
}: DebtCardProps) {
  const overdue = isOverdue(debt);

  return (
    <GlassCard
      hover
      className={`relative overflow-hidden ${overdue ? "border-[var(--danger)]/40 ring-1 ring-[var(--danger)]/25" : ""}`}
    >
      {overdue && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--danger)] to-transparent" />
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            {debt.debtor_name}
          </h3>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-[var(--accent)]">
            {formatCurrency(Number(debt.amount), debt.currency)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <DebtStatusBadge status={debt.status} />
          {overdue && (
            <span className="text-xs font-medium text-[var(--danger)]">Просрочен</span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--text-secondary)]">
        <div>
          {debt.due_date ? (
            <>
              <span className="text-[var(--text-muted)]">Вернуть до </span>
              {formatDate(debt.due_date)}
            </>
          ) : (
            <span className="text-[var(--text-muted)]">Срок возврата не указан</span>
          )}
        </div>
        <div>
          <span className="text-[var(--text-muted)]">Добавлен </span>
          {formatDate(debt.created_at)}
        </div>
      </div>

      {showActions && debt.status === "active" && (
        <div className="mt-5 flex flex-wrap gap-2">
          <GlassButton
            size="sm"
            variant="success"
            disabled={busy}
            onClick={() => onPaid?.(debt.id)}
          >
            Уплачено
          </GlassButton>
          <GlassButton
            size="sm"
            variant="danger"
            disabled={busy}
            onClick={() => onForgive?.(debt.id)}
          >
            Простить
          </GlassButton>
        </div>
      )}
    </GlassCard>
  );
}
