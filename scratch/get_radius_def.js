const fs = require("fs");
const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

const matches = [...js.matchAll(/getCardCurveRadiusLocal\s*\([^)]*\)\s*\{[^}]+\}/g)].map(m => m[0]);
console.log("getCardCurveRadiusLocal matches:", matches);

// Search for curveRadius default value
const cr = [...js.matchAll(/curveRadius\s*[:=]\s*([0-9.]+)/g)].map(m => m[0]);
console.log("curveRadius values:", cr);
