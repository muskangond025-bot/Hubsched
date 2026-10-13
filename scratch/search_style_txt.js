const fs = require('fs');
const content = fs.readFileSync('scratch/style_tags.txt', 'utf8');

const lines = content.split('\n');
console.log('Total lines:', lines.length);

lines.forEach((line, idx) => {
  const lower = line.toLowerCase();
  if (lower.includes('cover-image') || lower.includes('flick-') || lower.includes('card')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
