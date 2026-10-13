const fs = require('fs');

const css = fs.readFileSync('scratch/live_css.css', 'utf8');

function findRules(css, selector) {
  const regex = new RegExp(selector.replace('.', '\\.') + '[^{]*\\{[^}]+\\}', 'g');
  let match;
  const rules = [];
  while ((match = regex.exec(css)) !== null) {
    rules.push(match[0]);
  }
  return rules;
}

console.log('Rules containing "is--faq":');
console.log(findRules(css, 'is--faq'));
