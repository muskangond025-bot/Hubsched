const fs = require('fs');
const https = require('https');

const url = 'https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c88077da85e0a77ba6b4d4_image-frame-main.svg';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('scratch/image-frame-main.svg', data);
    console.log('SVG downloaded successfully!');
  });
}).on('error', (err) => {
  console.error('Error downloading SVG:', err.message);
});
