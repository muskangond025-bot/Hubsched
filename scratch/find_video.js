const https = require('https');
const fs = require('fs');

async function check() {
  const html = fs.readFileSync('scratch/response.html', 'utf8');
  
  // Look for video tags, iframe tags, youtube, mp4, etc.
  const videoRegex = /<video[^>]*>([\s\S]*?)<\/video>/gi;
  let match;
  console.log("=== VIDEO TAGS IN SCRAPED HTML ===");
  while ((match = videoRegex.exec(html)) !== null) {
    console.log(match[0]);
  }

  console.log("\n=== IFRAME TAGS ===");
  const iframeRegex = /<iframe[^>]*>([\s\S]*?)<\/iframe>/gi;
  while ((match = iframeRegex.exec(html)) !== null) {
    console.log(match[0]);
  }

  console.log("\n=== ALL YOUTUBE URLS ===");
  const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/g;
  const ids = new Set();
  while ((match = ytRegex.exec(html)) !== null) {
    ids.add(match[0]);
  }
  console.log(Array.from(ids));

  console.log("\n=== STORAGE GOOGLEAPIS VIDEO OR MP4 ===");
  const mp4Regex = /https?:\/\/[^\s"']+\.(?:mp4|webm|m3u8)/gi;
  const mp4s = new Set();
  while ((match = mp4Regex.exec(html)) !== null) {
    mp4s.add(match[0]);
  }
  console.log(Array.from(mp4s));

  // Let's also check rohanjoshi_homepage_data.json
  if (fs.existsSync('scratch/rohanjoshi_homepage_data.json')) {
    const data = JSON.parse(fs.readFileSync('scratch/rohanjoshi_homepage_data.json', 'utf8'));
    console.log("\n=== HERO BANNER VIDEO IN JSON ===");
    console.log(data.hero?.bannerVideo);
  }
}

check().catch(console.error);
