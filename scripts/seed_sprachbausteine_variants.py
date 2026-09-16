import os
import json
import sys
from dotenv import load_dotenv
from supabase import create_client

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv('.env.local')
supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
service_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not supabase_url or not service_key:
    print("HATA: Supabase env değişkenleri eksik!")
    sys.exit(1)

sb = create_client(supabase_url, service_key)

sprachbausteine_variants = [
    # ==================== TEIL 1 (Lückentext mit Wortpool a-j) ====================
    {
        "modul": "lesen",
        "aufgabe": 5,
        "aufgabe_typ": "cloze_wordpool",
        "thema": "Varyant 1: Bewerbung um ein Praktikum (Hotelkaufmann)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Wörter (a–j) passen in die Lücken 46–51? Für jede Lücke gibt es nur eine richtige Lösung. Vier Wörter passen nicht.",
            "text": "Bewerbung um ein Praktikum\n\nSehr geehrte Damen und Herren,\n\nzunächst bedanke ich mich für das freundliche, informative Telefonat. Wie besprochen übersende ich Ihnen meine Bewerbungsunterlagen. Auf Ihrer Homepage habe ich mich bereits über das Ausbildungskonzept Ihrer Hotelkette informiert und bin [46], in Ihrem Haus vielfältige Einblicke in die Arbeit eines Hotelkaufmannes erhalten zu können.\n\nIch arbeite sehr gerne mit Menschen zusammen. Teamfähigkeit und Flexibilität bringe ich als Voraussetzung mit und interessiere mich [47] die Abläufe in der Hotelverwaltung. Ein Praktikum in der Hotelbranche möchte ich deshalb absolvieren, [48] ich nicht nur im Umgang mit Menschen, [49] auch im Planen und Organisieren meine großen Stärken sehe.\n\nIch erwarte von diesem Praktikum, mein theoretisches Wissen durch praktische Erfahrung weiter vertiefen zu können, [50] mir dann mit meiner Berufswahl endgültig sicher zu sein. [51] überzeuge ich Sie in einem persönlichen Gespräch. Über eine Einladung würde ich mich sehr freuen.\n\nMit freundlichen Grüßen\nAlexander Thiel",
            "wortpool": [
                {"buchstabe": "a", "wort": "bestimmt"},
                {"buchstabe": "b", "wort": "da"},
                {"buchstabe": "c", "wort": "damit"},
                {"buchstabe": "d", "wort": "für"},
                {"buchstabe": "e", "wort": "sicher"},
                {"buchstabe": "f", "wort": "sondern"},
                {"buchstabe": "g", "wort": "um"},
                {"buchstabe": "h", "wort": "über"},
                {"buchstabe": "i", "wort": "wegen"},
                {"buchstabe": "j", "wort": "wie"}
            ],
            "fragen": [
                {"nummer": 46, "frage": "Lücke [46]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "e", "erklaerung": "e) sicher ('bin sicher, ... erhalten zu können')"},
                {"nummer": 47, "frage": "Lücke [47]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "d", "erklaerung": "d) für ('interessiere mich für die Abläufe')"},
                {"nummer": 48, "frage": "Lücke [48]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "b", "erklaerung": "b) da (Kausalsatz: 'da ich nicht nur...')"},
                {"nummer": 49, "frage": "Lücke [49]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "f", "erklaerung": "f) sondern (Doppelkonjunktion: 'nicht nur ..., sondern auch...')"},
                {"nummer": 50, "frage": "Lücke [50]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "g", "erklaerung": "g) um (Finaler Infinitivsatz: 'um ... zu sein')"},
                {"nummer": 51, "frage": "Lücke [51]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "a", "erklaerung": "a) bestimmt ('Bestimmt überzeuge ich Sie...')"}
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 5,
        "aufgabe_typ": "cloze_wordpool",
        "thema": "Varyant 2: Arbeitsvertrag – Jobticket und Einsatzort (Irina Lopez)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Wörter (a–j) passen in die Lücken 46–51? Für jede Lücke gibt es nur eine richtige Lösung. Vier Wörter passen nicht.",
            "text": "Arbeitsvertrag\n\nSehr geehrter Herr Salzmann,\n\nmeinen Arbeitsvertrag habe ich heute mit der Post erhalten und möchte mich hiermit herzlich bedanken. Ich habe ihn ausführlich geprüft und [46] haben sich noch einige Fragen ergeben.\n\nBei meinem Vorstellungsgespräch hatte Frau Ott mir mündlich ein Jobticket zugesagt, das im Vertrag nicht erwähnt wird. Kann ich [47] fest mit dieser Zusatzleistung rechnen?\n\nMeine zweite Frage bezieht sich auf den Arbeitsort. Im Vertrag steht, [48] Mitarbeiter bei Bedarf auch an einem anderen Ort in Deutschland eingesetzt werden können. Gilt das auch für meine Stelle? Das war mir nicht bewusst und wäre [49] meiner familiären Situation momentan schwierig. [50] ich, wie Sie wissen, zwei schulpflichtige Kinder habe, wäre ein Umzug für meine Familie nicht möglich.\n\nIch freue mich auf Ihre Rückmeldung und schicke Ihnen den Vertrag unverzüglich unterschrieben zurück, [51] diese Punkte geklärt sind.\n\nIch freue mich auf meinen Arbeitsbeginn am 1. Juli.\n\nMit freundlichen Grüßen\nIrina Lopez",
            "wortpool": [
                {"buchstabe": "a", "wort": "aufgrund"},
                {"buchstabe": "b", "wort": "da"},
                {"buchstabe": "c", "wort": "dabei"},
                {"buchstabe": "d", "wort": "damit"},
                {"buchstabe": "e", "wort": "dass"},
                {"buchstabe": "f", "wort": "dennoch"},
                {"buchstabe": "g", "wort": "indem"},
                {"buchstabe": "h", "wort": "ob"},
                {"buchstabe": "i", "wort": "obwohl"},
                {"buchstabe": "j", "wort": "sobald"}
            ],
            "fragen": [
                {"nummer": 46, "frage": "Lücke [46]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "c", "erklaerung": "c) dabei ('und dabei haben sich noch einige Fragen ergeben')"},
                {"nummer": 47, "frage": "Lücke [47]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "f", "erklaerung": "f) dennoch ('Kann ich dennoch fest mit dieser Zusatzleistung rechnen?')"},
                {"nummer": 48, "frage": "Lücke [48]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "e", "erklaerung": "e) dass (Objektsatz: 'Im Vertrag steht, dass...')"},
                {"nummer": 49, "frage": "Lücke [49]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "a", "erklaerung": "a) aufgrund (Präposition mit Genitiv: 'aufgrund meiner familiären Situation')"},
                {"nummer": 50, "frage": "Lücke [50]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "b", "erklaerung": "b) da (Kausale Satzverbindung: 'Da ich ... schulpflichtige Kinder habe')"},
                {"nummer": 51, "frage": "Lücke [51]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "j", "erklaerung": "j) sobald (Temporale Subjunktion: 'sobald diese Punkte geklärt sind')"}
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 5,
        "aufgabe_typ": "cloze_wordpool",
        "thema": "Varyant 3: Arbeitsvertrag – Vorbereitung & Kleidergröße (Philipp Kunz)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Wörter (a–j) passen in die Lücken 46–51? Für jede Lücke gibt es nur eine richtige Lösung. Vier Wörter passen nicht.",
            "text": "Arbeitsvertrag\n\nSehr geehrte Frau Klingenberg,\n\nvielen Dank für die positive Nachricht, bereits zum ersten März bei Ihnen anfangen zu dürfen. Hierüber freue ich mich wirklich sehr. In der Anlage sende ich Ihnen den unterschriebenen Arbeitsvertrag [46]. Nun bin ich gespannt auf die zukünftige Arbeit und den ersten Tag an meinem neuen Arbeitsplatz.\n\nAber bis [47] ist ja noch etwas Zeit und deshalb wollte ich Sie fragen, wie ich mich auf meine neue Tätigkeit vorbereiten kann. Vielleicht können Sie mir fachspezifische Internetseiten empfehlen, mit [48] Hilfe ich mich intensiver mit den Produkten vertraut machen kann.\n\nBei dem Vorstellungsgespräch sprachen Sie [49], dass Sie mir die Arbeitskleidung stellen. Benötigen Sie [50] meine Kleider- und Schuhgrößen?\n\nDas erforderliche ärztliche Attest vom Gesundheitsamt bringe ich, [51] besprochen, zum Arbeitsantritt mit.\n\nSollten Sie sonst irgendetwas von mir benötigen, können Sie mich natürlich gern kontaktieren.\n\nMit freundlichen Grüßen\nPhilipp Kunz",
            "wortpool": [
                {"buchstabe": "a", "wort": "ansonsten"},
                {"buchstabe": "b", "wort": "dafür"},
                {"buchstabe": "c", "wort": "dahin"},
                {"buchstabe": "d", "wort": "davon"},
                {"buchstabe": "e", "wort": "deren"},
                {"buchstabe": "f", "wort": "dessen"},
                {"buchstabe": "g", "wort": "zurück"},
                {"buchstabe": "h", "wort": "was"},
                {"buchstabe": "i", "wort": "wie"},
                {"buchstabe": "j", "wort": "anbei"}
            ],
            "fragen": [
                {"nummer": 46, "frage": "Lücke [46]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "g", "erklaerung": "g) zurück ('sende ich Ihnen ... den Vertrag zurück')"},
                {"nummer": 47, "frage": "Lücke [47]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "c", "erklaerung": "c) dahin ('bis dahin ist ja noch etwas Zeit')"},
                {"nummer": 48, "frage": "Lücke [48]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "e", "erklaerung": "e) deren (Relativpronomen Genitiv Plural: 'mit deren Hilfe')"},
                {"nummer": 49, "frage": "Lücke [49]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "d", "erklaerung": "d) davon ('sprachen Sie davon, dass...')"},
                {"nummer": 50, "frage": "Lücke [50]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "b", "erklaerung": "b) dafür ('Benötigen Sie dafür meine Kleider- und Schuhgrößen?')"},
                {"nummer": 51, "frage": "Lücke [51]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "i", "erklaerung": "i) wie ('wie besprochen')"}
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 5,
        "aufgabe_typ": "cloze_wordpool",
        "thema": "Varyant 4: Kündigung – Umzug nach Süddeutschland (Melanie Sommer)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Wörter (a–j) passen in die Lücken 46–51? Für jede Lücke gibt es nur eine richtige Lösung. Vier Wörter passen nicht.",
            "text": "Kündigung\n\nSehr geehrte Frau Schneider,\n\nich teile Ihnen mit, dass ich mein Arbeitsverhältnis zum 31.03. fristgerecht kündige, weil mein Mann am 01.05. [46] einer neuen Tätigkeit in Süddeutschland beginnt und die ganze Familie im April dorthin umziehen wird. Dieser Schritt ist für mich nicht leicht, ich war [47] immer sehr gerne hier tätig.\n\nIch habe noch einige Fragen [48] den Formalitäten: Bitte teilen Sie mir mit, bis wann und wo ich den Firmenwagen abgeben und ob ich die Daten von meinem Firmenlaptop löschen soll. [49] bitte ich Sie um ein Zwischenzeugnis, da ich mich jetzt schon um eine neue Stelle bewerben möchte. Würden Sie mir bitte auch mitteilen, ob mir mein Arbeitszeugnis am letzten Arbeitstag ausgehändigt oder [50] Nachhinein zugeschickt wird?\n\nIch bedanke [51] für die interessante Zeit in Ihrem Unternehmen und die fruchtbare Zusammenarbeit.\n\nMit freundlichen Grüßen\nMelanie Sommer",
            "wortpool": [
                {"buchstabe": "a", "wort": "am"},
                {"buchstabe": "b", "wort": "außerdem"},
                {"buchstabe": "c", "wort": "bis"},
                {"buchstabe": "d", "wort": "deshalb"},
                {"buchstabe": "e", "wort": "ihnen"},
                {"buchstabe": "f", "wort": "im"},
                {"buchstabe": "g", "wort": "mich"},
                {"buchstabe": "h", "wort": "mit"},
                {"buchstabe": "i", "wort": "nämlich"},
                {"buchstabe": "j", "wort": "zu"}
            ],
            "fragen": [
                {"nummer": 46, "frage": "Lücke [46]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "h", "erklaerung": "h) mit ('beginnt mit einer neuen Tätigkeit')"},
                {"nummer": 47, "frage": "Lücke [47]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "i", "erklaerung": "i) nämlich ('ich war nämlich immer sehr gerne hier tätig')"},
                {"nummer": 48, "frage": "Lücke [48]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "j", "erklaerung": "j) zu ('Fragen zu den Formalitäten')"},
                {"nummer": 49, "frage": "Lücke [49]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "b", "erklaerung": "b) außerdem ('Außerdem bitte ich Sie um ein Zwischenzeugnis')"},
                {"nummer": 50, "frage": "Lücke [50]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "f", "erklaerung": "f) im ('oder im Nachhinein zugeschickt wird')"},
                {"nummer": 51, "frage": "Lücke [51]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "g", "erklaerung": "g) mich (Reflexivpronomen: 'Ich bedanke mich')"}
            ]
        }
    },

    # ==================== TEIL 2 (Multiple Choice a, b, c je Lücke) ====================
    {
        "modul": "lesen",
        "aufgabe": 6,
        "aufgabe_typ": "cloze_multiple_choice",
        "thema": "Varyant 1: Stornierung des Auftrages – Kaffeevollautomaten",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Option (a, b oder c) passt am besten in die Lücken 52–57?",
            "text": "Stornierung des Auftrages mit Nr. RB 2876/20\n\nSehr geehrte Damen und Herren,\n\nnach dem Besuch Ihres Vertriebsmitarbeiters entschieden wir uns für [52] von zwei Kaffeevollautomaten für unsere Krankenhauskantine.\n\nUnsere Auftragserteilung erfolgte in KW 12. Wir [53] eine Auftragsbestätigung mit Liefertermin in KW 16.\n\n[54] der Lieferfrist haben wir Sie telefonisch mehrmals eindringlich darauf hingewiesen, dass wir die Maschinen dringend benötigen.\n\n[55] wir uns in KW 18 und haben die Lieferung immer noch nicht erhalten.\n\nWir räumen Ihnen letztmalig eine Lieferfrist bis Ablauf der KW 20 ein. Sollte die Ware bis dahin [56] sein, machen wir von unserem Widerrufsrecht Gebrauch und stornieren unsere Bestellung. Wir bitten um Ihr Verständnis.\n\nBitte schicken Sie uns umgehend eine [57].\n\nMit freundlichen Grüßen\nEva Al Hossan",
            "fragen": [
                {
                    "nummer": 52,
                    "frage": "Lücke [52]",
                    "optionen": ["a) einen Auftrag", "b) eine Bestellung", "c) eine Anforderung"],
                    "korrekt": "b",
                    "erklaerung": "b) 'entschieden wir uns für eine Bestellung von zwei Kaffeevollautomaten'"
                },
                {
                    "nummer": 53,
                    "frage": "Lücke [53]",
                    "optionen": ["a) bekommen danach", "b) bestellten dann", "c) erhielten daraufhin"],
                    "korrekt": "c",
                    "erklaerung": "c) 'Wir erhielten daraufhin eine Auftragsbestätigung'"
                },
                {
                    "nummer": 54,
                    "frage": "Lücke [54]",
                    "optionen": ["a) Beim Verlauf", "b) Nach Ablauf", "c) Vor dem Zulauf"],
                    "korrekt": "b",
                    "erklaerung": "b) 'Nach Ablauf der Lieferfrist'"
                },
                {
                    "nummer": 55,
                    "frage": "Lücke [55]",
                    "optionen": ["a) Mittlerweile befinden", "b) Zurzeit haben", "c) Zwischenzeitlich sind"],
                    "korrekt": "a",
                    "erklaerung": "a) 'Mittlerweile befinden wir uns in KW 18'"
                },
                {
                    "nummer": 56,
                    "frage": "Lücke [56]",
                    "optionen": ["a) nicht eingetroffen", "b) nicht erbracht", "c) nicht erhalten"],
                    "korrekt": "a",
                    "erklaerung": "a) 'Sollte die Ware bis dahin nicht eingetroffen sein'"
                },
                {
                    "nummer": 57,
                    "frage": "Lücke [57]",
                    "optionen": ["a) schriftliche Auftragsbestätigung", "b) schriftliche Kündigung", "c) schriftliche Stellungnahme"],
                    "korrekt": "c",
                    "erklaerung": "c) 'eine schriftliche Stellungnahme'"
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 6,
        "aufgabe_typ": "cloze_multiple_choice",
        "thema": "Varyant 2: Zahlungserinnerung und Mahnung (Herr Batic)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Option (a, b oder c) passt am besten in die Lücken 52–57?",
            "text": "Zahlungserinnerung\n\nSehr geehrter Herr Batic,\n\nbei der regelmäßigen Überprüfung unserer Buchhaltung haben wir festgestellt, dass der Betrag für die Rechnung Nr. 8834 vom 15.10. [52] ist.\n\nSicherlich handelt es sich hierbei nur um ein [53], weshalb wir Sie höflich an den offenen Rechnungsbetrag in Höhe von 1.450 € erinnern möchten.\n\nBitte [54] Sie den fälligen Betrag innerhalb der nächsten zehn Tage auf das unten genannte Konto.\n\nSollten Sie die Überweisung [55] veranlasst haben, betrachten Sie dieses Schreiben bitte als [56].\n\nFür Rückfragen stehen wir Ihnen jederzeit gerne zur [57].\n\nMit freundlichen Grüßen\nBuchhaltung Team",
            "fragen": [
                {
                    "nummer": 52,
                    "frage": "Lücke [52]",
                    "optionen": ["a) noch offen", "b) bereits erledigt", "c) schon bezahlt"],
                    "korrekt": "a",
                    "erklaerung": "a) 'dass der Betrag ... noch offen ist'"
                },
                {
                    "nummer": 53,
                    "frage": "Lücke [53]",
                    "optionen": ["a) Versäumnis", "b) Versehen", "c) Fehlergebnis"],
                    "korrekt": "b",
                    "erklaerung": "b) 'handelt es sich hierbei nur um ein Versehen'"
                },
                {
                    "nummer": 54,
                    "frage": "Lücke [54]",
                    "optionen": ["a) überweisen", "b) auszahlen", "c) einzahlen"],
                    "korrekt": "a",
                    "erklaerung": "a) 'Bitte überweisen Sie den fälligen Betrag'"
                },
                {
                    "nummer": 55,
                    "frage": "Lücke [55]",
                    "optionen": ["a) inzwischen", "b) dennoch", "c) obwohl"],
                    "korrekt": "a",
                    "erklaerung": "a) 'Sollten Sie die Überweisung inzwischen veranlasst haben'"
                },
                {
                    "nummer": 56,
                    "frage": "Lücke [56]",
                    "optionen": ["a) gegenstandslos", "b) bedeutungslos", "c) wirkungslos"],
                    "korrekt": "a",
                    "erklaerung": "a) 'betrachten Sie dieses Schreiben bitte als gegenstandslos'"
                },
                {
                    "nummer": 57,
                    "frage": "Lücke [57]",
                    "optionen": ["a) Verfügung", "b) Aussicht", "c) Bearbeitung"],
                    "korrekt": "a",
                    "erklaerung": "a) 'stehen wir Ihnen jederzeit gerne zur Verfügung'"
                }
            ]
        }
    }
]

for v in sprachbausteine_variants:
    existing = sb.table('b2_questions').select('id').eq('modul', 'lesen').eq('aufgabe', v['aufgabe']).eq('thema', v['thema']).execute()
    if existing.data:
        print(f"Zaten mevcut: {v['thema']}")
    else:
        sb.table('b2_questions').insert(v).execute()
        print(f"Eklendi: {v['thema']}")

print("Sprachbausteine varyantları başarıyla tamamlandı!")
