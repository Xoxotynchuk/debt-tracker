"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { computeDebtStats, isOverdue } from "@/lib/utils";
import type {
  Debt,
  DebtFilter,
  DebtInsert,
  DebtStats,
  DebtStatus,
  DebtUpdate,
  HistoryFilter,
} from "@/types/debt";

export function useDebts() {
  const { user } = useAuth();
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDebts = useCallback(async () => {
    if (!user) {
      setDebts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("debts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setDebts([]);
    } else {
      setDebts((data as Debt[]) ?? []);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchDebts();
  }, [fetchDebts]);

  const createDebt = useCallback(
    async (payload: DebtInsert) => {
      if (!user) return { error: "Необходима авторизация" };

      const { error: insertError } = await supabase.from("debts").insert({
        user_id: user.id,
        debtor_name: payload.debtor_name,
        amount: payload.amount,
        currency: payload.currency ?? "RUB",
        due_date: payload.due_date ?? null,
        status: payload.status ?? "active",
      });

      if (insertError) return { error: insertError.message };
      await fetchDebts();
      return { error: null };
    },
    [user, fetchDebts]
  );

  const updateDebt = useCallback(
    async (id: string, updates: DebtUpdate) => {
      const { error: updateError } = await supabase
        .from("debts")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (updateError) return { error: updateError.message };
      await fetchDebts();
      return { error: null };
    },
    [fetchDebts]
  );

  const setStatus = useCallback(
    async (id: string, status: DebtStatus) => updateDebt(id, { status }),
    [updateDebt]
  );

  const deleteDebt = useCallback(
    async (id: string) => {
      const { error: deleteError } = await supabase.from("debts").delete().eq("id", id);
      if (deleteError) return { error: deleteError.message };
      await fetchDebts();
      return { error: null };
    },
    [fetchDebts]
  );

  const activeDebts = useMemo(() => debts.filter((d) => d.status === "active"), [debts]);
  const historyDebts = useMemo(
    () => debts.filter((d) => d.status === "paid" || d.status === "forgiven"),
    [debts]
  );

  const stats: DebtStats = useMemo(() => computeDebtStats(debts), [debts]);

  const filterActive = useCallback(
    (filter: DebtFilter) => {
      if (filter === "all") return activeDebts;
      if (filter === "overdue") return activeDebts.filter((d) => isOverdue(d));
      return activeDebts.filter((d) => !isOverdue(d));
    },
    [activeDebts]
  );

  const filterHistory = useCallback(
    (filter: HistoryFilter) => {
      if (filter === "all") return historyDebts;
      return historyDebts.filter((d) => d.status === filter);
    },
    [historyDebts]
  );

  return {
    debts,
    activeDebts,
    historyDebts,
    loading,
    error,
    stats,
    fetchDebts,
    createDebt,
    updateDebt,
    setStatus,
    deleteDebt,
    filterActive,
    filterHistory,
  };
}
