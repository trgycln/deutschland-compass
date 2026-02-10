-- ===================================================================
-- DEUTSCHLAND COMPASS - Gurbet Kalemleri 97 Eseri
-- COMPLETE LITERARY WORKS UPDATE - PARTS 1, 2, 3
-- NORMALIZED TAGS (lowercase + ASCII, no Turkish chars)
-- ===================================================================

-- PART 1: IDs 93, 91, 84 (3 works)
-- PART 2: IDs 92, 65-71, 73 (9 works) 
-- PART 3: IDs 81-96 except above (21 works)
-- TOTAL: 33 works with COMPLETE content + normalized tags

-- ===================================================================
-- INSTRUCTIONS
-- ===================================================================
-- 1. Aç: https://app.supabase.com → Select "deutschland_compass" project
-- 2. Git: SQL Editor (sol tarafta "SQL" butonuna tıkla)
-- 3. Yeni query oluştur (+ New Query)
-- 4. Bu tüm dosyayı kopyala ve SQL editor'e yapıştır
-- 5. RUN (veya Ctrl+Enter) tuşuna bas
-- 6. Tüm sorguları execute et (baştan sona)
-- ===================================================================

-- START PART 1 ========================
-- 93. Çok Sevmek
UPDATE literary_works SET 
  content = E'Ben hep sanırdım ki çok sevmek yeter... Anneni çok sev, babanı, evladını, eşini, vatanını çok sev... Eğer çok seversen her şeye katlanırsın bu sana yeter sanırdım.\nÇok sevmenin hiç kimseye, hiçbir şeye yetmediği bir yerden yazıyorum şimdi...\nÇok sevmek sakıncalı... Hatta yasaklanmalı...\nÇok seversen çok canın yanar...\nÇok seversen inanırsın... İnanan insandan daha aptalı var mı ki şu dünyada... İnanırsan her şeyi mükemmel, muazzam görürsün. O kusursuz olur gözünde, her kimse neyse o yapamaz, yapmaz dersin... O beni seviyor, değer veriyor, o terketmez, o gitmez, o haksızlık etmez, incitici konuşmaz, o beni anlar dersin...\n\nGünün sonunda o çok sevdiklerin en büyük imtihanın olur, en büyük acıları o çok inandığın, güvendiğin var ya, ha işte tam da o yaşatacak, yaşatır... Dünya hali böyle, bu hiç şaşmaz.\nSen çok sevip çok güveneceksin ve sonra yerle bir olacaksın. Sınandıkça iyi ile kötünün arasında bir yerde sürekli arafta savaş vereceksin... Hep arayacaksın, hep emin olmak isteyeceksin ama ilk emin olma duygunu kaybedeceksin... Sonra kendini kaybedeceksin, hiç olacaksın, koca bir hiç...\n\nİsmini unutacaklar önce, sonra anılar silinecek, sonra dünyada kim varsa hepsi seni unutacak. Bir mezara koyacaklar seni, üstüne toprak atacaklar. Yaklaşık 100 yıl sonra uğruna acıdan kıvrandığın hiç kimse olmayacak. Senin evine başkası oturacak, geçtiğin sokaklarda bambaşka insanlar yürüyecek ve sen bunlardan habersiz bambaşka bir alemde olacaksın... Dünya dünya diye yanıp döndüğün hiçbir şey olmayacak... Bu kadar saltanat için bu kadar acı, ayrılık, gözyaşı çok fazla değil mi?\n\nMadem dünya böyle bir yer ve biz de bunu biliyoruz, bu olmadık dertlere takılıp bozuk plak gibi neden hep aynı türküyü söylüyoruz? Sanki Dünya koca bir ağıt yakmış herkes onu dinliyor, sanki herkesin kanı donmuş herkes vahşiliği seyrediyor... Nasıl bir cehennem ateşi kuruldu ki bebekler ölüyor, insanlar cahiliyedeki gibi diri diri gömülüyor... Şimdi gelse Peygamber baksa dünyaya acaba hangi çağı daha çıldırtıcı bulurdu? Cahiliye mi daha insafsız bir dönemdi, yoksa bu çağın insanı olmak daha büyük bir vahşet mi?\nAslında ruhsuz, akılsız olmak için bu çağın insanı olmak yeterli... Çünkü her gün sevgisizlik inşa edilirken, insanlıktan uzak koca bir canavarlığı hiç ses çıkarmadan izliyoruz, sadece izliyoruz... Bilmem ki insanı sevgisizlikten, inançsızlıktan daha çaresiz hissettiren, aciz hissettiren başka bir duygu var mıdır?\n\nElimde olsaydı eğer tüm dünyaya sevgi üniversiteleri, okulları kurardım. Herkese, tüm insanlığa sevmenin, şartsız koşulsuz kalpten sevmenin ne demek olduğunu anlatmak isterdim... İşe yarar mıydı bilmem. Çünkü dedik ya sevgi, inanç, iyilik bunlar tedavülden kalktı artık. Tüm dünyada sevgisizlik inşa ediliyor, nefretten kuleler var, vahşetten senaryolar... Yamyamlara bırakılmış koca bir dünya bu kadar karanlıktan sağ çıkar mı? İnsanlığa, iyiliğe döner mi bilinmez.\nBir yerde her şey tersine dönsün istiyor insan. Bir sabah uyanalım mesela, bir program olsun bütün kötüleri tek tuş ile dünyadan gönderelim uzaya... Kendilerine kötüler şehri kursunlar ve birbirlerini yesinler. Dünya iyilere kalsın, iyi niyetlilere, güzel insanlar bir ömür gülerek umutla yaşasın. Çok güzel olmaz mıydı bu dünya hikayesi mutlu son ile bitsin...\nKimbilir belki son perde daha oynanmadı bilmiyoruz... Belki senaristin bizim bilmediğimiz muhteşem bir son sahne hediyesi vardır...',
  tags = ARRAY['sevgi', 'hayal_kiriligi', 'dunya', 'iyilesme']
WHERE id = 93;

-- 91. Neden Neden Neden
UPDATE literary_works SET 
  content = E'Neden neden neden..... umudu çalınmış çocukların gökyüzünden bahsederiz ki...\nKırdık, kolsuz, kanatsız, babasız bıraktık... Sonra karşılarına geçip ayakta kal, güçlü ol, çok çalış, kimseye güvenme, annen gibi olma, baban, deden gibi olma... Sen başkası ol... Gördüklerini, yaşadıklarını unut... Sen mükemmel ol... Acıyı unut... Vedaları unut... Çalmayan o telefonu unut... Gelmeyen o mektubu unut... Söylenmeyen o son satırı unut... Sen sadece devam et....\n\nUzun bir yol seninki... Kendini yeniden doğurup dünyaya getireceksin... Üstelik bu defa annene de yok tek başınasın... Kendini yeniden doğurmak, büyütmek, adam etmek, kadın etmek, insan etmek zorundasın... Nasılları unut... Keşkeleri unut... Kendini unut...\nYeniden kök salmak için başlaman gerek.... Bu defa farklı, bu defa yolu hiç bilmiyorsun üstelik korkuyorsun.... Bu defa sığınacak ağlayacak seni anlayacak tek bir liman yok... Çocukluk bitti... Gökyüzü bitti... Hayaller bitti.... Uyan uyan uyan.... Yeni bir sen, yeni bir dünya ve ikiniz sonsuz başbaşa, şimdi rolleri tekrar dağıt.... Kim ne olmak istiyorsa öyle olsun... Kim kim kalmak istiyorsa öyle yapsın...\n\nAnılar peki sizi de terketmeliyim uykumun içinde gecenin 3\'ünde hortlayan hesap soran anılar sizi şimdi nereye nasıl gömmeliyim.... Bilinmez, ruh acıdan pişerken ona ne oluyor? O kabz hali, ölüm gibi bir şey ama ölmüyorsun, yaşamıyorsun da. Arada bir yerde arafta bir ömür... Aklın sınırda, gözün gelecekte, ruhun geçmişte çarmıha gerili... Sen şimdi kime, nereye aitsin...\nHiç kimsesiz, hiçbir şeysiz, koca bir hiçsin...',
  tags = ARRAY['sorgulama', 'yeniden_dogus', 'aci']
WHERE id = 91;

-- 84. Acı Kelimesi
UPDATE literary_works SET 
  content = E'Acı kelimesi sadece üç harf... Ama anlamı satırlar sürüyor... Hatta öyle ki gülümsemeler, şakalar birkaç dakika sürerken acıyı anlatış, hikaye ediş şeklimiz, tekrarlarımız çok daha uzun... Peki acı hem ruhsal hem fiziksel olarak bizi bu kadar etkilerken, alt üst ederken acıdan kaçmanın bir yolu var mı?\nBelki var, belki de hiç yok. Tüm kapıları çalsanız bazen yol bulunmaz... Çünkü bizde var olan her şey gibi acımız da bize özgü, bizden dolayı. Ancak ve ancak acının içinden geçtiğimizde dışına çıkıp bakabiliyoruz. Kaçtıkça, yok saydıkça direnç ile daha büyük, daha büyük bir basınç ve acı hissetmeye devam ediyoruz....\nAcı iyi bir öğretmen, dünyadaki bilge olmuş tüm öğretmenlerden daha iyi... Kimi zaman bize kim olduğumuzu, kimi zaman da ne kadar güçlü olduğumuzu gösteren bambaşka bir deneyimleme aracı. İçimizi delerek geçen bazı acıların kelimelerle, kitaplarla, insanlarla bir karşılığı da yok üstelik... Saf ve yalın, sadece var...\n\nAcı bazen bir türkünün eşliğinde size bütün hayatınızı sorgulatacak bir ağıt gibi hem acı hem lezzet verir... Acı da nasıl lezzet olabilir? Bunu da acının tam da ortasından geçenler iyi bilir. Gözyaşının anlamını, olmamışlıkların pişmanlığını, bu dünyanın garip bir yer olduğunu, insanın bir ömür yalnız ama daima Onu Yaradana bağ olduğunu, ancak ve ancak defalarca düşüp düştüğü yerden kalkıp tekrar Ona doğru yürüyenler bilebilir...\nBazen günler saatler geçmez hep ordadır. Yutkunduğunuz her lokmada, yürüdüğünüz adını bilmediğiniz her sokakta, yüzlerini isimlerini gözlerini bilmediğiniz binlerce insanın yüzünde hikayesinde saklı durur... Gördükçe kanadığınız, unuttuğunuzu sandığınız her anda tekrar hatırladığınız günün sonunda onunla arkadaş olup yeni yolları birlikte yürüdüğünüz bambaşka bir duruma evrilir. Bitti gitti sandığınız her yerde bir hortlak gibi tekrar ve ansızın çıkıverir... Alışırsınız, onu artık yakından tanırsınız çünkü başlarda ki kadar çaresiz güçsüz olmazsınız. Onu davet edersiniz bu defa sofranıza, gel biraz muhabbet edelim dersiniz, acelen ne ben kaçmıyorum buradayım dersiniz....\n\nO da rakibini iyi tanır nerden nasıl geleceğini iyi bilir. Ancak sen 360 derece esnemeyi öğrendiğinde, bunu zihnine ruhuna da öğrettiğinde dışarıda dolu da yağsa bir güneş de açsa bir olur. Çünkü ne gelirse gelsin artık sizi yıkamaz, artık tanıştınız dost oldunuz, artık birbirinizi anlıyorsunuz, acı nasıl bal edilir biliyorsunuz.... Acı çok kısa bir kelime, anlamı gövdesinden çok büyük.... Sevgili acı artık bizi terket öğrendik seni dost olduk sende misafir oldun yeter asıl vatanına dön... Bizi huzurumuz ile başbaşa bırak biz hazırız kendimiz olmaya.... Kendini arama yolculuğunda yolda öğrenen, yolun öğrettiği tüm öğrencilere selam olsun..',
  tags = ARRAY['aci', 'iyilesme', 'kabullenme']
WHERE id = 84;

-- VERIFICATION: PART 1
SELECT 'PART 1 RESULTS' as status, COUNT(*) as count FROM literary_works WHERE id IN (93, 91, 84);

-- ===================================================================
-- NOTE: Due to message length, PART 2 and PART 3 SQL is in separate files:
-- - UPDATE_COMPLETE_WORKS_PART2.sql (IDs: 92, 65-71, 73)
-- - UPDATE_COMPLETE_WORKS_PART3_FIXED.sql (IDs: 81-96 partial)
-- 
-- Execute those files sequentially after this one completes
-- ===================================================================
