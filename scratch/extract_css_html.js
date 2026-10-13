const fs = require("fs");

const html = fs.readFileSync("scratch/aikawa_full.html", "utf-8");
const css = fs.readFileSync("scratch/aikawa.css", "utf-8");

console.log("=== CSS ROOT VARIABLES ===");
const rootVars = css.match(/:root\s*\{([^}]+)\}/);
if (rootVars) {
  console.log(rootVars[1].split(";").map(s => s.trim()).filter(Boolean).slice(0, 30).join("\n"));
}

console.log("\n=== HTML STRUCTURE / KEY TAGS ===");
// Extract SVG filters
const svgFilters = [...html.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(m => m[0]);
console.log("SVG filters found:", svgFilters.length);
svgFilters.forEach((svg, i) => {
  console.log(`SVG ${i}:`, svg.slice(0, 300));
});

// Extract main DOM nodes inside body
const bodyContent = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (bodyContent) {
  // strip scripts
  const cleanBody = bodyContent[1].replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  console.log("\nClean Body length:", cleanBody.length);
  // Look for data- attributes or class names
  const elements = [...cleanBody.matchAll(/<([a-z0-9-]+)([^>]*)>/gi)].map(m => `<${m[1]} ${m[2].trim()}>`);
  console.log("Elements sample:\n", elements.slice(0, 35).join("\n"));
}
