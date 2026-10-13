const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\src\\app\\dumemearts.css', 'utf8');

// Find occurrences of border properties within classes that contain hero
const lines = content.split('\n');
let currentClass = '';
const matches = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('.') && line.includes('{')) {
    currentClass = line;
  }
  if (line.includes('border') && currentClass.toLowerCase().includes('hero') && !currentClass.toLowerCase().includes('video')) {
    matches.push({ class: currentClass, line: line, lineNum: i + 1 });
  }
}

console.log('Matches:', matches.slice(0, 10));
