const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'scripts/questions.js'), 'utf8');
// Trim whitespace
content = content.trim();
// Ensure it ends with a comma? Not needed.
// Write a temporary module
const tempFile = path.join(__dirname, 'temp_questions.js');
fs.writeFileSync(tempFile, 'module.exports = [' + content + '];');
try {
    const questions = require(tempFile);
    console.log(JSON.stringify(questions, null, 2));
    console.error('Parsed', questions.length, 'questions');
} catch (e) {
    console.error('Failed to require:', e.message);
    console.error('Stack:', e.stack);
}
// Clean up
try { fs.unlinkSync(tempFile); } catch (e) {}