import { ProfessionData } from './types';

export const kurdishTeacherData: ProfessionData = {
  title: "Kürtçe Öğretmenliği",
  slug: "kurtce-ogretmenligi",
  description: "Almanya'da Kürtçe Öğretmenliği (HSU Kurdisch) kariyeri, dil şartları, denklik süreçleri ve alternatif pedagojik fırsatlar rehberi.",
  videoUrl: "", // Video URL can be added later if available
  stats: [
    { label: "Talep", value: "Orta", color: "bg-blue-500" },
    { label: "Dil", value: "C1 (Kürtçe/Almanca)", color: "bg-red-500" },
    { label: "Sektör", value: "Eğitim", color: "bg-green-500" },
    { label: "Fırsat", value: "HSU & Pedagoji", color: "bg-purple-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Dil Yeterliliği (Kürtçe & Almanca)",
      description: "Kariyerin temeli: İki dilde yetkinlik.",
      details: [
        {
          title: "Almanca Şartı",
          content: "Normalde C1 istenir ancak Kürtçe öğretmenliği (HSU) için başvuru azlığından dolayı B2 ile kabul alma şansı vardır."
        },
        {
          title: "Kürtçe C1 Belgesi",
          content: "Kürtçe öğretmenliği için C1 sertifikası şarttır. Online kurslar ve TESTKURD gibi sınavlarla bu belge edinilebilir. Kurmancî lehçesi ve 31 sesli alfabe temellidir."
        }
      ]
    },
    {
      step: 2,
      title: "Mesleki Denklik (Anerkennung)",
      description: "Diplomanın Almanya'da tanınması.",
      details: [
        {
          title: "Denklik Süreci",
          content: "Öğretmenlik diplomasının tanınması zorunludur. Master/Doktora diplomaları sürece katkı sağlar. Eyalet bazında (örn. Baden Württemberg) farklı belge talepleri olabilir."
        },
        {
          title: "Tek Branş İmkanı",
          content: "Memurluk için çift branş gerekse de, sözleşmeli öğretmen (Fachlehrer) olarak tek branşla çalışmak mümkündür."
        }
      ]
    },
    {
      step: 3,
      title: "Kariyer Yolları ve Başvuru",
      description: "HSU öğretmenliği ve alternatifler.",
      details: [
        {
          title: "HSU Kurdisch Öğretmenliği",
          content: "Özellikle NRW'de 'HSU Kurdisch Lehrer' ilanları yayınlanır. Başvuru az olduğu için şans yüksektir. Farklı branş mezunu (örn. Bilgisayar) öğretmenler de başvurabilir."
        },
        {
          title: "Pedagojik Uzman (Pädagogische Fachkraft)",
          content: "Öğretmenlik diploması (H+) olanlar, anaokulu ve gençlik merkezlerinde 'Pedagojik Uzman' olarak çalışabilir. Kamu sözleşmesi ve iyi maaş imkanı sunar."
        }
      ]
    },
    {
      step: 4,
      title: "İş Başvurusu ve Mülakat",
      description: "Profesyonel hazırlık süreci.",
      details: [
        {
          title: "Başvuru Dosyası",
          content: "Motivasyon mektubu, CV, Denklik belgesi ve Dil sertifikaları eksiksiz olmalıdır. Okul müdürüyle şahsen görüşmek avantaj sağlar."
        },
        {
          title: "Mülakat Hazırlığı",
          content: "Sınıf yönetimi, kaynaştırma (Inklusion) ve pedagojik konseptler üzerine sorulara hazırlıklı olunmalıdır. Kürtçe mülakat olasılığına karşı hazırlık yapılmalıdır."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Kariyer Yolu Metaforu: Gizli Kapı",
    content: "Almanya'daki öğretmenlik kariyeri, bir bulmacayı birleştirmeye benzer: Mesleki denklik (Anerkennung) büyük bir parça, dil yeterliliği ise çerçeveyi oluşturan diğer önemli parçadır.\n\nKürtçe Öğretmenliği pozisyonları ise, talep eden az olduğu için, diğer branşların tıkalı olduğu büyük resimde açılmış gizli bir kapı gibidir. Doğru anahtarı (C1/B2 Almanca ve Kürtçe C1) bulanlar, bu kapıdan girme şansına sahip olurlar. Yeni Pedagojik Uzman (Pädagogische Fachkraft) yasası ise, öğretmenlik diplomasıyla anaokulunda hızla işe başlamayı sağlayan, beklenmedik bir ‘hızlandırıcı’ yol haritasıdır.",
    specialNeeds: "Kürtçe'nin lehçe farklılıklarına (Kurmancî/Zazaca) hakimiyet ve sınıf içi iletişim becerileri önemlidir.",
    resources: "HSU İlan Portalları (LOIS.NRW), TESTKURD Sınavları, Online Kürtçe Kursları."
  },
  faq: [
    // I. Kürtçe Öğretmenliği (HSU Kurdisch) İle İlgili Sorular
    {
      question: "Almanya'da Kürtçe Öğretmeni (HSU Kurdisch Lehrer) olarak çalışmak mümkün müdür?",
      answer: "Evet, mümkündür. Özellikle Kuzey Ren-Vestfalya (NRW) Eyaleti’nde Anadilinde Öğretim (HSU) programları kapsamında Kürtçe öğretmenliği pozisyonları açılmaktadır."
    },
    {
      question: "Kürtçe Öğretmenliği pozisyonlarına (HSU) nasıl başvurulur?",
      answer: "İlanlar genellikle Bölge Valilikleri (Bezirksregierung) tarafından 'HSU Kurdisch Lehrer Stellenaussreibung' başlığıyla yayınlanır. İlan portalları (LOIS.NRW vb.) takip edilmelidir."
    },
    {
      question: "Kürtçe Öğretmenliği için gereken temel dil sertifikaları nelerdir?",
      answer: "1. Almanca: Normalde C1 istenir ancak başvuru azlığından dolayı B2 ile de kabul alınabilmektedir. 2. Kürtçe: C1 sertifikası veya dil yeterliliğini kanıtlama şartı aranır."
    },
    {
      question: "Kürtçe dilindeki lehçe/şive farklılıkları (Kurmancî/Zazaca) öğretmenliği etkiler mi?",
      answer: "Evet, lehçe farklılıkları anlaşmada zorluk yaratabilir. Yazı diline (alfabe ve gramer) hakimiyet önemlidir. Velilerle iletişimde tercümanlık yaparken bile bu farklılıklar zorlayıcı olabilir."
    },
    {
      question: "Kürtçe (C1) dil sertifikası nasıl alınabilir?",
      answer: "Online kurslar ve eğitim materyalleri mevcuttur. Örneğin, 4 aylık online kurslar sonunda TESTKURD gibi sınavlarla sertifika alınabilmektedir."
    },
    // II. Denklik (Anerkennung) ve Diplomalar
    {
      question: "Türkiye'deki öğretmenlik diplomamın denkliğini (Anerkennung) almam şart mıdır?",
      answer: "Evet, öğretmenlik (Lehramt) mesleğini icra etmek için denklik süreci hayati öneme sahiptir."
    },
    {
      question: "Master (Yüksek Lisans) veya Doktora diplomaları denklik sürecini etkiler mi?",
      answer: "Evet, bu diplomalar denklik sürecinde değerlendirilebilir ve sürece olumlu katkı sağlayabilir."
    },
    // III. İş Başvurusu (Bewerbung) ve Mülakat (Auswahlgespräch)
    {
      question: "Öğretmenlik mülakatına (Auswahlgespräch) hazırlanırken nelere dikkat etmeliyim?",
      answer: "Çalışma grupları oluşturun, özel bir Türkçe/Almanca motivasyon mektubu (Anschreiben) hazırlayın, prova yapın ve Türkiye'deki tecrübelerinizi detaylandırın."
    },
    {
      question: "Mülakatta hangi tür sorular sorulur?",
      answer: "Kişisel sorular, mesleki alan bilgisi, didaktik/metot, sınıf yönetimi (disiplin) ve kaynaştırma (Inklusion) konularında sorular sorulur."
    },
    // IV. Alternatif Kariyer Yolları
    {
      question: "Kürtçe öğretmenliği dışında hangi alanlarda çalışabilirim?",
      answer: "1. Pedagojik Uzman (Pädagogische Fachkraft): Anaokulları ve gençlik merkezlerinde. 2. Multi-Profesyonel Takımlar (MPT): Okullarda destek personeli olarak. 3. Yardımcı Öğretmenlik. 4. Entegrasyon Kursu Öğretmenliği."
    },
    {
      question: "Pedagojik Uzman (Pädagogische Fachkraft) nedir?",
      answer: "Öğretmenlik diploması 'H+' (Anabin) olanlar, anaokulu ve gençlik merkezlerinde bu statüde çalışabilir. Genellikle kamu hizmetinde süresiz sözleşme imkanı sunar."
    },
    // V. Jobcenter ve Finansal Konular
    {
      question: "Jobcenter mesleki gelişim için hangi masrafları karşılar?",
      answer: "İşe giriş için gerekli kurs masraflarını (dil kursu, sertifika programları) ve iş başvurusu masraflarını (yol parası, çeviri ücretleri) karşılayabilir."
    },
    {
      question: "Jobcenter yardımı alırken varlıklarımı bildirmek zorunda mıyım?",
      answer: "Evet, tüm gelir ve varlıkları (yurt dışı dahil) bildirme yükümlülüğü vardır. Eksik bildirim yaptırımlara ve yasal sorunlara yol açabilir."
    },
    {
      question: "Jobcenter yardımı alırken araba alabilir miyim?",
      answer: "Evet, makul (angemessen) fiyata bir araba alınabilir. Genellikle 7.500 Euro'ya kadar olan araçlar sorun teşkil etmez."
    }
  ]
};
