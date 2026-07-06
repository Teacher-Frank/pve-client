import json
from pathlib import Path

result = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8'))
files = result['files']
total = result.get('total_files', 0)
words = result.get('total_words', 0)

cats = []
code = files.get('code', [])
if code:
    cats.append('  code:     %d files' % len(code))
docs = files.get('document', [])
if docs:
    cats.append('  docs:     %d files' % len(docs))
papers = files.get('paper', [])
if papers:
    cats.append('  papers:   %d files' % len(papers))
images = files.get('image', [])
if images:
    cats.append('  images:   %d files' % len(images))
videos = files.get('video', [])
if videos:
    cats.append('  video:    %d files' % len(videos))

print('Corpus: %d files · ~%s words' % (total, '{:,}'.format(words)))
print('\n'.join(cats))
