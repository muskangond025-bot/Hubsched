const https = require('https');
const fs = require('fs');

const url = 'https://dumemearts.webflow.io/';

https.get(url, (res) => {
  let html = '';
  res.on('data', (chunk) => { html += chunk; });
  res.on('end', () => {
    fs.writeFileSync('scratch/live_page.html', html);
    const regex = /faq/gi;
    let match;
    const matches = [];
    while ((match = regex.exec(html)) !== null) {
      matches.push(match.index);
    }
    console.log('Matches for "faq" found at indices:', matches);
    
    if (matches.length > 0) {
      // Print context of the first match
      const idx = matches[0];
      const start = Math.max(0, idx - 100);
      const end = Math.min(html.length, idx + 500);
      console.log('=== First Match Context ===');
      console.log(html.substring(start, end));
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
