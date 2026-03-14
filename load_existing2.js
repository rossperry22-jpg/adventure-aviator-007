const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'scripts/questions.js'), 'utf8');
// Write a temporary module
const tempFile = path.join(__dirname, 'temp_questions.js');
fs.writeFileSync(tempFile, 'module.exports = [' + content + '];');
try {
    const questions = require(tempFile);
    console.log(JSON.stringify(questions, null, 2));
    console.error('Parsed', questions.length, 'questions');
} catch (e) {
    console.error('Failed to require:', e.message);
}
// Clean up
fs.unlinkSync(tempFile);