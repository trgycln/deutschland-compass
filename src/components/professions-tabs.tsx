"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Users, GraduationCap, HardHat, HeartPulse, Laptop, Briefcase as LucideBriefcase, Bus } from 'lucide-react';
import { ProfessionCardData } from '@/data/professions-list';

// React Icons Imports
import { 
  FcBriefcase, FcReading, FcCommandLine, FcAutomotive, 
  FcShipped, FcElectronics, FcGraduationCap, FcEngineering, FcBiotech, 
  FcDataSheet, FcMultipleDevices, FcGlobe, FcRules, FcManager, FcBusiness,
  FcDepartment, FcProcess, FcShop, FcSupport, FcSurvey
} from 'react-icons/fc';
import { 
  GiTeacher, GiChemicalTank, GiElectric, GiHealthNormal, GiNurseFemale, 
  GiDoctorFace, GiTestTubes, GiDna2, GiComputing, GiNetworkBars, GiCargoShip
} from 'react-icons/gi';
import { FaUserNurse, FaUserMd, FaBus, FaTruck, FaCode, FaLaptopCode, FaChalkboardTeacher, FaMap, FaTrain } from 'react-icons/fa';
import { MdOutlineScience, MdOutlinePsychology, MdOutlineSecurity } from 'react-icons/md';

const iconMap: Record<string, any> = {
  // Mevcut mapping'leri daha renkli ikonlarla güncelliyoruz
  'Briefcase': FcBriefcase,
  'BookOpen': FcReading,
  'Stethoscope': GiDoctorFace,
  'Code2': FcCommandLine,
  'Map': FaMap,
  'Train': FaTrain,
  'Bus': FaBus,
  'Rocket': FcElectronics,
  'Truck': FcShipped,
  'Zap': GiElectric,
  
  // Yeni semantik mappingler
  'Teacher': FaChalkboardTeacher,
  'Chemistry': GiChemicalTank,
  'Biology': GiDna2,
  'Physics': MdOutlineScience,
  'Math': FcSurvey,
  'Nurse': FaUserNurse,
  'Doctor': FaUserMd,
  'Engineer': FcEngineering,
  'Data': FcDataSheet,
  'IT': FcMultipleDevices,
  'Security': MdOutlineSecurity,
  'Law': FcRules,
  'Business': FcBusiness,
  'Manager': FcManager,
  'Global': FcGlobe,
  'Psychology': MdOutlinePsychology,
  'Support': FcSupport,
  'Shop': FcShop,
  'Process': FcProcess
};

// Kategori ikonları
const categoryIconMap: Record<string, any> = {
  'Eğitim': GraduationCap,
  'Sağlık': HeartPulse,
  'Mühendislik': HardHat,
  'Bilişim': Laptop,
  'Sanayi & İnşaat': HardHat,
  'Ulaşım': Bus,
  'Diğer': LucideBriefcase
};

const badgeColorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
  green: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  slate: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800",
  orange: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
  purple: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
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

  const defaultTab = (continuationProfessions.length === 0 && newPathProfessions.length > 0) ? "new-path" : "continuation";

  // Meslekleri kategorilerine göre gruplayan fonksiyon
  const groupByCategory = (items: ProfessionCardData[]) => {
    return items.reduce((acc, item) => {
      const category = item.category || 'Diğer';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, ProfessionCardData[]>);
  };

  const renderCompactCard = (profession: ProfessionCardData) => {
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
        <Card className={`h-full transition-all duration-200 hover:shadow-md border-slate-200 dark:border-slate-800 ${!isComingSoon ? hoverBorderColorMap[profession.badgeColor] : ''} ${isComingSoon ? 'opacity-75' : ''}`}>
          <CardContent className="p-4 flex items-center gap-4">
            {/* Icon Box */}
            <div className={`p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shrink-0 transition-colors ${!isComingSoon ? hoverIconColorMap[profession.badgeColor] : ''}`}>
              <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-semibold text-slate-900 dark:text-slate-100 truncate transition-colors ${!isComingSoon ? hoverTextColorMap[profession.badgeColor] : ''}`}>
                  {profession.title}
                </h4>
                {isComingSoon && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
                    Yakında
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Badge variant="outline" className={`px-1.5 py-0 h-5 font-normal border ${badgeColorMap[profession.badgeColor]}`}>
                  {profession.demand}
                </Badge>
                <span className="hidden sm:inline-block">•</span>
                <span className="hidden sm:inline-block truncate">{profession.readingTime}</span>
              </div>
            </div>

            {/* Arrow */}
            {!isComingSoon && (
              <ArrowRight className={`w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-1 ${hoverTextColorMap[profession.badgeColor]}`} />
            )}
          </CardContent>
        </Card>
      </CardWrapper>
    );
  };

  const renderGroupedProfessions = (items: ProfessionCardData[]) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-12 text-slate-500">
          Aradığınız kriterlere uygun meslek bulunamadı.
        </div>
      );
    }

    const grouped = groupByCategory(items);
    // Kategorileri alfabetik sırala veya özel bir sıra belirle
    const sortedCategories = Object.keys(grouped).sort();

    return (
      <div className="space-y-10">
        {sortedCategories.map(category => {
          const CategoryIcon = categoryIconMap[category] || LucideBriefcase;
          return (
            <div key={category} className="animate-in fade-in-50 duration-500">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white mb-4 pl-1">
                <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  <CategoryIcon className="w-4 h-4" />
                </div>
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[category].map(renderCompactCard)}
              </div>
            </div>
          );
        })}
      </div>
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

      <TabsContent value="continuation" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Mesleğinize Almanya'da Devam Edin
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Türkiye'deki diplomanız ve tecrübenizle Almanya'da çalışmak için denklik (Anerkennung) süreçleri, dil şartları ve yasal gereklilikler hakkında detaylı rehberler.
          </p>
        </div>
        
        {renderGroupedProfessions(continuationProfessions)}
      </TabsContent>

      <TabsContent value="new-path" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Yeni Bir Başlangıç Yapın
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Almanya'da geçerli yeni bir meslek öğrenmek (Ausbildung/Umschulung), popüler iş kollarına geçiş yapmak veya kendi işinizi kurmak için fırsatlar.
          </p>
        </div>

        {renderGroupedProfessions(newPathProfessions)}
      </TabsContent>
    </Tabs>
  );
}
