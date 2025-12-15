export const familyReunionData = {
  hero: {
    title: "Almanya Aile Birleşimi Rehberi",
    description: "Başvurudan Almanya'ya varışa kadar; tecrübelerle harmanlanmış, adım adım yol haritası.",
  },
  warnings: [
    {
      title: "Çok Kritik: 3 Ay Kuralı (Fristwahrende Anzeige)",
      content: "Almanya'daki eş, oturum (iltica kabul) kararını aldıktan sonra en geç 3 ay içinde 'Ön Başvuru Bildirimi' yapmalıdır. Bu yapılmazsa, eşten A1 Almanca ve yüksek gelir şartı istenebilir. Bu hak hayati önem taşır.",
      link: "https://fap.diplo.de/webportal/desktop/index.html#start", // Resmi link örneği
      linkText: "Dışişleri Bakanlığı Portalı"
    }
  ],
  steps: [
    {
      number: 1,
      title: "Ön Başvuru (Almanya Ayağı)",
      description: "Oturum alındıktan sonra yapılacak ilk işlem.",
      items: [
        "Almanya Dışişleri Bakanlığı (Auswärtiges Amt) sitesinden 'Timely Notification' formu doldurulur.",
        "İşlem sonunda kişi sayısının iki katı kadar PDF çıktısı (Barkodlu Belge) alınır.",
        "Bu belgeyi konsolosluğa önden göndermeye gerek yoktur, vize görüşmesine götürülür.",
        "Tavsiye: Garanti olması adına bu belgeyi Ausländerbehörde'ye (Yabancılar Dairesi) mail veya posta ile de gönderin."
      ]
    },
    {
      number: 2,
      title: "Randevu Alma (Türkiye Ayağı)",
      description: "iData üzerinden resmi başvuru süreci.",
      items: [
        "iData üzerinden 'Ulusal Vize' randevusu oluşturulur.",
        "Her birey (eş ve tüm çocuklar) için ayrı ayrı randevu/dosya oluşturulmalıdır.",
        "Bekleme Süreleri (Tahmini): Ankara (6-8 ay), İstanbul (9-10 ay), İzmir (Değişken).",
        "Önemli: Oturum kararı gelmeden randevu tarihi gelirse SAKIN iptal etmeyin. Eksik evrakla gidip ek süre isteyin."
      ]
    },
    {
      number: 3,
      title: "Dosya Hazırlığı (Belgeler)",
      description: "Her aile ferdi için ayrı dosya hazırlanmalıdır.",
      checklist: [
        { label: "Pasaport (En az 6 ay geçerli)", owner: "TR" },
        { label: "2 Adet Başvuru Formu (Videx)", owner: "TR" },
        { label: "Uluslararası Evlenme Kayıt Örneği (Formül B)", owner: "TR" },
        { label: "Uluslararası Doğum Kayıt Örneği (Formül A - Çocuklar için)", owner: "TR" },
        { label: "Tam Tekmil Vukuatlı Nüfus Kayıt Örneği (Tüm aile)", owner: "TR" },
        { label: "Muvafakatname (Noter onaylı + Tercüme)", owner: "TR", note: "Eğer ebeveynlerden biri TR'de kalıyorsa" },
        { label: "Barkodlu Belge (Fristwahrende Anzeige)", owner: "DE" },
        { label: "Oturum Kararı (BAMF Bescheid - İlk 3 sayfa)", owner: "DE" },
        { label: "İkamet Belgesi (Meldebescheinigung - Güncel)", owner: "DE" },
        { label: "Kimlik/Pasaport Fotokopisi (Oturum kartı veya Fiktionsbescheinigung)", owner: "DE" },
        { label: "Sabıka Kaydı (Adli Sicil)", owner: "TR", note: "Politik sebeplerle ceza varsa formda 'Hayır' işaretlenip ek açıklama yapılmalı." }
      ]
    },
    {
      number: 4,
      title: "Görüşme ve Onay Süreci",
      description: "Evrak teslimi sonrası işleyen süreç.",
      items: [
        "Evraklar: Konsolosluk -> Köln Merkezi -> Yerel Yabancılar Dairesi (Ausländerbehörde) rotasını izler.",
        "Ortalama Onay Süresi: 8-12 hafta (Şehre göre değişir).",
        "Ek Evrak: Yabancılar dairesi, Almanya'daki eşten kira kontratı veya maaş bordrosu isteyebilir (İltica kapsamında bu şartlar aranmaz, memura hatırlatılmalıdır).",
        "Vize Harcı: Yetişkin 75€, Çocuk 40€ (Nakit/Euro)."
      ]
    },
    {
      number: 5,
      title: "Almanya'ya Varış ve İlk İşlemler",
      description: "Vize alındı ve Almanya'ya gelindi. Sırada ne var?",
      items: [
        "Anmeldung (İkamet Kaydı): İlk bir kaç gün içinde belediyeye (Rathaus) gidip adres kaydı yapılmalı.",
        "Ausländerbehörde (Oturum): Yabancılar dairesinden randevu alınıp kalıcı oturum kartı başvurusu yapılır.",
        "Jobcenter: Sosyal ofisten çıkış yapılıp ailece Jobcenter'a kayıt olunur (Sağlık sigortası ve yardımlar için).",
        "Okul/Kreş: Çocuklar hemen okula kaydettirilir. Kreş (Kita) için sıraya girilir.",
        "Familienkasse: Çocuk parası başvurusu yapılır."
      ]
    }
  ],
  tips: [
    "Tercüme: Formül A ve B çok dilli olduğu için tercüme gerekmez. Nüfus kayıt örneği için Ankara genelde istemiyor ama tedbiren yaptırılabilir.",
    "Pasaport Süresi: Vize basılacağı için pasaportun en az 6 ay, mümkünse 1 yıl geçerliliği olması iyidir.",
    "İletişim: Süreç tıkandığında Yabancılar Dairesine (Ausländerbehörde) bizzat gitmek veya 'Taahhütlü Posta' (Einschreiben) göndermek süreci hızlandırır."
  ]
};