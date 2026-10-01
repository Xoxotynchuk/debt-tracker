"use client";

import { useState, type FormEvent } from "react";
import { GlassButton, GlassInput, GlassSelect } from "@/components/ui";
import type { DebtInsert } from "@/types/debt";

interface DebtFormProps {
  onSubmit: (payload: DebtInsert) => Promise<{ error: string | null }>;
  onSuccess?: () => void;
}

export function DebtForm({ onSubmit, onSuccess }: DebtFormProps) {
  const [debtorName, setDebtorName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("RUB");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedAmount = Number(amount);
    if (!debtorName.trim()) {
      setError("Укажите имя должника");
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Сумма должна быть больше нуля");
      return;
    }

    setLoading(true);
    const result = await onSubmit({
      debtor_name: debtorName.trim(),
      amount: parsedAmount,
      currency,
      due_date: dueDate || null,
    });
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setDebtorName("");
    setAmount("");
    setCurrency("RUB");
    setDueDate("");
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GlassInput
        label="Имя должника"
        name="debtor_name"
        value={debtorName}
        onChange={(e) => setDebtorName(e.target.value)}
        placeholder="Иван Иванов"
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <GlassInput
          label="Сумма"
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1000"
          required
        />
        <GlassSelect
          label="Валюта"
          name="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </GlassSelect>
      </div>
      <GlassInput
        label="Дата окончания"
        name="due_date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      {error && (
        <p className="rounded-[var(--radius-sm)] bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}
      <GlassButton type="submit" loading={loading} className="w-full">
        Добавить долг
      </GlassButton>
    </form>
  );
}
