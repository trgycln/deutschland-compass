require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('============================================================');
  console.log('[ADIM 3 / TEK BÖLÜM] SCHREIBEN AUFGABE 3 (ARŞİV VARYANTI)');
  console.log('Thema: Beschwerdebrief – Die falsche Rechnung (Firma Meier)');
  console.log('Kaynak: 200 Sayfalık Sınav Arşivi (Sayfa 74, Test №140321)');
  console.log('============================================================');

  // 1. Kontrol et
  console.log('[1/4] Supabase kontrol ediliyor...');
  const { data: existing, error: checkErr } = await supabase
    .from('b2_questions')
    .select('id, thema')
    .eq('modul', 'schreiben')
    .eq('aufgabe', 3);

  if (checkErr) {
    console.error('[!] Kontrol hatası:', checkErr.message);
    process.exit(1);
  }

  if (existing && existing.length > 0) {
    console.log(`[!] Schreiben Aufgabe 3 zaten kayıtlı! ID: ${existing[0].id}`);
    return;
  }

  // 2. Veri Yapısını Hazırla
  console.log('[2/4] Gerçek sınav metni yapılandırılıyor...');
  const payload = {
    modul: 'schreiben',
    aufgabe: 3,
    aufgabe_typ: 'beschwerde',
    thema: 'Beschwerde: Die falsche Rechnung (Firma Meier)',
    punkte_max: 60,
    audio_start_sec: null,
    audio_end_sec: null,
    audio_transkript: null,
    inhalt: {
      anweisung: 'Ihre Teamleitung leitet Ihnen die Beschwerde-E-Mail von einem langjährigen Kunden weiter und bittet Sie, im Namen der Firma höflich und lösungsorientiert zu antworten.',
      situation: 'Die Firma „Meier“ ist ein langjähriger und geschätzter Kunde von Ihnen. Der Kunde hat die Ware vollständig erhalten, weist aber auf erhebliche Unstimmigkeiten in der Rechnung hin (falsche Stückzahl bei Pinseln, falsch berechneter Farbtyp, fehlender Stammkunden-Rabatt von 10 %). Ihre Teamleitung bittet Sie, den Kunden über das kürzlich aufgetretene Softwareproblem aufzuklären und eine korrigierte Rechnung zuzusichern.',
      schreibanlass: 'Verfassen Sie eine professionelle Antwort-E-Mail an den Kunden Herrn Schmidt.',
      inhaltspunkte: [
        'Höflicher Dank für die langjährige Treue und Bedauern über die Unannehmlichkeiten mit der Rechnung',
        'Erklärung der Ursache: Technische Computerprobleme im Buchhaltungssystem und deren erfolgreiche Behebung',
        'Konkretes Eingehen auf alle drei Reklamationspunkte (Korrektur auf 100 Stück Pinsel, Neuberechnung der grünen Farbe, Gewährung des üblichen 10 % Rabatts)',
        'Ankündigung und Beilage der korrigierten neuen Rechnung sowie Ausblick auf die weitere reibungslose Zusammenarbeit'
      ],
      hilfsmittel: [
        'Kunden-E-Mail: „...Zunächst wurden statt 100 Stück Pinsel Größe M 200 Stück berechnet. Außerdem wurden 20 Töpfe roter Farbe berechnet, obwohl grüne Farbe (preislich niedriger) geliefert wurde. Zudem fehlte der übliche 10 % Rabatt.“',
        'Teamleitung Anweisung: „...Kümmern Sie sich darum und antworten Sie dem Kunden höflich. Schreiben Sie ihm von unserem Computerproblem und wie wir es gelöst haben. Natürlich bekommt er den Rabatt wie gewohnt.“'
      ],
      mindestwoerter: 150,
      bewertungskriterien: {
        inhalt: 'Aufgabenbewältigung (0-20 P.): Vollständige und präzise Bearbeitung aller vier Inhaltspunkte.',
        kommunikative_gestaltung: 'Textaufbau, Kundenorientierung und Höflichkeit (0-20 P.): Korrekte formelle Anrede/Grußformel, deeskalierender und serviceorientierter Stil.',
        formale_richtigkeit: 'Sprachliche Richtigkeit (0-20 P.): Sichere Grammatik, passender berufssprachlicher Wortschatz (Buchhaltung, Rabatt, Stornierung, Korrektur).'
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

  console.log('[✓ BAŞARILI] Schreiben Aufgabe 3 başarıyla kaydedildi!');
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
