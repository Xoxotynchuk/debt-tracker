-- DolgIgorya schema for Supabase
-- Run in SQL Editor: https://supabase.com/dashboard/project/_/sql

create extension if not exists "pgcrypto";

create table if not exists public.debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  debtor_name text not null,
  amount numeric(14, 2) not null check (amount > 0),
  currency text not null default 'RUB',
  due_date date,
  status text not null default 'active' check (status in ('active', 'paid', 'forgiven')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists debts_user_id_idx on public.debts (user_id);
create index if not exists debts_status_idx on public.debts (status);
create index if not exists debts_due_date_idx on public.debts (due_date);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists debts_set_updated_at on public.debts;
create trigger debts_set_updated_at
before update on public.debts
for each row
execute function public.set_updated_at();

alter table public.debts enable row level security;

drop policy if exists "Users can select own debts" on public.debts;
create policy "Users can select own debts"
  on public.debts for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own debts" on public.debts;
create policy "Users can insert own debts"
  on public.debts for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own debts" on public.debts;
create policy "Users can update own debts"
  on public.debts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own debts" on public.debts;
create policy "Users can delete own debts"
  on public.debts for delete
  using (auth.uid() = user_id);
