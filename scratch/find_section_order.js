const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\scratch\\live_page.html', 'utf8');

// Find all HTML section elements or classes in order
const regex = /class="[^"]*(section-[a-z0-9-]+|expertise-inner|card-pin-height)[^"]*"/gi;
let match;
console.log('--- Section / Class Order in Live Page ---');
while ((match = regex.exec(content)) !== null) {
  console.log(`Matched: ${match[0]}`);
}
