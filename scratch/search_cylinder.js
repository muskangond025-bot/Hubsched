const fs = require("fs");
const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

// Search for cylinder or cylinderGeometry or cylindrical or circle or radius or angle in aikawa_entry.js
const terms = ["cylinder", "CylinderGeometry", "rotateY", "radius", "cylinderRadius", "circumference", "PI * 2", "angleStep"];

console.log("=== SEARCHING CYLINDER TERMS ===");
for (const t of terms) {
  const matches = [...js.matchAll(new RegExp(t, "gi"))];
  console.log(`${t}: ${matches.length} matches`);
}

// Search for rotateY
const rotateMatches = [...js.matchAll(/rotateY/g)];
rotateMatches.forEach((m, i) => {
  console.log(`\n--- rotateY match ${i} at ${m.index} ---`);
  console.log(js.slice(Math.max(0, m.index - 200), Math.min(js.length, m.index + 400)));
});
