const fs = require('fs');

const css = fs.readFileSync('src/app/dumemearts.css', 'utf8');

function findRule(className) {
  const index = css.indexOf(`.${className}`);
  if (index !== -1) {
    console.log(`=== CSS Rule for .${className} ===`);
    console.log(css.substring(index, index + 400));
    console.log('==================================\n');
  } else {
    console.log(`Class .${className} not found`);
  }
}

findRule('about-header-inner');
findRule('about-header-sticky');
findRule('about-header-bottom');
findRule('about-header-text');
findRule('about-hero-container');
