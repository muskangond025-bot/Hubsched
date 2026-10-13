const fs = require('fs');

const html = fs.readFileSync('scratch/live_about.html', 'utf8');

function extractSection(startClass, endTagOrClass) {
  const startIndex = html.indexOf(`class="${startClass}"`);
  if (startIndex === -1) {
    return `Class ${startClass} not found`;
  }
  // Find the opening tag '<div' or '<header' or '<section' before the class
  const tagStart = html.lastIndexOf('<', startIndex);
  const tagName = html.substring(tagStart + 1, html.indexOf(' ', tagStart));
  
  // Find the matching closing tag
  let depth = 1;
  let curr = tagStart + tagName.length + 1;
  while (depth > 0 && curr < html.length) {
    const nextOpen = html.indexOf(`<${tagName}`, curr);
    const nextClose = html.indexOf(`</${tagName}>`, curr);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      curr = nextOpen + tagName.length + 1;
    } else {
      depth--;
      curr = nextClose + tagName.length + 3;
    }
  }
  return html.substring(tagStart, curr);
}

const heroAbout = extractSection('section-hero-about-wrap');
const aboutHeader = extractSection('section-about-header');
const stack = extractSection('section-stack');
const certified = extractSection('section-certified');
const process = extractSection('section-process');

console.log('Hero About Length:', heroAbout.length);
console.log('About Header Length:', aboutHeader.length);
console.log('Stack Length:', stack.length);
console.log('Certified Length:', certified.length);
console.log('Process Length:', process.length);

fs.writeFileSync('scratch/extracted_about_sections.json', JSON.stringify({
  heroAbout,
  aboutHeader,
  stack,
  certified,
  process
}, null, 2));

console.log('Saved extracted sections to scratch/extracted_about_sections.json');
