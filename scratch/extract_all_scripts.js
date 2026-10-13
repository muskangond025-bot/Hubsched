const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('scratch/live_about.html', 'utf8');

const outputDir = 'scratch/extracted_scripts';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  const fullTag = match[0];
  if (!fullTag.includes('src=')) {
    const code = match[1].trim();
    if (code.length > 50) {
      // Create a nice file name based on the content or number
      let name = `inline_script_${count}.js`;
      if (code.includes('initHighlightText')) name = 'highlight_text.js';
      else if (code.includes('initFlickCards')) name = 'flick_cards_inline.js';
      else if (code.includes('parallax-layers')) name = 'parallax_layers.js';
      else if (code.includes('initButtonCharacterStagger')) name = 'button_char_stagger.js';
      else if (code.includes('initBasicCustomCursor')) name = 'custom_cursor.js';
      else if (code.includes('initMarqueeScrollDirection')) name = 'marquee_scroll_direction.js';
      else if (code.includes('DONUT IMG INTRO')) name = 'donut_intro.js';
      
      fs.writeFileSync(path.join(outputDir, name), code);
      console.log(`Saved ${name} (${code.length} bytes)`);
    }
  }
}
