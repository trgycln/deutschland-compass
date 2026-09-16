import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ============================================================
// POST /api/b2/evaluate-writing
// Schreiben modülü için Gemini ile otomatik değerlendirme
// ============================================================
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { aufgabe, nutzerText, aufgabeTyp } = body as {
    aufgabe: {
      anweisung: string;
      inhaltspunkte: string[];
      mindestwoerter: number;
    };
    nutzerText: string;
    aufgabeTyp: 'beschwerde' | 'forumsbeitrag' | 'email' | 'bericht' | 'telefonnotiz';
  };

  if (!nutzerText || nutzerText.trim().length < 20) {
    return NextResponse.json({ error: 'Metin çok kısa' }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.6-flash',
    generationConfig: {
      temperature: 0,
      responseMimeType: 'application/json',
    },
  });

  const wordCount = nutzerText.trim().split(/\s+/).length;

  const prompt = `Sen resmi bir telc Deutsch B2 Beruf sınav değerlendiricisisin (Prüfer).
Aşağıdaki adayın yazdığı Almanca metni telc B2 Beruf değerlendirme kriterlerine göre nesnel bir şekilde puanlayacaksın.
ANCAK ÇOK ÖNEMLİ KURAL: Adayın gelişebilmesi için değerlendirme açıklamalarını, geri bildirimleri, güçlü yönleri ve iyileştirme önerilerini tamamen TÜRKÇE olarak hazırlayacaksın.

GÖREV (AUFGABE):
${aufgabe.anweisung}

İşlenmesi zorunlu içerik maddeleri (Inhaltspunkte):
${aufgabe.inhaltspunkte.map((p, i) => `${i + 1}. ${p}`).join('\n')}

ADAYIN YAZDIĞI METİN (${wordCount} Kelime):
"""
${nutzerText}
"""

DEĞERLENDİRME KRİTERLERİ (TELC B2 BERUF):
1. İçerik (Inhalt) [0-20 Puan]: İstenen tüm içerik maddeleri eksiksiz ve konuyla uyumlu işlenmiş mi?
2. İletişimsel Düzenleme (Kommunikative Gestaltung) [0-20 Puan]: Metnin akışı mantıklı mı? Hitap, giriş ve kapanış kalıpları amaca uygun mu? Paragraf yapısı ve bağlaçlar doğru kullanılmış mı?
3. Biçimsel Doğruluk (Formale Richtigkeit / Grammatik & Orthographie) [0-20 Puan]: Almanca gramer, fiil çekimleri, artikel/edat kullanımı, cümle dizilimi (Satzbau), kelime hazinesi ve yazım kuralları.
4. Asgari Kelime Sayısı: ${aufgabe.mindestwoerter} kelime (${wordCount < aufgabe.mindestwoerter ? 'YETERSİZ – Puan kırılmalı' : 'Yeterli'}).
*Önemli Not: Eğer metin anlamsız rastgele harflerden, görevle alakasız içerikten veya saçmalıktan ibaretse tüm puanlara 0 verilmeli ve durum Türkçe izah edilmelidir.*
5. Geçme Şartı: Toplam puan en az 36 olmalıdır (>= 36 ise bestanden: true).

TÜM GERİ BİLDİRİMLER MUTLAKA TÜRKÇE OLMALIDIR:
- "inhalt_feedback": İçerik hakkında Türkçe detaylı ve yapıcı açıklama (Hangi noktalar işlendi, hangileri eksik kaldı? 2-3 cümle).
- "kommunikation_feedback": İletişim ve metin yapısı hakkında Türkçe açıklama (Hitap, selamlama, üslup ve akış hakkında 2-3 cümle).
- "grammatik_feedback": Dil bilgisi, imla ve cümle yapısı hakkında Türkçe açıklama (2-3 cümle).
- "staerken": Güçlü yönler (Türkçe maddeler. Eğer aday neredeyse hiçbir şey yazmamışsa veya anlamsızsa ["Belirgin bir güçlü yön tespit edilemedi"] şeklinde belirt).
- "verbesserungen": Adaya rehberlik edecek Türkçe somut iyileştirme önerileri (2-4 madde).
- "gesamtnote": Başarılı ise "Başarılı (Çok İyi)" / "Başarılı (İyi)" / "Başarılı (Geçer)", başarısız ise "Başarısız (Kaldı)".

Bunu aşağıdaki JSON formatında döndür (SADECE JSON, başka açıklama yazma):
{
  "inhalt_punkte": <0-20>,
  "kommunikative_gestaltung_punkte": <0-20>,
  "formale_richtigkeit_punkte": <0-20>,
  "gesamt_punkte": <0-60>,
  "bestanden": <true|false>,
  "wortanzahl": ${wordCount},
  "wortanzahl_ausreichend": <true|false>,
  "inhalt_feedback": "<Türkçe içerik geri bildirimi>",
  "kommunikation_feedback": "<Türkçe iletişim geri bildirimi>",
  "grammatik_feedback": "<Türkçe dil bilgisi geri bildirimi>",
  "staerken": ["<Türkçe güçlü yön 1>", "<Türkçe güçlü yön 2>"],
  "verbesserungen": ["<Türkçe somut öneri 1>", "<Türkçe somut öneri 2>", "<Türkçe somut öneri 3>"],
  "gesamtnote": "<Türkçe genel sonuç ifadesi>"
}`;

  try {
    const result = await model.generateContent(prompt);
    const evaluation = JSON.parse(result.response.text());
    return NextResponse.json(evaluation);
  } catch (e) {
    return NextResponse.json({ error: 'Değerlendirme yapılamadı', detail: String(e) }, { status: 500 });
  }
}
