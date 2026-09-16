import fitz

doc = fitz.open('public/dokument/Alle Information от 02.09.26.pdf')

with open('scripts/sprechen_teil1_3_dump.txt', 'w', encoding='utf-8') as f:
    for page_idx in range(194, 207):
        f.write(f"\n==================== PAGE {page_idx + 1} (idx {page_idx}) ====================\n")
        f.write(doc[page_idx].get_text('text'))

print("Sprechen Teil 1 & 3 written to scripts/sprechen_teil1_3_dump.txt")
