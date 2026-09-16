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

# 1. Update existing Aufgabe 1 and Aufgabe 2 titles
sb.table('b2_questions').update({
    'thema': 'Varyant 1: Putzdienst – Arbeitszeiten und 20% Rabatt (Huber GmbH)',
    'aufgabe': 1,
    'aufgabe_typ': 'beschwerde'
}).eq('modul', 'schreiben').ilike('thema', '%Verschlechterung des Services%').execute()

sb.table('b2_questions').update({
    'thema': 'Varyant 1: Private Mobiltelefone nur in den Pausen',
    'aufgabe': 2,
    'aufgabe_typ': 'forumsbeitrag'
}).eq('modul', 'schreiben').ilike('thema', '%Firmenhandy oder Kleiderordnung%').execute()

# Additional Beschwerdebriefe (Aufgabe 1)
beschwerde_variants = [
    {
        "modul": "schreiben",
        "aufgabe": 1,
        "aufgabe_typ": "beschwerde",
        "thema": "Varyant 2: Tischlampe – Lieferschwierigkeiten (Frau Berger)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten im Kundenservice. Ihre Teamleitung bittet Sie, auf die Beschwerde einer Kundin bezüglich nicht gelieferter Tischlampen zu antworten. Gehen Sie auf alle Punkte ein.",
            "situation": "Kunde (Frau Berger / Frau Lutz) hat 25 Tischlampen für neu renovierte Büroräume bestellt, die bis Freitag nicht angekommen sind. Sie droht mit Stornierung der Bestellung bis Montagmittag.\n\nAnweisung der Teamleitung: Erklären Sie Frau Berger die Lieferschwierigkeiten des Herstellers, bitten Sie sie, bis nächste Woche zu warten, und bieten Sie alternativ ein ähnliches Modell an, das auf Lager ist.",
            "inhaltspunkte": [
                "Bedauern und Entschuldigung für die Unannehmlichkeiten",
                "Erklärung der Lieferverzögerung (Hersteller / unvorhergesehene Lieferschwierigkeiten)",
                "Bitte um etwas Geduld bis Anfang nächster Woche",
                "Konkretes Alternativangebot (ähnliches Modell direkt ab Lager lieferbar)"
            ],
            "mindestwoerter": 100,
            "musterloesung": "Sehr geehrte Frau Berger,\n\nvielen Dank für Ihre Rückmeldung von gestern. Wir bedauern die entstandenen Unannehmlichkeiten sehr und bitten um Entschuldigung. Heute habe ich mit dem Hersteller gesprochen und herausgefunden, dass der Grund für die Verzögerung unvorhergesehene Lieferschwierigkeiten sind. Ich möchte Ihnen versichern, dass in der Vergangenheit solche Situationen in wenigen Tagen behoben werden konnten. Deswegen bitten wir Sie noch um ein wenig Geduld. Falls Ihre bestellten Tischlampen bis kommenden Montag nicht eintreffen, bieten wir Ihnen gerne ein sehr ähnliches und hochwertiges Modell an, welches wir sofort auf Lager haben. Wir hoffen, dass Sie mit dieser Lösung zufrieden sind, und danken Ihnen für Ihr Verständnis.\n\nMit freundlichen Grüßen\nLukas Klein"
        }
    },
    {
        "modul": "schreiben",
        "aufgabe": 1,
        "aufgabe_typ": "beschwerde",
        "thema": "Varyant 3: Website-Erstellung – Farbkonzept & Namensfehler (Herr Stiller)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten in einer Web-Agentur. Ihre Projektleiterin bittet Sie, auf die E-Mail von Herrn Stiller zu antworten.",
            "situation": "Herr Stiller bemängelt, dass auf der neuen Website das Farbschema nicht wie gewünscht ist und Namen vertauscht wurden.\n\nAnweisung der Projektleitung: Zusagen, dass Namensfehler umgehend korrigiert werden. Bezüglich des Farbschemas darauf hinweisen, dass dies vertraglich so vereinbart war. Da dies bereits der 5. Korrekturwunsch ist, darauf hinweisen, dass weitere Änderungen 200 € extra kosten.",
            "inhaltspunkte": [
                "Höfliche Reaktion auf die Rückmeldung und Entschuldigung",
                "Zusage der raschen Namenskorrektur bis Ende der Woche",
                "Klarstellung zum Farbschema laut ursprünglichem Vertrag",
                "Hinweis auf Mehrkosten für zusätzliche Korrekturschleifen (200 €)"
            ],
            "mindestwoerter": 100,
            "musterloesung": "Sehr geehrter Herr Stiller,\n\nvielen Dank für Ihre Rückmeldung zu unserem Entwurf. Wir bedauern das Versehen bei den Mitarbeiterdaten sehr und möchten Ihnen versichern, dass wir die vertauschten Namen und Fotos selbstverständlich bis zum Ende dieser Woche kostenfrei korrigieren werden. Bitte beachten Sie jedoch bezüglich des Designs, dass das blau-orange Farbschema in unserem ursprünglichen Vertrag genau so vereinbart worden ist. Zudem handelt es sich hierbei bereits um die fünfte Korrekturphase. Zusätzliche gestalterische Änderungen können wir nur gegen eine Pauschale von 200 € durchführen. Bitte teilen Sie uns kurz mit, ob Sie mit diesem Vorgehen einverstanden sind.\n\nMit freundlichen Grüßen\nMonika Holsten"
        }
    },
    {
        "modul": "schreiben",
        "aufgabe": 1,
        "aufgabe_typ": "beschwerde",
        "thema": "Varyant 4: Spülmaschine defekt & Wasserschaden (Herr Krüger)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten beim Küchenausstatter. Ihre Teamleitung beauftragt Sie, Herrn Krüger zu antworten.",
            "situation": "Herr Krüger beschwert sich über eine neu eingebaute Spülmaschine, die defekt ist und durch auslaufendes Wasser das Parkett beschädigt hat. Er fordert sofortige Reparatur und Kostenübernahme für den Parkettschaden.\n\nAnweisung der Teamleitung: Entschuldigen, Technikerbesuch für Montag 8 Uhr vorschlagen, Prüfung der Forderungen zusagen, aber vorsorglich darauf hinweisen, dass bei fehlenden Ersatzteilen die Reparatur nicht sofort abgeschlossen werden kann.",
            "inhaltspunkte": [
                "Entschuldigung für die Unannehmlichkeiten und den Wasserschaden",
                "Konkreter Terminvorschlag für Techniker (Montag 8:00 Uhr)",
                "Bereitschaft zur Überprüfung des Parketts und der Kostenübernahme",
                "Vorbehalt bezüglich eventuell benötigter Ersatzteile"
            ],
            "mindestwoerter": 100,
            "musterloesung": "Sehr geehrter Herr Krüger,\n\nvielen Dank für Ihre Nachricht. Wir bedauern den Vorfall in Ihrer Teeküche außerordentlich und bitten für den Ausfall sowie den entstandenen Schaden um Entschuldigung. Gerne schicken wir Ihnen am kommenden Montag um 8:00 Uhr einen Servicetechniker vorbei, um das Gerät zu prüfen und den Schaden am Parkett aufzunehmen. Bitte teilen Sie uns mit, ob Ihnen dieser Termin passt. Wir werden die Kostenübernahme nach dem Befund sorgfältig prüfen. Bitte beachten Sie vorsorglich, dass eine sofortige Reparatur am Montag davon abhängt, ob spezielle Ersatzteile vorrätig sind. Wir tun alles, um Ihnen schnellstmöglich zu helfen.\n\nMit freundlichen Grüßen\nAnika Retterstein"
        }
    },
    {
        "modul": "schreiben",
        "aufgabe": 1,
        "aufgabe_typ": "beschwerde",
        "thema": "Varyant 5: Büroumzug – Verspätung & Möbelschaden (Herr Zaun)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten bei einem Umzugsunternehmen. Antworten Sie auf die Beschwerde von Herrn Zaun nach einem Büroumzug von Hanau nach Frankfurt.",
            "situation": "Mitarbeiter kamen 30 Minuten zu spät und nur zu dritt statt zu viert; Möbelaufbau ist unvollständig; Glasplatten zerbrochen und Schränke verkratzt.\n\nAnweisung der Teamleitung: Entschuldigen, Gründe erklären (Autopanne und Krankheitsausfall), zusagen, dass am Mittwoch zwei Packer den Aufbau vollenden, und die Übernahme der Reparatur-/Ersatzkosten für die beschädigten Möbel zusichern.",
            "inhaltspunkte": [
                "Ausführliche Entschuldigung für die Verzögerungen",
                "Erklärung der Ursachen (Panne und akuter Personalausfall)",
                "Zusage für Mittwochmorgen (2 Mitarbeiter zum Fertigstellen des Aufbaus)",
                "Kostenübernahme für Bruch- und Kratzschäden an den Büromöbeln"
            ],
            "mindestwoerter": 100,
            "musterloesung": "Sehr geehrter Herr Zaun,\n\nvielen Dank für Ihre Rückmeldung. Wir bedauern die Unannehmlichkeiten bei Ihrem Umzug zutiefst und bitten um Entschuldigung. Die Verzögerung und die Unterbesetzung waren einer unvorhergesehenen Fahrzeugpanne sowie kurzfristigen Krankheitsausfällen geschuldet. Wir möchten Ihnen versichern, dass dies nicht unserem Standard entspricht. Am kommenden Mittwochmorgen werden pünktlich zwei Monteure bei Ihnen eintreffen, um den restlichen Aufbau der Möbel zügig zu beenden. Selbstverständlich übernimmt unsere Versicherung den Schaden an den Glasplatten und Schränken in voller Höhe. Wir danken Ihnen für Ihre Geduld.\n\nMit freundlichen Grüßen\nMonika Kühne"
        }
    },
    {
        "modul": "schreiben",
        "aufgabe": 1,
        "aufgabe_typ": "beschwerde",
        "thema": "Varyant 6: Drucker & Toner-Lieferung (Firma Schmidt)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Sie arbeiten im Bürofachhandel. Antworten Sie Herrn Schmidt bezüglich einer fehlerhaften Toner-Lieferung für seinen neuen Netzwerkdrucker.",
            "situation": "Der Kunde erhielt die falschen Tonerkassetten für seinen Bürodrucker, weshalb im Büro wichtige Rechnungen nicht gedruckt werden können.\n\nAnweisung: Entschuldigen, per Kurier noch heute die passenden Original-Toner liefern lassen, die fehlerhaften Kassetten kostenfrei abholen und einen Warengutschein über 50 € beilegen.",
            "inhaltspunkte": [
                "Bedauern und Entschuldigung für die Fehlbelieferung",
                "Sofortige Nachlieferung per Expresskurier am selben Tag",
                "Kostenlose Rücknahme der falschen Patronen",
                "Wiedergutmachung (50 € Warengutschein für den nächsten Einkauf)"
            ],
            "mindestwoerter": 100,
            "musterloesung": "Sehr geehrter Herr Schmidt,\n\nvielen Dank für Ihren Hinweis. Wir bedauern diesen bedauerlichen Packfehler sehr und entschuldigen uns für die Verzögerungen bei Ihren Druckaufträgen. Wir haben soeben veranlasst, dass Ihnen die korrekten Tonerkassetten noch heute Nachmittag per Expresskurier zugestellt werden. Der Kurier wird die falsch gelieferten Kassetten direkt kostenfrei wieder mitnehmen. Als Entschädigung für den Ausfall legen wir der Sendung einen Einkaufsgutschein im Wert von 50 € für Ihre nächste Bestellung bei. Wir freuen uns, Sie weiterhin zu unseren geschätzten Kunden zählen zu dürfen.\n\nMit freundlichen Grüßen\nKarsten Weber"
        }
    }
]

# Additional Forumsbeiträge (Aufgabe 2)
forums_variants = [
    {
        "modul": "schreiben",
        "aufgabe": 2,
        "aufgabe_typ": "forumsbeitrag",
        "thema": "Varyant 2: Nur Veganes Menü in der Kantine (+20% Kosten)",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "In Ihrer Firma wird diskutiert, ob in der Betriebskantine zukünftig ausschließlich vegetarische und vegane Bio-Gerichte angeboten werden sollen. Dafür sollen die Preise um 20% steigen. Schreiben Sie einen Forumsbeitrag und äußern Sie Ihre Meinung.",
            "situation": "Die Geschäftsführung plant eine rein fleischlose Kantine mit Bioqualität. Im Firmenforum wird heiß diskutiert, ob diese Umstellung gesund und zeitgemäß ist oder die Wahlfreiheit der Belegschaft einschränkt.",
            "inhaltspunkte": [
                "Eigene Meinung zur rein veganen Ausrichtung und Preiserhöhung begründen",
                "Vor- und Nachteile von vegetarischer Ernährung im Arbeitsalltag abwägen",
                "Einen Kompromissvorschlag machen (z. B. Mischangebot oder Veggie-Tage)",
                "Erfahrungen aus Ihrem bisherigen Berufsleben schildern"
            ],
            "mindestwoerter": 120,
            "musterloesung": "Hallo zusammen,\n\nich verfolge die Diskussion über unser zukünftiges Kantinenangebot mit großem Interesse. Einerseits halte ich es für ein gutes Signal für Umwelt und Gesundheit, mehr regionale Bio-Produkte anzubieten. Andererseits finde ich es problematisch, Fleischgerichte komplett zu verbieten und gleichzeitig die Preise um 20 % anzuheben.\n\nIn meinem früheren Betrieb gab es jeden Donnerstag einen sogenannten 'Veggie-Day', an dem ausschließlich vegetarische Speisen serviert wurden. Das wurde von der Mehrheit sehr gut angenommen, weil die Mitarbeitenden an den anderen Tagen weiterhin freie Wahl hatten.\n\nIch schlage daher vor, nicht komplett umzustellen, sondern täglich mindestens zwei hochwertige vegane Gerichte neben einer klassischen Speise anzubieten. So bleibt die Kantine für alle attraktiv und bezahlbar.\n\nViele Grüße\nAlex"
        }
    },
    {
        "modul": "schreiben",
        "aufgabe": 2,
        "aufgabe_typ": "forumsbeitrag",
        "thema": "Varyant 3: Großraumbüro statt Einzelbüros",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "In Ihrer Firma sollen zukünftig alle Einzelbüros abgeschafft und alle Mitarbeitenden in einem offenen Großraumbüro zusammengelegt werden. Schreiben Sie einen Forumsbeitrag.",
            "situation": "Um Kosten zu sparen und die interne Kommunikation zu fördern, plant das Unternehmen den Umbau aller Abteilungen zu Großraumbüros.",
            "inhaltspunkte": [
                "Persönliche Stellungnahme zum Großraumkonzept formulieren",
                "Auswirkungen auf Konzentration, Lärmpegel und Teamarbeit darlegen",
                "Maßnahmen zur Lärmminderung und Rückzugsorte fordern",
                "Alternative Lösungen wie Desk-Sharing und Kombi-Büros vorschlagen"
            ],
            "mindestwoerter": 120,
            "musterloesung": "Liebe Kolleginnen und Kollegen,\n\nich möchte mich zur geplanten Einführung des Großraumbüros äußern. Natürlich kann ein offener Raum den schnellen Informationsaustausch zwischen den Teams erleichtern. Allerdings mache ich mir große Sorgen um die Konzentration.\n\nGerade bei komplexen Aufgaben oder wichtigen Kundentelefonaten führt ständige Unruhe zu erhöhtem Stress und Flüchtigkeitsfehlern. Aus meiner Sicht sollte ein solcher Umbau nur stattfinden, wenn ausreichend schallgedämpfte Telefonboxen und kleine Ruheräume für konzentriertes Arbeiten eingerichtet werden.\n\nEine ideale Lösung wäre ein kombiniertes Modell: offene Zonen für Projektarbeit und flexible Arbeitsplätze mit der Möglichkeit, auch im Homeoffice oder in Stillarbeitsräumen tätig zu sein. Was meint ihr dazu?\n\nBeste Grüße\nThomas"
        }
    },
    {
        "modul": "schreiben",
        "aufgabe": 2,
        "aufgabe_typ": "forumsbeitrag",
        "thema": "Varyant 4: Samstags 2 Mal pro Jahr an Fortbildungen",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Die Firmenleitung möchte, dass alle Beschäftigten zweimal im Jahr an einem Samstag an verpflichtenden Schulungen teilnehmen. Als Ausgleich soll es je einen freien Urlaubstag geben. Schreiben Sie Ihre Meinung im Forum.",
            "situation": "Aufgrund hoher Auftragslage sollen Weiterbildungen nicht während der regulären Wochenarbeitszeit, sondern an Samstagen stattfinden.",
            "inhaltspunkte": [
                "Meinung zur Fortbildung am Samstag mit Freizeitausgleich begründen",
                "Bedeutung von Weiterbildung für die berufliche Qualifikation hervorheben",
                "Herausforderungen für Beschäftigte mit Familie und Kindern erwähnen",
                "Vorschlag zur flexiblen Online-Weiterbildung oder Terminauswahl machen"
            ],
            "mindestwoerter": 120,
            "musterloesung": "Hallo zusammen,\n\ndas Thema Weiterbildung ist für uns alle essenziell, um fachlich auf dem neuesten Stand zu bleiben. Dass die Geschäftsleitung zwei Fortbildungen pro Jahr anbietet, bewerte ich daher grundsätzlich sehr positiv.\n\nDass diese Termine jedoch auf den Samstag gelegt werden sollen, halte ich für problematisch. Für Kollegen mit Kindern oder familiären Verpflichtungen ist das Wochenende die wichtigste Erholungszeit. Auch ein zusätzlicher Urlaubstag kann diese Einschränkung nicht immer ausgleichen.\n\nIch fände es sinnvoller, hybride Modelle anzubieten: etwa interaktive Online-Module, die flexibel eingeteilt werden können, oder einen Werktag als offiziellen Weiterbildungstag zu nutzen. So profitieren Betrieb und Belegschaft gleichermaßen.\n\nHerzliche Grüße\nSarah"
        }
    },
    {
        "modul": "schreiben",
        "aufgabe": 2,
        "aufgabe_typ": "forumsbeitrag",
        "thema": "Varyant 5: Wochenendreise statt Weihnachtsfeier",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Statt der traditionellen Weihnachtsfeier im Dezember plant die Geschäftsleitung, die Belegschaft samt Familien zu einer gemeinsamen Wochenendreise in eine europäische Stadt einzuladen. Diskutieren Sie im Forum.",
            "situation": "Einladung der Firma zu einer dreitägigen Firmenreise im Frühjahr als Teamevent anstelle des üblichen Weihnachtsessens.",
            "inhaltspunkte": [
                "Einstellung zu einer Firmenreise im Vergleich zum traditionellen Fest äußern",
                "Teambuilding-Faktor und Einbezug von Familienmitgliedern bewerten",
                "Organisatorischen und zeitlichen Aufwand reflektieren",
                "Abschließendes Fazit und Stimmungsbild abgeben"
            ],
            "mindestwoerter": 120,
            "musterloesung": "Liebe Kollegen,\n\ndie Idee, statt der jährlichen Weihnachtsfeier eine Städtereise mit der gesamten Belegschaft und unseren Familien zu unternehmen, klingt im ersten Moment fantastisch und großzügig. Es bietet eine wunderbare Gelegenheit, das Team noch enger zusammenzuschweißen.\n\nAllerdings sollten wir bedenken, dass ein ganzes Wochenende eine große zeitliche Bindung bedeutet. Nicht jeder möchte seine private Freizeit mit Kollegen verbringen oder hat Betreuungsmöglichkeiten für Haustiere.\n\nMeiner Meinung nach sollte die Teilnahme an einer solchen Reise absolut freiwillig sein. Ein gemütliches Abendessen zum Jahresausklang lässt sich zudem schneller und unkomplizierter realisieren. Vielleicht könnte man eine Umfrage starten, um die Mehrheit abzufragen.\n\nViele Grüße\nMichael"
        }
    },
    {
        "modul": "schreiben",
        "aufgabe": 2,
        "aufgabe_typ": "forumsbeitrag",
        "thema": "Varyant 6: Raumtemperatur auf 19°C & Energiesparpläne",
        "punkte_max": 20,
        "inhalt": {
            "anweisung": "Um Energiekosten zu senken und die Umwelt zu schonen, sollen die Büros erst ab Oktober geheizt und die Temperatur auf maximal 19 °C beschränkt werden. Schreiben Sie Ihre Meinung im Forum.",
            "situation": "Firmenweite Energiesparmaßnahmen in Bürogebäuden.",
            "inhaltspunkte": [
                "Bedeutung von Energiesparen und Klimaschutz anerkennen",
                "Einfluss kühler Raumtemperaturen auf Gesundheit und Tippen am PC thematisieren",
                "Praktische Lösungsvorschläge (z. B. flexible Kleiderordnung, Wärmezonen)",
                "Fazit zur Ausgewogenheit zwischen Sparsamkeit und Arbeitsschutz"
            ],
            "mindestwoerter": 120,
            "musterloesung": "Hallo an alle,\n\ndass unsere Firma Verantwortung für Energieeffizienz und Klimaschutz übernimmt, ist lobenswert. Dennoch bereitet mir die Begrenzung auf 19 °C im Büro einige Sorgen.\n\nBei reiner Schreibtischarbeit ohne viel körperliche Bewegung kühlt der Körper rasch aus. Kalte Hände erschweren das Tippen und das Erkältungsrisiko steigt, was zu höheren Krankheitsausfällen führen könnte.\n\nIch schlage vor, dass die Temperatur auf mindestens 20 bis 21 Grad gehalten wird und stattdessen an anderer Stelle gespart wird: zum Beispiel durch den konsequenten Austausch alter Fensterdichtungen, das Ausschalten von Standby-Geräten und den Ausbau von Homeoffice-Tagen im Winter. So sparen wir Energie, ohne die Gesundheit zu gefährden.\n\nSchöne Grüße\nDavid"
        }
    }
]

# Insert all
for v in beschwerde_variants:
    existing = sb.table('b2_questions').select('id').eq('modul', 'schreiben').eq('aufgabe', 1).eq('thema', v['thema']).execute()
    if existing.data:
        print(f"Zaten mevcut: {v['thema']}")
    else:
        sb.table('b2_questions').insert(v).execute()
        print(f"Eklendi (Beschwerde): {v['thema']}")

for v in forums_variants:
    existing = sb.table('b2_questions').select('id').eq('modul', 'schreiben').eq('aufgabe', 2).eq('thema', v['thema']).execute()
    if existing.data:
        print(f"Zaten mevcut: {v['thema']}")
    else:
        sb.table('b2_questions').insert(v).execute()
        print(f"Eklendi (Forum): {v['thema']}")

print("Schreiben varyantları başarıyla Supabase'e aktarıldı!")
