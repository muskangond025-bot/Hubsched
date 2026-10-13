const fs = require("fs");

const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

// Search for custom shaders (excluding Three.js core shaders)
// Custom shaders often have strings with `varying` or `uniform` or `gl_FragColor` or `uProgress`, `uTime`, `uScroll`, `uHover`, `uTexture`, `uResolution`, `uVelocity`
const customUniforms = ["uProgress", "uVelocity", "uScroll", "uHover", "uTexture", "uTime", "uResolution", "uMouse", "uDistortion", "uScale", "uAlpha", "uStrength", "uRadius", "uBend", "uOffset"];

console.log("=== CUSTOM UNIFORM MATCHES ===");
for (const u of customUniforms) {
  const matches = [...js.matchAll(new RegExp(`['"]?${u}['"]?\\s*[:=]`, "g"))];
  console.log(`${u}: ${matches.length} matches`);
}

// Find shader chunks or templates in the bundle
const matchesGlsl = [...js.matchAll(/(gl_Position\s*=\s*[\s\S]*?;)/g)].map(m => m[1]);
console.log("\ngl_Position assignments:", matchesGlsl.length);
matchesGlsl.forEach((m, i) => {
  if (!m.includes("projectionMatrix * modelViewMatrix") || m.length > 80) {
    console.log(`Custom gl_Position ${i}:`, m);
  }
});

// Let's search for words like "gl", "webgl", "camera", "scene", "view" in application components
const glComponents = [...js.matchAll(/class\s+([A-Za-z0-9_]+)\s*(?:extends\s+([A-Za-z0-9_]+))?\s*\{/g)].map(m => m[1]);
console.log("\nFound classes (sample):", glComponents.filter(c => /gl|webgl|view|scene|mesh|scroll|gallery|image/i.test(c)));
