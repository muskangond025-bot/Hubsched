const fs = require('fs');

const liveCss = fs.readFileSync('scratch/live_css.css', 'utf8');

function printContext(css, query) {
  let index = 0;
  while ((index = css.indexOf(query, index)) !== -1) {
    // Find the surrounding block or some lines around it
    const start = Math.max(0, index - 200);
    const end = Math.min(css.length, index + query.length + 300);
    console.log(`=== Context for "${query}" at index ${index} ===`);
    console.log(css.substring(start, end));
    console.log('=============================================\n');
    index += query.length;
  }
}

printContext(liveCss, '.image-container {');
printContext(liveCss, '.faq-left {');
