import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, MessageSquare, Info, Send, ArrowRight, Utensils } from 'lucide-react'; // Users ikonu zaten var
import { HomeSearch } from '@/components/home-search';
import { HomeProfessions } from '@/components/home-professions';
import { professionsList } from '@/data/professions-list';
import { WhatsNewPopup } from '@/components/whats-new-popup';
import { ContributionDialog } from '@/components/contribution-dialog';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <WhatsNewPopup />
      
      {/* Disclaimer Banner - (Aynı Kalıyor) */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-800/50 relative z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-start md:items-center gap-3 justify-center text-sm text-amber-900 dark:text-amber-100">
            <Info className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5 md:mt-0" />
            <p className="max-w-5xl leading-relaxed">
              <span className="font-semibold">Bilgilendirme:</span> Sitemizdeki dökümanlar, Telegram gruplarında paylaşılan ve topluluk yararına hazırlanmış açık kaynak içeriklerdir. Bilgilerin kaybolmaması adına derlenmiştir ve mümkün olduğunca hazırlayanların isimlerine yer verilmiştir. İçerik sahiplerinin talebi durumunda ilgili dökümanlar derhal kaldırılacaktır. Emek veren herkese teşekkür ederiz.
              <br />
              <span className="block mt-3 font-semibold text-blue-700 dark:text-blue-300">
                Web sitemiz ve topluluk gelişmeleri için <a href="https://t.me/+yI1or4k3nMswN2Ni" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">Telegram kanalımıza</a> katılabilirsiniz. Bu kanal, yeni eklenenleri ve önemli duyuruları kaçırmamanız için açıldı. Linkler Telegram gruplarında kaybolabiliyor; bu kanaldan hem siteye hem de gelişmelere kolayca ulaşabilirsiniz.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section - (Aynı Kalıyor) */}
      <section className="relative py-20 md:py-32 bg-secondary dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary dark:text-white">
              Almanya'daki <span className="text-accent">Pusulanız</span>
            </h1>
            <p className="text-xl text-primary/80 dark:text-slate-300 leading-relaxed">
              Binlerce profesyonelin tecrübesiyle harmanlanmış, yaşayan bir rehber. 
              Mesleğinizi seçin, süreci öğrenin, tecrübenizi paylaşın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
              <HomeSearch />
              <Button size="lg" className="h-12 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/meslekler">Rehberi Keşfet</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Telegram Banner - (Aynı Kalıyor) */}
      <section className="border-t border-border bg-background relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3 bg-accent text-primary-foreground rounded-full shrink-0 shadow-sm">
                <Send className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">Yalnız Değilsiniz!</h3>
                <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
                  Anlık sorularınız, yardımlaşma ve tecrübe paylaşımı için <strong>Telegram</strong> gruplarımıza katılın.
                  Binlerce kişilik topluluğumuz sizi bekliyor.
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-accent text-accent-foreground hover:bg-accent hover:text-white w-full md:w-auto font-medium" asChild>
              <Link href="/telegram-gruplari">
                Telegram Grupları <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Helal Mekanlar Banner - (Aynı Kalıyor) */}
      <section className="pb-8 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 rounded-xl p-6 border border-amber-100 dark:border-amber-900/50">
            <div className="flex items-start gap-4">
              <div className="bg-white dark:bg-amber-900/40 p-3 rounded-full shadow-sm border border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge className="bg-amber-600 hover:bg-amber-700 text-white border-none shadow-sm">YENİ</Badge>
                  <h3 className="font-bold text-lg text-amber-950 dark:text-amber-100">Helal Mekanlar & Lezzet Rehberi</h3>
                </div>
                <p className="text-amber-800/80 dark:text-amber-200/70 text-sm md:text-base max-w-2xl mt-1">
                  Almanya ve Avrupa genelinde, topluluğumuzun tecrübeleriyle derlenen 
                  güvenilir restoranlar ve seyahat ipuçları yayında.
                </p>
              </div>
            </div>
            <Button className="w-full md:w-auto bg-amber-600 text-white hover:bg-amber-700 border-none shadow-md" asChild>
              <Link href="/rehber/helal-mekanlar">
                Rehberi İncele <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - GÜNCELLENDİ (4'lü Grid + Aile Birleşimi) */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* YENİ EKLENEN: AİLE BİRLEŞİMİ KARTI */}
            <Link href="/rehber/aile-birlesimi" className="block h-full">
              <Card className="h-full border-none shadow-lg bg-secondary dark:bg-slate-800/50 hover:bg-secondary/80 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary dark:text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>Aile Birleşimi</CardTitle>
                  <CardDescription className="text-base">
                    Ön başvuru, vize randevusu, evrak hazırlığı ve varış süreci için adım adım, eksiksiz yol haritası.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/rehber" className="block h-full">
              <Card className="h-full border-none shadow-lg bg-secondary dark:bg-slate-800/50 hover:bg-secondary/80 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary dark:text-accent mb-4" />
                  <CardTitle>Kapsamlı Rehberler</CardTitle>
                  <CardDescription className="text-base">
                    Denklik, dil eğitimi ve iş bulma süreçleri hakkında detaylı bilgiler.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/telegram-gruplari" className="block h-full">
              <Card className="h-full border-none shadow-lg bg-secondary dark:bg-slate-800/50 hover:bg-secondary/80 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary dark:text-accent mb-4" />
                  <CardTitle>Topluluk Gücü</CardTitle>
                  <CardDescription className="text-base">
                    Sadece teorik bilgi değil, gerçek insanların yaşadığı gerçek tecrübeler. <strong>Şimdi katılın.</strong>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/rehber/egitim-ve-kariyer" className="block h-full">
              <Card className="h-full border-none shadow-lg bg-secondary dark:bg-slate-800/50 hover:bg-secondary/80 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-primary dark:text-accent mb-4" />
                  <CardTitle>Aileler İçin Eğitim</CardTitle>
                  <CardDescription className="text-base">
                    İlkokuldan üniversiteye, çocuklarınızın geleceği için kapsamlı eğitim ve kariyer rehberi.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Professions Section - (Aynı Kalıyor) */}
      <section className="py-20 bg-secondary/30 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <HomeProfessions professions={professionsList} />
        </div>
      </section>

      {/* Contribution Call to Action - (Aynı Kalıyor) */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center justify-center p-3 bg-accent/20 rounded-full mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Aradığınız Mesleği Bulamadınız mı?
            </h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Sistemimizi sürekli geliştiriyoruz. Eğer kendi mesleğinizle ilgili tecrübe, bilgi veya dökümana sahipseniz, 
              bizimle paylaşın. Editör ekibimiz gönderilerinizi incelesin ve yeni rehber sayfaları oluşturarak 
              topluluğa kazandıralım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <ContributionDialog />
            </div>
            <p className="text-sm text-primary-foreground/60 pt-4">
              Yeni gelenlere ve ihtiyacı olanlara birlikte yol gösterelim.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}