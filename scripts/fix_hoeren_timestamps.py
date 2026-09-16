import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv('.env.local')
url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(url, key)

res = supabase.table('b2_questions').update({
    'audio_start_sec': 385,
    'audio_end_sec': 650
}).eq('modul', 'hoeren').eq('aufgabe', 2).execute()

print(f"Updated {len(res.data)} rows for Hoeren Aufgabe 2.")
for row in res.data:
    print(f"Aufgabe {row['aufgabe']}: {row['audio_start_sec']}s - {row['audio_end_sec']}s")
