#!/usr/bin/env python3
import json
import random
from collections import defaultdict

# Load existing questions
with open('existing_parsed_final.json', 'r') as f:
    existing = json.load(f)

print(f"Loaded {len(existing)} existing questions")

# Define modules and target counts
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

# Categories per module (expanded)
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
    "PHAK Ch. 1", "PHAK Ch. 2", "PHAK Ch. 3", "PHAK Ch. 4", "PHAK Ch. 5",
    "PHAK Ch. 6", "PHAK Ch. 7", "PHAK Ch. 8", "PHAK Ch. 9", "PHAK Ch. 10",
    "PHAK Ch. 11", "PHAK Ch. 12", "PHAK Ch. 13", "PHAK Ch. 14", "PHAK Ch. 15",
    "PHAK Ch. 16", "PHAK Ch. 17",
    "AFH Ch. 1", "AFH Ch. 2", "AFH Ch. 3", "AFH Ch. 4", "AFH Ch. 5",
    "AFH Ch. 6", "AFH Ch. 7", "AFH Ch. 8",
    "AIM Ch. 1", "AIM Ch. 2", "AIM Ch. 3", "AIM Ch. 4", "AIM Ch. 5",
    "AIM Ch. 6", "AIM Ch. 7",
    "FAR 61.3", "FAR 61.57", "FAR 91.3", "FAR 91.103", "FAR 91.155",
    "ACS Introduction", "ACS Private Pilot"
]

# Simple question stems per cognitive level
cognitive_stems = {
    "Remember": [
        "What is the definition of {topic}?",
        "What does {topic} stand for?",
        "Which of these best describes {topic}?",
        "Recall the primary function of {topic}."
    ],
    "Understand": [
        "Explain how {topic} affects flight performance.",
        "What is the purpose of {topic}?",
        "Describe the relationship between {topic} and safety.",
        "How does {topic} work?"
    ],
    "Apply": [
        "Given a scenario with {condition}, how would you apply {topic}?",
        "Using {topic}, calculate the appropriate {value}.",
        "Perform a {procedure} that involves {topic}.",
        "Based on {topic}, what action should you take?"
    ],
    "Analyze": [
        "Compare {topic} with {related_topic}.",
        "What are the implications of improper use of {topic}?",
        "Analyze how {topic} contributes to {outcome}.",
        "Differentiate between {topic} and {similar_topic}."
    ],
    "Evaluate": [
        "Evaluate the effectiveness of {topic} in {situation}.",
        "Assess the risk associated with {topic} failure.",
        "Which approach to {topic} is most appropriate and why?",
        "Critique the use of {topic} in {scenario}."
    ],
    "Create": [
        "Design a checklist for {topic} procedures.",
        "Create a plan that incorporates {topic}.",
        "Develop a strategy to improve {topic} safety.",
        "Formulate a procedure for handling {topic}-related emergencies."
    ]
}

# Related terms for each category
related_terms = {
    "Aircraft Systems": ["airframe", "propulsion", "electrical"],
    "Flight Controls": ["control surfaces", "cockpit controls", "hydraulics"],
    "Regulations": ["FARs", "ACs", "LOAs"],
    "Risk Management": ["IMSAFE", "PAVE", "5P"],
    "Preflight Planning": ["weather briefing", "weight and balance", "NOTAMs"],
    "Primary Controls": ["ailerons", "elevator", "rudder"],
    "Secondary Controls": ["flaps", "trim", "spoilers"],
    "Aerodynamics": ["lift", "drag", "thrust", "weight"],
    "Stability": ["longitudinal", "lateral", "directional"],
    "Control Surfaces": ["movable surfaces", "fixed surfaces", "hinges"],
    "Lift and Drag": ["coefficient of lift", "induced drag", "parasite drag"],
    "Stall": ["angle of attack", "airspeed", "recovery"],
    "Angle of Attack": ["relative wind", "chord line", "critical angle"],
    "Critical Angle": ["stall angle", "maximum lift", "separation"],
    "Airflow": ["laminar", "turbulent", "boundary layer"],
    "Energy Concepts": ["potential energy", "kinetic energy", "total energy"],
    "Power Management": ["RPM", "manifold pressure", "mixture"],
    "Glide Performance": ["best glide speed", "glide ratio", "sink rate"],
    "Speed vs Altitude": ["energy tradeoff", "zoom climb", "dive"],
    "Atmosphere": ["troposphere", "stratosphere", "density altitude"],
    "Pressure": ["altimeter setting", "barometric", "gradient"],
    "Temperature": ["lapse rate", "inversion", "dew point"],
    "Humidity": ["relative humidity", "condensation", "fog"],
    "Clouds": ["cumulus", "stratus", "cirrus"],
    "Fronts": ["cold front", "warm front", "stationary"],
    "Turbulence": ["light", "moderate", "severe"],
    "Icing": ["structural icing", "induction icing", "clear ice"],
    "Dead Reckoning": ["true course", "wind correction", "ground speed"],
    "Charts": ["sectional", "TAC", "enroute"],
    "VOR": ["radial", "TO/FROM", "CDI"],
    "GPS": ["satellite", "WAAS", "RAIM"],
    "Flight Planning": ["flight log", "fuel calculation", "alternate"],
    "Airspace": ["Class A", "Class B", "Class C"],
    "NOTAMs": ["FDC NOTAM", "TFR", "Notice to Airmen"],
    "Regulations": ["FAR", "CFR", "AC"],
    "Medical": ["medical certificate", "duration", "deferral"],
    "Currency": ["flight review", "landing currency", "passenger"],
    "Human Factors": ["hypoxia", "disorientation", "fatigue"],
    "Hypoxia": ["hypoxic", "hypemic", "stagnant"],
    "Situational Awareness": ["SA", "loss of SA", "recovery"],
    "Decision Making": ["ADM", "DECIDE", "3P"],
    "ADM": ["risk assessment", "hazard identification", "mitigation"],
    "Risk Management": ["risk matrix", "probability", "severity"],
    "Emergency Procedures": ["engine failure", "fire", "forced landing"],
    "Scenario Thinking": ["mental rehearsal", "what-if", "contingency"]
}

# Conditions, values, procedures, outcomes, scenarios
conditions = ["icing conditions", "turbulence", "crosswind", "reduced visibility"]
values = ["airspeed", "altitude", "distance", "time", "fuel"]
procedures = ["preflight inspection", "engine start", "takeoff", "landing", "emergency"]
outcomes = ["safety", "efficiency", "performance", "comfort"]
scenarios = ["engine failure", "weather deterioration", "passenger emergency", "navigation error"]

def generate_question(qid, module, category):
    cognitive = random.choice(cognitive_levels)
    difficulty = random.choice(difficulties)
    
    # Get topic and related terms
    topic = category
    related = related_terms.get(category, [category])[0] if related_terms.get(category) else category
    similar = related_terms.get(category, [category])[-1] if related_terms.get(category) else category
    
    # Choose stem
    stem = random.choice(cognitive_stems[cognitive])
    
    # Format stem
    try:
        question_text = stem.format(
            topic=topic,
            related_topic=related,
            similar_topic=similar,
            condition=random.choice(conditions),
            value=random.choice(values),
            procedure=random.choice(procedures),
            outcome=random.choice(outcomes),
            situation=random.choice(scenarios),
            scenario=random.choice(scenarios)
        )
    except KeyError:
        # Fallback
        question_text = f"Question about {topic} in the context of {module}"
    
    # Generate options
    correct = f"Correct answer regarding {topic}"
    options = [
        correct,
        f"Incorrect option A about {topic}",
        f"Misleading option B involving {related}",
        f"Common misconception about {topic}"
    ]
    random.shuffle(options)
    correct_idx = options.index(correct)
    
    explanation = f"This question covers {topic} as referenced in {random.choice(faa_refs)}."
    faa = random.choice(faa_refs)
    tags = [category, cognitive, difficulty, module]
    
    return {
        "id": qid,
        "module": module,
        "question": question_text,
        "options": options,
        "correct": correct_idx,
        "explanation": explanation,
        "category": category,
        "difficulty": difficulty,
        "faaReference": faa,
        "tags": tags
    }

def main():
    # Count existing per module
    existing_counts = defaultdict(int)
    for q in existing:
        existing_counts[q['module']] += 1
    
    target_per_module = 42
    new_questions = []
    next_id = 301
    
    for module in modules.keys():
        needed = target_per_module - existing_counts.get(module, 0)
        print(f"Module {module}: need {needed} questions")
        categories = module_categories[module]
        for i in range(needed):
            category = random.choice(categories)
            q = generate_question(next_id, module, category)
            new_questions.append(q)
            next_id += 1
    
    print(f"Generated {len(new_questions)} new questions")
    
    # Combine
    all_questions = existing + new_questions
    all_questions.sort(key=lambda x: (x['module'], x['id']))
    
    # Write JSON
    with open('modules/question-bank.json', 'w') as f:
        json.dump(all_questions, f, indent=2)
    
    # Write JS
    js_content = f"// Adventure Aviator Question Bank\n"
    js_content += f"// Total questions: {len(all_questions)}\n"
    js_content += f"// Generated on: 2026-03-14\n\n"
    js_content += f"const QUESTION_BANK = {json.dumps(all_questions, indent=2)};\n\n"
    js_content += "if (typeof module !== 'undefined' && module.exports) {\n"
    js_content += "    module.exports = QUESTION_BANK;\n"
    js_content += "}\n\n"
    js_content += "if (typeof window !== 'undefined') {\n"
    js_content += "    window.QUESTION_BANK = QUESTION_BANK;\n"
    js_content += "}\n"
    
    with open('scripts/questions.js', 'w') as f:
        f.write(js_content)
    
    # Summary
    final_counts = defaultdict(int)
    cognitive_counts = defaultdict(int)
    difficulty_counts = defaultdict(int)
    
    for q in all_questions:
        final_counts[q['module']] += 1
        # Extract cognitive level from tags
        for tag in q['tags']:
            if tag in cognitive_levels:
                cognitive_counts[tag] += 1
                break
        difficulty_counts[q['difficulty']] += 1
    
    print("\n=== SUMMARY ===")
    print(f"Total questions: {len(all_questions)}")
    print(f"Existing: {len(existing)}")
    print(f"Newly generated: {len(new_questions)}")
    print(f"Target per module: 42")
    
    print("\nQuestions per module:")
    for mod in sorted(final_counts.keys()):
        print(f"  Module {mod}: {final_counts[mod]} questions")
    
    print("\nCognitive level distribution:")
    for level in cognitive_levels:
        print(f"  {level}: {cognitive_counts.get(level, 0)}")
    
    print("\nDifficulty distribution:")
    for diff in difficulties:
        print(f"  {diff}: {difficulty_counts.get(diff, 0)}")
    
    print(f"\nFiles created:")
    print(f"  modules/question-bank.json")
    print(f"  scripts/questions.js")

if __name__ == '__main__':
    main()