// src/data/food-guide.ts

export type Place = {
  name: string;
  food?: string; // Ne yenir?
  city: string;
  address?: string;
  phone?: string;
  note?: string;
  mapLinks?: string[]; // Google Maps linkleri
  highlight?: boolean; // Öne çıkanlar
  warning?: boolean; // Temizlik vs uyarısı olanlar
  price?: string; // Fiyat bilgisi
};

export type CityGroup = {
  city: string;
  places: Place[];
};

export type CountryGroup = {
  country: string;
  cities: CityGroup[];
};

// I. BÖLÜM: YEMEK MEKANLARI VE FİYATLAR
export const foodGuideData: CountryGroup[] = [
  {
    country: "Almanya",
    cities: [
      {
        city: "Aachen",
        places: [
          { name: "Sultans Of Kebap", city: "Aachen", phone: "04924 15680940", mapLinks: ["https://maps.app.goo.gl/hkbKbVNfjLGUWPyt8"], note: "Döner. Gönül rahatlığıyla yenebilir. (Not: Temizliği ve ortamı yetersiz bulanlar olmuştur)", warning: true },
          { name: "Antep Sofrası", city: "Aachen", address: "Elsassstraße 18, 52068 Aachen", phone: "0241 95712400", mapLinks: ["https://goo.gl/maps/vmWVU61Q6t5L5Rkz8"], note: "Yenebilir." },
          { name: "Öz Gaziantep Restaurant", city: "Aachen", mapLinks: ["https://g.co/kgs/cfqsVR7"], note: "Kelle paça ve tüm kebap/şiş çeşitleri. Mescidi var, servis ilgili." },
          { name: "Veggy Go Çiğköfte", city: "Aachen", note: "Vegan Hamburger ve Bowl çeşitleri" }
        ]
      },
      {
        city: "Aalen",
        places: [
          { name: "Academy Döner Aalen", city: "Aalen", phone: "07361 3820684", mapLinks: ["https://g.co/kgs/hoC93m"] }
        ]
      },
      {
        city: "Augsburg",
        places: [
          { name: "Kingdöner", city: "Augsburg", note: "Bahnhof yakınında" },
          { name: "Erzincan Restaurant", city: "Augsburg" },
          { name: "Express Grill&Kebab", city: "Augsburg", address: "Jakoberstrasse 50, 86152 Augsburg" },
          { name: "Mevlana Grill (Mevlana Kasap)", city: "Augsburg" }
        ]
      },
      {
        city: "Bamberg",
        places: [
          { name: "Bamberger Döner", city: "Bamberg", note: "Bizim abilerden" }
        ]
      },
      {
        city: "Bayreuth",
        places: [
          { name: "Dönerci (Üniversite Çevresi)", city: "Bayreuth", note: "Bayreuth üniversitesi çevresi" }
        ]
      },
      {
        city: "Berlin",
        places: [
          { name: "La Femme", city: "Berlin", note: "Kreuzberg - Kahvaltı" },
          { name: "İmren Döner", city: "Berlin", note: "Kreuzberg - Yemek. Eti genellikle Tuna markasından almaktadır." },
          { name: "HFC Helal Fried Chicken", city: "Berlin" },
          { name: "03 hisar Afyonkendigelen", city: "Berlin", address: "Carmerstr 8 10623 Berlin", mapLinks: ["https://g.co/kgs/EEMMYH"], note: "Kahvaltı" },
          { name: "Leckerback", city: "Berlin", note: "Kahvaltı, dondurma" },
          { name: "Sofra Frühstückscafé", city: "Berlin", phone: "030 33096099", note: "Simit kahvaltısı" },
          { name: "Lalezar Restaurant", city: "Berlin", mapLinks: ["https://g.co/kgs/NKUyKQ"] },
          { name: "Berlin Cigköfte Spandau", city: "Berlin", phone: "01590 6730016", note: "www.berlincigkoeftespandau.de" },
          { name: "Berlin Köfte", city: "Berlin" },
          { name: "Mir Döner Hatay Usülü", city: "Berlin", mapLinks: ["https://g.co/kgs/wQadCdQ"] },
          { name: "Asude Restaurant - Charlottenburg", city: "Berlin", phone: "030 34504004", mapLinks: ["https://g.co/kgs/KrGcPqP"] },
          { name: "Komagene Spandau Berlin", city: "Berlin" }
        ]
      },
      {
        city: "Bielefeld",
        places: [
          { name: "Der Grill-Experte Salzkottener Hähnchengrill", city: "Bielefeld", phone: "0172 5275316", note: "Tavuk ızgara. Ayaküstü yenebilecek bir yerdir." },
          { name: "Lokma", city: "Bielefeld", address: "Arndtstraße 18A, 33615 Bielefeld" },
          { name: "Nohut", city: "Bielefeld", address: "Welle 36, 33602 Bielefeld" },
          { name: "Koko Kebab Bielefeld", city: "Bielefeld", phone: "0521 77013842", note: "Nezih ve güzel bir mekandır." },
          { name: "HFC Chicken und Tantuni Restaurant", city: "Bielefeld", phone: "0172 2731348" }
        ]
      },
      {
        city: "Bochum",
        places: [
          { name: "Bermuda Döner", city: "Bochum", phone: "0234 92666416", mapLinks: ["https://goo.gl/maps/qmLvBysvyWx7MpP59"], note: "Yaprak et döner. Alkolsüzdür, domuz ürünü bulunmamaktadır." },
          { name: "Belchicken Bochum", city: "Bochum", phone: "0234 37949963", mapLinks: ["https://goo.gl/maps/uSvtMuLyKtZfuKV16"], note: "Finest Fried Chicken. Tavsiye edilir." },
          { name: "Hüdayi Ustam - Fischhaus am Westpark", city: "Bochum", phone: "0234 89358828", mapLinks: ["https://g.co/kgs/sb3ajE"] },
          { name: "Vegan Çiğköfte Dükkanı (Cem Altin)", city: "Bochum", note: "Wattenscheid" }
        ]
      },
      {
        city: "Bonn",
        places: [
          { name: "Sefa Beef Döner", city: "Bonn", phone: "0228 43326066", mapLinks: ["https://g.co/kgs/WfQW2Pe"], note: "Tavsiye edilir." },
          { name: "Asli B'nin Tavsiyesi", city: "Bonn", note: "Çağ kebabı. Mescidi var, bol ikram." }
        ]
      },
      {
        city: "Bremen",
        places: [
          { name: "Tantuni", city: "Bremen", address: "Hillmannplatz 1 28195 Bremen" },
          { name: "Özlem Restaurant", city: "Bremen", address: "Gröpelinger Heerstr. 183", phone: "042116112753", note: "Döner-ızgara" },
          { name: "Bread House Bremen", city: "Bremen", address: "Wartburgstraße 50/52, 28217 Bremen", phone: "0421 64474526", mapLinks: ["https://g.co/kgs/bU4oWC"] },
          { name: "Kervan Restoran", city: "Bremen", note: "Döner ızgara çorba. Tam merkezde." }
        ]
      },
      {
        city: "Dachau",
        places: [
          { name: "Dönerci (Adı belirtilmedi)", city: "Dachau", mapLinks: ["https://share.google/hIzHLUqIqGtiaFn54"] }
        ]
      },
      {
        city: "Darmstadt",
        places: [
          { name: "Lezzet Restaurant", city: "Darmstadt" },
          { name: "Nazar Restaurant", city: "Darmstadt" },
          { name: "Antepsofrasi", city: "Darmstadt" }
        ]
      },
      {
        city: "Detmold",
        places: [
          { name: "HFC Chicken und Tantuni Restaurant", city: "Detmold", phone: "0172 2731348" }
        ]
      },
      {
        city: "Dortmund",
        places: [
          { name: "Selçuklu Hatay Künefe Restaurant Fredenbaum", city: "Dortmund", address: "Evinger Str. 4, 44145 Dortmund", phone: "0231 84794913", mapLinks: ["https://g.co/kgs/ZW6i5s"] },
          { name: "Nur Pastanesi Hauptbahnhof", city: "Dortmund", phone: "0231 95087700", note: "Kahvaltı" },
          { name: "Antep Sofrasi Dortmund", city: "Dortmund", address: "Lambachstraße 23, 44145 Dortmund", note: "Kelle paça ve işkembe çorbası. Sakadat sevenlere tavsiye." },
          { name: "M&C Schnellrestaurant", city: "Dortmund", address: "Münsterstraße 71, 44145 Dortmund", phone: "0231 13734843", note: "Döner. Sahibi güvenilir ve hassas." },
          { name: "Delphin Donuts", city: "Dortmund", phone: "0177 7912985" },
          { name: "OASIS SULTAN PASTANESI", city: "Dortmund", phone: "0231 72977724", note: "Kahvaltı" },
          { name: "Roast’n Berry Dortmund", city: "Dortmund", phone: "0231 13729898", mapLinks: ["https://g.co/kgs/CgFwaZ"], note: "Kahvaltı" },
          { name: "Öz Urfa Deluxe", city: "Dortmund", phone: "0231 58927435", mapLinks: ["https://g.co/kgs/TXSJSRA"], note: "Kahvaltı" }
        ]
      },
      {
        city: "Dresden",
        places: [
          { name: "Paradies Pizza", city: "Dresden" },
          { name: "Didim Kebap Haus", city: "Dresden" }
        ]
      },
      {
        city: "Duisburg",
        places: [
          { name: "Pera Restaurant GmbH", city: "Duisburg", phone: "0203 551545", note: "Marxloh" },
          { name: "Veganland Çiğköfte", city: "Duisburg", address: "Münzstraße 47, 47051 Duisburg", phone: "0203 39251301", note: "Çiğ köfte, lahmacun, burger, tatlılar. Temiz ve nezih." },
          { name: "Et Dünyasi (Lezzet Dünyası)", city: "Duisburg", address: "Weseler Str. 152, 47169 Duisburg", phone: "0203 34698367", mapLinks: ["https://g.co/kgs/x1sv3h"], note: "Helallik konusunda hassas, çocuk oyun alanı ve namaz kılma yeri var." },
          { name: "Konya42 etli ekmek", city: "Duisburg", note: "Hochfeld" },
          { name: "Konya Firini", city: "Duisburg", phone: "0208 4443337" }
        ]
      },
      {
        city: "Düsseldorf",
        places: [
          { name: "HFC Worringer", city: "Düsseldorf", address: "Worringer Str. 95-97 40210 Düsseldorf", phone: "0211 17837042", mapLinks: ["https://g.co/kgs/jvUQ4Yz"], note: "Fast food, tavuk ürünleri. Güvenilirdir." },
          { name: "DONE CAKE", city: "Düsseldorf", address: "Graf-Adolf-Straße 68, 40210 Düsseldorf", phone: "0211 91596206", mapLinks: ["https://goo.gl/maps/GnUjLpo3pwg9DYkp9"], note: "Donut, dondurma, cheesecake. Temiz ve nezih." },
          { name: "Çiğköftem Düsseldorf", city: "Düsseldorf", address: "Duisburger Str. 18 40477, Düsseldorf" },
          { name: "Saray Restaurant", city: "Düsseldorf", phone: "0211 363557" },
          { name: "İzmir Restaurant (Kebab H. Izmir)", city: "Düsseldorf", phone: "0211 36777683" },
          { name: "Lider Kokoreç", city: "Düsseldorf", phone: "0177 5389871", note: "Kokoreç (İstanbul/İzmir usulü), köfte ekmek, kuzu şiş. Çok lezzetlidir." },
          { name: "Deniz Imbiss", city: "Düsseldorf", note: "Birkelalle - Esnaf Lokantası" },
          { name: "Dondurmacı (Kuloglu)", city: "Düsseldorf", address: "Derendorfer Str. 51, 40479 Düsseldorf" },
          { name: "Nirvana Restaurant", city: "Düsseldorf", note: "Langenfeld'de. Genel kebap ve ızgara. Açık büfe kahvaltı var. Kelle paçası harikadır." }
        ]
      },
      {
        city: "Emden",
        places: [
          { name: "Helal/Vegan yer tavsiyesi yok", city: "Emden", note: "Bilgi bulunmuyor." }
        ]
      },
      {
        city: "Erfurt",
        places: [
          { name: "Brothers Bäckerei & Café", city: "Erfurt", phone: "01520 8527488" },
          { name: "Holzkohle Restaurant İkram Ocakbaşı", city: "Erfurt", phone: "0341 33209195" },
          { name: "Dönerci (25-30 yıllık)", city: "Erfurt" }
        ]
      },
      {
        city: "Essen",
        places: [
          { name: "Nevizade Restaurant Essen", city: "Essen", phone: "0163 6757596", note: "Mekan ve yemekler güzel, açıktır." },
          { name: "Nirvana Restaurant", city: "Essen", phone: "0201 50682516", mapLinks: ["https://nirvanaessen.de/"], note: "Kelle paça. Efsane." }
        ]
      },
      {
        city: "Esslingen",
        places: [
          { name: "Köz restaurant", city: "Esslingen" }
        ]
      },
      {
        city: "Flensburg",
        places: [
          { name: "Eiscafe Pizzeria", city: "Flensburg" }
        ]
      },
      {
        city: "Frankfurt am Main",
        places: [
          { name: "Emir Et Restaurant", city: "Frankfurt am Main", phone: "069 61994023", note: "Klasik Türk Mutfağı. Helal ve güvenilir." },
          { name: "Café Buur", city: "Frankfurt am Main", phone: "069 49085303", note: "Kahvaltı" },
          { name: "Anatolia Cafe Restaurant", city: "Frankfurt am Main", mapLinks: ["https://g.co/kgs/QQye7W"] },
          { name: "Dornbusch Kebap Haus", city: "Frankfurt am Main" },
          { name: "Köylü döner", city: "Frankfurt am Main" },
          { name: "Dönerium", city: "Frankfurt am Main", address: "Ostendstraße 97" },
          { name: "Maydanoz döner", city: "Frankfurt am Main", note: "Hauptbahnhof yanında. Döneri kendileri hazırlıyor." },
          { name: "Teras Cafe Restaurant", city: "Frankfurt am Main", note: "Açık büfe kahvaltısı çok iyidir. (Helallik sorgulanmalı)" },
          { name: "Mamma Forno", city: "Frankfurt am Main", note: "Hamburger" },
          { name: "Sos Döner", city: "Frankfurt am Main", note: "Hauptbahnhof" }
        ]
      },
      {
        city: "Freiburg",
        places: [
          { name: "Kebaphaus", city: "Freiburg" },
          { name: "Divan Restaurant", city: "Freiburg" },
          { name: "Lezzet restorant", city: "Freiburg" }
        ]
      },
      {
        city: "Fürstenfeldbruck",
        places: [
          { name: "Kebap King", city: "Fürstenfeldbruck", phone: "+49 8141 34520" }
        ]
      },
      {
        city: "Garmisch-Partenkirchen",
        places: [
          { name: "Kebab & Smash", city: "Garmisch-Partenkirchen", address: "Wettersteinstraße 33, 82467 Garmisch-Partenkirchen" }
        ]
      },
      {
        city: "Gelsenkirchen",
        places: [
          { name: "Yeni Konak Restaurant", city: "Gelsenkirchen", phone: "0209 3614968", note: "Tuna ürünleri kullanıyor." },
          { name: "Artuklu Grill", city: "Gelsenkirchen", phone: "0209 95714534", note: "Döner" },
          { name: "MrChicken", city: "Gelsenkirchen", phone: "0209 91327112" }
        ]
      },
      {
        city: "Gießen",
        places: [
          { name: "Tuaz Börek (BGN GmbH)", city: "Gießen", address: "Moltkestraße 20, 35440 Linden", phone: "06403 7769633", mapLinks: ["https://g.co/kgs/B5Bw3D"], note: "Börek, baklava, pasta, cheesecake. Lezzetli ve güvenilir." },
          { name: "Restaurant Keyf-i Mangal", city: "Gießen", phone: "0641 97244005", mapLinks: ["https://g.co/kgs/bM97Sg"], note: "Güvenilir." },
          { name: "Simit Diyari (StadtBäckerei)", city: "Gießen", phone: "0641 98454718" },
          { name: "Turhan kebap", city: "Gießen" }
        ]
      },
      {
        city: "Gladbeck",
        places: [
          { name: "Meydan restotant", city: "Gladbeck" },
          { name: "Artuklu restoran", city: "Gladbeck" }
        ]
      },
      {
        city: "Göppingen",
        places: [
          { name: "Big Brothers", city: "Göppingen", mapLinks: ["https://g.co/kgs/2gyNzPv"] }
        ]
      },
      {
        city: "Hagen",
        places: [
          { name: "Kapadokya Restaurant & Café", city: "Hagen", address: "Bahnhofstraße 45, 58095 Hagen" }
        ]
      },
      {
        city: "Hamburg",
        places: [
          { name: "Köz Urfa", city: "Hamburg", note: "Altona. Abdest/mescit imkanı var." },
          { name: "Lades", city: "Hamburg" },
          { name: "Saray Köz", city: "Hamburg" },
          { name: "Dondurmacı (Levent)", city: "Hamburg", address: "Schiffbeker Weg 62 22119 Hamburg" },
          { name: "Tibarg Kebap Haus", city: "Hamburg", mapLinks: ["https://tibarg-kebap.de"] },
          { name: "Saray restaurant", city: "Hamburg" }
        ]
      },
      {
        city: "Hamm",
        places: [
          { name: "Firat Döner & Pide", city: "Hamm", phone: "02381 3733750", mapLinks: ["https://goo.gl/maps/fdN1yPV6reXXzfJL7"] },
          { name: "Ay Restaurant - Pide & Döner", city: "Hamm", phone: "02381 9568442", mapLinks: ["https://goo.gl/maps/1z5db7t23YdgxwWAA"] },
          { name: "Lider Kokorec Hamm", city: "Hamm", phone: "0177 7703869", mapLinks: ["https://goo.gl/maps/ZaAAK5VdxkHR71d1A"] }
        ]
      },
      {
        city: "Hanau",
        places: [
          { name: "Koz Restaurant", city: "Hanau", phone: "06181 5770087", note: "Açık büfe kahvaltı" }
        ]
      },
      {
        city: "Hannover",
        places: [
          { name: "Nefis Restaurant", city: "Hannover", note: "Tren garına 20 dk" },
          { name: "Efendibey", city: "Hannover", note: "Merkezde, Bahnhof'a yakın" }
        ]
      },
      {
        city: "Heidelberg / Mannheim",
        places: [
          { name: "Sofra restaurant", city: "Heidelberg" },
          { name: "Restaurant Arbil Döner Imbiss", city: "Heidelberg", phone: "06221 4319057", warning: true, note: "Haritalarda kapalı görünebilir" },
          { name: "Royal Pizza Kebap", city: "Heidelberg", note: "Neckargemünd civarı" },
          { name: "Anggus Kebap Restaurant", city: "Mannheim", note: "Mescidi var. Dana etleri ABD/Güney Amerika'dan." },
          { name: "Türk Sofrası Ocakbaşı", city: "Mannheim", note: "Lezzetleri çok iyi, tavsiye edilir." },
          { name: "Türk Ocak Başı", city: "Mannheim", note: "Türk meydanı" },
          { name: "Katık döner bar", city: "Mannheim" },
          { name: "Leziz pizza kebap Haus", city: "Mannheim", phone: "0176 92822548", mapLinks: ["https://goo.gl/maps/42XQ1D1xYA5DEu9VA"] },
          { name: "Lale Restaurant", city: "Mannheim", phone: "0621 40166939" },
          { name: "Paşam Restaurant", city: "Mannheim", phone: "0621 43732023" },
          { name: "Ustam Döner", city: "Mannheim" },
          { name: "Çamlıca pide salonu", city: "Mannheim" }
        ]
      },
      {
        city: "Heilbronn",
        places: [
          { name: "Otantik Döner", city: "Heilbronn" },
          { name: "HD DONER", city: "Heilbronn", address: "Sülmer str 12" }
        ]
      },
      {
        city: "Hockenheim",
        places: [
          { name: "Denis Döner - Pizza & Döner Spezialitäten", city: "Hockenheim", address: "Duttweiler Str. 20, 68766 Hockenheim", phone: "06205 2598033", mapLinks: ["https://g.co/kgs/VtD8bZ"] }
        ]
      },
      {
        city: "Ingolstadt",
        places: [
          { name: "DÖLAPİ", city: "Ingolstadt" },
          { name: "ZİYAFET LOKANTASI", city: "Ingolstadt" }
        ]
      },
      {
        city: "Kaiserslautern",
        places: [
          { name: "Döner Nation", city: "Kaiserslautern", note: "Yaprak döner" }
        ]
      },
      {
        city: "Kamp Lintford",
        places: [
          { name: "Toscana", city: "Kamp Lintford" }
        ]
      },
      {
        city: "Karlsruhe",
        places: [
          { name: "Kebabi", city: "Karlsruhe" },
          { name: "Urumci Uygur Restaurant", city: "Karlsruhe" }
        ]
      },
      {
        city: "Kassel",
        places: [
          { name: "Diyarbakır Ocakbaşı", city: "Kassel", mapLinks: ["https://g.co/kgs/22KYL8"] },
          { name: "Mais Döner", city: "Kassel", mapLinks: ["https://g.co/kgs/JYPgHB"] },
          { name: "Kassel saraykapı", city: "Kassel" }
        ]
      },
      {
        city: "Kempten",
        places: [
          { name: "Restoran (Adı belirtilmedi)", city: "Kempten" }
        ]
      },
      {
        city: "Koblenz",
        places: [
          { name: "Want Beef", city: "Koblenz", phone: "0261 13348427", note: "Hamburger" },
          { name: "Pirzola Pizza & Grillhaus", city: "Koblenz", phone: "0261 97325888" },
          { name: "Familys Pizza und Grillhaus", city: "Koblenz", address: "Andernacher Str. 236, 56070 Koblenz" },
          { name: "Berlin Döner", city: "Koblenz", phone: "0261 97349633", mapLinks: ["https://g.co/kgs/b2iV6AA"] },
          { name: "Veganes Cigköfte Koblenz", city: "Koblenz", address: "Löhrstr 84, 56068 Koblenz" }
        ]
      },
      {
        city: "Köln",
        places: [
          { name: "Büyük Harran Doydoy", city: "Köln", mapLinks: ["https://g.co/kgs/WDjZdT"], note: "Helal ve güvenilirdir." },
          { name: "Damla Pastanesi / Damla Plus", city: "Köln", address: "Frankfurter Str 85", phone: "0221 42354278", note: "Açık büfe kahvaltı, pide, lahmacun." },
          { name: "Damla Künefem & Etli Ekmek Bülent Usta", city: "Köln", note: "Keupstraße" },
          { name: "Kilim Pastanesi", city: "Köln", note: "Keupstraße" },
          { name: "Misstanbul (Eski adı: Köşebaşı)", city: "Köln", address: "Ehrenfeldgürtel 79, 50825 Köln", phone: "0221 51090300", mapLinks: ["https://g.co/kgs/X1JdAT"], note: "Eti temiz ve güvenilirdir. Haftasonu kahvaltı fırsatı mevcuttur." },
          { name: "Chickenland", city: "Köln", phone: "01511 2389161", mapLinks: ["https://g.co/kgs/cEEi53"] },
          { name: "Aba Döner", city: "Köln", note: "Keupstr. En kaliteli yaprak dönerdir.", highlight: true },
          { name: "3hs Burger", city: "Köln", address: "Koblenzer Str. 1-9, 50968 Köln" },
          { name: "Hamseefischhaus", city: "Köln", address: "Ostheimerstr 75 51103 KÖLN", phone: "0221 83924596", note: "Balık Restoranı" },
          { name: "Nevizade Restaurant Köln", city: "Köln", address: "Frankfurter Str. 725, 51149 Köln", phone: "0163 3350966", mapLinks: ["https://g.co/kgs/Us6Bmm"] },
          { name: "Fischparadies Kalk", city: "Köln", phone: "0221 16875132" },
          { name: "Veganland Çiğköfte - Porz", city: "Köln", phone: "02203 1024606" },
          { name: "Komagene Köln-Mülheim", city: "Köln", phone: "0221 67036535" },
          { name: "Mangal Restaurant", city: "Köln", note: "Hansaring. Tavsiye edilir." },
          { name: "Meister Kuche", city: "Köln", address: "Venloer Str 302" },
          { name: "Therapy Döner", city: "Köln", mapLinks: ["https://g.co/kgs/EX8rGcZ"], note: "Dom yakınlarında. Tavsiye edilir." },
          { name: "Muhammed Alis Döner", city: "Köln", note: "Hbf yakın" },
          { name: "İnci Balık Restoranı", city: "Köln" },
          { name: "Lord Of Döner", city: "Köln", address: "Venloer Str. 346 50823 Köln", note: "Döner, Lahmacun, İskender. Helal, güvenilir." },
          { name: "Missistanbul Restaurant", city: "Köln", note: "Ehrenfeld. Güvenilir ve nezih. Mescidi var." }
        ]
      },
      {
        city: "Konstanz",
        places: [
          { name: "Kebap Insel", city: "Konstanz", phone: "07531 2849320" },
          { name: "The Bazaar", city: "Konstanz", phone: "0173 5454182", note: "AVM içinde pideci" },
          { name: "Balkan Bäckerei", city: "Konstanz" }
        ]
      },
      {
        city: "Langenfeld",
        places: [
          { name: "Nirvana Restaurant", city: "Langenfeld", mapLinks: ["https://g.co/kgs/TcWKDj"], note: "Açık büfe kahvaltı, ızgara." }
        ]
      },
      {
        city: "Leipzig",
        places: [
          { name: "Brothers Bäckerei & Café", city: "Leipzig", phone: "01520 8527488" },
          { name: "Holzkohle Restaurant İkram Ocakbaşı", city: "Leipzig", phone: "0341 33209195" },
          { name: "Schiller Restaurant & Cafe", city: "Leipzig", phone: "0341 96285777", mapLinks: ["https://goo.gl/maps/TfqMrY4PKvSwrFsh9"], note: "Ev yemekleri" }
        ]
      },
      {
        city: "Limburg",
        places: [
          { name: "Mix doner elz", city: "Limburg" },
          { name: "Mix Restaurant", city: "Limburg" }
        ]
      },
      {
        city: "Lindau",
        places: [
          { name: "Paprika Döner", city: "Lindau", phone: "08382 2747048" }
        ]
      },
      {
        city: "Lörrach",
        places: [
          { name: "Divan Grill Restaurant", city: "Lörrach", phone: "07762 8075488" }
        ]
      },
      {
        city: "Lübbecke",
        places: [
          { name: "Orient Döner", city: "Lübbecke", address: "Lindenstraße 46, 32312 Lübbecke", phone: "+49 5741 809066", mapLinks: ["https://g.co/kgs/icysyj"] }
        ]
      },
      {
        city: "Lübeck",
        places: [
          { name: "Sultan Palast Lübeck", city: "Lübeck", address: "Mühlenstraße 64, 23552 Lübeck" }
        ]
      },
      {
        city: "Ludwigsburg",
        places: [
          { name: "Maydanoz döner", city: "Ludwigsburg", address: "Linden str 20, 71634 Ludwigsburg", mapLinks: ["https://g.co/kgs/EvZrwj"] }
        ]
      },
      {
        city: "Mainz",
        places: [
          { name: "Günay’s Café", city: "Mainz", phone: "01523 1814538", mapLinks: ["https://g.co/kgs/tzMvVp"], note: "Kahvaltı" },
          { name: "Pasha Fisch", city: "Mainz", address: "Neubrunnenstraße 4, 55116 Mainz" }
        ]
      },
      {
        city: "Marburg",
        places: [
          { name: "Somat Döner", city: "Marburg", address: "Lahntor 5, 35037 Marburg" }
        ]
      },
      {
        city: "Mechernich",
        places: [
          { name: "Nirvana Restaurant Mechernich", city: "Mechernich", phone: "02443 9124069" }
        ]
      },
      {
        city: "Minden",
        places: [
          { name: "Orient Döner", city: "Minden", note: "Lübbecke'de olduğu belirtildi" }
        ]
      },
      {
        city: "Moers",
        places: [
          { name: "Hamburger tarzı yer", city: "Moers" }
        ]
      },
      {
        city: "Mönchengladbach",
        places: [
          { name: "Türk simiti olan kahvaltı yeri", city: "Mönchengladbach" },
          { name: "Rheyt Delux Restaurant", city: "Mönchengladbach" },
          { name: "Mister Foood", city: "Mönchengladbach", phone: "02161 6783380" }
        ]
      },
      {
        city: "Münih",
        places: [
          { name: "Mama’s Küche", city: "Münih", address: "Hotterstraße 16, 80331 München", phone: "+49 89 96051949", note: "Ev yemeği. Merkezde tavsiye edilir." },
          { name: "DönerTreff", city: "Münih", address: "Lerchenauer Str. 65-67, 80809 München", phone: "089 35895692" },
          { name: "EssPoint Pide & Grill", city: "Münih", phone: "089 30705408", note: "Tuna marka et kullanıyor" },
          { name: "Master of Kebab", city: "Münih" },
          { name: "Sultanahmet Koftecisi München", city: "Münih", phone: "089 59992960" },
          { name: "VIP Döner Imbiss (Faruk Abi)", city: "Münih", address: "Riesenfeldstraße 77, 80809 München", phone: "+49 89 35474600", note: "Yaprak döner. Helal, temiz, kaliteli." },
          { name: "Inna‘s Gelato", city: "Münih", address: "Helene-Mayer-Ring 6, 80809 München", note: "Dondurma / Pasta" },
          { name: "Fresh Cooking (Murat Abi)", city: "Münih", address: "Carl-Wery-Straße 26-28, 81739 München" },
          { name: "Ctr Chicken (Ümit Abi)", city: "Münih", address: "Willy-Brandt-Platz 5, 81829 München", note: "Riem Arcaden" },
          { name: "Anne's Kitchen", city: "Münih", note: "Ev yemekleri" },
          { name: "Tuna Kasap", city: "Münih", mapLinks: ["https://share.google/ohllH3f4hyr93Iovn"], note: "Döner, Hamburger, Pizza, Pide" },
          { name: "Burak Gurme", city: "Münih" }
        ]
      },
      {
        city: "Münster",
        places: [
          { name: "Belchicken", city: "Münster", address: "Bahnhofstraße 24, 48143 Münster" },
          { name: "Metin's Holzkohlegrill", city: "Münster", address: "Bernhard-Ernst-Straße 7, 48155 Münster", note: "Tuna et kullanıyor" },
          { name: "Dorfgrill", city: "Münster", address: "Münsterstraße 77A, 48167 Münster", note: "Tuna et kullanıyor" },
          { name: "Tayibat Feinkost", city: "Münster" }
        ]
      },
      {
        city: "Neuss",
        places: [
          { name: "Oğuz Döner & Pizza Afsin", city: "Neuss", address: "Kapitelstraße 35, 41460 Neuss", mapLinks: ["https://g.co/kgs/14uRhp"], note: "Yaprak et döner. Şiddetle tavsiye edilir.", highlight: true },
          { name: "Chitir Chicken", city: "Neuss", note: "Nezih bir ortamda yenebilir." }
        ]
      },
      {
        city: "Nürnberg",
        places: [
          { name: "İstanbul Döner Burger Pizza", city: "Nürnberg", phone: "0176 81090813", mapLinks: ["https://goo.gl/maps/SqackLXn37HJyvtr7"] },
          { name: "İstanbul döner", city: "Nürnberg", address: "Martha strasse 40" },
          { name: "Çeşme Restaurant", city: "Nürnberg", mapLinks: ["https://www.cesme-restaurant.de/"], note: "Şoklu kesim." },
          { name: "Mevlana Restaurant", city: "Nürnberg", note: "Plärer" },
          { name: "Ankara Cafe", city: "Nürnberg", note: "Tuna ürünleri" },
          { name: "Turkuaz Restorant", city: "Nürnberg", note: "Döner, çorba, pide. Çok başarılı, şiddetle tavsiye edilir.", highlight: true }
        ]
      },
      {
        city: "Oberhausen",
        places: [
          { name: "Hayat Restaurant", city: "Oberhausen", address: "Marktstraße 14, 46045 Oberhausen" }
        ]
      },
      {
        city: "Osnabrück",
        places: [
          { name: "Mama Döner", city: "Osnabrück", phone: "05401 8370370", note: "Georgsmarienhütte" },
          { name: "Mama's Werk Restaurant & Cafe", city: "Osnabrück", mapLinks: ["https://g.co/kgs/MaiCAKK"] }
        ]
      },
      {
        city: "Paderborn",
        places: [
          { name: "Bomba Dööner", city: "Paderborn", phone: "05251 740672" },
          { name: "Ali abinin lokantası", city: "Paderborn", note: "Rüthen civarı. Köfte, sulu yemek" }
        ]
      },
      {
        city: "Pforzheim",
        places: [
          { name: "Altin Sofra", city: "Pforzheim" },
          { name: "Arkadasch Grillhaus", city: "Pforzheim" }
        ]
      },
      {
        city: "Potsdam",
        places: [
          { name: "Food Home Döner Pizza Burger", city: "Potsdam", phone: "0331 81323170", mapLinks: ["https://g.co/kgs/smPxrkj"] },
          { name: "Restaurant Ali Baba", city: "Potsdam", phone: "0331 20099611", mapLinks: ["https://g.co/kgs/P8nW24N"] }
        ]
      },
      {
        city: "Ramstein",
        places: [
          { name: "Hamit's Döner", city: "Ramstein", phone: "06371 6171000" }
        ]
      },
      {
        city: "Regensburg",
        places: [
          { name: "Köfteci Oğuz", city: "Regensburg", mapLinks: ["https://goo.gl/maps/Siqv2eftk6Uo5P38A"] }
        ]
      },
      {
        city: "Remscheid",
        places: [
          { name: "Yaprak Döner", city: "Remscheid", address: "Freiheit str." }
        ]
      },
      {
        city: "Reutlingen",
        places: [
          { name: "Anteplinin Yeri", city: "Reutlingen", address: "Birnenweg 4, 72766 Reutlingen" }
        ]
      },
      {
        city: "Rüthen",
        places: [
          { name: "Ali abinin lokantası", city: "Rüthen", address: "Möhnetal 50, 59602 Rüthen" }
        ]
      },
      {
        city: "Saarbrücken",
        places: [
          { name: "Dönerci (Adı belirtilmedi)", city: "Saarbrücken" }
        ]
      },
      {
        city: "Scheidegg",
        places: [
          { name: "Kebap & Coffee House", city: "Scheidegg", phone: "08381 8942066" }
        ]
      },
      {
        city: "Siegen",
        places: [
          { name: "Istanbul Sofra", city: "Siegen", phone: "0271 3136670" },
          { name: "Ye-Doy Schnellrestaurant Siegen", city: "Siegen", phone: "0271 3030682" },
          { name: "Favorite Chicken & Ribs", city: "Siegen", address: "Hindenburgstraße 4, 57072 Siegen" },
          { name: "Hallo Memo", city: "Siegen", address: "Weidenauer Straße 187, Weidenau, 57076 Siegen" },
          { name: "First Beef", city: "Siegen", address: "Hauptmarkt 12, 57076 Siegen", phone: "0271 38751370" }
        ]
      },
      {
        city: "Singen",
        places: [
          { name: "Harput Kebap Haus Singen", city: "Singen", phone: "+49 7731 8857769" }
        ]
      },
      {
        city: "Soest",
        places: [
          { name: "Vulkan Döner", city: "Soest", note: "Çarşıda" }
        ]
      },
      {
        city: "Solingen",
        places: [
          { name: "Wunder Eiscafe", city: "Solingen", address: "Goerdeler Straße 17-25 Bachtorcenter, 42651 Solingen", phone: "0212 65003993", mapLinks: ["https://g.co/kgs/arnYx1"], note: "Kahvaltı, Bazlama. Serpme kahvaltısı tavsiye edilir.", price: "Wunder Paşa (2 kişi 34,90€) ve Wunder Klasik (2 kişi 26€)", highlight: true }
        ]
      },
      {
        city: "Stuttgart",
        places: [
          { name: "Aslan Kebap-Haus", city: "Stuttgart", phone: "0711 9120849" },
          { name: "Henpoint", city: "Stuttgart", phone: "0711 55068577", mapLinks: ["https://goo.gl/maps/79UrXQohbJogD14T9"] },
          { name: "Arslan’s Kebap Stuttgart Mitte", city: "Stuttgart", phone: "0711 613333" },
          { name: "Köz Kebap", city: "Stuttgart", mapLinks: ["https://goo.gl/maps/FH6HHbNvVyr54nbZ8"], note: "Kebap çeşitleri. Lezzetli, ekmeği sıcak, pide/lahmacun ücretsiz." },
          { name: "Mister Meal", city: "Stuttgart", note: "Hamburger, namaz kılınabilir" },
          { name: "Dedemoğlu", city: "Stuttgart" },
          { name: "Burger One", city: "Stuttgart", phone: "07144 818194" },
          { name: "Café Blüte", city: "Stuttgart", note: "Kahvaltı" },
          { name: "Restoran (Adı unutuldu)", city: "Stuttgart", address: "Geißstr.1 70173 Stuttgart" },
          { name: "Maydonoz Döner (Bad Canstatt)", city: "Stuttgart", address: "Daimler str 67, 70372 Stuttgart" }
        ]
      },
      {
        city: "Trier",
        places: [
          { name: "Alis Döner", city: "Trier", note: "Hbf'nin önünde" },
          { name: "Berliner Gemüse Döner", city: "Trier" }
        ]
      },
      {
        city: "Ulm",
        places: [
          { name: "farma-plus Apotheke im Kaufland (Abla'nın yeri)", city: "Ulm", phone: "0731 71880130", note: "Kahvaltı, lahmacun, döner" },
          { name: "Babo", city: "Ulm", note: "Berlin döner" }
        ]
      },
      {
        city: "Wiesbaden",
        places: [
          { name: "Sultan Restaurant Wiesbaden", city: "Wiesbaden", phone: "0611 16877850", mapLinks: ["https://g.co/kgs/U7eAHw"], note: "Kahvaltı" },
          { name: "Öz Harput Restaurant", city: "Wiesbaden", address: "Rathausstraße 21, 65203 Wiesbaden" },
          { name: "Doktor's Döner ve İskender", city: "Wiesbaden", address: "Doztheim Str 74", note: "Yaprak Döner. Kendi ekmeğini üretiyor, eti el yapımı. Çok başarılı.", highlight: true }
        ]
      },
      {
        city: "Wissen",
        places: [
          { name: "Bereket Markt", city: "Wissen", address: "Im Kreuztal 70, 57537 Wissen" }
        ]
      },
      {
        city: "Witten",
        places: [
          { name: "DS Pizza", city: "Witten", address: "Schwanenmarkt 2, 58452 Witten", phone: "02302 9646109" }
        ]
      },
      {
        city: "Worms",
        places: [
          { name: "OLIVENHAIN (Mürsel abi)", city: "Worms", note: "Kaufland'dan girince sol taraf" }
        ]
      },
      {
        city: "Wuppertal",
        places: [
          { name: "Belchicken Wuppertal", city: "Wuppertal", phone: "0202 75857171" },
          { name: "El Ensar", city: "Wuppertal", phone: "0202 4597002", note: "Nakşet etini kullanıyor, nezih bir yer." },
          { name: "MEGA GRILL Streetfood", city: "Wuppertal", address: "Wiesenstraße 47A, 42105 Wuppertal", note: "Döner, Pizza, Lahmacun, Burger. Sevilen bir aile dostu tarafından devralındı, güvenle yenebilir." },
          { name: "Troja restoran, Kapadokya restoran, 3HS, Burgerbrothers", city: "Wuppertal" }
        ]
      },
      {
        city: "Würzburg",
        places: [
          { name: "Hisar Imbiss", city: "Würzburg", note: "Tantuni" },
          { name: "Planet Lonch", city: "Würzburg", note: "2 şubesi var, Neudorf daha sakin" }
        ]
      },
      {
        city: "Zweibrücken",
        places: [
          { name: "Dönerci ve Pizzacı", city: "Zweibrücken" }
        ]
      }
    ]
  },
  {
    country: "Hollanda (Netherlands)",
    cities: [
      {
        city: "Almere",
        places: [
          { name: "Bolca döner (Eski adı National döner)", city: "Almere" }
        ]
      },
      {
        city: "Amsterdam",
        places: [
          { name: "Kebaphan amsterdam", city: "Amsterdam", phone: "020 225 8070" },
          { name: "Kebapci Amsterdam", city: "Amsterdam" },
          { name: "Pizza'dam Zuid", city: "Amsterdam", phone: "020 751 3313", mapLinks: ["https://goo.gl/maps/h4sTfavtCZ5bt1Mp7"], note: "Gönül rahatlığıyla yenebilir, paket alınıp parkta yenebilir." },
          { name: "Tarim Uyghur Restaurant - Halal Food", city: "Amsterdam", note: "Lezzetli Uygur yemekleri, el yapımı noodle." },
          { name: "Havzan Restaurant", city: "Amsterdam", note: "Etli ekmek. Çok lezzetlidir." }
        ]
      },
      {
        city: "Eindhoven",
        places: [
          { name: "Altınşiş Kebap", city: "Eindhoven" },
          { name: "Hanedan", city: "Eindhoven" }
        ]
      },
      {
        city: "Groningen",
        places: [
          { name: "Happy Italy Groningen", city: "Groningen", phone: "050 744 0178", note: "Pizzalar helal" },
          { name: "Alsham Restaurant", city: "Groningen", phone: "050 785 3435", note: "Suriyeli restoran" }
        ]
      },
      {
        city: "Rotterdam",
        places: [
          { name: "Ganii kebap", city: "Rotterdam" },
          { name: "Harbii döner", city: "Rotterdam" },
          { name: "Kebap Factory", city: "Rotterdam", mapLinks: ["https://kebapfactory.com/"] }
        ]
      },
      {
        city: "Utrecht",
        places: [
          { name: "Helal burgers & shoarma Kanaleneiland", city: "Utrecht", phone: "030 751 9401" },
          { name: "Bursa Kebap Restaurant", city: "Utrecht", phone: "030 751 9401" },
          { name: "Yunak", city: "Utrecht", phone: "030 889 0005" },
          { name: "Kebap Factory", city: "Utrecht", phone: "030 711 3848" },
          { name: "The Döner Company", city: "Utrecht", phone: "06 31789921" },
          { name: "HFC (Halal Fried Chicken)", city: "Utrecht", phone: "030 760 9797", note: "Tavsiye edilir." },
          { name: "Sultan Pastane", city: "Utrecht" },
          { name: "Turks Restaurant Kasap Utrecht", city: "Utrecht" }
        ]
      },
      {
        city: "Venlo",
        places: [
          { name: "Kardeşler Cağ Kebap (Adana Grillroom)", city: "Venlo", address: "Pepijnstraat 20, 5921 HM Venlo", phone: "+31 77 396 7640", mapLinks: ["https://g.co/kgs/5otzbL"], note: "Orijinal cağ kebabı. Şiddetle tavsiye edilir.", highlight: true },
          { name: "Çiğköftem Venlo", city: "Venlo" }
        ]
      },
      {
        city: "Çeşitli Şehirler",
        places: [
          { name: "Stichting IPN Tavsiye Lokantalar Listesi", city: "Çeşitli", mapLinks: ["https://goo.gl/maps/DGzAjjEv9CYgth5b9"], note: "120'den fazla mekanın bulunduğu liste." }
        ]
      }
    ]
  },
  {
    country: "Belçika (Belgium)",
    cities: [
      {
        city: "Anvers (Antwerpen)",
        places: [
          { name: "Kassap Döner", city: "Anvers", phone: "+32 499 18 16 83", note: "Hakiki yaprak döner, eti kendi takıyor, çok lezzetlidir.", highlight: true },
          { name: "Okka Restaurant", city: "Anvers" },
          { name: "Çiğ köfte Antwerpen", city: "Anvers" },
          { name: "Mevlana Restaurant", city: "Anvers" },
          { name: "Şifa Restaurant", city: "Anvers" }
        ]
      },
      {
        city: "Brügge",
        places: [
          { name: "Chez Albert Waffles", city: "Brügge", note: "Waffel 22 nolu tavsiye" },
          { name: "Belchicken Brugge", city: "Brügge" },
          { name: "Amon Lebanese Restaurant", city: "Brügge" },
          { name: "Oyya Waffels Brugge", city: "Brügge" }
        ]
      },
      {
        city: "Brüksel",
        places: [
          { name: "Belchicken", city: "Brüksel", phone: "+32 2 767 94 11", note: "Finest Fried Chicken. Tavsiye edilir." },
          { name: "Qebaba", city: "Brüksel", note: "Abimize ait güvenilir bir yerdir." },
          { name: "BEYRAN ET (Altın Köfte)", city: "Brüksel", note: "Beyran çorbası meşhurdur." },
          { name: "TekinceTantuni", city: "Brüksel" },
          { name: "Payitaht Kebap", city: "Brüksel" },
          { name: "Levent Börek Künefe", city: "Brüksel" },
          { name: "Lale pide", city: "Brüksel" },
          { name: "Sultans Kebap", city: "Brüksel" },
          { name: "HFC", city: "Brüksel" },
          { name: "Kestane Restaurant", city: "Brüksel", phone: "02 669 66 50", mapLinks: ["https://g.co/kgs/fs3ms6"] },
          { name: "Mandalina", city: "Brüksel", phone: "0467 81 29 26", mapLinks: ["https://g.co/kgs/HQswKv"] }
        ]
      },
      {
        city: "Gent",
        places: [
          { name: "VUSLAT ETLİEKMEK", city: "Gent", note: "Etliekmek. Kesinlikle tavsiye edilir.", highlight: true }
        ]
      },
      {
        city: "Çeşitli Şehirler",
        places: [
          { name: "Belçika Yemek Yenilecek Tavsiye Mekanlar Listesi", city: "Çeşitli", note: "Brüksel, Antwerpen, Gent, Brugge, Genk şehirlerini kapsar." }
        ]
      }
    ]
  },
  {
    country: "Fransa (France)",
    cities: [
      {
        city: "Paris",
        places: [
          { name: "King of döner", city: "Paris", address: "208 Rue Saint-Maur, 75010 Paris" },
          { name: "Restaurant Onur", city: "Paris", phone: "+33 6 98 71 57 42", mapLinks: ["https://goo.gl/maps/Zko2PBTUrFns7YqH8"], note: "Tavsiye edilir." },
          { name: "Black & White Burger", city: "Paris", phone: "+33 1 42 36 90 91", note: "Siyah Hamburger. Helal sertifikasını gösteriyor. Hamburger yenebilir." },
          { name: "İstanbul restorant (Eski zaman)", city: "Paris", address: "1 Rue des Fossés Saint-Jacques, 75005 Paris" },
          { name: "Prodelices", city: "Paris", note: "Açık büfe kahvaltı, pide. Güvenilir cafe." }
        ]
      },
      {
        city: "Strasbourg",
        places: [
          { name: "Doy Doy (Montagne Verte)", city: "Strasbourg", address: "23 Rue de Friedolsheim, 67200 Strasbourg", phone: "09 83 68 23 24", mapLinks: ["https://g.co/kgs/onX6VC"] },
          { name: "Chark", city: "Strasbourg", address: "30 Rte de Bischwiller, 67800 Bischheim", phone: "03 88 33 46 35", mapLinks: ["https://g.co/kgs/HYjS85"] },
          { name: "Edenfood", city: "Strasbourg", mapLinks: ["https://g.co/kgs/qB5gKH"] },
          { name: "Restaurant Le Ksar", city: "Strasbourg", address: "66 Rue du Marechal Foch, 67540 Ostwald", phone: "03 88 65 07 64", mapLinks: ["https://g.co/kgs/etQmYk"], note: "Couscous & spécialités tunisienne" },
          { name: "Le Petit Dakar", city: "Strasbourg", address: "4 Rue Murillo, 67200 Strasbourg", phone: "03 88 30 31 25", mapLinks: ["https://g.co/kgs/QsWdTD"], note: "Sénégalais" },
          { name: "Atelier du Pide", city: "Strasbourg", address: "5 Rue des Drapiers, 67000 Strasbourg", phone: "03 90 24 68 60", mapLinks: ["https://g.co/kgs/RBMaEs"], note: "Hamuru lezzetli, tavsiye edilir." },
          { name: "Ö CLASSIC", city: "Strasbourg", address: "3 Rue du Soleil, 67300 Schiltigheim", phone: "09 84 44 71 14", mapLinks: ["https://g.co/kgs/cEPBPW"] },
          { name: "G La Dalle Strasbourg - Meinau", city: "Strasbourg", address: "284 Av. de Colmar, 67100 Strasbourg", phone: "06 23 80 19 50", mapLinks: ["https://g.co/kgs/UPF4uJ"] },
          { name: "Prodelices", city: "Strasbourg", address: "219 C Rte de Schirmeck, 67200 Strasbourg", phone: "03 88 26 06 86", note: "Kahvaltı / Cafe / Baklava" },
          { name: "Konya Etliekmek (A la table de Mevlana)", city: "Strasbourg", note: "Kumpir - Pide. Pideleri başarılıdır." }
        ]
      }
    ]
  },
  {
    country: "Avusturya",
    cities: [
      {
        city: "Innsbruck",
        places: [
          { name: "Mis Kebap&Döner Innsbruck", city: "Innsbruck", mapLinks: ["https://g.co/kgs/N5Z4z8k"] }
        ]
      },
      {
        city: "Salzburg",
        places: [
          { name: "Lahmacun ve pide yeri", city: "Salzburg" },
          { name: "Saray Restoran", city: "Salzburg", note: "Etli ekmek vs. seçeneği olan yer" }
        ]
      },
      {
        city: "Viyana",
        places: [
          { name: "Ferhat döner", city: "Viyana", note: "Odun ateşinde. Eti helal, Avrupa'da yenilen en iyi döner olduğu söylenir.", highlight: true },
          { name: "Konya Sofrası", city: "Viyana", note: "Thaliastr" },
          { name: "Art Corner Restaurant", city: "Viyana", phone: "+43 1 5051821", mapLinks: ["https://goo.gl/maps/piy2fd3JJUntnFEC9"], note: "Yunan Lokantası (Sadece Balık)" },
          { name: "Simitchi", city: "Viyana", phone: "+43 1 2391981", mapLinks: ["https://g.co/kgs/MGvne4"] },
          { name: "Günay Restaurant", city: "Viyana", note: "Açık büfe kahvaltı. Tavsiye edilir." }
        ]
      }
    ]
  },
  {
    country: "İsviçre",
    cities: [
      {
        city: "Luzern",
        places: [
          { name: "İstanbul döner", city: "Luzern", note: "Bahnhof" }
        ]
      },
      {
        city: "St Gallen",
        places: [
          { name: "Cafe Grund", city: "St Gallen", note: "Kahvaltı, Cafe" }
        ]
      },
      {
        city: "Zürih",
        places: [
          { name: "Goldeneshorn", city: "Zürih", note: "Tavsiye edilir." },
          { name: "Ali haydar kebab", city: "Cenevre", note: "Gare cornavin'e yakın. Döner güzel, çayı demleme." },
          { name: "Dönerci", city: "Zürih", note: "Bahnhofstrasse’ye yakın" },
          { name: "Ustası etli ekmek ustası", city: "Cenevre", note: "Cafe" }
        ]
      }
    ]
  },
  {
    country: "İtalya",
    cities: [
      {
        city: "Floransa",
        places: [
          { name: "Pizzacı/Hamburgerci", city: "Floransa" }
        ]
      },
      {
        city: "Milano",
        places: [
          { name: "Bab al Yemen", city: "Milano", note: "Yemen lokantası. Merkez tren garına yakın. Pilav ve yarım tavuk 13.50€, nezih, içkisiz, temiz.", price: "Yarım tavuk + Pilav: 13.50€" }
        ]
      },
      {
        city: "Pisa",
        places: [
          { name: "Helal pizza/makarna yeri", city: "Pisa" }
        ]
      },
      {
        city: "Roma",
        places: [
          { name: "Makarna Dükkanı", city: "Roma" }
        ]
      },
      {
        city: "Verona",
        places: [
          { name: "Pepperoni pizza", city: "Verona", note: "Fiyata göre en iyi pizza." }
        ]
      }
    ]
  },
  {
    country: "Balkanlar & Diğer",
    cities: [
      {
        city: "Arnavutluk (Tiran)",
        places: [
          { name: "Garden Cafe restaurant (Kadir Bey)", city: "Tiran" },
          { name: "Döner, Hamburger, İskender yenecek yer", city: "Tiran" }
        ]
      },
      {
        city: "Bosna (Saraybosna)",
        places: [
          { name: "Ćevabdžinica Petica Ferhatović", city: "Saraybosna", phone: "+387 33 537-555", note: "Cevabi köftesi. Muhakkak gidilmelidir.", highlight: true },
          { name: "Sač", city: "Saraybosna", phone: "+387 33 239-748", mapLinks: ["https://goo.gl/maps/aMMWWeofCQm94Msu9"], note: "Boşnak Böreği. Önerilir." },
          { name: "Turkuaz Restoran", city: "Saraybosna", phone: "+387 33 628-280" },
          { name: "Mujanić Restaurant", city: "Saraybosna", phone: "033 696-575" },
          { name: "Motel FS", city: "Saraybosna", phone: "033 769-925" },
          { name: "ASDŽ Aščinica", city: "Saraybosna", phone: "033 238-500", note: "Sulu yemek" },
          { name: "Kulin dvor", city: "Saraybosna", phone: "033 433-320" },
          { name: "Kibe Mahala", city: "Saraybosna", phone: "033 441-936" },
          { name: "Esmeralda", city: "Saraybosna", phone: "033 627-745" },
          { name: "Brajlović Restaurant", city: "Saraybosna", phone: "033 626-226" },
          { name: "Bašta Stojčevac", city: "Saraybosna", phone: "033 694-676" }
        ]
      },
      {
        city: "Çekya (Prag)",
        places: [
          { name: "Side Kebab Grill", city: "Prag", phone: "+420 775 238 621" },
          { name: "OSH Uzbek Food in Prague", city: "Prag", address: "Havelská 1/9, 110 00 Staré Město, Czechia", note: "Özbek Lokantası, tavsiye edilir." },
          { name: "İstanbul Kebap", city: "Prag", note: "Tarihi meydana yakın, namaz kılma imkanı var." }
        ]
      },
      {
        city: "Hırvatistan (Zagreb)",
        places: [
          { name: "Restoran Islamski Centar", city: "Zagreb", note: "Cami avlusunda bulunur, kebabı güzeldir." }
        ]
      },
      {
        city: "İspanya (Barcelona)",
        places: [
          { name: "BAM BAM Doner Kebab", city: "Barcelona", note: "Universidad" },
          { name: "Mustafa’s Döner & Grill", city: "Barcelona", address: "Carrer de Ferran, 16, 08002 Barcelona", phone: "933 17 80 90", mapLinks: ["https://g.co/kgs/cbxHx1"] },
          { name: "Metropolitan Cafe", city: "Barcelona", address: "Av. del Paral·lel, 91, 08015 Barcelona", phone: "659 49 85 27", mapLinks: ["https://g.co/kgs/Sa8Hme"] }
        ]
      },
      {
        city: "Macaristan (Budapeşte)",
        places: [
          { name: "Bistro Dash Cafe", city: "Budapeşte" },
          { name: "Szeráj", city: "Budapeşte", note: "Döner, kebap, ev yemekleri" }
        ]
      },
      {
        city: "Polonya (Varşova)",
        places: [
          { name: "BIGSZEF", city: "Varşova" },
          { name: "Simit House - cukiernia turecka", city: "Varşova", note: "Kahvaltı" }
        ]
      },
      {
        city: "Portekiz (Porto)",
        places: [
          { name: "Pakistan Restauranı", city: "Porto" }
        ]
      },
      {
        city: "Slovenya (Lubliyana)",
        places: [
          { name: "Abi Falafel", city: "Lubliyana", phone: "+386 41 640 166" }
        ]
      },
      {
        city: "Yunanistan (Atina)",
        places: [
          { name: "Green Kebab", city: "Atina", phone: "698 590 0073" },
          { name: "Hot kebab", city: "Atina", phone: "21 0956 3341" },
          { name: "AliBabakebap (Bereket)", city: "Atina", phone: "21 0931 6680" },
          { name: "Cappadocia Grill Cafe", city: "Atina", phone: "694 836 8957" }
        ]
      },
      {
        city: "Yunanistan (Selanik)",
        places: [
          { name: "Pitestispolis Istanbul Pidecsi", city: "Selanik", phone: "+30 231 020 9955", mapLinks: ["https://instagram.com/pitestispolis?igshid=YmMyMTA2M2Y="], note: "Halal, Kosher" }
        ]
      }
    ]
  }
];

// II. BÖLÜM: SEYAHAT İPUÇLARI VE FİYATLAR
export const travelTips = [
  {
    title: "Hollanda Gezi Notları (Amsterdam ve Köyler)",
    items: [
      "Park Ücretleri: Amsterdam merkezde saatlik 1,40€. Şehir dışında saatlik 0,10€ olan park yerleri mevcuttur.",
      "Ulaşım: Otoparktan Merkez İstasyonu'na (Central Station) ücretsiz feribot ile geçilebilir.",
      "Aktiviteler: Kayıkla kanal turu (Yetişkin 13€, çocuk 9€) önerilir. Zaanse Schans (Yel Değirmeni Köyü), Edam, Volendam ve Marken gezilmesi tavsiye edilen köylerdir. Giethorn'da elektrikli sandal kiralamak mümkündür (Saati 20€ / 5-6 kişi)."
    ]
  },
  {
    title: "Almanya Dışı Ulaşım Bilgileri",
    items: [
      "Avusturya Otobanları (Vignette): 10 günlük 9,90€; 2 aylık 29€ ücret ödenmesi gerekir.",
      "Lüksemburg Ulaşım: Şehir içinde ulaşım ücretsizdir. Kapalı otopark (Parking R. P. Schuman) saatlik 1€'dur.",
      "Hırvatistan/Karadağ Sınırı: Hırvatistan'dan Karadağ'a geçerken sınır kontrolü vardır."
    ]
  },
  {
    title: "Diğer İpuçları",
    items: [
      "Atina'da Güvenlik Uyarısı: Atina'da gezerken hırsızlara karşı çok dikkatli olunması şiddetle tavsiye edilir. Pasaport ve kimlik gibi değerli eşyaların çalınma vakaları yaşanmıştır.",
      "Hırvatistan Helal Ürünler: Hırvatistan Müslümanlar Helallik Kurumu tarafından yayınlanan helal ambalajlı et ve benzeri ürünlerin listesinin bulunduğu bir katalog mevcuttur.",
      "Yemek Kontrol Uygulamaları: Ürün içeriklerini kontrol etmek için Halalcheck uygulamasından faydalanılması önerilir."
    ]
  },
  {
    title: "Özel Yiyecek Tavsiyeleri & Güvenilir Marketler",
    items: [
      "Nimet: Kuşbaşı et ve kıymaları katkısız ve lezzetlidir. Almanya geneline 150€ üzeri siparişte kargo ücretsizdir.",
      "Paderborn/Rüthen: Metin's Holzkohlegrill Tuna et ürünleri kullanmaktadır.",
      "Berlin: İmren Döner eti genellikle Tuna markasından almaktadır."
    ]
  }
];

export const generalAdvice = [
  "Kendi Ölçülerinizi Kullanın: Paylaşılan bir mekanın orayı mahsursuz kıldığı anlamına gelmediği unutulmamalıdır. Ziyaretçilerin, kendi ölçülerine ve vicdanlarına göre karar vermeleri şiddetle tavsiye edilir.",
  "Teyit Önerisi: Emin olmak için, mekân sahiplerinden sertifika talep edilebilir.",
  "Öncelik Mahsursuzluktur: Birinci öncelik etlerin mahsursuz olmasıdır. Gönül rahatlığıyla, manevi bir rahatsızlık duymadan yemek yenebilecek mekanlar tercih edilmelidir.",
  "Alkol Bulunan Mekanlar: Alternatif alkolsüz mekanlar varsa, alkol satılan mekanların tercih edilmemesi tavsiye edilir.",
  "Domuz Eti ve Ortak Kullanım Riski: Domuz eti satılan yerlerde hijyenik açıdan dikkatli olunması gerekir. Çalışanların aynı bıçağı (slicer), tepsiyi ya da kızartma yağını domuz eti ve diğer ürünler için kullanma riski bulunmaktadır.",
  "Fırın Ürünleri Tercihi: Mümkünse, çapraz bulaşma riskini azaltmak için fırında pişmiş tavuk veya hindi ürünlerinin tercih edilmesi tavsiye edilmektedir."
];