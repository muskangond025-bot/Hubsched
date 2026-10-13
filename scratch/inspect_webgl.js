const fs = require("fs");

const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

console.log("=== SHADERS IN ENTRY.JS ===");
// Find vertex and fragment shaders
const shaderMatches = [...js.matchAll(/(void\s+main\s*\(\s*\)[\s\S]*?\})/g)].map(m => m[1]);
console.log(`Found ${shaderMatches.length} 'void main()' blocks.`);

shaderMatches.slice(0, 10).forEach((sh, idx) => {
  console.log(`\n--- Shader block ${idx + 1} ---`);
  console.log(sh.slice(0, 300));
});

// Search for uniforms
const uniforms = [...js.matchAll(/uniform\s+([a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+);/g)].map(m => `${m[1]} ${m[2]}`);
console.log("\nUniforms count:", uniforms.length);
console.log("Unique uniforms:", [...new Set(uniforms)]);

// Search for Three.js / OGL / Camera / Mesh / Scene setup
const webglKeywords = ["PerspectiveCamera", "OrthographicCamera", "WebGLRenderer", "Mesh", "PlaneGeometry", "BufferGeometry", "ShaderMaterial", "Raycaster", "Camera", "Program", "Renderer"];
console.log("\n--- WebGL Keywords ---");
for (const kw of webglKeywords) {
  const c = (js.match(new RegExp(kw, "g")) || []).length;
  console.log(`${kw}: ${c}`);
}
