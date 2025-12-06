export const computerScienceTeacherData = {
  title: "Bilgisayar Öğretmenliği (BÖTE)",
  slug: "bilgisayar-ogretmenligi",
  description: "Almanya'da Bilgisayar Öğretmenliği (BÖTE) mezunları için mesleki adaptasyon, kariyer yolculuğu, yasal dayanaklar ve pratik deneyimler rehberi.",
  videoUrl: "",
  stats: [
    { label: "İhtiyaç", value: "Yüksek", color: "bg-green-500" },
    { label: "Ortalama Süre", value: "1-2 Yıl", color: "bg-blue-500" },
    { label: "Dil Şartı", value: "C1", color: "bg-orange-500" },
  ],
  sections: [
    {
      id: "hazirlik",
      title: "I. Hazırlık ve Mesleki Uyum Yolculuğunun Başlangıcı",
      content: `
        <p>Almanya'da öğretmenlik mesleğine başlama süreci, temel olarak dil yeterliliğinin sağlanması ve yurt dışı eğitiminin tanınması (Anerkennung) aşamalarıyla başlar.</p>
        
        <h3 class="text-xl font-semibold mt-4 mb-2">Dil Yeterliliğini Sağlama</h3>
        <p>Öğretmenlik mesleğinde başarılı olmak ve okullarda çalışabilmek için hedeflenmesi gereken konuşma seviyesi en az C1'dir. Piyasadaki konuşulan dil, C1 seviyesinin oldukça üzerindedir.</p>
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-4">
          <h4 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">Yasal Zemin ve Gereklilikler</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Genel olarak mesleki denkliğin (Anerkennung) alınabilmesi için C2 seviyesi Almanca (Goethe Großes Sprach Diplom) istenebilmektedir.</li>
            <li>Ancak Refugee Teachers Program (RTP) gibi yeterlilik tamamlama programları için en az GER B2 seviyesinde Almanca bilgisi şart koşulur.</li>
          </ul>
        </div>
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg my-4">
          <h4 class="font-semibold text-green-700 dark:text-green-300 mb-2">Pratik Tecrübe ve İpuçları</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Dil gelişimine film izleme, kitap okuma ve sosyal çevrelerde bulunma yoluyla devam edilmesi önemlidir.</li>
            <li>Eğer bir Jobcenter ile işbirliği yapılıyorsa, Almancayı iyi öğrenmenin öğretmenlik için bir şart olduğu argümanıyla Jobcenter ikna edilerek C1 seviyesini hedefleyen dil kursları için destek alınabilir.</li>
          </ul>
        </div>

        <h3 class="text-xl font-semibold mt-6 mb-2">Mesleki Denkliğin (Anerkennung) Alınması</h3>
        <p>Almanya'da öğretmen olarak çalışmak isteyen eğitimciler için ilk ve en kritik adım, yurt dışında edinilen öğretmenlik yeterliliğinin tanınması (denklik) sürecidir.</p>
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-4">
          <h4 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">Yasal Zemin ve Gereklilikler</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Denklik eyalet bazında geçerlidir ve her eyaletin kendine özgü gereksinimleri olabilir.</li>
            <li>Temel denklik başvuru dosyasına eklenmesi gereken zorunlu belgeler şunlardır:
              <ol class="list-decimal pl-5 mt-2 space-y-1">
                <li>Anschreiben (Motivasyon mektubu).</li>
                <li>Tablo şeklinde Özgeçmiş (Lebenslauf).</li>
                <li>ZAB'dan (Die Zentralstelle für ausländisches Bildungswesen) alınmış Denklik Belgesi (diplomaların Almanya'daki karşılığı).</li>
                <li>Transkriptler.</li>
                <li>Dil Belgesi.</li>
                <li>Orientierungskurs belgesi.</li>
              </ol>
            </li>
          </ul>
        </div>
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg my-4">
          <h4 class="font-semibold text-green-700 dark:text-green-300 mb-2">Pratik Tecrübe ve İpuçları</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Diploma ve transkriptlerin tercümesi önemlidir.</li>
            <li>Ders içeriklerinin (Ders İçerikleri) çevirisi konusunda tereddüt yaşanabilir; bu belgelerin ilk aşamada gönderilmemesi, sadece talep edilirse sunulması tavsiye edilmektedir. Eğer ders içeriklerini ilgili kurum isterse, çeviri ücreti Jobcenter tarafından karşılanabilir.</li>
            <li>Çift branş mezunu olma zorunluluğu, yalnızca Almanya'da kadrolu (Beamter) öğretmen olmak için ön koşuldur; tek branştan mezun olunsa bile okullarda öğretmenlik yapılabilir.</li>
          </ul>
        </div>

        <h3 class="text-xl font-semibold mt-6 mb-2">Yeterlilik Tamamlama Programları (Ergänzungsqualifizierung)</h3>
        <p>Kendi ülkesinde edindiği öğretmenlik niteliklerinin tam olarak tanınmasını sağlamak amacıyla tasarlanmış programlar mevcuttur.</p>
        <div class="space-y-4 mt-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-semibold">1. Refugee Teachers Program (RTP)</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Brandenburg eyaletindeki ilkokul sonrası okullarda (Sekundarstufe) mesleğinde çalışmak isteyen, yurt dışından gelen öğretmenlere yöneliktir.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Gerekli Şartlar:</strong> Menşe ülkede ortaokul veya lisede öğretmen olarak çalışmayı sağlayan en az bir üniversite lisans derecesi, halihazırda sahip olunan branşın Brandenburg'daki okullarda öğretilen bir branş olması, en az iki yıllık mesleki deneyim, ikinci branş okumaya istekli olma, Bakanlık Anerkennung kararı ve en az GER B2 seviyesinde Almanca bilgisi.</li>
              <li><strong>İçerik:</strong> Genel olarak dört sömestr sürer. Yoğun Almanca kursu (C1), Eğitim Bilimleri, Temel Yetkinlikler ve İkinci Branş Eğitimi içerir.</li>
            </ul>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-semibold">2. LehrkräftePLUS Siegen (NRW)</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Mülteci öğretmenlerin ileri nitelik kazanmasına yönelik bir programdır. Program pedagojik-didaktik nitelik kazanma, mesleki derinleşme ve okul uygulama aşamalarını içerir.</p>
          </div>
        </div>

        <h3 class="text-xl font-semibold mt-6 mb-2">Ek Bilgi: Sosyal Güvenlik ve Jobcenter Desteği</h3>
        <p>Almanya'da yeni gelenlerin iş piyasasına uyum sürecinde karşılaşabileceği temel destek kurumu Jobcenter'dır.</p>
        <ul class="list-disc pl-5 mt-2 space-y-2">
          <li><strong>Amaç ve Yardımlar:</strong> İş arayanların temel ihtiyaçlarının güvence altına alınmasını (Grundsicherung) ve iş hayatına giriş yardımlarını kapsar.</li>
          <li><strong>Hak Sahipliği:</strong> Çalışma yeteneğine sahip (15-65 yaş arası) ve yardıma muhtaç olmak gerekir.</li>
          <li><strong>Başvuru (Antrag):</strong> Yardım talepleri için dilekçe verilmesi zorunludur.</li>
          <li><strong>Ödemeler (Auszahlung):</strong> Her ay için peşinen yapılır.</li>
          <li><strong>İşbirliği Yükümlülüğü:</strong> Gelir, varlık, adres değişikliği gibi durumlar derhal bildirilmelidir.</li>
          <li><strong>Barınma ve Yakıt:</strong> Uygun barınma ve yakıt masrafları karşılanır.</li>
          <li><strong>Sağlık Sigortası:</strong> Jobcenter tarafından yasal sağlık sigortasına tabi tutulur.</li>
          <li><strong>Tek Seferlik Ödemeler:</strong> Ev eşyası, giyim vb. için yardım yapılabilir.</li>
        </ul>
      `
    },
    {
      id: "is-hayati",
      title: "II. İş Hayatına Giriş ve Kariyer Olanakları",
      content: `
        <p>Bilgisayar öğretmenleri için kamu okullarında doğrudan öğretmenlik pozisyonlarının yanı sıra, nitelik kazanma sürecinde veya alternatif kariyer yolları olarak birçok pedagojik ve bilişim alanı mevcuttur.</p>

        <h3 class="text-xl font-semibold mt-6 mb-2">Kamu Okulları ve İstihdam Türleri</h3>
        <p>Almanya'da kamu okullarında öğretmenlik yapmak için eyalet eğitim bakanlıklarına (Schulministerium) başvurulmalıdır.</p>
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-4">
          <h4 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">Yasal Zemin ve İlan Portalları (NRW Eyaleti Esas Alınarak)</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Kadrolu Öğretmenlik (Beamter):</strong> Çift branş mezunu öğretmenlerin başvurabileceği, kalıcı (unbefristet) memur kadrolarıdır. İlan Portalı: Leo.</li>
            <li><strong>Yan Giriş (Seiteneinstieg) / Kalıcı Sözleşmeli Kadrolar:</strong> Tek branşı olan veya eğitim mezunu olmayanlar için kalıcı kadrolardır (OBAS, PE, Duales Studium). İlan Portalı: Lois.</li>
            <li><strong>Sözleşmeli Öğretmenlik (Vertretungslehrer):</strong> Geçici (befristet) istihdam fırsatları sunar. İlan Portalı: Verena.</li>
            <li><strong>Ücretli Öğretmenlik (Honorararbeit):</strong> Okul müdürü ile görüşülerek, Bezirksregierung onayıyla başlanabilir.</li>
          </ul>
        </div>

        <h3 class="text-xl font-semibold mt-6 mb-2">Öğretmenliğe Alternatif Pedagojik ve Bilişim Alanları</h3>
        <div class="space-y-4 mt-4">
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold">1. Multiprofesyonel Ekip Üyesi (MPT)</h4>
            <ul class="list-disc pl-5 mt-1 space-y-1 text-sm">
              <li><strong>Yasal Zemin:</strong> Kalıcı istihdam, TVL 10 maaş grubu. Başvurular ANDREAS portalı üzerinden.</li>
              <li><strong>Çalışma Alanları:</strong> Birçok okul türünde çalışılabilir.</li>
              <li><strong>Görevler:</strong> Team Teaching, bireysel çalışma, destek planı hazırlama, DAZ, nöbet, ev ödevi yardımı.</li>
              <li><strong>Avantaj/Dezavantaj:</strong> Not verme ve veli görüşmesi yok; ancak iş tanımı belirsizliği olabilir.</li>
            </ul>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold">2. Okul Destek Personeli (Schulbegleitung/I-Kraft)</h4>
            <p class="text-sm mt-1">Engelli veya öğrenme güçlüğü çeken öğrencilere eşlik etme. Genellikle şirketler üzerinden başvurulur, B2 Almanca yeterli olabilir.</p>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold">3. Yetişkin Eğitimi Eğitmeni</h4>
            <p class="text-sm mt-1">VHS veya dil kurslarında çalışılabilir. Integrationskurs eğitmenliği için C1 sertifikası şarttır.</p>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold">4. Eğitim/Meslek Koçluğu</h4>
            <p class="text-sm mt-1">Brückenmaßnahme Weiterbildung gibi programlarla sertifika alınabilir.</p>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold">5. Bilişim (IT) Alanında Kariyer</h4>
            <p class="text-sm mt-1">Umschulung (yeniden eğitim) önemli bir seçenektir (örneğin IT Systemintegration).</p>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold">6. Grup Lisansı ile Dijital Kaynaklar Uzmanlığı</h4>
            <p class="text-sm mt-1">meinUnterricht gibi platformları kullanarak materyal uzmanı olma potansiyeli.</p>
          </div>
        </div>
      `
    },
    {
      id: "basvuru",
      title: "III. İş Başvurusu Süreci ve Mülakata Hazırlık",
      content: `
        <p>İş başvurusu belgelerinin titizlikle hazırlanması ve mülakat (Auswahlgespräch) için pedagojik kriterlere hakim olunması gereklidir.</p>

        <h3 class="text-xl font-semibold mt-6 mb-2">Başvuru Belgeleri ve Stratejiler</h3>
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-4">
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Belge Sırası:</strong> İş başvuru yazısı (Anschreiben), Özgeçmiş (Lebenslauf), okul belgeleri, staj ve kurs belgeleri.</li>
            <li><strong>Özelleştirme:</strong> Lebenslauf ve Anschreiben kuruma özel hazırlanmalıdır.</li>
            <li><strong>Fotoğraf:</strong> Profesyonel bir iş başvuru fotoğrafı çektirilmelidir.</li>
            <li><strong>Referanslar:</strong> İş referans mektupları (Arbeitszeugnis) avantaj sağlar.</li>
            <li><strong>Teslim:</strong> Evrakları elden teslim etmek tanışma fırsatı yaratabilir.</li>
          </ul>
        </div>

        <h3 class="text-xl font-semibold mt-6 mb-2">Mülakat (Auswahlgespräch) Yapısı</h3>
        <p>Mülakatlar genellikle 3 farklı şekilde gerçekleşebilir. Komisyon üyeleri genellikle Okul Müdürü, Branş Yöneticisi, Denetleme Kurumu Temsilcisi, Personel Temsilcisi ve Eşit Fırsatlar Temsilcisinden oluşur.</p>

        <h3 class="text-xl font-semibold mt-6 mb-2">Pedagojik ve Mesleki Temel Kriterler</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 my-4">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kriter</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Detaylar</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Alan Bilgisi</td>
                <td class="px-6 py-4">Derinlemesine bilgi, didaktik yetenekler, güncel teknolojileri entegre etme.</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Didaktik ve Metot</td>
                <td class="px-6 py-4">Öğretim yöntemleri, dersin yapısı. Hilbert Meyer’e göre iyi dersin 10 özelliği.</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Sınıf Yönetimi</td>
                <td class="px-6 py-4">Pozitif atmosfer, Ring Model (Önleme, Müdahale vb.).</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Kapsayıcılık</td>
                <td class="px-6 py-4">Farklı yeteneklere sahip öğrencileri entegre etme (Inklusion vs Differenzierung).</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Özel İhtiyaçlar</td>
                <td class="px-6 py-4">OSB, Duygusal/Sosyal sorunlar, DEHB için stratejiler.</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">İşbirliği</td>
                <td class="px-6 py-4">Meslektaşlarla işbirliği, velilerle yapıcı ilişkiler, çatışma çözümü.</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Teknolojik Yetkinlik</td>
                <td class="px-6 py-4">Dijital medya, öğrenme platformları, yapay zeka entegrasyonu.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "kariyer-gelisimi",
      title: "IV. Kariyer Gelişimi ve Dijital Kaynaklar",
      content: `
        <p>Bilgisayar öğretmenliği kariyerinde sürekli mesleki gelişim (Fortbildung) ve dijital araçlara hakimiyet, merkezi bir rol oynar.</p>

        <h3 class="text-xl font-semibold mt-6 mb-2">Mesleki Gelişim ve Çevrimiçi Kaynaklar</h3>
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg my-4">
          <h4 class="font-semibold text-green-700 dark:text-green-300 mb-2">Pratik Tecrübe ve İpuçları (BÖTE Odaklı)</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>MeinUnterricht Platformu:</strong> 130.000'den fazla ders materyali sunan dijital kütüphane. Yapay Zeka (Muki) desteği vardır. Grup aboneliği ile daha ekonomiktir.</li>
            <li><strong>Edumaps:</strong> Kaynak paylaşımı için ortak bilgi havuzları oluşturma aracı.</li>
            <li><strong>Hopp Foundation:</strong> Ücretsiz veya uygun fiyatlı aktivite ve oyun setleri.</li>
          </ul>
        </div>

        <h3 class="text-xl font-semibold mt-6 mb-2">Master ve İleri Eğitim Seçenekleri</h3>
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg my-4">
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Eğitim Teknolojisi (Education Technology):</strong> Online Master programları mevcuttur. Tezsiz ve devam zorunluluğu olmayan seçenekler bulunabilir.</li>
            <li><strong>IT Alanı:</strong> Computer Science, Networking, Cyber Security, Software Engineer, Data Analyst gibi alanlarda Master yapılabilir.</li>
            <li><strong>Dil Şartı Kolaylığı:</strong> İngilizce eğitim almış olanlar için bazı online programlarda dil şartı kolaylığı sağlanabilir.</li>
          </ul>
        </div>
      `
    },
    {
      id: "genel-degerlendirme",
      title: "Öğretmenlik ve Yaşam Hakkında Genel Değerlendirme",
      content: `
        <p>Öğretmenlik, en özverili ve saygıdeğer mesleklerden biri olarak kabul edilir. Almanya'da bu kariyere girmek isteyen nitelikli kişilerin, denklik ve dil süreçlerini yönetirken Jobcenter gibi kurumlardan alacakları destekleri ve hakları bilmesi hayati öneme sahiptir.</p>
        <p class="mt-4">Özellikle bilişim ve pedagoji alanındaki uzmanlık (Bilgisayar Öğretmenliği), Multiprofessionelles Team veya Seiteneinstieg gibi yollarla kamu sektöründe kalıcı istihdam (unbefristet) fırsatları sunmaktadır. Türkiye'den gelen üstün nitelikli eğitimcilerin, kısa süre içinde topluma adapte olarak kapasitelerine uygun performans göstermeleri beklenmektedir.</p>
      `
    }
  ],
  faq: []
};
