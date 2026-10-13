const THREE = require("three");

// Test the math
const cardWidth = 470;
const cardHeight = 275;
const radius = 700;
const archHeight = 32;

console.log("Card Width:", cardWidth, "Card Height:", cardHeight);

// PlaneGeometry with real dimensions
const geo = new THREE.PlaneGeometry(cardWidth, cardHeight, 64, 40);
const pos = geo.attributes.position;

console.log("Position count:", pos.count);
console.log("Corner 0 x, y, z:", pos.getX(0), pos.getY(0), pos.getZ(0));
console.log("Center vertex index:", Math.floor(pos.count / 2));
const mid = Math.floor(pos.count / 2);
console.log("Mid x, y, z:", pos.getX(mid), pos.getY(mid), pos.getZ(mid));

// Test bent positions
function bend(x, y, z) {
  const theta = x / radius;
  const radial = radius + z;
  const bentX = Math.sin(theta) * radial;
  const bentZ = Math.cos(theta) * radial - radius;
  const normX = x / (cardWidth * 0.5);
  const arch = (1.0 - normX * normX) * archHeight;
  const bentY = y + arch;
  return { bentX, bentY, bentZ };
}

console.log("Corner bent:", bend(pos.getX(0), pos.getY(0), pos.getZ(0)));
console.log("Top Center bent:", bend(0, cardHeight * 0.5, 0));
console.log("Top Left bent:", bend(-cardWidth * 0.5, cardHeight * 0.5, 0));
console.log("Top Right bent:", bend(cardWidth * 0.5, cardHeight * 0.5, 0));
