const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'scripts/questions.js'), 'utf8');
// Find the array start
const start = content.indexOf('[');
const end = content.lastIndexOf('];');
if (start === -1 || end === -1) {
    throw new Error('Could not find array');
}
let arrayContent = content.substring(start + 1, end);
// Now fix missing braces: each object should start with {
// Pattern: newline, whitespace, id: (not preceded by {)
arrayContent = arrayContent.replace(/(\n\s*)id:/g, '$1{ id:');
// Also ensure each object ends with },
// Already there.
// Now wrap and evaluate
const fixed = '[' + arrayContent + ']';
console.log(fixed.substring(0, 500));
// Evaluate
const questions = eval(fixed);
console.log('Parsed', questions.length, 'questions');
// Output JSON
console.log(JSON.stringify(questions, null, 2));