"use client";

import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">{children}</main>
      <footer className="border-t border-[var(--border-glass)] py-6 text-center text-sm text-[var(--text-muted)]">
        DolgIgorya — трекер личных долгов
      </footer>
    </div>
  );
}
