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
    'thema': 'Varyant 1: Urlaub und Samstagsarbeit für Azubis'
}).eq('modul', 'lesen').eq('aufgabe', 3).ilike('thema', '%Tipps für junge Auszubildende%').execute()

teil3_variants = [
    {
        "modul": "lesen",
        "aufgabe": 3,
        "aufgabe_typ": "zuordnung",
        "thema": "Varyant 2: Forum – Krankheit, Kind und Kündigung",
        "punkte_max": 12,
        "inhalt": {
            "anweisung": "Lesen Sie die Beiträge 10 bis 13 und die Forumsbeiträge a bis f. Welcher Beitrag passt zu welcher Person? Für eine Person gibt es keinen passenden Beitrag. Markieren Sie in diesem Fall ein x.",
            "text": "Forum: Rund um den Beruf\n\na) Günther, vor 9 Stunden\nDas kann man pauschal gar nicht so sagen. Wie das in deinem Unternehmen geregelt ist, steht in deinem Arbeitsvertrag. Ab wann du eine Arbeitsunfähigkeitsbescheinigung brauchst, findest du meistens unter den Paragraphen „Arbeitsverhinderung\" oder „Krankheit\".\n\nb) Marion, vor 4 Stunden\nNein, vorher musst du erst mal eine Abmahnung bekommen. Wenn du dann allerdings noch mal fehlst, ohne Bescheid zu sagen, musst du mit der Kündigung rechnen. Such doch noch mal das Gespräch mit deinem Chef. Ihr findet bestimmt eine Lösung.\n\nc) Karin, vor 45 Minuten\nDu kannst nicht einfach kommen und gehen, wann du willst, auch wenn du die Absicht hattest, die versäumte Zeit nachzuholen. Die Arbeitszeiten sind ja vertraglich geregelt. Wenn sich Mitarbeiter nicht daran halten, ist eine Abmahnung vor der Kündigung nicht notwendig.\n\nd) Elli, vor 3 Stunden\nWie du selbst schreibst, können im Krankheitsfall die Urlaubstage auf dein Urlaubskonto zurückgebucht werden. Du brauchst natürlich ab dem ersten Tag ein ärztliches Attest. Das gilt allerdings nicht, wenn du dich um ein krankes Kind kümmern musst. In diesem Fall gelten die Urlaubstage als genommen.\n\ne) Sabine, vor 40 Minuten\nDiese Situation kennen doch alle Eltern. Wenn ich für meinen Sohn mal keine Betreuung finde, kann ich ihn auch ausnahmsweise mit ins Büro nehmen. Meine Chefin ist da zum Glück sehr verständnisvoll.\n\nf) Jorge, vor 2 Stunden\nAlso ich gehe immer gleich am ersten Krankheitstag zum Arzt. Sicher ist sicher. Außerdem kann es nicht schaden, wenn dich ein Doktor anschaut, wenn du dich nicht wohlfühlst. Gerade wenn du Kinder hast, ist es wichtig, dass du weißt, was dir fehlt. Du willst ja niemanden anstecken.",
            "fragen": [
                {
                    "nummer": 10,
                    "frage": "Gabi: Ich hatte gerade Urlaub und gleich am ersten Urlaubstag wurde meine Kleine krank und ich musste sie vier Tage lang pflegen. Wenn ich im Urlaub krank werde, kann ich die Tage zurückbekommen. Aber wie ist das, wenn das Kind krank wird?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "d",
                    "erklaerung": "Beitrag d (Elli) erklärt genau, dass Urlaubstage bei eigenem Krankheitsfall zurückgebucht werden, aber nicht bei Pflege eines kranken Kindes."
                },
                {
                    "nummer": 11,
                    "frage": "Charlotte: Ich konnte leider mal wieder nicht zur Arbeit gehen, weil mein Kind krank war. Als ich heute angerufen habe, hat mein Chef total überzogen reagiert und mir mit Kündigung gedroht, wenn ich mehr als einen Tag fehle. Das geht doch nicht, oder?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "x",
                    "erklaerung": "Zu Charlottes konkreter Frage bezüglich Kündigungsdrohung bei Kindespflege gibt es keinen passenden Beitrag."
                },
                {
                    "nummer": 12,
                    "frage": "Lars: Ich bin letzten Montag mit furchtbaren Kopfschmerzen aufgewacht und konnte nicht aufstehen. Leider habe ich vergessen, meinen Arbeitgeber anzurufen, und bin im Bett geblieben. Jetzt will mein Chef mir kündigen, weil ich unentschuldigt gefehlt habe. Geht das so einfach?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "b",
                    "erklaerung": "Beitrag b (Marion) erklärt, dass man vor einer Kündigung wegen unentschuldigten Fehlens erst eine Abmahnung bekommen muss."
                },
                {
                    "nummer": 13,
                    "frage": "Kamil: Gestern war ich krank. Als ich heute wieder im Büro war, wollte mein Chef direkt die Krankschreibung haben. Ich war immer der Meinung, die braucht man erst nach drei Tagen?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "a",
                    "erklaerung": "Beitrag a (Günther) weist darauf hin, dass im Arbeitsvertrag geregelt ist, ab welchem Tag die Arbeitsunfähigkeitsbescheinigung vorzulegen ist."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 3,
        "aufgabe_typ": "zuordnung",
        "thema": "Varyant 3: Forum – Ausbildung, Familie & Minderjährige",
        "punkte_max": 12,
        "inhalt": {
            "anweisung": "Lesen Sie die Beiträge 10 bis 13 und die Forumsbeiträge a bis f. Welcher Beitrag passt zu welcher Person? Für eine Person gibt es keinen passenden Beitrag. Markieren Sie in diesem Fall ein x.",
            "text": "Forum: Rund um den Beruf\n\na) Susi, vor 1 Stunde\nSolange du so nicht weniger arbeitest als im Vertrag vereinbart, müsstest du rechtlich auf der sicheren Seite sein. Wenn du es genau wissen willst, solltest du in diesem Fall einen Anwalt für Arbeitsrecht kontaktieren. Mit einer Rechtsschutzversicherung wird das auch nicht so teuer.\n\nb) Julia, vor 1 Stunde\nRein rechtlich kannst du das nicht ohne Zustimmung deiner Eltern machen. Sie müssen die Kündigung sogar unterschreiben. An deiner Stelle würde ich mir das aber noch mal überlegen. Ich kann deinen Vater jedenfalls gut verstehen. Er macht sich halt Sorgen um deine Zukunft.\n\nc) Jürgen, vor 2 Stunden\nHi, ich würde die Ausbildung auf keinen Fall abbrechen. Mit Berufen im Finanzbereich hast du gute Aussichten auf dem Arbeitsmarkt und verdienst später auch gutes Geld. Mach dir das nicht kaputt. Meine Tochter ist Steuerberaterin und sucht händeringend nach fähigen Mitarbeitern. Sie kann sich vor Aufträgen gar nicht retten.\n\nd) Jochen, vor 5 Stunden\nAlso ich würde noch warten, bis dein Kind etwas größer ist, und mich jetzt noch nicht um einen Ausbildungsplatz bewerben. Wenn es etwas selbstständiger ist, wird vieles leichter. Eine Ausbildung kannst du auch in drei oder vier Jahren noch machen. Dein Kind braucht dich jetzt.\n\ne) Achim, vor 6 Stunden\nSchutz von Leben und Gesundheit ist das oberste Gebot. Um dich und dein Kind zu schützen, darfst du während der Schwangerschaft keine körperlich anstrengenden Arbeiten verrichten und auch Tätigkeiten, bei denen du Lärm, Schmutz, Kälte usw. ausgesetzt bist, sind tabu.\n\nf) Peter, vor 12 Stunden\nWarum das denn? Es gibt doch heutzutage Möglichkeiten, das Kind unterzubringen, während man arbeitet. Können dich deine Eltern vielleicht unterstützen? Sprich mal mit deinem Chef! Wenn der sieht, dass dir die Ausbildung wichtig ist, wird sich eine Lösung finden. Aber versuch auf jeden Fall, die Ausbildung durchzuziehen.",
            "fragen": [
                {
                    "nummer": 10,
                    "frage": "Inka: Ich bin Auszubildende in einem Büro und muss immer pünktlich Feierabend machen, weil ich meinen einjährigen Sohn von der Krippe abholen muss. Mein Chef sieht das gar nicht gern und droht mir jetzt sogar mit Kündigung. Was soll ich machen?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "a",
                    "erklaerung": "Beitrag a (Susi) rät dazu, die vertragliche Arbeitszeit einzuhalten und ggf. einen Anwalt für Arbeitsrecht zu kontaktieren."
                },
                {
                    "nummer": 11,
                    "frage": "Jacqueline: Hallo Leute! Vor ein paar Monaten habe ich mit einer Ausbildung begonnen. Und jetzt bin ich schwanger... Was soll ich bloß machen? Es wird bestimmt schwierig, Kind und Arbeit zu vereinbaren. Soll ich die Ausbildung abbrechen?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "f",
                    "erklaerung": "Beitrag f (Peter) macht Mut, das Kind unterzubringen, mit dem Chef zu sprechen und die Ausbildung nicht abzubrechen."
                },
                {
                    "nummer": 12,
                    "frage": "Hans-Peter: Guten Abend, ich bin Ende 40 und mein Sohn ist inzwischen erwachsen. Jetzt möchte ich beruflich was ganz Neues machen und eine Ausbildung zum Steuerfachangestellten anfangen. Meint ihr, ich habe in meinem Alter noch Chancen, in diesem Beruf zu arbeiten?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "x",
                    "erklaerung": "Auf Hans-Peters Frage zum Ausbildungsbeginn Ende 40 antwortet keiner der Beiträge passend."
                },
                {
                    "nummer": 13,
                    "frage": "Max: Hallo, ich mache momentan eine Ausbildung zum Einzelhandelskaufmann. Ich habe noch ein Jahr bis zum Abschluss und habe wirklich keine Lust mehr. Mein Vater möchte, dass ich die Ausbildung fertig mache. Ich bin noch nicht 18. Kann ich trotzdem einfach kündigen?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "b",
                    "erklaerung": "Beitrag b (Julia) klärt auf, dass Minderjährige nicht ohne Zustimmung der Eltern kündigen können und diese unterschreiben müssen."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 3,
        "aufgabe_typ": "zuordnung",
        "thema": "Varyant 4: Forum – Arbeitszeit, Vollzeit & Teilzeit",
        "punkte_max": 12,
        "inhalt": {
            "anweisung": "Lesen Sie die Beiträge 10 bis 13 und die Forumsbeiträge a bis f. Welcher Beitrag passt zu welcher Person? Für eine Person gibt es keinen passenden Beitrag. Markieren Sie in diesem Fall ein x.",
            "text": "Forum: Rund um den Beruf\n\na) Thilo, vor 45 Minuten\nIn meinen Augen ist Familie das Wichtigste auf der Welt. Es ist doch auch ein Gewinn, wenn man mehr Zeit mit seinen Kindern verbringen kann und weniger gestresst ist. Ich würde mich auf jeden Fall für Teilzeit entscheiden.\n\nb) Henny, vor 1 Stunde\nAlso ich finde es nicht gut, wenn Geschäfte und Supermärkte an Samstagen so lange geöffnet sind. Ihr müsst doch bedenken, dass dort auch Menschen arbeiten müssen. Sie wollen doch ebenfalls Wochenende haben und zu ihren Familien. Ich bin ganz klar gegen längere Ladenöffnungszeiten.\n\nc) Angela, vor 6 Stunden\nJeder Arbeitnehmer hat einen Rechtsanspruch auf Teilzeitarbeit. Allerdings musst du länger als sechs Monate bei dem Unternehmen beschäftigt sein. Man muss sich das aber genau überlegen, da man nicht nur kurz- oder mittelfristig weniger verdient, sondern auch weniger Rentenansprüche hat. Schau doch mal im Internet, wie viel das ausmacht.\n\nd) Ratna, vor 2 Stunden\nSeit Kurzem haben Arbeitnehmer das Recht, eine befristete Zeit weniger zu arbeiten, aber das gilt bestimmt nicht rückwirkend. Soviel ich weiß, hast du also keinen Anspruch, in die Vollzeit zurückzukehren. Sprich doch einfach mal mit deinem Chef.\n\ne) Alex, vor 30 Minuten\nDer Samstag ist ein normaler Werktag und deshalb kann der Arbeitgeber anordnen, dass an diesem Tag auch gearbeitet wird. Dabei spielt es keine Rolle, ob du Kinder hast oder nicht. Oft ist es aber auch so, dass du dann an einem anderen Tag in der Woche frei bekommst.\n\nf) Gerhard, vor 3 Stunden\nAlso ich würde mir das gut überlegen. Wenn du bisher gut über die Runden gekommen bist, könntest du dir doch etwas mehr Freizeit gönnen. Meines Erachtens geht es hier auch um mehr Lebensqualität. Das Leben ist zu kurz, um nur zu arbeiten.",
            "fragen": [
                {
                    "nummer": 10,
                    "frage": "Som: Meine Kinder sind unter der Woche ganztags in der Kita, damit ich Vollzeit arbeiten kann. Jetzt soll ich in den nächsten Wochen samstags ins Büro kommen. Ich habe aber niemanden, der da auf meine Kinder aufpassen kann. Kann der Arbeitgeber das verlangen?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "e",
                    "erklaerung": "Alex (e) erklärt, dass der Samstag ein Werktag ist und Samstagsarbeit angeordnet werden kann, unabhängig von Kindern."
                },
                {
                    "nummer": 11,
                    "frage": "Reinhold: Ich arbeite seit zwölf Jahren 20 Stunden die Woche und würde jetzt gerne, weil die Kinder aus dem Haus sind, meine Arbeitszeit aufstocken und wieder Vollzeit arbeiten. Habe ich ein Recht darauf?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "d",
                    "erklaerung": "Ratna (d) erklärt, dass kein automatischer Anspruch auf Rückkehr in die Vollzeit bei Altverträgen besteht."
                },
                {
                    "nummer": 12,
                    "frage": "Mandy: Seit zwei Jahren arbeite ich Vollzeit in einem Unternehmen und dieser Job macht mir auch viel Spaß. Aus familiären Gründen würde ich gerne eine dreijährige Auszeit nehmen. Ich überlege, ob ich mir das finanziell leisten kann.",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "x",
                    "erklaerung": "Zu einer dreijährigen Auszeit aus familiären Gründen gibt es keinen passenden Beitrag."
                },
                {
                    "nummer": 13,
                    "frage": "Nici: Ich bekomme jetzt das zweite Kind und werde danach wahrscheinlich erst mal Teilzeit arbeiten. Jetzt habe ich ziemlich große Angst, dass ich in meiner Karriere den Anschluss verpasse. Soll ich vielleicht doch so schnell wie möglich wieder Vollzeit arbeiten?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "a",
                    "erklaerung": "Thilo (a) empfiehlt Teilzeit zugunsten der Familie und Priorität für Kinder."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 3,
        "aufgabe_typ": "zuordnung",
        "thema": "Varyant 5: Forum – Urlaubstage, Dienstplan & Überstunden",
        "punkte_max": 12,
        "inhalt": {
            "anweisung": "Lesen Sie die Beiträge 10 bis 13 und die Forumsbeiträge a bis f. Welcher Beitrag passt zu welcher Person? Für eine Person gibt es keinen passenden Beitrag. Markieren Sie in diesem Fall ein x.",
            "text": "Forum: Rund um den Beruf\n\na) Cécile, vor 3 Stunden\nLeider muss ich dich enttäuschen. Die Regelung ist gesetzeskonform. Das Minimum liegt sogar nur bei 20 Tagen. Sei froh, dass du mehr hast. Bei manchen Arbeitgebern erhöht sich der Urlaubsanspruch mit längerer Firmenzugehörigkeit.\n\nb) Limit, vor 5 Stunden\nMeines Wissens gibt es keine gesetzliche Regelung dafür, aber sprich doch einfach mal mit eurem Chef. Dem ist vielleicht gar nicht klar, dass du das nicht so toll findest, wenn du immer erst so kurz vorher weißt, an welchen Tagen du arbeiten musst und wann du frei hast.\n\nc) Susanne, vor 3 Stunden\nUrlaub muss immer rechtzeitig beantragt werden, aber der Arbeitgeber ist nicht unbedingt verpflichtet, ihn zu gewähren. Wann Urlaub genommen werden darf, entscheidet der Chef. Aufgrund dringender betrieblicher Gründe kann ein Urlaubsantrag auch abgelehnt werden.\n\nd) Nico, vor 30 Minuten\nSchau doch mal in deinen Arbeitsvertrag, da ist das sicher geregelt. Soviel ich wie, gibt es keine gesetzlichen Einschränkungen für angestellte Arbeitnehmer. Allerdings darfst du keine sieben Tage am Stück arbeiten. Der Samstag gilt in Deutschland als normalen Wochentag.\n\ne) Greta, vor 2 Stunden\nIch arbeite auch im Einzelhandel und bei uns ist es so geregelt, dass man einen festen Wochentag freibekommt, wenn man immer samstags arbeitet. Das kommt mir entgegen. So kann ich entspannt unter der Woche einkaufen oder ins Schwimmbad gehen.\n\nf) Michele, vor 6 Stunden\nDas kann dein Chef nicht einfach so machen. Personelle Engpässe reichen für den Widerruf eines Urlaubsantrags nicht aus. Wenn du deinen Urlaub tatsächlich nicht antrittst, muss der Arbeitgeber alle Kosten tragen, die dir durch die Urlaubsverschiebung entstehen.",
            "fragen": [
                {
                    "nummer": 10,
                    "frage": "Thia: Voll gemein, ich habe nur 25 Urlaubstage! Mein Freund hat hingegen 30 Tage im Jahr. Ich frage mich, ob mir nicht auch mehr Tage zustehen. Kennt sich von euch da jemand aus?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "a",
                    "erklaerung": "Cécile (a) erklärt, dass das gesetzliche Minimum bei 20 Tagen liegt und 25 Tage vollkommen rechtmäßig sind."
                },
                {
                    "nummer": 11,
                    "frage": "Marilena: Ich arbeite im Einzelhandel und bei uns gilt jede Woche ein anderer Dienstplan. Wir bekommen den Plan immer erst am Ende der Vorwoche und deshalb können wir unsere Freizeit natürlich auch nicht richtig planen. Ist das erlaubt?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "b",
                    "erklaerung": "Limit (b) empfiehlt das Gespräch mit dem Chef bezüglich der kurzfristigen Dienstplanausgabe."
                },
                {
                    "nummer": 12,
                    "frage": "Hans: Ich habe nach der Genehmigung meines Urlaubs diesen gebucht und jetzt hat mein Chef gemerkt, dass ein anderer Kollege schon vorher zur selben Zeit Urlaub eingereicht hat. Jetzt will er mir meinen wieder streichen. Darf er das?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "f",
                    "erklaerung": "Michele (f) stellt klar, dass ein genehmigter Urlaub nicht einfach widerrufen werden darf und der Arbeitgeber Stornokosten tragen müsste."
                },
                {
                    "nummer": 13,
                    "frage": "Lisa: Ich mache zurzeit ein Pflichtpraktikum in einem Unternehmen und arbeite von Montag bis Freitag acht Stunden täglich. Jetzt soll ich nächsten Samstag auch noch kommen. Bin ich dazu verpflichtet? Ich fühle mich ein bisschen ausgenutzt!",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "x",
                    "erklaerung": "Zu Lisas Situation bezüglich Pflichtpraktikum und Samstagsarbeit gibt es keinen passenden Beitrag."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 3,
        "aufgabe_typ": "zuordnung",
        "thema": "Varyant 6: Forum – Umkleidezeit, Dienstreise & Fortbildung",
        "punkte_max": 12,
        "inhalt": {
            "anweisung": "Lesen Sie die Beiträge 10 bis 13 und die Forumsbeiträge a bis f. Welcher Beitrag passt zu welcher Person? Für eine Person gibt es keinen passenden Beitrag. Markieren Sie in diesem Fall ein x.",
            "text": "Forum: Rund um den Beruf\n\na) Andres, vor 8 Minuten\nWenn du in Sportkleidung in die Firma kommst und dich dort noch umziehst, ist das Privatsache. Du musst dafür sorgen, dass du pünktlich mit deiner Arbeit beginnen kannst. In diesem Fall ist die Umkleidezeit keine Arbeitszeit.\n\nb) Paula, vor 3 Stunden\nDer Weg zur Arbeit ist private Zeit. Du trägst die Verantwortung dafür, pünktlich vor Ort zu sein, egal wie weit dein Weg ist. Wenn du z.B. im Stau stehst oder die S-Bahn streikt und du deshalb zu spät kommst, musst du die Zeit nacharbeiten.\n\nc) Raimund, vor 6 Stunden\nArbeitnehmer/innen haben in der Regel alle zwei Jahre Anspruch auf fünf Tage Bildungsurlaub. Die Gesetze sind aber nicht in jedem Bundesland gleich. So variiert zum Beispiel die Anzahl der Tage für Bildungsurlaub je nachdem, ob du Voll- oder Teilzeit tätig bist.\n\nd) Hubert, vor 38 Minuten\nIch finde das Tragen von Dienstkleidung absolut veraltet. Warum müssen alle im Unternehmen gleich gekleidet sein? Jeder Mensch hat doch seinen eigenen Stil, mit dem er sich wohlfühlt. Ich kann verstehen, dass du die Uniform nicht auch noch im Zug tragen möchtest.\n\ne) Yvonne, vor 7 Stunden\nWenn du selbst entscheidest, eine Fortbildung zu besuchen, und das vorher nicht mit deinem Arbeitgeber absprichst, ist das reines Privatvergnügen. Schickt dein Chef dich allerdings seinerseits auf ein Seminar, handelt es sich um Arbeitszeit.\n\nf) Winfried, vor 25 Minuten\nDas ist ein schwieriges Thema. Wenn du während der Reise zum Beispiel deinen Termin vorbereitest oder mit dem Laptop ein Protokoll schreibst, ist das Arbeitszeit. Wenn du dich aber mit privaten Dingen wie einem Roman oder einem privaten Telefonat beschäftigst, gilt das als Freizeit.",
            "fragen": [
                {
                    "nummer": 10,
                    "frage": "Claudia: Ich muss während der Arbeit eine Uniform tragen. Mir ist es unangenehm, die schon morgens in der Bahn anzuhaben, und ich möchte mich lieber im Hotel umziehen. Muss ich dafür früher kommen oder gilt die Umkleidezeit als Arbeitszeit?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "x",
                    "erklaerung": "Zu Claudias Frage bzgl. vorgeschriebener Dienstkleidung/Uniform im Hotel gibt es keine rechtlich passende Antwort."
                },
                {
                    "nummer": 11,
                    "frage": "Maisel: Gestern war ich für einen Tag bei einem Kunden in Norddeutschland. Ich bin mit dem Zug gefahren und habe während der Fahrt gelesen. Insgesamt war ich elf Stunden unterwegs und habe Überstunden geltend gemacht. Die will mein Arbeitgeber nicht anerkennen.",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "f",
                    "erklaerung": "Winfried (f) erklärt, dass private Beschäftigung während der Dienstreise (wie Lesen) als Freizeit gilt."
                },
                {
                    "nummer": 12,
                    "frage": "Cristof: Ich war am Wochenende auf einer Fortbildung, die für meine Arbeit relevant war. Ich wollte mir jetzt einen Urlaubstag gutschreiben lassen, aber meine Chefin sagt, das sei meine private Angelegenheit, da sie die Fortbildung nicht angeordnet hat. Stimmt das?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "e",
                    "erklaerung": "Yvonne (e) bestätigt, dass eine nicht vom Arbeitgeber angeordnete Fortbildung Privatsache ist."
                },
                {
                    "nummer": 13,
                    "frage": "Samira: Ich fahre morgens mit dem Fahrrad in die Firma, bin immer pünktlich um 9.00 Uhr da und mache mich dann fertig. Ab sofort soll ich früher kommen und darf mich nicht mehr während der Arbeitszeit umziehen. Ist das korrekt?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "a",
                    "erklaerung": "Andres (a) stellt klar: Wer privat in Sportkleidung anreist, muss sich vor Beginn der Arbeitszeit umziehen."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 3,
        "aufgabe_typ": "zuordnung",
        "thema": "Varyant 7: Forum – Altersvorsorge und Renteneintritt",
        "punkte_max": 12,
        "inhalt": {
            "anweisung": "Lesen Sie die Beiträge 10 bis 13 und die Forumsbeiträge a bis f. Welcher Beitrag passt zu welcher Person? Für eine Person gibt es keinen passenden Beitrag. Markieren Sie in diesem Fall ein x.",
            "text": "Forum: Rund um den Beruf\n\na) Stefan, vor 4 Stunden\nKaum jemandem gelingt es, 45 Jahre durchgehend so ein hohes Gehalt zu verdienen, dass er später die Höchstrente bekommt. Das liegt schon allein daran, dass man während der Ausbildung und in den ersten Berufsjahren weniger verdient.\n\nb) Jana, vor 34 Minuten\nAuch Firmen helfen, für die Zukunft vorzusorgen, denn man kann gar nicht früh genug damit anfangen. Erkundige dich bei deinem Arbeitgeber, ob eine betriebliche Altersvorsorge angeboten wird. Wenn man dann später Rentner ist, bekommt man eine zusätzliche Rente.\n\nc) Antje, vor 7 Stunden\nWenn man mindestens fünf Jahre versicherungspflichtig beschäftigt war, hat man Anspruch auf die gesetzliche Rente. Dabei spielt es keine Rolle, ob man Teilzeit oder Vollzeit gearbeitet hat. Es gibt aber noch Unterschiede zwischen Ost und West.\n\nd) Jonas, vor 2 Stunden\nMan hat das Recht, früher als mit 67 Jahren in Rente zu gehen, aber man muss Abschläge in Kauf nehmen. Im Moment sind das für jeden Monat, den man weniger arbeitet, 0,3 Prozent weniger. Man muss sich das genau ausrechnen, ob man sich das leisten kann.\n\ne) Jörg, vor 5 Stunden\nFür alle, die nach 1964 geboren sind, gilt dass sie bis 67 Jahre arbeiten müssen. Außer, wenn man mit 65 schon 45 Beitragsjahre nachweisen kann, also Jahre, in denen man in die Rentenversicherung eingezahlt hat.\n\nf) Lia, vor 12 Stunden\nWenn man jung ist, sollte man sein Leben doch erst einmal genießen. Über Alter und Krankheit kann man sich immer noch Gedanken machen. Wer weiß, ob es später, wenn wir so weit sind, überhaupt noch eine Rente geben wird.",
            "fragen": [
                {
                    "nummer": 10,
                    "frage": "Torsten: Wir hatten neulich im Büro eine Diskussion darüber, ab wann man in Rente gehen kann. Ich dachte immer, man muss bis 67 arbeiten. Aber meine Kollegin meinte, dass sie zwei Jahre früher in Rente gehen wird. Geht das überhaupt?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "e",
                    "erklaerung": "Jörg (e) erklärt die Ausnahme: Wer 45 Beitragsjahre vorweist, kann mit 65 abschlagsfrei in Rente gehen."
                },
                {
                    "nummer": 11,
                    "frage": "Hella: Meine Rente wird ja nicht so berauschend sein, vor allem, weil ich wegen meiner zwei Kinder einige Jahre nicht oder nur Teilzeit gearbeitet habe. Es ist ja wohl schon so, dass ich dafür jetzt irgendwie bestraft werde, oder?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "x",
                    "erklaerung": "Zu Hellas Frage über Mütterrente / Ausgleichszeiten bei Kindererziehung gibt es keinen passenden Beitrag."
                },
                {
                    "nummer": 12,
                    "frage": "Petra: Mein Mann geht in zwei Jahren in Rente. Ich müsste noch vier Jahre arbeiten. Wir haben uns überlegt, dass wir zusammen in Rente gehen und noch viele gemeinsame Jahre mit verschiedenen Aktivitäten erleben wollen. Welche Folgen hätte das?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "d",
                    "erklaerung": "Jonas (d) klärt auf, dass ein vorzeitiger Renteneintritt mit monatlichen Abschlägen von 0,3% verbunden ist."
                },
                {
                    "nummer": 13,
                    "frage": "Leni: Ich bin ja noch jung und denke überhaupt noch nicht an die Rente. Aber es wird ja immer wieder gesagt, dass die normale Rente irgendwann nicht mehr ausreichen wird. Was kann ich denn jetzt schon für später tun?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "b",
                    "erklaerung": "Jana (b) rät zur frühzeitigen betrieblichen Altersvorsorge über den Arbeitgeber."
                }
            ]
        }
    },
    {
        "modul": "lesen",
        "aufgabe": 3,
        "aufgabe_typ": "zuordnung",
        "thema": "Varyant 8: Forum – Elternzeit und Elterngeld",
        "punkte_max": 12,
        "inhalt": {
            "anweisung": "Lesen Sie die Beiträge 10 bis 13 und die Forumsbeiträge a bis f. Welcher Beitrag passt zu welcher Person? Für eine Person gibt es keinen passenden Beitrag. Markieren Sie in diesem Fall ein x.",
            "text": "Forum: Rund um den Beruf\n\na) Mario, vor 10 Stunden\nWarte erst einmal ab, wie sich alles mit dem Kind entwickelt. Ich würde die Zeit nach der Geburt nicht mit Arbeit verplanen. Es ist nämlich eine große Umstellung. Wenn du dann später „Langeweile“ haben solltest, kannst du immer noch überlegen, arbeiten zu gehen.\n\nb) Johann, vor 20 Minuten\nBeides ist nicht ganz falsch - nach der Geburt des Kindes hat man bis zu drei Jahre Anspruch auf Freistellung von der Arbeit. 14 Monate erhält das Paar Elterngeld. Sowohl die bezahlte als auch die nicht bezahlte Zeit der Betreuung können die Eltern frei untereinander aufteilen.\n\nc) Hanna, vor 30 Minuten\nElterngeld erhält man von der Elterngeldstelle. Die Höhe hängt davon ab, wie viel man vorher verdient hat. Vater und Mutter können die bezahlte Elternzeit von 14 Monaten untereinander aufteilen, wie es ihnen am besten passt. Allerdings ist die Frau die ersten acht Wochen im Mutterschutz.\n\nd) Angela, vor 8 Stunden\nWenn du schon länger als sechs Monate bei einer Firma beschäftigt bist, kannst du beantragen, auch während der Elternzeit ein bisschen zu arbeiten. Du darfst dann allerdings nicht mehr als 30 Stunden pro Woche tätig sein. Der Betrieb kann den Antrag aber auch ablehnen.\n\ne) Lars, vor 3 Stunden\nWenn eine Frau schwanger ist, kann sie, soweit es der Gesundheitszustand zulässt, bis sechs Wochen vor der Geburt arbeiten. Dann beginnt der Mutterschutz. Dieser gilt auch noch für acht Wochen nach der Geburt. Im Anschluss folgt die Elternzeit. Aber dafür gibt es wieder andere Regelungen.\n\nf) Petra, vor 5 Stunden\nWährend der Schwangerschaft darf ein Arbeitgeber die Mitarbeiterin nicht nach 22 Uhr beschäftigen. Zwischen 20 und 22 Uhr kann man als Schwangere nur auf eigenen Wunsch arbeiten, der Arbeitgeber darf das nicht anordnen. Insgesamt darf eine Schwangere aber eine tägliche Arbeitszeit von 8,5 Stunden nicht überschreiten.",
            "fragen": [
                {
                    "nummer": 10,
                    "frage": "Natalja: Wir werden Eltern und wollen beide die bezahlte Elternzeit nehmen. Eine Freundin meinte, dass wir insgesamt ein Jahr zu Hause bleiben können. Ein anderer Bekannter sagte, man könne sein Kind bis zu drei Jahre zu Hause betreuen. Was stimmt?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "b",
                    "erklaerung": "Johann (b) erklärt, dass Elternzeit bis zu drei Jahre dauern kann, während Elterngeld für 14 Monate gezahlt wird."
                },
                {
                    "nummer": 11,
                    "frage": "Katrin: Ich bin im vierten Monat schwanger. Mein Chef will, dass ich notfalls auch mal eine Spätschicht übernehme. Die geht bis 21:00 Uhr. Soviel ich weiß, ist das gar nicht erlaubt, oder? Außerdem bin ich abends immer sehr müde.",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "f",
                    "erklaerung": "Petra (f) legt dar: Zwischen 20 und 22 Uhr darf der Arbeitgeber Spätschichten für Schwangere nicht verpflichtend anordnen."
                },
                {
                    "nummer": 12,
                    "frage": "Giovanni: Wir sind Auszubildende und bekommen bald ein Kind. Erst nach der Ausbildung wollen wir in Elternzeit gehen. Bis dahin könnte die Oma auf unser Kind aufpassen. Unser Betrieb wäre einverstanden. Weiß jemand, ob man die Elternzeit später beginnen darf?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "x",
                    "erklaerung": "Zu der Frage, ob Azubis die Elternzeit auf nach der Ausbildung verschieben können, passt keiner der Beiträge."
                },
                {
                    "nummer": 13,
                    "frage": "Sandra: Nach der Geburt bekomme ich Elterngeld. Finanziell mache ich mir keine Sorgen. Aber ich will beruflich den Anschluss nicht verlieren. Nur mit dem Kind zu Hause zu bleiben, ist nicht mein Ding. Kann man Elterngeld bekommen und gleichzeitig arbeiten?",
                    "optionen": ["a", "b", "c", "d", "e", "f", "x"],
                    "korrekt": "d",
                    "erklaerung": "Angela (d) erklärt, dass man während der Elternzeit bis zu 30 Stunden pro Woche arbeiten darf."
                }
            ]
        }
    }
]

# Insert each variant if not exists
for v in teil3_variants:
    existing = sb.table('b2_questions').select('id').eq('modul', 'lesen').eq('aufgabe', 3).eq('thema', v['thema']).execute()
    if existing.data:
        print(f"Zaten mevcut: {v['thema']}")
    else:
        res = sb.table('b2_questions').insert(v).execute()
        print(f"Eklendi: {v['thema']}")

print("Lesen Teil 3 varyantları başarıyla tamamlandı!")
