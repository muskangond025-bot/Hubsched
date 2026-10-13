const https = require('https');

const url = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/681779a329b497ef86c85dd6_Screenshot%202025-05-04%20at%2015.28.22.avif";

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error('Error:', e);
});
