# Deutschland Compass — Veri Gizliligi ve Anonimlesme Kurallari

Bu dosya **tum gelistirme surecleri icin baglayici** bir kurallar setidir. Bu projeye dokunan her agent, script ve gelistirici bu kurallara uymakla yukumludur.

---

## 1. Temel Ilke: Anonim Platform

Deutschland Compass **tam anonim bir topluluk platformudur**. Sitede hicbir kullanici, Telegram uyesi veya icerik yazarinin gercek adi, soyadi, telefon numarasi, e-posta adresi, Telegram kullanici adi veya IP adresi **acik sekilde ifsa edilemez**.

---

## 2. Telegram Verisi Cekerken Zorunlu Anonimlesme

Telegram uzerinden mesaj, siir, yazi veya herhangi bir icerik cekildiginde:

### 2a. Yazar Adi
- Telegram dan gelen first_name + last_name **dogrudan kullanilamaz**.
- Yazar adi her zaman **anonimlestirilmis** bir versiyona donusturulmelidir:
  - Tercih sirasi:
    1. Icerigin kendisinde yazar acikca bir takma ad/musear bildirmisse onu kullan (AI ile tespit)
    2. Sadece ilk adin bas harfi + soyad yoksa -> "K.Y." gibi initials formati
    3. Gondericinin kimligi kesin olarak bilinemiyorsa -> "Anonim Kalem" kullan
- shared_by, author veya benzeri alanlara **tam isim asla yazilamaz**

### 2b. Metin Icerigi
Tum metin icerigi DB ye yazilmadan once su anonimlesme adimlari gecmelidir:
1. Telefon numaralari -> [Telefon]
2. E-posta adresleri -> [E-posta]
3. Telegram kullanici adlari (@kullanici) -> [Kullanici]
4. IBAN / banka hesap numaralari -> [Hesap No]
5. TC Kimlik numaralari (11 hane) -> [Kimlik No]
6. Tam adres bilgileri -> [Adres]

### 2c. Link ve URL Paylasimlari
- Gurbet Kalemleri linkleri artik ALINMAMAKTADIR. Link sync tamamen devre disi.
- Baska moduller icin de: URL paylasimlarda shared_by alanina tam isim yazilamaz.

---

## 3. Frontend Gosterim Kurallari

- Kullanici adi, profil veya kisisel veri gosteren her yeni bilesen anonymize edilmis olmalidir.
- author / shared_by alanlari arayuzde gosterilirken yukaridaki kurallara uygun olmalidir.
- Tam ad iceren mevcut kayit tespit edilirse derhal "Anonim Kalem" ile guncellenmeli.

---

## 4. Supabase / Veritabani Kurallari

- literary_works.author: Yalnizca anonimlestirilmis deger (initials veya takma ad).
- gurbet_links tablosu: ARTIK KULLANILMIYOR - link sync devre disi.
- Tum tablolarda RLS (Row Level Security) ETKIN olmalidir.
- Yeni tablo olusturulurken mutlaka "Run and enable RLS" secenegi kullanilmalidir.

---

## 5. Python Referans Implementasyonu

```python
import re

def anonymize_author(sender) -> str:
    if sender is None:
        return "Anonim Kalem"
    first = (getattr(sender, "first_name", "") or "").strip()
    last  = (getattr(sender, "last_name",  "") or "").strip()
    initials = ""
    if first:
        initials += first[0].upper() + "."
    if last:
        initials += last[0].upper() + "."
    return initials if initials else "Anonim Kalem"

def anonymize_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r"(\+?\d{1,3}[\-.\s]?)?\(?\d{3}\)?[\-.\s]?\d{3}[\-.\s]?\d{4}", "[Telefon]", text)
    text = re.sub(r"[\w.\-]+@[\w.\-]+\.\w+", "[E-posta]", text)
    text = re.sub(r"@\w+", "[Kullanici]", text)
    text = re.sub(r"\b[A-Z]{2}\d{2}[\s]?(\d{4}[\s]?){4,7}\b", "[Hesap No]", text)
    text = re.sub(r"\b\d{11}\b", "[Kimlik No]", text)
    return text.strip()
```

---

## 6. TypeScript Referans Implementasyonu

```typescript
export function anonymizeText(text: string): string {
  if (!text) return "";
  return text
    .replace(/(\+?\d{1,3}[\-.\s]?)?\(?\d{3}\)?[\-.\s]?\d{3}[\-.\s]?\d{4}/g, "[Telefon]")
    .replace(/[\w.\-]+@[\w.\-]+\.\w+/g, "[E-posta]")
    .replace(/@\w+/g, "[Kullanici]")
    .replace(/\b[A-Z]{2}\d{2}[\s]?(\d{4}[\s]?){4,7}\b/g, "[Hesap No]")
    .replace(/\b\d{11}\b/g, "[Kimlik No]")
    .trim();
}

export function anonymizeAuthor(firstName?: string, lastName?: string): string {
  const initials = [firstName, lastName]
    .filter(Boolean)
    .map(n => n![0].toUpperCase() + ".")
    .join("");
  return initials || "Anonim Kalem";
}
```

---

## 7. Ihlal Durumunda Yapilacaklar

Mevcut veritabaninda tam isim iceren kayit tespit edilirse:
1. UPDATE literary_works SET author = baslangic harfleri formatina güncelle
2. Durumu projeye kaydet ve gelistiriciye raporla.
3. Senkronizasyon scriptini durdur, hatayi gider, tekrar calistir.

---

*Bu dosya .agents/rules/ altinda saklanmakta ve proje genelinde otomatik olarak yuklenmektedir.*
