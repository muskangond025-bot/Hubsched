const fs = require('fs');
const path = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8f4fea56-81ee-448f-8d33-c78f24118fdd\\.system_generated\\steps\\105\\content.md';
const html = fs.readFileSync(path, 'utf8');

const lines = html.split('\n');

const patterns = [
  'header-title',
  'navbar',
  'wave-group',
  'logo-animation-overlay',
  'HeaderTitle',
  'banner',
  'LogoSectHeaad',
  'logo-container',
  'PracticalProj',
  'TestiText',
  'AbotUsText',
  'TestiMonials',
  'FaqSectionMain',
  'lets-talk-section',
  'talk-section',
  'cookiePolicy',
  'footer'
];

patterns.forEach(pat => {
  lines.forEach((line, idx) => {
    if (line.includes(pat)) {
      console.log(`Line ${idx+1} [${pat}]: ${line.trim().substring(0, 100)}`);
    }
  });
});
