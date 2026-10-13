const fs = require('fs');

const svg = fs.readFileSync('scratch/image-frame-main.svg', 'utf8');

// Find the first path d attribute
const dRegex = /<path d="([^"]+)"[^>]*fill="#101010"/;
const match = dRegex.exec(svg);
if (match) {
  const d = match[1];
  // Split by 'M' (move to)
  const subPaths = d.split(/(?=M)/);
  console.log(`Found ${subPaths.length} sub-paths:`);
  subPaths.forEach((p, idx) => {
    console.log(`Sub-path ${idx + 1} (length ${p.length}):`);
    console.log(p.substring(0, 150) + '...');
  });
} else {
  console.log('Path not found');
}
