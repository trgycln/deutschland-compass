"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Search,
  FileCheck,
  GraduationCap,
  Heart,
  Building2,
  Code,
  Truck,
  Baby,
  Briefcase,
  ChevronRight
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
      { title: 'Vergi Beyanı', href: '/rehber/vergi-beyani', isNew: true },
      { title: 'Denklik', href: '/rehber/anerkennung' },
    ]
  },
  {
    title: 'Öğretmenlik',
    icon: GraduationCap,
    color: 'text-purple-600',
    guides: [
      { title: 'Sınıf Öğretmenliği', href: '/rehber/sinif-ogretmenligi' },
      { title: 'İngilizce', href: '/rehber/ingilizce-ogretmenligi' },
      { title: 'Matematik', href: '/rehber/matematik-ogretmenligi' },
      { title: 'Almanca', href: '/rehber/almanca-ogretmenligi' },
      { title: 'Okul Öncesi', href: '/rehber/okul-oncesi-ogretmenligi' },
      { title: 'Özel Eğitim', href: '/rehber/ozel-egitim-ogretmenligi' },
      { title: 'Fizik', href: '/rehber/fizik-ogretmenligi' },
      { title: 'Kimya', href: '/rehber/kimya-ogretmenligi' },
      { title: 'Biyoloji', href: '/rehber/biyoloji-ogretmenligi' },
      { title: 'Coğrafya', href: '/rehber/cografya-ogretmenligi' },
      { title: 'Tarih', href: '/rehber/tarih-ogretmenligi' },
      { title: 'Sosyal Bilgiler', href: '/rehber/sosyal-bilgiler-ogretmenligi' },
      { title: 'Beden Eğitimi', href: '/rehber/beden-egitimi-ogretmenligi' },
      { title: 'Görsel Sanatlar', href: '/rehber/gorsel-sanatlar-ogretmenligi' },
      { title: 'Müzik', href: '/rehber/muzik-ogretmenligi' },
      { title: 'Din Kültürü', href: '/rehber/din-kulturu-ogretmenligi' },
      { title: 'Türkçe', href: '/rehber/turkce-ogretmenligi' },
      { title: 'Kürtçe', href: '/rehber/kurtce-ogretmenligi' },
      { title: 'Teknik', href: '/rehber/teknik-ogretmenler' },
    ]
  },
  {
    title: 'Sağlık',
    icon: Heart,
    color: 'text-red-600',
    guides: [
      { title: 'Hemşirelik', href: '/rehber/hasta-yasli-bakimi' },
      { title: 'Veterinerlik', href: '/rehber/veteriner-hekimligi' },
      { title: 'Fizyoterapist', href: '/rehber/fizyoterapist' },
    ]
  },
  {
    title: 'Mühendislik',
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
    title: 'Bilişim',
    icon: Code,
    color: 'text-indigo-600',
    guides: [
      { title: 'Yazılım', href: '/rehber/yazilim' },
      { title: 'DevOps', href: '/rehber/devops' },
      { title: 'Siber Güvenlik', href: '/rehber/siber-guvenlik' },
      { title: 'Veri Bilimi', href: '/rehber/veri-bilimi' },
      { title: 'SAP', href: '/rehber/sap' },
      { title: 'CBS', href: '/rehber/cbs' },
      { title: 'Donanım', href: '/rehber/donanim' },
    ]
  },
  {
    title: 'Ulaşım',
    icon: Truck,
    color: 'text-green-600',
    guides: [
      { title: 'Taksi Fahrer', href: '/rehber/taxi-fahrer' },
      { title: 'LKW Fahrer', href: '/rehber/lkw-fahrer' },
      { title: 'Otobüs Şoförü', href: '/rehber/otobus-soforu' },
      { title: 'Lokführer', href: '/rehber/lokfuhrer' },
      { title: 'Lojistik', href: '/rehber/lojistik' },
    ]
  },
  {
    title: 'Çocuk Bakımı',
    icon: Baby,
    color: 'text-pink-600',
    guides: [
      { title: 'Tagesmutter', href: '/rehber/tagesmutter' },
      { title: 'Erzieherin', href: '/rehber/erzieherin' },
      { title: 'OGS', href: '/rehber/ogs-calisanlari' },
      { title: 'Schulbegleiter', href: '/rehber/schulbegleiter' },
    ]
  },
  {
    title: 'Diğer',
    icon: Briefcase,
    color: 'text-slate-600',
    guides: [
      { title: 'Gurbet Kalemleri', href: '/gurbet-kalemleri', isNew: true },
      { title: 'Sosyal Çalışmacı', href: '/rehber/sozialarbeiter' },
      { title: 'Seelsorge', href: '/rehber/seelsorge' },
      { title: 'SHK', href: '/rehber/sihhi-tesisat' },
      { title: 'Elektrikçi', href: '/rehber/elektrikci' },
      { title: 'Muhasebe', href: '/rehber/muhasebe' },
      { title: 'Şirket Kurma', href: '/rehber/sirket-kurma' },
      { title: 'Helal Mekanlar', href: '/rehber/helal-mekanlar', isPopular: true },
      { title: 'Yemek Rehberi', href: '/rehber/yemek-rehberi' },
      { title: 'MYO Mezunları', href: '/rehber/myo-mezunlari' },
    ]
  },
];

export function GuidesSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Resmi İşlemler']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredCategories = searchQuery
    ? guideCategories.map(cat => ({
        ...cat,
        guides: cat.guides.filter(guide =>
          guide.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.guides.length > 0)
    : guideCategories;

  const allGuides = guideCategories.flatMap(cat => cat.guides);

  return (
    <Card className="sticky top-20 h-[calc(100vh-6rem)] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="w-5 h-5" />
          Tüm Rehberler
        </CardTitle>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Rehber ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="space-y-4">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              const isExpanded = expandedCategories.includes(category.title);
              
              return (
                <div key={category.title}>
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="flex items-center gap-2 w-full py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    <Icon className={`w-4 h-4 ${category.color}`} />
                    <span className="font-semibold text-xs uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      {category.title}
                    </span>
                    <span className="ml-auto text-xs text-slate-400">
                      {category.guides.length}
                    </span>
                  </button>
                  
                  {isExpanded && (
                    <div className="space-y-0.5 ml-6 mt-1">
                      {category.guides.map((guide) => (
                        <Link
                          key={guide.href}
                          href={guide.href}
                          className="block py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 truncate">
                              {guide.title}
                            </span>
                            <div className="flex gap-1 flex-shrink-0">
                              {guide.isNew && (
                                <Badge variant="default" className="bg-green-500 text-white text-[10px] px-1.5 py-0 h-4">
                                  YENİ
                                </Badge>
                              )}
                              {guide.isPopular && (
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                                  ★
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                "{searchQuery}" için sonuç bulunamadı
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <div className="border-t px-6 py-3 bg-slate-50 dark:bg-slate-900">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          Toplam {allGuides.length} rehber
        </p>
      </div>
    </Card>
  );
}
