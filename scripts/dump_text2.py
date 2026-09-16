import fitz

doc = fitz.open('public/dokument/Alle Information от 02.09.26.pdf')

with open('scripts/lesen2_text2_dump.txt', 'w', encoding='utf-8') as f:
    for page_idx in range(26, 32):
        f.write(f"\n==================== PAGE {page_idx + 1} (idx {page_idx}) ====================\n")
        f.write(doc[page_idx].get_text('text'))

print("Pages 27-32 written to scripts/lesen2_text2_dump.txt")
