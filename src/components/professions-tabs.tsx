"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Users, BookOpen, Briefcase, Stethoscope, Code2, Map, Train, Bus, Rocket, Truck, Zap } from 'lucide-react';
import { ProfessionCardData } from '@/data/professions-list';

const iconMap = {
  Briefcase,
  BookOpen,
  Stethoscope,
  Code2,
  Map,
  Train,
  Bus,
  Rocket,
  Truck,
  Zap
};

const badgeColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  slate: "bg-slate-100 text-slate-600 hover:bg-slate-200",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
};

const hoverBorderColorMap: Record<string, string> = {
  blue: "group-hover:border-blue-500/50",
  red: "group-hover:border-red-500/50",
  green: "group-hover:border-green-500/50",
  slate: "",
  orange: "group-hover:border-orange-500/50",
  purple: "group-hover:border-purple-500/50"
};

const hoverTextColorMap: Record<string, string> = {
  blue: "group-hover:text-blue-600",
  red: "group-hover:text-red-600",
  green: "group-hover:text-green-600",
  slate: "",
  orange: "group-hover:text-orange-600",
  purple: "group-hover:text-purple-600"
};

const hoverIconColorMap: Record<string, string> = {
  blue: "group-hover:text-blue-500",
  red: "group-hover:text-red-500",
  green: "group-hover:text-green-500",
  slate: "",
  orange: "group-hover:text-orange-500",
  purple: "group-hover:text-purple-500"
};

export function ProfessionsTabs({ professions }: { professions: ProfessionCardData[] }) {
  const continuationProfessions = professions.filter(p => p.pathType === 'continuation');
  const newPathProfessions = professions.filter(p => p.pathType === 'new-path');

  // Eğer "Kendi Mesleğim" sekmesinde sonuç yoksa ama "Yeni Bir Kariyer" sekmesinde varsa,
  // varsayılan olarak "Yeni Bir Kariyer" sekmesini aç.
  const defaultTab = (continuationProfessions.length === 0 && newPathProfessions.length > 0) ? "new-path" : "continuation";

  const renderProfessionCard = (profession: ProfessionCardData) => {
    const Icon = iconMap[profession.icon];
    const isComingSoon = profession.status === 'coming-soon';
    
    const CardWrapper = ({ children }: { children: React.ReactNode }) => {
      if (isComingSoon) {
        return <div className="block h-full">{children}</div>;
      }
      return (
        <Link href={profession.customLink || `/meslekler/${profession.slug}`} className="block h-full group">
          {children}
        </Link>
      );
    };

    return (
      <CardWrapper key={profession.id}>
        <Card className={`h-full transition-all duration-300 hover:shadow-lg border-slate-200 dark:border-slate-800 ${!isComingSoon ? hoverBorderColorMap[profession.badgeColor] : ''} ${isComingSoon ? 'opacity-75' : ''}`}>
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors ${!isComingSoon ? hoverIconColorMap[profession.badgeColor] : ''}`}>
                <Icon className="w-6 h-6" />
              </div>
              <Badge variant="secondary" className={badgeColorMap[profession.badgeColor]}>
                {profession.demand}
              </Badge>
            </div>
            <CardTitle className={`text-xl mb-2 transition-colors ${!isComingSoon ? hoverTextColorMap[profession.badgeColor] : ''}`}>
              {profession.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {profession.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mt-auto">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{profession.readingTime}</span>
              </div>
              {!isComingSoon ? (
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${hoverTextColorMap[profession.badgeColor]}`} />
              ) : (
                <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Yakında</span>
              )}
            </div>
          </CardContent>
        </Card>
      </CardWrapper>
    );
  };

  return (
    <Tabs defaultValue={defaultTab} key={defaultTab} className="w-full">
      <div className="flex justify-center mb-12">
        <TabsList className="grid w-full max-w-lg grid-cols-2 h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <TabsTrigger 
            value="continuation" 
            className="py-3 text-sm md:text-base rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-blue-400"
          >
            Kendi Mesleğim <span className="ml-2 text-xs bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400">{continuationProfessions.length}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="new-path" 
            className="py-3 text-sm md:text-base rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-purple-400"
          >
            Yeni Bir Kariyer <span className="ml-2 text-xs bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400">{newPathProfessions.length}</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="continuation" className="space-y-8 animate-in fade-in-50 duration-500 slide-in-from-bottom-2">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Mesleğinize Almanya'da Devam Edin
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Türkiye'deki diplomanız ve tecrübenizle Almanya'da çalışmak için denklik (Anerkennung) süreçleri, dil şartları ve yasal gereklilikler hakkında detaylı rehberler.
          </p>
        </div>
        
        {continuationProfessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {continuationProfessions.map(renderProfessionCard)}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            Aradığınız kriterlere uygun meslek bulunamadı.
          </div>
        )}
      </TabsContent>

      <TabsContent value="new-path" className="space-y-8 animate-in fade-in-50 duration-500 slide-in-from-bottom-2">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Yeni Bir Başlangıç Yapın
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Almanya'da geçerli yeni bir meslek öğrenmek (Ausbildung/Umschulung), popüler iş kollarına geçiş yapmak veya kendi işinizi kurmak için fırsatlar.
          </p>
        </div>

        {newPathProfessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newPathProfessions.map(renderProfessionCard)}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            Aradığınız kriterlere uygun meslek bulunamadı.
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
