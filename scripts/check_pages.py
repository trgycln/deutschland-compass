import fitz

doc = fitz.open('public/dokument/Alle Information от 02.09.26.pdf')

with open('scripts/lesen_overview.txt', 'w', encoding='utf-8') as f:
    for page_idx in range(25, 45):
        txt = doc[page_idx].get_text('text')
        first_lines = "\n".join([line for line in txt.split('\n') if line.strip()][:4])
        f.write(f"Page {page_idx + 1}:\n{first_lines}\n---\n")

print("Written overview of pages 26-45")
