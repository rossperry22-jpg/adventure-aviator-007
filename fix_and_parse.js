const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'scripts/questions.js'), 'utf8');
// Trim whitespace
content = content.trim();
// Ensure first object starts with {
if (!content.startsWith('{')) {
    // Find first id: line
    content = '{' + content;
}
// Ensure it's an array
content = '[' + content + ']';
// Write temp file
const tempFile = path.join(__dirname, 'temp_fixed.js');
fs.writeFileSync(tempFile, 'module.exports = ' + content + ';');
try {
    const questions = require(tempFile);
    console.log(JSON.stringify(questions, null, 2));
    console.error('Parsed', questions.length, 'questions');
} catch (e) {
    console.error('Error:', e.message);
    // Try alternative: replace all 'id:' with '{ id:'? No.
}
fs.unlinkSync(tempFile);