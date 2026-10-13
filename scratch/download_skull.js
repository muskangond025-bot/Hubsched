const https = require('https');
const fs = require('fs');

const url = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/681779a329b497ef86c85dd6_Screenshot%202025-05-04%20at%2015.28.22.avif";
const dest = "c:\\Users\\User\\Downloads\\templete for new project\\public\\skull.avif";

const file = fs.createWriteStream(dest);

https.get(url, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Skull image downloaded successfully to public/skull.avif!');
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error('Download error:', err.message);
});
