const fs = require('fs');

const html = fs.readFileSync('scratch/live_page.html', 'utf8');

console.log('=== FAQ SECTION HTML FROM LIVE PAGE ===');
console.log(html.substring(238000, 240500));
