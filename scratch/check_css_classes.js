const fs = require('fs');

const css = fs.readFileSync('src/app/dumemearts.css', 'utf8');

console.log('Includes section-hero-about-wrap:', css.includes('section-hero-about-wrap'));
console.log('Includes about-header-sticky:', css.includes('about-header-sticky'));
console.log('Includes about-header-text:', css.includes('about-header-text'));
console.log('Includes about-header-bottom:', css.includes('about-header-bottom'));
