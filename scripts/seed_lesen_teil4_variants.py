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

# 1. Update existing Aufgabe 4 title
sb.table('b2_questions').update({
    'thema': 'Varyant 1: Protokoll Fertigungsanlage & IT-Software (Ballhausen)'
}).eq('modul', 'lesen').eq('aufgabe', 4).ilike('thema', '%Protokoll der Sitzung%').execute()

teil4_variants = [
    {
        "modul": "lesen",
        "aufgabe": 4,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 2: Protokoll Zulieferer & Fahrtenbuch (Hannover)",
        "punkte_max": 15,
        "inhalt": {
            "anweisung": "Lesen Sie das Protokoll. Welche Lösung (a, b oder c) ist jeweils richtig?",
            "text": "Protokoll 20.06.20XX, 10.00-12.00 Uhr\nBesprechungsraum: 032, Ort: Konrad-Adenauer-Straße 43, 30159 Hannover\n\nTeilnehmende: Veronika Emmerich (VE, Stellvertreterin Geschäftsleitung), Marita Hinze (MH, Leitung Einkauf), Peter Renner (PR, Leitung Produktion), Thomas Hagen (TH, Leitung Finanzen), Sibylle Marquardt (SM, Leitung Personal), Christian Werner (CW, Leitung Vertrieb), Jessica Froh (JF, Leitung Marketing), Jutta Raulin (JR, Leitung Qualitätssicherung), Joachim Meyer (JM, Leitung IT)\nSitzungsleitung: Veronika Emmerich\nProtokollantin: Sibylle Marquardt\nNicht Anwesende: Martin Stahl (MS, Geschäftsleitung)\n\nTagesordnungspunkte:\n1. Begrüßung und Genehmigung der Tagesordnungspunkte - VE\n2. Probleme mit einem Zulieferer - MH\n3. Zwischenstand Qualitätssicherung - JR\n4. Neue Überstundenregelung - VE\n5. Private Nutzung der Dienstwagen - SM\n6. Sonstiges\n\nTOP 1 Begrüßung und Genehmigung der Tagesordnungspunkte\nVE begrüßt alle Anwesenden, alle Abteilungsleiterinnen und -leiter zur heutigen Besprechung und bittet um die Genehmigung der Tagesordnungspunkte. Diese werden per Handzeichen einstimmig angenommen. Als nächster Besprechungstermin wird der 24.09.20XX nach der Urlaubszeit einstimmig festgelegt.\n\nTOP 2 Probleme mit einem Zulieferer\nMH berichtet, dass unser südamerikanischer Zulieferer Dos Caminos Exports Ltd. die Preise für seine Vorprodukte ohne weitere Absprache erhöht und uns in Rechnung gestellt hat. Auf Nachfrage wurde uns mitgeteilt, dass dies aufgrund stark gestiegener Transportkosten geschehen ist. Dies wird von uns nicht akzeptiert und wurde entsprechend an den Zulieferer kommuniziert. Nach intensivem Schriftwechsel kam es zu einer Einigung. Wir behalten es uns vor, bis zum 31. des kommenden Monats einen für uns günstigeren Zulieferer zu finden. Hierfür zuständig sind MH und TH. Neue Lieferpartner könnten im asiatischen Raum gesucht werden. MH berichtet über gute Erfahrungen in dieser Region. Ziel ist es, ohne weitere Ansprüche beiderseits von dem Vertrag des Zulieferers zurückzutreten. Gerichtliche Schritte werden dann nicht unternommen. Bis zum 20. des kommenden Monats ist darüber zu berichten.\n\nTOP 3 Zwischenstand Qualitätssicherung\nDie Abteilung Qualitätssicherung erarbeitete ein neues Konzept für Qualitätsprüfung in der Phase der Endproduktion. Das vor zwei Quartalen umgesetzte Konzept zeigt in der Qualitätsmessung bereits bei einer Abweichung von 30 Prozent eine Fehlermeldung. Dies führt seit drei Monaten zu einem messbaren Erfolg, berichtet JR. Die Zahl der Reklamationen ist signifikant zurückgegangen.\n\nTOP 4 Neue Überstundenregelung\nVE dankt allen Mitarbeitern für die mehrheitliche Bereitschaft, Überstunden zu leisten. Vor allem in Zeiten hoher Auftragseingänge lässt sich das leider nicht immer vermeiden. Bisher konnten die Mitarbeitenden diese Überstunden als Freizeit ausgleichen oder sich auszahlen lassen. Aufgrund eines momentan unerwartet hohen Auftragsvolumens wird ab sofort festgelegt, dass bis zu 20 Überstunden pro Quartal ausschließlich vergütet werden können, da die Freistellung von der Arbeit aus personellen Gründen momentan nicht möglich ist. Bei sinkendem Auftragseingang kann man diese Maßnahme zu einem späteren Zeitpunkt wieder rückgängig machen. Diese Vorgehensweise ist mit Protokoll vom 15.06.20XX vom Betriebsrat genehmigt.\n\nTOP 5 Private Nutzung der Dienstwagen\nSM teilt mit, dass alle Mitarbeiter, die über einen Dienstwagen verfügen, diesen ab dem nächsten Monat nicht mehr nur für dienstliche, sondern auch für private Zwecke nutzen können. Es wird aber darauf hingewiesen, dass dann unbedingt ein Fahrtenbuch geführt werden muss, das die privat gefahrenen Kilometer angibt. Dieses ist monatlich in der Finanzabteilung einzureichen.\n\nTOP 6 Sonstiges\nTH präsentiert eine Idee seiner Mitarbeiterinnen und Mitarbeiter: Sie möchten am Samstag in zwei Wochen einen geselligen Bowlingabend in der Anlage „Sport und Spaß“, Marienstraße 10-12 verbringen. Dazu laden sie alle interessierten Kolleginnen und Kollegen aus anderen Abteilungen ein. Die Personalabteilung wird diese Information ins Intranet stellen. Wer Interesse hat, soll sich dort bis Freitag nächster Woche anmelden.",
            "fragen": [
                {
                    "nummer": 14,
                    "frage": "Der Termin der nächsten Sitzung",
                    "optionen": [
                        "a) findet nach Abstimmung im Herbst statt.",
                        "b) muss verlegt werden.",
                        "c) wird noch bekannt gegeben."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Der nächste Termin wird auf den 24.09.20XX nach der Urlaubszeit (Herbst) einstimmig festgelegt."
                },
                {
                    "nummer": 15,
                    "frage": "Die Firma",
                    "optionen": [
                        "a) hat ohne Weiteres die Preiserhöhung des Zulieferers akzeptiert.",
                        "b) will sich an den höheren Transportkosten gern beteiligen.",
                        "c) wird einen neuen Vertragspartner suchen."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Die Firma sucht bis zum 31. des Monats einen günstigeren Zulieferer im asiatischen Raum und tritt vom Altvertrag zurück."
                },
                {
                    "nummer": 16,
                    "frage": "Die Abteilung Qualitätssicherung",
                    "optionen": [
                        "a) berichtet von 30 Prozent fehlerhafter Produkte.",
                        "b) hat keine Qualitätsprobleme.",
                        "c) verzeichnet erste Erfolge."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Das neue Konzept führt seit drei Monaten zu einem messbaren Erfolg; die Zahl der Reklamationen ist signifikant zurückgegangen."
                },
                {
                    "nummer": 17,
                    "frage": "Die Mitarbeitenden",
                    "optionen": [
                        "a) haben mit dem Betriebsrat gesprochen.",
                        "b) können alle Überstunden als Freizeit nehmen.",
                        "c) müssen zurzeit Mehrarbeit leisten."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Wegen des unerwartet hohen Auftragsvolumens fallen viele Überstunden (Mehrarbeit) an, die bis zu 20 Std./Quartal vergütet werden."
                },
                {
                    "nummer": 18,
                    "frage": "Das Fahrtenbuch",
                    "optionen": [
                        "a) dokumentiert alle gefahrenen Kilometer.",
                        "b) enthält nichtdienstliche Autofahrten.",
                        "c) wird von allen Mitarbeitern geführt."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Das Fahrtenbuch muss geführt werden, um die privat (nichtdienstlich) gefahrenen Kilometer anzugeben."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 4,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 3: Protokoll Marketing & Fahrradständer (Frau Schlosser)",
        "punkte_max": 15,
        "inhalt": {
            "anweisung": "Lesen Sie das Protokoll. Welche Lösung (a, b oder c) ist jeweils richtig?",
            "text": "Protokoll 14.02.20XX, 08:00-11:45 Uhr\nAbteilung 4, Besprechungszimmer 2\n\nTeilnehmende: Holger Marschke (HM, Teamleiter), Cornelia Markert (CM, Marketingabteilung), Susanne Willke (SW, Marketingabteilung), Monique Rüdiger (MR, Betriebsratsmitglied)\nEntschuldigt: Martin Hamann (MH, Qualitätssicherung)\nProtokollantin: Marianne Schiller (MS)\nSitzungsleitung: Andreas Mertens (AM)\n\nTagesordnungspunkte:\n1. Begrüßung und Genehmigung des letzten Protokolls\n2. Neue Marketingmaßnahmen\n3. Qualitätsmanagement\n4. Anpassung der Pausenzeiten\n5. Standorte der neuen Fahrradständer\n6. Sonstiges\n\nTOP 1 Begrüßung und Genehmigung des letzten Protokolls\nAM begrüßt alle Teilnehmenden und eröffnet die heutige Sitzung. Das Protokoll des letzten Meetings am 10.01.20XX wird ohne weitere Änderungen und Ergänzungen einstimmig per Handzeichen genehmigt. Auf Antrag von MR, die wegen anderweitiger terminlicher Verpflichtungen nicht bis zum Ende am Meeting teilnehmen kann, wird die Reihenfolge der Tagesordnung geändert und die TOPs 4 und 5 werden am heutigen Vormittag vorgezogen.\n\nTOP 2 Neue Marketingmaßnahmen\nCM und SW berichten, dass traditionelle Marketingmaßnahmen wie z. B. Fernsehwerbung zu den Hauptsendezeiten zu teuer sind. Deshalb sollen soziale Medien wie Facebook, Instagram u. a. verstärkt genutzt werden. Weitere Möglichkeiten, Werbung zu machen, müssen von der Marketingabteilung noch erörtert werden. Es ist geplant, neue Wege zu gehen und zusätzlich zu den lokalen Geschäften einen Online-Shop zu starten. Für alle diese Maßnahmen steht insgesamt ein Budget von 150.000 € zur Verfügung. CM wird beauftragt, dafür eine spezialisierte Werbeagentur zu finden sowie einen Kostenvoranschlag einzuholen. SW soll Kontakte zu professionellen Fotografen und Textern herstellen und Angebote anfordern. Ergebnisse werden am 10.03.20XX vorgestellt.\n\nTOP 3 Qualitätsmanagement\nZu den vorgeschlagenen Maßnahmen hat MH im Vorfeld allen Sitzungsteilnehmenden erste Ergebnisse des Arbeitskreises in Form eines Konzeptpapiers zukommen lassen. Da MH aus gesundheitlichen Gründen nicht teilnehmen kann, ist gemeinsam beschlossen worden, die Diskussion bis zur nächsten Besprechung am 10.03.20XX zu vertagen.\n\nTOP 4 Anpassung der Pausenzeiten\nAufgrund mehrfacher Anfragen regt MR an, die Pausenzeiten flexibler zu gestalten: Ein erweitertes Zeitfenster zwischen 11:30 Uhr und 13:00 Uhr, in dem eine Mittagspause von 30 Minuten gemacht werden kann. Dieser Vorschlag wird einstimmig angenommen.\n\nTOP 5 Standorte der neuen Fahrradständer\nMR teilt mit, dass zwei weitere Fahrradständer aufgestellt werden: neben Tor 2 und Tor 3. So steht den Mitarbeitenden an jedem Zugang eine Abstellmöglichkeit zur Verfügung. Der Lageplan wird überarbeitet und am Schwarzen Brett des Betriebsrats ausgehängt.\n\nTOP 6 Sonstiges\nFrau Schlosser verabschiedet sich in den Mutterschutz und die Elternzeit. Ansprechpartnerin bis zu ihrer Rückkehr wird Frau Meier im Büro von Frau Schmidt sein.",
            "fragen": [
                {
                    "nummer": 14,
                    "frage": "Für neue Werbemaßnahmen",
                    "optionen": [
                        "a) werden kreative Mitarbeiter gesucht.",
                        "b) wird ein Gesamtbetrag von 150.000 € bereitgestellt.",
                        "c) wurden Kostenvoranschläge angefragt."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Für alle diese Marketingmaßnahmen steht insgesamt ein Budget von 150.000 € zur Verfügung."
                },
                {
                    "nummer": 15,
                    "frage": "Herr Hamann",
                    "optionen": [
                        "a) hat bereits ein Konzept vorbereitet.",
                        "b) ist dienstlich verhindert.",
                        "c) stellt die Resultate seiner Arbeit vor."
                    ],
                    "korrekt": "a",
                    "erklaerung": "MH hat im Vorfeld allen ein Konzeptpapier zukommen lassen (fehlt aber krankheitsbedingt)."
                },
                {
                    "nummer": 16,
                    "frage": "Die Mittagspause",
                    "optionen": [
                        "a) ist 30 Minuten lang.",
                        "b) wird um 30 Minuten verlängert.",
                        "c) wird um 30 Minuten verschoben."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Das Zeitfenster liegt zwischen 11:30 und 13:00 Uhr, die Mittagspause selbst dauert 30 Minuten."
                },
                {
                    "nummer": 17,
                    "frage": "Der Standort der neuen Fahrradständer",
                    "optionen": [
                        "a) wird an der Informationstafel bekanntgegeben.",
                        "b) wird dem Betriebsrat mitgeteilt.",
                        "c) wird zwischen Tor 2 und 3 geplant."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Der überarbeitete Lageplan wird am Schwarzen Brett (Informationstafel) ausgehängt."
                },
                {
                    "nummer": 18,
                    "frage": "Frau Schlosser",
                    "optionen": [
                        "a) macht Frau Schmidt ein Geschenk.",
                        "b) verlässt das Unternehmen.",
                        "c) wird von Frau Meier vertreten."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Frau Meier ist Ansprechpartnerin und übernimmt die Vertretung bis zu Frau Schlossers Rückkehr aus der Elternzeit."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 4,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 4: Protokoll Hoher Krankenstand & Frühjahrsmesse Dresden",
        "punkte_max": 15,
        "inhalt": {
            "anweisung": "Lesen Sie das Protokoll. Welche Lösung (a, b oder c) ist jeweils richtig?",
            "text": "Protokoll 19.11.20XX, 08.00-11.45 Uhr\nZentrale, Raum 405\n\nSitzungsleitung: Lukas Wallner (LW)\nTeilnehmende: Jessica Müller (JM, Personalabteilung), Maximilian Berger (MB, Marketingabteilung), Rebecca Lehmann (RL, Öffentlichkeitsarbeit), Kurt Meichsner (KM, Verkauf)\nExtern: Ansgar Wolf (AW, Hausverwaltung)\nProtokollantin: Beate Richter (BR)\n\nTagesordnungspunkte:\n1. Begrüßung und Genehmigung des letzten Protokolls\n2. Personal\n3. Kundenbindung, Rabattaktion\n4. Vorbereitungen der Messe\n5. Neujahrsfeier\n6. Sonstiges\n\nTOP 1 Begrüßung und Genehmigung des letzten Protokolls\nLW begrüßt alle Teilnehmer und eröffnet die Besprechung. Herr Dr. Baumann ist auf Dienstreise entschuldigt. Das Protokoll vom 14. November wird einstimmig genehmigt.\n\nTOP 2 Personal\nDie Kundenbetreuung ist wegen vieler Erkrankungen unterbesetzt, ebenso die Personalabteilung. Krankmeldungen sollen vorübergehend direkt an JM gesendet werden. Urlaubsanträge können im Moment nur bei dringenden persönlichen Angelegenheiten genehmigt werden. Wegen des hohen Krankenstands mussten viele Überstunden geleistet werden, die bis Jahresende oder im Folgejahr abgebaut werden können. Herr Wortmann geht zum 1. Februar in den Ruhestand; sein Nachfolger wird KM. Drei neue Produktionsmitarbeiter beginnen zum 1. Dezember.\n\nTOP 3 Kundenbindung, Rabattaktion\nKM berichtet von Rabattaktionen des Wettbewerbers Lutz GmbH. RL schlägt eine Kundenbindungskampagne vor, wozu KM einen Konzeptentwurf vorlegt. Interessierte für ein Brainstorming sollen sich bei KM melden.\n\nTOP 4 Vorbereitungen der Messe\nIm nächsten Jahr nimmt die Firma erstmals an der Frühjahrsmesse in Dresden (20.-24. April) teil. Standplatz und Messebauer sind gebucht. Die Broschüren sind im Druck und werden in der 2. KW an Kunden verschickt. Standpersonal und Hotelzimmer werden gebucht.\n\nTOP 5 Neujahrsfeier\nAm 7. Januar findet die Neujahrsfeier im Restaurant „Zum Schwan“ statt. Rückmeldung bis 15. Dezember.\n\nTOP 6 Sonstiges\nDie Teeküche im 1. Stock wird renoviert und gestrichen. Persönliche Gegenstände (Tassen, Brotdosen) müssen bis Donnerstag mitgenommen werden, andernfalls werden sie entsorgt.",
            "fragen": [
                {
                    "nummer": 14,
                    "frage": "Bei der Sitzung wird",
                    "optionen": [
                        "a) das Protokoll der letzten Besprechung geändert.",
                        "b) die Tagesordnung genehmigt.",
                        "c) über Personalthemen gesprochen."
                    ],
                    "korrekt": "c",
                    "erklaerung": "TOP 2 befasst sich ausführlich mit Personal (Krankenstand, Urlaubssperre, Nachfolge, Neueinstellungen)."
                },
                {
                    "nummer": 15,
                    "frage": "Aufgrund des hohen Krankenstands",
                    "optionen": [
                        "a) bleibt die Arbeit teilweise unerledigt.",
                        "b) müssen die Überstunden im kommenden Jahr abgebaut werden.",
                        "c) gibt es eine Urlaubssperre."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Urlaubsanträge werden momentan nur in dringenden persönlichen Ausnahmefällen genehmigt (faktische Urlaubssperre)."
                },
                {
                    "nummer": 16,
                    "frage": "KM",
                    "optionen": [
                        "a) ist Wettbewerber der Firma.",
                        "b) möchte sein Konzept besprechen.",
                        "c) plant eine Rabattaktion im Frühling."
                    ],
                    "korrekt": "b",
                    "erklaerung": "KM hat einen ersten Entwurf ausgearbeitet und schlägt vor, das Konzept in einer kleineren Runde (Brainstorming) zu diskutieren."
                },
                {
                    "nummer": 17,
                    "frage": "Die Firma",
                    "optionen": [
                        "a) besucht die Frühjahrsmesse regelmäßig.",
                        "b) braucht Hilfe bei der Standgestaltung.",
                        "c) lässt gerade Broschüren drucken."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Die Broschüren für den Messeauftritt sind bereits im Druck."
                },
                {
                    "nummer": 18,
                    "frage": "Persönliche Gegenstände",
                    "optionen": [
                        "a) können nicht in der Küche bleiben.",
                        "b) sollen am Donnerstag mitgenommen werden.",
                        "c) sollen weggeworfen werden."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Da die Küche für Malerarbeiten komplett ausgeräumt wird, dürfen persönliche Gegenstände nicht dort verbleiben."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 4,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 5: Protokoll Neue Werbestrategie & Jobticket (Berlin)",
        "punkte_max": 15,
        "inhalt": {
            "anweisung": "Lesen Sie das Protokoll. Welche Lösung (a, b oder c) ist jeweils richtig?",
            "text": "Protokoll 15.04.20XX, 14:00-16:00 Uhr\nTagungsraum: 256, Ort: Geschwister-Scholl-Platz 12, 10738 Berlin\n\nAnwesende: Petra Kramer (PK, Geschäftsleitung), Yvonne Schmidt (YS, Assistenz der Geschäftsleitung), Thorsten Klein (TK, Leitung Einkauf), Sonja Kühl (SK, Leitung Finanzen), Jenny Mitschke (JM, Leitung Marketing), Ilkay Ergün (IE, Leitung Produktion), Johannes Schön (JS, Leitung Personal)\nGast: Jonas Braun (Deutsches Rotes Kreuz)\nSitzungsleitung: Johannes Schön\nProtokollantin: Yvonne Schmidt\n\nTagesordnungspunkte:\n1. Begrüßung und Genehmigung des Protokolls der letzten Sitzung\n2. Neue Werbemaßnahmen\n3. Beschwerden über schlecht geputzte Büros\n4. Fortbildung der Ersthelfer\n5. Einführung eines Jobtickets\n6. Sonstiges\n\nTOP 1 Begrüßung und Genehmigung des Protokolls\nJS begrüßt die Anwesenden und Gast Jonas Braun (DRK). Sommerfest-Datum wird auf den 19.07. korrigiert, danach Genehmigung.\n\nTOP 2 Neue Werbemaßnahmen\nJM berichtet über rückläufige Verkaufszahlen seit Januar und stellt Maßnahmen vor: Homepage moderner gestalten und SEO-optimieren, Präsenz in sozialen Medien ausbauen mit unterhaltsamen Werbevideos. Kostengünstigere Filmteams werden angefragt.\n\nTOP 3 Beschwerden über schlecht geputzte Büros\nDie neue Reinigungsfirma hinterlässt schmutzige Tische, volle Mülleimer und unordentliche Böden; Reinigungskräfte sind zudem nach 8.30 Uhr noch im Büro. JS fordert Besserung, sonst fristlose Kündigung.\n\nTOP 4 Fortbildung der Ersthelfer\nDRK-Kursleiter Jonas Braun leitet am Samstag, 10.06., ein 9-stündiges Training (als Arbeitszeit angerechnet). Maximale Teilnehmerzahl: acht Personen. Anmeldung bis 15.05. in der Personalabteilung.\n\nTOP 5 Einführung eines Jobtickets\nWegen Parkplatzmangels bezuschusst die Firma ab 01.07. das Monatsticket für den Nahverkehr mit 50 % (maximal 60 Euro). Anträge bei JS.\n\nTOP 6 Sonstiges\nLieferzeiten nach beigelegtem Streik in Litauen normalisiert. Ein neuer Mitarbeiter hat die Probezeit nicht bestanden.",
            "fragen": [
                {
                    "nummer": 14,
                    "frage": "Die neue Werbestrategie",
                    "optionen": [
                        "a) beinhaltet ein Video über die Produktionsabläufe.",
                        "b) ist wegen der schlechten Verkaufszahlen notwendig.",
                        "c) lässt sich sehr schnell und kostengünstig umsetzen."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Verkaufszahlen sind seit Januar stetig zurückgegangen; eine neue Strategie ist daher notwendig."
                },
                {
                    "nummer": 15,
                    "frage": "Die Reinigungsfirma",
                    "optionen": [
                        "a) hält sich nicht an die vereinbarten Putzzeiten.",
                        "b) putzt die Büros der Firma nicht regelmäßig.",
                        "c) wird den Vertrag demnächst kündigen."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Die Reinigungskräfte sollten bis 8.30 Uhr fertig sein, sind aber um 9 Uhr immer noch vor Ort."
                },
                {
                    "nummer": 16,
                    "frage": "Die Fortbildung für Ersthelfer",
                    "optionen": [
                        "a) ist nur mit begrenzter Teilnehmerzahl möglich.",
                        "b) müssen die Teilnehmer nur einmal absolvieren.",
                        "c) wird beim Deutschen Roten Kreuz veranstaltet."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Die Teilnehmerzahl ist strikt auf acht Personen beschränkt."
                },
                {
                    "nummer": 17,
                    "frage": "Das Jobticket",
                    "optionen": [
                        "a) soll zu 60 Prozent finanziert werden.",
                        "b) kann in der Personalabteilung beantragt werden.",
                        "c) wird ab nächsten Monat eingeführt."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Antragsformulare sind bei Johannes Schön (Leitung Personal) erhältlich."
                },
                {
                    "nummer": 18,
                    "frage": "Der Streik in Litauen",
                    "optionen": [
                        "a) dauert immer noch an.",
                        "b) fand landesweit statt.",
                        "c) führte zu Lieferproblemen."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Die Ursache der Lieferverzögerungen war der Streik beim litauischen Partner."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 4,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 6: Protokoll Warenauslieferung & Sanierung Kantine (Pinneberg)",
        "punkte_max": 15,
        "inhalt": {
            "anweisung": "Lesen Sie das Protokoll. Welche Lösung (a, b oder c) ist jeweils richtig?",
            "text": "Protokoll 05.02.20XX, 14.00 - 16.00 Uhr\nSitzungsraum: 239, Ort: Hauptstraße 23, 25421 Pinneberg\n\nAnwesende: Michael Müller (MM, Stellvertreter Geschäftsleitung), Katrin Wagner (KW, Leitung Personal), Henry Smith (HS, Leitung Produktion), Tomás Rodriguez (TR, Leitung Vertrieb), Manuela Hinz (MH, Leitung Qualitätsmanagement), Karl Lehmann (KL, Leitung Finanzen), Sabine Kurz (SK, Hausverwaltung)\nSitzungsleitung: Michael Müller\nProtokollantin: Katrin Wagner\n\nTagesordnungspunkte:\n1. Begrüßung und Genehmigung des letzten Protokolls\n2. Probleme bei der Warenauslieferung\n3. Berichte\n4. Sanierung der Kantine\n5. Neue Krankmeldungsregelung\n6. Sonstiges\n\nTOP 1 Begrüßung und Genehmigung des letzten Protokolls\nMM eröffnet die Sitzung. Protokoll vom 08.01. wird genehmigt. KW muss wegen eines Folgetermins früher gehen, daher wird TOP 5 vorgezogen.\n\nTOP 2 Probleme bei der Warenauslieferung\nTransportbeschädigungen bei der Auslieferung führen zu Kundenbeschwerden. Spedition beschuldigt Verpackungsmaterial, was Qualitätsprüfung zurückweist. MH schlägt vor, Auslieferung künftig selbst zu übernehmen; KL und TR erstellen dazu ein Finanzierungskonzept in zwei Monaten.\n\nTOP 3 Berichte\nZehn Zeitarbeitskräfte haben den Engpass am Fließband vorerst behoben. Zwei davon (Herr Hassani und Frau Zurek) sollen fest angestellt werden.\n\nTOP 4 Sanierung der Kantine\nKüche wird saniert, Kantine schließt für 6 bis 8 Wochen. Essensmarken gelten ersatzweise im Bistro „Suppenkasper“ in der Sonnenstraße von 12.00 bis 14.00 Uhr.\n\nTOP 5 Neue Krankmeldungsregelung (vorgezogener TOP)\nKrankmeldung künftig ab dem 1. Tag statt bisher ab dem 3. Tag. Die Maßnahme sorgt für Unmut in der Belegschaft und soll in der nächsten Sitzung erneut besprochen werden.\n\nTOP 6 Sonstiges\nNeue kostenlose Parkplätze am Eingang C stehen ab dem kommenden Monat bereit und können in der Personalabteilung beantragt werden.",
            "fragen": [
                {
                    "nummer": 14,
                    "frage": "Frau Wagner",
                    "optionen": [
                        "a) bittet um Änderungen des Protokolls vom 08.01.",
                        "b) hat heute noch einen anderen wichtigen Termin.",
                        "c) schlägt einen zusätzlichen Tagesordnungspunkt vor."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Frau Wagner muss die Sitzung früher verlassen wegen terminlicher Verpflichtungen."
                },
                {
                    "nummer": 15,
                    "frage": "Die Geschäftsleitung möchte, dass",
                    "optionen": [
                        "a) das Thema Krankmeldung nicht mehr besprochen wird.",
                        "b) man bei Krankheit spätestens am dritten Tag zum Arzt geht.",
                        "c) sich Mitarbeiter bei Krankheit sofort krankschreiben lassen."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Mitarbeiter sollen künftig schon ab dem ersten Krankheitstag einen Krankenschein vorlegen."
                },
                {
                    "nummer": 16,
                    "frage": "Karl Lehmann soll",
                    "optionen": [
                        "a) besseres Verpackungsmaterial einkaufen.",
                        "b) einen Finanzierungsplan erstellen.",
                        "c) Kontakt mit der Spedition aufnehmen."
                    ],
                    "korrekt": "b",
                    "erklaerung": "KL erarbeitet zusammen mit TR ein Finanzierungskonzept für den firmeneigenen Lieferdienst."
                },
                {
                    "nummer": 17,
                    "frage": "In der Produktionsabteilung",
                    "optionen": [
                        "a) gibt es derzeit genügend Mitarbeiter.",
                        "b) will man alle Zeitarbeiter fest anstellen.",
                        "c) wurden zwei neue Mitarbeiter fest eingestellt."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Durch die zehn Zeitarbeitskräfte ist der personelle Engpass für den Moment behoben."
                },
                {
                    "nummer": 18,
                    "frage": "In der Kantine",
                    "optionen": [
                        "a) bekommt man in den kommenden Wochen kein Essen.",
                        "b) kann man ab Montag von 12 bis 14 Uhr zu Mittag essen.",
                        "c) sollten die Essensmarken abgeschafft werden."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Die Kantine ist wegen Sanierungsarbeiten 6 bis 8 Wochen komplett geschlossen."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 4,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 7: Protokoll Homeoffice & Betriebsausflug (Frankfurt)",
        "punkte_max": 15,
        "inhalt": {
            "anweisung": "Lesen Sie das Protokoll. Welche Lösung (a, b oder c) ist jeweils richtig?",
            "text": "Protokoll 27.08.20XX, 10.00 bis 11.30 Uhr\nKonferenzraum Rhein-Main, Am Wegesrand 12, 63345 Frankfurt\n\nAnwesende: Thomas Köhler (TK, Werkstatt), Brigitte Turner (BT, Personal), Gerd Schneider (GS, Buchhaltung), Hilde Bruhns (HB, Buchhaltung)\nEntschuldigt: Karl Muster (KM, Lager)\nSitzungsleitung: Gerd Schneider\nProtokollführung: Thomas Köhler\n\nTagesordnungspunkte:\n1. Begrüßung und Eröffnung der Sitzung\n2. Erste-Hilfe-Kurs\n3. Homeoffice\n4. Personelle Engpässe Buchhaltung\n5. Betriebsausflug\n6. Sonstiges\n\nTOP 1 Begrüßung und Eröffnung der Sitzung\nGS begrüßt alle und stellt Hilde Bruhns vor, die seit 1. August in der Buchhaltung für Gehaltsauszahlungen zuständig ist.\n\nTOP 2 Erste-Hilfe-Kurs\nNach einem Arbeitsunfall in der Werkstatt und einem Schwächeanfall schlägt TK einen Erste-Hilfe-Kurs mit dem Roten Kreuz an zwei Freitagen für interessierte Mitarbeiter vor.\n\nTOP 3 Homeoffice\nBT berichtet über den Wunsch vieler Mitarbeiter nach teilweisem Homeoffice. Vorhandene Laptops und Diensthandys genügen vorerst ohne signifikante Mehrkosten; bei Bewährung folgt gesicherter VPN-Zugang.\n\nTOP 4 Personelle Engpässe in der Buchhaltung\nHohes Arbeitsaufkommen und Krankheitsausfall überlasten die drei Buchhalter. Eine zusätzliche Stelle soll ausgeschrieben und besetzt werden.\n\nTOP 5 Betriebsausflug\nAm 1. Oktober ganztägiger Ausflug: Treffpunkt 9.00 Uhr vor dem Haupteingang, Busfahrt zum Kastell Saalburg mit kleiner Wanderung, Rückkehr um 19.00 Uhr.\n\nTOP 6 Sonstiges\nEntfällt.",
            "fragen": [
                {
                    "nummer": 14,
                    "frage": "Frau Bruhns",
                    "optionen": [
                        "a) arbeitet seit einigen Wochen in der Buchhaltung.",
                        "b) bezahlt die Gehälter der Mitarbeiter*innen.",
                        "c) nimmt bald ihre Tätigkeit auf."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Sie ist seit dem 1. August in der Buchhaltung tätig (Sitzung findet Ende August statt)."
                },
                {
                    "nummer": 15,
                    "frage": "Der Erste-Hilfe-Kurs",
                    "optionen": [
                        "a) findet jeden Freitag statt.",
                        "b) ist für alle Mitarbeiter*innen verpflichtend.",
                        "c) wird vom Roten Kreuz durchgeführt."
                    ],
                    "korrekt": "c",
                    "erklaerung": "TK hat bereits mit dem Roten Kreuz gesprochen, um den Kurs durchzuführen."
                },
                {
                    "nummer": 16,
                    "frage": "Homeoffice",
                    "optionen": [
                        "a) erfordert die Anschaffung neuer Arbeitsgeräte.",
                        "b) verringert die Arbeitszeit der Mitarbeitenden.",
                        "c) wird von vielen Mitarbeitenden gewünscht."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Mitarbeiter*innen tragen immer wieder den Wunsch nach Homeoffice an die Personalleitung heran."
                },
                {
                    "nummer": 17,
                    "frage": "In der Abteilung Buchhaltung",
                    "optionen": [
                        "a) gibt es zu viele Beschäftigte.",
                        "b) sind viele Kolleg*innen erkrankt.",
                        "c) soll eine Stelle ausgeschrieben werden."
                    ],
                    "korrekt": "c",
                    "erklaerung": "GS plant, eine weitere Mitarbeiterin oder einen Mitarbeiter einzustellen."
                },
                {
                    "nummer": 18,
                    "frage": "Der Betriebsausflug wird",
                    "optionen": [
                        "a) für den ganzen Tag geplant.",
                        "b) jedes Jahr von den gleichen Personen organisiert.",
                        "c) zum besseren Kennenlernen der Kolleg*innen genutzt."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Der Ausflug dauert von 9:00 Uhr morgens bis 19:00 Uhr abends (ganztägig)."
                }
            ]
        }
    }
]

# Insert each variant if not exists
for v in teil4_variants:
    existing = sb.table('b2_questions').select('id').eq('modul', 'lesen').eq('aufgabe', 4).eq('thema', v['thema']).execute()
    if existing.data:
        print(f"Zaten mevcut: {v['thema']}")
    else:
        res = sb.table('b2_questions').insert(v).execute()
        print(f"Eklendi: {v['thema']}")

print("Lesen Teil 4 varyantları başarıyla tamamlandı!")
