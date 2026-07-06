import json
from graphify.detect import detect
from pathlib import Path

target = Path('C:/hrgit/pve-client')
result = detect(target)
print(json.dumps(result, ensure_ascii=False))
