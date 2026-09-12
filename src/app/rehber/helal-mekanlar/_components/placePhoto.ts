// Extensive, high-resolution culinary photography catalog
const DONER_PHOTOS = [
  "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&auto=format&fit=crop&q=80"
];

const WRAP_PHOTOS = [
  "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
];

const PIDE_PHOTOS = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&auto=format&fit=crop&q=80"
];

const MEZE_PHOTOS = [
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=80"
];

const KAHVALTI_PHOTOS = [
  "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80"
];

const BAKERY_PHOTOS = [
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=80"
];

const BURGER_PHOTOS = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
];

const BUTCHER_PHOTOS = [
  "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop&q=80"
];

const MARKET_PHOTOS = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80"
];

const RESTAURANT_PHOTOS = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=80"
];

function pickByHash(list: string[], key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  return list[Math.abs(hash) % list.length];
}

export function getPlacePhoto(place: {
  foto_url?: string | null;
  kategori?: string;
  food?: string | null;
  isim?: string;
  sehir?: string;
  id?: string;
}): string {
  if (place.foto_url && place.foto_url.trim().length > 0) {
    return place.foto_url;
  }

  const text = `${place.food || ""} ${place.isim || ""} ${place.kategori || ""}`.toLowerCase();
  const seed = `${place.id || ""}_${place.isim || ""}_${place.sehir || ""}`;

  if (/döner|doner|kebap|kebab|iskender|adana|urfa|köfte|kofte|dürüm|durum/.test(text)) {
    return pickByHash(DONER_PHOTOS, seed);
  }
  if (/tantuni|dürüm|wrap|dürümü/.test(text)) {
    return pickByHash(WRAP_PHOTOS, seed);
  }
  if (/pide|lahmacun|pizza|taş fırın/.test(text)) {
    return pickByHash(PIDE_PHOTOS, seed);
  }
  if (/çiğköfte|cigkofte|çiğ köfte|vegan|meze|salata/.test(text)) {
    return pickByHash(MEZE_PHOTOS, seed);
  }
  if (/kahvaltı|kahvalti|çay|kahve|coffee|simit|poğaça|cafe|kafe/.test(text) || place.kategori === "Kafe") {
    return pickByHash(KAHVALTI_PHOTOS, seed);
  }
  if (/baklava|tatlı|tatli|fırın|firin|pastane|pasta|künefe|dondurma|gelato/.test(text) || place.kategori === "Firin") {
    return pickByHash(BAKERY_PHOTOS, seed);
  }
  if (/burger|chicken|tavuk|hfc|kfc|crispy|patates|fast food/.test(text) || place.kategori === "Fast Food") {
    return pickByHash(BURGER_PHOTOS, seed);
  }
  if (/kasap|metzgerei|et|kıyma|kasabı/.test(text) || place.kategori === "Kasap") {
    return pickByHash(BUTCHER_PHOTOS, seed);
  }
  if (/market|süpermarket|supermarkt|bakkal|feinkost/.test(text) || place.kategori === "Market") {
    return pickByHash(MARKET_PHOTOS, seed);
  }

  return pickByHash(RESTAURANT_PHOTOS, seed);
}
