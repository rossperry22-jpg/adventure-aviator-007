#!/usr/bin/env python3
import json
import random

# Existing questions (from questions.js) - we'll parse later, but for now placeholder
existing_questions = []

# Modules mapping
modules = {
    "00": "The Briefing Room",
    "01": "Control Comes First",
    "02": "Angle of Attack Is Everything",
    "03": "Energy Management",
    "04": "The Air You're Flying Through",
    "05": "Navigation Is Planning",
    "06": "Legal & Human Side",
    "07": "Thinking Like a Pilot"
}

# Categories per module (based on typical content)
module_categories = {
    "00": ["Aircraft Systems", "Flight Controls", "Regulations", "Risk Management", "Preflight Planning"],
    "01": ["Primary Controls", "Secondary Controls", "Aerodynamics", "Stability", "Control Surfaces"],
    "02": ["Lift and Drag", "Stall", "Angle of Attack", "Critical Angle", "Airflow"],
    "03": ["Energy Concepts", "Power Management", "Glide Performance", "Speed vs Altitude"],
    "04": ["Atmosphere", "Pressure", "Temperature", "Humidity", "Clouds", "Fronts", "Turbulence", "Icing"],
    "05": ["Dead Reckoning", "Charts", "VOR", "GPS", "Flight Planning", "Airspace", "NOTAMs"],
    "06": ["Regulations", "Medical", "Currency", "Human Factors", "Hypoxia", "Situational Awareness", "Decision Making"],
    "07": ["ADM", "Risk Management", "Emergency Procedures", "Scenario Thinking"]
}

# Cognitive levels
cognitive_levels = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"]

# Difficulty levels
difficulties = ["Easy", "Medium", "Hard", "Expert"]

# FAA references
faa_refs = [
    "PHAK Ch. 1",
    "PHAK Ch. 2",
    "PHAK Ch. 3",
    "PHAK Ch. 4",
    "PHAK Ch. 5",
    "PHAK Ch. 6",
    "PHAK Ch. 7",
    "PHAK Ch. 8",
    "PHAK Ch. 9",
    "PHAK Ch. 10",
    "PHAK Ch. 11",
    "PHAK Ch. 12",
    "PHAK Ch. 13",
    "PHAK Ch. 14",
    "PHAK Ch. 15",
    "PHAK Ch. 16",
    "PHAK Ch. 17",
    "AFH Ch. 1",
    "AFH Ch. 2",
    "AFH Ch. 3",
    "AFH Ch. 4",
    "AFH Ch. 5",
    "AFH Ch. 6",
    "AFH Ch. 7",
    "AFH Ch. 8",
    "AIM Ch. 1",
    "AIM Ch. 2",
    "AIM Ch. 3",
    "AIM Ch. 4",
    "AIM Ch. 5",
    "AIM Ch. 6",
    "AIM Ch. 7",
    "FAR 61.3",
    "FAR 61.57",
    "FAR 91.3",
    "FAR 91.103",
    "FAR 91.155",
    "ACS Introduction",
    "ACS Private Pilot"
]

# Question templates per cognitive level
# Each template is a dict with fields: question, options, correct (index), explanation
# We'll generate variations by substituting placeholders.
# For simplicity, we'll create a list of base questions per category.

# Let's create a simple generator that uses a bank of question stems.
# We'll define a few stems per category.

# Since this is a mock, we'll generate generic questions.
# In reality, we'd have a more comprehensive bank.

def generate_question(qid, module, category):
    # Determine cognitive level and difficulty
    cognitive = random.choice(cognitive_levels)
    difficulty = random.choice(difficulties)
    # Build question text based on module and category
    # This is a simplistic placeholder; real generation would need more nuance.
    stems = [
        f"What is the definition of {category.lower()}?",
        f"How does {category.lower()} affect flight performance?",
        f"Which FAA regulation covers {category.lower()}?",
        f"What are the primary considerations for {category.lower()}?",
        f"Describe the relationship between {category.lower()} and safety.",
        f"Calculate the impact of {category.lower()} under given conditions.",
        f"Evaluate the risk associated with {category.lower()}.",
        f"Create a plan to address {category.lower()} issues."
    ]
    question = random.choice(stems)
    # Options
    options = [
        "Option A: Correct answer",
        "Option B: Incorrect",
        "Option C: Also incorrect",
        "Option D: Misleading"
    ]
    correct = 0
    explanation = f"This relates to {category} as covered in {random.choice(faa_refs)}."
    tags = [category, cognitive, difficulty]
    return {
        "id": qid,
        "module": module,
        "question": question,
        "options": options,
        "correct": correct,
        "explanation": explanation,
        "category": category,
        "difficulty": difficulty,
        "faaReference": random.choice(faa_refs),
        "tags": tags
    }

def main():
    # First, load existing questions (if any)
    # We'll parse the existing questions.js file
    existing = []
    # For now, skip parsing; we'll just generate new ones.
    
    # Determine starting ID
    start_id = 301  # after existing max ID 300
    # We need to generate 309 questions
    # Distribute per module
    target_per_module = 42
    existing_counts = {"05": 10, "06": 10, "07": 7}
    # Generate for each module
    questions = []
    current_id = start_id
    for module in modules.keys():
        needed = target_per_module - existing_counts.get(module, 0)
        print(f"Module {module}: need {needed} questions")
        for i in range(needed):
            category = random.choice(module_categories[module])
            q = generate_question(current_id, module, category)
            questions.append(q)
            current_id += 1
    
    print(f"Generated {len(questions)} new questions.")
    
    # Now we need to combine with existing questions (if we had them)
    # For now, we'll just output the new ones.
    # Save to JSON
    with open('/root/.openclaw/workspace/adventure-aviator-007/modules/question-bank.json', 'w') as f:
        json.dump(questions, f, indent=2)
    
    # Also create JavaScript export
    js_content = f"const QUESTION_BANK = {json.dumps(questions, indent=2)};\n\nexport default QUESTION_BANK;\n"
    with open('/root/.openclaw/workspace/adventure-aviator-007/scripts/questions.js', 'w') as f:
        f.write(js_content)
    
    print("Files written.")

if __name__ == '__main__':
    main()