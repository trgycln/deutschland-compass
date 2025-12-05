-- Blog tablosunu oluştur
create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  image_url text,
  author text default 'Admin',
  is_published boolean default false,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Politikaları
alter table public.blogs enable row level security;

-- Herkes yayınlanmış blogları okuyabilir
create policy "Public can view published blogs"
  on public.blogs for select
  using (is_published = true);

-- Adminler her şeyi yapabilir (Basitlik için şimdilik public insert/update açıyoruz, admin auth gelince düzelteceğiz)
-- Not: Gerçek prodüksiyonda burası sadece authenticated admin olmalı.
create policy "Admins can manage blogs"
  on public.blogs for all
  using (true)
  with check (true);

-- Örnek Veri (Boş - örnek makaleler Supabase'den silinmiştir)
