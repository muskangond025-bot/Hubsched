const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\scratch\\parallax_script.js', 'utf8');

// Find all matches for ruler-related anims
const regex = /ruler/gi;
let match;
console.log('--- matches in parallax_script.js ---');
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  console.log(`Match ${count} found at index ${match.index}:`);
  console.log(content.substring(match.index - 200, match.index + 400));
  console.log('-----------------------------------');
  if (count >= 10) break;
}
