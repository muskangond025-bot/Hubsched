const fs = require('fs');

const html = fs.readFileSync('scratch/live_page.html', 'utf8');

const svgRegex = /https:\/\/[^\s"']+\.svg/g;
const matches = html.match(svgRegex);
console.log('All SVGs found on live page:');
console.log([...new Set(matches)]);
