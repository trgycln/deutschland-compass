-- Almanca Öğretmenliği mesleğini ekle
insert into public.professions (slug, title, description, video_url)
values (
  'almanca-ogretmenligi',
  'Almanca Öğretmenliği (DaF/DaZ)',
  'Almanya''da Almanca öğretmeni olarak çalışmak isteyenler için kapsamlı rehber. Entegrasyon kursları, okul sistemi ve özel ders imkanları hakkında detaylı bilgiler.',
  ''
)
on conflict (slug) do nothing;
