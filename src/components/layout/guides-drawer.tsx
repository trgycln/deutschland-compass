"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Search,
  Users,
  Euro,
  FileCheck,
  GraduationCap,
  Heart,
  Building2,
  Code,
  Truck,
  Baby,
  Briefcase,
  Utensils,
  Home,
  Wrench
} from 'lucide-react';

interface GuideItem {
  title: string;
  href: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface GuideCategory {
  title: string;
  icon: any;
  color: string;
  guides: GuideItem[];
}

const guideCategories: GuideCategory[] = [
  {
    title: 'Resmi İşlemler',
    icon: FileCheck,
    color: 'text-blue-600',
    guides: [
      { title: 'Aile Birleşimi', href: '/rehber/aile-birlesimi', isPopular: true },
      { title: 'Vergi Beyanı (Steuererklärung)', href: '/rehber/vergi-beyani', isNew: true },
      { title: 'Denklik (Anerkennung)', href: '/rehber/anerkennung' },
    ]
  },
  {
    title: 'Öğretmenlik',
    icon: GraduationCap,
    color: 'text-purple-600',
    guides: [
      { title: 'Sınıf Öğretmenliği', href: '/rehber/sinif-ogretmenligi' },
      { title: 'İngilizce Öğretmenliği', href: '/rehber/ingilizce-ogretmenligi' },
      { title: 'Matematik Öğretmenliği', href: '/rehber/matematik-ogretmenligi' },
      { title: 'Almanca Öğretmenliği', href: '/rehber/almanca-ogretmenligi' },
      { title: 'Okul Öncesi Öğretmenliği', href: '/rehber/okul-oncesi-ogretmenligi' },
      { title: 'Özel Eğitim Öğretmenliği', href: '/rehber/ozel-egitim-ogretmenligi' },
      { title: 'Fizik Öğretmenliği', href: '/rehber/fizik-ogretmenligi' },
      { title: 'Kimya Öğretmenliği', href: '/rehber/kimya-ogretmenligi' },
      { title: 'Biyoloji Öğretmenliği', href: '/rehber/biyoloji-ogretmenligi' },
      { title: 'Coğrafya Öğretmenliği', href: '/rehber/cografya-ogretmenligi' },
      { title: 'Tarih Öğretmenliği', href: '/rehber/tarih-ogretmenligi' },
      { title: 'Sosyal Bilgiler Öğretmenliği', href: '/rehber/sosyal-bilgiler-ogretmenligi' },
      { title: 'Beden Eğitimi Öğretmenliği', href: '/rehber/beden-egitimi-ogretmenligi' },
      { title: 'Görsel Sanatlar Öğretmenliği', href: '/rehber/gorsel-sanatlar-ogretmenligi' },
      { title: 'Müzik Öğretmenliği', href: '/rehber/muzik-ogretmenligi' },
      { title: 'Din Kültürü Öğretmenliği', href: '/rehber/din-kulturu-ogretmenligi' },
      { title: 'Türkçe Öğretmenliği', href: '/rehber/turkce-ogretmenligi' },
      { title: 'Kürtçe Öğretmenliği', href: '/rehber/kurtce-ogretmenligi' },
      { title: 'Teknik Öğretmenlik', href: '/rehber/teknik-ogretmenler' },
    ]
  },
  {
    title: 'Sağlık',
    icon: Heart,
    color: 'text-red-600',
    guides: [
      { title: 'Hemşirelik & Hasta Bakımı', href: '/rehber/hasta-yasli-bakimi' },
      { title: 'Veteriner Hekimliği', href: '/rehber/veteriner-hekimligi' },
      { title: 'Fizyoterapist', href: '/rehber/fizyoterapist' },
    ]
  },
  {
    title: 'Mühendislik & Mimarlık',
    icon: Building2,
    color: 'text-orange-600',
    guides: [
      { title: 'Mühendis & Mimar', href: '/rehber/muhendis-mimar' },
      { title: 'İnşaat Mühendisi', href: '/rehber/insaat-muhendisi' },
      { title: 'Gıda Mühendisi', href: '/rehber/gida-muhendisi' },
      { title: 'Ziraat Mühendisi', href: '/rehber/ziraat-muhendisligi' },
      { title: 'Çevre Mühendisi', href: '/rehber/cevre-muhendisi' },
    ]
  },
  {
    title: 'Bilişim & Teknoloji',
    icon: Code,
    color: 'text-indigo-600',
    guides: [
      { title: 'Yazılım Geliştirici', href: '/rehber/yazilim' },
      { title: 'DevOps & Bulut', href: '/rehber/devops' },
      { title: 'Siber Güvenlik', href: '/rehber/siber-guvenlik' },
      { title: 'Veri Bilimi & AI', href: '/rehber/veri-bilimi' },
      { title: 'SAP Danışmanı', href: '/rehber/sap' },
      { title: 'Coğrafi Bilgi Sistemleri', href: '/rehber/cbs' },
      { title: 'Donanım & Sistem', href: '/rehber/donanim' },
    ]
  },
  {
    title: 'Ulaşım & Lojistik',
    icon: Truck,
    color: 'text-green-600',
    guides: [
      { title: 'Taksi Fahrer', href: '/rehber/taxi-fahrer' },
      { title: 'LKW Fahrer', href: '/rehber/lkw-fahrer' },
      { title: 'Otobüs Şoförü', href: '/rehber/otobus-soforu' },
      { title: 'Lokführer (Makinist)', href: '/rehber/lokfuhrer' },
      { title: 'Lojistik Rehberi', href: '/rehber/lojistik' },
    ]
  },
  {
    title: 'Çocuk Bakımı & Eğitim',
    icon: Baby,
    color: 'text-pink-600',
    guides: [
      { title: 'Tagesmutter/Tagesvater', href: '/rehber/tagesmutter' },
      { title: 'Erzieherin (Çocuk Eğitmeni)', href: '/rehber/erzieherin' },
      { title: 'OGS Çalışanları', href: '/rehber/ogs-calisanlari' },
      { title: 'Schulbegleiter', href: '/rehber/schulbegleiter' },
    ]
  },
  {
    title: 'Diğer Meslekler & Hizmetler',
    icon: Briefcase,
    color: 'text-slate-600',
    guides: [
      { title: 'Sosyal Çalışmacı (Sozialarbeiter)', href: '/rehber/sozialarbeiter' },
      { title: 'Manevi Rehberlik (Seelsorge)', href: '/rehber/seelsorge' },
      { title: 'Sıhhi Tesisat (SHK)', href: '/rehber/sihhi-tesisat' },
      { title: 'Elektrikçi', href: '/rehber/elektrikci' },
      { title: 'Muhasebe & Mali Müşavirlik', href: '/rehber/muhasebe' },
    ]
  },
  {
    title: 'Genel Rehberler',
    icon: BookOpen,
    color: 'text-teal-600',
    guides: [
      { title: 'Eğitim ve Kariyer Rehberi', href: '/rehber/egitim-ve-kariyer' },
      { title: 'Şirket Kurma Rehberi', href: '/rehber/sirket-kurma' },
      { title: 'Helal Mekanlar', href: '/rehber/helal-mekanlar', isPopular: true },
      { title: 'Yemek Rehberi', href: '/rehber/yemek-rehberi' },
      { title: 'MYO Mezunları', href: '/rehber/myo-mezunlari' },
    ]
  },
];

export function GuidesDrawer() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all guides for search
  const allGuides = guideCategories.flatMap(cat => 
    cat.guides.map(guide => ({ ...guide, category: cat.title }))
  );

  // Filter guides based on search
  const filteredCategories = searchQuery
    ? guideCategories.map(cat => ({
        ...cat,
        guides: cat.guides.filter(guide =>
          guide.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.guides.length > 0)
    : guideCategories;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Rehberler</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="w-5 h-5" />
            Tüm Rehber Sayfaları
          </SheetTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rehber ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6 pb-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-1 ml-7">
                    {category.guides.map((guide) => (
                      <Link
                        key={guide.href}
                        href={guide.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                            {guide.title}
                          </span>
                          <div className="flex gap-1">
                            {guide.isNew && (
                              <Badge variant="default" className="bg-green-500 text-white text-xs px-1.5 py-0">
                                YENİ
                              </Badge>
                            )}
                            {guide.isPopular && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                Popüler
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">
                "{searchQuery}" için sonuç bulunamadı
              </p>
            </div>
          )}
        </ScrollArea>

        <div className="border-t p-4 bg-slate-50 dark:bg-slate-900">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Toplam {allGuides.length} rehber sayfası
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
