"use client";
import { Send } from 'lucide-react';

import { useState } from 'react';
import { telegramGroups } from '@/data/telegram-groups';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink, MessageCircle, GraduationCap, Users, Home, Briefcase, Truck, Heart, Wrench, BookOpen, Globe, Calculator, PenTool, Music, Camera, Stethoscope, Leaf, Gavel, Utensils, Car } from 'lucide-react';
import Link from 'next/link';

// Helper function to get icon based on group name/id
const getGroupIcon = (name: string, id: string) => {
  const lowerName = name.toLowerCase();
  const lowerId = id.toLowerCase();

  if (lowerName.includes('öğretmen') || lowerName.includes('eğitim') || lowerName.includes('okul') || lowerName.includes('abitur') || lowerName.includes('studium')) return <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
  if (lowerName.includes('aile') || lowerName.includes('ev hanım') || lowerName.includes('ebeveyn') || lowerName.includes('çocuk')) return <Users className="w-5 h-5 text-green-600 dark:text-green-400" />;
  if (lowerName.includes('ev arama') || lowerName.includes('mekan') || lowerName.includes('komşu')) return <Home className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
  if (lowerName.includes('iş') || lowerName.includes('kariyer') || lowerName.includes('bewerbung') || lowerName.includes('muhasebe') || lowerName.includes('maliye')) return <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
  if (lowerName.includes('mühendis') || lowerName.includes('teknik') || lowerName.includes('tamir') || lowerName.includes('tesisat') || lowerName.includes('elektrik')) return <Wrench className="w-5 h-5 text-slate-600 dark:text-slate-400" />;
  if (lowerName.includes('sağlık') || lowerName.includes('hemşire') || lowerName.includes('doktor') || lowerName.includes('diyetisyen') || lowerName.includes('fizyoterapi') || lowerName.includes('pfleger') || lowerName.includes('veteriner')) return <Stethoscope className="w-5 h-5 text-red-600 dark:text-red-400" />;
  if (lowerName.includes('şoför') || lowerName.includes('fahrer') || lowerName.includes('yol') || lowerName.includes('dağıtım') || lowerName.includes('lkw')) return <Truck className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
  if (lowerName.includes('kitap') || lowerName.includes('şiir') || lowerName.includes('yazı')) return <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
  if (lowerName.includes('dil') || lowerName.includes('türkçe') || lowerName.includes('kürtçe') || lowerName.includes('ingilizce') || lowerName.includes('almanca')) return <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
  if (lowerName.includes('sanat') || lowerName.includes('resim') || lowerName.includes('müzik')) return <Music className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
  if (lowerName.includes('youtube') || lowerName.includes('instagram') || lowerName.includes('medya')) return <Camera className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
  if (lowerName.includes('tarım') || lowerName.includes('ziraat') || lowerName.includes('arı') || lowerName.includes('çevre') || lowerName.includes('gıda')) return <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
  if (lowerName.includes('hukuk') || lowerName.includes('oturum') || lowerName.includes('vatandaşlık')) return <Gavel className="w-5 h-5 text-stone-600 dark:text-stone-400" />;
  if (lowerName.includes('yemek')) return <Utensils className="w-5 h-5 text-orange-500 dark:text-orange-300" />;
  if (lowerName.includes('araba') || lowerName.includes('taksi')) return <Car className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />;
  
  return <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
};

export default function TelegramGroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = telegramGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        {/* Telegram Kanalı Duyuru Kutusu */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm">
            <Send className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-blue-800 dark:text-blue-200 text-base mb-1">Deutschland Compass Telegram Kanalı</div>
              <div className="text-sm text-blue-900 dark:text-blue-100">
                Web sitemiz ve topluluk gelişmeleri için <a href="https://t.me/+yI1or4k3nMswN2Ni" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">Telegram kanalımıza</a> katılabilirsiniz. Bu kanal, yeni eklenenleri ve önemli duyuruları kaçırmamanız için açıldı. Linkler Telegram gruplarında kaybolabiliyor; bu kanaldan hem siteye hem de gelişmelere kolayca ulaşabilirsiniz.
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Faydalı Telegram Grupları
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Almanya'daki yaşam, kariyer ve eğitim süreçlerinizde size destek olacak, tecrübe paylaşımı yapılan aktif Telegram grupları.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Grup ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {filteredGroups.map((group) => (
            <Link 
              key={group.id} 
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 flex items-center gap-4">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                  {getGroupIcon(group.name, group.id)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {group.name}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5 font-mono opacity-70 group-hover:opacity-100 transition-opacity">
                    {group.url}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0">
                  <span className="text-sm font-medium hidden sm:inline-block">Gruba Git</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Aradığınız kriterlere uygun grup bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
