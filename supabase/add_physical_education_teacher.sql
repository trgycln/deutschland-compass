
-- Beden Eğitimi Öğretmenliği mesleğini ekle
insert into public.professions (slug, title, description, video_url)
values (
  'beden-egitimi-ogretmenligi',
  'Beden Eğitimi Öğretmenliği',
  'Almanya''ya yeni gelmiş eğitimcilerin mesleki kariyerlerine yönelik oluşturulan detaylı yol haritası rehberi.',
  '' -- Video URL sonradan eklenebilir
)
on conflict (slug) do nothing;
