require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('============================================================');
  console.log('[ADIM 6 / TEK BÖLÜM] SCHREIBEN AUFGABE 4 (TELEFONNOTIZ)');
  console.log('Thema: Telefonnotiz – Autovermietung Klein (Frau Schmid)');
  console.log('Kaynak: 200 Sayfalık Sınav Arşivi (Sayfa 108, Teil 3)');
  console.log('============================================================');

  // 1. Kontrol et
  console.log('[1/4] Supabase kontrol ediliyor...');
  const { data: existing, error: checkErr } = await supabase
    .from('b2_questions')
    .select('id, thema')
    .eq('modul', 'schreiben')
    .eq('aufgabe', 4);

  if (checkErr) {
    console.error('[!] Kontrol hatası:', checkErr.message);
    process.exit(1);
  }

  if (existing && existing.length > 0) {
    console.log(`[!] Schreiben Aufgabe 4 zaten kayıtlı! ID: ${existing[0].id}`);
    return;
  }

  // 2. Veri Yapısını Hazırla
  console.log('[2/4] Telefonnotiz verisi yapılandırılıyor...');
  const payload = {
    modul: 'schreiben',
    aufgabe: 4,
    aufgabe_typ: 'telefonnotiz',
    thema: 'Telefonnotiz: Autovermietung Klein (Frau Schmid)',
    punkte_max: 60,
    audio_start_sec: null,
    audio_end_sec: null,
    audio_transkript: `Guten Tag, hier spricht Adriane Schmid von der Autovermietung Klein. Sie haben angerufen und um ein Angebot gebeten. Ich kann Ihnen dieses Mal einen Mittelklassewagen für Sie zum Sonderpreis von 99 Euro pro Tag anbieten. Sonst mieten Sie ja immer einen Kleinwagen. Wir haben schon mehrmals über andere Optionen gesprochen. Sie können das Auto vollgetankt wieder abgeben oder wir machen das kostenpflichtig für Sie. Außerdem wissen Sie ja, dass Sie mit uns die Versicherung abschließen müssen. Bitte rufen Sie mich zurück und sagen Sie mir, ob Sie das Angebot so annehmen. Ich wiederhole nochmal meinen Namen: Adriane Schmid, S-C-H-M-I-D, Telefon 0173 721 572 6. Ich wünsche Ihnen noch einen schönen Tag und freue mich auf Ihren Anruf.`,
    inhalt: {
      anweisung: 'Sie hören die telefonische Nachricht einer Geschäftspartnerin. Erstellen Sie eine strukturierte, übersichtliche Telefonnotiz für Ihre Teamleitung mit allen relevanten Konditionen und den nächsten Schritten.',
      situation: 'Frau Adriane Schmid von der Autovermietung Klein hat angerufen, um auf Ihre Preisanfrage für einen Mietwagen zu antworten.',
      schreibanlass: 'Erstellen Sie eine betriebliche Telefonnotiz.',
      inhaltspunkte: [
        'Anruferin und Kontaktdaten (Frau Adriane Schmid, Autovermietung Klein, Tel.: 0173 721 572 6)',
        'Fahrzeugangebot und Preis (Mittelklassewagen zum Sonderpreis von 99 € pro Tag statt Kleinwagen)',
        'Mietbedingungen (Tankregelung: vollgetankt zurückbringen oder gebührenpflichtiger Tankservice; Versicherung muss abgeschlossen werden)',
        'Erforderliche Maßnahme / Rückruf (Frau Schmid bittet um zeitnahen Rückruf zur Bestätigung oder Ablehnung des Angebots)'
      ],
      hilfsmittel: [
        'Transkript der Sprachnachricht: „...Adriane Schmid von der Autovermietung Klein. Sonderpreis von 99 Euro pro Tag für Mittelklassewagen... vollgetankt wieder abgeben oder kostenpflichtig für Sie... Versicherung abschließen... Rückruf unter 0173 721 572 6.“'
      ],
      mindestwoerter: 80,
      bewertungskriterien: {
        inhalt: 'Vollständigkeit der Notiz (0-20 P.): Alle 4 Angaben (Name/Firma/Tel, Fahrzeug/Preis, Tank/Versicherung, Rückruf) präzise erfasst.',
        kommunikative_gestaltung: 'Übersichtlichkeit und Notizformat (0-20 P.): Tabellarischer oder stichpunktartiger Aufbau (Datum/Uhrzeit, Anrufer, Anliegen, To-Do), sachlich-prägnanter Stil.',
        formale_richtigkeit: 'Sprachliche Richtigkeit (0-20 P.): Korrekte Rechtschreibung von Eigennamen, Zahlen und kaufmännischen Begriffen.'
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

  console.log('[✓ BAŞARILI] Schreiben Aufgabe 4 (Telefonnotiz) başarıyla kaydedildi!');
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
