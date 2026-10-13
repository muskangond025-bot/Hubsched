const fs = require('fs');

const content = fs.readFileSync('src/app/about/aboutHtml.ts', 'utf8');

// Let's split by export const
const parts = content.split('export const ');
parts.forEach(part => {
  if (!part.trim()) return;
  const eqIdx = part.indexOf('=');
  if (eqIdx === -1) return;
  const name = part.substring(0, eqIdx).trim();
  let value = part.substring(eqIdx + 1).trim();
  // Remove trailing semicolon and quotes
  if (value.endsWith(';')) value = value.substring(0, value.length - 1);
  if (value.startsWith('"') && value.endsWith('"')) value = value.substring(1, value.length - 1);
  else if (value.startsWith('`') && value.endsWith('`')) value = value.substring(1, value.length - 1);
  
  console.log(`=== ${name} ===`);
  console.log('Length:', value.length);
  console.log('Starts with:', value.substring(0, 200));
  console.log('Ends with:', value.substring(value.length - 200));
  console.log('================\n');
});
