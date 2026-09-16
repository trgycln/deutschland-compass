import os
import sys
import fitz
from supabase import create_client, Client
from dotenv import load_dotenv

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv('.env.local')

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY]):
    print("HATA: .env.local icindeki keyler eksik.")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# 1. Mevcut Variante 1'in başlığını netleştir
supabase.table("b2_questions").update({
    "thema": "Varyant 1: Informationen zum Arbeitsmarkt suchen"
}).eq("modul", "lesen").eq("aufgabe", 1).like("thema", "%Arbeitsmarkt%").execute()

# 2. Yeni Varyantları Tanımla
variants = [
    {
        "thema": "Varyant 2: Kündigung und Arbeitsrecht",
        "page_idx": 10, # Page 11
        "fragen": [
            {"nummer": 1, "frage": "Junis ist gelernter KFZ-Mechatroniker und möchte eine eigene Werkstatt gründen.", "korrekt": "d"},
            {"nummer": 2, "frage": "Maria arbeitet als Hilfsarbeiterin und möchte nun eine Berufsausbildung machen.", "korrekt": "h"},
            {"nummer": 3, "frage": "Nikolett möchte sich nicht zwischen Familie und Arbeit entscheiden müssen.", "korrekt": "c"},
            {"nummer": 4, "frage": "Amin studiert Fremdsprachen und möchte nach seinem Abschluss freiberuflich arbeiten.", "korrekt": "e"},
            {"nummer": 5, "frage": "Samita soll aus betriebsbedingten Gründen gekündigt werden und sie möchte dagegen vorgehen.", "korrekt": "a"},
        ]
    },
    {
        "thema": "Varyant 3: Familie, Gesundheit und Beruf",
        "page_idx": 11, # Page 12
        "fragen": [
            {"nummer": 1, "frage": "Lamia überlegt, ob sie im Vorstellungsgespräch ihre Schwangerschaft erwähnen muss.", "korrekt": "b"},
            {"nummer": 2, "frage": "Raymond möchte im Internet einen Job finden.", "korrekt": "h"},
            {"nummer": 3, "frage": "Karl will sich in der Gastronomie selbstständig machen.", "korrekt": "g"},
            {"nummer": 4, "frage": "Sean ist unsicher, ob er seinen kranken Sohn mit ins Büro nehmen darf.", "korrekt": "f"},
            {"nummer": 5, "frage": "Ramona interessiert sich für Jobchancen als Reiseverkehrskauffrau.", "korrekt": "d"},
        ]
    },
    {
        "thema": "Varyant 4: Karriere, Ausland und Umwelt",
        "page_idx": 13, # Page 14
        "fragen": [
            {"nummer": 1, "frage": "Laura möchte während des Studiums Berufserfahrung sammeln.", "korrekt": "e"},
            {"nummer": 2, "frage": "Igor hat Familie und möchte im europäischen Ausland arbeiten.", "korrekt": "h"},
            {"nummer": 3, "frage": "Jens interessiert sich für das Thema Umweltschutz in Unternehmen.", "korrekt": "b"},
            {"nummer": 4, "frage": "Jasmin hat Probleme mit ihren Kollegen und braucht Hilfe.", "korrekt": "d"},
            {"nummer": 5, "frage": "Somayeh ist Architektin und möchte ihr eigenes Architekturbüro eröffnen.", "korrekt": "a"},
        ]
    },
    {
        "thema": "Varyant 5: Mobbing, Meisterprüfung und Weiterbildung",
        "page_idx": 14, # Page 15
        "fragen": [
            {"nummer": 1, "frage": "Yasmina sucht nach dem Realschulabschluss einen Beruf mit guten Perspektiven.", "korrekt": "d"},
            {"nummer": 2, "frage": "Jason überlegt, ob er bei einem neu gegründeten Unternehmen arbeiten soll.", "korrekt": "h"},
            {"nummer": 3, "frage": "Hannah wird von ihren Kollegen schlecht behandelt und sucht Hilfe.", "korrekt": "a"},
            {"nummer": 4, "frage": "Gacer fragt sich, ob sie Fortbildungen besuchen muss.", "korrekt": "g"},
            {"nummer": 5, "frage": "Assem braucht Informationen zur Meisterprüfung.", "korrekt": "e"},
        ]
    },
    {
        "thema": "Varyant 6: Aufstieg, Beratung und Einzelhandel",
        "page_idx": 15, # Page 16
        "fragen": [
            {"nummer": 1, "frage": "Silvie ist gelernte Verkäuferin und möchte in ihrem Job aufsteigen.", "korrekt": "c"},
            {"nummer": 2, "frage": "Brian sucht Computerkurse, die er von zu Hause aus machen kann.", "korrekt": "h"},
            {"nummer": 3, "frage": "Carl ist Umwelttechniker und möchte seine eigene Beratungsagentur gründen.", "korrekt": "b"},
            {"nummer": 4, "frage": "Mira ist unsicher, wie es nach ihrem Arbeitsplatzverlust weitergehen soll.", "korrekt": "e"},
            {"nummer": 5, "frage": "Karim sucht einen Ausbildungsplatz in einer sicheren Branche.", "korrekt": "a"},
        ]
    }
]

archive_path = "public/dokument/Alle Information от 02.09.26.pdf"
doc = fitz.open(archive_path)

# Mevcut temaları al
res = supabase.table("b2_questions").select("id, thema").eq("modul", "lesen").execute()
existing_themas = {r["thema"] for r in res.data if r.get("thema")}

option_letters = ["a", "b", "c", "d", "e", "f", "g", "h"]

for v in variants:
    thema = v["thema"]
    if thema in existing_themas:
        print(f"[-] {thema} zaten ekli, atlandi.")
        continue

    # Sayfadaki a-h metinlerini al
    raw_text = doc[v["page_idx"]].get_text()
    
    # a) harfinden sonrasını al
    split_pos = raw_text.find("a)")
    if split_pos == -1:
        split_pos = raw_text.find("a ")
    
    article_text = raw_text[split_pos:].strip() if split_pos != -1 else raw_text

    # Soru objelerini hazırla
    formatted_fragen = []
    for q in v["fragen"]:
        formatted_fragen.append({
            "nummer": q["nummer"],
            "frage": q["frage"],
            "korrekt": q["korrekt"],
            "optionen": option_letters,
            "erklaerung": ""
        })

    payload = {
        "modul": "lesen",
        "aufgabe": 1,
        "aufgabe_typ": "zuordnung",
        "thema": thema,
        "punkte_max": 5,
        "schwierigkeit": "B2",
        "inhalt": {
            "anweisung": "Sie lesen online in einer Wirtschaftszeitung und möchten Ihren Bekannten einige passende Artikel schicken. Entscheiden Sie, welcher Artikel (a–h) zu welcher Person (1–5) passt. Für eine Person gibt es keinen passenden Artikel.",
            "text": article_text,
            "fragen": formatted_fragen
        },
        "aktiv": True
    }

    insert_res = supabase.table("b2_questions").insert(payload).execute()
    if insert_res.data:
        print(f"[OK] {thema} basariyla eklendi! (ID: {insert_res.data[0]['id']})")

print("\n[TAMAMLANDI] Lesen Teil 1 tum varyantlari eklendi!")
