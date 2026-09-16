import os
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

more_sprachbausteine = [
    # ==================== TEIL 1 (Wortpool a-j) ====================
    {
        "modul": "lesen",
        "aufgabe": 5,
        "aufgabe_typ": "cloze_wordpool",
        "thema": "Varyant 5: Probearbeiten (Einladung und Vorbereitung)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Wörter (a–j) passen in die Lücken 46–51? Für jede Lücke gibt es nur eine richtige Lösung. Vier Wörter passen nicht.",
            "text": "Probearbeiten\n\nSehr geehrte Frau Sabani,\n\nes freut mich sehr, dass ich in meinem Vorstellungsgespräch einen ersten positiven Eindruck hinterlassen habe und Sie mich [46] Probearbeiten einladen. Natürlich nutze ich sehr gern diese Gelegenheit, meine Fähigkeiten [47] Beweis zu stellen. Von den beiden Terminvorschlägen, die Sie mir geschickt haben, passt mir der nächste Dienstag am besten. Ich freue mich [48], bei dieser Gelegenheit [49] einen ersten Einblick in die Arbeitsabläufe und Abteilungen in Ihrem Haus zu bekommen.\n\nStellen Sie mir die Arbeitskleidung für diesen Tag zur Verfügung oder soll ich selbst spezielle Kleidung mitbringen? Gibt es noch irgendwas, [50] ich vorher besorgen muss? Brauche ich [51] noch eine ärztliche Bescheinigung vom Gesundheitsamt?\n\nDanke im Voraus für eine kurze Beantwortung meiner Fragen.\n\nMit freundlichen Grüßen\nMarkus Lindner",
            "wortpool": [
                {"buchstabe": "a", "wort": "worüber"},
                {"buchstabe": "b", "wort": "bereits"},
                {"buchstabe": "c", "wort": "eventuell"},
                {"buchstabe": "d", "wort": "in"},
                {"buchstabe": "e", "wort": "manchmal"},
                {"buchstabe": "f", "wort": "darauf"},
                {"buchstabe": "g", "wort": "unter"},
                {"buchstabe": "h", "wort": "was"},
                {"buchstabe": "i", "wort": "noch"},
                {"buchstabe": "j", "wort": "zum"}
            ],
            "fragen": [
                {"nummer": 46, "frage": "Lücke [46]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "j", "erklaerung": "j) zum ('einladen zum Probearbeiten')"},
                {"nummer": 47, "frage": "Lücke [47]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "g", "erklaerung": "g) unter ('unter Beweis stellen')"},
                {"nummer": 48, "frage": "Lücke [48]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "f", "erklaerung": "f) darauf ('freue mich darauf, ... zu bekommen')"},
                {"nummer": 49, "frage": "Lücke [49]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "b", "erklaerung": "b) bereits ('bereits einen ersten Einblick bekommen')"},
                {"nummer": 50, "frage": "Lücke [50]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "h", "erklaerung": "h) was (Relativpronomen: 'irgendwas, was ich besorgen muss')"},
                {"nummer": 51, "frage": "Lücke [51]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "c", "erklaerung": "c) eventuell ('Brauche ich eventuell noch eine Bescheinigung?')"}
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 5,
        "aufgabe_typ": "cloze_wordpool",
        "thema": "Varyant 6: Fragen zur Ausbildung (Kauffrau für Büromanagement)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Wörter (a–j) passen in die Lücken 46–51? Für jede Lücke gibt es nur eine richtige Lösung. Vier Wörter passen nicht.",
            "text": "Fragen zur Ausbildung\n\nSehr geehrte Damen und Herren,\n\nich habe mich sehr darüber gefreut, dass ich meine Ausbildung [46] Kauffrau für Büromanagement im August in Ihrem Unternehmen beginnen kann.\n\nIch würde gern wissen, [47] die Ausbildung zeitlich organisiert ist. Im Vorstellungsgespräch teilten Sie mir mit, dass sich die theoretischen und praktischen Blöcke abwechseln. Im Gegensatz [48] praktischen Block müsste ich mir für die Zeit der Theorie ein Zimmer mieten. [49] wäre es wichtig, so schnell wie möglich die Termine zu erfahren. In diesem Zusammenhang möchte ich nachfragen, [50] es möglich wäre, dass die Firma für die Theoriephasen einen Zuschuss für die Miete bezahlt.\n\nAußerdem würde ich gern erfahren, wer mein Ansprechpartner [51] des praktischen Teils der Ausbildung sein wird.\n\nMit freundlichen Grüßen\nAnna Ivanova",
            "wortpool": [
                {"buchstabe": "a", "wort": "dass"},
                {"buchstabe": "b", "wort": "deshalb"},
                {"buchstabe": "c", "wort": "innerhalb"},
                {"buchstabe": "d", "wort": "ob"},
                {"buchstabe": "e", "wort": "während"},
                {"buchstabe": "f", "wort": "weil"},
                {"buchstabe": "g", "wort": "wie"},
                {"buchstabe": "h", "wort": "zu"},
                {"buchstabe": "i", "wort": "zum"},
                {"buchstabe": "j", "wort": "zur"}
            ],
            "fragen": [
                {"nummer": 46, "frage": "Lücke [46]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "j", "erklaerung": "j) zur ('Ausbildung zur Kauffrau')"},
                {"nummer": 47, "frage": "Lücke [47]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "g", "erklaerung": "g) wie (indirekter Fragesatz: 'wissen, wie die Ausbildung organisiert ist')"},
                {"nummer": 48, "frage": "Lücke [48]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "i", "erklaerung": "i) zum ('Im Gegensatz zum praktischen Block')"},
                {"nummer": 49, "frage": "Lücke [49]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "b", "erklaerung": "b) deshalb (Konsekutiv: 'Deshalb wäre es wichtig')"},
                {"nummer": 50, "frage": "Lücke [50]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "d", "erklaerung": "d) ob (indirekte Ja/Nein-Frage: 'nachfragen, ob es möglich wäre')"},
                {"nummer": 51, "frage": "Lücke [51]", "optionen": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], "korrekt": "e", "erklaerung": "e) während (Präposition mit Genitiv: 'während des praktischen Teils')"}
            ]
        }
    },

    # ==================== TEIL 2 (Multiple Choice a, b, c) ====================
    {
        "modul": "lesen",
        "aufgabe": 6,
        "aufgabe_typ": "cloze_multiple_choice",
        "thema": "Varyant 3: Reklamation beschädigtes Produkt (Frau Janiashvilli)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Option (a, b oder c) passt am besten in die Lücken 52–57?",
            "text": "Ihre Beschwerde bezüglich des beschädigten Produktes\n\nSehr geehrte Frau Janiashvilli,\n\nwir danken Ihnen für Ihr Schreiben, mit dem Sie uns auf die Schäden an der Bettcouch aufmerksam machen, die Sie bei uns gekauft haben. Wir haben [52] und teilen Ihre Ansicht. Offensichtlich ist bei unserer Qualitätskontrolle [53] worden. [54] hätte die Couch nicht ausgeliefert werden dürfen.\n\nHeute erhalten Sie das Ersatzprodukt, das beschädigte Möbelstück wird dann kostenlos mitgenommen. Wir bitten Sie, die entstandenen [55], und wünschen Ihnen viel Vergnügen mit Ihrem neuen Sitzmöbel. Ihre Reklamation haben wir an die Abteilung für Qualitätssicherung weitergegeben, um sicherzustellen, dass solche Fehler zukünftig vermieden werden. Als kleines Dankeschön für Ihr Verständnis finden Sie anbei einen Gutschein [56] 50 Euro für Ihren nächsten Besuch in unserem Haus.\n\nWir würden uns freuen, Sie bald wieder in einer unserer Filialen [57].\n\nMit freundlichen Grüßen\nLudmilla Dombrowski\nLeiterin Kundenservice",
            "fragen": [
                {
                    "nummer": 52,
                    "frage": "Lücke [52]",
                    "optionen": ["a) Ihren Auftrag angenommen", "b) Ihre Bestellung erhalten", "c) Ihre Reklamation geprüft"],
                    "korrekt": "c",
                    "erklaerung": "c) 'Wir haben Ihre Reklamation geprüft'"
                },
                {
                    "nummer": 53,
                    "frage": "Lücke [53]",
                    "optionen": ["a) das Problem unbemerkt", "b) der Mangel übersehen", "c) der Schaden behoben"],
                    "korrekt": "b",
                    "erklaerung": "b) 'ist der Mangel übersehen worden'"
                },
                {
                    "nummer": 54,
                    "frage": "Lücke [54]",
                    "optionen": ["a) Auf dieser Stelle", "b) In diesem Zustand", "c) Mit dieser Position"],
                    "korrekt": "b",
                    "erklaerung": "b) 'In diesem Zustand hätte die Couch nicht ausgeliefert werden dürfen'"
                },
                {
                    "nummer": 55,
                    "frage": "Lücke [55]",
                    "optionen": ["a) Fehler zu beanstanden", "b) Probleme zu berücksichtigen", "c) Unannehmlichkeiten zu entschuldigen"],
                    "korrekt": "c",
                    "erklaerung": "c) 'die entstandenen Unannehmlichkeiten zu entschuldigen'"
                },
                {
                    "nummer": 56,
                    "frage": "Lücke [56]",
                    "optionen": ["a) für den Betrag von", "b) in Höhe von", "c) zum Preis von"],
                    "korrekt": "b",
                    "erklaerung": "b) 'einen Gutschein in Höhe von 50 Euro'"
                },
                {
                    "nummer": 57,
                    "frage": "Lücke [57]",
                    "optionen": ["a) begrüßen zu dürfen", "b) beobachten zu dürfen", "c) besuchen zu dürfen"],
                    "korrekt": "a",
                    "erklaerung": "a) 'Sie bald wieder ... begrüßen zu dürfen'"
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 6,
        "aufgabe_typ": "cloze_multiple_choice",
        "thema": "Varyant 4: Angebot für Reinigungsservice (Tiptop-Service)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Option (a, b oder c) passt am besten in die Lücken 52–57?",
            "text": "Angebot für Reinigungsservice\n\nSehr geehrte Damen und Herren,\n\nvielen Dank für Ihr Interesse an unseren Leistungen. Für den regelmäßigen Reinigungsservice Ihres Restaurants hatten wir Ihnen am 24.11. ein Angebot [52] unterbreitet. Wie aus der Übersicht auf der zweiten Seite hervorgeht, ist eine Reinigung Ihrer Räumlichkeiten auch am frühen Sonntagmorgen für uns selbstverständlich ohne Probleme machbar. Für diesen Service berechnen wir im Rahmen unserer Rabattaktion keinen Wochenendzuschlag.\n\nHatten Sie schon die Möglichkeit, [53]? Bitte denken Sie daran, dass die erwähnte Rabattaktion nur noch bis Ende des Jahres [54]. Sollten Sie dazu noch Fragen haben, zögern Sie bitte nicht, sich mit uns [55]. Unsere Mitarbeiter im Kundenservice [56] Ihnen gerne jederzeit zur Verfügung. Wir freuen uns, Sie zukünftig [57] zu können.\n\nMit freundlichen Grüßen\nHelmuth Heidinger („Tiptop-Service“)",
            "fragen": [
                {
                    "nummer": 52,
                    "frage": "Lücke [52]",
                    "optionen": ["a) aufgrund Ihrer Erfahrung", "b) gemäß Ihren Wünschen", "c) laut Ihrer Zusage"],
                    "korrekt": "b",
                    "erklaerung": "b) 'ein Angebot gemäß Ihren Wünschen unterbreitet'"
                },
                {
                    "nummer": 53,
                    "frage": "Lücke [53]",
                    "optionen": ["a) das Angebot zu prüfen", "b) die Chancen zu nutzen", "c) die Gelegenheit zu bieten"],
                    "korrekt": "a",
                    "erklaerung": "a) 'die Möglichkeit, das Angebot zu prüfen'"
                },
                {
                    "nummer": 54,
                    "frage": "Lücke [54]",
                    "optionen": ["a) gültig ist", "b) anerkannt wird", "c) einlösbar bleibt"],
                    "korrekt": "a",
                    "erklaerung": "a) 'bis Ende des Jahres gültig ist'"
                },
                {
                    "nummer": 55,
                    "frage": "Lücke [55]",
                    "optionen": ["a) in Kontakt zu treten", "b) in Verbindung zu setzen", "c) zur Verfügung zu stellen"],
                    "korrekt": "b",
                    "erklaerung": "b) 'sich mit uns in Verbindung zu setzen'"
                },
                {
                    "nummer": 56,
                    "frage": "Lücke [56]",
                    "optionen": ["a) sind", "b) stehen", "c) stellen"],
                    "korrekt": "b",
                    "erklaerung": "b) 'stehen Ihnen gerne jederzeit zur Verfügung'"
                },
                {
                    "nummer": 57,
                    "frage": "Lücke [57]",
                    "optionen": ["a) bei unseren Kunden besuchen", "b) mit unseren Kunden begrüßen", "c) zu unseren Kunden zählen"],
                    "korrekt": "c",
                    "erklaerung": "c) 'Sie zukünftig zu unseren Kunden zählen zu können'"
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 6,
        "aufgabe_typ": "cloze_multiple_choice",
        "thema": "Varyant 5: Auftragsbestätigung (PKW Bulldog – Frau Mackbock)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Option (a, b oder c) passt am besten in die Lücken 52–57?",
            "text": "Auftragsbestätigung\n\nSehr geehrte Frau Mackbock,\n\nich danke Ihnen für Ihre Bestellung und bestätige hiermit die Zustellung des PKW Bulldog zum Preis von 1078 Euro zzgl. MwSt. an die von [52] Lieferadresse. Sollte Ihre Rechnungsadresse nicht mit der Lieferadresse übereinstimmen, teilen Sie uns dies bitte bis spätestens 07.07 schriftlich mit.\n\nDie Rechnungszustellung erfolgt per Post. Bitte beachten Sie, dass wir bei Zahlung des Kaufpreises innerhalb von sieben Tagen nach Lieferung [53]. Ansonsten muss der Rechnungsbetrag bis 30 Tagen nach Wareneingang [54]. Die detaillierten Konditionen [55] unseren allgemeinen Geschäftsbedingungen auf der Rückseite dieser Auftragsbestätigung.\n\nBei Rückfragen steht Ihnen unser 24-Stunden-Service unter der Rufnummer 0175 545621 zur Verfügung. Bitte halten Sie hierzu Ihre [56]. Wir versprechen Ihnen eine zuverlässige [57] und sind sicher, dass Sie mit unserem Produkt zufrieden sein werden.\n\nMit freundlichen Grüßen\nChristoph Sellert",
            "fragen": [
                {
                    "nummer": 52,
                    "frage": "Lücke [52]",
                    "optionen": ["a) Ihnen angegebene", "b) ihr angeordnete", "c) mir angeführte"],
                    "korrekt": "a",
                    "erklaerung": "a) 'an die von Ihnen angegebene Lieferadresse'"
                },
                {
                    "nummer": 53,
                    "frage": "Lücke [53]",
                    "optionen": ["a) drei Prozent Ermäßigung bezahlen", "b) drei Prozent Rabatt wünschen", "c) drei Prozent Skonto gewähren"],
                    "korrekt": "c",
                    "erklaerung": "c) 'drei Prozent Skonto gewähren'"
                },
                {
                    "nummer": 54,
                    "frage": "Lücke [54]",
                    "optionen": ["a) beglichen werden", "b) dokumentiert werden", "c) verhandelt werden"],
                    "korrekt": "a",
                    "erklaerung": "a) 'bis 30 Tagen nach Wareneingang beglichen werden'"
                },
                {
                    "nummer": 55,
                    "frage": "Lücke [55]",
                    "optionen": ["a) entnehmen Sie bitte", "b) erfahren Sie direkt", "c) finden Sie gerne"],
                    "korrekt": "a",
                    "erklaerung": "a) 'entnehmen Sie bitte unseren AGB'"
                },
                {
                    "nummer": 56,
                    "frage": "Lücke [56]",
                    "optionen": ["a) Auftragsnummer bereit", "b) Kundennummer fest", "c) Rechnungsnummer an"],
                    "korrekt": "a",
                    "erklaerung": "a) 'Bitte halten Sie hierzu Ihre Auftragsnummer bereit'"
                },
                {
                    "nummer": 57,
                    "frage": "Lücke [57]",
                    "optionen": ["a) Ausführung Ihres Auftrags", "b) Bearbeitung Ihrer Anfrage", "c) Durchführung Ihrer Arbeit"],
                    "korrekt": "a",
                    "erklaerung": "a) 'eine zuverlässige Ausführung Ihres Auftrags'"
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 6,
        "aufgabe_typ": "cloze_multiple_choice",
        "thema": "Varyant 6: Angebot Büromöbel (Lars Walter)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Option (a, b oder c) passt am besten in die Lücken 52–57?",
            "text": "Angebot\n\nSehr geehrte Damen und Herren,\n\nwir danken Ihnen für Ihre Anfrage vom 08.12.20xx und unterbreiten Ihnen [52]: acht Schreibtischcontainer MV 17 WW weiß zum Preis von je 156,99 Euro netto. Ab einem Auftragswert von 900,00 Euro liefern wir frei Haus, ansonsten fällt eine Lieferpauschale [53] von 39,00 Euro an.\n\nGerne montieren wir die Möbel auch vor Ort. Die Kosten für den Aufbau [54] nach dem Warenwert und betragen 20% des Nettopreises. Natürlich besteht auch [55], die Ware in unserem Lager abzuholen und selbst aufzubauen.\n\n[56] ist 14 Tage bindend. Wir würden uns sehr freuen, [57] zu erhalten. Sollten Sie noch Fragen haben, stehen wir Ihnen gerne jederzeit zur Verfügung.\n\nMit freundlichen Grüßen\nLars Walter",
            "fragen": [
                {
                    "nummer": 52,
                    "frage": "Lücke [52]",
                    "optionen": ["a) folgendes Angebot", "b) folgendes Ergebnis", "c) folgende Informationen"],
                    "korrekt": "a",
                    "erklaerung": "a) 'unterbreiten Ihnen folgendes Angebot'"
                },
                {
                    "nummer": 53,
                    "frage": "Lücke [53]",
                    "optionen": ["a) in Absprache", "b) in Bezug", "c) in Höhe"],
                    "korrekt": "c",
                    "erklaerung": "c) 'eine Lieferpauschale in Höhe von 39,00 Euro'"
                },
                {
                    "nummer": 54,
                    "frage": "Lücke [54]",
                    "optionen": ["a) belaufen sich", "b) ergeben sich", "c) richten sich"],
                    "korrekt": "c",
                    "erklaerung": "c) 'Die Kosten für den Aufbau richten sich nach dem Warenwert'"
                },
                {
                    "nummer": 55,
                    "frage": "Lücke [55]",
                    "optionen": ["a) die Absicht", "b) die Option", "c) die Verpflichtung"],
                    "korrekt": "b",
                    "erklaerung": "b) 'Natürlich besteht auch die Option, ...'"
                },
                {
                    "nummer": 56,
                    "frage": "Lücke [56]",
                    "optionen": ["a) Diese Anfrage", "b) Dieses Angebot", "c) Diese Bestellung"],
                    "korrekt": "b",
                    "erklaerung": "b) 'Dieses Angebot ist 14 Tage bindend'"
                },
                {
                    "nummer": 57,
                    "frage": "Lücke [57]",
                    "optionen": ["a) Ihren Auftrag", "b) Ihre Wünsche", "c) Ihr Verständnis"],
                    "korrekt": "a",
                    "erklaerung": "a) 'sehr freuen, Ihren Auftrag zu erhalten'"
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 6,
        "aufgabe_typ": "cloze_multiple_choice",
        "thema": "Varyant 7: Fehlerhafte Lieferung Pausenräume (Sonja Schmidt)",
        "punkte_max": 6,
        "inhalt": {
            "anweisung": "Lesen Sie den folgenden Text. Welche Option (a, b oder c) passt am besten in die Lücken 52–57?",
            "text": "Fehlerhafte Lieferung\n\nSehr geehrter Herr Sonneberg,\n\nvielen Dank für die schnelle Bearbeitung unserer Bestellung vom 29.10. Für die Einrichtung unserer Pausenräume hatten wir zehn Sitzeckbänke in der Farbe Weiß bestellt. [52] sollten Sie zehn Tische und für jede Sitzeinheit drei Stühle in der gleichen Farbe liefern.\n\nLeider entspricht die Lieferung nicht [53]. Zwei von den zehn Sitzeckbänken wurden in Braun geliefert. Von den 30 Stühlen haben ebenfalls fünf die falsche Farbe. Wir bitten Sie, die reklamierten Möbelstücke [54].\n\nAußerdem weisen zwei Tische Kratzer an der Oberfläche auf. Wir würden die Tische trotzdem behalten, wenn Sie dafür einen entsprechenden [55]. Könnten Sie uns hierfür [56]?\n\nWir bitten um [57]. Für Rückfragen stehen wir Ihnen jederzeit zur Verfügung.\n\nMit freundlichen Grüßen\nSonja Schmidt",
            "fragen": [
                {
                    "nummer": 52,
                    "frage": "Lücke [52]",
                    "optionen": ["a) Dafür mussten", "b) Daher konnten", "c) Dazu sollten"],
                    "korrekt": "c",
                    "erklaerung": "c) 'Dazu sollten Sie zehn Tische ... liefern'"
                },
                {
                    "nummer": 53,
                    "frage": "Lücke [53]",
                    "optionen": ["a) unserem Angebot", "b) unseren Vorschriften", "c) unserer Bestellung"],
                    "korrekt": "c",
                    "erklaerung": "c) 'entspricht die Lieferung nicht unserer Bestellung'"
                },
                {
                    "nummer": 54,
                    "frage": "Lücke [54]",
                    "optionen": ["a) gleich zurückzuschicken", "b) schnellstmöglich auszutauschen", "c) sofort zu reparieren"],
                    "korrekt": "b",
                    "erklaerung": "b) 'die reklamierten Möbelstücke schnellstmöglich auszutauschen'"
                },
                {
                    "nummer": 55,
                    "frage": "Lücke [55]",
                    "optionen": ["a) Aufpreis anbieten", "b) Preisnachlass gewähren", "c) Rabatt fordern"],
                    "korrekt": "b",
                    "erklaerung": "b) 'einen entsprechenden Preisnachlass gewähren'"
                },
                {
                    "nummer": 56,
                    "frage": "Lücke [56]",
                    "optionen": ["a) ein Angebot unterbreiten", "b) ein Gutachten erstellen", "c) eine Empfehlung geben"],
                    "korrekt": "b",
                    "erklaerung": "b) 'Könnten Sie uns hierfür ein Gutachten erstellen?'"
                },
                {
                    "nummer": 57,
                    "frage": "Lücke [57]",
                    "optionen": ["a) baldige Bezahlung", "b) gleichzeitige Stornierung", "c) umgehende Antwort"],
                    "korrekt": "c",
                    "erklaerung": "c) 'Wir bitten um umgehende Antwort'"
                }
            ]
        }
    }
]

for v in more_sprachbausteine:
    existing = sb.table('b2_questions').select('id').eq('modul', 'lesen').eq('aufgabe', v['aufgabe']).eq('thema', v['thema']).execute()
    if existing.data:
        print(f"Zaten mevcut: {v['thema']}")
    else:
        sb.table('b2_questions').insert(v).execute()
        print(f"Eklendi: {v['thema']}")

print("Tüm ek Sprachbausteine varyantları başarıyla kaydedildi!")
