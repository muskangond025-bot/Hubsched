const fs = require('fs');

const css = fs.readFileSync('scratch/live_css.css', 'utf8');

const indices = [517322, 595820, 648349, 553380, 605895, 661037];

for (const idx of indices) {
  // Search backwards for '@media'
  const mediaIdx = css.lastIndexOf('@media', idx);
  if (mediaIdx !== -1) {
    const endLineIdx = css.indexOf('{', mediaIdx);
    console.log(`Index ${idx}: nearest media query is: "${css.substring(mediaIdx, endLineIdx).trim()}"`);
  } else {
    console.log(`Index ${idx}: no media query found before this.`);
  }
}
