import { ProfessionCardData } from './professions-list';

export const logisticsGuideData = {
  title: "Kargo ve Posta Dağıtım Sektörü Rehberi",
  description: "Almanya'da kargo ve posta dağıtım sektöründe çalışmak isteyenler için kapsamlı rehber. Deutsche Post, DHL, Amazon ve diğer firmalardaki çalışma şartları, maaşlar ve başvuru süreçleri.",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder or remove if not needed
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-green-500" },
    { label: "Dil Seviyesi", value: "A2-B1", color: "bg-blue-500" },
    { label: "Ortalama Maaş", value: "2.300€ - 2.800€", color: "bg-indigo-500" },
    { label: "Sektör", value: "Lojistik", color: "bg-orange-500" }
  ],
  sections: [
    {
      id: "genel-bakis",
      title: "Meslek Tanımı ve Genel Bakış",
      content: [
        {
          subtitle: "Dağıtım Çalışanları (Postbote / Zusteller)",
          text: `Almanya'da dağıtım çalışanları için genellikle "Postbote" (postacı) veya "Verbundzusteller/Paketzusteller" terimleri kullanılır.

**Deutsche Post ve DHL Farkı:**
• **Deutsche Post:** Kargo ve posta işlerini birlikte yürütür. Genellikle 31.5 kiloya kadar olan paketleri teslim eder.
• **DHL:** Daha ağır ve hacimli paketlerin dağıtımını üstlenir.

**İşin Nitelikleri:**
• Deutsche Post'ta çalışmak için genellikle Ausbildung (mesleki eğitim) şartı aranmaz.
• Almanya'da iş hayatına hızlı giriş yapmak isteyenler veya kariyer yolunu henüz çizmemiş olanlar için uygun bir başlangıç noktasıdır.
• Dağıtım; elektrikli araçlar, transporter tipi araçlar veya bisikletle (küçük paketler için) yapılabilir.

**Günlük Rutin:**
Sabahları mektuplar dizilir ve paketler araca yüklenir. Yaklaşık 10:00 gibi dağıtıma çıkılır. İş bitiminde merkeze dönülüp imza atılarak çıkılır; genellikle sıkı bir şef kontrolü yoktur.`
        },
        {
          subtitle: "Sektörün Zorlukları ve Algısı",
          text: `Kargo ve lojistik sektörü, fiziksel dayanıklılık gerektiren ve personel sirkülasyonunun yüksek olduğu bir alandır.

**Zorluklar:**
• **Fiziksel Yıpratıcılık:** Günde ortalama 14-15 km yürünür ve 20 kilonun üzerinde paketler taşınır. Bel fıtığı riski ve yaşlı çalışanlar için zorlayıcı olabilir.
• **Hava Koşulları:** Yağmur, kar, aşırı sıcak veya soğuk demeden çalışmak gerekir.
• **İş Stresi:** Özellikle ilk aylarda hız beklentisi ve hata yapma korkusu stres yaratabilir.
• **Teslimat Sorumluluğu:** Paketlerin doğru kişiye, doğru adrese teslim edilmesi kritiktir. Hatalı teslimatlar puan düşüklüğüne yol açabilir.

**Not:** Bu meslek, fiziksel kondisyonu yerinde olan kadın ve erkek adaylar için uygundur.`
        }
      ]
    },
    {
      id: "calisma-sartlari",
      title: "Çalışma Şartları ve Süreçler",
      content: [
        {
          subtitle: "Çalışma Saatleri ve İzinler (Deutsche Post/DHL)",
          text: `**Mesai Saatleri:**
• Haftalık çalışma süresi 38.5 saattir.
• Genellikle 08:00 - 17:00 arası çalışılır. Bölgeyi tanıyan ve hızlı çalışanlar işlerini 16:00 gibi bitirip çıkabilirler.
• Pazartesi günleri iş yoğunluğu daha az olabilir veya bölgeler birleştirilebilir.

**İzin Hakları:**
• Pazar günleri resmi tatildir.
• Pazar haricinde haftada bir gün kaydırmalı izin (Frei) kullanılır.
• 6 haftada bir; Cumartesi, Pazar ve Pazartesi olmak üzere 3 gün blok izin hakkı doğar.
• Yıllık 26 gün izin hakkı vardır.

**Mola ve Mesai:**
• Günlük 30 dakika mola hakkı vardır. Yemek ücreti desteği genellikle yoktur.
• Fazla mesai (Überstunde) ücreti alınabilir veya izin olarak kullanılabilir.`
        },
        {
          subtitle: "Sözleşme ve Kariyer",
          text: `**Sözleşme Türleri:**
• Genellikle 6 haftalık deneme süreciyle başlar.
• Ardından 3 aylık, 6 aylık veya 1 yıllık sözleşmeler yapılır.
• Yasal olarak 2 yılın sonunda ya süresiz sözleşme (Unbefristet) yapılmalı ya da iş akdi sonlandırılmalıdır.

**Kariyer Yolu:**
• Düzenli çalışanlar için şef olma veya yükselme imkanı vardır.
• Ausbildung (mesleki eğitim) yapanların yönetici pozisyonlarına gelme şansı daha yüksektir ve maaş artışları daha düzenlidir.
• Şubeler arası geçiş (tayin) mümkündür ancak her iki şubenin onayı gerekir.`
        }
      ]
    },
    {
      id: "maaslar",
      title: "Maaş ve Finansal Detaylar",
      content: [
        {
          subtitle: "Deutsche Post / DHL Maaşları (2024/2025)",
          text: `**Saatlik Ücret:**
• Başlangıç ücretleri genellikle 17.05 Euro civarındadır. Bazı bölgelerde ve tecrübeye göre 18.10 Euro'ya kadar çıkabilir.

**Aylık Tahmini Gelir (167 saat üzerinden):**
• **Brüt Maaş:** ~2.850 - 3.025 Euro
• **Net Maaş (Bekar):** ~1.950 Euro
• **Net Maaş (Evli, eşi çalışmayan):** ~2.350 - 2.450 Euro

**Ek Ödemeler:**
• Yılbaşı Primi (Weihnachtsgeld): Bir brüt maaş tutarındadır (Yarısı aylık, yarısı Aralık ayında ödenir).
• Fazla mesai ücretleri ile aylık gelir artabilir.`
        },
        {
          subtitle: "Diğer Firmalar (Lieferando vb.)",
          text: `**Lieferando:**
• Saatlik ücret genellikle asgari ücretin biraz üzerindedir (Örn: 12.82 Euro + Bonuslar).
• **Bonuslar:** Paket başı bonus (1-2 Euro) ve kilometre bonusu (araçlı kuryeler için).
• **Bahşiş:** Online ve nakit bahşişler doğrudan çalışana kalır (Tam zamanlı çalışanlar için aylık 300-400 Euro'yu bulabilir).`
        }
      ]
    },
    {
      id: "basvuru",
      title: "Dil ve Başvuru Şartları",
      content: [
        {
          subtitle: "Dil Gereksinimleri",
          text: `**Almanca Seviyesi:**
• Bu iş için ileri düzey Almanca şart değildir. **A2 seviyesi** genellikle yeterli görülür.
• Günlük işleyişte yaklaşık 20 kalıp cümle ve temel iletişim becerisi işi yürütmek için yeterlidir.
• Sabah toplantılarını anlamak ve ekip iletişimi için temel Almanca önemlidir.`
        },
        {
          subtitle: "Başvuru Süreci",
          text: `**Nasıl Başvurulur?**
• Deutsche Post kariyer sitesi ve iş arama platformları üzerinden online başvuru yapılabilir.
• CV'nizi hazırlarken bu iş için "fazla nitelikli" görünmemeye dikkat edin (Overqualified durumu elenme sebebi olabilir).

**Mülakat ve İşe Alım:**
• Genellikle yüz yüze görüşme ve 2 günlük deneme süreci (Probetag) uygulanır.
• Mülakatta; Almanca seviyesi, fiziksel uygunluk ve güvenilirlik (sabıka kaydı vb.) kontrol edilir.
• Çalışma izni ve evrak süreçleri 15-20 gün sürebilir.`
        }
      ]
    },
    {
      id: "alternatifler",
      title: "Alternatifler ve İş Kurma",
      content: [
        {
          subtitle: "Depo Çalışanlığı (Lagerist)",
          text: `Kargo dağıtımına alternatif olarak depo çalışanlığı düşünülebilir.
• **Avantajlar:** Daha az fiziksel yıpranma, hava koşullarından etkilenmeme, bilgisayar kullanımı gibi becerilerle kariyer gelişimi.
• **Dezavantajlar:** Genellikle taşeron firmalar üzerinden alım yapılır.`
        },
        {
          subtitle: "Kendi İşini Kurma (Subunternehmen)",
          text: `Amazon veya Deutsche Post bünyesinde taşeron dağıtım şirketi kurabilirsiniz.

**Amazon İçin Örnek Şartlar:**
• En az 5 araçlık filo.
• ~25.000 Euro sermaye.
• GmbH şirket kurulumu.
• İyi derecede İngilizce veya Almanca.
• Temiz bir finansal geçmiş (Schufa).`
        },
        {
          subtitle: "Bireysel Kuryelik (Uber Eats / Lieferando)",
          text: `• **Uber Eats:** Kendi şahıs şirketinizle esnek saatlerde çalışabilirsiniz. Gelir paket başı ve km bazlıdır.
• **Lieferando:** Minijob veya tam zamanlı, sigortalı çalışma imkanı sunar. Elektrikli bisiklet ve ekipman genellikle şirket tarafından sağlanır.`
        }
      ]
    }
  ],
  faq: [
    {
      question: "Almanya'da kargo ve posta dağıtım sektöründeki temel meslek kolları ve firmalar hangileridir?",
      answer: "Ana dökümanlarda ele alınan temel meslekler, Deutsche Post/DHL, Amazon, Hermes ve Uber/Lieferando gibi büyük firmalar bünyesindeki dağıtım ve lojistik (Lieferung) işleridir. Bu çalışanlar Almanca'da Postbote (postacı), Verbundzusteller veya Paketzusteller olarak adlandırılır."
    },
    {
      question: "Deutsche Post/DHL'de çalışmak için mesleki eğitim (Ausbildung) şart mıdır?",
      answer: "Deutsche Post'ta çalışmak için Ausbildung (mesleki eğitim) gerekmez. Bu iş, Almanya'da henüz ne iş yapacağına karar veremeyenler veya kısa yoldan iş hayatına girmek isteyenler için uygun görülür."
    },
    {
      question: "Bu iş için ne kadar Almanca bilgisi gereklidir?",
      answer: "Kargo/posta dağıtım işlerinde Almanca hakimiyeti ana unsur değildir. A2 seviyesinde Almanca yeterli görülür. Sabahları yapılan 10 dakikalık toplantı haricinde, iş için en fazla 20 kalıp cümle ezberlemek yeterli olabilir."
    },
    {
      question: "Dağıtım işi fiziksel olarak ne kadar zorlayıcıdır?",
      answer: "İş genel olarak çok yorucudur. Bir katılımcı, günde ortalama 14-15 km yürüdüğünü ve her gün ortalama 20 kilonun üzerinde 7-8 paket taşıdığını belirtmiştir. 50-55 yaş üzeri ve kronik rahatsızlığı (örneğin bel fıtığı) olanlar için yıpratıcı olabilir."
    },
    {
      question: "Bu meslek kadınlar (bayanlar) için uygun mudur?",
      answer: "Bir katılımcının görüşüne göre, bu meslek bayanlar için de uygundur."
    },
    {
      question: "Deutsche Post/DHL'de saatlik brüt ücret ne kadardır ve maaş nasıl hesaplanır?",
      answer: "Maaş, aylık 167 saat üzerinden hesaplanır. Kaynaklarda belirtilen en güncel saatlik ücret (2024 sonu ilanlarına göre) 18.10 Euro civarındadır. Daha önceki saatlik ücret 14.34 Euro (2022) ve 17.05 Euro (2024 zammı) olarak belirtilmiştir."
    },
    {
      question: "Deutsche Post/DHL'de ortalama net maaşlar ne kadardır?",
      answer: "Saatlik 18.10 Euro brüt maaş (yaklaşık 3025 Euro) üzerinden: Evli ve eşi çalışmayan (Steuerklasse 3) bir çalışan net yaklaşık 2350 Euro alabilir. Yıllık Weihnachtsgeld dahil edildiğinde aylık ortalama 2450 Euro'ya ulaşabilir. Yeni zamlarla birlikte (saatlik 17.05 Euro üzerinden 2845 Brüt) bekar bir çalışan net yaklaşık 1950 Euro alabilir."
    },
    {
      question: "Dağıtım çalışanlarına yılbaşı primi (Weihnachtsgeld) ödeniyor mu?",
      answer: "Evet, Weihnachtsgeld (Yılbaşı Primi) bir brüt maaş değerindedir. Bu primin yarısı aylık olarak 12'ye bölünmüş şekilde, diğer yarısı ise Aralık maaşında ödenir. Yeni başlayanlar bu ücreti hemen alamayabilir."
    },
    {
      question: "Deutsche Post/DHL'de haftalık çalışma düzeni nasıldır?",
      answer: "Haftalık çalışma süresi 38.5 saattir. Genellikle 08:00'de başlanır, 17:00'de biter. Bölgeyi tanıyanlar işlerini 16:00'da bitirip erken gidebilir ve bu eksik çalışma sayılmaz."
    },
    {
      question: "İzin ve tatil hakları nelerdir?",
      answer: "Yıllık 26 gün izin hakkı mevcuttur. Pazar günü resmi tatildir. Pazar dışında her hafta kaydırmalı bir izin günü (Frei) ayarlanır. Ortalama 6 haftada bir, Cumartesi, Pazar ve Pazartesi olmak üzere 3 gün üst üste izinli olunabilir. Çalışanın yarım saat Pause (mola) hakkı vardır, ancak öğle yemeği veya yemek ücreti desteği yoktur."
    },
    {
      question: "Fazla mesai (Überstunde) uygulaması nasıldır?",
      answer: "Mesai saatinden fazla çalışıldığında fazla mesai sayılır (Überstunde). İş bitmese bile maksimum 45 dakikaya kadar fazla mesai yapılabilir ve sonrası bir sonraki güne bırakılabilir (teorik olarak). Fazla mesailerin parası alınabilir veya tatil olarak kullanılabilir."
    },
    {
      question: "Deutsche Post/DHL'deki ilk sözleşmeler ne kadar sürelidir?",
      answer: "İlk sözleşmeler genellikle 6 haftalık deneme süresiyle başlar, ardından 3 aylık, daha sonra 6 aylık veya 1 yıllık sözleşmeler takip edebilir. Bazen ilk başlayanlara direkt 1 yıllık sözleşme de yapılabilir."
    },
    {
      question: "Süresiz sözleşme (Unbefristeter Vertrag) almak ne kadar sürer ve neye bağlıdır?",
      answer: "Yasal olarak işverenin 2 yıla kadar sınırlı sözleşmeyle çalıştırma hakkı vardır. En geç 2 yılda ya süresiz sözleşme yapmak zorundadırlar ya da işten çıkartmak zorundadırlar. Süresiz sözleşme verilmesinde şefin kanaati ve elemanın düzenli, sorunsuz çalışması önemlidir."
    },
    {
      question: "İş başvurusunda özgeçmiş (CV) nasıl hazırlanmalıdır?",
      answer: "Adayın profilini bu iş için fazla görmemeleri adına, özgeçmişin (CV) mümkün mertebe hafifletilmesi tavsiye edilmiştir."
    },
    {
      question: "Bir kargo/posta dağıtım elemanı başka bir şehre tayin isteyebilir mi?",
      answer: "Başka bir şubeye geçmek (tayin olmak) için şef veya İnsan Kaynakları (IK) ile konuşulması gerekir. Geçilmek istenen şubede ihtiyaç olması ve mevcut şubenin onay vermesi halinde geçiş yapılabilir."
    },
    {
      question: "Kargo dağıtım işinde yükselme (kariyer yapma) imkanı var mıdır?",
      answer: "Dağıtım işinde şef olmak veya iş kurmak mümkündür. Özellikle Ausbildung (mesleki eğitim) yapanlar için şef veya yönetici olma, yani yükselme imkanı daha fazladır. Ausbildung yapanların maaşları diğerlerine göre daha sık artar (2 yılda bir)."
    },
    {
      question: "Kargo dağıtımına alternatif olarak önerilen lojistik işleri nelerdir?",
      answer: "Lageristlik (Depo Çalışanlığı) pozisyonu, kargo sektörüne göre daha rahat ve ilerisi için sıçrama imkanı daha fazla görülmektedir. Lageristlik, sipariş girmek, kontrol etmek, bilgisayar kullanmak gibi daha komplike işler içerdiği için daha kıymetlidir."
    },
    {
      question: "Amazon'da kendi dağıtım şirketini (Subunternehmen) kurmak mümkün müdür ve şartları nelerdir?",
      answer: "Evet, Amazon'da dağıtım şirketi kurmak (Subunternehmen) mümkündür. Başlıca şartları: En az 5 araçla başlamak, yaklaşık 25.000 Euro sermaye (GmbH kurulumu vb.), iyi derecede İngilizce veya Almanca bilgisi, iyi bir Schufa notu ve Amazon'un şirketi kabul etmesi."
    },
    {
      question: "Lieferando'da kurye olarak çalışma şartları ve ücretlendirme nasıldır?",
      answer: "Lieferando'da Minijob, Teilzeit veya Vollzeit olarak çalışılabilir. Şirket tarafından elektrikli bisiklet temin edilebilir. Genellikle süresiz sözleşme imkanı sunulur. Saatlik Ücret: Brüt 12.82 Euro'dur. Ek Ödemeler: Paket bonusu (aylık 200 ve üzeri sipariş için paket başı 2€), kilometre bonusu (araba için 0,30 cent/km) ve Online/Nakit Bahşiş (Vollzeit için ortalama 300-400 Euro net) mevcuttur."
    },
    {
      question: "Uber Eats'te kurye olarak çalışmak mümkün müdür?",
      answer: "Evet, Uber Eats'te kendi şirketi üzerinden çalışılabilir. Çalışma saatleri esnektir; istenildiği zaman online olunabilir ve ücretlendirme paket başına, gidilen kilometre hesaplanarak yapılır."
    },
    {
      question: "Türk vatandaşları Almanya'da Kindergeld (çocuk parası) alabilir mi?",
      answer: "Evet, Almanya'da yaşayan yabancılar, geçerli ve uzun süreli oturma hakkı içeren bir izne sahip oldukları takdirde çocuk parası alırlar. Geçerli oturma iznine sahip olmayan Türk vatandaşları için Türk-Alman Sosyal Güvenlik Anlaşması ve EWG/Türkiye Ortaklık Anlaşması gibi hukuki düzenlemeler mevcuttur."
    },
    {
      question: "Türk-Alman Sosyal Güvenlik Anlaşması'na göre Kindergeld alma şartı nedir?",
      answer: "Bu anlaşmaya göre çocuk parası hakkı, sadece Almanya’da işsizlik sigortasına tabi bir işte işalan olarak çalışılan aylar için, bu çalışma esnasında işsizlik sigortası ödeme mecburiyeti bulunduğu takdirde mevcuttur."
    },
    {
      question: "Kindergeld başvurusu nereye yapılır?",
      answer: "Çocuk parası için yazılı olarak Familienkasse Bayern Süd, 93013 Regensburg adresine başvurulması gerekir. Başvuru için 'Çocuk parası dilekçesi' (KG 1), 'Ek çocuk' ve 'Ek yurt dışı (KG 51)' formülerlerinin kullanılması gereklidir."
    },
    {
      question: "İşverenin Kindergeld başvurusundaki rolü nedir?",
      answer: "İşalan olarak bir işte çalışıldığı takdirde, işverenin ekteki KG 54 formüleri üzerinde, bir çalışma ilişkisinin mevcut olup olmadığını ve İş Ajansı’na aidat ödenip ödenmediğini belgelemesi gerekir."
    },
    {
      question: "Türkiye'de ikamet eden çocuklar için Kindergeld miktarı ne kadardır?",
      answer: "Türkiye’deki çocuklar için çocuk parası hakkı sadece dilekçe sahibi Türk Alman Sosyal Güvenlik Anlaşması’na göre işalan ise mevcuttur. Miktarlar daha düşüktür: Örneğin, ilk çocuk için ayda 5,11 Avro, ikinci çocuk için ayda 12,78 Avro ve üçüncü ve dördüncü çocuğun her biri için ayda 30,68 Avro ödenir. Almanya'da yaşayan çocuklar için ise bu miktar çok daha yüksektir (ilk iki çocuk için ayda 204 Avro)."
    }
  ]
};
