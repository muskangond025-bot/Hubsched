const fs = require("fs");
const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

const matches = [...js.matchAll(/getArcRadius\s*\([^)]*\)\s*\{[^}]+\}/g)].map(m => m[0]);
console.log("getArcRadius matches:", matches);
