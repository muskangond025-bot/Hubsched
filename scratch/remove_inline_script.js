const fs = require('fs');

let content = fs.readFileSync('src/app/about/aboutHtml.ts', 'utf8');

// Regex to find and remove <script>...</script> blocks
const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

const matches = content.match(scriptRegex);
if (matches) {
  console.log(`Found ${matches.length} script tags:`);
  matches.forEach(m => console.log(m.substring(0, 100) + '...'));
  content = content.replace(scriptRegex, '');
  fs.writeFileSync('src/app/about/aboutHtml.ts', content);
  console.log('Successfully removed inline script tags.');
} else {
  console.log('No script tags found.');
}
