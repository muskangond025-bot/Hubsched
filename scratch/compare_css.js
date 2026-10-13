const fs = require('fs');
const https = require('https');

const homepageUrl = 'https://dumemearts.webflow.io/';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const html = await fetchUrl(homepageUrl);
    // Find CSS files in HTML
    const cssRegex = /href="([^"]+\.css)"/g;
    let match;
    const cssUrls = [];
    while ((match = cssRegex.exec(html)) !== null) {
      cssUrls.push(match[1]);
    }
    console.log('CSS URLs found:', cssUrls);
    
    if (cssUrls.length > 0) {
      // Download the first Webflow CSS file (usually the main one)
      const cssUrl = cssUrls.find(url => url.includes('webflow') || url.includes('dumemearts'));
      if (cssUrl) {
        const liveCss = await fetchUrl(cssUrl);
        fs.writeFileSync('scratch/live_css.css', liveCss);
        console.log('Downloaded live CSS to scratch/live_css.css');
      } else {
        console.log('No main CSS file found');
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
