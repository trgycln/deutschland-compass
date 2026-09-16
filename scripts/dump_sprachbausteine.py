import fitz

doc = fitz.open('public/dokument/Alle Information от 02.09.26.pdf')

with open('scripts/sprachbausteine_dump.txt', 'w', encoding='utf-8') as f:
    for page_idx in range(79, 87):
        f.write(f"\n==================== PAGE {page_idx + 1} (idx {page_idx}) ====================\n")
        f.write(doc[page_idx].get_text('text'))

print("Pages 80-87 written to scripts/sprachbausteine_dump.txt")
