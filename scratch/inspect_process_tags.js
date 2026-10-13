const fs = require('fs');

const content = fs.readFileSync('src/app/about/aboutHtml.ts', 'utf8');

const parts = content.split('export const PROCESS_HTML =');
if (parts.length > 1) {
  let value = parts[1].trim();
  if (value.endsWith(';')) value = value.substring(0, value.length - 1);
  if (value.startsWith('"') && value.endsWith('"')) value = value.substring(1, value.length - 1);
  else if (value.startsWith('`') && value.endsWith('`')) value = value.substring(1, value.length - 1);

  console.log('=== PROCESS_HTML Tags ===');
  // Find all matches for class, data-gsap, data-w-id
  const tagRegex = /<[^>]*?(data-gsap|data-w-id|class)=\\"([^\\"]*?)\\"[^>]*?>/gi;
  let tagMatch;
  while ((tagMatch = tagRegex.exec(value)) !== null) {
    console.log(tagMatch[0]);
  }
} else {
  console.log('PROCESS_HTML not found');
}
