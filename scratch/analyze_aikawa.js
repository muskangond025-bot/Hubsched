const https = require("https");
const fs = require("fs");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

async function main() {
  const css = await fetchUrl("https://aikawakenichi.com/assets/styles/style.CuNCAHbz.css");
  fs.writeFileSync("scratch/aikawa.css", css);
  console.log("CSS length:", css.length);

  const js = await fetchUrl("https://aikawakenichi.com/assets/scripts/entry.S2oj3BdN.js");
  fs.writeFileSync("scratch/aikawa_entry.js", js);
  console.log("JS length:", js.length);

  // Check for libraries in JS
  const libs = [
    "three", "three.js", "ogl", "pixi", "gsap", "lenis", "locomotive",
    "framer-motion", "barba", "swup", "shader", "webgl", "canvas",
    "matter.js", "simplex", "noise", "gl-matrix", "twgl"
  ];

  console.log("\n--- Library signatures in JS ---");
  for (const lib of libs) {
    const count = (js.match(new RegExp(lib, "gi")) || []).length;
    if (count > 0) {
      console.log(`Found "${lib}": ${count} occurrences`);
    }
  }

  // Check for imports or chunk urls in JS
  const chunks = [...js.matchAll(/assets\/scripts\/[a-zA-Z0-9._-]+\.js/g)].map(m => m[0]);
  console.log("\nReferenced script chunks:", [...new Set(chunks)]);
}

main().catch(console.error);
