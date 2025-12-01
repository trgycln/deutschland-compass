
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, GraduationCap, Map } from 'lucide-react';
import { professionsList } from '@/data/professions-list';
import { careerGuideData } from '@/data/career-guide-data';
import { HomeSearch } from '@/components/home-search';
import { ProfessionsTabs } from '@/components/professions-tabs';

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/i̇/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
};

export default async function ProfessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';
  const normalizedSearch = normalizeText(search);

  const filteredProfessions = professionsList.filter((profession) => {
    if (!search) return true;
    
    const normalizedTitle = normalizeText(profession.title);
    const normalizedDescription = normalizeText(profession.description);
    const normalizedCategory = normalizeText(profession.category);
    const normalizedKeywords = profession.keywords ? profession.keywords.map(k => normalizeText(k)) : [];

    return (
      normalizedTitle.includes(normalizedSearch) ||
      normalizedDescription.includes(normalizedSearch) ||
      normalizedCategory.includes(normalizedSearch) ||
      normalizedKeywords.some(k => k.includes(normalizedSearch))
    );
  });

  const guides = [
    {
      id: 'career-guide',
      title: careerGuideData.title,
      description: careerGuideData.description,
      href: '/rehber/kariyer-yolu',
      icon: Map,
      color: 'blue',
      tags: ['Anerkennung', 'Ausbildung', 'Jobcenter'],
      keywords: ['ausbildung', 'weiterbildung', 'anerkennung', 'kariyer', 'rehber', 'meslek']
    },
    {
      id: 'anerkennung-guide',
      title: "Denklik (Anerkennung)",
      description: "Diplomalarınızın Almanya'da tanınması için izlemeniz gereken adımlar, ZAB süreci ve gerekli belgeler.",
      href: '/rehber/anerkennung',
      icon: GraduationCap,
      color: 'purple',
      tags: ['ZAB', 'Diploma', 'Süreç'],
      keywords: ['anerkennung', 'denklik', 'zab', 'diploma', 'üniversite', 'rehber']
    }
  ];

  const filteredGuides = guides.filter(guide => {
    if (!search) return false;
    
    const normalizedTitle = normalizeText(guide.title);
    const normalizedDescription = normalizeText(guide.description);
    const normalizedKeywords = guide.keywords.map(k => normalizeText(k));

    return (
      normalizedTitle.includes(normalizedSearch) ||
      normalizedDescription.includes(normalizedSearch) ||
      normalizedKeywords.some(k => k.includes(normalizedSearch) || normalizedSearch.includes(k))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Meslek Rehberleri
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Almanya'da kariyer yolculuğunuzda size rehberlik edecek detaylı meslek analizleri.
          </p>
          
          <div className="relative max-w-md mx-auto flex">
            <HomeSearch />
          </div>
        </div>

        {filteredGuides.length > 0 && (
          <div className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Rehber Sonuçları
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {filteredGuides.map((guide) => {
                const Icon = guide.icon;
                const isPurple = guide.color === 'purple';
                const bgColor = isPurple ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-blue-100 dark:bg-blue-900/30';
                const textColor = isPurple ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400';
                const hoverBorder = isPurple ? 'group-hover:border-purple-500/50' : 'group-hover:border-blue-500/50';
                const hoverText = isPurple ? 'group-hover:text-purple-600' : 'group-hover:text-blue-600';
                const hoverIcon = isPurple ? 'group-hover:text-purple-500' : 'group-hover:text-blue-500';

                return (
                  <Link key={guide.id} href={guide.href} className="group">
                    <Card className={`h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 ${hoverBorder}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-lg ${bgColor} ${textColor}`}>
                            <Icon className="w-8 h-8" />
                          </div>
                          <ArrowRight className={`h-6 w-6 text-slate-400 ${hoverIcon} transition-colors`} />
                        </div>
                        <CardTitle className={`text-2xl ${hoverText} transition-colors`}>
                          {guide.title}
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {guide.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <ProfessionsTabs professions={filteredProfessions} />
      </div>
    </div>
  );
}
