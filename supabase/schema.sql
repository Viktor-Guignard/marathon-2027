-- Each signed-in user can access only their own training data.
create table if not exists public.user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;
revoke all on public.user_data from anon;
grant select, insert, update on public.user_data to authenticated;

drop policy if exists "Users read their own data" on public.user_data;
create policy "Users read their own data" on public.user_data for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Users insert their own data" on public.user_data;
create policy "Users insert their own data" on public.user_data for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Users update their own data" on public.user_data;
create policy "Users update their own data" on public.user_data for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'user_data'
  ) then
    alter publication supabase_realtime add table public.user_data;
  end if;
end $$;
