const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\scratch\\live_page.html', 'utf8');

const url = 'Screenshot';
const startIdx = content.indexOf(url);
if (startIdx !== -1) {
  console.log('--- Card HTML in Live Page ---');
  console.log(content.substring(startIdx - 500, startIdx + 1500));
} else {
  console.log('URL containing Screenshot not found');
}
