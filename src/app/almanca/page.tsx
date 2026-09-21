import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  Headphones, 
  PenLine, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  HelpCircle,
  Users,
  ChevronRight,
  ExternalLink,
  Award,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function AlmancaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent dark:from-slate-900 dark:via-slate-950 dark:to-transparent border-b border-slate-200/80 dark:border-slate-800 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Almanca & Dil Sınavları</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-4">
              <GraduationCap className="w-4 h-4" />
              Almanya Dil & Sınav Portalı
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
              Almanca & Sınav Hazırlığı
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Almanya'da mesleki denklik (Anerkennung), iş bulma ve vatandaşlık yolunda en belirleyici adım olan Almanca sınavlarına yönelik interaktif çalışma modülleri ve rehberler.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                telc & Goethe Formatı
              </span>
              <span className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Gerçek Soru Tipleri
              </span>
              <span className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Aralıklı Tekrar (Spaced Repetition)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sınav Modülleri Grid */}
      <section className="py-12 md:py-16 bg-white dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                <Layers className="w-3.5 h-3.5" />
                Sınav Hazırlık Alanları
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Hazırlık Modülleri
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Farklı sınav hedeflerine ve dil seviyelerine göre özelleştirilmiş interaktif çalışma ortamları.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. B2 Sınav Hazırlığı (ALL DOSYASI) - AKTİF */}
            <div className="relative group rounded-2xl border-2 border-blue-500/80 dark:border-blue-500/60 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-blue-950/20 dark:via-slate-900 dark:to-slate-900 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  Aktif Soru Havuzu
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mt-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-semibold text-xs">
                    telc B2 Beruf
                  </Badge>
                </div>

                <div className="mb-2">
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                    ÖNE ÇIKAN SİSTEM
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    B2 Sınav Hazırlığı <span className="text-blue-600 dark:text-blue-400">(ALL DOSYASI)</span>
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Kursiyerler ve topluluk arasında <strong>"ALL DOSYASI"</strong> olarak bilinen telc Deutsch-Test für den Beruf B2 sınavına hazırlık sistemi.
                </p>

                <div className="space-y-2.5 mb-6 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Lesen:</strong> 4 Bölüm okuma ve anlama soruları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-blue-600 shrink-0" />
                    <span><strong>Hören:</strong> Orijinal ses kayıtlarıyla dinleme modülü</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PenLine className="w-4 h-4 text-purple-600 shrink-0" />
                    <span><strong>Schreiben:</strong> Şikayet ve bilgi mektubu kalıpları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-orange-600 shrink-0" />
                    <span><strong>Sprechen:</strong> Sunum & karşılıklı konuşma pratikleri</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>Hata Havuzu:</strong> Akıllı aralıklı tekrar (SM-2) algoritması</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/almanca/b2-sinav-hazirlik"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20 active:scale-95"
                >
                  <span>Modüle Git & İncele</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 2. B1 Allgemein - YAKINDA */}
            <div className="relative group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500 text-white shadow-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Yakında Gelecek
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mt-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-semibold text-xs">
                    DTZ & telc B1
                  </Badge>
                </div>

                <div className="mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    GELİŞTİRİLİYOR
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    B1 Allgemein / DTZ
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Vatandaşlık (Einbürgerung), süresiz oturum ve mesleki başlangıçlar için zorunlu olan B1 seviyesi sınav hazırlık modülü hazırlanmaktadır.
                </p>

                <div className="space-y-2.5 mb-6 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>DTZ & telc B1 formatında deneme soruları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>Mektup yazma şablonları (Briefe schreiben)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>Resim tasviri ve konuşma sınavı ipuçları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>En sık çıkan 1.000 B1 kelimesi</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-xs cursor-not-allowed"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Hazırlık Aşamasında</span>
                </button>
              </div>
            </div>

            {/* 3. B2 Allgemein - YAKINDA */}
            <div className="relative group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-800 dark:bg-slate-700 text-white shadow-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Yakında Gelecek
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mt-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                    <Layers className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
                    telc & Goethe B2
                  </Badge>
                </div>

                <div className="mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    GELİŞTİRİLİYOR
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    B2 Allgemein
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Genel akademik denklik, üniversite başvuruları ve meslek odaları yeterlilikleri için genel B2 sınavlarına yönelik çalışma ortamı.
                </p>

                <div className="space-y-2.5 mb-6 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>Sprachbausteine (Gramer & Boşluk Doldurma)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>Akademik ve genel makale okuma parçaları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>Fikir bildirme ve tartışma cümle kalıpları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>Goethe & telc puanlama kriterleri</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-xs cursor-not-allowed"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Hazırlık Aşamasında</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mesleklere Göre Dil Seviyesi Rehberi */}
      <section className="py-12 md:py-16 bg-slate-50/50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Almanya'da Hangi Meslek Hangi Dil Seviyesini İster?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Mesleki denklik ve işe alım süreçlerinde eyaletlere göre küçük farklılıklar olsa da genel kabul görmüş standart seviyeler:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* B1 Seviyesi */}
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">B1 Seviyesi</span>
                  <Badge variant="outline" className="text-[10px]">Temel Yeterlilik</Badge>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Ulaşım, Lojistik & Vatandaşlık
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                  <li><strong>Lojistik & Kargo:</strong> Paket dağıtım, depo yönetimi</li>
                  <li><strong>Ulaşım:</strong> Makinistlik (Lokführer), Otobüs & Taksi şoförlüğü</li>
                  <li><strong>Yasal Süreç:</strong> Süresiz oturum (Niederlassung) ve Alman Vatandaşlığı başvuruları</li>
                  <li><strong>Mesleki Eğitim:</strong> Bazı Umschulung / Ausbildung programları</li>
                </ul>
              </CardContent>
            </Card>

            {/* B2 Seviyesi */}
            <Card className="border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/10">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">B2 Seviyesi</span>
                  <Badge className="bg-blue-600 text-white text-[10px]">En Çok Aranan</Badge>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Sağlık, Mühendislik & Ofis
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                  <li><strong>Sağlık:</strong> Hemşirelik (Pflegefachkraft), Fizyoterapi, Hasta Bakımı</li>
                  <li><strong>Eğitim:</strong> Erzieherin (Çocuk Eğitmeni) / Schulbegleiter</li>
                  <li><strong>Mühendislik & IT:</strong> Almanca mülakatlar, proje sunumları ve müşteri iletişimi</li>
                  <li><strong>İş Kursları:</strong> Jobcenter / Agentur für Arbeit DeuFöV B2 Beruf kursları</li>
                </ul>
              </CardContent>
            </Card>

            {/* C1/C2 Seviyesi */}
            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">C1 / C2 Seviyesi</span>
                  <Badge variant="outline" className="text-[10px]">Akademik & Resmi</Badge>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Öğretmenlik, Tıp & Hukuk
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                  <li><strong>Öğretmenlik:</strong> Tüm branşlar için tam denklik ve atama (C1 konuşma şartı)</li>
                  <li><strong>Tıp:</strong> Tıp doktorluğu denklik sınavı (Fachsprachprüfung - FSP) öncesi genel C1</li>
                  <li><strong>Üniversite:</strong> Alman üniversitelerinde lisans ve yüksek lisans eğitimi</li>
                  <li><strong>Hukuk & Tercümanlık:</strong> Yeminli tercümanlık ve danışmanlık</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Topluluk Destek & Telegram Bölümü */}
      <section className="py-10 md:py-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Almanca Öğrenenler Dayanışma Grupları
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                  Almanya genelinde sınava hazırlanan, tecrübelerini ve kaynaklarını paylaşan meslektaşlarımızla Telegram üzerinden iletişimde kalın.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
              <Link
                href="/telegram-gruplari"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-semibold text-xs transition-all active:scale-95"
              >
                <span>Tüm Telegram Grupları</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/meslekler/almanca-ogretmenligi"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs transition-all active:scale-95"
              >
                <span>Almanca Öğretmenliği</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
