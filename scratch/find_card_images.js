const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\scratch\\live_page.html', 'utf8');

// Find the section-expertise-two wrapper
const startIdx = content.indexOf('section-expertise-two');
if (startIdx !== -1) {
  const sectionContent = content.substring(startIdx, startIdx + 40000);
  // Match all images and titles inside this section
  const regex = /<img[^>]*src="([^"]*)"[^>]*>|is--title">([^<]*)<\/div>/gi;
  let match;
  console.log('--- section-expertise-two images and tags ---');
  while ((match = regex.exec(sectionContent)) !== null) {
    if (match[2]) {
      console.log(`Tag: ${match[2].trim()}`);
    }
    if (match[1]) {
      console.log(`Image Src: ${match[1]}`);
    }
  }
} else {
  console.log('section-expertise-two not found');
}
