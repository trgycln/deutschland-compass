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

def run_step_hoeren_4():
    print("--------------------------------------------------")
    print("[ADIM 1] Hören Aufgabe 4 (Telefonische Mitteilungen) İşleniyor...")
    print("--------------------------------------------------")

    # DB kontrolü
    existing = supabase.table("b2_questions").select("id").eq("modul", "hoeren").eq("aufgabe", 4).execute()
    if existing.data:
        print("[!] Hören Aufgabe 4 zaten veritabanında mevcut. ID:", existing.data[0]['id'])
        return

    doc = fitz.open("public/dokument/1011431_20220708_5015-b00-010102_web.pdf")
    p21_text = doc[20].get_text() # Sayfa 21 (Sorular 36-40)
    p53_text = doc[52].get_text() # Sayfa 53 (Transkript)

    print("[*] PDF'den sayfa 21 ve 53 metinleri okundu.")
    print("[*] Google AI Studio (Gemini - temperature: 0) çağrılıyor...")

    prompt = f"""Du bist ein telc B2 Prüfungsstrukturierer.
Hier sind die Seiten aus der Prüfung:
Aufgabenblatt:
{p21_text}

Hörtext Transkript:
{p53_text}

Offizielle Lösungen:
36 a, 37 a, 38 c, 39 b, 40 b

Strukturiere diese Höraufgabe 4 exakt als JSON:
{{
  "aufgabe_typ": "multiple_choice",
  "thema": "Telefonische Mitteilungen",
  "punkte_max": 15,
  "audio_start_sec": 920,
  "audio_end_sec": 1220,
  "audio_transkript": {json.dumps(p53_text)},
  "inhalt": {{
    "anweisung": "Sie hören fünf telefonische Mitteilungen. Zu jeder Mitteilung gibt es eine Aufgabe. Welche Lösung (a, b oder c) passt am besten? Markieren Sie Ihre Lösungen für die Aufgaben 36–40 auf dem Antwortbogen. Sie hören jede Mitteilung einmal.",
    "fragen": [
      {{ "nummer": 36, "frage": "Annie", "optionen": ["a) braucht einen Laptop vom Hotel.", "b) hat die Unterlagen ins Internet gestellt.", "c) hat ihren Laptop im Hotel vergessen."], "korrekt": "a" }},
      {{ "nummer": 37, "frage": "Julian", "optionen": ["a) meldet sich für das Wochenende krank.", "b) muss in der kommenden Woche zum Arzt.", "c) soll am Wochenende einen Kollegen vertreten."], "korrekt": "a" }},
      {{ "nummer": 38, "frage": "Jessica Maler", "optionen": ["a) bittet um Bezahlung der Rechnung.", "b) liefert nur einmal im Quartal Papier.", "c) schickt die Rechnung nach."], "korrekt": "c" }},
      {{ "nummer": 39, "frage": "Petra", "optionen": ["a) hat einen Partyraum beim Italiener reserviert.", "b) schlägt vor, im Steakhaus zu feiern.", "c) verschiebt die Feier auf Januar."], "korrekt": "b" }},
      {{ "nummer": 40, "frage": "Michael will, dass die Mitarbeiter", "optionen": ["a) alle Probleme bis morgen lösen.", "b) die Reparaturen zeitnah durchführen.", "c) sich melden, wenn die Qualitätskontrolle kommt."], "korrekt": "b" }}
    ]
  }}
}}
NUR valides JSON zurückgeben."""

    response = client.models.generate_content(
        model='gemini-3.6-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.0,
            response_mime_type="application/json",
        ),
    )

    result_json = json.loads(response.text.strip())
    print("[*] Gemini'den JSON yanıtı alındı. Supabase'e kaydediliyor...")

    payload = {
        "modul": "hoeren",
        "aufgabe": 4,
        "aufgabe_typ": result_json.get("aufgabe_typ", "multiple_choice"),
        "thema": result_json.get("thema", "Telefonische Mitteilungen"),
        "punkte_max": 15,
        "audio_start_sec": 920,
        "audio_end_sec": 1220,
        "audio_transkript": result_json.get("audio_transkript"),
        "inhalt": result_json.get("inhalt", {}),
        "aktiv": True
    }

    res = supabase.table("b2_questions").insert(payload).execute()
    new_id = res.data[0]['id']
    print(f"[✓ BAŞARILI] Hören Aufgabe 4 başarıyla Supabase'e eklendi! (Kayıt ID: {new_id})")
    
    print("[*] 5 saniye bekleme süresi uygulanıyor...")
    time.sleep(5)
    print("[✓] Bekleme tamamlandı.")

if __name__ == "__main__":
    run_step_hoeren_4()
