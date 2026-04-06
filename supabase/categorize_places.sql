-- ====================================================
-- PLACES TABLOSUNU FOOD BİLGİSİNE GÖRE KATEGORİZE ET
-- ====================================================

-- 1. KAFE / ÇAY / KAHVE
UPDATE places SET category = 'cafe'
WHERE (
  food ILIKE '%kahve%' OR 
  food ILIKE '%çay%' OR 
  food ILIKE '%kafe%' OR 
  food ILIKE '%coffee%' OR 
  food ILIKE '%tea%' OR 
  food ILIKE '%espresso%' OR 
  food ILIKE '%cappuccino%' OR 
  food ILIKE '%latte%' OR
  name ILIKE '%cafe%' OR
  name ILIKE '%kahve%' OR
  name ILIKE '%tea%'
);

-- 2. FIRIN / SIMIT / BÖREK / TATLI
UPDATE places SET category = 'bakery'
WHERE (
  food ILIKE '%simit%' OR 
  food ILIKE '%börek%' OR 
  food ILIKE '%pasta%' OR 
  food ILIKE '%ekmek%' OR 
  food ILIKE '%fırın%' OR 
  food ILIKE '%poğaça%' OR
  food ILIKE '%tatlı%' OR
  food ILIKE '%baklava%' OR
  food ILIKE '%kurabiye%' OR
  name ILIKE '%fırın%' OR
  name ILIKE '%bakery%'
);

-- 3. FAST FOOD / HAMBURGER / PIZZA
UPDATE places SET category = 'fast_food'
WHERE (
  food ILIKE '%hamburger%' OR 
  food ILIKE '%pizza%' OR 
  food ILIKE '%burger%' OR
  name ILIKE '%burger%' OR
  name ILIKE '%pizza%'
) AND category != 'cafe' AND category != 'bakery';

-- 4. KASAP / ET
UPDATE places SET category = 'butcher'
WHERE (
  food ILIKE '%kasap%' OR 
  food ILIKE '%kıyma%' OR 
  food ILIKE '%sucuk%' OR
  name ILIKE '%kasap%' OR
  name ILIKE '%metzger%'
) AND category != 'cafe' AND category != 'bakery' AND category != 'fast_food';

-- 5. MARKET / MANAV
UPDATE places SET category = 'market'
WHERE (
  food ILIKE '%market%' OR 
  food ILIKE '%manav%' OR 
  food ILIKE '%bakkal%' OR
  name ILIKE '%market%' OR
  name ILIKE '%manav%' OR
  name ILIKE '%shop%'
) AND category != 'cafe' AND category != 'bakery' AND category != 'fast_food' AND category != 'butcher';

-- ====================================================
-- VERİFİKASYON: KATEGORİ DAĞILIMINI KONTROL ET
-- ====================================================
SELECT category, COUNT(*) as count FROM places GROUP BY category ORDER BY count DESC;

-- ====================================================
-- SONUÇ RAPORU
-- ====================================================
-- Bu script sonrasında hala 'restaurant' kalan mekanlar
-- gerçekten et/döner/kebap/pilav/sulu yemek gibi
-- geleneksel restoran yemekleri sunan yerler olacaktır.

-- Eğer daha fazla hassasiyet istiyorsanız:
-- 1. Bu scripti çalıştırın
-- 2. Sonra admin panelinde manuel kontrol/düzeltmeler yapın
-- 3. Veya aşağıdaki ek kategorileri ekleyin:

-- OPSIYONEL: DÖNER / KEBAP / PILAVı isimlendira göre
-- (Bu kategoriler schema'da yok ama istenirse eklenebilir)
-- UPDATE places SET note = CONCAT(note, ' [DÖNER]') 
-- WHERE name ILIKE '%döner%' AND note NOT LIKE '%DÖNER%';
