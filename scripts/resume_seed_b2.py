import os
import json
import time
import sys
import fitz  # PyMuPDF
from dotenv import load_dotenv
from google import genai
from google.genai import types
from supabase import create_client, Client

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv('.env.local')

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY]):
    print("HATA: .env.local icindeki keyler eksik.")
    sys.exit(1)

client = genai.Client(api_key=GEMINI_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_existing_tasks():
    res = supabase.table("b2_questions").select("modul, aufgabe").execute()
    return {(r['modul'], r['aufgabe']) for r in res.data}

def call_gemini(prompt: str, max_retries: int = 3):
    models = ['gemini-2.5-flash', 'gemini-3.7-flash', 'gemini-3.6-flash']
    for model_name in models:
        for attempt in range(max_retries):
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        temperature=0.0,
                        response_mime_type="application/json",
                    ),
                )
                text = response.text.strip()
                if text.startswith("```json"):
                    text = text[7:-3].strip()
                elif text.startswith("```"):
                    text = text[3:-3].strip()
                return json.loads(text)
            except Exception as e:
                err_msg = str(e)
                print(f"   [!] Gemini uyari ({model_name}, deneme {attempt+1}): {err_msg[:100]}")
                time.sleep(2)
    raise RuntimeError("Gemini cagrilarinin tumu basarisiz oldu.")

# ==========================================
# 1. Test 1'den Kalanlar (Hören 4 & Schreiben 2)
# ==========================================
def finish_test_1():
    existing = get_existing_tasks()
    doc = fitz.open("public/dokument/1011431_20220708_5015-b00-010102_web.pdf")

    # Hören 4
    if ('hoeren', 4) not in existing:
        print("\n[+] Test 1 -> Hören Aufgabe 4 cikariliyor...")
        p21_text = doc[20].get_text() # Page 21
        p53_text = doc[52].get_text() # Page 53 (Transkript)
        p54_text = doc[53].get_text() # Page 54 (Loesungen)

        prompt = f"""Du bist ein telc B2 Prüfungsstrukturierer.
Hier sind die Seiten aus der Prüfung:
Aufgabenblatt:
{p21_text}

Hörtext Transkript:
{p53_text}

Lösungen:
36 a, 37 a, 38 c, 39 b, 40 b

Strukturiere diese Höraufgabe 4 exakt als JSON:
{{
  "aufgabe_typ": "multiple_choice",
  "thema": "Telefonische Mitteilungen",
  "punkte_max": 15,
  "audio_start_sec": 920,
  "audio_end_sec": 1220,
  "audio_transkript": "{p53_text.replace('"', "'")}",
  "inhalt": {{
    "anweisung": "Sie hören fünf telefonische Mitteilungen. Zu jeder Mitteilung gibt es eine Aufgabe. Welche Lösung (a, b oder c) passt am besten? Markieren Sie Ihre Lösungen für die Aufgaben 36–40 auf dem Antwortbogen.",
    "fragen": [
      {{ "nummer": 36, "frage": "Annie", "optionen": ["a) braucht einen Laptop vom Hotel.", "b) hat die Unterlagen ins Internet gestellt.", "c) hat ihren Laptop im Hotel vergessen."], "korrekt": "a" }},
      {{ "nummer": 37, "frage": "Julian", "optionen": ["a) meldet sich für das Wochenende krank.", "b) muss in der kommenden Woche zum Arzt.", "c) soll am Wochenende einen Kollegen vertreten."], "korrekt": "a" }},
      {{ "nummer": 38, "frage": "Jessica Maler", "optionen": ["a) bittet um Bezahlung der Rechnung.", "b) liefert nur einmal im Quartal Papier.", "c) schickt die Rechnung nach."], "korrekt": "c" }},
      {{ "nummer": 39, "frage": "Petra", "optionen": ["a) hat einen Partyraum beim Italiener reserviert.", "b) schlägt vor, im Steakhaus zu feiern.", "c) verschiebt die Feier auf Januar."], "korrekt": "b" }},
      {{ "nummer": 40, "frage": "Michael will, dass die Mitarbeiter", "optionen": ["a) alle Probleme bis morgen lösen.", "b) die Reparaturen zeitnah durchführen.", "c) sich melden, wenn die Qualitätskontrolle kommt."], "korrekt": "b" }}
    ]
  }}
}}
NUR JSON zurückgeben."""
        data = call_gemini(prompt)
        res = supabase.table("b2_questions").insert({
            "modul": "hoeren",
            "aufgabe": 4,
            "aufgabe_typ": data.get("aufgabe_typ", "multiple_choice"),
            "thema": data.get("thema", "Telefonische Mitteilungen"),
            "punkte_max": 15,
            "audio_start_sec": 920,
            "audio_end_sec": 1220,
            "audio_transkript": data.get("audio_transkript"),
            "inhalt": data.get("inhalt", {}),
            "aktiv": True
        }).execute()
        print(f"   [OK] Hören 4 eklendi! ID: {res.data[0]['id']}")

    # Schreiben 2
    if ('schreiben', 2) not in existing:
        print("\n[+] Test 1 -> Schreiben Aufgabe 2 (Forumsbeitrag) cikariliyor...")
        p25_text = doc[24].get_text() # Page 25
        prompt = f"""Du bist ein telc B2 Prüfungsstrukturierer.
Hier ist das Aufgabenblatt (Forumsbeitrag):
{p25_text}

Strukturiere diese Schreibaufgabe 2 exakt als JSON:
{{
  "aufgabe_typ": "forumsbeitrag",
  "thema": "Forumsbeitrag: Firmenhandy oder Kleiderordnung",
  "punkte_max": 60,
  "inhalt": {{
    "anweisung": "Wählen Sie eines der folgenden Themen. In Ihrer Firma können sich alle Mitarbeiterinnen und Mitarbeiter in einem Forum miteinander über Neuigkeiten austauschen. Schreiben Sie einen Forumsbeitrag zu Thema A oder B. Begründen Sie Ihre Meinung und nennen Sie passende Beispiele. Gliedern Sie Ihren Text in sinnvolle Abschnitte.",
    "situation": "In Ihrer Firma können sich alle Mitarbeiterinnen und Mitarbeiter in einem Forum austauschen.",
    "schreibanlass": "Schreiben Sie einen Forumsbeitrag zu Thema A (Firmenhandy für alle) oder Thema B (Kleiderordnung).",
    "inhaltspunkte": [
      "Ihre persönliche Meinung zum Thema darlegen",
      "Argumente dafür und dagegen anführen",
      "Erfahrungen oder konkrete Beispiele aus Ihrem Berufsalltag nennen",
      "Einen konstruktiven Vorschlag oder Kompromiss formulieren"
    ],
    "hilfsmittel": [
      "Thema A: Firmenhandy für alle (Erreichbarkeit auch abends/Wochenende, private Nutzung gestattet)",
      "Thema B: Kleiderordnung (Einheitliche Firmenkleidung, Reinigungskosten privat)"
    ],
    "mindestwoerter": 150,
    "bewertungskriterien": {{
      "inhalt": "Aufgabenbewältigung (0-20)",
      "kommunikative_gestaltung": "Textaufbau, Kohärenz, Register (0-20)",
      "formale_richtigkeit": "Grammatik, Orthographie, Wortschatz (0-20)"
    }}
  }}
}}
NUR JSON zurückgeben."""
        data = call_gemini(prompt)
        res = supabase.table("b2_questions").insert({
            "modul": "schreiben",
            "aufgabe": 2,
            "aufgabe_typ": data.get("aufgabe_typ", "forumsbeitrag"),
            "thema": data.get("thema", "Forumsbeitrag"),
            "punkte_max": 60,
            "inhalt": data.get("inhalt", {}),
            "aktiv": True
        }).execute()
        print(f"   [OK] Schreiben 2 eklendi! ID: {res.data[0]['id']}")

# ==========================================
# 2. 200 Sayfalık Arşivden Sınav Varyantları
# ==========================================
def extract_archive_items():
    archive_path = "public/dokument/Alle Information от 02.09.26.pdf"
    if not os.path.exists(archive_path):
        print(f"Arsiv dosyasi yok: {archive_path}")
        return

    doc = fitz.open(archive_path)
    print(f"\n========================================================")
    print(f"Arsiv Dokumani ({len(doc)} sayfa) isleniyor...")
    print(f"========================================================")

    res = supabase.table("b2_questions").select("modul, aufgabe, thema").execute()
    existing_themes = {r['thema'].lower() for r in res.data}
    schreiben_cur = max([r['aufgabe'] for r in res.data if r['modul'] == 'schreiben'] or [0])
    sprechen_cur = max([r['aufgabe'] for r in res.data if r['modul'] == 'sprechen'] or [0])

    # 1. Beschwerde Varyantları (Sayfa 74 - 77)
    beschwerde_pages = [74, 75, 76, 77]
    beschwerde_raw = "\n".join([doc[p-1].get_text() for p in beschwerde_pages if p <= len(doc)])

    print("\n[+] Arsivden Beschwerde Gorevleri cikariliyor...")
    prompt_beschwerde = f"""Hier ist der Text aus dem Prüfungsarchiv für Beschwerdebriefe:
{beschwerde_raw[:3500]}

Extrahiere 2 konkrete, vollständige telc B2 Beschwerde-Aufgaben als JSON-Array:
[
  {{
    "aufgabe_typ": "beschwerde",
    "thema": "<Thema des Beschwerdebriefs, z.B. Falsche Rechnung oder Schlechter Lieferservice>",
    "punkte_max": 60,
    "inhalt": {{
      "anweisung": "<Aufgabenstellung>",
      "situation": "<Ausführliche Situation>",
      "schreibanlass": "<Schreibanlass>",
      "inhaltspunkte": [
        "<Punkt 1>",
        "<Punkt 2>",
        "<Punkt 3>",
        "<Punkt 4>"
      ],
      "mindestwoerter": 150,
      "bewertungskriterien": {{
        "inhalt": "Aufgabenbewältigung (0-20)",
        "kommunikative_gestaltung": "Textaufbau (0-20)",
        "formale_richtigkeit": "Grammatik und Wortschatz (0-20)"
      }}
    }}
  }}
]
NUR JSON-Array zurückgeben."""
    try:
        beschwerde_items = call_gemini(prompt_beschwerde)
        for item in beschwerde_items:
            thema = item.get("thema", "Beschwerde")
            if thema.lower() not in existing_themes:
                schreiben_cur += 1
                r = supabase.table("b2_questions").insert({
                    "modul": "schreiben",
                    "aufgabe": schreiben_cur,
                    "aufgabe_typ": "beschwerde",
                    "thema": thema,
                    "punkte_max": 60,
                    "inhalt": item.get("inhalt", {}),
                    "aktiv": True
                }).execute()
                print(f"   [OK] Schreiben {schreiben_cur}: {thema} eklendi!")
                existing_themes.add(thema.lower())
    except Exception as e:
        print(f"   [-] Beschwerde cikarma hatasi: {e}")

    # 2. Sprechen Durum Senaryoları (Sayfa 186 - 195)
    sprechen_pages = [186, 187, 188, 190, 191, 194]
    sprechen_raw = "\n".join([doc[p-1].get_text() for p in sprechen_pages if p <= len(doc)])

    print("\n[+] Arsivden Sprechen Senaryolari cikariliyor...")
    prompt_sprechen = f"""Hier sind originale Sprechsituationen für telc B2 Beruf (Sprechen Teil 2 - Problem lösen):
{sprechen_raw[:3500]}

Extrahiere 3 verschiedene, praxisnahe Prüfungssituationen als JSON-Array:
[
  {{
    "aufgabe_typ": "gespraech",
    "thema": "<Thema z.B. Altenheim: Beschwerde der Bewohner oder Großküche: Kühlraum defekt>",
    "punkte_max": 60,
    "inhalt": {{
      "anweisung": "Sie arbeiten zusammen in einem Betrieb. Diskutieren Sie mit Ihrer Kollegin / Ihrem Kollegen die Situation und finden Sie gemeinsam eine Lösung.",
      "thema_karte": "<Genaue Situationsbeschreibung aus dem Text>",
      "vorbereitungszeit_min": 10,
      "sprechzeit_min": 3,
      "leitfragen": [
        "Was genau ist das Problem?",
        "Welche Sofortmaßnahmen müssen ergriffen werden?",
        "Welche langfristige Lösung vereinbaren Sie?",
        "Wer informiert wen bzw. erledigt was?"
      ],
      "bewertungskriterien": {{
        "aufgabenerledigung": "Erfüllung der Aufgabenstellung (0-20)",
        "interaktion": "Interaktion und Gesprächsführung (0-20)",
        "sprache": "Ausdruck und Korrektheit (0-20)"
      }}
    }}
  }}
]
NUR JSON-Array zurückgeben."""
    try:
        sprechen_items = call_gemini(prompt_sprechen)
        for item in sprechen_items:
            thema = item.get("thema", "Sprechsituation")
            if thema.lower() not in existing_themes:
                sprechen_cur += 1
                r = supabase.table("b2_questions").insert({
                    "modul": "sprechen",
                    "aufgabe": sprechen_cur,
                    "aufgabe_typ": "gespraech",
                    "thema": thema,
                    "punkte_max": 60,
                    "inhalt": item.get("inhalt", {}),
                    "aktiv": True
                }).execute()
                print(f"   [OK] Sprechen {sprechen_cur}: {thema} eklendi!")
                existing_themes.add(thema.lower())
    except Exception as e:
        print(f"   [-] Sprechen cikarma hatasi: {e}")

def main():
    print("=" * 60)
    print("TELC B2 VERI CEKME VE AKTARMA (GEMINI TEMPERATURE: 0)")
    print("=" * 60)
    finish_test_1()
    extract_archive_items()
    print("\n[TAMAMLANDI] Tum eksik bolumler basariyla aktarildi!")

if __name__ == "__main__":
    main()
