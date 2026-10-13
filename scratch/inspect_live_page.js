const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\scratch\\live_page.html', 'utf8');

console.log('HTML Length:', content.length);

// Search for ruler-related classes or elements
const regexes = [
  /class="[^"]*ruler[^"]*"/gi,
  /class="[^"]*hero[^"]*"/gi,
  /id="[^"]*hero[^"]*"/gi
];

for (const regex of regexes) {
  const matches = content.match(regex);
  console.log(`Regex ${regex}: found ${matches ? matches.length : 0} matches`);
  if (matches) {
    console.log('Sample matches:', matches.slice(0, 5));
  }
}
