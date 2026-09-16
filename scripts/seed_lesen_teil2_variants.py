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

# 1. Update existing Variant 1 title
sb.table('b2_questions').update({
    'thema': 'Varyant 1: Gemeinschaftsveranstaltungen & Sicherheitsregeln im Labor'
}).eq('modul', 'lesen').eq('aufgabe', 2).ilike('thema', '%Willkommensmappe%').execute()

teil2_variants = [
    {
        "modul": "lesen",
        "aufgabe": 2,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 2: Zeiterfassung & Arbeitsunfälle",
        "punkte_max": 10,
        "inhalt": {
            "anweisung": "Lesen Sie die Texte 1 und 2 aus der Willkommensmappe für neue Mitarbeiter. Entscheiden Sie, ob die Aussagen 6 und 8 richtig oder falsch sind und welche Antwort (a, b oder c) bei den Aufgaben 7 und 9 am besten passt.",
            "text": "Text 1\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nZugangskontrolle und Zeiterfassung\n\nAls Mitarbeiterinnen und Mitarbeiter erhalten Sie zu Beginn Ihres Arbeitsverhältnisses einen Firmenausweis mit Chip-Karte. Dieser berechtigt zum Zugang in das Unternehmensgebäude und dient gleichzeitig zur Erfassung der Arbeitszeit. Außerdem können Sie mit Ihrem Firmenausweis in der Kantine und am Getränkeautomaten bezahlen und das hauseigene Fitnessstudio benutzen. Neben den Aufzügen im Erdgeschoss finden Sie ein digitales Zeiterfassungsgerät. Bitte halten Sie beim Betreten und Verlassen des Gebäudes Ihren Firmenausweis an die blau markierte Fläche und vergewissern Sie sich, dass die Zeit des Arbeitsbeginns und Arbeitsendes richtig erfasst wurde. Dies erkennen Sie anhand der Anzeige des Geräts, die Ihnen Ihre monatliche Arbeitszeit anzeigt. Die Zeiterfassung berechnet automatisch die reguläre Arbeitszeit sowie eventuelle Über- als auch Minusstunden. Die Personalabteilung richtet Ihnen einen Zugang zu unserem Arbeitskonten-System PersoTime ein. Damit können Sie im Intranet Ihr Arbeitszeitkonto jederzeit einsehen.\n\n---\n\nText 2\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nArbeitsunfälle\n\nArbeitsunfälle sind Unfälle, die Beschäftigte bei der Ausübung ihrer Arbeit oder einer Dienstreise erleiden. Es muss also ein ursächlicher Zusammenhang mit der beruflichen Tätigkeit bestehen. Nach einem Arbeitsunfall müssen Beschäftigte ihren Arbeitgeber umgehend über den Unfall in Kenntnis setzen und sich ggf. in Behandlung begeben. Außerdem ist, sobald es der Gesundheitszustand des Geschädigten zulässt, ein detaillierter Unfallbericht zu verfassen und der Personalabteilung vorzulegen. Im Falle einer Arbeitsunfähigkeit nach einem Arbeitsunfall erhalten Arbeitnehmende für sechs Wochen eine Lohnfortzahlung vom Arbeitgeber, danach übernimmt die Berufsgenossenschaft (BG), zahlt u. a. Verletztengeld in Höhe von 80 Prozent des Bruttogehalts und kommt ggf. auch für weitere Kosten auf. Zu Arbeitsunfällen zählen auch Wegeunfälle, also Unfälle, die sich auf dem direkten Weg zwischen dem Wohngebäude und der Arbeitsstätte ereignen. Dieser Weg beginnt vor der eigenen Haustür und endet, sobald die Arbeitnehmenden das Unternehmen erreicht haben. Dabei sind bestimmte notwendige Umwege mitversichert, wie etwa der Weg zur Kita, Umleitungen oder im Falle von Fahrgemeinschaften, unabhängig davon, mit welchen Verkehrsmitteln man sich fortbewegt. Der Versicherungsschutz umfasst ausschließlich Personenschäden; Sachschäden, wie z. B. Schäden am Fahrzeug, sind hierbei nicht mitversichert. Die BG übernimmt in diesem Fall z. B. die Behandlungskosten sowie ggf. Krankenpflege oder medizinische Rehabilitation.",
            "fragen": [
                {
                    "nummer": 6,
                    "frage": "Der Firmenausweis hat neben der Arbeitszeiterfassung auch andere Funktionen.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "richtig",
                    "erklaerung": "Der Firmenausweis berechtigt zum Zugang ins Gebäude, dient zur Zeiterfassung, als Zahlungsmittel in der Kantine und am Getränkeautomaten und für das Fitnessstudio."
                },
                {
                    "nummer": 7,
                    "frage": "Überstunden",
                    "optionen": [
                        "a) können online eingesehen werden.",
                        "b) sind in der Firma grundsätzlich nicht erlaubt.",
                        "c) werden von der Zeiterfassung nicht registriert."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Mit dem Zugang zum System 'PersoTime' können Mitarbeiter im Intranet ihr Arbeitszeitkonto (inkl. Überstunden) jederzeit einsehen."
                },
                {
                    "nummer": 8,
                    "frage": "Ein Fahrradunfall auf dem Weg zur Arbeit zählt nicht als Arbeitsunfall.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "falsch",
                    "erklaerung": "Wegeunfälle zählen als Arbeitsunfälle – unabhängig davon, mit welchen Verkehrsmitteln man sich fortbewegt."
                },
                {
                    "nummer": 9,
                    "frage": "Nach einem Arbeitsunfall",
                    "optionen": [
                        "a) bezahlt die Berufsgenossenschaft sofort Verletztengeld.",
                        "b) erhalten Arbeitnehmer sechs Wochen volles Gehalt.",
                        "c) trägt der Arbeitgeber die Kosten für die medizinische Versorgung."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Arbeitnehmende erhalten für sechs Wochen eine Lohnfortzahlung vom Arbeitgeber (volles Gehalt), erst danach übernimmt die BG."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 2,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 3: Gleitzeitsystem & Datenschutz-Schulungen",
        "punkte_max": 10,
        "inhalt": {
            "anweisung": "Lesen Sie die Texte 1 und 2 aus der Willkommensmappe für neue Mitarbeiter. Entscheiden Sie, ob die Aussagen 6 und 8 richtig oder falsch sind und welche Antwort (a, b oder c) bei den Aufgaben 7 und 9 am besten passt.",
            "text": "Text 1\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nArbeitszeit\n\nIn unserem Unternehmen arbeiten wir nach dem Gleitzeitsystem. Die Kernarbeitszeit ist Montag bis Freitag zwischen 9.00 Uhr und 15.30 Uhr. In dieser Zeit müssen alle Mitarbeitenden anwesend sein. Jede Abwesenheit während dieser Zeit muss genehmigt sein. Die tägliche Rahmenarbeitszeit ist von 6.00 Uhr bis 19.30 Uhr. Bitte beachten Sie, dass innerhalb dieses Zeitrahmens maximal acht, in Ausnahmefällen zehn, Stunden täglich gearbeitet werden darf. Alle Mitarbeitenden müssen beim Betreten und Verlassen des Gebäudes mit der Zeiterfassungskarte am Lesegerät ein- und ausstechen. So wird die tägliche Arbeitszeit auf dem Zeitkonto festgehalten. Dieses kann jederzeit am Lesegerät eingesehen werden. Bei entsprechendem Guthaben kann einmal pro Monat ein ganzer Arbeitstag (acht Stunden) als Gleitzeittag genommen werden. Zu berücksichtigen ist, dass ein Minuskontostand im Folgemonat auszugleichen ist. Zusätzlich können im Monat Dezember bis zu vier Arbeitstage als Gleitzeittage genommen werden, um sie zwischen Weihnachten und Neujahr zu nutzen, wenn das Arbeitszeitkonto ein ausreichendes Guthaben aufweist.\n\n---\n\nText 2\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nWichtige Hinweise zum Datenschutz\n\nUnser Unternehmen ist dem Datenschutz gemäß der EU-Datenschutz-Grundverordnung (DSGVO) verpflichtet. Grundsätzlich dürfen die Daten unserer Mitarbeiterinnen und Mitarbeiter nur dann erhoben werden, wenn diese vorher ausdrücklich zugestimmt haben. Mit Ihrem Arbeitsvertrag haben Sie bereits ein Formular erhalten, mit dessen Unterschrift Sie bestätigt haben, dass Sie mit der Speicherung Ihrer personenbezogenen Daten einverstanden sind. Sollten Sie zukünftig Fragen zum Datenschutz haben, können Sie sich an unseren internen Datenschutzbeauftragten Herrn Koljak (Durchwahl-814) oder seine Stellvertreterin Frau Dombrovski (Durchwahl -485) wenden. Wir erwarten von unseren Mitarbeiterinnen und Mitarbeitern, sich beim Thema Datenschutzverordnung immer auf dem neuesten Stand zu halten und bieten daher jedes Jahr Schulungen zu diesem Zweck an. Diese werden von unserem externen Schulungspartner WissMax durchgeführt und finden zu unterschiedlichen Terminen, jeweils am Wochenende, bei uns im Haus statt. Der Besuch des Seminars wird als Arbeitszeit angerechnet und ist für unsere Mitarbeiter kostenfrei. Eine Teilnahme an einem solchen Training muss spätestens alle drei Jahre erfolgen und durch ein Zertifikat nachgewiesen werden. Reichen Sie dieses bitte unaufgefordert bei der Personalabteilung ein. Alternativ können Sie auch eine vergleichbare Schulung bei einem anderen Anbieter besuchen. In diesem Fall bitten wir Sie jedoch, eine solche Teilnahme im Vorfeld mit unserer Personalabteilung abzusprechen, sodass Ihnen das Seminar genehmigt und eine Kostenübernahme garantiert werden kann.",
            "fragen": [
                {
                    "nummer": 6,
                    "frage": "Bei Gleitzeit können Mitarbeitende täglich beliebig viele Stunden arbeiten.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "falsch",
                    "erklaerung": "Maximal acht, nur in Ausnahmefällen zehn Stunden täglich sind erlaubt."
                },
                {
                    "nummer": 7,
                    "frage": "Durch Gleitzeit ist es den Mitarbeitenden möglich,",
                    "optionen": [
                        "a) ein Stundenguthaben aufzubauen.",
                        "b) jeden Monat einige Tage freizunehmen.",
                        "c) täglich mehr als acht Stunden zu arbeiten."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Mitarbeiter können Stunden ansparen (Guthaben aufbauen) und so z. B. Gleitzeittage nehmen."
                },
                {
                    "nummer": 8,
                    "frage": "Die Mitarbeiter müssen einmal pro Jahr ein Seminar zum Datenschutz belegen.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "falsch",
                    "erklaerung": "Eine Teilnahme muss spätestens alle drei Jahre erfolgen, nicht jedes Jahr."
                },
                {
                    "nummer": 9,
                    "frage": "Die Teilnahme am Seminar",
                    "optionen": [
                        "a) gilt als Arbeitszeit.",
                        "b) ist kostenpflichtig.",
                        "c) muss bei WissMax erfolgen."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Der Besuch des Seminars wird ausdrücklich als Arbeitszeit angerechnet."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 2,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 4: Urlaubsregelungen & Rauchverbot",
        "punkte_max": 10,
        "inhalt": {
            "anweisung": "Lesen Sie die Texte 1 und 2 aus der Willkommensmappe für neue Mitarbeiter. Entscheiden Sie, ob die Aussagen 6 und 8 richtig oder falsch sind und welche Antwort (a, b oder c) bei den Aufgaben 7 und 9 am besten passt.",
            "text": "Text 1\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nUrlaub\n\nJedem Mitarbeiter und jeder Mitarbeiterin in unserem Unternehmen stehen je nach Betriebszugehörigkeit bis zu 26 Tage Urlaub zu. Der Urlaub sollte nach Möglichkeit innerhalb des laufenden Kalenderjahres genommen werden. In Ausnahmefällen kann diese Frist bis zum 31.3. des Folgejahres verlängert werden. Grundsätzlich besteht der volle Urlaubsanspruch erst nach Ablauf der sechsmonatigen Probezeit. Ein anteiliger Urlaub ist jedoch nach Rücksprache auch bereits während dieser Zeit möglich. Urlaubsanträge für das folgende Kalenderjahr sind spätestens bis zum 15.11. mittels des dafür vorgesehenen Formulars beim Abteilungsleiter bzw. seiner Vertretung einzureichen. Den Urlaubswünschen der einzelnen Mitarbeiter wird entsprochen, sofern diese mit den Betriebsabläufen vereinbar sind. Sollten sich die beantragten Urlaubszeiten einzelner Kollegen und Kolleginnen überschneiden, wird nach sozialen Aspekten entschieden. Der Abteilungsleiter prüft alle Urlaubsanträge unverzüglich. Sollten die Wünsche der Mitarbeiter unvereinbar sein, wird der Betriebsrat mit dem Ziel der Einigung hinzugezogen.\n\n---\n\nText 2\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nRauchen am Arbeitsplatz\n\nIm gesamten Betrieb gilt striktes Rauchverbot. Auf dem Betriebsgelände befinden sich vier durch Hinweisschilder gekennzeichnete Raucherzonen. Bitte benutzen Sie für Ihre Zigarettenreste die Standaschenbecher. Allerdings ist im Umkreis von mindestens 50 Metern rund um die Produktionshallen das Rauchen auch im Freien untersagt. Eine Missachtung dieser Regel zieht eine Abmahnung nach sich. Im Wiederholungsfall droht eine fristlose Kündigung. Das Rauchverbot schließt Zigaretten, Zigarren, Pfeifen und den Konsum ähnlich verwendbarer Substanzen sowie jeglichen Gebrauch von E-Zigaretten mit ein. Bei Veranstaltungen ist das Rauchen auch auf der Dachterrasse des Gebäudes A zulässig, Beschäftigte, die dort rauchen, sind dazu angehalten, die Terrassentür geschlossen zu halten. Zigarettenpausen während der Arbeitszeit sind grundsätzlich zulässig, dabei sind folgende Regelungen zu beachten. Raucherpausen sind nicht Bestandteil der Arbeitszeit, deshalb müssen sich Mitarbeiter ordnungsgemäß vom Zeiterfassungssystem ab- bzw. nach Beendigung der Pause wieder anmelden. Da die Raucherpause nicht zur Arbeitszeit gehört, greift währenddessen nach dem Arbeitsrecht die Unfallversicherung nicht. Daher ist ein Arbeitsunfall während der Raucherpausen, z. B. ein Treppensturz, nicht über die Unfallversicherung abgedeckt. Die Gesundheit unserer MitarbeiterInnen liegt uns am Herzen. Aus diesem Grund übernehmen wir in Kooperation mit unserer betrieblichen Krankenkasse die Kosten für einen Raucherentwöhnungskurs. Für weitere Informationen wenden Sie sich bitte vertrauensvoll an unsere Personalabteilung.",
            "fragen": [
                {
                    "nummer": 6,
                    "frage": "Im ersten halben Jahr nach Neueinstellung ist kein Urlaub möglich.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "falsch",
                    "erklaerung": "Ein anteiliger Urlaub ist nach Rücksprache auch während der sechsmonatigen Probezeit möglich."
                },
                {
                    "nummer": 7,
                    "frage": "Urlaubsanträge müssen",
                    "optionen": [
                        "a) durch den Betriebsrat genehmigt werden.",
                        "b) in jedem Fall bewilligt werden.",
                        "c) rechtzeitig im Vorjahr gestellt werden."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Urlaubsanträge müssen spätestens bis zum 15.11. des Vorjahres eingereicht werden."
                },
                {
                    "nummer": 8,
                    "frage": "Das Rauchverbot auf dem Firmengelände schließt E-Zigaretten aus.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "falsch",
                    "erklaerung": "Das Rauchverbot schließt den Gebrauch von E-Zigaretten ausdrücklich mit ein (d.h. sie sind nicht ausgenommen)."
                },
                {
                    "nummer": 9,
                    "frage": "Raucher",
                    "optionen": [
                        "a) erhalten weitere Informationen zu den Raucherbestimmungen in der Personalabteilung.",
                        "b) müssen ihre Pausenzeiten dokumentieren.",
                        "c) sind auch in der Raucherpause bei Unfällen versichert."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Raucherpausen gehören nicht zur Arbeitszeit, deshalb müssen sich Mitarbeiter am Zeiterfassungssystem ab- und anmelden."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 2,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 5: Sicherheitsbestimmungen & Lebensarbeitszeitkonto",
        "punkte_max": 10,
        "inhalt": {
            "anweisung": "Lesen Sie die Texte 1 und 2 aus der Willkommensmappe für neue Mitarbeiter. Entscheiden Sie, ob die Aussagen 6 und 8 richtig oder falsch sind und welche Antwort (a, b oder c) bei den Aufgaben 7 und 9 am besten passt.",
            "text": "Text 1\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nRegelungen am Arbeitsplatz\n\nEs ist wichtig, dass auf dem Betriebsgelände der AKO.KG alle Maßnahmen eingehalten werden, damit Sie sich selbst und andere nicht gefährden. Bei der Bedienung der Maschinen sind die jeweiligen Sicherheitsbestimmungen zu befolgen, angepasst an die neuen Richtlinien laut Arbeitsschutzgesetz vom Januar dieses Jahres. Die Sicherheitsbestimmungen finden Sie in der Anlage zu dieser Willkommensmappe und zusammengefasst auch auf Informationsblättern an den Maschinen. Sollten Sie hierzu Fragen haben, setzen Sie sich bitte mit unserer Sicherheitsbeauftragten Frau Scholz, Zimmer 122, Durchwahl - 308, in Verbindung. Dies ist auch die Kontaktstelle für alle Störungen, Unfälle, Brand oder bei für Sie unklaren Situationen. In diesen Fällen kontaktieren Sie bitte auch immer den Empfang, Durchwahl -100. Nach Verlassen der Werkstätten sind diese immer ordnungsgemäß abzuschließen, damit sich kein Unbefugter den Anlagen und Maschinen nähern kann. Der Arbeitsplatz muss sauber gehalten werden, damit umherliegender Unrat nicht zu einer Gefahrenquelle werden kann. Achten Sie dabei bitte auch auf die vorgeschriebene Trennung der Abfälle in die hierfür vorgesehenen Container im Hof. Auf dem gesamten Betriebsgelände ist Filmen und Fotografieren sowie der Konsum von Alkohol und Zigarettenkonsum nicht gestattet.\n\n---\n\nText 2\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nLebensarbeitszeitkonto\n\nIn unserem Unternehmen wird die Möglichkeit angeboten, ein Lebensarbeitszeitkonto zu führen. Als Arbeitnehmer können Sie Arbeitszeit, zum Beispiel geleistete Überstunden, als Guthaben auf diesem Konto stehen lassen. Ähnlich wie bei einem Bankkonto, mit dem Unterschied, dass auch die Währung 'Zeit' akzeptiert wird. Bei Bedarf können Sie Ihre angesparten Stunden wieder einlösen. Das Lebensarbeitszeitkonto bietet die Chance, adäquat auf verschiedene Bedürfnisse zu verschiedenen Zeiten im Laufe des Arbeitslebens einzugehen. Beispielsweise könnte die angesparte Zeit etwa für die Betreuung von pflegebedürftigen Angehörigen genutzt werden. Außerdem bietet unser Teilzeitangebot „Classic Vario\" eine Kombination von Teil- und Vollzeit bei flexibler Einteilung der Arbeitszeit. Nach rechtzeitiger Rücksprache mit dem Arbeitgeber (mindestens drei Monate vorher) kann die zu leistende Arbeitszeit auch zwischen Teil- und Vollzeit angepasst werden. Wenn Sie eine gewisse zeitliche Flexibilität brauchen, können Sie auch kurzfristig nach Absprache im Homeoffice arbeiten. Für die Arbeit von zu Hause stehen den Mitarbeitern und Mitarbeiterinnen ein firmeneigener Laptop und ein Diensthandy zur Verfügung. Sollten Sie eine komplette Auszeit nehmen wollen, können Sie das für einen Zeitraum von bis zu maximal zwölf Monaten vorübergehend tun. Wir sichern Ihnen einen gleichwertigen Arbeitsplatz nach Ihrer Rückkehr zu. Als familienfreundliche Firma bieten wir neben den oben beschriebenen flexiblen Arbeitszeitmodellen Betreuungsmöglichkeiten während der Schulferien für die Kinder unserer Mitarbeiter und Mitarbeiterinnen.",
            "fragen": [
                {
                    "nummer": 6,
                    "frage": "Die Regelungen am Arbeitsplatz wurden aktualisiert.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "richtig",
                    "erklaerung": "Sie wurden angepasst an die neuen Richtlinien laut Arbeitsschutzgesetz vom Januar dieses Jahres."
                },
                {
                    "nummer": 7,
                    "frage": "Auf dem Firmengelände",
                    "optionen": [
                        "a) darf kein Abfall entsorgt werden.",
                        "b) ist bei Gefahr Frau Scholz zu informieren.",
                        "c) ist es nicht erlaubt, Nahrungsmittel zu sich zu nehmen."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Frau Scholz ist die Kontaktstelle für alle Störungen, Unfälle, Brand oder Gefahrensituationen."
                },
                {
                    "nummer": 8,
                    "frage": "Das Unternehmen unterstützt die Mitarbeiter finanziell bei privaten Problemen.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "falsch",
                    "erklaerung": "Das Unternehmen bietet Zeitkonten und Auszeiten, aber keine finanzielle Unterstützung."
                },
                {
                    "nummer": 9,
                    "frage": "Die Mitarbeiter können",
                    "optionen": [
                        "a) bei Bedarf von zu Hause aus arbeiten.",
                        "b) sich maximal ein halbes Jahr beurlauben lassen.",
                        "c) Geldleistungen für die Pflege von Angehörigen erhalten."
                    ],
                    "korrekt": "a",
                    "erklaerung": "Nach Absprache kann kurzfristig im Homeoffice gearbeitet werden (Laptop und Diensthandy stehen bereit)."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 2,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 6: Betriebssport & Berichtsheft in der Ausbildung",
        "punkte_max": 10,
        "inhalt": {
            "anweisung": "Lesen Sie die Texte 1 und 2 aus der Willkommensmappe für neue Mitarbeiter. Entscheiden Sie, ob die Aussagen 6 und 8 richtig oder falsch sind und welche Antwort (a, b oder c) bei den Aufgaben 7 und 9 am besten passt.",
            "text": "Text 1\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nBetriebssport\n\nSportliche Aktivitäten werden bei uns großgeschrieben. So bieten wir unseren Mitarbeitern im Untergeschoss einen Fitnessraum mit Bodenmatten und mehreren Fitnessgeräten, wie z B. zwei Indoor-Fahrradtrainern. Dieser ist für alle ganztägig frei und ohne Gebühr zugänglich und kann selbstverständlich auch in den Pausen genutzt werden. Außerdem nehmen wir als Unternehmen jedes Jahr am städtischen Firmenlauf teil. Es hat sich die Tradition entwickelt, dass sich die teilnehmenden Kolleginnen und Kollegen gemeinsam in einem wöchentlichen Lauftreff auf dieses Event vorbereiten. Dieser findet jeden Mittwoch um 17:30 Uhr statt. Abwechslungsreich gestaltete Arbeitsplätze in den Büros tragen zur Steigerung der Aktivität auch während der Arbeit bei und wirken den negativen Auswirkungen langen Sitzens entgegen. Alle Schreibtische sind höhenverstellbar, sodass Arbeiten auch im Stehen möglich ist. Zusätzlich bieten wir das sogenannte „Deskbike\" an – eine Art Büro-Fahrrad, das sich einfach unter einen höhenverstellbaren Schreibtisch rollen lässt. Damit möchten wir Ihnen die Möglichkeit bieten, Ihre Gesundheit zu stärken. Nicht zuletzt macht Bewegung auch einfach Spaß.\n\n---\n\nText 2\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nBerichtsheft\n\nDas Berichtsheft ist der Nachweis, dass die Ausbildung ordnungsgemäß verläuft. In diesem wird alles dokumentiert, was man während der Ausbildung macht und lernt. Sie sollten nicht nur Ihre Tätigkeiten im Betrieb beschreiben, sondern auch alle Einweisungen, Schulungen und den innerbetrieblichen Unterricht vermerken. Wie Sie sehen, ist das Führen der Ausbildungsnachweise ein wichtiger Inhalt Ihrer Ausbildung, bei dem Sie lernen, Ihre Tätigkeiten zeitlich und inhaltlich zu dokumentieren. Darüber hinaus bietet es Ihnen die Möglichkeit, den Zeitaufwand für bestimmte Tätigkeiten präziser einzuschätzen und Ihre Aufgaben zu reflektieren. Weiterhin wird Ihr Tätigkeitsbereich für Beteiligte im Unternehmen und für die Stellen, die für die Berufsausbildung zuständig sind, nachvollziehbar dargestellt. Es ist Pflicht, das Berichtsheft jeweils vor der Zwischen- und der Abschlussprüfung vorzulegen. Nur wenn es vollständig ist, wird der Prüfungsausschuss Sie zu den Prüfungen zulassen. Wenn Sie zwischen zwei Noten stehen, können Ihre Berichte sogar Ihre Endnote beeinflussen. Neben den Wochenberichten, die Sie jeden Freitag an Ihren Teamleiter schicken, müssen Sie nach dem Durchlaufen einer Abteilung einen zusätzlichen Bericht verfassen. Dieser ergänzt den Wochenbericht und verschafft Ihnen einen genaueren Überblick über die Aufgaben in der jeweiligen Abteilung. Sie dürfen Ihre Berichte während der Arbeitszeit schreiben und können sie sowohl in klassischer Heftform als auch in digitaler Form auf unserer firmeninternen Plattform führen und einreichen. In festen Abständen haben Sie das Heft Ihrem Ausbildungsleiter zur Kenntnisnahme vorzulegen. In Ihrem eigenen Interesse empfehlen wir Ihnen, es immer zeitnah zu vervollständigen.",
            "fragen": [
                {
                    "nummer": 6,
                    "frage": "Der Fitnessraum ist während der Arbeitszeit geöffnet.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "richtig",
                    "erklaerung": "Der Raum ist ganztägig frei zugänglich und kann auch in den Pausen genutzt werden."
                },
                {
                    "nummer": 7,
                    "frage": "Die Mitarbeiter",
                    "optionen": [
                        "a) erhalten einen Zuschuss für ein Deskbike.",
                        "b) haben teilweise spezielle Schreibtische in Stehhöhe.",
                        "c) können das hausinterne Fitnessstudio gratis nutzen."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Der Fitnessraum ist für alle ganztägig frei und ohne Gebühr zugänglich."
                },
                {
                    "nummer": 8,
                    "frage": "Auszubildende ohne ordentlich geführtes Berichtsheft dürfen nicht an der Abschlussprüfung teilnehmen.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "richtig",
                    "erklaerung": "Nur wenn das Berichtsheft vollständig ist, lässt der Prüfungsausschuss zur Prüfung zu."
                },
                {
                    "nummer": 9,
                    "frage": "Das Berichtsheft muss",
                    "optionen": [
                        "a) in der Freizeit geführt werden.",
                        "b) dem Ausbildungsleiter regelmäßig gezeigt werden.",
                        "c) jeden Tag ausgefüllt werden."
                    ],
                    "korrekt": "b",
                    "erklaerung": "In festen Abständen haben die Auszubildenden das Heft dem Ausbildungsleiter zur Kenntnisnahme vorzulegen."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 2,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 7: Einführungstag & IT-Sicherheit",
        "punkte_max": 10,
        "inhalt": {
            "anweisung": "Lesen Sie die Texte 1 und 2 aus der Willkommensmappe für neue Mitarbeiter. Entscheiden Sie, ob die Aussagen 6 und 8 richtig oder falsch sind und welche Antwort (a, b oder c) bei den Aufgaben 7 und 9 am besten passt.",
            "text": "Text 1\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nEinführungstag\n\nUnsere Personalreferentin führt mehrmals jährlich einen Einführungstag für unsere neuen Mitarbeiterinnen und Mitarbeiter durch, an dem diese mit unterschiedlichen Arbeitsbereichen sowie den rechtlichen und organisatorischen Prozessen vertraut gemacht werden. Wir möchten darauf hinweisen, dass die Teilnahme an einer solchen Informationsveranstaltung verpflichtend ist. Am Einführungstag besteht außerdem die Möglichkeit, Kolleginnen und Kollegen aus anderen Abteilungen kennenzulernen. Die Abteilungsleiter werden bei dieser Gelegenheit in kurzen Worten einen Einblick in den Tätigkeitsbereich ihrer Teams geben. Da unser Unternehmen in einem hochsensiblen Bereich arbeitet, haben wir für unser gesamtes Gebäude ein komplexes Sicherheitssystem. Auch dieses stellen wir Ihnen im Rahmen des Orientierungstages im Detail vor. Weitere Einzelheiten zu diesem Tag, wie den Treffpunkt und den Ablauf, finden Sie in dieser Mappe. Eine gesonderte Anmeldung ist nicht erforderlich. Für Rückfragen zum Einführungstag steht die Personalabteilung gerne zur Verfügung.\n\n---\n\nText 2\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nDatenschutz & IT-Sicherheit\n\nIhre im Unternehmen verwendeten Passwörter dürfen unter keinen Umständen weitergegeben und müssen regelmäßig alle sechs Monate geändert werden. Bitte verwenden Sie keine Passwörter, die Sie auch für private Konten nutzen, und generieren Sie sichere Passwörter mit einem Passwortgenerator. USB-Sticks und Ihnen unbekannte Geräte sind vor Inbetriebnahme in isolierter Umgebung zu prüfen. Es darf keine Software aus dem Internet heruntergeladen oder selbstständig auf dem Arbeitslaptop oder dem PC installiert werden. Außerdem ist es untersagt, Daten lokal abzuspeichern. Bitte achten Sie bei Dienstreisen darauf, Ihren Laptop vor Fremden zu sichern! Bedenken Sie bitte auch, dass bei der Arbeit möglicherweise vertrauliche Informationen auf Ihrem Bildschirm zu sehen sind. Schützen Sie diese vor fremden Blicken. Vertrauliche Telefonate dürfen nicht in der Öffentlichkeit geführt werden. Die private Nutzung von Diensthandys oder Laptops ist untersagt. Vertrauliche und personenbezogene Daten müssen nach Dienstschluss verschlossen werden. Sie dürfen zudem nicht länger als unbedingt erforderlich aufgehoben oder gespeichert werden. Über interne Unternehmensangelegenheiten oder Dienstgeheimnisse ist Verschwiegenheit zu wahren. Unterlagen, Datenträger, Abschriften oder Kopien dürfen nicht weitergegeben werden oder versehentlich in die Hände unbefugter Personen gelangen. Vertrauliche Daten in Papierform sind in dafür bereitgestellten Schreddern zu vernichten. Bitte melden Sie ungewöhnliche Vorkommnisse oder Feststellungen umgehend der Geschäftsführung oder unserem Datenschutzbeauftragten, Herrn Dr. Sevici.",
            "fragen": [
                {
                    "nummer": 6,
                    "frage": "Neue Mitarbeiter sollten sich in der Personalabteilung zum Einführungstag anmelden.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "falsch",
                    "erklaerung": "Eine gesonderte Anmeldung ist ausdrücklich nicht erforderlich."
                },
                {
                    "nummer": 7,
                    "frage": "Am Einführungstag",
                    "optionen": [
                        "a) müssen sich die Teilnehmenden in der Personalabteilung melden.",
                        "b) stellt ein Abteilungsleiter alle Kolleginnen und Kollegen vor.",
                        "c) werden neue Mitarbeitende in die Sicherheitsregeln im Unternehmen eingeführt."
                    ],
                    "korrekt": "c",
                    "erklaerung": "Das komplexe Sicherheitssystem des Gebäudes wird im Detail vorgestellt."
                },
                {
                    "nummer": 8,
                    "frage": "Die Mitarbeitenden dürfen ihre Passwörter frühestens alle sechs Monate ändern.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "falsch",
                    "erklaerung": "Passwörter müssen regelmäßig alle sechs Monate geändert werden (spätestens), nicht 'frühestens'."
                },
                {
                    "nummer": 9,
                    "frage": "Vertrauliche Daten",
                    "optionen": [
                        "a) dürfen nicht auf dem PC gespeichert werden.",
                        "b) müssen nach einer bestimmten Zeit gelöscht werden.",
                        "c) sollen ausgedruckt und abgeheftet werden."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Sie dürfen nicht länger als unbedingt erforderlich aufgehoben oder gespeichert werden."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 2,
        "aufgabe_typ": "multiple_choice",
        "thema": "Varyant 8: Kantinenbetrieb & Berufsgenossenschaft",
        "punkte_max": 10,
        "inhalt": {
            "anweisung": "Lesen Sie die Texte 1 und 2 aus der Willkommensmappe für neue Mitarbeiter. Entscheiden Sie, ob die Aussagen 6 und 8 richtig oder falsch sind und welche Antwort (a, b oder c) bei den Aufgaben 7 und 9 am besten passt.",
            "text": "Text 1\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nEssen in der Kantine\n\nUnser Unternehmen arbeitet an sieben Tagen rund um die Uhr im Drei-Schicht-System. Deshalb steht auch unsere Kantine, die für die Mitarbeiterverpflegung sorgt, täglich 24 Stunden zur Verfügung. Um unnötige Wartezeiten in der Mittagszeit zu vermeiden, wurden in Abstimmung mit dem Betriebsrat aber folgende Essenszeiten für die einzelnen Abteilungen festgelegt: Während das Personal aus der Produktion und dem Lager in der ersten Gruppe von 12.00 bis 13.00 Uhr eine warme Mahlzeit zu sich nehmen kann, folgen die Mitarbeiterinnen und Mitarbeiter der Verwaltung in der zweiten Gruppe von 13.00 bis 14.00 Uhr. Außerdem können die Mitarbeitenden jederzeit frisch zubereitete Snacks oder kleine Mahlzeiten wie Suppen oder Nudelgerichte aus den in der Kantine aufgestellten Automaten entnehmen. Darüber hinaus befindet sich dort eine Mikrowelle, in der Sie mitgebrachte Speisen erwärmen können. Zusätzliche Automaten für kalte und warme Getränke befinden sich auf jeder Etage in unserem Firmengebäude.\n\n---\n\nText 2\n\nWillkommensmappe für neue Mitarbeiterinnen und Mitarbeiter\n\nArbeitsunfall und Berufsgenossenschaft (BG)\n\nMit dem Arbeitsantritt in unserem Unternehmen sind Sie als Arbeitnehmer*in automatisch gesetzlich unfallversichert. Der Träger dieser Unfallversicherung ist die Berufsgenossenschaft, deren Aufgaben in erster Linie darin bestehen, Arbeits- und Wegeunfälle, Berufskrankheiten sowie arbeitsbedingte Gesundheitsgefahren zu vermeiden. Das wird gewährleistet, indem regelmäßig Kontrollen der Arbeitssicherheit durch die Berufsgenossenschaft stattfinden. Bei diesen Kontrollen sind unsere Mitarbeiter*innen des Qualitätsmanagements mit vor Ort. Sollte dennoch ein Unglücksfall eintreten, übernimmt die Berufsgenossenschaft sämtliche Kosten für Heilbehandlungen und Schadensersatzzahlungen. Dafür muss von Ihnen folgendes Prozedere eingehalten werden: Nach einem Arbeitsunfall wird zunächst der Ersthelfer oder die Ersthelferin informiert. Je nach Schwere des Unfalls wird ein Rettungswagen dazu gerufen. Ob mit oder ohne Krankenhausaufenthalt, müssen Sie aber in jedem Fall von einem Durchgangsarzt untersucht werden. Gleichzeitig sind wir als Arbeitgeber verpflichtet, den Unfall der Berufsgenossenschaft zu melden.",
            "fragen": [
                {
                    "nummer": 6,
                    "frage": "Die Kantine ist immer geöffnet.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "richtig",
                    "erklaerung": "Sie steht täglich 24 Stunden rund um die Uhr zur Verfügung."
                },
                {
                    "nummer": 7,
                    "frage": "Die Mitarbeiterinnen und Mitarbeiter",
                    "optionen": [
                        "a) bekommen in der Kantine keine Getränke.",
                        "b) können nachts in der Kantine essen.",
                        "c) müssen mittags oft sehr lange anstehen."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Da im Drei-Schicht-System gearbeitet wird und die Kantine 24 Stunden geöffnet ist, kann man auch nachts dort essen."
                },
                {
                    "nummer": 8,
                    "frage": "Nach einem Unfall am Arbeitsplatz muss man sich immer von einem Durchgangsarzt untersuchen lassen.",
                    "optionen": ["richtig", "falsch"],
                    "korrekt": "richtig",
                    "erklaerung": "In jedem Fall muss eine Untersuchung durch einen Durchgangsarzt erfolgen."
                },
                {
                    "nummer": 9,
                    "frage": "Die Berufsgenossenschaft",
                    "optionen": [
                        "a) übernimmt nur die Kosten bei schweren Unfällen.",
                        "b) führt regelmäßige Sicherheitsprüfungen im Betrieb durch.",
                        "c) bezahlt keinen Schadensersatz."
                    ],
                    "korrekt": "b",
                    "erklaerung": "Regelmäßige Kontrollen der Arbeitssicherheit werden durch die Berufsgenossenschaft durchgeführt."
                }
            ]
        }
    }
]

# Insert each variant if not exists
for v in teil2_variants:
    existing = sb.table('b2_questions').select('id').eq('modul', 'lesen').eq('aufgabe', 2).eq('thema', v['thema']).execute()
    if existing.data:
        print(f"Zaten mevcut: {v['thema']}")
    else:
        res = sb.table('b2_questions').insert(v).execute()
        print(f"Eklendi: {v['thema']}")

print("Lesen Teil 2 varyantları başarıyla tamamlandı!")
