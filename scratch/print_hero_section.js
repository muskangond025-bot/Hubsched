const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\scratch\\live_page.html', 'utf8');

// Find the section that contains class="hero-ruler" or similar
const startIdx = content.indexOf('class="hero-ruler"');
if (startIdx !== -1) {
  // Go back to find the parent container start
  const snippet = content.substring(startIdx - 1500, startIdx + 3000);
  console.log('--- HTML SNIPPET ---');
  console.log(snippet);
} else {
  console.log('hero-ruler class not found');
}
