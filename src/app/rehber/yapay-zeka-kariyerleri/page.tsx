import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, BookOpen, Briefcase, Database, ExternalLink, GraduationCap, MessageSquare, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Yapay Zeka ile Yeni Kariyerler | Deutschland Compass',
  description:
    'Almanya’da yazılım bilmeden yönelinebilecek yeni yapay zeka meslekleri, ücretsiz kaynaklar ve araştırma odaklı kariyer rehberi.',
};

const aiRoles = [
  {
    title: 'İstem Mühendisi / Prompt Uzmanı',
    icon: MessageSquare,
    summary:
      'ChatGPT, Claude ve Gemini gibi araçlardan en doğru çıktıyı almak için istemleri stratejik biçimde tasarlayan roldür.',
    ideal:
      'Öğretmenler, iletişimciler, dil becerisi güçlü çalışanlar, yazışma ve içerik üretiminde iyi olanlar.',
    start:
      'Gerçek iş senaryoları için prompt şablonları oluşturup küçük bir portfolyo hazırlayın; çıktı karşılaştırmalarıyla kendinizi gösterin.',
    tags: ['Kodlama şart değil', 'Dil gücü', 'Portfolyo önemli'],
  },
  {
    title: 'AI Compliance & Ethics Officer',
    icon: ShieldCheck,
    summary:
      'Şirketlerin kullandığı yapay zeka sistemlerinin AB AI Act, DSGVO ve etik ilkelere uygun çalışıp çalışmadığını denetler.',
    ideal:
      'Hukukçular, insan kaynakları uzmanları, sosyologlar, mevzuat ve denetim tecrübesi olanlar.',
    start:
      'AB AI Act, veri koruma ve risk sınıfları üzerine temel okuryazarlık edinip politika ve kontrol listeleri hazırlayın.',
    tags: ['AB AI Act', 'DSGVO', 'Uyumluluk'],
  },
  {
    title: 'Yapay Zeka Süreç ve Entegrasyon Danışmanı',
    icon: Workflow,
    summary:
      'Bir işletmedeki iş akışlarını analiz eder; hangi sürecin hangi AI aracına devredilebileceğini belirler.',
    ideal:
      'Yöneticiler, bankacılar, işletmeciler, süreç yönetimi ve operasyon tecrübesi olanlar.',
    start:
      'Muhasebe, müşteri hizmetleri, raporlama ve belge yönetimi gibi süreçleri AI ile nasıl hızlandırabileceğinizi örnekleyin.',
    tags: ['Süreç analizi', 'Dijital dönüşüm', 'Danışmanlık'],
  },
  {
    title: 'Yapay Zeka Proje Yöneticisi',
    icon: Briefcase,
    summary:
      'Yapay zeka projelerinde ihtiyaç, bütçe, takvim ve ekip koordinasyonunu yöneterek iş ile teknik ekip arasında köprü kurar.',
    ideal:
      'Mühendisler, saha yöneticileri, proje takibi bilen teknikerler ve ekip yönetimi tecrübesi olanlar.',
    start:
      'Temel AI kavramlarını öğrenip proje planı, risk tablosu ve teslim takvimi hazırlama becerinizi görünür kılın.',
    tags: ['Takvim & bütçe', 'Köprü rol', 'Koordinasyon'],
  },
  {
    title: 'AI Literacy Trainer / Yapay Zeka Eğitmeni',
    icon: GraduationCap,
    summary:
      'Kurumlara ve ekiplerine “yapay zeka araçları güvenli ve verimli nasıl kullanılır?” sorusunun eğitimini verir.',
    ideal:
      'Öğretmenler, akademisyenler, eğitmenler ve bilgiyi sistemli aktarmayı seven herkes.',
    start:
      'Kurumsal sunumlar, mini atölyeler ve örnek eğitim planları hazırlayarak anlatma becerinizi ürüne dönüştürün.',
    tags: ['Eğitim tasarımı', 'Sunum', 'Kurumsal eğitim'],
  },
  {
    title: 'Veri Düzenleme ve Etiketleme Uzmanı',
    icon: Database,
    summary:
      'Metin, görsel veya ses verilerini etiketleyerek yapay zekanın öğrenme kalitesini artıran giriş kapısıdır.',
    ideal:
      'Detaycı çalışanlar, sabırlı kişiler, evden başlamak isteyenler ve Almancası henüz gelişme aşamasında olanlar.',
    start:
      'Data annotation, content labeling ve moderation ilanlarını takip ederek küçük görevlerle sektöre giriş yapılabilir.',
    tags: ['Giriş seviyesi', 'Remote ihtimali', 'Detay odaklı'],
  },
];

const resources = [
  {
    title: 'KI-Campus',
    description:
      'BMBF destekli ücretsiz platform. Yapay zekanın temelleri, eğitimde ve sağlıkta AI kullanımı gibi konularda Almanca/İngilizce kurslar sunar.',
    href: 'https://ki-campus.org/',
    badge: 'Ücretsiz',
  },
  {
    title: 'Elements of AI',
    description:
      'Helsinki Üniversitesi ve AB destekli, kodlama gerektirmeyen küresel AI okuryazarlığı programı. Sertifika seçeneği de bulunur.',
    href: 'https://www.elementsofai.com/',
    badge: 'Ücretsiz',
  },
  {
    title: 'Coursera & edX',
    description:
      'Stanford, IBM, Google gibi kurumların derslerine audit/misafir öğrenci olarak ücretsiz erişebilir; sertifika için düşük ücret ödeyebilirsiniz.',
    href: 'https://www.coursera.org/',
    badge: 'Düşük maliyet',
  },
  {
    title: 'Bildungsgutschein',
    description:
      'Jobcenter veya Agentur für Arbeit üzerinden alınabilen eğitim kuponuyla pahalı bootcamp programları ücretsiz hale gelebilir.',
    href: 'https://www.arbeitsagentur.de/',
    badge: 'Devlet destekli',
  },
];

const searchKeywords = [
  'Prompt Engineer',
  'AI Trainer',
  'AI Governance',
  'AI Compliance',
  'KI Projektmanager',
  'Data Annotator',
  'AI Literacy',
  'Digital Transformation',
];

export default function AIKariyerleriPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="border-b bg-gradient-to-br from-fuchsia-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-fuchsia-600 text-white border-0 hover:bg-fuchsia-700">Yeni</Badge>
              <Badge variant="outline" className="border-fuchsia-200 text-fuchsia-700 dark:border-fuchsia-800 dark:text-fuchsia-300">
                Araştırma Dosyası
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Yapay Zeka ile Yeni Kariyerler
              </h1>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                Bu sayfa, sitemizdeki klasik “tecrübe derlemesi” formatından biraz farklıdır. Buradaki başlıklar;
                Almanya’daki dijital dönüşüm, açık kaynak araştırmalar ve güncel kariyer eğilimleri temel alınarak hazırlandı.
              </p>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Amaç, henüz çok az kişinin sahadan paylaşım yapabildiği bu alanlarda size erken farkındalık kazandırmak ve yön
                göstermek. Yani bu içerik bir “kesin iş garantisi” değil, güçlü bir başlangıç haritasıdır.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                <Link href="#meslekler">
                  6 meslek grubunu incele <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/katki">Sahadan tecrübe paylaş</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-10 space-y-10">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-amber-200 bg-amber-50/70 dark:border-amber-900 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="text-lg text-amber-800 dark:text-amber-300">Neden şimdi?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Klasik iş tanımları dönüşürken, şirketler yapay zekayı yönetecek insanlara ihtiyaç duyuyor. Bu ihtiyaç sadece yazılımcılara değil;
              planlayan, anlatan, denetleyen ve yöneten kişilere de açılıyor.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kimler için uygun?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Türkiye’deki mesleğini geride bırakmış olsa da kriz yönetimi, analiz, planlama ve problem çözme gücünü yanında getiren herkes için.
              Özellikle öğretmenler, hukukçular, yöneticiler ve ofis tecrübesi olanlar için güçlü bir yön değişimi alanı olabilir.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nasıl okunmalı?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Bu başlıkları “hemen yarın işe girilecek sabit meslekler” gibi değil; yükselen alanlar, eğitim fırsatları ve pozisyon isimleri olarak okuyun.
              İlanda geçen görevleri tanıdıkça yönünüz daha netleşir.
            </CardContent>
          </Card>
        </div>

        <Card className="border-fuchsia-200 bg-fuchsia-50/60 dark:border-fuchsia-900 dark:bg-fuchsia-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
              <div className="space-y-2">
                <h2 className="font-semibold text-slate-900 dark:text-white">Önemli not</h2>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Sitemizdeki pek çok içerik Telegram gruplarındaki gerçek tecrübelerin derlemesidir. Bu sayfa ise o çizgiyi koruyarak,
                  henüz sahadan veri az olduğu için araştırma odaklı bir “yön bulma rehberi” olarak konumlandırıldı.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section id="meslekler" className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Yazılım gerektirmeyen 6 yeni AI rolü
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
              Aşağıdaki başlıklar, bugün Almanya’da özellikle dijital dönüşüm, eğitim, denetim ve operasyon tarafında dikkat çeken pozisyonlardır.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {aiRoles.map((role) => {
              const Icon = role.icon;
              return (
                <Card key={role.title} className="h-full border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="p-2.5 rounded-lg bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-[11px]">Kodlama şart değil</Badge>
                    </div>
                    <CardTitle className="text-xl leading-snug">{role.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{role.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">Kimler için ideal?</p>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{role.ideal}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">İlk adım</p>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{role.start}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {role.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Nereden başlanır?
              </CardTitle>
              <CardDescription>
                Ücretsiz veya düşük maliyetli kaynaklarla temel AI okuryazarlığı kazanabilir, ardından portfolyo veya sertifika oluşturabilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {resources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-blue-400 dark:hover:border-blue-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{resource.title}</h3>
                    <Badge variant="outline">{resource.badge}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{resource.description}</p>
                  <div className="mt-3 inline-flex items-center text-sm text-blue-600 dark:text-blue-400">
                    Siteye git <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-emerald-600" />
                İlanlarda hangi kelimeleri arayabilirsiniz?
              </CardTitle>
              <CardDescription>
                LinkedIn, Indeed, StepStone ve Xing üzerinde bu kelimeleri aratarak role yakın ilanları görebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {searchKeywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Ek not:</strong> Jobcenter veya Agentur für Arbeit ile görüşürken
                “Weiterbildung”, “Umschulung”, “Digitalisierung”, “KI-Kompetenz” ve “Bildungsgutschein” başlıklarını da mutlaka sorun.
              </div>
            </CardContent>
          </Card>
        </section>

        <Card className="border-dashed border-slate-300 dark:border-slate-700">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                  Topluluğa çağrı: sahadan tecrübe varsa birlikte büyütelim
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Eğer bu alanlarda kursa katıldıysanız, Bildungsgutschein aldıysanız, sertifika sınavına girdiyseniz veya Almanya’da gerçekten
                  bu işlerde çalışmaya başladıysanız; sizin pratik tecrübeniz bu sayfanın en değerli devamı olacaktır.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link href="/katki">Bilgi / tecrübe paylaş</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/telegram-gruplari">Telegram grupları</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
