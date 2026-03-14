#!/usr/bin/env python3
import re
import json

with open('scripts/questions.js', 'r') as f:
    content = f.read()

# Since the file is a JavaScript array of objects, we can try to split by '},'
# But careful with nested braces.
# Simple approach: find each occurrence of '{' and track matching '}'
objects = []
i = 0
while i < len(content):
    if content[i] == '{':
        start = i
        brace_count = 0
        while i < len(content):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    obj_str = content[start:i+1]
                    objects.append(obj_str)
                    break
            i += 1
    i += 1

print(f"Found {len(objects)} objects")
# Convert to dict using json.loads after fixing syntax
questions = []
for obj_str in objects:
    # Replace single quotes with double quotes? Actually the strings use double quotes.
    # Ensure keys are quoted (they are not in JS object literal).
    # Let's use a simple regex to add quotes around keys.
    # Pattern: (\w+):
    fixed = re.sub(r'(\w+):', r'"\1":', obj_str)
    # Also need to handle trailing commas
    fixed = re.sub(r',\s*}', '}', fixed)
    fixed = re.sub(r',\s*]', ']', fixed)
    try:
        q = json.loads(fixed)
        questions.append(q)
    except json.JSONDecodeError as e:
        print("Failed to parse:", obj_str[:100])
        print(e)
        # Try another approach: use eval with safe context? Not safe.
        pass

print(f"Parsed {len(questions)} questions")
for q in questions[:3]:
    print(json.dumps(q, indent=2))
    print("---")

# Group by module
by_module = {}
for q in questions:
    m = q['module']
    by_module.setdefault(m, []).append(q)

for m, lst in by_module.items():
    print(f"Module {m}: {len(lst)} questions")