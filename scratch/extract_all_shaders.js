const fs = require("fs");

const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

// Search for other classes with "gl-" or "Scene" or "Mesh"
const classMatches = [...js.matchAll(/this\.name\s*=\s*["']([^"']+)["']/g)].map(m => m[1]);
console.log("Component / Class names:", [...new Set(classMatches)]);

// Let's search for shaders used in tSceneBase or image meshes
const meshShaders = [...js.matchAll(/`[^`]*?void\s+main\s*\(\s*\)[^`]*?`/g)].map(m => m[0]);
console.log(`Found ${meshShaders.length} template literal shaders.`);

meshShaders.forEach((sh, idx) => {
  // If it mentions texture, uv, distortion, curve, scroll, or bend
  if (/texture2D|vUv|curl|distortion|curve|offset/i.test(sh)) {
    console.log(`\n================ SHADER ${idx + 1} (length: ${sh.length}) ================`);
    console.log(sh.slice(0, 500) + (sh.length > 500 ? "\n...[truncated]" : ""));
  }
});
