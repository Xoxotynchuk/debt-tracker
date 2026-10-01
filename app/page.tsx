"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassButton, GlassCard } from "@/components/ui";

const features = [
  {
    title: "Только ваши долги",
    description: "Row Level Security в Supabase: каждый пользователь видит только свои записи.",
  },
  {
    title: "Просрочки под контролем",
    description: "Фильтры, красная подсветка и статистика по просроченным суммам.",
  },
  {
    title: "Быстрые действия",
    description: "Отметьте долг как уплаченный или простите его в один клик.",
  },
  {
    title: "История операций",
    description: "Все оплаченные и прощённые долги хранятся отдельно от активных.",
  },
];

export default function LandingPage() {
  return (
    <div className="page-shell">
      <section className="relative overflow-hidden rounded-[var(--radius-lg)] px-2 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
            Личный финансовый порядок
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Dolg<span className="text-[var(--accent)]">Igorya</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-[var(--text-secondary)] sm:text-lg">
            Трекер личных долгов с стеклянным интерфейсом. Запоминайте, кто сколько должен, следите
            за сроками и закрывайте долги без таблиц в заметках.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/auth/">
              <GlassButton size="lg">Войти / Зарегистрироваться</GlassButton>
            </Link>
            <Link href="/auth/">
              <GlassButton size="lg" variant="secondary">
                Начать бесплатно
              </GlassButton>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {features.map((feature, index) => (
          <GlassCard key={feature.title} hover>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.35 }}
            >
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </motion.div>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
