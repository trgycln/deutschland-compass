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

# 1. Update existing Sprechen rows
sb.table('b2_questions').update({
    'thema': 'Varyant 1: Ein Produkt oder Projekt Ihres Unternehmens vorstellen',
    'aufgabe': 1,
    'aufgabe_typ': 'praesentation'
}).eq('modul', 'sprechen').eq('aufgabe', 1).execute()

sb.table('b2_questions').update({
    'thema': 'Varyant 1: Überstunden für Praktikanten – Erwartung vs. Recht',
    'aufgabe': 2,
    'aufgabe_typ': 'gespraech'
}).eq('modul', 'sprechen').eq('aufgabe', 2).execute()

sb.table('b2_questions').update({
    'thema': 'Varyant 1: Großküche – Der Kühlraum funktioniert nicht',
    'aufgabe': 3,
    'aufgabe_typ': 'problemloesung'
}).eq('modul', 'sprechen').eq('aufgabe', 3).execute()

sb.table('b2_questions').update({
    'thema': 'Varyant 2: Hotel – Kaltes Buffet und WLAN-Ausfall',
    'aufgabe': 3,
    'aufgabe_typ': 'problemloesung'
}).eq('modul', 'sprechen').eq('aufgabe', 4).execute()

sprechen_new_variants = [
    # Teil 1: Präsentation
    {
        "modul": "sprechen",
        "aufgabe": 1,
        "aufgabe_typ": "praesentation",
        "thema": "Varyant 2: Ihren beruflichen Werdegang & aktuelle Aufgaben präsentieren",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Präsentieren Sie Ihren beruflichen Werdegang, Ihre bisherigen Erfahrungen und Ihre aktuellen Hauptaufgaben im Betrieb. Sprechen Sie ca. 2–3 Minuten frei und beantworten Sie danach Rückfragen der Prüfenden.",
            "thema_karte": "Beruflicher Werdegang und aktuelle Tätigkeit",
            "vorbereitungszeit_min": 5,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Welche Ausbildung / welches Studium haben Sie absolviert?",
                "In welchen Bereichen / Branchen haben Sie bisher Erfahrungen gesammelt?",
                "Was sind Ihre aktuellen Kernaufgaben und Verantwortungsbereiche im Unternehmen?",
                "Welche beruflichen Pläne und Weiterbildungsziele haben Sie für die Zukunft?"
            ]
        }
    },
    {
        "modul": "sprechen",
        "aufgabe": 1,
        "aufgabe_typ": "praesentation",
        "thema": "Varyant 3: Eine betriebliche Fortbildung oder Weiterbildung vorstellen",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Stellen Sie eine Schulung oder Weiterbildungsmaßnahme vor, an der Sie teilgenommen haben oder die in Ihrem Betrieb geplant ist. Sprechen Sie ca. 2–3 Minuten.",
            "thema_karte": "Betriebliche Fortbildung / Weiterbildung",
            "vorbereitungszeit_min": 5,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Um welches Thema bzw. welche Qualifikation ging es?",
                "Wer hat die Fortbildung durchgeführt und wer hat daran teilgenommen?",
                "Welchen konkreten Nutzen bringt die Schulung für Ihre tägliche Arbeit?",
                "Würden Sie diese Weiterbildung Ihren Kolleginnen und Kollegen empfehlen? Warum (nicht)?"
            ]
        }
    },

    # Teil 2: Gespräch mit Kollegen (aus den 77 Themen des PDF-Archivs)
    {
        "modul": "sprechen",
        "aufgabe": 2,
        "aufgabe_typ": "gespraech",
        "thema": "Varyant 2: Homeoffice – Privathandy für Dienstzwecke nutzen? (Thema 8)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Führen Sie ein spontanes Arbeitsgespräch mit Ihrer Kollegin / Ihrem Kollegen. Tauschen Sie Ihre Meinungen aus, bringen Sie Argumente vor und reagieren Sie auf die Einwände Ihres Partners. (Dauer: ca. 3 Minuten)",
            "thema_karte": "„Ich arbeite im Homeoffice, habe aber kein Diensthandy bekommen. Denkst du, dass ich mein Privathandy für Kundengespräche benutzen soll?\"",
            "vorbereitungszeit_min": 2,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Datenschutz und Trennung von Privatsphäre und Berufsleben",
                "Kosten für Telefongespräche und Erreichbarkeit nach Feierabend",
                "Mögliche Alternativen (VoIP-Software am Laptop, Anrufe über MS Teams)",
                "Wann sollte man die Abteilungsleitung um ein Firmenhandy bitten?"
            ]
        }
    },
    {
        "modul": "sprechen",
        "aufgabe": 2,
        "aufgabe_typ": "gespraech",
        "thema": "Varyant 3: Krankmeldung ab dem 1. Tag statt ab dem 3. Tag (Thema 9)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Führen Sie ein kollegiales Gespräch über eine neue betriebliche Regelung. Begründen Sie Ihren Standpunkt und finden Sie gemeinsame Aspekte. (Dauer: ca. 3 Minuten)",
            "thema_karte": "„Der Chef möchte von uns Mitarbeitern die Krankschreibung ab dem ersten Tag und nicht erst ab dem dritten Tag. Was hältst du davon?\"",
            "vorbereitungszeit_min": 2,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Bedeutet das Misstrauen gegenüber den Mitarbeitenden oder faire Kontrolle?",
                "Zusätzlicher Stress durch sofortigen Arztbesuch bei leichter Erkältung",
                "Auswirkungen auf volle Wartezimmer und elektronische Krankschreibung (eAU)",
                "Wie könnte ein fairer Kompromiss für das Team aussehen?"
            ]
        }
    },
    {
        "modul": "sprechen",
        "aufgabe": 2,
        "aufgabe_typ": "gespraech",
        "thema": "Varyant 4: Urlaubssperre im Dezember – verständlich oder unfair? (Thema 13)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Tauschen Sie sich im Pausengespräch mit Ihrem Kollegen über eine Urlaubssperre zum Jahresende aus. (Dauer: ca. 3 Minuten)",
            "thema_karte": "„Im Dezember gibt es in unserer Firma eine strikte Urlaubssperre. Findest du das fair?\"",
            "vorbereitungszeit_min": 2,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Hohes Auftragsvolumen zum Jahresabschluss im Vergleich zu Familienfeiertagen",
                "Besondere Belastung für Kolleginnen und Kollegen mit Kindern",
                "Gerechte Schichteinteilung zwischen den Feiertagen",
                "Belohnung / Sonderurlaub für Arbeit im Dezember"
            ]
        }
    },

    # Teil 3: Gemeinsam ein Problem lösen (Echte telc Situationen aus dem PDF-Archiv)
    {
        "modul": "sprechen",
        "aufgabe": 3,
        "aufgabe_typ": "problemloesung",
        "thema": "Varyant 3: Supermarkt – Schreibwaren zum Schulanfang nicht geliefert (Situation 46)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten gemeinsam in einem Supermarkt. Die Schulstart-Aktionsware wurde nicht geliefert, Kunden warten ungeduldig. Besprechen Sie die Situation und finden Sie gemeinsam eine Lösung.",
            "thema_karte": "Lieferverzögerung bei der Schulanfangs-Aktionsware",
            "vorbereitungszeit_min": 2,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Kunden: Wie informieren und beruhigen? Gutscheine oder Vorbestellungen anbieten?",
                "Lieferant: Wie kontaktieren und welchen Express-Liefertermin fordern?",
                "Filialen: Bestände aus benachbarten Filialen per Kurier anfordern?",
                "Langfristig: Konsequenzen für den Liefervertrag ziehen?"
            ]
        }
    },
    {
        "modul": "sprechen",
        "aufgabe": 3,
        "aufgabe_typ": "problemloesung",
        "thema": "Varyant 4: Möbelhaus – Starker Eisregen auf dem Kundenparkplatz (Situation 47)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten in einem Möbelhaus. Plötzlicher Eisregen hat den Parkplatz spiegelglatt gemacht, Kunden können nicht wegfahren. Entwickeln Sie einen schnellen Notfallplan.",
            "thema_karte": "Extremer Eisregen auf dem gesamten Parkplatz",
            "vorbereitungszeit_min": 2,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Winterdienst / Streudienst sofort anrufen oder Mitarbeiter mit Streugut rausschicken?",
                "Kunden: Wie beruhigen? Im Möbelhaus-Café kostenlosen heißen Kaffee/Tee anbieten?",
                "Sicherheit: Unfallgefahr und Erste-Hilfe-Bereitschaft sicherstellen",
                "Ggf. Lautsprecherdurchsage im Haus zur Information der Kundschaft"
            ]
        }
    },
    {
        "modul": "sprechen",
        "aufgabe": 3,
        "aufgabe_typ": "problemloesung",
        "thema": "Varyant 5: Restaurant – Verdorbener Fisch vor Abendgesellschaft (Situation 49)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten in einem Fischrestaurant. Für heute Abend hat sich eine 30-köpfige Gesellschaft angekündigt, doch der gelieferte Fisch ist verdorben. Finden Sie sofortige Lösungen.",
            "thema_karte": "Lieferung unbrauchbar vor geschlossener Gesellschaft",
            "vorbereitungszeit_min": 2,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Ersatzbeschaffung: Großmarkt in der Nähe oder Partnerrestaurant anrufen?",
                "Menüänderung: Alternatives Fleisch- oder vegetarisches Spitzenmenü vorbereiten?",
                "Gäste: Gastgeber vorab telefonisch informieren und Rabatt / Champagner-Empfang anbieten?",
                "Lieferant: Mängelrüge, Schadensersatz und Kündigung der Zusammenarbeit"
            ]
        }
    },
    {
        "modul": "sprechen",
        "aufgabe": 3,
        "aufgabe_typ": "problemloesung",
        "thema": "Varyant 6: Umzug – Antiker Spiegel beim Transport zerbrochen (Situation 52)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten bei einer Möbelspedition. Beim Treppentransport ist ein unersetzlicher antiker Spiegel des Kunden zu Bruch gegangen. Der Kunde ist extrem wütend.",
            "thema_karte": "Bruchschaden an wertvollem Kundenbesitz",
            "vorbereitungszeit_min": 2,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Deeskalation: Wie den verärgerten Kunden beruhigen und Protokoll aufnehmen?",
                "Versicherung: Schadensmeldung und Kontaktaufnahme mit Gutachter / Restaurator",
                "Kompensation: Rabatt auf den Umzugspreis oder Gutschein anbieten",
                "Prävention: Schulung des Teams für den Transport von Antiquitäten und Kunstgegenständen"
            ]
        }
    },
    {
        "modul": "sprechen",
        "aufgabe": 3,
        "aufgabe_typ": "problemloesung",
        "thema": "Varyant 7: Werbefirma – Farbdrucker hat Blaustich vor eiliger Deadline (Situation 60)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten in einer Werbeagentur. Flyer und Visitenkarten für einen wichtigen Messekunden müssen bis morgen früh fertig sein, doch der Drucker druckt alles mit Blaustich.",
            "thema_karte": "Technischer Ausfall vor unaufschiebbarem Kundentermin",
            "vorbereitungszeit_min": 2,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Drucker: Farbkalibrierung und Notfall-Technikereinsatz prüfen?",
                "Externe Druckerei: Auftrag sofort per Express an eine lokale Partnerdruckerei auslagern?",
                "Kunde: Kunden über den Stand informieren und pünktliche Teillieferung zusichern?",
                "Kosten: Wer trägt die Mehrkosten für den externen Expressdruck?"
            ]
        }
    },
    {
        "modul": "sprechen",
        "aufgabe": 3,
        "aufgabe_typ": "problemloesung",
        "thema": "Varyant 8: Textilreinigung – Teures Abendkleid verfärbt (Situation 61)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten in einer Textilreinigung. Ein Designer-Abendkleid wurde verfärbt. Die Kundin braucht es heute Abend für eine Gala und droht mit ihrem Anwalt.",
            "thema_karte": "Sachbeschädigung vor Gala-Abend & Anwaltsdrohung",
            "vorbereitungszeit_min": 2,
            "sprechzeit_min": 3,
            "leitfragen": [
                "Wie mit der wütenden Kundin sprechen und rechtliche Schritte abwenden?",
                "Express-Entfärbung durch Textilspezialisten in der Nachbarstadt möglich?",
                "Entschädigung: Kosten für Leiheines Ersatzkleides in einer Boutique übernehmen?",
                "Betriebshaftpflichtversicherung informieren und Schadensfall dokumentieren"
            ]
        }
    }
]

for v in sprechen_new_variants:
    existing = sb.table('b2_questions').select('id').eq('modul', 'sprechen').eq('aufgabe', v['aufgabe']).eq('thema', v['thema']).execute()
    if existing.data:
        print(f"Zaten mevcut: {v['thema']}")
    else:
        sb.table('b2_questions').insert(v).execute()
        print(f"Eklendi: {v['thema']}")

print("Sprechen varyantları başarıyla tamamlandı!")
