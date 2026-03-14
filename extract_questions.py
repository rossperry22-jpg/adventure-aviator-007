#!/usr/bin/env python3
import re
import json

with open('scripts/questions.js', 'r') as f:
    lines = f.readlines()

objects = []
current = []
in_object = False
for line in lines:
    stripped = line.strip()
    # Detect start of object: either '{' or line starting with 'id:'
    if stripped.startswith('{') or (stripped.startswith('id:') and not in_object):
        if in_object:
            # finish previous object
            obj_text = ''.join(current)
            objects.append(obj_text)
            current = []
        in_object = True
        # If the line starts with '{', include it; otherwise we need to add '{'
        if stripped.startswith('{'):
            current.append(line)
        else:
            # missing opening brace, add one
            current.append('{\n')
            current.append(line)
        continue
    if in_object:
        current.append(line)
        if stripped == '},' or stripped == '}':
            # end of object
            obj_text = ''.join(current)
            objects.append(obj_text)
            current = []
            in_object = False

# Process any remaining
if current:
    obj_text = ''.join(current)
    objects.append(obj_text)

print(f"Found {len(objects)} objects")

# Now parse each object into dict
questions = []
for obj in objects:
    # Convert to JSON-like string
    # Replace unquoted keys with quoted keys
    s = re.sub(r'(\w+):', r'"\1":', obj)
    # Remove trailing commas before }
    s = re.sub(r',\s*}', '}', s)
    s = re.sub(r',\s*]', ']', s)
    # Ensure all strings are double quoted (they already are)
    # Evaluate using json.loads
    try:
        q = json.loads(s)
        questions.append(q)
    except json.JSONDecodeError as e:
        print("Failed to parse:", s[:200])
        print(e)
        # Try fixing by adding missing commas? Not now.

print(f"Parsed {len(questions)} questions")

# Output as JSON
with open('existing_parsed.json', 'w') as f:
    json.dump(questions, f, indent=2)

# Print module counts
counts = {}
for q in questions:
    m = q['module']
    counts[m] = counts.get(m, 0) + 1
print("Counts per module:", counts)