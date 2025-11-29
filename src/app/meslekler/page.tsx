
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, BookOpen, Briefcase, Stethoscope, Code2, Map, GraduationCap } from 'lucide-react';
import { professionsList } from '@/data/professions-list';
import { careerGuideData } from '@/data/career-guide-data';
import { HomeSearch } from '@/components/home-search';

const iconMap = {
  Briefcase,
  BookOpen,
  Stethoscope,
  Code2,
  Map
};

const badgeColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  slate: "bg-slate-100 text-slate-600 hover:bg-slate-200"
};

const hoverBorderColorMap: Record<string, string> = {
  blue: "group-hover:border-blue-500/50",
  red: "group-hover:border-red-500/50",
  green: "group-hover:border-green-500/50",
  slate: ""
};

const hoverTextColorMap: Record<string, string> = {
  blue: "group-hover:text-blue-600",
  red: "group-hover:text-red-600",
  green: "group-hover:text-green-600",
  slate: ""
};

const hoverIconColorMap: Record<string, string> = {
  blue: "group-hover:text-blue-500",
  red: "group-hover:text-red-500",
  green: "group-hover:text-green-500",
  slate: ""
};

export default async function ProfessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search.toLowerCase() : '';

  const filteredProfessions = professionsList.filter((profession) => {
    if (!search) return true;
    return (
      profession.title.toLowerCase().includes(search) ||
      profession.description.toLowerCase().includes(search) ||
      profession.category.toLowerCase().includes(search)
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
    return (
      guide.title.toLowerCase().includes(search) ||
      guide.description.toLowerCase().includes(search) ||
      guide.keywords.some(k => search.includes(k) || k.includes(search))
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessions.length > 0 ? (
            filteredProfessions.map((profession) => {
              const Icon = iconMap[profession.icon];
              const isComingSoon = profession.status === 'coming-soon';

              if (isComingSoon) {
                return (
                  <Card key={profession.id} className="h-full opacity-75 hover:opacity-100 transition-opacity border-dashed">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{profession.category}</Badge>
                        <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200">Yakında</Badge>
                      </div>
                      <CardTitle className="text-xl flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Icon className="w-5 h-5" />
                        {profession.title}
                      </CardTitle>
                      <CardDescription>
                        {profession.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              }

              return (
                <Link key={profession.id} href={`/meslekler/${profession.slug}`} className="group">
                  <Card className={`h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 ${hoverBorderColorMap[profession.badgeColor]}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className={badgeColorMap[profession.badgeColor]}>
                          {profession.category}
                        </Badge>
                        <ArrowRight className={`h-5 w-5 text-slate-400 transition-colors ${hoverIconColorMap[profession.badgeColor]}`} />
                      </div>
                      <CardTitle className={`text-xl transition-colors flex items-center gap-2 ${hoverTextColorMap[profession.badgeColor]}`}>
                        <Icon className="w-5 h-5" />
                        {profession.title}
                      </CardTitle>
                      <CardDescription>
                        {profession.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 text-sm text-slate-500">
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {profession.demand}</span>
                        <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1" /> {profession.readingTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500">
              Aradığınız kriterlere uygun meslek bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
