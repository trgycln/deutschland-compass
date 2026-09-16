require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('============================================================');
  console.log('[ADIM 4 / TEK BÖLÜM] SPRECHEN AUFGABE 3 (ARŞİV VARYANTI)');
  console.log('Thema: Großküche – Kühlraum defekt (Situation 40)');
  console.log('Kaynak: 200 Sayfalık Sınav Arşivi (Sayfa 194)');
  console.log('============================================================');

  // 1. Kontrol et
  console.log('[1/4] Supabase kontrol ediliyor...');
  const { data: existing, error: checkErr } = await supabase
    .from('b2_questions')
    .select('id, thema')
    .eq('modul', 'sprechen')
    .eq('aufgabe', 3);

  if (checkErr) {
    console.error('[!] Kontrol hatası:', checkErr.message);
    process.exit(1);
  }

  if (existing && existing.length > 0) {
    console.log(`[!] Sprechen Aufgabe 3 zaten kayıtlı! ID: ${existing[0].id}`);
    return;
  }

  // 2. Veri Yapısını Hazırla
  console.log('[2/4] Gerçek sınav rol oyunu senaryosu yapılandırılıyor...');
  const payload = {
    modul: 'sprechen',
    aufgabe: 3,
    aufgabe_typ: 'gespraech',
    thema: 'Großküche: Der Kühlraum funktioniert nicht',
    punkte_max: 60,
    audio_start_sec: null,
    audio_end_sec: null,
    audio_transkript: null,
    inhalt: {
      anweisung: 'Sie arbeiten zusammen in einer Großküche. Diskutieren Sie mit Ihrer Kollegin / Ihrem Kollegen die akute Notsituation und finden Sie gemeinsam eine schnelle, lösungsorientierte Vorgehensweise.',
      thema_karte: 'Situation: Sie arbeiten in einer Großküche. Der Kühlraum funktioniert nicht. Weil es draußen heiß ist, sind einige empfindliche Lebensmittel bereits verdorben und der Rest muss sofort gekühlt werden.\n\nStichpunkte für das Gespräch:\n• Kühlraum-Defekt: Was sofort tun? Welchen Notdienst / Techniker kontaktieren?\n• Verdorbene Lebensmittel: Entsorgung und woher schnell Ersatz für das Tagesmenü beschaffen?\n• Noch haltbare Ware: Wie und wo vorübergehend kühlen (z. B. Nachbarbetrieb, Kühltruhen)?\n• Aufgabenverteilung: Wer übernimmt welche Aufgaben in den nächsten 30 Minuten?',
      vorbereitungszeit_min: 10,
      sprechzeit_min: 3,
      leitfragen: [
        'Welche Sofortmaßnahmen müssen jetzt in den ersten 15 Minuten ergriffen werden?',
        'Wie lösen wir das Problem mit den verdorbenen Lebensmitteln und dem heutigen Mittagessen?',
        'Wo können wir die noch intakten Vorräte kurzfristig sicher unterbringen?',
        'Wer von uns beiden informiert die Betriebsleitung und wer telefoniert mit den Lieferanten?'
      ],
      bewertungskriterien: {
        aufgabenerledigung: 'Erfüllung der Aufgabenstellung (0-20 P.): Alle vier Leitpunkte aktiv im Gespräch erörtert und klare Beschlüsse gefasst.',
        interaktion: 'Interaktion und Kohärenz (0-20 P.): Konstruktives Eingehen auf die Vorschläge des Partners, Einwände formulieren, Kompromisse aushandeln.',
        sprache: 'Sprachliche Mittel und Korrektheit (0-20 P.): Angemessener Wortschatz (Hygienevorschriften, Kühlkette, Notdienst), flüssige Satzstrukturen, Redemittel zur Problemlösung.'
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

  console.log('[✓ BAŞARILI] Sprechen Aufgabe 3 başarıyla kaydedildi!');
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
