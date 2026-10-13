const fs = require('fs');

const svg = fs.readFileSync('scratch/image-frame-main.svg', 'utf8');

// We want to add a path that fills the bottom right corner with #101010.
// Let's place it right after the first path.
const firstPathEnd = svg.indexOf('fill="#101010"/>') + 'fill="#101010"/>'.length;

const insertPath = '\n<path d="M492.543 712.998 L634 701 L634 937 L382.124 937 Z" fill="#101010"/>';

const modifiedSvg = svg.substring(0, firstPathEnd) + insertPath + svg.substring(firstPathEnd);

fs.writeFileSync('public/image-frame-main.svg', modifiedSvg);
console.log('Modified SVG written to public/image-frame-main.svg');
