"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { GlassButton } from "@/components/ui";

const links = [
  { href: "/dashboard/", label: "Дашборд" },
  { href: "/debts/", label: "Мои долги" },
  { href: "/history/", label: "История" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-glass)] bg-[color-mix(in_srgb,var(--bg-primary)_70%,transparent)] backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href={user ? "/dashboard/" : "/"}
            className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight"
          >
            Dolg<span className="text-[var(--accent)]">Igorya</span>
          </Link>
          {user && (
            <nav className="hidden items-center gap-1 md:flex">
              {links.map((link) => {
                const active = pathname?.startsWith(link.href.replace(/\/$/, ""));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-[var(--radius-sm)] px-3 py-2 text-sm transition ${
                      active
                        ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <GlassButton variant="ghost" size="sm" onClick={toggleTheme} aria-label="Сменить тему">
            {theme === "dark" ? "Светлая" : "Тёмная"}
          </GlassButton>
          {user ? (
            <>
              <span className="hidden max-w-[160px] truncate text-sm text-[var(--text-muted)] sm:inline">
                {user.email}
              </span>
              <GlassButton variant="secondary" size="sm" onClick={() => signOut()}>
                Выйти
              </GlassButton>
            </>
          ) : (
            <Link href="/auth/">
              <GlassButton size="sm">Войти</GlassButton>
            </Link>
          )}
        </div>
      </div>

      {user && (
        <nav className="page-shell flex gap-1 overflow-x-auto pb-3 md:hidden">
          {links.map((link) => {
            const active = pathname?.startsWith(link.href.replace(/\/$/, ""));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-sm ${
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
