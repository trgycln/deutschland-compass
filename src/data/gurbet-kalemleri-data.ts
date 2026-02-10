export interface LiteraryWork {
  id: number;
  title: string;
  author: string;
  date: string;
  type: "Şiir" | "Deneme" | "Öykü" | "Deneme/Şiir" | "Akrostiş Şiir" | "Kısa Öykü" | "Deneme/Not" | "Mensur Şiir" | "Aforizma/Deneme" | "Deneme (Yanıt)";
  tags?: string[];
  content: string;
}

export const literaryWorks: LiteraryWork[] = [
  {
    id: 1,
    title: "Bazen",
    author: "Yusuf Salih",
    date: "06.01.2022",
    type: "Şiir",
    tags: ["Hayat", "İmtihan", "Sabır"],
    content: `Hayat yolu düz değildir. İnişleri çıkışları vardır.
Yunusvari deriz:
Bu yol uzundur
Menzili çoktur
Geçidi yoktur
Derin sular var.

Bu yolda hayal kırıklığı olur.
Bazen öz evladın sözünü dinlemez.
Adem babamız, Nuh babamız misali.
Bazen evin küçük oğlu olursunuz
Çekemez öz kardeşlerin.
Acımadan atarlar kuyuya,
Beklemek düşer.

Kuyudan kurtuldum diye sevinmek de var
Köle olarak satılmak da mukadder
Haksız yere suçlanıp hapse düşmek de
Ve hakkındaki takdiri beklemek de var.`
  },
  {
    id: 2,
    title: "Şimdi Ayrılık Vakti",
    author: "Yusuf Salih",
    date: "06.01.2022",
    type: "Deneme",
    tags: ["Veda", "Gurbet", "Helallik"],
    content: `İnsan,
Bir garip varlık.
Kader,
Bilinmezler yumağı.
Ayrılık,
Herkes için mukadder.

İnsanın kaderinde ayrılık hep oldu.
Cesedimize ruhun üflendiği yerden,
Kalp atışımızın başladığı yerden,
Ana rahminden ağlaya ağlaya ayrılmadık mı?

Yatılı okullara gittik bavulumuzu sürükleyerek.
Anadan, babadan, memleketten ayrıldık.
Ve sevgili dostlarım...
Şimdi ayrılık vakti.
Her kimi bilerek ya da bilmeyerek kırdıysam, haklarını helal etsinler.`
  },
  {
    id: 3,
    title: "Sessiz Sedasız",
    author: "Süleyman Sargın",
    date: "06.01.2022",
    type: "Şiir",
    tags: ["Hicret", "Veda", "Sessizlik"],
    content: `Bir seher vaktinde koparıp bağı
Yurdundan çıktın mı hem de vedasız;
Adım adım arşınlayıp toprağı
Göçtüğün oldu mu sessiz sedasız...

Azminle çatlatıp sabır taşını
Ruhundan fışkırtıp gönül yaşını
Kendi ellerinle saçın başını
Yolduğun oldu mu sessiz sedasız...

Oğlundan kızından hem sevdiğinden
Eşinden dostundan dost bildiğinden
Bir yabancı gibi öz benliğinden
Kaçtığın oldu mu sessiz sedasız...`
  },
  {
    id: 4,
    title: "Ufukta Bir Yol Var",
    author: "Halil (İsimsizler)",
    date: "09.01.2022",
    type: "Şiir",
    tags: ["Yolculuk", "Hüzün", "Gurbet"],
    content: `Ufukta bir yol var dikenli mi dikenli
Görünmez akşamın ufkundaydık sanki
Ne gelen var ne giden bu yokuşlu yollardan
Yalnız deliler gidermiş sonsuzluk kırlarından

Ağrıdı elim kırıldı belim
Sen daha bizden neler istedin
Bilmezdim dostumu düşmanımı
Hepsini ama hepsini öğrendim.

Kuşlar bile ötmez artık bu elde
Yaralarını kimse sarmaz bu dertle
Herkesin derdi kendi kendine
Durulmaz gayri bu yaban ellerde`
  },
  {
    id: 5,
    title: "Dün Gece Rüyamda",
    author: "Halil (İsimsizler)",
    date: "09.01.2022",
    type: "Şiir",
    tags: ["Hapis", "Özlem", "Rüya"],
    content: `Dün gece rüyamda sizleri gördüm
Kalbimdeki ateşi kor gibi yaktım
Dört duvar arası zor imiş bildim
Geçip gidenlerin ardından baktım

Yahu bu dünya zor imiş meğer
Gelip kalması da insana yeter
Duaya muhtaç bir garip seher
Dertlere dermanı eklemiş kader`
  },
  {
    id: 6,
    title: "Anneye",
    author: "Halil (İsimsizler)",
    date: "11.01.2022",
    type: "Şiir",
    tags: ["Anne", "Hasret", "Ayrılık"],
    content: `Karanlığa itildim duyuyor musun
Ellerinden çekildim görüyor musun
Hasretin ile yetindim biliyor musun
Daha gayri dönemem bekliyor musun

Kaç gece oldu daha bakmadım
Geceleri gündüzleri daha saymadım
Bir resim olaydı şuan elimde
Gözlerine bakardım senin dilinle

Ben gittim artık dönemem gayri
Elimi kalbimi veremem gayri
Bir dua ederim gelemem gayri
Bu yolun sonunu bilemem gayri`
  },
  {
    id: 7,
    title: "Bu Muydu Kader?",
    author: "Halil (İsimsizler)",
    date: "12.01.2022",
    type: "Şiir",
    tags: ["Kader", "İşçi", "Sitem"],
    content: `Karanlık çökmeden eve gitmedi
Tüm derdi tasayı içte giderdi
Kimsenin işini yerde komadı
Bu muydu kader bu muydu keder

Sabahın köründe işe giderdi
Çoluğu çocuğu eve dizerdi
Karanlık gece de eve dönerdi
Bu muydu kader bu muydu keder

Anası hastaymış babası yorgun
Kaplıyor içini acı bir vurgun
Memleket hasreti içinde sürgün
Bu muydu kader bu muydu keder`
  },
  {
    id: 8,
    title: "Köprüden Önce Son Çıkış",
    author: "Hava Çiftçiler",
    date: "21.01.2022",
    type: "Öykü",
    tags: ["Ölüm", "Rüya", "Uyarı"],
    content: `Hatice hanım o gün dershanede yoğun bir gün geçirmişti. Ekseri olduğu gibi, ten hanesi yorgundu lakin ruhu alabildiğine dingin ve huzurluydu.

Eşiyle Boğaziçi köprüsüne doğru yola çıktılar. Trafik yoğunluğu tabelasını okudu Okmeydanı'nda: Mecidiyeköy yoğun, Boğaziçi köprüsü akıcı.
Biraz sıkılacaktı ama en azından köprü açıktı. Tabelaları okumaya devam ediyorken göz kapakları da yavaş yavaş ağırlaşıyordu en son 'Köprüden önce son çıkış' tabelasını okudu ve gözleri tamamen kapandı.

Gözlerini açtığında; herkes, sel gibi bir tarafa doğru akıp gidiyordu. Bir zat bir köprünün başında duruyor, sırası geleni geçiriyordu. Ona yaklaştı ve sordu: 'Ben köprüden önceki son çıkışı arıyorum.'
Zat dedi ki: 'Bu ölüm köprüsü... Burada köprüden önce son çıkış yok.'

O anda eşi sesleniyordu: 'Hatice, uyan geldik.'
Hızlı bir nefesle uykudan sıyrıldı. Camı açtı, taze ve derin bir nefes aldı.`
  },
  {
    id: 9,
    title: "Ben Bir Göçmen Kızım",
    author: "Tuba (T.Ö.)",
    date: "09.02.2025",
    type: "Deneme",
    tags: ["Göç", "Kadın", "Meriç"],
    content: `Ben bir göçmen kızım. Hani hep anlatır ya neneler, dedeler zamanında şuradan göçtük de geldik diye. Evet ben o göçmen kızım.

Bir sırt çantasıyla çıktım evden. Ne ana aldım yanıma ne baba. Yanımda tanımadığım insanlar. Sanırsın kırk yıllık akraba. Yalnız çıktım ama yalnız kalmadım. Ölümü göze aldım ama hiç korkmadım.
Tüm o tehlikelerden görünmez bir pelerinle geçtim sanki. İliklerime kadar dua hissettim. Bir sabah ezanıyla veda ettim memleketime. Sonra suya bıraktım boğazımdaki düğümü.

Göç acıtmadı da duyduğum hikayeler acıttı. Başım çatladı dayanamacağımı sandım o yolda ama o hikayeler kadar dayanılmaz değilmiş.
Ben bir göçmen kızım. Zulmün koynundan bilinmeze kaçtım. Yeniden başlamaya, varsa ömrüm niyet ettim.`
  },
  {
    id: 10,
    title: "İlahi Adalet Var",
    author: "Ömer Yaman (Titaniumberatung)",
    date: "14.11.2025",
    type: "Şiir",
    tags: ["Adalet", "Kul Hakkı", "İlahi"],
    content: `Ufak bir menfaatle
Kırdın nice gönüller
Bir tebessüm isterken
Gördü sert yüz, kötü söz

Hakkı için gelende
Baş eğdirdin, beklettin
Eline bir tas suyu
Lütuf gibi gösterdin

Bir işçinin terinde
Bir yetimin duası
Bir annenin ahında
Saklıdır ilahi sır

Bugün güçlü olursun
Sesin çıkar, yerin var
Ama dünya döner hep
Kürsü durmaz yerinde

İlahi adalet var, bil.`
  },
  {
    id: 11,
    title: "Anama Hasret",
    author: "Ömer Yaman (Titaniumberatung)",
    date: "07.10.2025",
    type: "Şiir",
    tags: ["Anne", "Gurbet", "Özlem"],
    content: `Gurbet elde yıllardır,
Yolum ayrı yurdumdan.
Yedi yıl geçti ana,
Koptum sıcak kucaktan.

Her hafta sesin gelir,
Telden gönlüme değer.
Dağlar kadar sevinçle,
Yüreğim huzurla gerilir.

Sen vatanda, ben gurbet,
İkimiz de yalnızız.
Evinde sessiz bahar,
Gönlünde derin bir sızı.

Bir gün gelir elbet biz,
Kavuşuruz vuslata.
Dualarla bekleriz,
Hasret biter bu hayatta.`
  },
  {
    id: 12,
    title: "Yenildim Anne",
    author: "Sezer Bingöl",
    date: "11.11.2025",
    type: "Şiir",
    tags: ["Yenilgi", "Sitem", "Dostluk"],
    content: `Anneciğim!
Evlatlar vardır başarılarını, zaferlerini yazarlar...
Sana yazacak bir başarım, bir ödülüm yok anne.
Keşke olsaydı da, seni sevindirebilseydim.

Sevdiğin, okşadığın saçlarıma aklar düştü anne.
İlk evvel saçlarım hayat mücadelesinde yenildi.
Düşmanlarım hep benden güçlü oldu anne.

Dostlarım da beni hep yendi...
Ben onları dost bilirken onlar beni meydanlarda tuş ettiler.
Arkamda hep bir hançer yarası oldu anne.
Senin anlayacağın hayata yenildim anne...
Yenildim...`
  },
  {
    id: 13,
    title: "Bir Bebeğin Göç Hikayesi",
    author: "Tuba (T.Ö.)",
    date: "18.05.2025",
    type: "Deneme",
    tags: ["Bebek", "Meriç", "Kamp"],
    content: `Bir bebeğin göç hikayesini dinlediniz mi hiç?
Mesela bir seferlik konuşma hakkı olsa ve yolculuğunu anlatsa... Dinlemeye gücünüz var mı? İçtiği şurubun tadını söylese mesela.
Soğuğu, karanlığı, annesinin kalp atışını anlatsa...
Tek iletişim aracı olan ağlamasının nasıl hayati bir risk taşıdığını anlatsa...

Birleşmiş Milletler kampında gördüğüm bebeklerle bol bol oynamak istedim. Her şey o kadar ciddiydi ki... Onların dünyası oyundan ibaret olmalıyken benimle aynı imtihanı yaşıyor olamazlardı.
Hiçbir çocuğun bu kadar çabuk büyümesini istemezdim.`
  },
  {
    id: 14,
    title: "Kar",
    author: "Küçük Ömer",
    date: "21.01.2022",
    type: "Şiir",
    tags: ["Ölüm", "Yalnızlık", "Kış"],
    content: `Karla örtülünce mezarım,
Ürperdim, yalnız kaldım.
Yalnız rahmandan ümitvarım,
Her yanda O'nu ararım.

Ne ses var ne de nefes,
Kimseler yok, dağıldı herkes.
Annecim sende mi bıraktın beni?
Bu keder asıl şimdi yaktı beni.

Umut ekip hüsran biçmişim,
Bir hülya uğruna zehirlenmişim
Beyhude bir ömür tüketmişim
Heyhat!
Aldanmışım
Aldatılmışım.`
  },
  {
    id: 15,
    title: "Babama Mektup 1",
    author: "Halil (İsimsizler)",
    date: "16.01.2022",
    type: "Şiir",
    tags: ["Baba", "Hapis", "Çocuk"],
    content: `Babamı bir gece aldınız benden
Geri vermeyi hiç düşünmeden
Boynumu bükük koydunuz neden
Kalbimi zindana attınız hiç düşünmeden

Babamın suçu nedir de hele
Kimseyi kötülük etmedi bile bile
Ne istediniz ulan bizden her gece
Kapımız kırıp girdiniz eve

Ben gidiyorum artık dönemem gayrı
Babama selam edin sönmesin gayrı
Ben bu dünyayı çekemem gayrı
Kaderimin cilvesini bilemem gayrı`
  }
];

export const authors = Array.from(new Set(literaryWorks.map(w => w.author))).sort();
export const types: Array<"Şiir" | "Deneme" | "Öykü"> = ["Şiir", "Deneme", "Öykü"];
export const allTags = Array.from(new Set(literaryWorks.flatMap(w => w.tags))).sort();
