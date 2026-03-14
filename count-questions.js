const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'scripts/questions.js'), 'utf8');

// The file appears to be a fragment of a JavaScript array
// Let's count occurrences of pattern "id: " followed by number
let count = 0;
let match;
const regex = /id:\s*(\d+)/g;
while ((match = regex.exec(content)) !== null) {
    count++;
}

console.log('Total questions found:', count);

// Also compute min and max IDs
const ids = [];
const regex2 = /id:\s*(\d+)/g;
let m;
while ((m = regex2.exec(content)) !== null) {
    ids.push(parseInt(m[1]));
}
if (ids.length > 0) {
    console.log('Min ID:', Math.min(...ids));
    console.log('Max ID:', Math.max(...ids));
}