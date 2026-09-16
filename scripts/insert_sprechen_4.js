require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('============================================================');
  console.log('[ADIM 5 / TEK BÖLÜM] SPRECHEN AUFGABE 4 (ARŞİV VARYANTI)');
  console.log('Thema: Hotel – Kaltes Buffet & WLAN-Problem (Situation 25)');
  console.log('Kaynak: 200 Sayfalık Sınav Arşivi (Sayfa 191)');
  console.log('============================================================');

  // 1. Kontrol et
  console.log('[1/4] Supabase kontrol ediliyor...');
  const { data: existing, error: checkErr } = await supabase
    .from('b2_questions')
    .select('id, thema')
    .eq('modul', 'sprechen')
    .eq('aufgabe', 4);

  if (checkErr) {
    console.error('[!] Kontrol hatası:', checkErr.message);
    process.exit(1);
  }

  if (existing && existing.length > 0) {
    console.log(`[!] Sprechen Aufgabe 4 zaten kayıtlı! ID: ${existing[0].id}`);
    return;
  }

  // 2. Veri Yapısını Hazırla
  console.log('[2/4] Gerçek otel senaryosu yapılandırılıyor...');
  const payload = {
    modul: 'sprechen',
    aufgabe: 4,
    aufgabe_typ: 'gespraech',
    thema: 'Hotel: Kaltes Buffet und WLAN-Ausfall',
    punkte_max: 60,
    audio_start_sec: null,
    audio_end_sec: null,
    audio_transkript: null,
    inhalt: {
      anweisung: 'Sie arbeiten zusammen in einem Hotel. Diskutieren Sie mit Ihrer Kollegin / Ihrem Kollegen die Beschwerden der Hotelgäste und finden Sie gemeinsam sowohl schnelle Sofortlösungen als auch langfristige Maßnahmen zur Qualitätssicherung.',
      thema_karte: 'Situation: Sie arbeiten zusammen an der Rezeption bzw. im Serviceteam eines Hotels. Einige Gäste haben sich beschwert, dass das Essen vom Buffet oft kalt ist. Zudem gibt es auf den Gästezimmern wiederholt kein WLAN und die Gäste können weder arbeiten noch privat surfen.\n\nStichpunkte für das Gespräch:\n• Kaltes Essen am Buffet: Was sofort tun? Küchenleitung kontaktieren, Warmhaltebehälter (Chafing Dishes) prüfen?\n• Kein WLAN auf den Zimmern: IT-Support rufen, Signalverstärker/Repeater installieren?\n• Gästebetreuung: Welche Entschuldigung / Entschädigung (Getränkegutschein, Rabatt) bieten wir an?\n• Langfristige Maßnahmen: Wie stellen wir dauerhaft einen einwandfreien Service sicher?',
      vorbereitungszeit_min: 10,
      sprechzeit_min: 3,
      leitfragen: [
        'Was unternehmen wir sofort gegen das kalte Essen am Buffet und wie binden wir die Küche ein?',
        'Welche technische Lösung schlagen wir für den WLAN-Ausfall auf den Etagen vor?',
        'Wie entschuldigen wir uns professionell bei den unzufriedenen Gästen und bieten Kompensation an?',
        'Welche Qualitätsstandards vereinbaren wir für die Zukunft, damit diese Probleme nicht wieder auftreten?'
      ],
      bewertungskriterien: {
        aufgabenerledigung: 'Erfüllung der Aufgabenstellung (0-20 P.): Alle vier Aspekte (Küche, WLAN, Entschädigung, Prävention) ausführlich besprochen.',
        interaktion: 'Interaktion und Gesprächsführung (0-20 P.): Fließender Dialog, aktives Zuhören, Vorschläge aufgreifen und weiterentwickeln.',
        sprache: 'Sprachliche Mittel und Korrektheit (0-20 P.): Situationsbezogener Fachwortschatz (Hotellerie, Gästezufriedenheit, Reklamationsmanagement), korrekte Grammatik.'
      }
    },
    aktiv: true
  };

  // 3. Supabase'e ekle
  console.log('[3/4] Supabase veritabanına ekleniyor...');
  const { data: inserted, error: insErr } = await supabase
    .from('b2_questions')
    .insert(payload)
    .select('id, modul, aufgabe, thema, aufgabe_typ');

  if (insErr) {
    console.error('[!] Supabase ekleme hatası:', insErr.message);
    process.exit(1);
  }

  console.log('[✓ BAŞARILI] Sprechen Aufgabe 4 başarıyla kaydedildi!');
  console.log(`    Kayıt ID   : ${inserted[0].id}`);
  console.log(`    Modül      : ${inserted[0].modul.toUpperCase()}`);
  console.log(`    Aufgabe    : ${inserted[0].aufgabe}`);
  console.log(`    Tip        : ${inserted[0].aufgabe_typ}`);
  console.log(`    Thema      : ${inserted[0].thema}`);
  console.log(`    Max Puan   : 60 Puan`);

  // 4. Sabit bekleme
  console.log('[4/4] 5 saniye sabit bekleme uygulanıyor...');
  await sleep(5000);
  console.log('[✓] Bekleme tamamlandı.');
}

main().catch(console.error);
