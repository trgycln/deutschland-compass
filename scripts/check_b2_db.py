import os
import json
import sys
from dotenv import load_dotenv
from supabase import create_client

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv('.env.local')
sb = create_client(os.getenv('NEXT_PUBLIC_SUPABASE_URL'), os.getenv('SUPABASE_SERVICE_ROLE_KEY'))
res = sb.table('b2_questions').select('id, modul, aufgabe, aufgabe_typ, thema').execute()

print(f"Toplam Soru Sayisi: {len(res.data)}")
for r in sorted(res.data, key=lambda x: (x['modul'], x['aufgabe'])):
    print(f"[{r['modul'].upper():<9}] Aufgabe {r['aufgabe']} ({r['aufgabe_typ']}): {r['thema']}")
