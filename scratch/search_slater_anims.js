const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\scratch\\slater_custom.js', 'utf8');

const lines = content.split('\n');
console.log('--- Lines matching ruler or GSAP in slater_custom.js ---');
lines.forEach((line, index) => {
  if (line.includes('ruler') || line.includes('gsap') || line.includes('ScrollTrigger')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
