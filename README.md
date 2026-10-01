# DolgIgorya

Трекер личных долгов на **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS 4** + **Supabase**. Статический экспорт для деплоя на **GitHub Pages**.

## Стек

- Next.js 16, `output: 'export'`, `basePath` / `assetPrefix`: `/debt-tracker`
- Supabase Auth + Postgres (клиентский `@supabase/supabase-js`, без server actions / middleware)
- Glassmorphism UI (единый кит в `components/ui/`) + Framer Motion
- Тёмная тема по умолчанию, светлая — переключатель в навбаре

## Быстрый старт

```bash
cp .env.example .env.local
# заполните NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Supabase

1. Создайте проект на [supabase.com](https://supabase.com).
2. В SQL Editor выполните по очереди:
   - `supabase/schema.sql` — таблица `debts` + RLS
   - `supabase/seed.sql` — тестовый админ
3. Authentication → Providers → Email: при желании отключите «Confirm email» для локальной разработки.
4. Скопируйте Project URL и anon key в `.env.local`.

Тестовый админ:

- **Email:** `admin@example.com`
- **Password:** `password`

Проще всего создать через Dashboard → Authentication → Users → Add user
(включи Auto Confirm User). Либо вкладка «Регистрация» в приложении.

## Страницы

| Путь | Описание |
|------|----------|
| `/` | Лендинг |
| `/auth` | Вход / регистрация |
| `/dashboard` | Статистика |
| `/debts` | Активные долги, фильтры, CRUD |
| `/history` | Уплаченные и прощённые |

Защита маршрутов — клиентский редирект (`useRequireAuth`), т.к. middleware недоступен при static export.

## GitHub Pages

1. Создайте репозиторий с именем **`debt-tracker`** (совпадает с `basePath` в `next.config.ts`).
2. Settings → Pages → Source: **GitHub Actions**.
3. Secrets → Actions:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Запушьте в `main` — workflow `.github/workflows/deploy.yml` соберёт `out/` и задеплоит.

Сайт: `https://<user>.github.io/debt-tracker/`

Если имя репозитория другое — измените `repoName` в `next.config.ts`.

## Структура

```
app/                 # страницы App Router
components/ui/       # стеклянный UI-кит
components/debts/    # DebtCard, DebtForm, фильтры
components/layout/   # Navbar, AppShell
context/             # AuthContext, ThemeContext
hooks/               # useDebts, useRequireAuth
lib/                 # supabase client, utils
supabase/            # schema.sql, seed.sql
```

## Сборка

```bash
npm run build   # генерирует статику в out/
```
