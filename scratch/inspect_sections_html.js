const fs = require('fs');

const html = fs.readFileSync('scratch/live_about.html', 'utf8');

function printBlock(cssClass) {
  const index = html.indexOf(`class="${cssClass}"`);
  if (index !== -1) {
    console.log(`=== Block for class "${cssClass}" ===`);
    console.log(html.substring(index - 100, index + 2000));
    console.log('=====================================\n');
  } else {
    console.log(`Class "${cssClass}" not found`);
  }
}

printBlock('section-stack');
printBlock('section-process');
printBlock('section-tagline');
