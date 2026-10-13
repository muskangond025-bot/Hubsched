const N = 6;
const cardWidth = 520;
const angleStep = (Math.PI * 2) / N; // 1.0472
const radius = cardWidth / angleStep; // 496.56

console.log("N:", N);
console.log("angleStep:", angleStep, "rad =", (angleStep * 180 / Math.PI), "deg");
console.log("cardWidth:", cardWidth);
console.log("radius for 0 GAP:", radius);

// Check if edges match:
// Card 0 right edge in angular coords:
const c0_right = 0 + angleStep / 2;
// Card 1 left edge in angular coords:
const c1_left = angleStep - angleStep / 2;
console.log("Card 0 right:", c0_right);
console.log("Card 1 left:", c1_left);
console.log("Difference (GAP):", Math.abs(c0_right - c1_left), "--> EXACT 0 GAP!");
