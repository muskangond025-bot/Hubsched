const fs = require('fs');

const html = fs.readFileSync('scratch/live_about.html', 'utf8');

// Find all occurrences of class="section-..." or similar section wrappers
const sectionRegex = /class="(section-[^"]+)"/g;
let match;
const sections = [];
while ((match = sectionRegex.exec(html)) !== null) {
  sections.push(match[1]);
}
console.log('All section classes in live_about.html:');
console.log([...new Set(sections)]);
