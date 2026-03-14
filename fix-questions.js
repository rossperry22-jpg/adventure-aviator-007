const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'scripts/questions.js');
const outputPath = path.join(__dirname, 'scripts/questions-fixed.js');

let content = fs.readFileSync(inputPath, 'utf8');

// The file is a fragment of a JavaScript array of objects.
// We need to wrap it in an array and fix the last incomplete object.
// Steps:
// 1. Ensure the content starts with '[' and ends with ']'
// 2. Add missing closing braces for the last object.

// Check if the content starts with a comma or whitespace
content = content.trim();
if (content.startsWith(',')) {
    content = content.substring(1);
}
if (!content.startsWith('[')) {
    content = '[\n' + content;
}
if (!content.endsWith(']')) {
    // Find the last closing brace
    let lastBrace = content.lastIndexOf('}');
    if (lastBrace === -1) {
        // No closing brace, assume the file ends mid-object
        // Let's close the current object and array
        content += '\n    }\n]';
    } else {
        // Check if there is trailing incomplete object
        // For simplicity, just close the array
        content += '\n]';
    }
}

// Now parse the JSON to validate (since it's JSON-like but with trailing commas)
// We'll replace trailing commas before closing braces
content = content.replace(/,\s*}/g, '}');
content = content.replace(/,\s*\]/g, ']');

// Write the fixed file
fs.writeFileSync(outputPath, content);

console.log('Fixed questions file written to scripts/questions-fixed.js');

// Now also generate a proper export
const exportContent = `// Adventure Aviator Question Bank
// Generated from existing questions

const QUESTION_BANK = ${content};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = QUESTION_BANK;
}

// For browser global
if (typeof window !== 'undefined') {
    window.QUESTION_BANK = QUESTION_BANK;
}`;

fs.writeFileSync(path.join(__dirname, 'scripts/questions.js'), exportContent);
console.log('Updated scripts/questions.js with QUESTION_BANK export');