require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('============================================================');
  console.log('[ADIM 2 / TEK BÖLÜM] SCHREIBEN AUFGABE 2');
  console.log('Thema: Forumsbeitrag (Firmenhandy / Kleiderordnung)');
  console.log('Kaynak: Resmi telc B2 Beruf PDF (Sayfa 25, Aufgabe 58)');
  console.log('============================================================');

  // 1. Kontrol et
  console.log('[1/4] Supabase kontrol ediliyor...');
  const { data: existing, error: checkErr } = await supabase
    .from('b2_questions')
    .select('id, thema')
    .eq('modul', 'schreiben')
    .eq('aufgabe', 2);

  if (checkErr) {
    console.error('[!] Kontrol hatası:', checkErr.message);
    process.exit(1);
  }

  if (existing && existing.length > 0) {
    console.log(`[!] Schreiben Aufgabe 2 zaten kayıtlı! ID: ${existing[0].id}`);
    return;
  }

  // 2. Veri Yapısını Hazırla
  console.log('[2/4] Veri hazırlanıyor (Orijinal telc B2 Beruf formatı)...');
  const payload = {
    modul: 'schreiben',
    aufgabe: 2,
    aufgabe_typ: 'forumsbeitrag',
    thema: 'Forumsbeitrag: Firmenhandy oder Kleiderordnung',
    punkte_max: 60,
    audio_start_sec: null,
    audio_end_sec: null,
    audio_transkript: null,
    inhalt: {
      anweisung: 'Wählen Sie eines der folgenden Themen. In Ihrer Firma können sich alle Mitarbeiterinnen und Mitarbeiter in einem Forum miteinander über Neuigkeiten austauschen. Schreiben Sie einen Forumsbeitrag zu Thema A oder B. Begründen Sie Ihre Meinung und nennen Sie passende Beispiele. Gliedern Sie Ihren Text in sinnvolle Abschnitte.',
      situation: 'In Ihrer Firma können sich alle Mitarbeiterinnen und Mitarbeiter in einem Forum miteinander über Neuigkeiten austauschen.',
      schreibanlass: 'Schreiben Sie einen Forumsbeitrag zu Thema A (Firmenhandy für alle) oder Thema B (Kleiderordnung).',
      inhaltspunkte: [
        'Ihre persönliche Meinung zum Thema darlegen',
        'Argumente dafür und dagegen anführen',
        'Erfahrungen oder konkrete Beispiele aus Ihrem Berufsalltag nennen',
        'Einen konstruktiven Vorschlag oder Kompromiss formulieren'
      ],
      hilfsmittel: [
        'Thema A: „Firmenhandy für alle“ – Alle Mitarbeiterinnen und Mitarbeiter sollen ein Firmenhandy bekommen, damit sie immer erreichbar sind – auch am Abend und an den Wochenenden. Privat dürfen sie das Handy auch nutzen.',
        'Thema B: „Kleiderordnung“ – Alle Mitarbeiterinnen und Mitarbeiter sollen einheitliche Kleidung tragen. Die Reinigungskosten soll aber jeder privat übernehmen.'
      ],
      mindestwoerter: 150,
      bewertungskriterien: {
        inhalt: 'Aufgabenbewältigung (0-20 P.): Alle Inhaltspunkte angemessen und detailliert behandelt.',
        kommunikative_gestaltung: 'Textaufbau und Kohärenz (0-20 P.): Logische Absätze, Verknüpfungen (Konnektoren), Forums-Register.',
        formale_richtigkeit: 'Korrektheit (0-20 P.): Grammatik, Orthographie, Satzbau und berufsspezifischer Wortschatz.'
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

  console.log('[✓ BAŞARILI] Schreiben Aufgabe 2 başarıyla kaydedildi!');
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
