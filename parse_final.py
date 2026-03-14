#!/usr/bin/env python3
import re
import json

with open('scripts/questions.js', 'r') as f:
    content = f.read()

# Find array between '[' and '];'
start = content.find('[')
end = content.rfind('];')
if start == -1 or end == -1:
    print("Array not found")
    exit(1)
array_content = content[start+1:end]

# Split by '},' but careful about nested braces
# Simple approach: iterate and count braces
objects = []
i = 0
while i < len(array_content):
    if array_content[i] == '{' or (array_content[i:i+3] == 'id:' and (i==0 or array_content[i-1].isspace())):
        # start of object
        start_idx = i
        brace_count = 0
        while i < len(array_content):
            if array_content[i] == '{':
                brace_count += 1
            elif array_content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    # maybe followed by comma
                    end_idx = i+1
                    # consume optional comma
                    if i+1 < len(array_content) and array_content[i+1] == ',':
                        end_idx += 1
                    obj_str = array_content[start_idx:end_idx]
                    objects.append(obj_str)
                    i = end_idx
                    break
            i += 1
    else:
        i += 1

print(f"Found {len(objects)} objects")

questions = []
for obj in objects:
    # Ensure starts with {
    if not obj.strip().startswith('{'):
        obj = '{' + obj
    # Ensure ends with }
    if not obj.strip().endswith('}'):
        obj = obj + '}'
    # Replace unquoted keys
    s = re.sub(r'(\w+):', r'"\1":', obj)
    # Remove trailing commas before }
    s = re.sub(r',\s*}', '}', s)
    s = re.sub(r',\s*]', ']', s)
    # Fix missing quotes in option strings? They already have double quotes.
    try:
        q = json.loads(s)
        questions.append(q)
    except json.JSONDecodeError as e:
        print("Failed to parse:", s[:200])
        # Try manual parsing
        # Extract fields with regex
        pass

print(f"Parsed {len(questions)} questions")

# Output as JSON
with open('existing_questions_fixed.json', 'w') as f:
    json.dump(questions, f, indent=2)

# Count per module
from collections import Counter
cnt = Counter(q['module'] for q in questions)
print("Per module:", dict(cnt))

# Print IDs
ids = [q['id'] for q in questions]
print("IDs:", sorted(ids))