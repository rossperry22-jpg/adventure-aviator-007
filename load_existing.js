const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'scripts/questions.js'), 'utf8');

// The file appears to be a fragment of an array. Let's try to evaluate it as an array.
// Wrap in brackets and evaluate.
try {
    const wrapped = '[' + content + ']';
    const arr = eval(wrapped);
    console.log(JSON.stringify(arr, null, 2));
} catch (e) {
    console.error('Error evaluating:', e.message);
    // Fallback: parse manually
    const lines = content.split('\n');
    let inObject = false;
    let objLines = [];
    const objects = [];
    for (const line of lines) {
        if (line.trim().startsWith('{')) {
            inObject = true;
            objLines = [];
        }
        if (inObject) {
            objLines.push(line);
        }
        if (line.trim().startsWith('}')) {
            inObject = false;
            const objStr = objLines.join('\n');
            try {
                const obj = eval('(' + objStr + ')');
                objects.push(obj);
            } catch (e2) {
                console.error('Failed to parse object:', objStr.substring(0, 100));
            }
        }
    }
    console.log(JSON.stringify(objects, null, 2));
}