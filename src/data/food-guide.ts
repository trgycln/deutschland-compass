// src/data/food-guide.ts

export type Place = {
  name: string;
  food: string;
  note: string;
  price?: string; // Fiyat ve detaylı ücret bilgisi
  highlight?: boolean; // "Şiddetle tavsiye edilir" olanlar için
  warning?: boolean; // Temizlik vb. uyarısı olanlar için
};

export type CityGroup = {
  city: string;
  places: Place[];
};

export type Region = {
  title: string;
  cities: CityGroup[];
};

// I. BÖLÜM: YEMEK MEKANLARI VE FİYATLAR
export const foodGuideData: Record<string, Region[]> = {
  Almanya: [
    {
      title: "NRW ve Batı Almanya",
      cities: [
        {
          city: "Solingen",
          places: [
            { 
              name: "Wunder Eis Cafe (Goerdeler Str. 17-25)", 
              food: "Serpme kahvaltı, pasta, tatlı, dondurma", 
              note: "Tamamen el yapımı, helal, aileye uygun, çok ferah. Pastırma (Rinderschinken) ve Sucuk (Knoblauchwurst) içerir.", 
              price: "Wunder Paşa (2 kişi): 34,90€ | Wunder Klasik (2 kişi): 26€",
              highlight: true 
            },
          ]
        },
        {
          city: "Aachen",
          places: [
            { name: "Öz Gaziantep Restaurant", food: "Kelle paça ve tüm kebap/şiş çeşitleri", note: "Mescidi var, servis ilgili, nezih bir ortam." },
            { name: "Sultans Of Kebap", food: "Döner", note: "Etler gönül rahatlığıyla yenebilir. (Not: Temizliği ve ortamı yetersiz bulanlar olmuştur).", warning: true },
            { name: "Antep Sofrası", food: "Genel", note: "Yenebilir." },
          ]
        },
        {
          city: "Hagen (Bahnhofstraße 45, 58095 Hagen)",
          places: [
            {
              name: "Kapadokya Cafe Restaurant",
              food: "Kebap, tatlı, çay/kahve",
              note: "Temiz, uygun fiyatlı, manevi hassasiyeti yüksek ve güvenilir bir mekan. İşletmecisi ilgili, aile ortamı var. Helal hassasiyeti ve müşteri memnuniyeti ön planda. Namaz için uygun ortam mevcut.",
              highlight: true
            }
          ]
        },
        {
          city: "Bielefeld",
          places: [
            { name: "Koko Kebab", food: "Genel", note: "Nezih ve güzel bir mekandır." },
            { name: "Der Grill-Experte", food: "Tavuk ızgara", note: "Ayaküstü yenebilecek bir yerdir." },
          ]
        },
        {
          city: "Bochum",
          places: [
            { name: "Bermuda Döner", food: "Yaprak et döner", note: "Alkolsüzdür, domuz ürünü bulunmamaktadır. Et döneri uygundur." },
            { name: "Belchicken", food: "Finest Fried Chicken", note: "Tavsiye edilir." },
          ]
        },
        {
          city: "Bonn",
          places: [
            { name: "Sefa Beef Döner", food: "Genel", note: "Tavsiye edilir." },
            { name: "Asli B'nin Tavsiyesi", food: "Çağ kebabı", note: "Mescidi var, bol ikram." },
          ]
        },
        {
          city: "Dortmund",
          places: [
            { name: "M&C Schnellrestaurant (Münsterstr. 71)", food: "Döner", note: "Sahibi güvenilir ve hassas olduğu için tavsiye edilir." },
            { name: "Antep Sofrasi (Lambachstr. 23)", food: "Kelle paça ve işkembe", note: "Sakadat cinsi çorba sevenlere haftanın her günü ve saati tavsiye edilir." },
          ]
        },
        {
          city: "Duisburg",
          places: [
            { name: "Lezzet Dünyası (Eski Et Dünyası)", food: "Genel", note: "Helallik hassasiyeti yüksek, çocuk oyun alanı ve namaz yeri var. Kuzu ciğeri kuyruk yağı ile yapılıyor." },
            { name: "Veganland Çiğköfte (Münzstr. 47)", food: "Çiğ köfte, lahmacun, burger, tatlı", note: "Temiz ve nezih bir yer, güvenilir." },
          ]
        },
        {
          city: "Düsseldorf",
          places: [
            { name: "Nirvana Restaurant (Langenfeld)", food: "Genel kebap ve ızgara", note: "Yemekte nirvana yaşattığı söylenir. Açık büfe kahvaltı var." },
            { name: "HFC (Halal Fried Chicken) Worringer", food: "Fast food, tavuk", note: "McDonald's ayarında, çocukların hoşuna gider, güvenilirdir." },
            { name: "DONE CAKE (Graf-Adolf-Str. 68)", food: "Donut, dondurma, cheesecake", note: "Temiz, nezih ve güvenilirdir." },
            { name: "Lider Kokoreç", food: "Kokoreç (İst/İzmir usulü), köfte, kuzu şiş", note: "Çok lezzetlidir." },
          ]
        },
        {
          city: "Essen",
          places: [
            { name: "Nevizade Restaurant", food: "Genel", note: "Mekan ve yemekler güzel, açıktır." },
            { name: "Nirvana Restaurant", food: "Kelle paça", note: "Efsane, kelle paçası harikadır." },
          ]
        },
        {
          city: "Köln ve Çevresi",
          places: [
            { name: "Büyük Harran Doydoy", food: "Kebaplar, etli ekmek", note: "Helal ve güvenilirdir." },
            { name: "Paradiso Restaurant", food: "Kebaplar", note: "Eti temiz ve lezzetlidir. Bahçeli ferah yer. Açık büfe kahvaltı tavsiye edilir." },
            { name: "Aba Döner (Keupstraße)", food: "Yaprak döner", note: "En kaliteli yaprak dönerdir.", highlight: true },
            { name: "Köşebaşı Restaurant", food: "Genel", note: "Eti temiz ve güvenilirdir. Haftasonu kahvaltı fırsatı mevcuttur." },
            { name: "Missistanbul (Ehrenfeld)", food: "Genel", note: "Güvenilir ve nezih bir yerdir. Mescidi de var." },
            { name: "Lord Of Döner (Venloer Str. 346)", food: "Döner, Lahmacun, İskender", note: "Helal, güvenilir. Cuma ve Cumartesi günleri yaprak döner bulunur." },
            { name: "Mangal Restaurant (Hansaring)", food: "Genel", note: "Tavsiye edilir." },
            { name: "Damla Plus (Brück)", food: "Açık büfe kahvaltı, pide, lahmacun, pizza", note: "Otoparkı mevcuttur. (Eski Paradiso sahibinin yeni mekanı)." },
            { name: "Therapie Döner", food: "Döner", note: "Hbf yakınında, tavsiye edilir." },
          ]
        },
        {
          city: "Neuss",
          places: [
            { name: "Oğuz Döner & Pizza Afsin", food: "Yaprak et döner", note: "Şiddetle tavsiye edilir.", highlight: true },
            { name: "Çıtır Chicken", food: "Tavuk ürünleri", note: "Nezih bir ortamda yenebilir." },
          ]
        },
        {
          city: "Wuppertal",
          places: [
            { name: "MEGA GRILL Streetfood (Wiesenstr. 47A)", food: "Döner, Pizza, Lahmacun, Burger", note: "Sevilen bir aile dostu tarafından devralındı, güvenle yenebilir." },
            { name: "El Ensar", food: "Genel", note: "Nakşet etini kullanıyor, nezih bir yer." },
          ]
        }
      ]
    },
    {
      title: "Güney Almanya (Hessen, Bavyera, B-W)",
      cities: [
        {
          city: "Frankfurt",
          places: [
            { name: "Emir Et Restaurant", food: "Klasik Türk Mutfağı", note: "Helal ve güvenilir." },
            { name: "Maydanoz Döner", food: "Döner", note: "Hbf yanında, döneri kendileri hazırlıyor." },
            { name: "Teras Restaurant", food: "Açık büfe kahvaltı/yemek", note: "Açık büfe kahvaltısı çok iyidir." },
          ]
        },
        {
          city: "Giessen/Linden",
          places: [
            { name: "Tuaz Börek", food: "Börek, baklava, pasta, cheesecake", note: "Lezzetli, güvenilir ve hoş bir yer." },
            { name: "Keyf-i Mangal", food: "Genel", note: "Güvenilir." },
          ]
        },
        {
          city: "Hamburg",
          places: [
            { name: "Köz Urfa, Lades, Saray Köz", food: "Genel kebap ve döner", note: "Hepsi yakın civarda. Köz Urfa'da abdest/mescit imkanı var." },
          ]
        },
        {
          city: "Heidelberg / Mannheim",
          places: [
            { name: "Anggus Kebap Restaurant", food: "Genel", note: "Mescidi var. Dana etleri ABD/Güney Amerika'dan getiriliyor." },
            { name: "Türk Sofrası Ocakbaşı", food: "Kuzu şiş, Adana, Tavuk şiş", note: "Lezzetleri çok iyi, tavsiye edilir." },
          ]
        },
        {
          city: "Münih",
          places: [
            { name: "VIP Döner Imbiss", food: "Yaprak döner", note: "Helal, temiz, kaliteli." },
            { name: "Mama’s Küche", food: "Ev yemeği", note: "Merkezde tavsiye edilir." },
          ]
        },
        {
          city: "Nürnberg",
          places: [
            { name: "Turkuaz Restorant", food: "Döner, çorba, pide", note: "Çok başarılı, şiddetle tavsiye edilir.", highlight: true },
            { name: "Çeşme Restaurant", food: "Genel", note: "Şoklu kesim." },
          ]
        },
        {
          city: "Stuttgart",
          places: [
            { name: "Köz Kebap", food: "Kebap çeşitleri", note: "Lezzetli, ekmeği sıcak, pide/lahmacun ücretsiz." },
            { name: "Doktor's Döner (Wiesbaden)", food: "Yaprak Döner, İskender", note: "Kendi ekmeğini üretiyor, eti el yapımı. Çok başarılı ve lezzetlidir.", highlight: true },
          ]
        }
      ]
    }
  ],
  Avrupa: [
    {
      title: "Hollanda (Netherlands)",
      cities: [
        {
          city: "Amsterdam",
          places: [
            { name: "Havzan Restaurant", food: "Etli ekmek", note: "Etli ekmeği çok lezzetlidir." },
            { name: "Pizza'dam Zuid", food: "Pizza", note: "Gönül rahatlığıyla yenebilir, paket alınıp parkta yenebilir." },
            { name: "Tarim Uyghur Restaurant", food: "Uygur yemekleri", note: "Lezzetli Uygur yemekleri, el yapımı noodle, Türkçe bilen personel." },
          ]
        },
        {
          city: "Venlo",
          places: [
            { name: "Kardeşler Cağ Kebap", food: "Orijinal cağ kebabı", note: "Şiddetle tavsiye edilir.", highlight: true },
          ]
        },
        {
          city: "Utrecht",
          places: [
            { name: "HFC (Halal Fried Chicken)", food: "Fast food", note: "Tavsiye edilir." },
          ]
        }
      ]
    },
    {
      title: "Belçika (Belgium)",
      cities: [
        {
          city: "Brüksel",
          places: [
            { name: "Belchicken", food: "Finest Fried Chicken", note: "Tavsiye edilir." },
            { name: "Qebaba", food: "Genel", note: "Abimize ait bir yerdir." },
            { name: "BEYRAN ET Altın Köfte", food: "Beyran çorbası, ızgara çeşitleri", note: "Beyran çorbası meşhurdur." },
          ]
        },
        {
          city: "Gent",
          places: [
            { name: "VUSLAT ETLİEKMEK", food: "Etliekmek", note: "Kesinlikle tavsiye edilir.", highlight: true },
          ]
        },
        {
          city: "Anvers",
          places: [
            { name: "Kassap Döner", food: "Yaprak döner", note: "Hakiki yaprak döner, eti kendi takıyor, çok lezzetlidir.", highlight: true },
          ]
        }
      ]
    },
    {
      title: "Fransa (France)",
      cities: [
        {
          city: "Paris",
          places: [
            { name: "Black & White Burger", food: "Hamburger (Siyah Hamburger)", note: "Helal sertifikasını gösteriyor. Hamburger yenebilir." },
            { name: "Restaurant Onur", food: "Genel", note: "Tavsiye edilir." },
            { name: "Prodelices", food: "Açık büfe kahvaltı, pide, lahmacun", note: "Güvenilir cafe, bir arkadaşımızın işlettiği mekân." },
          ]
        },
        {
          city: "Strasburg",
          places: [
            { name: "Konya Etliekmek (A la table de Mevlana)", food: "Pide", note: "Pideleri başarılıdır." },
            { name: "Atelier du Pide", food: "Pide", note: "Hamuru lezzetli, tavsiye edilir." },
          ]
        }
      ]
    },
    {
      title: "Diğer Ülkeler",
      cities: [
        {
          city: "Avusturya - Viyana",
          places: [
            { name: "Ferhat Döner", food: "Odun ateşinde döner", note: "Eti helal, Avrupa'da yenilen en iyi döner olduğu söylenir.", highlight: true },
            { name: "Günay Restaurant", food: "Açık büfe kahvaltı", note: "Tavsiye edilir." },
          ]
        },
        {
          city: "İsviçre",
          places: [
            { name: "Goldeneshorn (Zürih/Winterthur)", food: "Genel", note: "Tavsiye edilir." },
            { name: "Ali Haydar Kebab (Cenevre)", food: "Döner", note: "Döner güzel, çayı demleme." },
          ]
        },
        {
          city: "İtalya",
          places: [
            { name: "Bab al Yemen (Milano)", food: "Pilav ve tavuk", note: "Nezih, içkisiz, temiz.", price: "Pilav ve yarım tavuk: 13.50€" },
            { name: "Pepperoni pizza (Verona)", food: "Pizza", note: "Fiyata göre en iyi pizza." },
          ]
        },
        {
          city: "Çekya - Prag",
          places: [
            { name: "İstanbul Kebap", food: "Kebap", note: "Tarihi meydana yakın, namaz kılma imkanı var." },
            { name: "OSH Uzbek Food", food: "Özbek Lokantası", note: "Tavsiye edilir." },
          ]
        },
        {
          city: "Bosna-Hersek / Balkanlar",
          places: [
            { name: "Ćevabdžinica Petica Ferhatović (Saraybosna)", food: "Cevabi köftesi", note: "Muhakkak gidilmelidir.", highlight: true },
            { name: "Sač (Saraybosna)", food: "Boşnak Böreği", note: "Önerilir." },
            { name: "Restoran Islamski Centar (Zagreb)", food: "Cevapi kebabı", note: "Cami avlusunda bulunur, kebabı güzeldir." },
          ]
        }
      ]
    }
  ]
};

// II. BÖLÜM: SEYAHAT İPUÇLARI VE FİYATLAR
export const travelTips = [
  {
    title: "Hollanda Gezi Notları (Amsterdam)",
    items: [
      "Park Ücretleri: Amsterdam merkezde saatlik 1,40€. Şehir dışında saatlik 0,10€ olan park yerleri mevcuttur.",
      "Ulaşım: Otoparktan Merkez İstasyonu'na (Central Station) ücretsiz feribot ile geçilebilir.",
      "Aktiviteler: Kayıkla kanal turu (Yetişkin 13€, çocuk 9€) önerilir.",
      "Gezilecek Köyler: Zaanse Schans (Yel Değirmeni Köyü), Edam, Volendam ve Marken.",
      "Giethorn: Elektrikli sandal kiralamak mümkündür (Saati 20€ / 5-6 kişi)."
    ]
  },
  {
    title: "Almanya Dışı Ulaşım & Sınır",
    items: [
      "Avusturya Otobanları: 'Vignette' şarttır. (10 günlük: 9,90€ | 2 aylık: 29€).",
      "Lüksemburg: Şehir içinde ulaşım tamamen ücretsizdir. Kapalı otopark (Parking R. P. Schuman) saatlik 1€'dur.",
      "Hırvatistan/Karadağ: Sınır geçişinde kontrol vardır, pasaport/kimlik hazır olmalı."
    ]
  },
  {
    title: "Güvenlik & Helal Kontrol",
    items: [
      "Atina Uyarısı: Atina'da gezerken hırsızlara karşı (pasaport/kimlik) çok dikkatli olunması şiddetle tavsiye edilir.",
      "Hırvatistan: Müslümanlar Helallik Kurumu'nun yayınladığı helal ambalajlı et kataloğu mevcuttur.",
      "Uygulamalar: Ürün içeriklerini kontrol etmek için 'Halalcheck' uygulamasından faydalanılması önerilir."
    ]
  },
  {
    title: "Güvenilir Market ve Et Kaynakları",
    items: [
      "Nimet: Kuşbaşı et ve kıymaları katkısız ve lezzetlidir. Almanya geneline 150€ üzeri siparişte kargo ücretsizdir.",
      "Tuna Et Ürünleri: Paderborn/Rüthen'deki Metin's Holzkohlegrill ve Berlin'deki İmren Döner bu markayı kullanır."
    ]
  }
];

// III. BÖLÜM: GENEL HİJYEN VE HELALLİK UYARILARI
export const generalAdvice = [
  "Paylaşılan bir mekanın orayı mahsursuz kıldığı anlamına gelmediği unutulmamalıdır. Kendi ölçülerinize ve vicdanınıza göre karar veriniz.",
  "Emin olmak için mekân sahiplerinden sertifika talep edilebilir. Birinci öncelik etlerin mahsursuz olmasıdır.",
  "Alkol bulunan mekanlar yerine alternatif alkolsüz mekanların tercih edilmesi tavsiye edilir.",
  "Domuz eti satılan yerlerde 'Slicer' (bıçak), tepsi veya yağın ortak kullanım riskine dikkat edilmelidir.",
  "Vegan/Vejetaryen ürünler tüketilirken bile tezgah üstü artık malzemelerin (peynir/kıyma) karışma riski vardır.",
  "Mümkünse çapraz bulaşma riskini azaltmak için fırında pişmiş tavuk veya hindi ürünleri tercih edilmelidir."
];