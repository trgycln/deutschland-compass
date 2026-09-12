"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Code, FileCheck, Truck, Briefcase, ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "ogretmenlik",
    title: "Ögretmenlik",
    icon: GraduationCap,
    color: "purple",
    description: "Almanya'da ögretmenlik denklik ve süreçleri.",
    links: [
      { text: "Matematik", href: "/meslekler/matematik-ogretmenligi" },
      { text: "Ingilizce", href: "/meslekler/ingilizce-ogretmenligi" },
      { text: "Sinif", href: "/meslekler/sinif-ogretmenligi" },
      { text: "Özel Egitim", href: "/meslekler/ozel-egitim-ogretmenligi" },
      { text: "Tümü", href: "/meslekler", isMain: true }
    ]
  },
  {
    id: "saglik",
    title: "Saglik & Bakim",
    icon: Heart,
    color: "red",
    description: "Saglik personeli ve bakim sektörü için rehberler.",
    links: [
      { text: "Hemsirelik", href: "/meslekler/hemsire", badge: "Popüler" },
      { text: "Fizyoterapi", href: "/meslekler/fizyoterapist" },
      { text: "Hasta Bakimi", href: "/rehber/hasta-yasli-bakimi" },
      { text: "Erzieherin", href: "/rehber/erzieherin" },
      { text: "Veterinerlik", href: "/rehber/veteriner-hekimligi" }
    ]
  },
  {
    id: "it-muhendislik",
    title: "IT & Mühendislik",
    icon: Code,
    color: "indigo",
    description: "Yazilim, teknoloji ve mühendislik kariyerleri.",
    links: [
      { text: "Yazilim Gelistirici", href: "/meslekler/yazilim-gelistirici" },
      { text: "Bilisim / IT", href: "/meslekler/bilisim-it" },
      { text: "Insaat Müh.", href: "/meslekler/insaat-muhendisligi" },
      { text: "Gida Müh.", href: "/meslekler/gida-muhendisligi" },
      { text: "Elektrik", href: "/rehber/elektrikci" }
    ]
  },
  {
    id: "resmi-islemler",
    title: "Resmi Islemler",
    icon: FileCheck,
    color: "blue",
    description: "Vize, bürokrasi ve yasal süreçler için rehberler.",
    links: [
      { text: "Aile Birlesimi", href: "/rehber/aile-birlesimi", badge: "Kritik" },
      { text: "Denklik (Anerkennung)", href: "/rehber/anerkennung" },
      { text: "Vergi Beyani", href: "/rehber/vergi-beyani" },
      { text: "Sirket Kurma", href: "/rehber/sirket-kurma" }
    ]
  },
  {
    id: "ulasim-lojistik",
    title: "Ulasim & Lojistik",
    icon: Truck,
    color: "orange",
    description: "Soförlük ve ulastirma alanindaki kariyerler.",
    links: [
      { text: "LKW Soförlügü", href: "/meslekler/lkw-soforlugu" },
      { text: "Otobüs Soförlügü", href: "/rehber/otobus-soforlugu" },
      { text: "Makinistlik (Lokführer)", href: "/meslekler/lokfuhrer" },
      { text: "Kargo & Posta", href: "/rehber/kargo-posta-dagitim" }
    ]
  },
  {
    id: "kariyer-yasam",
    title: "Kariyer & Yasam",
    icon: Briefcase,
    color: "emerald",
    description: "Is bulma, egitim ve günlük yasam rehberleri.",
    links: [
      { text: "AI ile Yeni Kariyerler", href: "/rehber/yapay-zeka-kariyerleri", badge: "Yeni" },
      { text: "Kariyer Yolu", href: "/rehber/kariyer-yolu" },
      { text: "Egitim & Kariyer (Aileler)", href: "/rehber/egitim-ve-kariyer" },
      { text: "Tagesmutter", href: "/rehber/tagesmutter" }
    ]
  }
];

const colorStyles = {
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconText: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-900/50",
    hoverBorder: "hover:border-purple-400 dark:hover:border-purple-600"
  },
  red: {
    bg: "bg-red-50 dark:bg-red-950/30",
    iconBg: "bg-red-100 dark:bg-red-900/50",
    iconText: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-900/50",
    hoverBorder: "hover:border-red-400 dark:hover:border-red-600"
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
    iconText: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-200 dark:border-indigo-900/50",
    hoverBorder: "hover:border-indigo-400 dark:hover:border-indigo-600"
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconText: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-900/50",
    hoverBorder: "hover:border-blue-400 dark:hover:border-blue-600"
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    iconBg: "bg-orange-100 dark:bg-orange-900/50",
    iconText: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-900/50",
    hoverBorder: "hover:border-orange-400 dark:hover:border-orange-600"
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconText: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-900/50",
    hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-600"
  }
};

export function HomeCategoryNav() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Kesfetmeye Basla
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Ihtiyacin olan bilgiye hizlica ulas. Meslek rehberlerinden resmi islemlere kadar tüm detaylar burada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const styles = colorStyles[category.color as keyof typeof colorStyles];

            return (
              <Card 
                key={category.id} 
                className={`flex flex-col border-2 transition-all duration-300 shadow-sm hover:shadow-md ${styles.border} ${styles.hoverBorder} bg-white dark:bg-slate-900 overflow-hidden`}
              >
                <div className={`${styles.bg} p-5 border-b ${styles.border} flex items-start gap-4`}>
                  <div className={`p-3 rounded-xl ${styles.iconBg} ${styles.iconText} shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-5 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1 mb-4">
                    {category.links.map((link: any, idx) => (
                      <li key={idx}>
                        <Link 
                          href={link.href}
                          className={`group flex items-center text-sm ${
                            link.isMain 
                              ? "text-primary dark:text-amber-400 font-semibold mt-2 pt-2 border-t border-slate-100 dark:border-slate-800" 
                              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                          } transition-colors`}
                        >
                          <span className="flex-1">{link.text}</span>
                          
                          {link.badge && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 mr-2">
                              {link.badge}
                            </Badge>
                          )}
                          
                          {link.isMain && (
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
