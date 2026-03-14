const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'scripts/questions.js'), 'utf8');

// Parse questions manually: each question starts with "{ id:" and ends before next "{ id:"
let questions = [];
let current = '';
let inObject = 0;
let capturing = false;

for (let i = 0; i < content.length; i++) {
    if (content.substr(i, 5) === '{ id:') {
        if (capturing && current.trim()) {
            // Attempt to parse the object by adding brackets
            try {
                const obj = eval('(' + current + ')');
                questions.push(obj);
            } catch (e) {
                // ignore
            }
        }
        current = '{';
        inObject = 1;
        capturing = true;
        i += 1;
        continue;
    }
    if (capturing) {
        current += content[i];
        if (content[i] === '{') inObject++;
        if (content[i] === '}') {
            inObject--;
            if (inObject === 0) {
                try {
                    const obj = eval('(' + current + ')');
                    questions.push(obj);
                } catch (e) {
                    // ignore
                }
                current = '';
                capturing = false;
            }
        }
    }
}

console.log('Total parsed:', questions.length);
const byModule = {};
questions.forEach(q => {
    byModule[q.module] = (byModule[q.module] || 0) + 1;
});
console.log('Per module:', byModule);