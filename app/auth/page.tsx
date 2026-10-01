"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRedirectIfAuthenticated } from "@/hooks/useRequireAuth";
import { getSupabaseConfigError, isSupabaseConfigured } from "@/lib/supabase";
import { GlassButton, GlassCard, GlassInput, GlassTabs, LoadingState } from "@/components/ui";

type Mode = "login" | "register";

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const { loading: authLoading } = useRedirectIfAuthenticated();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  if (authLoading) return <LoadingState label="Проверка сессии…" />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const result =
      mode === "login" ? await signIn(email.trim(), password) : await signUp(email.trim(), password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (mode === "register") {
      setInfo("Аккаунт создан. Если включено подтверждение email — проверьте почту, иначе войдите.");
      setMode("login");
      return;
    }

    router.replace("/dashboard/");
  };

  const configError = getSupabaseConfigError();

  return (
    <div className="page-shell flex justify-center">
      <GlassCard strong className="w-full max-w-md" padding="lg">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
          {mode === "login" ? "Вход" : "Регистрация"}
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Если аккаунта ещё нет — открой вкладку «Регистрация» и создай его.
          Либо в Supabase: Authentication → Users → Add user.
        </p>

        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-[var(--radius-sm)] bg-[var(--warning-soft)] px-3 py-2 text-sm text-[var(--warning)]">
            {configError}
          </p>
        )}

        <div className="mt-5">
          <GlassTabs
            options={[
              { value: "login", label: "Вход" },
              { value: "register", label: "Регистрация" },
            ]}
            value={mode}
            onChange={setMode}
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <GlassInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <GlassInput
            label="Пароль"
            type="password"
            name="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={6}
            required
          />

          {error && (
            <p className="rounded-[var(--radius-sm)] bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
              {error}
            </p>
          )}
          {info && (
            <p className="rounded-[var(--radius-sm)] bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--accent)]">
              {info}
            </p>
          )}

          <GlassButton type="submit" loading={loading} className="w-full">
            {mode === "login" ? "Войти" : "Создать аккаунт"}
          </GlassButton>
        </form>
      </GlassCard>
    </div>
  );
}
