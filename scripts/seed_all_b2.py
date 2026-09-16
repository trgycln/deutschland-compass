import os
import json
import time
import sys
from dotenv import load_dotenv
from google import genai
from google.genai import types
from supabase import create_client, Client

# Set console to utf-8 for Windows
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# ==========================================
# 1. Ortam Değişkenleri
# ==========================================
load_dotenv('.env.local')

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY]):
    print("HATA: .env.local dosyasindaki Supabase veya Gemini keyleri eksik.")
    sys.exit(1)

client = genai.Client(api_key=GEMINI_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ==========================================
# 2. Gemini Yardımcı Fonksiyonu (Retry & Fallback)
# ==========================================
def call_gemini_with_retry(uploaded_file, prompt: str, max_retries: int = 3):
    models_to_try = ['gemini-2.5-flash', 'gemini-3.7-flash', 'gemini-3.6-flash']
    
    for model_name in models_to_try:
        for attempt in range(max_retries):
            try:
                print(f"   -> Gemini ({model_name}) cagriliyor (deneme {attempt + 1})...")
                response = client.models.generate_content(
                    model=model_name,
                    contents=[uploaded_file, prompt],
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
                err_str = str(e)
                print(f"   [!] Uyari ({model_name}): {err_str[:120]}")
                if "503" in err_str or "429" in err_str:
                    time.sleep(3 * (attempt + 1))
                    continue
                else:
                    break
    raise RuntimeError("Tum modeller ve denemeler basarisiz oldu.")

# ==========================================
# 3. PDF 1: Übungstest 1 Kalan Bölümler
# ==========================================
def extract_test1_remaining():
    pdf_path = "public/dokument/1011431_20220708_5015-b00-010102_web.pdf"
    if not os.path.exists(pdf_path):
        print(f"Dosya bulunamadi: {pdf_path}")
        return

    print(f"\n========================================================")
    print(f"1. ADIM: {os.path.basename(pdf_path)} - Eksik Bolumler")
    print(f"========================================================")

    # Mevcut soruları kontrol et
    existing = supabase.table("b2_questions").select("modul, aufgabe").execute().data
    existing_set = {(r['modul'], r['aufgabe']) for r in existing}
    print(f"Mevcut sorular: {sorted(list(existing_set))}")

    print("PDF Gemini'ye yukleniyor...")
    uploaded_file = client.files.upload(file=pdf_path, config={'display_name': "Telc B2 Test 1"})
    print(f"Yuklendi: {uploaded_file.uri}")

    try:
        # A) LESEN TEIL 4 (Sayfa 14-15 ve sayfa 54 cozumleri)
        if ('lesen', 4) not in existing_set:
            print("\n[+] Lesen Aufgabe 4 (Protokoll) cikariliyor...")
            prompt_lesen_4 = """Du bist ein präziser Datenstrukturierer für telc B2 Beruf Prüfungsunterlagen.
Analysiere die Seiten 14 und 15 (Lesen Teil 4, Protokoll und Aufgaben 14-18) sowie Seite 54 (Lösungsschlüssel) des Dokuments.
Extrahiere die Aufgabe WORTGETREU mit exakten offiziellen Lösungen als JSON:
{
  "aufgabe_typ": "multiple_choice",
  "thema": "Protokoll der Sitzung",
  "punkte_max": 15,
  "inhalt": {
    "anweisung": "Lesen Sie das Protokoll und die Aufgaben 14–18. Welche Antwort (a, b oder c) passt am besten? Markieren Sie Ihre Lösungen auf dem Antwortbogen.",
    "text": "<Der vollständige Text des Protokolls von Seite 14 und 15 wortgetreu>",
    "fragen": [
      {
        "nummer": 14,
        "frage": "<Fragetext 14>",
        "optionen": ["a) ...", "b) ...", "c) ..."],
        "korrekt": "c",
        "erklaerung": ""
      },
      {
        "nummer": 15,
        "frage": "<Fragetext 15>",
        "optionen": ["a) ...", "b) ...", "c) ..."],
        "korrekt": "c",
        "erklaerung": ""
      },
      {
        "nummer": 16,
        "frage": "<Fragetext 16>",
        "optionen": ["a) ...", "b) ...", "c) ..."],
        "korrekt": "c",
        "erklaerung": ""
      },
      {
        "nummer": 17,
        "frage": "<Fragetext 17>",
        "optionen": ["a) ...", "b) ...", "c) ..."],
        "korrekt": "c",
        "erklaerung": ""
      },
      {
        "nummer": 18,
        "frage": "<Fragetext 18>",
        "optionen": ["a) ...", "b) ...", "c) ..."],
        "korrekt": "c",
        "erklaerung": ""
      }
    ]
  }
}
NUR valides JSON zurückgeben."""
            data = call_gemini_with_retry(uploaded_file, prompt_lesen_4)
            res = supabase.table("b2_questions").insert({
                "modul": "lesen",
                "aufgabe": 4,
                "aufgabe_typ": data.get("aufgabe_typ", "multiple_choice"),
                "thema": data.get("thema", "Protokoll der Sitzung"),
                "punkte_max": 15,
                "inhalt": data.get("inhalt", {}),
                "aktiv": True
            }).execute()
            print(f"   [OK] Lesen 4 kaydedildi! ID: {res.data[0]['id']}")
            time.sleep(2)

        # B) HÖREN TEIL 1 (Sayfa 18, Hörtext Sayfa 50, Lösung Sayfa 54)
        if ('hoeren', 1) not in existing_set:
            print("\n[+] Hören Aufgabe 1 (Gespräche 22-27) cikariliyor...")
            prompt_hoeren_1 = """Du bist ein präziser Datenstrukturierer für telc B2 Beruf.
Analysiere Seite 18 (Hören Teil 1, Aufgaben 22-27), Seite 50 (Hörtext Transkription) und Seite 54 (Lösungsschlüssel: 22: -, 23: c, 24: +, 25: c, 26: -, 27: b).
Erstelle das strukturierte JSON:
{
  "aufgabe_typ": "multiple_choice_and_true_false",
  "thema": "Drei Gespräche am Arbeitsplatz",
  "punkte_max": 18,
  "audio_start_sec": 42,
  "audio_end_sec": 385,
  "audio_transkript": "<Vollständiges Transkript der drei Gespräche von Seite 50>",
  "inhalt": {
    "anweisung": "Sie hören drei Gespräche. Zu jedem Gespräch gibt es zwei Aufgaben. Ist die Aussage dazu richtig oder falsch und welche Antwort (a, b oder c) passt am besten? Markieren Sie Ihre Lösungen für die Aufgaben 22–27 auf dem Antwortbogen. Sie hören die Gespräche einmal.",
    "fragen": [
      { "nummer": 22, "aussage": "Der Vorgesetzte erklärt Rafael seine heutigen Aufgaben.", "optionen": ["richtig", "falsch"], "korrekt": "falsch" },
      { "nummer": 23, "frage": "Rafael", "optionen": ["a) ist verantwortlich für die Lagerbestände der frischen Lebensmittel.", "b) muss seine eigenen Arbeitsgeräte mitbringen.", "c) soll sich mit den Regeln für Arbeitsschutz vertraut machen."], "korrekt": "c" },
      { "nummer": 24, "aussage": "Die Stationsleitung möchte die Arbeitsplanung für nächste Woche machen.", "optionen": ["richtig", "falsch"], "korrekt": "richtig" },
      { "nummer": 25, "frage": "Während des Oktoberfests benötigt die Notaufnahme", "optionen": ["a) besonders erfahrene Pflegekräfte.", "b) keine weiteren Mitarbeiter an der Anmeldung.", "c) zusätzliches Personal für die Nachtschicht."], "korrekt": "c" },
      { "nummer": 26, "aussage": "Frau Martini von der Firma UniTech möchte ein Gerät umtauschen.", "optionen": ["richtig", "falsch"], "korrekt": "falsch" },
      { "nummer": 27, "frage": "Die Firma UniTech möchte", "optionen": ["a) eine Maschine, die sofort geliefert werden kann.", "b) ein Gerät, das sich automatisch abschaltet.", "c) eine Säge, auf die das Firmenlogo gedruckt wird."], "korrekt": "b" }
    ]
  }
}
NUR valides JSON zurückgeben."""
            data = call_gemini_with_retry(uploaded_file, prompt_hoeren_1)
            res = supabase.table("b2_questions").insert({
                "modul": "hoeren",
                "aufgabe": 1,
                "aufgabe_typ": data.get("aufgabe_typ", "multiple_choice"),
                "thema": data.get("thema", "Gespräche am Arbeitsplatz"),
                "punkte_max": 18,
                "audio_start_sec": data.get("audio_start_sec", 42),
                "audio_end_sec": data.get("audio_end_sec", 385),
                "audio_transkript": data.get("audio_transkript"),
                "inhalt": data.get("inhalt", {}),
                "aktiv": True
            }).execute()
            print(f"   [OK] Hören 1 kaydedildi! ID: {res.data[0]['id']}")
            time.sleep(2)

        # C) HÖREN TEIL 3 (Sayfa 20, Hörtext Sayfa 52, Lösung Sayfa 54: 32: c, 33: b, 34: a, 35: c)
        if ('hoeren', 3) not in existing_set:
            print("\n[+] Hören Aufgabe 3 (Präsentation Alarmanlage 32-35) cikariliyor...")
            prompt_hoeren_3 = """Du bist ein präziser Datenstrukturierer für telc B2 Beruf.
Analysiere Seite 20 (Hören Teil 3, Aufgaben 32-35), Seite 52 (Hörtext Transkription Alarmanlage) und Seite 54 (Lösungsschlüssel: 32: c, 33: b, 34: a, 35: c).
Erstelle das strukturierte JSON:
{
  "aufgabe_typ": "multiple_choice",
  "thema": "Präsentation Neue Alarmanlage",
  "punkte_max": 12,
  "audio_start_sec": 650,
  "audio_end_sec": 920,
  "audio_transkript": "<Vollständiges Transkript der Präsentation von Seite 52>",
  "inhalt": {
    "anweisung": "Sie hören gleich eine Präsentation. Dazu gibt es vier Aufgaben. Welche Lösung (a, b oder c) passt jeweils am besten? Markieren Sie Ihre Lösungen für die Aufgaben 32–35 auf dem Antwortbogen.",
    "fragen": [
      { "nummer": 32, "frage": "Eine Alarmanlage", "optionen": ["a) ist von der Polizei vorgeschrieben.", "b) kostet ungefähr 50.000 Euro.", "c) wird von der Versicherung empfohlen."], "korrekt": "c" },
      { "nummer": 33, "frage": "Die Alarmanlage", "optionen": ["a) ist nur am Wochenende angeschaltet.", "b) sendet per Funk ein Signal an die Polizei.", "c) hat die höchste Sicherheitsstufe."], "korrekt": "b" },
      { "nummer": 34, "frage": "Die Firma Grüner Sicherheitssysteme GmbH", "optionen": ["a) bringt eine Kamera am Haupttor an.", "b) installiert Bewegungsmelder neben der Eingangstür.", "c) montiert die Zentraleinheit vor dem Büro der Geschäftsführung."], "korrekt": "a" },
      { "nummer": 35, "frage": "Das Ein- und Ausschalten der Alarmanlage", "optionen": ["a) erfolgt immer per Fernbedienung.", "b) kann nur über eine App erfolgen.", "c) wird über die Zentraleinheit gesteuert."], "korrekt": "c" }
    ]
  }
}
NUR valides JSON zurückgeben."""
            data = call_gemini_with_retry(uploaded_file, prompt_hoeren_3)
            res = supabase.table("b2_questions").insert({
                "modul": "hoeren",
                "aufgabe": 3,
                "aufgabe_typ": data.get("aufgabe_typ", "multiple_choice"),
                "thema": data.get("thema", "Neue Alarmanlage"),
                "punkte_max": 12,
                "audio_start_sec": data.get("audio_start_sec", 650),
                "audio_end_sec": data.get("audio_end_sec", 920),
                "audio_transkript": data.get("audio_transkript"),
                "inhalt": data.get("inhalt", {}),
                "aktiv": True
            }).execute()
            print(f"   [OK] Hören 3 kaydedildi! ID: {res.data[0]['id']}")
            time.sleep(2)

        # D) HÖREN TEIL 4 (Sayfa 21, Hörtext Sayfa 53, Lösung Sayfa 54: 36: a, 37: a, 38: c, 39: b, 40: b)
        if ('hoeren', 4) not in existing_set:
            print("\n[+] Hören Aufgabe 4 (Telefonische Mitteilungen 36-40) cikariliyor...")
            prompt_hoeren_4 = """Du bist ein präziser Datenstrukturierer für telc B2 Beruf.
Analysiere Seite 21 (Hören Teil 4, Aufgaben 36-40), Seite 53 (Hörtext Transkription Telefonische Mitteilungen) und Seite 54 (Lösungsschlüssel: 36: a, 37: a, 38: c, 39: b, 40: b).
Erstelle das strukturierte JSON:
{
  "aufgabe_typ": "multiple_choice",
  "thema": "Telefonische Mitteilungen",
  "punkte_max": 15,
  "audio_start_sec": 920,
  "audio_end_sec": 1220,
  "audio_transkript": "<Vollständiges Transkript der 5 telefonischen Mitteilungen von Seite 53>",
  "inhalt": {
    "anweisung": "Sie hören fünf telefonische Mitteilungen. Zu jeder Mitteilung gibt es eine Aufgabe. Welche Lösung (a, b oder c) passt am besten? Markieren Sie Ihre Lösungen für die Aufgaben 36–40 auf dem Antwortbogen.",
    "fragen": [
      { "nummer": 36, "frage": "Annie", "optionen": ["a) braucht einen Laptop vom Hotel.", "b) hat die Unterlagen ins Internet gestellt.", "c) hat ihren Laptop im Hotel vergessen."], "korrekt": "a" },
      { "nummer": 37, "frage": "Julian", "optionen": ["a) meldet sich für das Wochenende krank.", "b) muss in der kommenden Woche zum Arzt.", "c) soll am Wochenende einen Kollegen vertreten."], "korrekt": "a" },
      { "nummer": 38, "frage": "Jessica Maler", "optionen": ["a) bittet um Bezahlung der Rechnung.", "b) liefert nur einmal im Quartal Papier.", "c) schickt die Rechnung nach."], "korrekt": "c" },
      { "nummer": 39, "frage": "Petra", "optionen": ["a) hat einen Partyraum beim Italiener reserviert.", "b) schlägt vor, im Steakhaus zu feiern.", "c) verschiebt die Feier auf Januar."], "korrekt": "b" },
      { "nummer": 40, "frage": "Michael will, dass die Mitarbeiter", "optionen": ["a) alle Probleme bis morgen lösen.", "b) die Reparaturen zeitnah durchführen.", "c) sich melden, wenn die Qualitätskontrolle kommt."], "korrekt": "b" }
    ]
  }
}
NUR valides JSON zurückgeben."""
            data = call_gemini_with_retry(uploaded_file, prompt_hoeren_4)
            res = supabase.table("b2_questions").insert({
                "modul": "hoeren",
                "aufgabe": 4,
                "aufgabe_typ": data.get("aufgabe_typ", "multiple_choice"),
                "thema": data.get("thema", "Telefonische Mitteilungen"),
                "punkte_max": 15,
                "audio_start_sec": data.get("audio_start_sec", 920),
                "audio_end_sec": data.get("audio_end_sec", 1220),
                "audio_transkript": data.get("audio_transkript"),
                "inhalt": data.get("inhalt", {}),
                "aktiv": True
            }).execute()
            print(f"   [OK] Hören 4 kaydedildi! ID: {res.data[0]['id']}")
            time.sleep(2)

        # E) SCHREIBEN AUFGABE 2 (Forumsbeitrag Sayfa 25: Thema A & B)
        if ('schreiben', 2) not in existing_set:
            print("\n[+] Schreiben Aufgabe 2 (Forumsbeitrag Sayfa 25) cikariliyor...")
            prompt_schreiben_2 = """Du bist ein präziser Datenstrukturierer für telc B2 Beruf.
Analysiere Seite 25 (Schreiben, Aufgabe 58, Forumsbeitrag: Thema A 'Firmenhandy für alle' und Thema B 'Kleiderordnung').
Erstelle das strukturierte JSON:
{
  "aufgabe_typ": "forumsbeitrag",
  "thema": "Forumsbeitrag: Firmenhandy oder Kleiderordnung",
  "punkte_max": 60,
  "inhalt": {
    "anweisung": "Wählen Sie eines der folgenden Themen. In Ihrer Firma können sich alle Mitarbeiterinnen und Mitarbeiter in einem Forum miteinander über Neuigkeiten austauschen. Schreiben Sie einen Forumsbeitrag zu Thema A oder B. Begründen Sie Ihre Meinung und nennen Sie passende Beispiele. Gliedern Sie Ihren Text in sinnvolle Abschnitte.",
    "situation": "In Ihrer Firma können sich alle Mitarbeiterinnen und Mitarbeiter in einem Forum austauschen.",
    "schreibanlass": "Schreiben Sie einen Forumsbeitrag zu Thema A oder B.",
    "inhaltspunkte": [
      "Ihre persönliche Meinung zum Thema darlegen",
      "Argumente dafür und dagegen anführen",
      "Erfahrungen oder konkrete Beispiele aus Ihrem Berufsalltag nennen",
      "Einen konstruktiven Vorschlag oder Kompromiss formulieren"
    ],
    "hilfsmittel": [
      "Thema A: 'Firmenhandy für alle' - Alle sollen ein Firmenhandy bekommen (auch abends/am Wochenende erreichbar, private Nutzung erlaubt).",
      "Thema B: 'Kleiderordnung' - Einheitliche Kleidung für alle Mitarbeiter, Reinigungskosten trägt jeder privat."
    ],
    "mindestwoerter": 150,
    "bewertungskriterien": {
      "inhalt": "Aufgabenbewältigung (0-20)",
      "kommunikative_gestaltung": "Textaufbau, Kohärenz, Register (0-20)",
      "formale_richtigkeit": "Grammatik, Orthographie, Wortschatz (0-20)"
    }
  }
}
NUR valides JSON zurückgeben."""
            data = call_gemini_with_retry(uploaded_file, prompt_schreiben_2)
            res = supabase.table("b2_questions").insert({
                "modul": "schreiben",
                "aufgabe": 2,
                "aufgabe_typ": data.get("aufgabe_typ", "forumsbeitrag"),
                "thema": data.get("thema", "Forumsbeitrag"),
                "punkte_max": 60,
                "inhalt": data.get("inhalt", {}),
                "aktiv": True
            }).execute()
            print(f"   [OK] Schreiben 2 kaydedildi! ID: {res.data[0]['id']}")
            time.sleep(2)

    finally:
        try:
            client.files.delete(name=uploaded_file.name)
            print("Gemini dosya temizligi yapildi.")
        except Exception:
            pass

# ==========================================
# 4. PDF 2: 200 Sayfalık Sınav Arşivi
# ==========================================
def extract_archive_variants():
    pdf_path = "public/dokument/Alle Information от 02.09.26.pdf"
    if not os.path.exists(pdf_path):
        print(f"Dosya bulunamadi: {pdf_path}")
        return

    print(f"\n========================================================")
    print(f"2. ADIM: {os.path.basename(pdf_path)} - Sinav Varyantlari")
    print(f"========================================================")

    print("Arsiv PDF Gemini'ye yukleniyor (bu biraz surebilir)...")
    uploaded_file = client.files.upload(file=pdf_path, config={'display_name': "Telc B2 Alle Informationen"})
    print(f"Yuklendi: {uploaded_file.uri}")

    try:
        # Mevcut aufgabe numaralarını kontrol edelim
        existing = supabase.table("b2_questions").select("modul, aufgabe").execute().data
        schreiben_max = max([r['aufgabe'] for r in existing if r['modul'] == 'schreiben'] or [0])
        sprechen_max = max([r['aufgabe'] for r in existing if r['modul'] == 'sprechen'] or [0])
        
        # 1. Beschwerde Varyantları (Sayfa 74-77)
        print("\n[+] Arsivden Beschwerde Gorevleri (Schreiben) cikariliyor...")
        prompt_beschwerde = """Du bist ein Datenstrukturierer für telc B2 Beruf Prüfungen.
Analysiere die Seiten 74 bis 77 dieses Dokuments ('Lesen und Schreiben Beschwerde').
Extrahiere 2 verschiedene authentische Beschwerde-Prüfungsaufgaben als JSON-Array:
[
  {
    "aufgabe_typ": "beschwerde",
    "thema": "<Titel/Thema z.B. Beschwerde über fehlerhafte Lieferung oder schlechten Service>",
    "punkte_max": 60,
    "inhalt": {
      "anweisung": "<Aufgabenstellung wortgetreu>",
      "situation": "<Situation>",
      "schreibanlass": "<Schreibanlass>",
      "inhaltspunkte": ["<Punkt 1>", "<Punkt 2>", "<Punkt 3>", "<Punkt 4>"],
      "mindestwoerter": 150,
      "bewertungskriterien": {
        "inhalt": "Aufgabenbewältigung (0-20)",
        "kommunikative_gestaltung": "Textaufbau, Form (0-20)",
        "formale_richtigkeit": "Grammatik, Orthographie (0-20)"
      }
    }
  }
]
NUR valides JSON-Array zurückgeben."""
        beschwerde_list = call_gemini_with_retry(uploaded_file, prompt_beschwerde)
        for item in beschwerde_list:
            schreiben_max += 1
            res = supabase.table("b2_questions").insert({
                "modul": "schreiben",
                "aufgabe": schreiben_max,
                "aufgabe_typ": item.get("aufgabe_typ", "beschwerde"),
                "thema": item.get("thema", f"Beschwerde {schreiben_max}"),
                "punkte_max": 60,
                "inhalt": item.get("inhalt", {}),
                "aktiv": True
            }).execute()
            print(f"   [OK] Schreiben {schreiben_max} ({item.get('thema')}) kaydedildi!")
            time.sleep(2)

        # 2. Sprechen Durum Senaryoları (Sayfa 186-197)
        print("\n[+] Arsivden Otantik Sprechen Durumlari (Sprechen Teil 2) cikariliyor...")
        prompt_sprechen = """Du bist ein Datenstrukturierer für telc B2 Beruf Prüfungen.
Analysiere die Seiten 186 bis 197 dieses Dokuments ('Mündliche Prüfung - Situationen').
Extrahiere 3 verschiedene authentische Prüfungssituationen für Sprechen Teil 2 (Mit Kolleginnen und Kollegen sprechen / ein Problem lösen) als JSON-Array:
[
  {
    "aufgabe_typ": "gespraech",
    "thema": "<Titel z.B. Problem mit dem Kühlraum oder Beschwerde im Hotel>",
    "punkte_max": 60,
    "inhalt": {
      "anweisung": "Sie arbeiten zusammen in einem Betrieb. Diskutieren Sie mit Ihrer Kollegin / Ihrem Kollegen das Problem und finden Sie gemeinsam eine Lösung.",
      "thema_karte": "<Beschreibung der Situation wortgetreu>",
      "vorbereitungszeit_min": 10,
      "sprechzeit_min": 3,
      "leitfragen": [
        "Was ist das genaue Problem?",
        "Welche Sofortmaßnahmen sind nötig?",
        "Welche längerfristige Lösung schlagen Sie vor?",
        "Wer übernimmt welche Aufgaben?"
      ],
      "bewertungskriterien": {
        "aufgabenerledigung": "Erfüllung der Aufgabenstellung (0-20)",
        "interaktion": "Interaktion und Gesprächsführung (0-20)",
        "sprache": "Ausdruck und Korrektheit (0-20)"
      }
    }
  }
]
NUR valides JSON-Array zurückgeben."""
        sprechen_list = call_gemini_with_retry(uploaded_file, prompt_sprechen)
        for item in sprechen_list:
            sprechen_max += 1
            res = supabase.table("b2_questions").insert({
                "modul": "sprechen",
                "aufgabe": sprechen_max,
                "aufgabe_typ": item.get("aufgabe_typ", "gespraech"),
                "thema": item.get("thema", f"Sprechsituation {sprechen_max}"),
                "punkte_max": 60,
                "inhalt": item.get("inhalt", {}),
                "aktiv": True
            }).execute()
            print(f"   [OK] Sprechen {sprechen_max} ({item.get('thema')}) kaydedildi!")
            time.sleep(2)

    finally:
        try:
            client.files.delete(name=uploaded_file.name)
            print("Arsiv PDF temizligi yapildi.")
        except Exception:
            pass

def main():
    print("=" * 60)
    print("TELC B2 BERUF - GOOGLE AI STUDIO VERI AKTARIMI (TEMPERATURE: 0)")
    print("=" * 60)
    extract_test1_remaining()
    extract_archive_variants()
    print("\n[OK] TUM VERILER BASARIYLA SUPABASE VERITABANINA AKTARILDI!")

if __name__ == "__main__":
    main()
