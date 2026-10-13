const fs = require('fs');

const html = fs.readFileSync('scratch/live_about.html', 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  console.log(`=== Script ${count} ===`);
  const fullTag = match[0];
  if (fullTag.includes('src=')) {
    const srcMatch = /src="([^"]+)"/.exec(fullTag);
    console.log('External Src:', srcMatch ? srcMatch[1] : 'Unknown');
  } else {
    console.log('Inline Script (first 200 chars):');
    console.log(match[1].substring(0, 200).trim() + '...');
  }
}
