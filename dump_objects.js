const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'scripts/questions.js'), 'utf8');
// Find array start
const start = content.indexOf('[');
const end = content.lastIndexOf('];');
let arrayContent = content.substring(start + 1, end);
// Split by '},' but careful
let parts = arrayContent.split('},');
for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    // Add back the '}' if not last part
    if (i < parts.length - 1) part += '}';
    // Ensure starts with {
    if (!part.trim().startsWith('{')) {
        part = '{' + part;
    }
    console.log('--- OBJECT', i, '---');
    console.log(part);
    console.log('\n');
}