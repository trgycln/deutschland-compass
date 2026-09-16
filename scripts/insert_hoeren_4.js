require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  console.log('------------------------------------------------------------');
  console.log('[ADIM] Hören Aufgabe 4 (Telefonische Mitteilungen 36-40)');
  console.log('Kaynak: Resmi telc B2 Beruf PDF (Sayfa 21, 53 ve 54 Çözümleri)');
  console.log('------------------------------------------------------------');

  // Kontrol et
  const { data: existing } = await supabase
    .from('b2_questions')
    .select('id')
    .eq('modul', 'hoeren')
    .eq('aufgabe', 4);

  if (existing && existing.length > 0) {
    console.log(`[!] Hören Aufgabe 4 zaten mevcut! ID: ${existing[0].id}`);
    return;
  }

  const payload = {
    modul: 'hoeren',
    aufgabe: 4,
    aufgabe_typ: 'multiple_choice',
    thema: 'Telefonische Mitteilungen',
    punkte_max: 15,
    audio_start_sec: 920,
    audio_end_sec: 1220,
    audio_transkript: `Nummer 36: Hallo, hier ist Annie. Mir ist meine Tasche mit meinem Laptop gestohlen worden. Und jetzt habe ich die Unterlagen für die Besprechung nicht mehr. An euch hab' ich eine dringende Bitte: Auf meinem Computer im Büro befinden sich alle Unterlagen zum Sommerkatalog. Könnt ihr mir das alles als E-Mail schicken, damit ich es für das Treffen habe? Und Monika soll bitte sofort im Hotel anrufen. Die sollen noch einen Laptop in den Besprechungsraum stellen. Im Raum brauche ich auch eine Internetverbindung. Danke euch.
Nummer 37: Moin alle zusammen! Julian hier. Wie ihr auf unserem Plan sehen könnt, bin ich für die Frühschicht morgen, also am Samstag, und die Spätschicht am Sonntag eingetragen. Dummerweise habe ich mir gerade die Hand ziemlich verletzt und bin gerade beim Arzt. Er hat schon gesagt, dass ich einige Tage nicht arbeiten darf. Ich hoffe, jemand kann kurzfristig für mich einspringen? Auch wenn ich nichts daran ändern kann, würde ich gern hören, ob es klappt.
Nummer 38: Hallo, hier ist Jessica Maler vom Print Lieferservice. Ihnen wurde heute Vormittag Papier für Ihre Drucker geliefert. Der Lieferant hat leider die Rechnung nicht mitgenommen, die liegt hier nämlich noch. Die kommt dann später noch per Post. Übrigens, wir haben im Moment auch besonders günstige Angebote für unseren Papier-Aboservice, d. h., Ihnen würde in regelmäßigen Abständen dann automatisch neues Papier geliefert. Der Vorteil ist, dass man dann nur einmal im Quartal eine Rechnung erhält und nicht mehr für jede Bestellung bezahlt. Falls Sie daran Interesse haben, melden Sie sich gerne.
Nummer 39: Hallo! Petra hier. Ich war gerade in dem italienischen Restaurant, wo wir unsere Weihnachtsfeier machen wollten. Problem: Erstens haben sie gar keinen Platz für 50 Leute. Zweitens sind sie ausgebucht bis Ende Dezember, so dass wir im Januar feiern müssten. Aber das Steakrestaurant nebenan hat einen Partysaal und noch zwei freie Termine im Dezember, den 15.12. und den 20.12. Das wäre doch eine tolle Idee, oder nicht? Wir müssen aber bald entscheiden. Lass uns morgen darüber sprechen.
Nummer 40: Hi! Die Leute von der Qualitätskontrolle waren gestern da und haben die neuen Maschinen getestet. Leider gibt es ein paar technische Probleme. Die Liste mit den Mängeln hängt am Schwarzen Brett. Wir müssen die Probleme schnell lösen. Es wäre gut, wenn die letzte Schicht mich informiert, was schon erledigt werden konnte. Falls es Probleme bei der Reparatur gibt, sollen sich die Kollegen sofort bei mir melden. Die Qualitätskontrolle wird schon bald wiederkommen, natürlich wie immer unangemeldet. Achtet bitte auch darauf, dass ihr die Schutzkleidung vorschriftsmäßig tragt.`,
    inhalt: {
      anweisung: "Sie hören fünf telefonische Mitteilungen. Zu jeder Mitteilung gibt es eine Aufgabe. Welche Lösung (a, b oder c) passt am besten? Markieren Sie Ihre Lösungen für die Aufgaben 36–40 auf dem Antwortbogen. Sie hören jede Mitteilung einmal.",
      fragen: [
        {
          nummer: 36,
          frage: "Annie",
          optionen: [
            "a) braucht einen Laptop vom Hotel.",
            "b) hat die Unterlagen ins Internet gestellt.",
            "c) hat ihren Laptop im Hotel vergessen."
          ],
          korrekt: "a"
        },
        {
          nummer: 37,
          frage: "Julian",
          optionen: [
            "a) meldet sich für das Wochenende krank.",
            "b) muss in der kommenden Woche zum Arzt.",
            "c) soll am Wochenende einen Kollegen vertreten."
          ],
          korrekt: "a"
        },
        {
          nummer: 38,
          frage: "Jessica Maler",
          optionen: [
            "a) bittet um Bezahlung der Rechnung.",
            "b) liefert nur einmal im Quartal Papier.",
            "c) schickt die Rechnung nach."
          ],
          korrekt: "c"
        },
        {
          nummer: 39,
          frage: "Petra",
          optionen: [
            "a) hat einen Partyraum beim Italiener reserviert.",
            "b) schlägt vor, im Steakhaus zu feiern.",
            "c) verschiebt die Feier auf Januar."
          ],
          korrekt: "b"
        },
        {
          nummer: 40,
          frage: "Michael will, dass die Mitarbeiter",
          optionen: [
            "a) alle Probleme bis morgen lösen.",
            "b) die Reparaturen zeitnah durchführen.",
            "c) sich melden, wenn die Qualitätskontrolle kommt."
          ],
          korrekt: "b"
        }
      ]
    },
    aktiv: true
  };

  const { data: inserted, error: insErr } = await supabase
    .from('b2_questions')
    .insert(payload)
    .select('id, modul, aufgabe, thema');

  if (insErr) {
    console.error('[!] Supabase kayıt hatası:', insErr.message);
    process.exit(1);
  }

  console.log('[✓ BAŞARILI] Hören Aufgabe 4 başarıyla kaydedildi!');
  console.log(`    Kayıt ID : ${inserted[0].id}`);
  console.log(`    Modül    : ${inserted[0].modul.toUpperCase()}`);
  console.log(`    Aufgabe  : ${inserted[0].aufgabe}`);
  console.log(`    Thema    : ${inserted[0].thema}`);
  console.log(`    Puan     : 15 Puan (5 x 3)`);
  console.log(`    Soru Adedi : 5 soru (36, 37, 38, 39, 40)`);
}

main().catch(console.error);
