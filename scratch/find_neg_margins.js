const fs = require('fs');
const css = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\src\\app\\dumemearts.css', 'utf8');

// Find any negative margins in the whole file
const regex = /[a-zA-Z0-9.-]+[^{]*\{[^}]*margin-(left|right|top|bottom)\s*:\s*-[^;}]*\}/g;
let match;
while ((match = regex.exec(css)) !== null) {
  if (match[0].includes('card') || match[0].includes('layout') || match[0].includes('certified')) {
    console.log(match[0]);
  }
}
