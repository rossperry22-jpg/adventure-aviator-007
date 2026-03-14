const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, 'scripts/questions.js');
let content = fs.readFileSync(questionsPath, 'utf8');

// Extract the array between 'const QUESTION_BANK = [' and '];'
const start = content.indexOf('const QUESTION_BANK = [');
if (start === -1) {
    throw new Error('QUESTION_BANK not found');
}
let bracketCount = 0;
let i = content.indexOf('[', start);
let jsonStart = i;
for (; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    else if (content[i] === ']') bracketCount--;
    if (bracketCount === 0) {
        // Found matching closing bracket
        break;
    }
}
if (bracketCount !== 0) {
    throw new Error('Unbalanced brackets');
}
const jsonStr = content.substring(jsonStart, i + 1);

// Parse to ensure valid JSON
const questionBank = JSON.parse(jsonStr);
console.log(`Parsed ${questionBank.length} questions`);

// Write to modules/question-bank.json
const modulesDir = path.join(__dirname, 'modules');
if (!fs.existsSync(modulesDir)) {
    fs.mkdirSync(modulesDir, { recursive: true });
}
const outputPath = path.join(modulesDir, 'question-bank.json');
fs.writeFileSync(outputPath, JSON.stringify(questionBank, null, 2));
console.log(`Written to ${outputPath}`);

// Update staging dashboard default counts
// Not needed, will be auto-calculated
console.log('Question bank JSON created.');