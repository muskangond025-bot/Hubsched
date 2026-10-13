const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\c0c26bc3-32b2-4045-914d-c2c1f9281682\\three_d_animation_card_1783973204091.png";
const dest = "c:\\Users\\User\\Downloads\\templete for new project\\public\\three_d_animation_card.png";

try {
  fs.copyFileSync(src, dest);
  console.log('Image copied successfully to public directory!');
} catch (e) {
  console.error('Error copying file:', e);
}
