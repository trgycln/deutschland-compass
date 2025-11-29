
-- Beden Eğitimi Öğretmenliği SSS verilerini ekle
delete from public.faqs where profession_slug = 'beden-egitimi-ogretmenligi';

insert into public.faqs (profession_slug, question, answer, display_order) values
(
  'beden-egitimi-ogretmenligi',
  'Türkiye''deki diplomalar Almanya''da doğrudan geçerli midir ve denklik süreci nasıl başlar?',
  'Türkiye''deki devlet üniversitelerinden alınan diplomaların Bologna süreci gereği uluslararası geçerliliği olsa da, Alman makamları ve iş dünyası genellikle Bonn''daki Yabancı Eğitim Merkezi Ofisi''nin (ZAB – Zentralstelle für ausländisches Bildungswesen) değerlendirmesini (Zeugnisbewertung) dikkate alır. ZAB Değerlendirmesi, yabancı bir üniversite yeterliliğini tanımlayan ve Alman işgücü piyasasına erişimi kolaylaştıran resmi bir belgedir. Lisans, Yüksek Lisans ve Doktora diploma ve transkriptlerinin muhakkak ZAB''a gönderilmesi elzemdir. ZAB ücreti 200 Euro''dur ve bu ücret Job Center aracılığıyla ödenebilir. İşlem süresi yaklaşık 4-6 ay sürebilmektedir.',
  1
),
(
  'beden-egitimi-ogretmenligi',
  'Öğretmenlik mesleği için asıl denklik başvurusu nereye yapılır ve bu zorunlu mudur?',
  'Evet, öğretmenlik kanun ve yönetmeliklerle düzenlenmiş (reglementiert) meslekler arasında yer aldığı için, mesleki tanınma (Berufliche Anerkennung) zorunludur. Öğretmenlik kökenli herkesin, kendi eyaletlerinde bulunan Lehrkräfteakademie kurumlarına başvurması gerekir (Örn: Hessen''de Gissen, NRW''de Detmold). Bu kurumlar, adayın mesleğini Almanya''da hangi şartlar dahilinde yapabileceğini belirten 3-4 sayfalık bir rapor ile bildirir.',
  2
),
(
  'beden-egitimi-ogretmenligi',
  'Öğretmenlik denkliğinde genellikle hangi eksiklikler ortaya çıkar ve bunlar nasıl tamamlanır?',
  'Almanya''da öğretmen olmak için genellikle çift branş zorunluluğu, Referendariyet (stajyerlik) ve Hausarbeit (bitirme çalışması) gibi şartlar aranır. Doktora veya Master tezi, Hausarbeit yerine sayılabilir. Türkiye''deki hizmet cetveli tercümesi (e-devletten ''hitap hizmet dökümü'') sunularak Referendariyetten muaf tutulma şansı olabilir. Lisans/Master/Doktora transkriptlerindeki felsefe, sosyoloji, etik gibi derslerin, ikinci branşı tamamlamada sayılması mümkün olabilir.',
  3
),
(
  'beden-egitimi-ogretmenligi',
  'Almanya''daki kamu okullarında öğretmen olarak çalışabileceğim kadro türleri ve statüleri nelerdir?',
  'Almanya''da tek tip öğretmenlik bulunmamaktadır. Kadrolu Öğretmen (Beamter) için genellikle çift branş ve AB vatandaşlığı gerekir. Sözleşmeli Öğretmen (Angestellte) süreli veya süresiz olabilir ve VERENA üzerinden başvurulur. Yan Giriş (Seiteneinstieg) tek branş mezunlarına olanak sağlar (LOIS üzerinden). Branş Öğretmeni (Fachlehrer) olarak tek branşla çalışılabilir. Ayrıca Anadil Dersi (HSU) öğretmeni olarak da çalışılabilir.',
  4
),
(
  'beden-egitimi-ogretmenligi',
  'Öğretmenliğe alternatif veya denklik süreci devam ederken değerlendirilebilecek pozisyonlar nelerdir?',
  'Multiprofessionelles Team (MPT) kadroları (TVL 10 maaş grubu, süresiz), Eğitim Asistanı (Lehrassistent), OGS-Betreuer/in, Özel Eğitim Asistanı (Gölge öğretmenlik) gibi pozisyonlar mevcuttur. Bu pozisyonlara genellikle B2 Almanca ile başlanabilir. Ayrıca Erzieher, Öğrenci Danışmanı ve DaZ öğretmeni olarak da çalışılabilir.',
  5
),
(
  'beden-egitimi-ogretmenligi',
  'Öğretmenler için iş ilanları hangi portallarda yayınlanmaktadır?',
  'NRW için: LOIS (Seiteneinstieg için), VERENA (Sözleşmeli öğretmenlik için), ANDREAS (MPT ve diğer kadrolar için). Ayrıca Schulministerium/Bezirksregierung siteleri, Indeed, StepStone, Arbeitsagentur ve LinkedIn de kullanılabilir.',
  6
),
(
  'beden-egitimi-ogretmenligi',
  'İş mülakatına (Auswahlgespräch) hazırlanırken hangi temel konulara odaklanmalıyım?',
  'Mülakatlarda kişisel sorular (motivasyon), alan bilgisi, didaktik ve metodik (ders planı), sınıf yönetimi ve disiplin, kapsayıcı eğitim (Inklusion), işbirliği ve iletişim, ve pedagojik konsept konularına odaklanılmalıdır.',
  7
),
(
  'beden-egitimi-ogretmenligi',
  'Sınıfta disiplin sorunları (Unterrichtsstörungen) ortaya çıktığında hangi metodoloji izlenmelidir?',
  'Ring Modeli izlenebilir: 1. Önleme (Kurallar ve rutinler), 2. Erken Müdahale (Sessiz uyarılar), 3. Doğrudan Müdahale (Net uyarı ve talimat), 4. Yoğun Müdahale (Bireysel görüşme, veli işbirliği), 5. Takip ve Yansıtma.',
  8
),
(
  'beden-egitimi-ogretmenligi',
  'Kapsayıcı Eğitim (Inklusion) ve Ortak Öğrenme (Gemeinsames Lernen) nedir?',
  'Inklusion, özel ihtiyaçları olan öğrencileri derslere entegre etmek ve tüm öğrencilerin başarılı olabileceği bir ortam sağlamaktır. Gemeinsames Lernen ise tüm öğrencilerin birlikte öğrenebilmesi için dersin düzenlenmesi ve işbirliğinin teşvik edilmesidir.',
  9
),
(
  'beden-egitimi-ogretmenligi',
  'Otizm, Duygusal/Sosyal Gelişim Sorunları ve DEHB olan öğrenciler için ne tür destekler sağlanmalıdır?',
  'Otizm (OSB) için net yapılar, rutinler ve görsel araçlar kullanılmalı. Duygusal sorunlar için destekleyici ve öngörülebilir bir ortam sağlanmalı. DEHB için net kurallar, kısa talimatlar verilmeli, görevler parçalara bölünmeli ve pozitif pekiştirme kullanılmalıdır.',
  10
),
(
  'beden-egitimi-ogretmenligi',
  'Eleştiri yönelten veya şikayetçi bir veliyle görüşmede nasıl bir yaklaşım sergilenmelidir?',
  'Sakinlik ve empati ile dinlenmeli, durum objektif olarak somut örneklerle açıklanmalı ve çözüm odaklı bir yaklaşım sergilenmelidir. Veliyi işbirliğine teşvik ederek ortak çözüm yolları aranmalıdır.',
  11
),
(
  'beden-egitimi-ogretmenligi',
  'Meslektaşlar arasında bir tartışma yaşanırsa ne yapılmalıdır?',
  'Sakin kalınmalı, durum değerlendirilmeli, hatalıysanız sorumluluk alınmalı, ''Ben'' dili kullanılarak açık iletişim kurulmalı ve ortak çözüm yolları aranmalıdır.',
  12
),
(
  'beden-egitimi-ogretmenligi',
  'Öğretmenlik başvuruları için Almanca dilinde aranan minimum seviye nedir?',
  'Lehrkräfte programları için minimum B1, üniversite kursları için C1 şarttır. İşe alımda belgeden çok akıcı konuşma önemlidir. Türkçe öğretmenliği (HSU) için Türkçe C1 sertifikası da gerekebilir.',
  13
),
(
  'beden-egitimi-ogretmenligi',
  'Üniversitelerin sunduğu uygun fiyatlı Almanca kurslarına nasıl kayıt yaptırılabilir?',
  'Üniversitenin bir bölümüne kayıt başvurusu yaparak öğrenci statüsü kazanılabilir. Giriş sınavı için B1 bitirmiş olmak gerekir. Öğrenci kimliği ile toplu taşıma ücretsiz olabilir ve Job Center kursu finanse edebilir.',
  14
);
