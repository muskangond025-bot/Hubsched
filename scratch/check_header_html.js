const fs = require('fs');
const content = fs.readFileSync('src/app/about/aboutHtml.ts', 'utf8');

console.log('HERO_ABOUT_HTML contains section-about-header:', content.includes('section-about-header'));
console.log('ABOUT_HEADER_HTML contains section-about-header:', content.includes('section-about-header'));
