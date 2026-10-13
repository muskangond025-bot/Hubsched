const fs = require('fs');

const liveCss = fs.readFileSync('scratch/live_css.css', 'utf8');

function findRules(css, selector) {
  const regex = new RegExp(selector.replace('.', '\\.') + '\\s*\\{([^}]+)\\}', 'g');
  let match;
  const rules = [];
  while ((match = regex.exec(css)) !== null) {
    rules.push(match[0]);
  }
  return rules;
}

console.log('--- .image-container rules in Live CSS ---');
console.log(findRules(liveCss, '.image-container'));

console.log('--- .vector-image rules in Live CSS ---');
console.log(findRules(liveCss, '.vector-image'));

console.log('--- .faq-left rules in Live CSS ---');
console.log(findRules(liveCss, '.faq-left'));
