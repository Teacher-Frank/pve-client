import json
from graphify.detect import detect
from pathlib import Path

result = detect(Path('C:/hrgit/pve-client'))
Path('graphify-out/.graphify_detect.json').write_text(json.dumps(result, ensure_ascii=False), encoding='utf-8')

files = result['files']
total = result.get('total_files', 0)
words = result.get('total_words', 0)

print('Corpus: %d files · ~%d words' % (total, words))
for cat in ['code', 'document', 'paper', 'image', 'video']:
    flist = files.get(cat, [])
    if flist:
        print('  %s:     %d files' % (cat, len(flist)))
