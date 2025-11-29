-- Mevcut verileri temizle (İsteğe bağlı, duplicate olmaması için)
delete from public.faqs where profession_slug = 'matematik-ogretmenligi';

-- Yeni verileri ekle
insert into public.faqs (profession_slug, question, answer, display_order) values
(
  'matematik-ogretmenligi',
  'ZAB başvurusu ücretli mi?',
  'Evet, yaklaşık 200 Euro civarındadır. Ancak Jobcenter ile görüşülürse bu ücret karşılanabilir.',
  1
),
(
  'matematik-ogretmenligi',
  'Stajyerlik (Referendariat) muafiyeti mümkün mü?',
  'Evet. Adaylık kaldırma belgesi veya SGK dökümü (Hitap) ile tecrübenizi kanıtlayarak muafiyet alabilirsiniz.',
  2
),
(
  'matematik-ogretmenligi',
  'İkinci branşım yok, ne yapmalıyım?',
  'Fizik, Kimya, Informatik gibi alanlar veya transkriptinizdeki Felsefe/Sosyoloji dersleri değerlendirilebilir. AÖF ile kredi tamamlamak da bir seçenektir.',
  3
),
(
  'matematik-ogretmenligi',
  'Tek branşla çalışabilir miyim?',
  'NRW, Bremen ve Hessen gibi eyaletlerde mümkündür ancak Baden-Württemberg''de zordur.',
  4
),
(
  'matematik-ogretmenligi',
  'Jobcenter dil kursunu karşılar mı?',
  'Evet, işsizlik parası alma hakkı olanlar için Jobcenter C1/C2 kurslarını finanse edebilir.',
  5
);
