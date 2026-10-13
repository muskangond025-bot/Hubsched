const fs = require('fs');

const svg = fs.readFileSync('scratch/image-frame-main.svg', 'utf8');

// Find the end of the first path
const firstPathEnd = svg.indexOf('fill="#101010"/>') + 'fill="#101010"/>'.length;

// Define the precise patch path
const insertPath = '\n<path d="M647.762 855.177 C598.074 817.172 534.284 755.971 492.543 712.998 L647.762 712.998 Z" fill="#101010"/>';

const modifiedSvg = svg.substring(0, firstPathEnd) + insertPath + svg.substring(firstPathEnd);

fs.writeFileSync('public/image-frame-main.svg', modifiedSvg);
console.log('Precisely modified SVG written to public/image-frame-main.svg');
