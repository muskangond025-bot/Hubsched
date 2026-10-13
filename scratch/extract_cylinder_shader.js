const fs = require("fs");
const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

console.log("=== BEND CYLINDER SHADER ===");
console.log(js.slice(1244000, 1251500));
