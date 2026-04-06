-- Site genel ziyaret sayacı ve günlük istatistikler
-- Not: baseline_page_views değerini Vercel Analytics panelindeki gerçek toplam rakama göre güncelleyebilirsiniz.

create table if not exists public.site_totals (
  site_key text primary key,
  baseline_page_views bigint not null default 30000,
  tracked_page_views bigint not null default 0,
  tracked_unique_visitors bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_daily_stats (
  stat_date date primary key default current_date,
  page_views bigint not null default 0,
  unique_visitors bigint not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.site_totals (site_key, baseline_page_views)
values ('global', 30000)
on conflict (site_key) do nothing;

create or replace function public.increment_site_stats(p_is_unique boolean default false)
returns table (
  total_page_views bigint,
  total_unique_visitors bigint,
  last_7_days_page_views bigint,
  today_page_views bigint,
  today_unique_visitors bigint
)
language plpgsql
security definer
as $$
begin
  insert into public.site_totals (site_key, baseline_page_views)
  values ('global', 30000)
  on conflict (site_key) do nothing;

  update public.site_totals
  set
    tracked_page_views = tracked_page_views + 1,
    tracked_unique_visitors = tracked_unique_visitors + case when p_is_unique then 1 else 0 end,
    updated_at = now()
  where site_key = 'global';

  insert into public.site_daily_stats (stat_date, page_views, unique_visitors)
  values (current_date, 1, case when p_is_unique then 1 else 0 end)
  on conflict (stat_date)
  do update set
    page_views = public.site_daily_stats.page_views + 1,
    unique_visitors = public.site_daily_stats.unique_visitors + case when p_is_unique then 1 else 0 end,
    updated_at = now();

  return query
  select
    (st.baseline_page_views + st.tracked_page_views)::bigint,
    st.tracked_unique_visitors::bigint,
    coalesce((select sum(page_views)::bigint from public.site_daily_stats where stat_date >= current_date - 6), 0::bigint),
    coalesce((select page_views::bigint from public.site_daily_stats where stat_date = current_date), 0::bigint),
    coalesce((select unique_visitors::bigint from public.site_daily_stats where stat_date = current_date), 0::bigint)
  from public.site_totals st
  where st.site_key = 'global';
end;
$$;
