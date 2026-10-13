const fs = require('fs');

const css = fs.readFileSync('scratch/live_css.css', 'utf8');

// Find variable definitions
const varRegex = /--_swatches---[a-zA-Z0-9_-]+:[^;]+/g;
let match;
const vars = [];
while ((match = varRegex.exec(css)) !== null) {
  vars.push(match[0]);
}
console.log('Swatches variables:');
console.log(vars.filter(v => v.includes('white') || v.includes('grey') || v.includes('brand')));
