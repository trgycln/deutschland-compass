import fitz

doc = fitz.open('public/dokument/Alle Information от 02.09.26.pdf')

with open('scripts/sprechen_dump.txt', 'w', encoding='utf-8') as f:
    for page_idx in range(179, 195):
        f.write(f"\n==================== SPRECHEN PAGE {page_idx + 1} (idx {page_idx}) ====================\n")
        f.write(doc[page_idx].get_text('text'))

print("Sprechen pages written to scripts/sprechen_dump.txt")
