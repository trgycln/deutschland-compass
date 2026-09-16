import fitz

doc = fitz.open('public/dokument/Alle Information от 02.09.26.pdf')

with open('scripts/lesen3_dump.txt', 'w', encoding='utf-8') as f:
    for page_idx in range(31, 45):
        f.write(f"\n==================== PAGE {page_idx + 1} (idx {page_idx}) ====================\n")
        f.write(doc[page_idx].get_text('text'))

print("Pages 32-45 written to scripts/lesen3_dump.txt")
