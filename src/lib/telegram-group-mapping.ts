import { telegramGroups, TelegramGroup } from '@/data/telegram-groups';

export interface GroupPageMapping {
  groupId: string;
  groupName: string;
  groupUrl: string;
  pageRoute: string;
  categoryName: string;
  aliases: string[];
}

/**
 * Maps Telegram groups to site routes and category slugs
 */
export const groupToPageMappings: GroupPageMapping[] = [
  {
    groupId: 'busfahrer',
    groupName: 'BUSFAHRER GRUBU',
    groupUrl: 'https://t.me/+A-1HiIoQ19MwMjAy',
    pageRoute: '/rehber/otobus-soforlugu',
    categoryName: 'Otobüs Şoförlüğü',
    aliases: ['busfahrer', 'otobus-soforlugu', 'otobus']
  },
  {
    groupId: 'lokfuhrer',
    groupName: 'LOKFÜHRER GRUBU',
    groupUrl: 'https://t.me/+G_h_z59ZYTM5NDBi',
    pageRoute: '/meslekler/lokfuhrer',
    categoryName: 'Makinistlik (Lokführer)',
    aliases: ['lokfuhrer', 'lokfuehrer', 'makinist']
  },
  {
    groupId: 'lkw',
    groupName: 'LKW FÜHRER GRUBU',
    groupUrl: 'https://t.me/+aEzoQbSPHMo3ZTUy',
    pageRoute: '/meslekler/lkw-soforlugu',
    categoryName: 'LKW / Tır Şoförlüğü',
    aliases: ['lkw', 'lkw-soforlugu', 'tir']
  },
  {
    groupId: 'anerkennung',
    groupName: 'ANERKENNUNG GRUBU',
    groupUrl: 'https://t.me/+o9L43mwhPkZkYTQy',
    pageRoute: '/rehber/anerkennung',
    categoryName: 'Diploma Denkliği (Anerkennung)',
    aliases: ['anerkennung', 'denklik']
  },
  {
    groupId: 'aile-birlesim',
    groupName: 'AİLE BİRLEŞİM GRUBU',
    groupUrl: 'https://t.me/+hQPqtt_SuKMxM2Uy',
    pageRoute: '/rehber/aile-birlesimi',
    categoryName: 'Aile Birleşimi',
    aliases: ['aile-birlesim', 'aile-birlesimi', 'vize']
  },
  {
    groupId: 'almanca-ogretmeni',
    groupName: 'ALMANCA ÖĞRETMENİ OLMAK İSTİYORUM GRUBU',
    groupUrl: 'https://t.me/+a2fVAk2kZaVlMjEy',
    pageRoute: '/meslekler/almanca-ogretmenligi',
    categoryName: 'Almanca Öğretmenliği',
    aliases: ['almanca-ogretmeni', 'almanca-ogretmenligi']
  },
  {
    groupId: 'elektrik',
    groupName: 'ELEKTRİK AUSBİLDUNG GRUBU',
    groupUrl: 'https://t.me/+ur-Lcuta12I2MDMy',
    pageRoute: '/rehber/elektrikci',
    categoryName: 'Elektrik & Ausbildung',
    aliases: ['elektrik', 'elektrikci', 'elektronik']
  },
  {
    groupId: 'erzieher',
    groupName: 'ERZIEHER/IN GRUBU',
    groupUrl: 'https://t.me/+V03ZgVzm6XAxNDVi',
    pageRoute: '/rehber/erzieherin',
    categoryName: 'Erzieher / Kreş Eğitmenliği',
    aliases: ['erzieher', 'erzieherin', 'kindergarten']
  },
  {
    groupId: 'hemsireler',
    groupName: 'HEMŞİRELER GRUBU',
    groupUrl: 'https://t.me/+Ssb02mP74y42OGEy',
    pageRoute: '/meslekler/hemsire',
    categoryName: 'Hemşirelik',
    aliases: ['hemsireler', 'hemsire', 'pflege']
  },
  {
    groupId: 'pfleger',
    groupName: 'PFLEGER-IN /PFLEGEHELFER-IN GRUBU',
    groupUrl: 'https://t.me/+j57ECmTyGfowYTFi',
    pageRoute: '/rehber/hasta-yasli-bakimi',
    categoryName: 'Hasta ve Yaşlı Bakımı',
    aliases: ['pfleger', 'hasta-yasli-bakimi', 'altenpflege']
  },
  {
    groupId: 'veteriner',
    groupName: 'VETERINER HEKİMLER GRUBU',
    groupUrl: 'https://t.me/+TsOB4-D8q1A4ZjA6',
    pageRoute: '/rehber/veteriner-hekimligi',
    categoryName: 'Veteriner Hekimliği',
    aliases: ['veteriner', 'veteriner-hekimligi']
  },
  {
    groupId: 'steuer',
    groupName: 'STEUERERKLÄRUNG GRUBU',
    groupUrl: 'https://t.me/+MZVY4tuyUY5jOGIy',
    pageRoute: '/rehber/vergi-beyani',
    categoryName: 'Vergi Beyanı (Steuererklärung)',
    aliases: ['steuer', 'vergi-beyani', 'vergi']
  },
  {
    groupId: 'suresiz-oturum',
    groupName: 'SÜRESİZ OTURUM - VATANDAŞLIK GRUBU',
    groupUrl: 'https://t.me/+bS0HcJByy9UzYzky',
    pageRoute: '/rehber/anerkennung',
    categoryName: 'Süresiz Oturum & Vatandaşlık',
    aliases: ['suresiz-oturum', 'vatandaslik', 'oturum']
  },
  {
    groupId: 'ev-arama',
    groupName: 'ALMANYA EV ARAMA VE IKINCI EL EŞYA GRUBU',
    groupUrl: 'https://t.me/+js6f-7pe0hFiZGRi',
    pageRoute: '/rehber/anerkennung',
    categoryName: 'Ev Arama & Barınma',
    aliases: ['ev-arama', 'ev', 'wohnung']
  },
  {
    groupId: 'it-bilisim',
    groupName: 'I.T BİLİŞİM GRUBU',
    groupUrl: 'https://t.me/+_5ox6dqGidcwOGMy',
    pageRoute: '/meslekler/bilisim-it',
    categoryName: 'IT & Bilişim',
    aliases: ['it-bilisim', 'bilisim-it', 'yazilim']
  },
  {
    groupId: 'muhasebeciler',
    groupName: 'MUHASEBECİLER GRUBU',
    groupUrl: 'https://t.me/+rwMRpabT4l5jZGQy',
    pageRoute: '/rehber/muhasebe',
    categoryName: 'Muhasebe & Mali Müşavirlik',
    aliases: ['muhasebeciler', 'muhasebe']
  },
  {
    groupId: 'isletme',
    groupName: 'İŞLETME - İKTİSAT - MALİYE GRUBU',
    groupUrl: 'https://t.me/+w2viy2qFczQ0MGUy',
    pageRoute: '/meslekler/isletme-iktisat',
    categoryName: 'İşletme & İktisat',
    aliases: ['isletme', 'isletme-iktisat', 'maliye']
  },
  {
    groupId: 'dagitim',
    groupName: 'DEUTSCHE POST/AMAZON /HERMES/UBER DAĞITIM ÇALIŞANLAR GRUBU',
    groupUrl: 'https://t.me/+BZ_LmLEzumliMmZi',
    pageRoute: '/rehber/kargo-posta-dagitim',
    categoryName: 'Kargo & Posta Dağıtım',
    aliases: ['dagitim', 'kargo-posta-dagitim', 'post']
  },
  {
    groupId: 'cevre-muhendisleri',
    groupName: 'ÇEVRE MÜHENDİSLERİ GRUBU',
    groupUrl: 'https://t.me/+5YSwpCNziaMzZWQ6',
    pageRoute: '/rehber/cevre-muhendisligi',
    categoryName: 'Çevre Mühendisliği',
    aliases: ['cevre-muhendisleri', 'cevre-muhendisligi']
  },
  {
    groupId: 'cografi-bilgi',
    groupName: 'COĞRAFİ BİLGİ SİSTEMLERİ (GIS) GRUBU',
    groupUrl: 'https://t.me/+tTSAdmOAXZ9kMDc6',
    pageRoute: '/rehber/cografi-bilgi-sistemleri',
    categoryName: 'Coğrafi Bilgi Sistemleri (GIS)',
    aliases: ['cografi-bilgi', 'cografi-bilgi-sistemleri', 'gis']
  },
  {
    groupId: 'mekanlar',
    groupName: 'ŞEHİRLERDE YEMEK YİYEBİLECEĞİMİZ MEKANLAR',
    groupUrl: 'https://t.me/+aSRj7jvZ3eY0NDQy',
    pageRoute: '/rehber/helal-mekanlar',
    categoryName: 'Yeme-İçme & Helal Mekanlar',
    aliases: ['mekanlar', 'helal-mekanlar', 'restoran']
  }
];

/**
 * Finds mapping for a given slug or group ID
 */
export function getGroupMapping(slugOrGroupId: string): GroupPageMapping | undefined {
  const normalized = (slugOrGroupId || '').toLowerCase().trim();
  
  return groupToPageMappings.find(
    m => m.groupId === normalized || 
         m.aliases.includes(normalized) || 
         m.pageRoute.includes(normalized)
  );
}

/**
 * Returns the Telegram group object from `telegramGroups`
 */
export function getTelegramGroupDetails(groupId: string): TelegramGroup | undefined {
  return telegramGroups.find(g => g.id === groupId);
}
