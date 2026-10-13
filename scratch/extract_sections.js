const fs = require('fs');
const path = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8f4fea56-81ee-448f-8d33-c78f24118fdd\\.system_generated\\steps\\105\\content.md';
const content = fs.readFileSync(path, 'utf8');

console.log('Total characters:', content.length);

// Let's find all headings, major classes, sections, footer, etc.
const lines = content.split('\n');
console.log('Total lines:', lines.length);

// Look for lines after 1040
for (let i = 1040; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<section') || line.includes('class="') || line.includes('<h1') || line.includes('<h2') || line.includes('<h3') || line.includes('<footer') || line.includes('Footer')) {
        if (line.length < 200) {
            console.log(`${i+1}: ${line.trim()}`);
        } else {
            console.log(`${i+1}: [long line with length ${line.length}] ${line.substring(0, 100)}...`);
        }
    }
}
