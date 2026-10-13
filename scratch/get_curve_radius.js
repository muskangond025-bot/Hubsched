const fs = require("fs");
const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

const matches = [...js.matchAll(/getCurveRadius\s*\([^)]*\)\s*\{[^}]+\}/g)].map(m => m[0]);
console.log("getCurveRadius matches:", matches);
