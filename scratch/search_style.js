const fs = require('fs');
const css = fs.readFileSync('src/app/dumemearts.css', 'utf8');

const regexes = [
  /\.projects-video-item/i,
  /video-item/i,
  /projects-video-wrap/i
];

regexes.forEach((regex) => {
  console.log(`Searching for: ${regex}`);
  let match;
  let pos = 0;
  while ((match = regex.exec(css.slice(pos))) !== null) {
    const start = Math.max(0, pos + match.index - 100);
    const end = Math.min(css.length, pos + match.index + 200);
    console.log(`--- FOUND MATCH ---`);
    console.log(css.slice(start, end));
    pos += match.index + match[0].length;
    if (pos >= css.length) break;
  }
});
