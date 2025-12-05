"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, BookOpen, Briefcase as LucideBriefcase } from 'lucide-react';
import { ProfessionCardData } from '@/data/professions-list';

// React Icons Imports
import { 
  FcBriefcase, FcReading, FcCommandLine, FcAutomotive, 
  FcShipped, FcElectronics, FcGraduationCap, FcEngineering, FcBiotech, 
  FcDataSheet, FcMultipleDevices, FcGlobe, FcRules, FcManager, FcBusiness,
  FcDepartment, FcProcess, FcShop, FcSupport, FcSurvey, FcConferenceCall
} from 'react-icons/fc';
import { 
  GiTeacher, GiChemicalTank, GiElectric, GiHealthNormal, GiNurseFemale, 
  GiDoctorFace, GiTestTubes, GiDna2, GiComputing, GiNetworkBars, GiCargoShip
} from 'react-icons/gi';
import { FaUserNurse, FaUserMd, FaBus, FaTruck, FaCode, FaLaptopCode, FaChalkboardTeacher, FaMap, FaTrain, FaBaby, FaSchool, FaTools, FaHistory, FaTaxi, FaLeaf } from 'react-icons/fa';
import { MdOutlineScience, MdOutlinePsychology, MdOutlineSecurity } from 'react-icons/md';

const iconMap: Record<string, any> = {
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
  'Wrench': FaTools,
  'History': FaHistory,
  'Taxi': FaTaxi,
  'Sprout': FaLeaf,
  'GraduationCap': FcGraduationCap,
  'Teacher': FaChalkboardTeacher,
  'Baby': FaBaby,
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
  'Process': FcProcess,
  'School': FaSchool,
  'Users': FcConferenceCall
};

const badgeColorMap: Record<string, string> = {
  blue: "bg-secondary text-primary border-primary/20 dark:bg-primary/20 dark:text-secondary dark:border-secondary/20",
  red: "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
  green: "bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  slate: "bg-secondary text-primary border-primary/20 dark:bg-primary/20 dark:text-secondary dark:border-secondary/20",
  orange: "bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
  purple: "bg-purple-50 text-purple-900 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
};

const hoverBorderColorMap: Record<string, string> = {
  blue: "group-hover:border-primary/50",
  red: "group-hover:border-red-500/50",
  green: "group-hover:border-green-500/50",
  slate: "group-hover:border-primary/50",
  orange: "group-hover:border-orange-500/50",
  purple: "group-hover:border-purple-500/50"
};

const hoverTextColorMap: Record<string, string> = {
  blue: "group-hover:text-primary",
  red: "group-hover:text-red-700",
  green: "group-hover:text-green-700",
  slate: "group-hover:text-primary",
  orange: "group-hover:text-orange-700",
  purple: "group-hover:text-purple-700"
};

export function HomeProfessions({ professions }: { professions: ProfessionCardData[] }) {
  // Filter for High Demand professions (excluding 'coming-soon' if desired, but let's keep them if they are high demand)
  const highDemandProfessions = professions
    .filter(p => p.demand === 'Çok Yüksek Talep' || p.demand === 'Yüksek Talep')
    .sort((a, b) => {
      // Prioritize 'Çok Yüksek Talep'
      if (a.demand === 'Çok Yüksek Talep' && b.demand !== 'Çok Yüksek Talep') return -1;
      if (a.demand !== 'Çok Yüksek Talep' && b.demand === 'Çok Yüksek Talep') return 1;
      return 0;
    })
    .slice(0, 6); // Limit to 6

  // Filter for New Career Paths
  const newPathProfessions = professions
    .filter(p => p.pathType === 'new-path')
    .sort((a, b) => {
      // Prioritize 'Çok Yüksek Talep'
      if (a.demand === 'Çok Yüksek Talep' && b.demand !== 'Çok Yüksek Talep') return -1;
      if (a.demand !== 'Çok Yüksek Talep' && b.demand === 'Çok Yüksek Talep') return 1;
      
      // Then 'Yüksek Talep'
      if (a.demand === 'Yüksek Talep' && b.demand !== 'Yüksek Talep') return -1;
      if (a.demand !== 'Yüksek Talep' && b.demand === 'Yüksek Talep') return 1;
      
      return 0;
    })
    .slice(0, 3); // Limit to 3

  const renderCard = (profession: ProfessionCardData) => {
    const Icon = iconMap[profession.icon] || LucideBriefcase;
    const isComingSoon = profession.status === 'coming-soon';
    
    const CardWrapper = ({ children }: { children: React.ReactNode }) => {
      if (isComingSoon) {
        return <div className="block h-full cursor-not-allowed">{children}</div>;
      }
      return (
        <Link href={profession.customLink || `/meslekler/${profession.slug}`} className="block h-full group">
          {children}
        </Link>
      );
    };

    return (
      <CardWrapper key={profession.id}>
        <Card className={`h-full transition-all duration-300 hover:shadow-xl border-slate-200 dark:border-slate-800 ${!isComingSoon ? hoverBorderColorMap[profession.badgeColor] : ''} ${isComingSoon ? 'opacity-75' : ''}`}>
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <Badge variant="secondary" className={`${badgeColorMap[profession.badgeColor]} border`}>
                {profession.category}
              </Badge>
              {!isComingSoon && (
                <ArrowRight className={`h-5 w-5 text-slate-400 transition-colors ${hoverTextColorMap[profession.badgeColor]}`} />
              )}
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <Icon className="w-8 h-8" />
              </div>
              <CardTitle className={`text-xl transition-colors ${!isComingSoon ? hoverTextColorMap[profession.badgeColor] : ''}`}>
                {profession.title}
              </CardTitle>
            </div>
            <CardDescription className="line-clamp-2">
              {profession.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" /> {profession.demand}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> {profession.readingTime}
              </span>
            </div>
          </CardContent>
        </Card>
      </CardWrapper>
    );
  };

  return (
    <div className="space-y-20">
      {/* Popular Professions Section */}
      <section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">
              <span className="text-primary">
                En Çok Aranan
              </span> Meslekler
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Almanya iş piyasasında en yüksek talebe sahip meslek grupları.
            </p>
          </div>
          <Link href="/meslekler" className="hidden md:flex items-center text-primary font-medium hover:underline">
            Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highDemandProfessions.map(renderCard)}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/meslekler" className="inline-flex items-center text-primary font-medium hover:underline">
            Tüm Meslekleri Gör <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* New Career Paths Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-secondary dark:bg-slate-900/50 rounded-3xl -z-10 transform -skew-y-1" />
        <div className="py-12 px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Yeni Fırsatlar</Badge>
              </div>
              <h2 className="text-3xl font-bold text-primary dark:text-white mb-2">
                Alternatif Kariyer Yolları
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Denklik süreçleriyle uğraşmak istemeyenler veya yeni bir başlangıç arayanlar için Almanya'daki popüler alternatif kariyer seçenekleri.
              </p>
            </div>
            <Link href="/meslekler?tab=new-path" className="flex items-center px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-primary font-medium hover:shadow-md transition-all">
              Tüm Alternatifleri İncele <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {newPathProfessions.map(renderCard)}
          </div>
        </div>
      </section>
    </div>
  );
}
