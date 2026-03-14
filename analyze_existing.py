#!/usr/bin/env python3
import json
from collections import defaultdict

with open('existing_parsed_final.json', 'r') as f:
    existing = json.load(f)

mod_categories = defaultdict(set)
mod_tags = defaultdict(set)
for q in existing:
    mod = q['module']
    mod_categories[mod].add(q['category'])
    for tag in q['tags']:
        mod_tags[mod].add(tag)

for mod in sorted(mod_categories.keys()):
    print(f"Module {mod}:")
    print("  Categories:", sorted(mod_categories[mod]))
    print("  Tags:", sorted(mod_tags[mod]))
    print()