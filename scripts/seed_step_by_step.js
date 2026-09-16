require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !GEMINI_API_KEY) {
  console.error('[!] HATA: Ortam degiskenleri eksik (.env.local kontrol edin).');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-3.6-flash',
  generationConfig: {
    temperature: 0,
    responseMimeType: 'application/json',
  },
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function seedHoeren4() {
  console.log('====================================================');
  console.log('[ADIM 1 / TEK BOLUM] HÖREN AUFGABE 4');
  console.log('Thema: Telefonische Mitteilungen (Aufgaben 36-40)');
  console.log('====================================================');

  // 1. Zaten var mı kontrol et
  console.log('[1/4] Supabase kontrol ediliyor...');
  const { data: existing, error: checkErr } = await supabase
    .from('b2_questions')
    .select('id, thema')
    .eq('modul', 'hoeren')
    .eq('aufgabe', 4);

  if (checkErr) {
    console.error('Kontrol hatasi:', checkErr.message);
    process.exit(1);
  }

  if (existing && existing.length > 0) {
    console.log(`[!] Hören Aufgabe 4 zaten kayitli! ID: ${existing[0].id}`);
    return;
  }

  // 2. Gemini Prompt hazırla
  console.log('[2/4] Google AI Studio (Gemini 3.6 Flash, temperature: 0) cagriliyor...');
  const prompt = `Du bist ein telc B2 Prüfungsstrukturierer.
Hier sind die Aufgaben und der offizielle Hörtext aus der Prüfung telc Deutsch-Test für den Beruf B2 (Übungstest 1):

AUFGABENBLATT (Hören Teil 4, Aufgaben 36-40):
Sie hören fünf telefonische Mitteilungen. Zu jeder Mitteilung gibt es eine Aufgabe. Welche Lösung (a, b oder c) passt am besten? Markieren Sie Ihre Lösungen für die Aufgaben 36–40 auf dem Antwortbogen. Sie hören jede Mitteilung einmal.
36 Annie
a braucht einen Laptop vom Hotel.
b hat die Unterlagen ins Internet gestellt.
c hat ihren Laptop im Hotel vergessen.
37 Julian
a meldet sich für das Wochenende krank.
b muss in der kommenden Woche zum Arzt.
c soll am Wochenende einen Kollegen vertreten.
38 Jessica Maler
a bittet um Bezahlung der Rechnung.
b liefert nur einmal im Quartal Papier.
c schickt die Rechnung nach.
39 Petra
a hat einen Partyraum beim Italiener reserviert.
b schlägt vor, im Steakhaus zu feiern.
c verschiebt die Feier auf Januar.
40 Michael will, dass die Mitarbeiter
a alle Probleme bis morgen lösen.
b die Reparaturen zeitnah durchführen.
c sich melden, wenn die Qualitätskontrolle kommt.

OFFIZIELLES HÖRTEXT-TRANSKRIPT:
Nummer 36: Hallo, hier ist Annie. Mir ist meine Tasche mit meinem Laptop gestohlen worden. Und jetzt habe ich die Unterlagen für die Besprechung nicht mehr. An euch hab' ich eine dringende Bitte: Auf meinem Computer im Büro befinden sich alle Unterlagen zum Sommerkatalog. Könnt ihr mir das alles als E-Mail schicken, damit ich es für das Treffen habe? Und Monika soll bitte sofort im Hotel anrufen. Die sollen noch einen Laptop in den Besprechungsraum stellen. Im Raum brauche ich auch eine Internetverbindung. Danke euch.
Nummer 37: Moin alle zusammen! Julian hier. Wie ihr auf unserem Plan sehen könnt, bin ich für die Frühschicht morgen, also am Samstag, und die Spätschicht am Sonntag eingetragen. Dummerweise habe ich mir gerade die Hand ziemlich verletzt und bin gerade beim Arzt. Er hat schon gesagt, dass ich einige Tage nicht arbeiten darf. Ich hoffe, jemand kann kurzfristig für mich einspringen? Auch wenn ich nichts daran ändern kann, würde ich gern hören, ob es klappt.
Nummer 38: Hallo, hier ist Jessica Maler vom Print Lieferservice. Ihnen wurde heute Vormittag Papier für Ihre Drucker geliefert. Der Lieferant hat leider die Rechnung nicht mitgenommen, die liegt hier nämlich noch. Die kommt dann später noch per Post. Übrigens, wir haben im Moment auch besonders günstige Angebote für unseren Papier-Aboservice, d. h., Ihnen würde in regelmäßigen Abständen dann automatisch neues Papier geliefert. Der Vorteil ist, dass man dann nur einmal im Quartal eine Rechnung erhält und nicht mehr für jede Bestellung bezahlt. Falls Sie daran Interesse haben, melden Sie sich gerne.
Nummer 39: Hallo! Petra hier. Ich war gerade in dem italienischen Restaurant, wo wir unsere Weihnachtsfeier machen wollten. Problem: Erstens haben sie gar keinen Platz für 50 Leute. Zweitens sind sie ausgebucht bis Ende Dezember, so dass wir im Januar feiern müssten. Aber das Steakrestaurant nebenan hat einen Partysaal und noch zwei freie Termine im Dezember, den 15.12. und den 20.12. Das wäre doch eine tolle Idee, oder nicht? Wir müssen aber bald entscheiden. Lass uns morgen darüber sprechen.
Nummer 40: Hi! Die Leute von der Qualitätskontrolle waren gestern da und haben die neuen Maschinen getestet. Leider gibt es ein paar technische Probleme. Die Liste mit den Mängeln hängt am Schwarzen Brett. Wir müssen die Probleme schnell lösen. Es wäre gut, wenn die letzte Schicht mich informiert, was schon erledigt werden konnte. Falls es Probleme bei der Reparatur gibt, sollen sich die Kollegen sofort bei mir melden. Die Qualitätskontrolle wird schon bald wiederkommen, natürlich wie immer unangemeldet. Achtet bitte auch darauf, dass ihr die Schutzkleidung vorschriftsmäßig tragt.

OFFIZIELLER LÖSUNGSSCHLÜSSEL:
36 a, 37 a, 38 c, 39 b, 40 b

Strukturiere diese Höraufgabe exakt als folgendes JSON (NUR JSON, keine Erklärungen):
{
  "aufgabe_typ": "multiple_choice",
  "thema": "Telefonische Mitteilungen",
  "punkte_max": 15,
  "audio_start_sec": 920,
  "audio_end_sec": 1220,
  "audio_transkript": "<Transkript der Mitteilungen 36-40>",
  "inhalt": {
    "anweisung": "Sie hören fünf telefonische Mitteilungen. Zu jeder Mitteilung gibt es eine Aufgabe. Welche Lösung (a, b oder c) passt am besten? Markieren Sie Ihre Lösungen für die Aufgaben 36–40 auf dem Antwortbogen. Sie hören jede Mitteilung einmal.",
    "fragen": [
      {
        "nummer": 36,
        "frage": "Annie",
        "optionen": ["a) braucht einen Laptop vom Hotel.", "b) hat die Unterlagen ins Internet gestellt.", "c) hat ihren Laptop im Hotel vergessen."],
        "korrekt": "a"
      },
      {
        "nummer": 37,
        "frage": "Julian",
        "optionen": ["a) meldet sich für das Wochenende krank.", "b) muss in der kommenden Woche zum Arzt.", "c) soll am Wochenende einen Kollegen vertreten."],
        "korrekt": "a"
      },
      {
        "nummer": 38,
        "frage": "Jessica Maler",
        "optionen": ["a) bittet um Bezahlung der Rechnung.", "b) liefert nur einmal im Quartal Papier.", "c) schickt die Rechnung nach."],
        "korrekt": "c"
      },
      {
        "nummer": 39,
        "frage": "Petra",
        "optionen": ["a) hat einen Partyraum beim Italiener reserviert.", "b) schlägt vor, im Steakhaus zu feiern.", "c) verschiebt die Feier auf Januar."],
        "korrekt": "b"
      },
      {
        "nummer": 40,
        "frage": "Michael will, dass die Mitarbeiter",
        "optionen": ["a) alle Probleme bis morgen lösen.", "b) die Reparaturen zeitnah durchführen.", "c) sich melden, wenn die Qualitätskontrolle kommt."],
        "korrekt": "b"
      }
    ]
  }
}`;

  let parsed = null;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      console.log(`[2/4] Google AI Studio (Gemini 3.6 Flash, temperature: 0) çağrılıyor (Deneme ${attempt})...`);
      const result = await model.generateContent(prompt);
      parsed = JSON.parse(result.response.text());
      console.log('[3/4] Gemini tarafından yapılandırılmış JSON başarıyla üretildi.');
      break;
    } catch (err) {
      console.warn(`[!] Deneme ${attempt} uyarı: ${err.message?.slice(0, 100)}`);
      if (attempt < 4) {
        console.log(`    ${attempt * 3} saniye bekleniyor...`);
        await sleep(attempt * 3000);
      } else {
        throw err;
      }
    }
  }

  // 3. Supabase'e ekle
  const payload = {
    modul: 'hoeren',
    aufgabe: 4,
    aufgabe_typ: parsed.aufgabe_typ || 'multiple_choice',
    thema: parsed.thema || 'Telefonische Mitteilungen',
    punkte_max: parsed.punkte_max || 15,
    audio_start_sec: 920,
    audio_end_sec: 1220,
    audio_transkript: parsed.audio_transkript,
    inhalt: parsed.inhalt,
    aktiv: true,
  };

  const { data: inserted, error: insertErr } = await supabase
    .from('b2_questions')
    .insert(payload)
    .select('id, modul, aufgabe, thema');

  if (insertErr) {
    console.error('[!] Supabase ekleme hatasi:', insertErr.message);
    process.exit(1);
  }

  console.log(`[✓ BAŞARILI] Hören Aufgabe 4 veritabanına eklendi!`);
  console.log(`    Kayıt ID   : ${inserted[0].id}`);
  console.log(`    Modül      : ${inserted[0].modul.toUpperCase()}`);
  console.log(`    Aufgabe    : ${inserted[0].aufgabe}`);
  console.log(`    Thema      : ${inserted[0].thema}`);

  // 4. Sabit bekleme
  console.log('[4/4] 5 saniye sabit bekleme uygulanıyor...');
  await sleep(5000);
  console.log('[✓] Bekleme tamamlandı. İşlem hazır.');
}

seedHoeren4().catch((err) => {
  console.error('Beklenmeyen hata:', err);
  process.exit(1);
});
