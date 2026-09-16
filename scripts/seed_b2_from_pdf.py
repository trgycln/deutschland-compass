import os
import json
import time
from dotenv import load_dotenv
from google import genai
from google.genai import types
from supabase import create_client, Client

# ==========================================
# 1. Ortam Değişkenlerini Yükle
# ==========================================
load_dotenv('.env.local')

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") # Service role key for admin insert
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY]):
    print("HATA: .env.local dosyasındaki Supabase veya Gemini keyleri eksik.")
    exit(1)

# Yeni google-genai kütüphanesi başlatımı
client = genai.Client(api_key=GEMINI_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ==========================================
# 2. Schema Tanımlamaları
# ==========================================
def get_prompt_for_modul(modul: str, aufgabe: int) -> str:
    base = f"""Du bist ein präziser Datenstrukturierer für telc Deutsch-Test für den Beruf B2 Prüfungsunterlagen.
WICHTIG: Analysiere das hochgeladene PDF-Dokument (telc B2 Test).
Extrahiere NUR die Aufgabe {aufgabe} für das Modul '{modul.upper()}'.
Kopiere den Text WORTGETREU aus dem PDF. Verändere NICHTS am Originaltext.
Gib NUR das strukturierte JSON-Objekt zurück, ohne Markdown-Formatierung (kein ```json ... ```), nur den nackten JSON-String.
"""

    if modul == "lesen":
        return base + """
Strukturiere diese Leseaufgabe als JSON:
{
  "aufgabe_typ": "multiple_choice" oder "zuordnung" oder "lueckentext",
  "thema": "<Thema des Textes>",
  "punkte_max": <Punktzahl>,
  "inhalt": {
    "anweisung": "<Aufgabenanweisung wortgetreu>",
    "text": "<Lesetext wortgetreu>",
    "fragen": [
      {
        "nummer": 1,
        "frage": "<Fragetext oder Aussage wortgetreu>",
        "optionen": ["a) ...", "b) ...", "c) ..."],
        "korrekt": "a",
        "erklaerung": ""
      }
    ]
  }
}"""
    elif modul == "hoeren":
        return base + """
Strukturiere diese Höraufgabe als JSON:
{
  "aufgabe_typ": "multiple_choice" oder "zuordnung" oder "richtig_falsch",
  "thema": "<Thema>",
  "punkte_max": <Punktzahl>,
  "audio_start_sec": 0,
  "audio_end_sec": 0,
  "audio_transkript": "<Lass dies vorerst leer>",
  "inhalt": {
    "anweisung": "<Aufgabenanweisung>",
    "fragen": [
      {
        "nummer": 1,
        "aussage": "<Aussage oder Frage>",
        "optionen": ["a) ...", "b) ...", "c) ..."],
        "korrekt": "a"
      }
    ]
  }
}"""
    elif modul == "schreiben":
        return base + """
Strukturiere diese Schreibaufgabe als JSON:
{
  "aufgabe_typ": "beschwerde" oder "forumsbeitrag" oder "email" oder "bericht",
  "thema": "<Thema>",
  "punkte_max": 60,
  "inhalt": {
    "anweisung": "<vollständige Aufgabenanweisung wortgetreu>",
    "situation": "<Situationsbeschreibung>",
    "schreibanlass": "<Was soll geschrieben werden>",
    "inhaltspunkte": ["<Punkt 1>", "<Punkt 2>", "<Punkt 3>"],
    "hilfsmittel": ["<Hilfsmittel falls vorhanden>"],
    "mindestwoerter": 150,
    "bewertungskriterien": {
      "inhalt": "Aufgabenbewältigung",
      "kommunikative_gestaltung": "Textaufbau",
      "formale_richtigkeit": "Grammatik"
    }
  }
}"""
    elif modul == "sprechen":
        return base + """
Strukturiere diese Sprechaufgabe als JSON:
{
  "aufgabe_typ": "praesentation" oder "gespraech" oder "situation",
  "thema": "<Thema>",
  "punkte_max": 60,
  "inhalt": {
    "anweisung": "<Aufgabenanweisung wortgetreu>",
    "thema_karte": "<Text der Themenkarte wortgetreu>",
    "vorbereitungszeit_min": 15,
    "sprechzeit_min": 3,
    "leitfragen": ["<Frage 1>", "<Frage 2>", "<Frage 3>"],
    "bewertungskriterien": {
      "aufgabenerledigung": "Erfüllung",
      "kohärenz": "Flüssigkeit",
      "ausdruck": "Wortschatz",
      "korrektheit": "Grammatik"
    }
  }
}"""
    return base


def main():
    pdf_path = "public/dokument/1011431_20220708_5015-b00-010102_web.pdf"
    print(f"[{time.strftime('%H:%M:%S')}] PDF dosyasi Gemini'ye yukleniyor: {pdf_path}")
    
    # Yeni SDK ile dosya yükleme
    uploaded_file = client.files.upload(file=pdf_path, config={'display_name': "Telc B2 Test"})
    print(f"[{time.strftime('%H:%M:%S')}] Dosya yuklendi! URI: {uploaded_file.uri}")

    tasks_to_extract = [
        ("lesen", 1), ("lesen", 2), ("lesen", 3), ("lesen", 4),
        ("hoeren", 1), ("hoeren", 2), ("hoeren", 3), ("hoeren", 4),
        ("schreiben", 1),
        ("sprechen", 1), ("sprechen", 2)
    ]

    for modul, aufgabe in tasks_to_extract:
        print(f"\n[{time.strftime('%H:%M:%S')}] Modul: {modul.upper()}, Aufgabe: {aufgabe} isleniyor...")
        prompt = get_prompt_for_modul(modul, aufgabe)
        
        try:
            # Yeni SDK ile içerik üretme
            response = client.models.generate_content(
                model='gemini-3.6-flash',
                contents=[uploaded_file, prompt],
                config=types.GenerateContentConfig(
                    temperature=0.0,
                    response_mime_type="application/json",
                ),
            )
            
            result_text = response.text.strip()
            
            # Clean up markdown if model didn't obey
            if result_text.startswith("```json"):
                result_text = result_text[7:-3].strip()
            
            # Parse JSON
            parsed_data = json.loads(result_text)
            
            # Prepare Supabase payload
            payload = {
                "modul": modul,
                "aufgabe": aufgabe,
                "aufgabe_typ": parsed_data.get("aufgabe_typ", "unknown"),
                "thema": parsed_data.get("thema", f"Aufgabe {aufgabe}"),
                "punkte_max": parsed_data.get("punkte_max", 5),
                "inhalt": parsed_data.get("inhalt", {}),
                "audio_start_sec": parsed_data.get("audio_start_sec"),
                "audio_end_sec": parsed_data.get("audio_end_sec"),
                "audio_transkript": parsed_data.get("audio_transkript"),
                "aktiv": True
            }
            
            # Insert into Supabase
            res = supabase.table("b2_questions").insert(payload).execute()
            print(f"[{time.strftime('%H:%M:%S')}] [+] Basariyla Supabase'e kaydedildi. ID: {res.data[0]['id']}")
            
            # Sleep slightly to avoid rate limits
            time.sleep(2)
            
        except Exception as e:
            print(f"[{time.strftime('%H:%M:%S')}] [-] HATA Modul {modul} Aufgabe {aufgabe}: {str(e)}")
            
    print(f"\n[{time.strftime('%H:%M:%S')}] Tum tohumlama islemi tamamlandi!")
    
    # Cleanup file from Gemini
    client.files.delete(name=uploaded_file.name)
    print(f"[{time.strftime('%H:%M:%S')}] PDF dosyasi Gemini sunucularindan silindi.")

if __name__ == "__main__":
    main()
