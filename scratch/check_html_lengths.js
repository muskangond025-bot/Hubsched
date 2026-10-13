const fs = require('fs');

const file = fs.readFileSync('src/app/about/aboutHtml.ts', 'utf8');

function checkConst(name) {
  const match = file.match(new RegExp(`export const ${name} = "([\\s\\S]*?)"`));
  if (match) {
    const content = match[1];
    console.log(`=== ${name} ===`);
    console.log('Length:', content.length);
    console.log('Starts with:', content.substring(0, 150));
    console.log('Ends with:', content.substring(content.length - 150));
    console.log('================\n');
  } else {
    console.log(`${name} not found`);
  }
}

checkConst('HERO_ABOUT_HTML');
checkConst('ABOUT_HEADER_HTML');
