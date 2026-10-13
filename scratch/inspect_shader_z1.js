const fs = require("fs");

const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

console.log("=== SHADER AROUND 1571356 ===");
console.log(js.slice(1571356, 1576000));
