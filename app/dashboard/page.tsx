"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useDebts } from "@/hooks/useDebts";
import { formatCurrency, formatDate } from "@/lib/utils";
import { GlassCard, LoadingState } from "@/components/ui";

export default function DashboardPage() {
  const { loading: authLoading } = useRequireAuth();
  const { stats, loading } = useDebts();

  if (authLoading || loading) return <LoadingState />;

  const cards = [
    {
      label: "Сумма активных долгов",
      value: formatCurrency(stats.totalActiveAmount),
      hint: "Все незакрытые обязательства",
    },
    {
      label: "Активных долгов",
      value: String(stats.activeCount),
      hint: "Ещё не закрыты",
    },
    {
      label: "Просроченных",
      value: String(stats.overdueCount),
      hint: formatCurrency(stats.overdueAmount),
    },
    {
      label: "Ближайший срок",
      value: stats.nearestDue ? formatDate(stats.nearestDue.date) : "Не задан",
      hint: stats.nearestDue ? stats.nearestDue.debtorName : "У активных долгов нет дат",
    },
    {
      label: "Сумма просроченных",
      value: formatCurrency(stats.overdueAmount),
      hint: "Долги с прошедшим сроком возврата",
    },
    {
      label: "Средний срок долга",
      value: stats.averageDebtDays != null ? `${stats.averageDebtDays} дн.` : "Нет данных",
      hint: "Сколько в среднем висят активные долги",
    },
  ];

  return (
    <div className="page-shell">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">Дашборд</h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          Сводка по активным долгам и просрочкам
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <GlassCard key={card.label} hover>
            <p className="text-sm text-[var(--text-muted)]">{card.label}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
              {card.value}
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{card.hint}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
