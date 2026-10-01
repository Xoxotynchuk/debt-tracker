"use client";

import type { DebtFilter, HistoryFilter } from "@/types/debt";
import { GlassTabs } from "@/components/ui";

const activeOptions: { value: DebtFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "overdue", label: "Просроченные" },
  { value: "not_overdue", label: "Непросроченные" },
];

const historyOptions: { value: HistoryFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "paid", label: "Уплаченные" },
  { value: "forgiven", label: "Прощённые" },
];

export function DebtFilters({
  value,
  onChange,
}: {
  value: DebtFilter;
  onChange: (v: DebtFilter) => void;
}) {
  return <GlassTabs options={activeOptions} value={value} onChange={onChange} />;
}

export function HistoryFilters({
  value,
  onChange,
}: {
  value: HistoryFilter;
  onChange: (v: HistoryFilter) => void;
}) {
  return <GlassTabs options={historyOptions} value={value} onChange={onChange} />;
}
