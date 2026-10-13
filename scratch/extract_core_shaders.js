const fs = require("fs");
const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

const meshShaders = [...js.matchAll(/`[^`]*?void\s+main\s*\(\s*\)[^`]*?`/g)].map(m => m[0]);

console.log("=== SHADER 66 ===");
console.log(meshShaders[65]);

console.log("=== SHADER 67 (first 1500 chars) ===");
console.log(meshShaders[66].slice(0, 1500));

console.log("=== SHADER 68 ===");
console.log(meshShaders[67]);

console.log("=== SHADER 69 ===");
console.log(meshShaders[68]);
