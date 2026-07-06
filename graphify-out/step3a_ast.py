import json
from graphify.extract import collect_files, extract
from pathlib import Path

code_files = []
detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8'))
for f in detect.get('files', {}).get('code', []):
    p = Path(f)
    code_files.extend(collect_files(p) if p.is_dir() else [p])

print('Code files collected: %d' % len(code_files))

if code_files:
    result = extract(code_files, cache_root=Path('C:/hrgit/pve-client'), parallel=False)
    out_path = Path('graphify-out/.graphify_ast.json')
    out_path.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8')
    nc = len(result['nodes'])
    ec = len(result['edges'])
    print('AST: %d nodes, %d edges' % (nc, ec))
else:
    print('No code files found')
