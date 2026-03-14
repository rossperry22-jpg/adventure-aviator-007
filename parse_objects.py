#!/usr/bin/env python3
import re
import json

with open('objects.txt', 'r') as f:
    content = f.read()

blocks = content.split('--- OBJECT')
questions = []
for block in blocks[1:]:  # skip first empty
    # Extract id
    id_match = re.search(r'id:\s*(\d+)', block)
    if not id_match:
        continue
    qid = int(id_match.group(1))
    module_match = re.search(r'module:\s*"(\d+)"', block)
    module = module_match.group(1) if module_match else ""
    question_match = re.search(r'question:\s*"([^"]+)"', block)
    question_text = question_match.group(1) if question_match else ""
    # options: between options: [ and ]
    # simple extract lines starting with "
    options = []
    in_options = False
    for line in block.split('\n'):
        stripped = line.strip()
        if 'options: [' in line:
            in_options = True
            continue
        if in_options and stripped.startswith('"'):
            # remove trailing comma and quotes
            opt = re.sub(r'^"(.*)",?$', r'\1', stripped)
            options.append(opt)
        if in_options and ']' in line:
            in_options = False
    # correct
    correct_match = re.search(r'correct:\s*(\d+)', block)
    correct = int(correct_match.group(1)) if correct_match else 0
    # explanation
    expl_match = re.search(r'explanation:\s*"([^"]+)"', block)
    explanation = expl_match.group(1) if expl_match else ""
    # category
    cat_match = re.search(r'category:\s*"([^"]+)"', block)
    category = cat_match.group(1) if cat_match else ""
    # difficulty
    diff_match = re.search(r'difficulty:\s*"([^"]+)"', block)
    difficulty = diff_match.group(1) if diff_match else ""
    # faaReference
    faa_match = re.search(r'faaReference:\s*"([^"]+)"', block)
    faaReference = faa_match.group(1) if faa_match else ""
    # tags
    tags = []
    tags_match = re.search(r'tags:\s*\[([^\]]+)\]', block)
    if tags_match:
        tags_str = tags_match.group(1)
        # split by commas, strip quotes
        tags = [t.strip().strip('"') for t in tags_str.split(',')]
    
    questions.append({
        "id": qid,
        "module": module,
        "question": question_text,
        "options": options,
        "correct": correct,
        "explanation": explanation,
        "category": category,
        "difficulty": difficulty,
        "faaReference": faaReference,
        "tags": tags
    })

print(f"Parsed {len(questions)} questions")
# Output JSON
with open('existing_parsed_final.json', 'w') as f:
    json.dump(questions, f, indent=2)

# Print per module counts
from collections import Counter
cnt = Counter(q['module'] for q in questions)
print("Per module:", dict(cnt))