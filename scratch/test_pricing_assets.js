const https = require('https');

const urls = [
  "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/6803b1a21adafa33f455ac0a_card-4.svg",
  "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/6803b1a2d674b660e68e4277_card-2.svg",
  "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/6803b1a2dc4ee14f996ff83e_card-3.svg",
  "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/6803b1a2a77749c3dfca7624_card-5.svg"
];

urls.forEach((url, index) => {
  https.get(url, (res) => {
    console.log(`URL ${index + 1}: ${url}`);
    console.log(`Status Code: ${res.statusCode}\n`);
  }).on('error', (e) => {
    console.error(`Error for URL ${index + 1}:`, e);
  });
});
