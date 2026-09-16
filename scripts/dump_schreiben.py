import fitz

doc = fitz.open('public/dokument/Alle Information от 02.09.26.pdf')

with open('scripts/schreiben_dump.txt', 'w', encoding='utf-8') as f:
    for page_idx in range(65, 78):
        f.write(f"\n==================== BESCHWERDE PAGE {page_idx + 1} (idx {page_idx}) ====================\n")
        f.write(doc[page_idx].get_text('text'))

    for page_idx in range(97, 108):
        f.write(f"\n==================== FORUMSBEITRAG PAGE {page_idx + 1} (idx {page_idx}) ====================\n")
        f.write(doc[page_idx].get_text('text'))

print("Schreiben pages dumped to scripts/schreiben_dump.txt")
